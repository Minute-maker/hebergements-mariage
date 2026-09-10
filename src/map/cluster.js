/**
 * Regroupement des repères.
 *
 * À la vue d'ensemble, une dizaine d'hébergements du centre-ville tiennent dans
 * 40 px : sans regroupement, un seul serait cliquable. Les repères à moins de
 * 30 px fusionnent donc en une pastille numérotée qui zoome sur le groupe au clic.
 *
 * Restent toujours affichés seuls : l'hébergement sélectionné et ceux où dort
 * quelqu'un — sinon leur marqueur disparaît du DOM et l'avatar avec.
 */
import L from "leaflet";
import { DATA } from "../data/accommodations.js";
import { state } from "../state.js";
import { hooks } from "../hooks.js";
import { getMap, paintPins } from "./map.js";
import { markers } from "./markers.js";
import { drawTraces } from "./traces.js";

const clusterMarkers = [];
let clustering = false;

/** Distance en pixels sous laquelle deux repères fusionnent. */
const MERGE_PX = 30;

const centreOf = (g) => ({
  x: g.reduce((s, x) => s + x.p.x, 0) / g.length,
  y: g.reduce((s, x) => s + x.p.y, 0) / g.length,
});

export function cluster() {
  const map = getMap();
  if (!map || clustering) return;
  clustering = true;

  clusterMarkers.forEach((m) => map.removeLayer(m));
  clusterMarkers.length = 0;

  const visible = state.visible || new Set();
  DATA.forEach((h) => {
    const m = markers[h.id];
    if (m && map.hasLayer(m)) map.removeLayer(m);
  });

  const pts = DATA.filter((h) => visible.has(h.id) && markers[h.id]).map((h) => ({
    h,
    p: map.latLngToContainerPoint([h.lat, h.lon]),
  }));
  const standsAlone = (id) => state.sel === id || hooks.sleepersOf(id).length > 0;

  const used = new Set(),
    groups = [];
  pts.forEach((a) => {
    if (used.has(a.h.id)) return;
    used.add(a.h.id);
    const g = [a];
    if (!standsAlone(a.h.id)) {
      pts.forEach((b) => {
        if (used.has(b.h.id) || standsAlone(b.h.id)) return;
        if (a.p.distanceTo(b.p) < MERGE_PX) {
          g.push(b);
          used.add(b.h.id);
        }
      });
    }
    groups.push(g);
  });

  // Fusionne les groupes dont les pastilles se recouvriraient encore.
  for (let round = 0; round < 4; round++) {
    let merged = false;
    for (let i = 0; i < groups.length && !merged; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        if (groups[i].some((x) => standsAlone(x.h.id)) || groups[j].some((x) => standsAlone(x.h.id)))
          continue;
        const a = centreOf(groups[i]),
          b = centreOf(groups[j]);
        if (Math.hypot(a.x - b.x, a.y - b.y) < MERGE_PX) {
          groups[i] = groups[i].concat(groups[j]);
          groups.splice(j, 1);
          merged = true;
          break;
        }
      }
    }
    if (!merged) break;
  }

  groups.forEach((g) => {
    if (g.length === 1) {
      markers[g[0].h.id].addTo(map);
      return;
    }
    const lat = g.reduce((s, x) => s + x.h.lat, 0) / g.length,
      lon = g.reduce((s, x) => s + x.h.lon, 0) / g.length;
    const min = Math.min.apply(null, g.map((x) => (x.h.price == null ? Infinity : x.h.price)));
    // Au premier plan : les pastilles passent devant les repères de lieux (1000–1200).
    const cm = L.marker([lat, lon], {
      zIndexOffset: 1400,
      icon: L.divIcon({
        className: "",
        html: '<div class="cluster">' + g.length + "</div>",
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      }),
    });
    cm.on("click", () => {
      const b = L.latLngBounds(g.map((x) => [x.h.lat, x.h.lon]));
      map.fitBounds(b.pad(0.5), { maxZoom: 17, padding: [50, 50] });
    });
    cm.bindTooltip(
      g.length + " hébergements ici" + (isFinite(min) ? ", dès " + min + " €" : "") + " — cliquez pour zoomer",
      { direction: "top", offset: [0, -12] },
    );
    cm.addTo(map);
    clusterMarkers.push(cm);
  });

  paintPins(hooks.paintPinAvatars, (id) => hooks.sleepersOf(id).length > 0);
  clustering = false;
  drawTraces();
}
