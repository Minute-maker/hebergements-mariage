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

function pinHTML(h) {
  const t = TYPES[h.type];
  const price = h.price != null ? h.price + " €" : "?";
  return '<div class="pin"><i style="background:' + t.bg + '"></i><b>' + price + "</b></div>";
}

function tooltipText(h) {
  return h.price != null ? h.name + " · " + h.price + " €" : h.name;
}

/**
 * Crée le repère d'un hébergement et l'enregistre.
 * `onSelect` est appelé au clic, `onMoved` après un déplacement à la main.
 */
export function createMarker(h, { onSelect, onMoved }) {
  const m = L.marker([h.lat, h.lon], {
    draggable: true,
    autoPan: true,
    icon: L.divIcon({ className: "", html: pinHTML(h), iconSize: [15, 15], iconAnchor: [7, 7] }),
  });
  m.on("dragend", () => {
    const p = m.getLatLng();
    h.lat = p.lat;
    h.lon = p.lng;
    h.geo = true;
    h.addr = "Position ajustée · " + p.lat.toFixed(5) + ", " + p.lng.toFixed(5);
    const c = geoCache();
    c[h.id] = { lat: h.lat, lon: h.lon, addr: h.addr };
    geoCacheSave(c);
    delete h.routes; // les itinéraires calculés ne valent plus pour cette position
    onMoved(h);
  });
  m.on("click", () => onSelect(h.id, "map"));
  m.bindTooltip(tooltipText(h), { direction: "top", offset: [0, -8] });
  markers[h.id] = m;
  return m;
}
