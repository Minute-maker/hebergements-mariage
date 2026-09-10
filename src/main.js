/**
 * Démarrage de l'application.
 *
 * L'ordre compte :
 *  1. installer l'événement actif — il écrit dans le stockage local ce que la
 *     suite relit (prénoms, dates, trois lieux) ;
 *  2. restaurer les lieux et calculer les distances ;
 *  3. construire l'interface, puis la carte ;
 *  4. seulement ensuite, aller chercher itinéraires et hébergements au dehors.
 *
 * La carte se construit après le premier rendu parce que Leaflet garde une taille
 * interne 0×0 tant que son conteneur n'a pas de taille réelle : d'où le sondage
 * `invalidateSize()` ci-dessous, qui ne cadre qu'une fois la taille connue.
 */
import "./styles/app.css";
import "./components/image-slot.js";

import { MAPBOX_TOKEN } from "./config.js";
import { hooks } from "./hooks.js";
import { initState, state } from "./state.js";
import { setStatus } from "./ui/status.js";
import { drawVenues, frameMap, getMap, initMap } from "./map/map.js";
import { cluster } from "./map/cluster.js";
import { createAllMarkers, loadNearby, locateAll, refreshRoutes } from "./services/discovery.js";
import { initList, render, select, updateCard } from "./ui/list.js";
import { activeEvent, initEvents, installActiveEvent } from "./ui/events.js";
import { applyBudget, initFilters } from "./ui/filters.js";
import { initPeople, paintPinAvatars, sleepersOf } from "./ui/people.js";
import { initVenuesPanel, onMapClick } from "./ui/venues-panel.js";
import { initBugReport } from "./ui/bugreport.js";
import { initRail } from "./ui/rail.js";
import { initStay } from "./ui/stay.js";

/* Branchements entre modules qui se répondent mutuellement. */
hooks.render = render;
hooks.updateCard = updateCard;
hooks.sleepersOf = sleepersOf;
hooks.paintPinAvatars = paintPinAvatars;
hooks.refreshRoutes = refreshRoutes;

installActiveEvent();
initState();

/* Interface */
initEvents({ onBudget: applyBudget });
initPeople();
initStay();
initFilters();
initVenuesPanel();
initList();
initBugReport();

/* Le diagnostic doit être lisible dès l'ouverture, pas seulement quand on essaie
   de saisir une adresse : sans jeton, la carte marche mais deux fonctions non. */
if (!MAPBOX_TOKEN) {
  state.tileNotice =
    "Aucun jeton Mapbox configuré — carte OpenStreetMap utilisée. " +
    "La saisie d'adresse et la recherche d'hébergements autour des lieux sont indisponibles.";
}
setStatus();

/* Carte */
initMap({ onMapClick, onViewChange: cluster });
createAllMarkers();
drawVenues();
render();
initRail();

/* Le budget de l'événement actif règle le filtre de prix. */
const current = activeEvent();
if (current && current.budget != null) applyBudget(current.budget);

/**
 * Leaflet peut calculer son origine avant que les feuilles de style ne soient
 * appliquées : on redemande la taille à chaque tick pendant 3 s, et on cadre dès
 * qu'elle est connue.
 */
(function settleMapSize() {
  const map = getMap();
  let framed = false;
  const tick = () => {
    map.invalidateSize();
    if (!framed && map.getSize().x) {
      framed = true;
      frameMap();
    }
  };
  let tries = 0;
  const timer = setInterval(() => {
    tick();
    if (++tries > 30) {
      clearInterval(timer);
      if (!state.sel) frameMap();
    }
  }, 100);
  tick();
  new ResizeObserver(() => map.invalidateSize()).observe(document.getElementById("map"));
  window.addEventListener("resize", () => map.invalidateSize());
})();

/* Données extérieures */
refreshRoutes();
locateAll();
loadNearby();

/* « Rechercher les hébergements autour de ces lieux » : balayage frais, sans cache. */
document.getElementById("searchNearby").addEventListener("click", async (e) => {
  const button = e.currentTarget,
    label = button.textContent;
  button.disabled = true;
  button.textContent = "Recherche en cours…";
  try {
    await loadNearby(true);
  } finally {
    button.disabled = false;
    button.textContent = label;
  }
});

/* Accès depuis la console pendant le développement. */
if (import.meta.env.DEV) {
  window.__select = select;
  window.__map = getMap();
}
