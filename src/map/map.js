/**
 * La carte : tuiles, repères des trois lieux, cadrage.
 *
 * Deux pièges hérités du prototype, conservés parce qu'ils sont réels :
 *  - Leaflet garde une taille interne 0×0 tant que le conteneur n'a pas de taille
 *    réelle, d'où le sondage `invalidateSize()` au démarrage (voir main.js) ;
 *  - une première tuile Mapbox en erreur (403 encore en cache) ne doit pas faire
 *    basculer définitivement la carte sur OpenStreetMap : le repli n'agit que si
 *    au moins 4 tuiles échouent *et* qu'aucune n'a réussi.
 */
import L from "leaflet";
import { MAPBOX_STYLE, MAPBOX_TOKEN } from "../config.js";
import { VENUES } from "../data/venues.js";
import { DATA } from "../data/accommodations.js";
import { pass, state } from "../state.js";
import { setStatus } from "../ui/status.js";
import { markers } from "./markers.js";

let map = null;
export const getMap = () => map;

function addOSM() {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
}

function addMapbox() {
  const mb = L.tileLayer(
    "https://api.mapbox.com/styles/v1/" +
      MAPBOX_STYLE +
      "/tiles/512/{z}/{x}/{y}@2x?access_token=" +
      MAPBOX_TOKEN,
    {
      maxZoom: 20,
      tileSize: 512,
      zoomOffset: -1,
      crossOrigin: true,
      attribution:
        '© Mapbox © OpenStreetMap <a href="https://www.mapbox.com/map-feedback/" target="_blank" rel="noopener">Improve this map</a>',
    },
  ).addTo(map);

  let ok = 0,
    errs = 0,
    fellBack = false;
  mb.on("tileload", () => {
    ok++;
  });
  mb.on("tileerror", (e) => {
    // Une tuile en échec est réessayée une fois avant d'être comptée.
    if (e.tile && !e.tile.dataset.retried) {
      e.tile.dataset.retried = "1";
      e.tile.src = e.tile.src + "&r=" + Date.now();
      return;
    }
    errs++;
    if (fellBack || ok > 0 || errs < 4) return;
    fellBack = true;
    map.removeLayer(mb);
    state.tileNotice =
      "Tuiles Mapbox refusées — carte OpenStreetMap utilisée. Vérifiez les restrictions d'URL et le scope du jeton.";
    addOSM();
    setStatus();
  });
}

/** Crée la carte et ses tuiles. `handlers` branche le clic carte et le regroupement. */
export function initMap({ onMapClick, onViewChange }) {
  map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView([43.47, -1.56], 13);
  if (MAPBOX_TOKEN) addMapbox();
  else addOSM();
  map.on("click", onMapClick);
  map.on("zoomend", onViewChange);
  map.on("moveend", onViewChange);
  return map;
}

/* --- repères des trois lieux du mariage --- */

const venueMarkers = {};

export function drawVenues() {
  if (!map) return;
  VENUES.forEach((v) => {
    if (v.lat == null) {
      if (venueMarkers[v.id]) {
        map.removeLayer(venueMarkers[v.id]);
        delete venueMarkers[v.id];
      }
      return;
    }
    const isRef = state.ref === v.id;
    const html =
      '<div class="venue-dot ' +
      v.shape +
      '" style="background:' +
      v.color +
      ";" +
      (isRef ? "width:22px;height:22px" : "") +
      '"></div>';
    const icon = L.divIcon({ className: "", html, iconSize: [22, 22], iconAnchor: [11, 11] });
    // Seule l'étiquette du lieu de référence reste affichée en permanence.
    const tipOpts = { permanent: isRef, direction: "top", offset: [0, -12], className: "venue-tt" };
    if (venueMarkers[v.id]) {
      const m = venueMarkers[v.id];
      m.setLatLng([v.lat, v.lon]).setIcon(icon);
      m.unbindTooltip().bindTooltip(v.label, tipOpts);
      m.setZIndexOffset(isRef ? 1200 : 1000);
    } else {
      venueMarkers[v.id] = L.marker([v.lat, v.lon], {
        zIndexOffset: isRef ? 1200 : 1000,
        icon,
        interactive: false,
      })
        .addTo(map)
        .bindTooltip(v.label, tipOpts);
    }
  });
}

/** Met en avant le repère sélectionné. */
export function paintPins(paintAvatars) {
  DATA.forEach((h) => {
    const m = markers[h.id];
    if (!m) return;
    const el = m.getElement();
    const on = state.sel === h.id;
    m.setZIndexOffset(on ? 1500 : 0);
    if (el) {
      const p = el.querySelector(".pin");
      if (p) p.classList.toggle("sel", on);
    }
  });
  if (paintAvatars) paintAvatars();
}

/**
 * Cadre la carte sur les lieux et les hébergements affichés, puis vérifie en
 * pixels qu'aucun point ne sort du cadre — sinon on dézoome.
 */
export function frameMap() {
  if (!map) return;
  map.invalidateSize();
  if (!map.getSize().x) return;
  const pts = VENUES.filter((v) => v.lat != null)
    .map((v) => L.latLng(v.lat, v.lon))
    .concat(DATA.filter(pass).map((h) => L.latLng(h.lat, h.lon)));
  const b = L.latLngBounds(pts);
  if (!b.isValid()) return;
  map.fitBounds(b, { padding: [28, 28], maxZoom: 15 });
  for (let i = 0; i < 5; i++) {
    const s = map.getSize();
    const outside = pts.some((p) => {
      const q = map.latLngToContainerPoint(p);
      return q.x < 20 || q.y < 20 || q.x > s.x - 20 || q.y > s.y - 20;
    });
    if (!outside) break;
    const z = map.getZoom();
    if (z <= 9) break;
    map.setZoom(z - 1, { animate: false });
  }
}
