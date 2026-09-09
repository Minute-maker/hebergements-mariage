/** Les trois lieux du mariage : cérémonie civile, cérémonie religieuse, réception. */
import { KEYS } from "../config.js";
import { readJSON, writeJSON } from "../lib/storage.js";

export const VENUES = [
  {
    id: "mairie",
    label: "Mairie de Biarritz",
    addr: "1 avenue Édouard VII, 64200 Biarritz",
    color: "#0a0a0a",
    shape: "square",
    lat: 43.48318,
    lon: -1.55873,
  },
  {
    id: "eglise",
    label: "Église Sainte-Eugénie",
    addr: "Place Sainte-Eugénie, 64200 Biarritz",
    color: "#e8b94a",
    shape: "diamond",
    lat: 43.4845,
    lon: -1.5622,
  },
  {
    id: "reception",
    label: "Lieu de réception",
    addr: "À préciser — cliquez pour le placer sur la carte",
    color: "#a4d4c5",
    shape: "circle",
    lat: null,
    lon: null,
  },
];

/** Libellés d'un événement dont les lieux ne sont pas encore renseignés. */
const BLANK_LABELS = ["Cérémonie civile", "Cérémonie religieuse", "Lieu de réception"];

export const venueById = (id) => VENUES.find((v) => v.id === id);

/**
 * Lieu de référence effectif : celui choisi s'il est placé, sinon le premier lieu
 * placé. Renvoie null tant qu'aucune des trois adresses n'est renseignée — un
 * nouvel événement démarre dans cet état, et tout ce qui dépend d'une distance
 * doit le supporter.
 */
export function originVenue(refId) {
  const ref = venueById(refId);
  if (ref && ref.lat != null) return ref;
  return VENUES.find((v) => v.lat != null) || null;
}

export function saveVenues(refId) {
  const o = { ref: refId || "mairie", v: {}, labels: {}, blank: VENUES.every((v) => v.lat == null) };
  VENUES.forEach((v) => {
    o.v[v.id] = { lat: v.lat, lon: v.lon, addr: v.addr, geo: !!v.geo };
    o.labels[v.id] = v.label;
  });
  writeJSON(KEYS.venues, o);
}

/**
 * Restaure les lieux enregistrés. Renvoie l'identifiant du lieu de référence,
 * ou null si rien n'était enregistré.
 */
export function restoreVenues() {
  const o = readJSON(KEYS.venues);
  if (!o) return null;
  if (o.blank) {
    VENUES.forEach((v, i) => {
      v.lat = null;
      v.lon = null;
      v.geo = false;
      v.label = BLANK_LABELS[i] || v.label;
      v.addr = "À préciser — saisissez l'adresse ou cliquez sur la carte";
    });
    return o.ref || null;
  }
  VENUES.forEach((v) => {
    const s = o.v && o.v[v.id];
    if (!s) return;
    if (s.lat != null && s.lon != null) {
      v.lat = s.lat;
      v.lon = s.lon;
    }
    if (s.addr) v.addr = s.addr;
    if (s.geo) v.geo = true;
    if (o.labels && o.labels[v.id]) v.label = o.labels[v.id];
  });
  return o.ref || null;
}
