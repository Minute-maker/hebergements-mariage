/**
 * Rail « Événements » : plusieurs mariages dans l'année, chacun avec ses prénoms,
 * ses dates, ses trois lieux, son budget et ses profils invités.
 *
 * Un événement conserve ses données sous forme de blobs (les mêmes chaînes que
 * celles écrites dans le stockage local par le reste de l'application). Changer
 * d'événement réécrit ces blobs puis recharge la page : c'est la façon la plus sûre
 * de repartir d'un état propre — carte, repères, itinéraires et profils compris.
 */
import { KEYS } from "../config.js";
import { readJSON, readText, remove, writeJSON, writeText } from "../lib/storage.js";
import { esc } from "../lib/html.js";
import { askConfirm, askText } from "./dialog.js";

/** Trois lieux vides : un nouvel événement ne démarre pas à Biarritz. */
const BLANK_VENUES = JSON.stringify({ ref: "mairie", v: {}, blank: true });

function load() {
  const o = readJSON(KEYS.events);
  if (o && o.list && o.list.length) return o;
  return {
    active: "ev1",
    list: [
      {
        id: "ev1",
        names: readText(KEYS.names) || "Jeanne & Louis",
        stay: readText(KEYS.stay),
        venues: readText(KEYS.venues),
      },
    ],
  };
}

export let EVENTS = load();
if (!EVENTS.list.some((e) => e.id === EVENTS.active)) EVENTS.active = EVENTS.list[0].id;

export const save = () => writeJSON(KEYS.events, EVENTS);
export const activeEvent = () => EVENTS.list.find((e) => e.id === EVENTS.active);

/** Recopie l'état courant du stockage local dans l'événement actif. */
export function capture() {
  const cur = activeEvent();
  if (!cur) return;
  cur.names = readText(KEYS.names) || cur.names;
  cur.stay = readText(KEYS.stay);
  cur.venues = readText(KEYS.venues);
}

/** Installe un événement dans le stockage local, avant rechargement de la page. */
function apply(ev) {
  if (!ev) return;
  if (ev.names) writeText(KEYS.names, ev.names);
  else remove(KEYS.names);
  if (ev.stay) writeText(KEYS.stay, ev.stay);
  else remove(KEYS.stay);
  // Un événement créé par l'utilisateur porte explicitement trois lieux vides.
  // L'événement d'origine, lui, n'a rien d'enregistré : on efface la clé pour que
  // les lieux gardent leurs valeurs par défaut (le mariage de démonstration).
  if (ev.venues) writeText(KEYS.venues, ev.venues);
  else remove(KEYS.venues);
}

/**
 * Installe l'événement actif dans le stockage local. Doit être appelé en tout
 * premier au démarrage : `initState()` relit ensuite les lieux qui viennent d'être
 * écrits ici.
 */
export function installActiveEvent() {
  apply(activeEvent());
}

function formatDate(ev) {
  try {
    const s = JSON.parse(ev.stay || "null");
    if (!s || !s.in) return "dates à définir";
    return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric" }).format(
      new Date(s.in + "T12:00"),
    );
  } catch (e) {
    return "dates à définir";
  }
}

export function renderEvents() {
  const box = document.getElementById("elist");
  box.innerHTML = EVENTS.list
    .map(
      (e) =>
        '<button class="ev' +
        (e.id === EVENTS.active ? " on" : "") +
        '" data-ev="' +
        esc(e.id) +
        '">' +
        '<span><span class="en">' +
        esc(e.names) +
        '</span><br><span class="ed">' +
        formatDate(e) +
        ' · <span class="bud" data-bud="' +
        esc(e.id) +
        '" title="Modifier le budget par nuit">' +
        (e.budget ? esc(e.budget) + " €/nuit" : "budget ?") +
        "</span></span></span>" +
        (EVENTS.list.length > 1
          ? '<span class="del" data-del="' + esc(e.id) + '" title="Supprimer">×</span>'
          : "<span></span>") +
        "</button>",
    )
    .join("");
}

/** `onBudget` applique le budget de l'événement actif au filtre de prix. */
export function initEvents({ onBudget }) {
  renderEvents();

  document.getElementById("elist").addEventListener("click", (ev) => {
    const bud = ev.target.closest("[data-bud]");
    if (bud) {
      ev.stopPropagation();
      const e = EVENTS.list.find((x) => x.id === bud.dataset.bud);
      askText("Budget maximum par nuit (€) — " + e.names, e.budget || "").then((v) => {
        if (v === null) return;
        const n = parseInt(v, 10);
        e.budget = isNaN(n) ? null : Math.max(30, Math.min(320, n));
        save();
        renderEvents();
        if (e.id === EVENTS.active && e.budget != null) onBudget(e.budget);
      });
      return;
    }

    const del = ev.target.closest("[data-del]");
    if (del) {
      ev.stopPropagation();
      const id = del.dataset.del;
      const e = EVENTS.list.find((x) => x.id === id);
      askConfirm("Supprimer « " + e.names + " » ?").then((yes) => {
        if (!yes) return;
        EVENTS.list = EVENTS.list.filter((x) => x.id !== id);
        if (EVENTS.active === id) {
          EVENTS.active = EVENTS.list[0].id;
          save();
          apply(EVENTS.list[0]);
          location.reload();
          return;
        }
        save();
        renderEvents();
      });
      return;
    }

    const b = ev.target.closest("[data-ev]");
    if (!b) return;
    const id = b.dataset.ev;
    if (id === EVENTS.active) return;
    capture();
    EVENTS.active = id;
    save();
    apply(activeEvent());
    location.reload();
  });

  document.getElementById("addEvent").addEventListener("click", () => {
    askText("Prénoms des mariés", "", "Créer").then((name) => {
      if (!name || !name.trim()) return;
      capture();
      const id = "ev" + Date.now();
      EVENTS.list.push({ id, names: name.trim(), stay: null, venues: BLANK_VENUES });
      EVENTS.active = id;
      save();
      apply(activeEvent());
      location.reload();
    });
  });
}
