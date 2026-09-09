/** Languette de repli du rail gauche. L'état est mémorisé. */
import { KEYS } from "../config.js";
import { readText, writeText } from "../lib/storage.js";
import { getMap } from "../map/map.js";

export function initRail() {
  const button = document.getElementById("railToggle"),
    app = document.getElementById("app");

  const set = (hidden) => {
    app.classList.toggle("norail", hidden);
    button.textContent = hidden ? "›" : "‹";
    writeText(KEYS.rail, hidden ? "1" : "0");
    // La carte change de largeur : Leaflet doit reprendre ses mesures après la transition.
    const map = getMap();
    if (map) setTimeout(() => map.invalidateSize(), 200);
  };

  set(readText(KEYS.rail) === "1");
  button.addEventListener("click", () => set(!app.classList.contains("norail")));
}
