/**
 * Points de branchement entre modules qui se répondent mutuellement
 * (la carte a besoin des profils, les profils ont besoin de la liste, la liste a
 * besoin de la carte). Ils sont renseignés une fois pour toutes dans `main.js`.
 */
export const hooks = {
  /** Redessine la liste d'hébergements. */
  render: () => {},
  /** Redessine une seule fiche, sans toucher au reste de la liste. */
  updateCard: () => {},
  /** Profils rattachés à un hébergement. */
  sleepersOf: () => [],
  /** Repeint les avatars posés sur les repères de la carte. */
  paintPinAvatars: () => {},
  /** Relance le calcul des itinéraires depuis le lieu de référence. */
  refreshRoutes: async () => {},
};
