/**
 * Liens sortants d'une fiche.
 *
 * Le but de l'application est de faire atterrir sur le site de l'établissement :
 * c'est là qu'on réserve, qu'on voit les vraies photos et les vrais tarifs. Une
 * recherche Booking ou Airbnb générique n'apporte rien — un hébergement sans site
 * propre n'entre donc pas dans la liste (voir data/accommodations.js).
 *
 * Aucune donnée commerciale n'est reproduite ici (ni notes, ni avis, tarifs
 * indicatifs) : chaque fiche renvoie vers la source réelle, toujours à jour.
 */
import { originVenue } from "../data/venues.js";
import { state } from "../state.js";

/** Nom d'établissement débarrassé de ses parenthèses (« Studio (location) »). */
const cleanName = (h) => h.name.replace(/\s*\(.*?\)\s*/g, " ").trim();

/** Site propre de l'établissement, ou null s'il n'en a pas. */
export function officialSite(h) {
  return h.url || h.site || null;
}

/**
 * Itinéraire Google Maps depuis le lieu de référence — ou simple recherche du
 * lieu tant qu'aucune des trois adresses n'est renseignée.
 */
export function mapsLink(h) {
  const dest = encodeURIComponent(cleanName(h) + ", " + h.area.split(",").pop().trim());
  const o = originVenue(state.ref);
  if (!o) return "https://www.google.com/maps/search/?api=1&query=" + dest;
  return (
    "https://www.google.com/maps/dir/?api=1&origin=" +
    o.lat.toFixed(5) +
    "," +
    o.lon.toFixed(5) +
    "&destination=" +
    dest
  );
}

export function reviewsLink(h) {
  return (
    "https://www.google.com/search?q=" +
    encodeURIComponent(cleanName(h) + " " + (h.addr || h.area) + " avis")
  );
}

export function photosLink(h) {
  return (
    "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(cleanName(h) + " " + (h.addr || h.area))
  );
}
