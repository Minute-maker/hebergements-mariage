/**
 * La liste d'hébergements et la synchronisation avec la carte.
 *
 * Une fiche donne : type, nom, adresse (ou « position approchée »), tarif,
 * distance et temps de trajet depuis le lieu de référence, distance vers chacun
 * des trois lieux, équipements, et les liens vers les sources réelles.
 */
import L from "leaflet";
import { DATA } from "../data/accommodations.js";
import { TYPES } from "../data/types.js";
import { VENUES, originVenue } from "../data/venues.js";
import { mins } from "../lib/geo.js";
import { esc } from "../lib/html.js";
import { state, visibleRows } from "../state.js";
import { cluster } from "../map/cluster.js";
import { getMap } from "../map/map.js";
import { drawTraces } from "../map/traces.js";
import { mapsLink, officialSite, photosLink, reviewsLink } from "./links.js";
import { sleepBtn, sleepersHTML } from "./people.js";

const listEl = () => document.getElementById("list");

export function cardHTML(h) {
  const t = TYPES[h.type];
  const site = officialSite(h);

  // Sans lieu placé, aucune distance n'a de sens : on le dit au lieu d'inventer.
  const trip =
    h.km == null
      ? "<span>Renseignez une adresse ci-dessus pour voir les distances</span>"
      : (h.routed
          ? "<span><b>" + h.km.toFixed(1) + " km</b> par la route</span>"
          : "<span><b>" + h.crow.toFixed(1) + " km</b> à vol d'oiseau</span>") +
        "<span>Voiture <b>" +
        (h.routed ? "" : "≈") +
        mins(h.car) +
        "</b></span>" +
        (h.walk ? "<span>À pied <b>≈" + mins(h.walk) + "</b></span>" : "") +
        (h.bus ? "<span>Bus <b>≈" + mins(h.bus) + "</b></span>" : "");

  const legs = VENUES.filter((v) => v.lat != null && h.byVenue && h.byVenue[v.id] != null)
    .map(
      (v) =>
        "<span>" +
        esc(v.id === "reception" ? "Réception" : v.label.split(" ")[0]) +
        " <b>" +
        h.byVenue[v.id].toFixed(1) +
        " km</b></span>",
    )
    .join("");

  const extras =
    (h.extras || []).map((e) => '<span class="tag">' + esc(e) + "</span>").join("") +
    (h.left != null
      ? '<span class="tag left">' +
        h.left +
        " logement" +
        (h.left > 1 ? "s" : "") +
        " restant" +
        (h.left > 1 ? "s" : "") +
        "</span>"
      : '<span class="tag">disponibilité à vérifier</span>');

  const locationHint = h.geo
    ? ""
    : h.type === "location"
      ? " · adresse communiquée après réservation"
      : " · position approchée";

  const price =
    h.price != null
      ? '<div class="price">' + h.price + " €<br><span>/ nuit</span></div>"
      : '<div class="price" style="font-size:12px;font-weight:500;color:var(--muted)">tarif<br><span>à vérifier</span></div>';

  return (
    '<article class="card' +
    (state.sel === h.id ? " sel" : "") +
    '" data-id="' +
    esc(h.id) +
    '" tabindex="0">' +
    '<div class="meta">' +
    '<div class="headline"><div>' +
    '<span class="badge" style="background:' +
    t.bg +
    ";color:" +
    t.fg +
    '">' +
    esc(t.label) +
    "</span>" +
    '<h3 style="margin-top:6px">' +
    esc(h.name) +
    "</h3>" +
    '<div style="font-size:12px;color:var(--muted)">' +
    esc(h.addr || h.area) +
    locationHint +
    "</div>" +
    "</div>" +
    price +
    "</div>" +
    '<div class="trip">' +
    trip +
    "</div>" +
    (legs ? '<div class="trip legs">' + legs + "</div>" : "") +
    '<div class="rating" style="font-weight:500;color:var(--muted)"><a href="' +
    esc(reviewsLink(h)) +
    '" target="_blank" rel="noopener" style="color:var(--ink)">Voir les avis</a> · note à vérifier sur le site</div>' +
    '<div class="extras">' +
    extras +
    "</div>" +
    '<div class="actions">' +
    (site
      ? '<a class="book" href="' +
        esc(site) +
        '" target="_blank" rel="noopener">Réserver sur le site officiel</a>'
      : "") +
    '<button class="verify' +
    (state.routeFrom === h.id ? " on" : "") +
    '" data-route="' +
    esc(h.id) +
    '">' +
    (state.routeFrom === h.id ? "Masquer les trajets" : "Itinéraire vers les 3 lieux") +
    "</button>" +
    '<a class="verify" href="' +
    esc(mapsLink(h)) +
    '" target="_blank" rel="noopener">Google Maps</a>' +
    '<a class="verify" href="' +
    esc(photosLink(h)) +
    '" target="_blank" rel="noopener">Photos</a>' +
    sleepBtn(h) +
    "</div>" +
    sleepersHTML(h) +
    "</div></article>"
  );
}

