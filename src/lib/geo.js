/** Calculs géographiques et formatage des durées. */

/** Distance à vol d'oiseau entre deux points {lat, lon}, en km. */
export function haversine(a, b) {
  const R = 6371,
    dLat = ((b.lat - a.lat) * Math.PI) / 180,
    dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180,
    la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Durée en minutes → « 12 min » ou « 1 h 05 ». */
export function mins(m) {
  m = Math.round(m);
  return m < 60 ? m + " min" : Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0");
}

/** Boîte englobante « ouest,sud,est,nord » de `km` autour d'un centre {lat, lon}. */
export function bboxOf(c, km) {
  const dLat = km / 111,
    dLon = km / (111 * Math.cos((c.lat * Math.PI) / 180));
  return [
    (c.lon - dLon).toFixed(4),
    (c.lat - dLat).toFixed(4),
    (c.lon + dLon).toFixed(4),
    (c.lat + dLat).toFixed(4),
  ].join(",");
}
