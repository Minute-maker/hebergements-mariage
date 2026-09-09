/**
 * Tracés sur la carte.
 *
 *  - case « Tracer les trajets entre les trois lieux » : un segment routier par
 *    paire de lieux placés (mairie ↔ église ↔ réception) ;
 *  - bouton « Itinéraire vers les 3 lieux » d'une fiche : les trois trajets depuis
 *    cet hébergement.
 *
 * Chaque segment part d'un trait pointillé à vol d'oiseau, remplacé par le vrai
 * tracé routier dès qu'OSRM répond. Les itinéraires obtenus alimentent aussi les
 * distances affichées sur les fiches.
 */
import L from "leaflet";
import { RINGS } from "../config.js";
import { DATA } from "../data/accommodations.js";
import { VENUES, venueById } from "../data/venues.js";
import { mins } from "../lib/geo.js";
import { routeLeg } from "../services/osrm.js";
import { recompute, state } from "../state.js";
import { hooks } from "../hooks.js";
import { getMap } from "./map.js";

const traceLayers = [];
const geomCache = {};
/** Incrémenté à chaque redessin : une réponse OSRM en retard est ignorée. */
let traceGen = 0;

export function drawTraces() {
  const map = getMap();
  if (!map) return;
  traceGen++;
  traceLayers.forEach((l) => map.removeLayer(l));
  traceLayers.length = 0;

  const placed = VENUES.filter((v) => v.lat != null);
  if (state.routeFrom) {
    const h = DATA.find((d) => d.id === state.routeFrom);
    if (h) placed.forEach((v) => drawLeg({ id: h.id, label: h.name, lat: h.lat, lon: h.lon }, v));
  }
  if (!state.trace) return;
  for (let i = 0; i < placed.length; i++)
    for (let j = i + 1; j < placed.length; j++) drawLeg(placed[i], placed[j]);
}

async function drawLeg(a, b) {
  const map = getMap();
  const key = a.id + "|" + b.id,
    gen = traceGen;
  const guide = L.polyline(
    [
      [a.lat, a.lon],
      [b.lat, b.lon],
    ],
    { color: "#6f6f6f", weight: 1.2, opacity: 0.35, dashArray: "4 5", interactive: false },
  ).addTo(map);
  traceLayers.push(guide);

  try {
    if (!geomCache[key]) {
      const leg = await routeLeg(a, b);
      if (!leg) return;
      geomCache[key] = leg;
    }
    if (gen !== traceGen || (!state.trace && !state.routeFrom)) return;

    // Un trajet hébergement → lieu vaut aussi comme distance routière sur la fiche.
    const h = DATA.find((d) => d.id === a.id);
    if (h && venueById(b.id) && !(h.routes && h.routes[b.id])) {
      h.routes = h.routes || {};
      h.routes[b.id] = { km: geomCache[key].km, sec: geomCache[key].min * 60 };
      recompute();
      hooks.updateCard(h);
    }

    const g = geomCache[key];
    map.removeLayer(guide);
    const road = L.polyline(g.coords, {
      color: "#0a0a0a",
      weight: 3.5,
      opacity: 0.85,
      lineJoin: "round",
    }).addTo(map);
    const txt =
      g.km < 1
        ? Math.round(g.km * 1000) + " m · " + mins(Math.max(g.min, g.km * 12)) + " à pied"
        : g.km.toFixed(1) + " km · " + mins(g.min) + " en voiture";
    road.bindTooltip(a.label + " → " + b.label + "<br>" + txt, {
      className: "km-tt strong",
      permanent: true,
      direction: "center",
      opacity: 1,
    });
    traceLayers.push(road);
  } catch (e) {
    /* segment non tracé : le pointillé reste */
  }
}

/**
 * Anneaux du balayage concentrique autour de chaque lieu, plus un cercle plein au
 * rayon du filtre « Distance max ». Masqués par défaut (`state.rings`).
 */
const ringLayers = [];
export function drawRings() {
  const map = getMap();
  if (!map) return;
  ringLayers.forEach((l) => map.removeLayer(l));
  ringLayers.length = 0;
  if (!state.rings) return;
  VENUES.filter((v) => v.lat != null).forEach((v) => {
    RINGS.forEach((km) => {
      ringLayers.push(
        L.circle([v.lat, v.lon], {
          radius: km * 1000,
          color: "#6f6f6f",
          weight: 1,
          opacity: 0.35,
          dashArray: "4 6",
          fill: false,
          interactive: false,
        }).addTo(map),
      );
    });
    ringLayers.push(
      L.circle([v.lat, v.lon], {
        radius: state.dist * 1000,
        color: "#0a0a0a",
        weight: 1.4,
        opacity: 0.7,
        fill: true,
        fillColor: "#0a0a0a",
        fillOpacity: 0.03,
        interactive: false,
      }).addTo(map),
    );
  });
}
