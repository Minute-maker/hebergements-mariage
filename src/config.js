/** Configuration de l'application. Les secrets viennent de `.env` (voir `.env.example`). */

/* Jeton public Mapbox. Absent, l'application bascule sur les tuiles OpenStreetMap
   et désactive l'autocomplétion d'adresses et la recherche d'hébergements. */
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";
export const MAPBOX_STYLE = import.meta.env.VITE_MAPBOX_STYLE || "mapbox/outdoors-v12";

/* Rayons du balayage concentrique autour de chaque lieu du mariage, en km. */
export const RINGS = [2, 5, 10, 17, 25];

/* Au-delà de cette distance des trois lieux, un hébergement est hors sujet. */
export const FAR_KM = 60;

/* Clés de stockage local. */
export const KEYS = {
  venues: "hm-venues-v1",
  geo: "hm-geo-v4",
  poi: "hm-poi-v3",
  stay: "mariage.sejour",
  events: "mariage.events",
  names: "mariage.noms",
  rail: "mariage.rail",
  bugs: "mariage.bugs",
  hero: "mariage.hero",
};
