/**
 * Repères des hébergements.
 *
 * Chaque repère est un point coloré par type ; le prix n'apparaît qu'au survol ou
 * à la sélection. Les repères sont déplaçables : une position corrigée à la main
 * est enregistrée sur l'appareil et fait recalculer distances et itinéraires.
 */
import L from "leaflet";
import { KEYS } from "../config.js";
import { readJSON, writeJSON } from "../lib/storage.js";
import { TYPES } from "../data/types.js";

/** id d'hébergement → marqueur Leaflet. */
export const markers = {};

export const geoCache = () => readJSON(KEYS.geo, {}) || {};
export const geoCacheSave = (c) => writeJSON(KEYS.geo, c);

/**
 * Oublie les positions déplacées à la main lors des versions précédentes.
 * Le glisser-déposer est retiré : une position ainsi corrigée n'était plus
 * rattrapable, alors que l'adresse réelle, elle, est connue.
 */
export function forgetDraggedPositions() {
  const c = geoCache();
  let n = 0;
  for (const id of Object.keys(c)) {
    if (/^Position ajustée/.test((c[id] && c[id].addr) || "")) {
      delete c[id];
      n++;
    }
  }
  if (n) geoCacheSave(c);
  return n;
}

/** Étiquette de prix : le tarif connu, sinon le bas de la fourchette estimée. */
function priceLabel(h) {
  if (h.price != null) return h.price + " €";
  return h.est ? "dès " + h.est[0] + " €" : "";
}

function pinHTML(h) {
  const t = TYPES[h.type];
  const label = priceLabel(h);
  return (
    '<div class="pin"><i style="background:' + t.bg + '"></i>' + (label ? "<b>" + label + "</b>" : "") + "</div>"
  );
}

function tooltipText(h) {
  const label = priceLabel(h);
  return label ? h.name + " · " + label : h.name;
}

/**
 * Crée le repère d'un hébergement et l'enregistre.
 *
 * Les repères ne sont pas déplaçables : un glissement involontaire écrasait la
 * position sans rien mémoriser de l'ancienne, donc sans retour possible. Les
 * positions viennent maintenant des adresses réelles, géocodées.
 */
export function createMarker(h, { onSelect }) {
  const m = L.marker([h.lat, h.lon], {
    icon: L.divIcon({ className: "", html: pinHTML(h), iconSize: [15, 15], iconAnchor: [7, 7] }),
  });
  m.on("click", () => onSelect(h.id, "map"));
  m.bindTooltip(tooltipText(h), { direction: "top", offset: [0, -8] });
  markers[h.id] = m;
  return m;
}
