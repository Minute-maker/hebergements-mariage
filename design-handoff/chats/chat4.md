# Les boutons du site

_Started 2026-09-09 18:02 UTC_

---

## User

Continuing from "Nom du mariage".

## Assistant

We've built a multi-event wedding accommodation picker with guest profiles, now generalized to work anywhere (not just Biarritz).

**What we're working on:** A single-file accommodation finder that lets you manage multiple weddings, each with three custom venue locations, editable dates, guest profiles with avatars, and a "who sleeps where" dashboard. The core search uses concentric rings (2, 5, 10, 17, 25 km) around each venue to avoid missing accommodations.

**Key decisions made:**
- Local-only storage: all profiles, assignments, and events saved to device; no server or cross-device sync yet.
- Avatar photos: drag-drop or click to upload per guest, displayed on accommodation cards and map markers.
- Geofencing removed: initial Biarritz bias and 60 km lockout deleted — any three addresses now work (Paris, London, etc.).
- Concentric search: five radius rings per venue category, 45 queries total, much lower omission rate; rings no longer visible by default.
- Venue labeling: each event keeps its own three venue names (defaults: "Cérémonie civile", "Cérémonie religieuse", "Lieu de réception").
- Left panel collapsible: languette button (now black, 22px, high-contrast chevron) toggles the sidebar; state memorized.
- Dialog boxes: native `prompt()` replaced with integrated dialogs (add guest, set budget, confirm delete, rename event).
- Photo placement: large drop zone at top of sidebar (above event title); shared across all events for now.

**Current state:**
- ~50 Biarritz accommodations pre-loaded; any new venue triggers fresh concentric search.
- Three venues editable by text/autocomplete/map click, addresses refined by geocoding.
- Guest profiles: add/remove, avatar photo, "Je dors ici" button, "Qui dort où" recap updated in real time.
- Map: markers cluster intelligently (exclude occupied accommodations and selected one), avatars painted per clustering.
- Bug report button: bottom right, opens dialog, stored locally.
- All external links (photos, reviews) point to live Booking/Avis sources.

**Next steps:**
- If you want per-event photos, I'll silo them.
- Consider export (guest list, assignments, route PDFs).

**Files:** `hebergements-mariage.html` (~2000 lines).

## User

il faut que les boutons aille sur les site

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: run_script]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: ready_for_verification]_

« Voir / réserver » ouvre maintenant une vraie page de réservation : recherche Booking.com (hôtels, chambres d'hôtes) ou Airbnb (locations), avec le nom + l'adresse et les dates du mariage pré-remplies. Quand l'hébergement expose un site web, un bouton « Site officiel » s'ajoute à côté. Les boutons Google Maps / Photos / Avis restent inchangés.

## User

il faut que je puisse la recadrer

## Assistant

_[tool: run_script]_

_[tool: grep]_

_[tool: grep]_

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Le recadrage est déjà intégré au cadre photo : double-cliquez dessus (ou survolez et cliquez « Edit »), puis glissez pour déplacer, molette ou coins pour zoomer, Échap pour valider. J'ai ajouté la mention sous la photo pour que ce soit visible. Le cadrage est mémorisé.

