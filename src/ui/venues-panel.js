/**
 * Les trois adresses du mariage, en tête de la colonne de gauche.
 *
 * Cliquer une ligne en fait le lieu de référence : distances, temps de trajet,
 * filtre « distance max » et tri se recalculent depuis ce point. « Modifier »
 * transforme la ligne elle-même en champ de saisie, avec autocomplétion ;
 * à défaut, on clique le bon point directement sur la carte.
 */
import { VENUES, saveVenues, venueById } from "../data/venues.js";
import { esc } from "../lib/html.js";
import { recompute, state } from "../state.js";
import { hasMapbox, mbSearch, mbSuggest } from "../services/mapbox.js";
import { hooks } from "../hooks.js";
import { drawVenues, getMap } from "../map/map.js";
import { setStatus } from "./status.js";

const panel = () => document.getElementById("venues");
let sugTimer = null;

export function drawVenueRows() {
  panel().innerHTML = VENUES.map((v) => {
    const isRef = state.ref === v.id;
    const unset = v.lat == null;
    const flag = unset
      ? state.placing && state.ref === v.id
        ? "Cliquez la carte"
        : "À placer"
      : isRef
        ? "Référence"
        : "";

    if (state.editing === v.id) {
      const val = /^À préciser|^Point placé/.test(v.addr) ? "" : v.addr;
      return (
        '<div class="vrow editing" aria-pressed="' +
        isRef +
        '" data-venue="' +
        esc(v.id) +
        '">' +
        '<span class="dot ' +
        v.shape +
        '" style="background:' +
        v.color +
        '"></span>' +
        '<span><span class="name">' +
        esc(v.label) +
        "</span>" +
        '<span class="vwrap"><input class="vinput" data-input="' +
        esc(v.id) +
        '" value="' +
        esc(val) +
        "\" placeholder=\"Tapez l'adresse, choisissez dans la liste\" autocomplete=\"off\">" +
        '<span class="vsug" id="vsug" hidden></span></span>' +
        '<span class="vhint">Flèches pour choisir · Entrée pour valider · Échap pour annuler</span></span>' +
        '<button class="vedit" data-edit="' +
        esc(v.id) +
        '">Valider</button></div>'
      );
    }

    return (
      '<div class="vrow" role="button" tabindex="0" aria-pressed="' +
      isRef +
      '" data-venue="' +
      esc(v.id) +
      '">' +
      '<span class="dot ' +
      v.shape +
      '" style="background:' +
      v.color +
      '"></span>' +
      '<span><span class="name">' +
      esc(v.label) +
      '</span><br><span class="sub">' +
      esc(v.addr) +
      "</span></span>" +
      '<span class="flag">' +
      flag +
      "</span>" +
      '<button class="vedit" data-edit="' +
      esc(v.id) +
      '">Modifier</button></div>'
    );
  }).join("");
}

/** Change le lieu de référence et recalcule tout ce qui en dépend. */
export function setRef(id) {
  const v = venueById(id);
  state.ref = id;
  saveVenues(state.ref);
  state.placing = v.lat == null;
  document.getElementById("right").classList.toggle("placing", state.placing);
  recompute();
  drawVenues();
  drawVenueRows();
  hooks.render();
  if (v.lat != null) {
    getMap().panTo([v.lat, v.lon], { animate: true });
    hooks.refreshRoutes();
  } else {
    setStatus("Cliquez sur la carte pour placer « " + v.label + " », ou saisissez son adresse ci-dessous.");
  }
}

function startEdit(id) {
  if (state.ref !== id) setRef(id);
  state.editing = id;
  state.placing = true;
  document.getElementById("right").classList.add("placing");
  drawVenueRows();
  const input = panel().querySelector('.vinput[data-input="' + CSS.escape(id) + '"]');
  if (input) {
    input.focus();
    input.select();
  }
  setStatus("Corrigez l'adresse dans la ligne, ou cliquez le bon point sur la carte.");
}

function cancelEdit() {
  state.editing = null;
  state.placing = false;
  document.getElementById("right").classList.remove("placing");
  drawVenueRows();
  setStatus("Modification annulée.");
}

/** Applique une position trouvée à un lieu, puis recalcule et recadre. */
function placeVenue(v, pos, message) {
  v.lat = pos.lat;
  v.lon = pos.lon;
  v.addr = pos.addr || v.addr;
  v.geo = true;
  saveVenues(state.ref);
  state.editing = null;
  state.placing = false;
  document.getElementById("right").classList.remove("placing");
  recompute();
  drawVenues();
  drawVenueRows();
  hooks.render();
  getMap().setView([v.lat, v.lon], Math.max(getMap().getZoom(), 15), { animate: true });
  setStatus(message);
  hooks.refreshRoutes();
}

