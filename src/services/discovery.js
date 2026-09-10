/**
 * Ce qui va chercher des données au dehors : itinéraires, positions précises,
 * et recherche d'hébergements autour des trois lieux.
 *
 * La recherche est un **balayage concentrique** : cinq rayons (2, 5, 10, 17, 25 km)
 * pour chaque catégorie autour de chacun des trois lieux, avec déduplication —
 * une seule requête large oubliait trop d'établissements. Le résultat est mis en
 * cache une semaine ; le bouton « Rechercher… » ignore ce cache.
 */
import { KEYS, RINGS } from "../config.js";
import { DATA } from "../data/accommodations.js";
import { readJSON, remove, writeJSON } from "../lib/storage.js";
import { haversine } from "../lib/geo.js";
import { VENUES, originVenue } from "../data/venues.js";
import { recompute, state } from "../state.js";
import { hooks } from "../hooks.js";
import { frameMap } from "../map/map.js";
import { createMarker, geoCache, geoCacheSave, markers } from "../map/markers.js";
import { fetchCategory, hasMapbox, locateByName } from "./mapbox.js";
import { routeAllFrom } from "./osrm.js";
import { setStatus } from "../ui/status.js";
import { select } from "../ui/list.js";

/** Catégories de l'annuaire Mapbox → types de l'application. */
const POI_CATS = [
  ["hotel", "hotel"],
  ["bed_and_breakfast", "chambre"],
  ["campground", "camping"],
];
/** Faux positifs récurrents de l'annuaire. */
const POI_SKIP = /club de plage|plage mickey|restaurant|thalasso|golf club|piscine|spa\b|agence|conciergerie|immobili/i;

/** Branche un nouveau repère sur la carte (clic = sélection, glissé = repositionnement). */
function attachMarker(h) {
  return createMarker(h, {
    onSelect: select,
    onMoved: () => {
      recompute();
      hooks.render();
      refreshRoutes();
    },
  });
}

export function createAllMarkers() {
  DATA.forEach(attachMarker);
}

/** Recalcule les itinéraires voiture depuis le lieu de référence (une requête OSRM). */
export async function refreshRoutes() {
  const origin = originVenue(state.ref);
  if (!origin) {
    setStatus("Renseignez au moins une des trois adresses pour calculer les distances.");
    return;
  }
  try {
    setStatus("Calcul des itinéraires depuis " + origin.label + "…");
    await routeAllFrom(origin, DATA);
    recompute();
    hooks.render();
    setStatus("Itinéraires voiture calculés depuis " + origin.label + " (OSRM).");
    if (!state.sel) frameMap();
  } catch (e) {
    setStatus("Itinéraires indisponibles — temps estimés depuis les distances routières.");
  }
}

/**
 * Affine la position des hébergements dont les coordonnées ne sont pas fixées en
 * dur. Un résultat trop vague est refusé plutôt que d'afficher une fausse précision.
 */
export async function locateAll() {
  if (!hasMapbox()) return;
  const cache = geoCache();
  let hits = DATA.filter((h) => h.fixed).length,
    done = 0;
  const pending = [];

  for (const h of DATA) {
    done++;
    if (h.type === "location" || h.fixed) continue; // location : adresse donnée après réservation
    const c = cache[h.id];
    if (c) {
      h.lat = c.lat;
      h.lon = c.lon;
      h.addr = c.addr;
      h.geo = true;
      hits++;
      if (markers[h.id]) markers[h.id].setLatLng([h.lat, h.lon]);
      continue;
    }
    setStatus("Localisation précise des hébergements… " + done + "/" + DATA.length);
    try {
      const g = await locateByName(h);
      if (g) {
        h.lat = g.lat;
        h.lon = g.lon;
        h.addr = g.addr;
        h.geo = true;
        if (markers[h.id]) markers[h.id].setLatLng([h.lat, h.lon]);
        cache[h.id] = { lat: g.lat, lon: g.lon, addr: g.addr };
        hits++;
      } else pending.push(h);
    } catch (e) {
      pending.push(h);
    }
    recompute();
    hooks.render();
  }

  // Second passage pour ceux dont la requête a échoué (limite de débit, réseau).
  for (const h of pending) {
    try {
      const g = await locateByName(h);
      if (!g) continue;
      h.lat = g.lat;
      h.lon = g.lon;
      h.addr = g.addr;
      h.geo = true;
      if (markers[h.id]) markers[h.id].setLatLng([h.lat, h.lon]);
      cache[h.id] = { lat: g.lat, lon: g.lon, addr: g.addr };
      hits++;
    } catch (e) {}
  }

  geoCacheSave(cache);
  recompute();
  hooks.render();

  const approx = DATA.length - hits;
  state.geoNotice =
    hits +
    " adresses exactes sur " +
    DATA.length +
    (approx
      ? " — les " + approx + " autres sont placées au quartier, glissez le repère pour les corriger."
      : " — toutes les positions sont exactes.");
  setStatus();

  DATA.forEach((h) => delete h.routes);
  refreshRoutes();
}

