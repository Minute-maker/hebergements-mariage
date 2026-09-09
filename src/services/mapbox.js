/**
 * Services Mapbox : géocodage d'adresse, autocomplétion et annuaire de lieux.
 *
 * Le géocodage par *nom d'établissement* est peu fiable (« Camping Oyam » tombait
 * à 40 km) : `tryLocate` n'accepte donc un résultat que s'il porte un numéro et un
 * nom de rue et reste à moins de 2 km du quartier annoncé. Le géocodage par
 * *adresse*, lui, est fiable — c'est celui qu'utilisent les trois lieux du mariage.
 */
import { MAPBOX_TOKEN } from "../config.js";
import { bboxOf, haversine } from "../lib/geo.js";
import { VENUES } from "../data/venues.js";

export const hasMapbox = () => !!MAPBOX_TOKEN;

/** Centre de biais pour les recherches : barycentre des lieux déjà placés. */
export function biasCentre() {
  const placed = VENUES.filter((v) => v.lat != null);
  if (!placed.length) return null;
  return {
    lat: placed.reduce((s, v) => s + v.lat, 0) / placed.length,
    lon: placed.reduce((s, v) => s + v.lon, 0) / placed.length,
  };
}

export function proxParam() {
  const c = biasCentre();
  return c ? "&proximity=" + c.lon.toFixed(4) + "," + c.lat.toFixed(4) : "";
}

/** Compose « nom, ville » à partir des propriétés d'un résultat Mapbox. */
function formatAddress(p) {
  const base = p.full_address || p.place_formatted || "";
  return p.name && !base.toLowerCase().includes(String(p.name).toLowerCase())
    ? [p.name, base].filter(Boolean).join(", ")
    : base;
}

/** Géocodage d'une adresse saisie — un seul résultat, le meilleur. */
export async function mbSearch(q) {
  if (!MAPBOX_TOKEN) return null;
  const url =
    "https://api.mapbox.com/search/searchbox/v1/forward?q=" +
    encodeURIComponent(q) +
    proxParam() +
    "&limit=1&country=fr&language=fr&types=poi,address,street,place&access_token=" +
    MAPBOX_TOKEN;
  const r = await fetch(url);
  if (!r.ok) throw new Error("mapbox " + r.status);
  const j = await r.json();
  const f = j.features && j.features[0];
  if (!f) return null;
  const p = f.properties;
  return {
    lon: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    name: p.name,
    addr: formatAddress(p),
  };
}

/** Propositions d'adresses pour l'autocomplétion (rue en gras, commune dessous). */
export async function mbSuggest(q) {
  if (!MAPBOX_TOKEN) return [];
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(q) +
    proxParam() +
    "&limit=6&country=fr&language=fr&types=address,street,place,postcode,locality&access_token=" +
    MAPBOX_TOKEN;
  const r = await fetch(url);
  if (!r.ok) return [];
  const j = await r.json();
  return (j.features || [])
    .map((f) => {
      const p = f.properties;
      return {
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        addr: formatAddress(p),
        sub: (p.place_formatted || "").replace(", France", ""),
      };
    })
    .filter((s) => s.addr);
}

/** Un anneau du balayage concentrique : une catégorie autour d'un centre. */
export async function fetchCategory(cat, c, km) {
  if (!MAPBOX_TOKEN) return [];
  const url =
    "https://api.mapbox.com/search/searchbox/v1/category/" +
    cat +
    "?proximity=" +
    c.lon.toFixed(4) +
    "," +
    c.lat.toFixed(4) +
    "&bbox=" +
    bboxOf(c, km) +
    "&limit=25&language=fr&access_token=" +
    MAPBOX_TOKEN;
  try {
    const r = await fetch(url);
    if (!r.ok) return [];
    const j = await r.json();
    return j.features || [];
  } catch (e) {
    return [];
  }
}

/**
 * Affine la position d'un hébergement par son nom. Renvoie false — sans rien
 * modifier — si le résultat n'est pas assez précis pour être digne de confiance.
 */
export async function locateByName(h) {
  const q = h.name.replace(/\s*\(.*?\)\s*/g, " ").trim() + " " + h.area.split(",").pop().trim();
  const g = await mbSearch(q);
  if (!g || !g.addr) return null;
  if (!/^\d/.test(g.addr)) return null; // exige un numéro de rue
  if (
    !/(rue|avenue|av\.|bd|boulevard|chemin|place|pl\.|route|impasse|all[eé]e|quai|cours|promenade)/i.test(
      g.addr,
    )
  )
    return null;
  if (haversine(h, g) > 2) return null; // pas plus de 2 km du quartier annoncé
  return g;
}
