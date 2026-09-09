/**
 * Valeurs remplacées littéralement dans le code au moment de la compilation.
 *
 * Le jeton Mapbox est lu ici, sur la machine qui compile, puis inscrit dans le
 * fichier livré au navigateur — c'est indispensable : un jeton public `pk.` ne
 * sert à rien s'il n'atteint pas la carte.
 *
 * Deux noms sont acceptés, `MAPBOX_TOKEN` d'abord :
 *  - `MAPBOX_TOKEN` est le nom à utiliser chez un hébergeur. Un nom préfixé
 *    `VITE_` y déclenche des avertissements, voire un filtrage, parce que le
 *    préfixe signale « cette valeur ira jusqu'au navigateur » — ce qui est
 *    justement voulu ici, mais que la plateforme traite comme une erreur.
 *  - `VITE_MAPBOX_TOKEN` reste accepté pour les `.env` déjà en place.
 */
const DEFAULT_STYLE = "mapbox/outdoors-v12";

export function buildDefines(env) {
  return {
    __MAPBOX_TOKEN__: JSON.stringify(env.MAPBOX_TOKEN || env.VITE_MAPBOX_TOKEN || ""),
    __MAPBOX_STYLE__: JSON.stringify(env.MAPBOX_STYLE || env.VITE_MAPBOX_STYLE || DEFAULT_STYLE),
  };
}