export function render() {
  const el = listEl();
  if (!el) return;
  const rows = visibleRows();
  const origin = originVenue(state.ref);
  document.getElementById("count").textContent =
    rows.length +
    (rows.length === 1 ? " hébergement" : " hébergements") +
    " · " +
    (origin ? origin.label : "aucun lieu placé");
  el.innerHTML = rows.length
    ? rows.map(cardHTML).join("")
    : '<div class="empty">Aucun hébergement ne correspond. Élargissez le budget ou la distance.</div>';
  state.visible = new Set(rows.map((r) => r.id));
  cluster();
}

/** Redessine une fiche seule (utilisé quand un itinéraire arrive après coup). */
export function updateCard(h) {
  const el = listEl();
  if (!el) return;
  el.querySelectorAll('.card[data-id="' + CSS.escape(h.id) + '"]').forEach((c) => {
    c.outerHTML = cardHTML(h);
  });
}

/** Sélection croisée liste ↔ carte. Re-cliquer désélectionne. */
export function select(id, from) {
  const map = getMap();
  state.sel = state.sel === id ? null : id;
  const el = listEl();
  el.querySelectorAll(".card").forEach((c) => c.classList.toggle("sel", c.dataset.id === state.sel));
  cluster();
  if (!state.sel) return;
  const h = DATA.find((d) => d.id === state.sel);
  if (!h) return;
  if (from === "list") map.setView([h.lat, h.lon], Math.max(map.getZoom(), 16), { animate: true });
  if (from === "map") {
    const card = el.querySelector('.card[data-id="' + CSS.escape(state.sel) + '"]');
    const box = document.getElementById("left");
    if (card) box.scrollTo({ top: card.offsetTop - box.offsetTop - 64, behavior: "smooth" });
  }
}

export function initList() {
  const el = listEl();

  el.addEventListener("click", (e) => {
    const routeBtn = e.target.closest("[data-route]");
    if (routeBtn) {
      const id = routeBtn.dataset.route;
      state.routeFrom = state.routeFrom === id ? null : id;
      if (state.routeFrom && state.sel !== id) select(id, "list");
      render();
      drawTraces();
      if (state.routeFrom) {
        const h = DATA.find((d) => d.id === id);
        const b = L.latLngBounds(
          [[h.lat, h.lon]].concat(VENUES.filter((v) => v.lat != null).map((v) => [v.lat, v.lon])),
        );
        getMap().fitBounds(b.pad(0.25), { maxZoom: 15, padding: [40, 40] });
      }
      return;
    }
    if (e.target.closest("a,button")) return;
    const c = e.target.closest(".card");
    if (c) select(c.dataset.id, "list");
  });

  el.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const c = e.target.closest(".card");
    if (c) select(c.dataset.id, "list");
  });
}
