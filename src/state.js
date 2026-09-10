/**
 * État de l'application et calculs dérivés.
 *
 * `recompute()` recalcule, pour chaque hébergement, la distance et les temps de
 * trajet depuis le lieu de référence, ainsi que la distance vers chacun des trois
 * lieux du mariage. Les distances routières viennent d'OSRM quand elles ont été
 * calculées (`h.routes`), sinon on estime à partir du vol d'oiseau × 1,3.
 */
import { FAR_KM } from "./config.js";
import { haversine } from "./lib/geo.js";
import { DATA } from "./data/accommodations.js";
import { TYPES } from "./data/types.js";
import { VENUES, originVenue, restoreVenues, venueById } from "./data/venues.js";

export const state = {
  types: new Set(Object.keys(TYPES)),
  min: 80,
  max: 250,
  dist: 25,
  people: 2,
  sort: "distance",
  sel: null,
  trace: false,
  allThree: true,
  routeFrom: null,
  ref: "mairie",
  placing: false,
  editing: null,
  sug: [],
  sugIdx: -1,
  noPrice: true,
  rings: false,
  visible: new Set(),
  poiNotice: "",
  tileNotice: "",
  geoNotice: "",
};

/**
 * Restaure les lieux enregistrés et calcule les distances.
 * À appeler après l'installation de l'événement actif (`installActiveEvent`),
 * qui écrit dans le stockage local ce que cette fonction relit.
 */
export function initState() {
  const savedRef = restoreVenues();
  if (savedRef && venueById(savedRef)) state.ref = savedRef;
  recompute();
}

export function recompute() {
  const origin = originVenue(state.ref);
  DATA.forEach((h) => {
    // Sans aucun lieu placé, il n'y a pas de distance à afficher : on laisse à null
    // plutôt que de calculer depuis un point qui n'existe pas.
    h.crow = origin ? haversine(origin, h) : null;
    const r = origin && h.routes && h.routes[origin.id];
    h.routed = !!r;
    h.km = r ? r.km : h.crow != null ? h.crow * 1.3 : null;
    h.car = h.km == null ? null : r ? r.sec / 60 : (h.km / 26) * 60 + 3;
    h.walk = h.km != null && h.km < 4.5 ? (h.km / 4.7) * 60 : null;
    h.bus = h.km != null && h.km >= 1.2 && h.km < 11 ? (h.km / 15) * 60 + 9 : null;
    h.byVenue = {};
    VENUES.forEach((v) => {
      if (v.lat == null) return;
      const rv = h.routes && h.routes[v.id];
      h.byVenue[v.id] = rv ? rv.km : haversine(v, h) * 1.3;
    });
    const all = Object.values(h.byVenue);
    h.worst = all.length ? Math.max.apply(null, all) : h.km;
  });
}

/**
 * Prix retenu pour filtrer et trier, en euros.
 *
 * Un tarif connu l'emporte ; sinon on prend le bas de la fourchette estimée, pour
 * ne pas masquer un hébergement qui peut se révéler abordable. La fiche, elle,
 * affiche la fourchette entière : c'est ce qui permet de juger.
 */
export function priceOf(h) {
  if (h.price != null) return h.price;
  return h.est ? h.est[0] : null;
}

/** Un hébergement à plus de 60 km des trois lieux relève d'un autre secteur. */
export function farFromVenues(h) {
  const placed = VENUES.filter((v) => v.lat != null);
  if (!placed.length) return false;
  return placed.every((v) => haversine({ lat: h.lat, lon: h.lon }, { lat: v.lat, lon: v.lon }) > FAR_KM);
}

/** Filtres de la colonne de gauche. */
export function pass(h) {
  if (farFromVenues(h)) return false;
  if (!state.types.has(h.type)) return false;
  const price = priceOf(h);
  if (price != null && (price < state.min || price > state.max)) return false;
  if (price == null && !state.noPrice) return false;
  const d = state.allThree ? h.worst : h.km;
  if (d != null && d > state.dist) return false; // pas de filtre de distance sans lieu placé
  if (h.cap != null && h.cap < state.people) return false;
  return true;
}

export function sorted(rows) {
  const num = (v, fb) => (v == null ? fb : v);
  const comparators = {
    distance: (a, b) => num(a.km, Infinity) - num(b.km, Infinity),
    prix: (a, b) => num(priceOf(a), 1e6) - num(priceOf(b), 1e6),
  };
  return rows.slice().sort(comparators[state.sort] || comparators.distance);
}

/** Les hébergements retenus par les filtres, dans l'ordre de tri courant. */
export function visibleRows() {
  return sorted(DATA.filter(pass));
}
