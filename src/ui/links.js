/**
 * Liens sortants d'une fiche.
 *
 * Aucune donnée commerciale n'est reproduite dans l'application (prix indicatifs,
 * ni notes ni avis) : chaque fiche renvoie vers la source réelle, toujours à jour.
 * Les dates du séjour sont injectées quand le site les accepte.
 */
import { originVenue } from "../data/venues.js";
import { state } from "../state.js";

/** Nom d'établissement débarrassé de ses parenthèses (« Studio (location) »). */
const cleanName = (h) => h.name.replace(/\s*\(.*?\)\s*/g, " ").trim();

function stayDates() {
  const a = document.getElementById("dateIn"),
    b = document.getElementById("dateOut");
  return a && b && a.value && b.value ? { in: a.value, out: b.value } : null;
}

/** Recherche Booking (hôtels, chambres d'hôtes) ou Airbnb (locations), dates comprises. */
export function bookUrl(h) {
  const q = cleanName(h) + " " + (h.addr || h.area || "");
  const base =
    h.type === "location"
      ? "https://www.airbnb.fr/s/" + encodeURIComponent(q) + "/homes"
      : "https://www.booking.com/searchresults.fr.html?ss=" + encodeURIComponent(q);
  const u = new URL(base);
  const d = stayDates();
  if (d) {
    u.searchParams.set("checkin", d.in);
    u.searchParams.set("checkout", d.out);
  }
  return u.toString();
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
