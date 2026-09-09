/**
 * Échappement pour les fragments HTML construits à la main.
 *
 * Les noms et adresses viennent en partie de l'annuaire Mapbox et des saisies de
 * l'utilisateur : ils sont insérés échappés, jamais bruts.
 */
const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Texte destiné au contenu d'un élément ou à la valeur d'un attribut. */
export function esc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}