async function applyVenueAddress(id) {
  const input = panel().querySelector('.vinput[data-input="' + CSS.escape(id) + '"]');
  const q = input ? input.value.trim() : "";
  if (!q) {
    cancelEdit();
    return;
  }
  const v = venueById(id);
  if (!hasMapbox()) {
    setStatus("Recherche d'adresse indisponible sans jeton Mapbox — cliquez le bon point sur la carte.");
    return;
  }
  setStatus("Recherche de « " + q + " »…");
  try {
    const g = await mbSearch(q);
    if (!g) {
      setStatus("Adresse introuvable. Ajoutez la ville ou le code postal.");
      return;
    }
    placeVenue(v, { lat: g.lat, lon: g.lon, addr: g.addr || q }, "« " + v.label + " » placé sur " + (g.addr || q));
  } catch (e) {
    setStatus("Géocodeur injoignable — cliquez le bon point directement sur la carte.");
  }
}

/* --- autocomplétion --- */

function closeSug() {
  const el = panel().querySelector(".vsug");
  if (el) {
    el.hidden = true;
    el.innerHTML = "";
  }
  state.sug = [];
  state.sugIdx = -1;
}

function drawSug() {
  const el = panel().querySelector(".vsug");
  if (!el) return;
  if (!state.sug || !state.sug.length) {
    el.hidden = true;
    el.innerHTML = "";
    return;
  }
  el.hidden = false;
  el.innerHTML = state.sug
    .map(
      (s, i) =>
        '<button type="button" data-sug="' +
        i +
        '" aria-selected="' +
        (i === state.sugIdx) +
        '"><b>' +
        esc(s.addr.split(",")[0]) +
        "</b><span>" +
        esc(s.sub || s.addr) +
        "</span></button>",
    )
    .join("");
}

function pickSug(i) {
  const s = state.sug && state.sug[i];
  if (!s) return;
  const v = venueById(state.editing);
  if (!v) return;
  closeSug();
  placeVenue(v, s, "« " + v.label + " » placé sur " + s.addr);
}

/** Clic sur la carte en mode placement : pose le lieu de référence à cet endroit. */
export function onMapClick(e) {
  if (!state.placing) return;
  const v = venueById(state.ref);
  v.lat = e.latlng.lat;
  v.lon = e.latlng.lng;
  v.addr = "Point placé sur la carte · " + v.lat.toFixed(4) + ", " + v.lon.toFixed(4);
  saveVenues(state.ref);
  state.placing = false;
  state.editing = null;
  document.getElementById("right").classList.remove("placing");
  recompute();
  drawVenues();
  drawVenueRows();
  hooks.render();
  hooks.refreshRoutes();
}

export function initVenuesPanel() {
  const el = panel();

  el.addEventListener("click", (e) => {
    const s = e.target.closest("[data-sug]");
    if (s) {
      pickSug(+s.dataset.sug);
      return;
    }
    const ed = e.target.closest(".vedit");
    if (ed) {
      if (state.editing === ed.dataset.edit) applyVenueAddress(ed.dataset.edit);
      else startEdit(ed.dataset.edit);
      return;
    }
    if (e.target.closest(".vinput")) return; // laisse la saisie tranquille
    const row = e.target.closest(".vrow");
    if (!row) return;
    if (state.editing === row.dataset.venue) return; // pas de recadrage pendant l'édition
    setRef(row.dataset.venue);
  });

  el.addEventListener("keydown", (e) => {
    // Entrée / Espace sur la ligne = définir comme référence, mais jamais dans le champ.
    if (e.target.classList.contains("vinput")) return;
    if (e.key !== "Enter" && e.key !== " ") return;
    const row = e.target.closest(".vrow");
    if (!row) return;
    e.preventDefault();
    setRef(row.dataset.venue);
  });

  el.addEventListener("input", (e) => {
    if (!e.target.classList.contains("vinput")) return;
    const q = e.target.value.trim();
    clearTimeout(sugTimer);
    if (q.length < 4) {
      closeSug();
      return;
    }
    sugTimer = setTimeout(async () => {
      try {
        state.sug = await mbSuggest(q);
        state.sugIdx = -1;
        drawSug();
      } catch (err) {
        closeSug();
      }
    }, 350);
  });

  el.addEventListener("keydown", (e) => {
    if (!e.target.classList.contains("vinput")) return;
    const n = (state.sug || []).length;
    if (e.key === "ArrowDown" && n) {
      e.preventDefault();
      state.sugIdx = (state.sugIdx + 1) % n;
      drawSug();
      return;
    }
    if (e.key === "ArrowUp" && n) {
      e.preventDefault();
      state.sugIdx = (state.sugIdx - 1 + n) % n;
      drawSug();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (n && state.sugIdx >= 0) return pickSug(state.sugIdx);
      if (n === 1) return pickSug(0);
      applyVenueAddress(e.target.dataset.input);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeSug();
      cancelEdit();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && (state.editing || state.placing)) cancelEdit();
  });

  drawVenueRows();
}
