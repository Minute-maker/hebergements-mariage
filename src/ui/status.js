/**
 * Ligne d'état sous les trois adresses.
 *
 * Trois avis persistants (tuiles, géocodage, recherche d'hébergements) restent
 * affichés en tête ; le dernier message ponctuel vient dessous. C'est ce qui
 * évite qu'un message en écrase un autre.
 */
import { state } from "../state.js";

let lastStatus = "";

export function setStatus(text) {
  if (text !== undefined) lastStatus = text;
  const box = document.getElementById("dstat");
  if (!box) return;
  const notices = [state.tileNotice, state.geoNotice, state.poiNotice]
    .filter(Boolean)
    .map((s) => '<span style="color:var(--ink);font-weight:600">' + s + "</span>");
  box.innerHTML = notices.concat(lastStatus ? [lastStatus] : []).join("<br>");
}
