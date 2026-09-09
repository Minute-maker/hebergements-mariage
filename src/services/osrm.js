/**
 * Itinéraires routiers via le serveur public OSRM (sans clé).
 * Seul le profil voiture est exposé : les temps à pied et en bus restent estimés.
 */
const BASE = "https://router.project-osrm.org";

/**
 * Une seule requête « table » pour router tous les hébergements depuis un lieu.
 * Écrit le résultat dans `h.routes[origin.id]`.
 */
export async function routeAllFrom(origin, rows) {
  const coords = [[origin.lon, origin.lat]]
    .concat(rows.map((h) => [h.lon, h.lat]))
    .map((c) => c[0].toFixed(5) + "," + c[1].toFixed(5))
    .join(";");
  const r = await fetch(BASE + "/table/v1/driving/" + coords + "?sources=0&annotations=duration,distance");
  if (!r.ok) throw new Error("osrm " + r.status);
  const j = await r.json();
  if (j.code !== "Ok") throw new Error(j.code);
  rows.forEach((h, i) => {
    const sec = j.durations[0][i + 1],
      m = j.distances[0][i + 1];
    if (sec == null || m == null) return;
    h.routes = h.routes || {};
    h.routes[origin.id] = { km: m / 1000, sec: sec };
  });
}

/** Itinéraire détaillé entre deux points, avec la géométrie à tracer sur la carte. */
export async function routeLeg(a, b) {
  const c = a.lon.toFixed(5) + "," + a.lat.toFixed(5) + ";" + b.lon.toFixed(5) + "," + b.lat.toFixed(5);
  const r = await fetch(BASE + "/route/v1/driving/" + c + "?overview=full&geometries=geojson");
  if (!r.ok) return null;
  const j = await r.json();
  const rt = j.routes && j.routes[0];
  if (!rt) return null;
  return {
    coords: rt.geometry.coordinates.map((p) => [p[1], p[0]]),
    km: rt.distance / 1000,
    min: rt.duration / 60,
  };
}
