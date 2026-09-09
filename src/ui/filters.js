/** Filtres et tri : type, budget, distance max, nombre de personnes, tracé. */
import { TYPES } from "../data/types.js";
import { esc } from "../lib/html.js";
import { state } from "../state.js";
import { drawRings, drawTraces } from "../map/traces.js";
import { hooks } from "../hooks.js";

const SORTS = [
  ["distance", "Distance"],
  ["prix", "Prix"],
];

export function syncLabels() {
  document.getElementById("budgetVal").textContent = state.min + " € – " + state.max + " €";
  document.getElementById("distVal").textContent =
    state.dist + " km" + (state.allThree ? " des 3 lieux" : "");
}

/** Règle le prix maximum (utilisé aussi par le budget d'un événement). */
export function applyBudget(v) {
  state.max = Math.max(v, state.min + 10);
  document.getElementById("budgetMax").value = state.max;
  syncLabels();
  hooks.render();
}

export function initFilters() {
  const typeChips = document.getElementById("typeChips");
  typeChips.innerHTML = Object.entries(TYPES)
    .map(
      ([k, t]) =>
        '<button class="chip" aria-pressed="true" data-type="' + esc(k) + '">' + esc(t.label) + "</button>",
    )
    .join("");
  typeChips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    const k = b.dataset.type;
    if (state.types.has(k)) state.types.delete(k);
    else state.types.add(k);
    b.setAttribute("aria-pressed", state.types.has(k));
    hooks.render();
  });

  const sortChips = document.getElementById("sortChips");
  sortChips.innerHTML = SORTS.map(
    ([k, l]) =>
      '<button class="chip" data-sort="' + k + '" aria-pressed="' + (k === state.sort) + '">' + l + "</button>",
  ).join("");
  sortChips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    state.sort = b.dataset.sort;
    sortChips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b));
    hooks.render();
  });

  const bMin = document.getElementById("budgetMin"),
    bMax = document.getElementById("budgetMax"),
    dist = document.getElementById("dist"),
    people = document.getElementById("people");

  bMin.value = state.min;
  bMax.value = state.max;
  dist.value = state.dist;
  people.value = state.people;

  bMin.addEventListener("input", () => {
    state.min = Math.min(+bMin.value, state.max - 10);
    bMin.value = state.min;
    syncLabels();
    hooks.render();
  });
  bMax.addEventListener("input", () => {
    state.max = Math.max(+bMax.value, state.min + 10);
    bMax.value = state.max;
    syncLabels();
    hooks.render();
  });
  dist.addEventListener("input", () => {
    state.dist = +dist.value;
    syncLabels();
    hooks.render();
    drawRings();
  });
  people.addEventListener("change", () => {
    state.people = +people.value;
    hooks.render();
  });
  document.getElementById("trace").addEventListener("change", (e) => {
    state.trace = e.target.checked;
    drawTraces();
  });

  syncLabels();
}
