/**
 * En-tête : prénoms des mariés (éditables sur place) et dates du séjour.
 * Le nombre de nuits, le titre de l'onglet et les liens de réservation suivent.
 */
import { KEYS } from "../config.js";
import { readJSON, readText, writeJSON, writeText } from "../lib/storage.js";
import { hooks } from "../hooks.js";
import { capture, renderEvents, save as saveEvents } from "./events.js";

const DEFAULT_NAMES = "Jeanne & Louis";

function formatStay(dateIn, dateOut) {
  const nightsEl = document.getElementById("nights");
  const a = dateIn.value,
    b = dateOut.value;
  if (!a || !b) {
    nightsEl.textContent = "—";
    return;
  }
  const da = new Date(a + "T12:00"),
    db = new Date(b + "T12:00");
  const nights = Math.max(0, Math.round((db - da) / 864e5));
  const dayMonth = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long" });
  const sameMonth = da.getMonth() === db.getMonth() && da.getFullYear() === db.getFullYear();
  const span = sameMonth
    ? da.getDate() + " & " + dayMonth.format(db) + " " + db.getFullYear()
    : dayMonth.format(da) + " – " + dayMonth.format(db) + " " + db.getFullYear();

  nightsEl.textContent = nights + (nights > 1 ? " nuits" : " nuit");
  document.title = "Hébergements — Mariage, " + span;
}

export function initStay() {
  /* --- prénoms --- */
  const namesEl = document.getElementById("wedNames");
  const saved = readText(KEYS.names);
  if (saved) namesEl.textContent = saved;

  namesEl.addEventListener("blur", () => {
    namesEl.textContent = namesEl.textContent.replace(/\s+/g, " ").trim() || DEFAULT_NAMES;
    writeText(KEYS.names, namesEl.textContent);
    capture();
    saveEvents();
    renderEvents();
  });
  namesEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      namesEl.blur();
    }
  });

  /* --- dates --- */
  const dateIn = document.getElementById("dateIn"),
    dateOut = document.getElementById("dateOut");

  const stay = readJSON(KEYS.stay);
  if (stay && stay.in && stay.out) {
    dateIn.value = stay.in;
    dateOut.value = stay.out;
  } else if (dateIn.value && dateOut.value) {
    // Rien d'enregistré : on fixe les dates par défaut du formulaire, sinon le rail
    // afficherait « dates à définir » alors que les champs sont remplis.
    writeJSON(KEYS.stay, { in: dateIn.value, out: dateOut.value });
    capture();
    saveEvents();
    renderEvents();
  }

  function onChange() {
    // Un départ avant l'arrivée n'a pas de sens : on décale d'une nuit.
    if (dateIn.value && dateOut.value && dateOut.value <= dateIn.value) {
      const d = new Date(dateIn.value + "T12:00");
      d.setDate(d.getDate() + 1);
      dateOut.value = d.toISOString().slice(0, 10);
    }
    formatStay(dateIn, dateOut);
    writeJSON(KEYS.stay, { in: dateIn.value, out: dateOut.value });
    capture();
    saveEvents();
    renderEvents();
    hooks.render(); // les liens de réservation portent les dates
  }

  dateIn.addEventListener("change", onChange);
  dateOut.addEventListener("change", onChange);
  formatStay(dateIn, dateOut);
}