function poiToEntry(f, type, n) {
  const p = f.properties || {},
    c = f.geometry.coordinates;
  const addr = p.full_address || p.place_formatted || "";
  if (!p.name || !addr || POI_SKIP.test(p.name)) return null;
  // Sans site propre, la fiche ne mène nulle part : elle n'a pas sa place ici.
  const site = (p.metadata && (p.metadata.website || p.metadata.wikidata_website)) || p.website || null;
  if (!site) return null;
  const city = (addr.match(/\d{5}\s+([^,]+)/) || [])[1] || addr.split(",").pop().trim();
  return {
    id: "poi-" + type + "-" + n,
    name: p.name,
    type,
    lat: c[1],
    lon: c[0],
    addr,
    geo: true,
    fixed: true,
    source: "mapbox",
    price: null,
    rating: null,
    reviews: 0,
    cap: null,
    extras: [],
    left: null,
    area: city,
    site,
    url: site,
  };
}

/** Doublon d'un hébergement déjà connu (même endroit, ou nom très proche). */
function alreadyKnown(e) {
  const key = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
  return DATA.some((d) => haversine(d, e) < 0.08 || key(d.name).includes(key(e.name).slice(0, 10)));
}

/** `force` relance un balayage frais en ignorant le cache. */
export async function loadNearby(force) {
  if (!hasMapbox()) return;
  let found = [];
  if (force) remove(KEYS.poi);
  else {
    const cached = readJSON(KEYS.poi);
    if (cached && Date.now() - cached.t < 7 * 864e5) found = cached.list;
  }

  if (!found.length) {
    const centres = VENUES.filter((v) => v.lat != null);
    if (!centres.length) {
      // Rien à balayer, et surtout : ne pas mettre en cache une liste vide.
      state.poiNotice = "Renseignez les adresses du mariage pour chercher des hébergements autour.";
      setStatus();
      return;
    }
    const seen = new Set();
    let n = 0,
      step = 0;
    const total = centres.length * RINGS.length * POI_CATS.length;
    for (const c of centres) {
      for (const km of RINGS) {
        for (const [cat, type] of POI_CATS) {
          step++;
          setStatus("Balayage concentrique — " + c.label + ", rayon " + km + " km (" + step + "/" + total + ")");
          const feats = await fetchCategory(cat, c, km);
          feats.forEach((f) => {
            const co = f.geometry && f.geometry.coordinates;
            if (!co) return;
            const k = ((f.properties && f.properties.name) || "") + "@" + co[0].toFixed(4) + "," + co[1].toFixed(4);
            if (seen.has(k)) return;
            seen.add(k);
            const e = poiToEntry(f, type, ++n);
            if (e) found.push(e);
          });
        }
      }
    }
    writeJSON(KEYS.poi, { t: Date.now(), list: found });
  }

  let added = 0;
  found.forEach((e) => {
    if (alreadyKnown(e)) return;
    DATA.push(e);
    attachMarker(e);
    added++;
  });

  if (!added) {
    state.poiNotice = "Aucun hébergement supplémentaire trouvé autour des trois adresses.";
    setStatus();
    return;
  }
  state.poiNotice =
    added +
    " hébergements supplémentaires trouvés autour des trois adresses (source Mapbox) — tarifs et avis à vérifier.";
  recompute();
  hooks.render();
  setStatus();
  refreshRoutes();
  if (!state.sel) frameMap();
}
