# Hébergements — mariage

Application web pour choisir où dormir autour d'un mariage : les trois lieux
(cérémonie civile, cérémonie religieuse, réception), une carte, une liste
filtrable d'hébergements avec distances et temps de trajet réels, et un
récapitulatif « qui dort où » pour les invités.

Implémentation du design exporté depuis Claude Design — le bundle d'origine
(transcriptions des échanges, prototype HTML, système de design Clay) est
conservé tel quel dans `design-handoff/`.

## Démarrer

```bash
npm install
cp .env.example .env      # puis collez votre jeton public Mapbox
npm run dev               # http://localhost:5173
```

`npm run build` produit le site statique dans `dist/`, `npm run preview` le sert.

### Version autonome, sans rien installer

```bash
npm run build:single      # → dist-single/hebergements-mariage.html
```

Un seul fichier qui contient tout (styles, script, images) et s'ouvre d'un
double-clic depuis le disque — pratique pour envoyer l'application à quelqu'un.
Deux différences avec la version servie :

- le jeton Mapbox y est **incorporé au moment de la compilation** ; ne diffusez ce
  fichier qu'à des gens à qui vous confiez votre jeton ;
- ouverte en `file://`, la page a pour origine `null`, que les restrictions d'URL
  d'un jeton Mapbox rejettent en général : la carte retombe alors sur
  OpenStreetMap, et l'autocomplétion d'adresses ne répond pas. Pour l'éviter, il
  faut lever la restriction d'URL du jeton — ou servir la page (`npm run preview`)
  depuis un domaine autorisé.

L'application fonctionne **sans jeton Mapbox** : elle bascule sur les tuiles
OpenStreetMap. Sans jeton, deux fonctions sont indisponibles — l'autocomplétion
d'adresses et la recherche d'hébergements autour des lieux (les deux passent par
l'annuaire Mapbox). Les itinéraires voiture, eux, viennent d'OSRM, qui ne demande
pas de clé.

### Le jeton Mapbox

`.env` n'est pas versionné : chaque machine a besoin de sa propre copie. Le jeton
doit être **public** (`pk.`), jamais secret (`sk.`) — il est visible par quiconque
ouvre la page. Restreignez-le dans la console Mapbox aux domaines qui servent
l'application (section *URL restrictions*) et vérifiez qu'il porte le scope
`styles:tiles`.

Le jeton qui figurait en clair dans le prototype est exposé (il est dans le
prototype comme dans les transcriptions) : mieux vaut le remplacer par un jeton
neuf et restreint.

### Publier en ligne (GitHub Pages)

Le dépôt contient une action GitHub qui compile et publie l'application à chaque
envoi sur `main`. Une seule chose à activer, une fois : **Settings → Pages →
Source : GitHub Actions**. L'adresse est ensuite
`https://<compte>.github.io/<dépôt>/`.

Le jeton Mapbox est facultatif. Pour l'utiliser en ligne, ajoutez-le en secret de
dépôt (**Settings → Secrets and variables → Actions → New repository secret**),
sous le nom `VITE_MAPBOX_TOKEN`, et autorisez `https://<compte>.github.io/*` dans
les restrictions d'URL du jeton. Sans secret, la carte utilise OpenStreetMap et
tout le reste fonctionne, sauf l'autocomplétion d'adresses et la recherche
d'hébergements.

## Ce que fait l'application

- **Trois lieux par mariage.** Chaque ligne se modifie sur place (autocomplétion
  d'adresses, ou clic sur la carte pour poser le point). Cliquer une ligne en fait
  le **lieu de référence** : distances, temps de trajet, filtre de distance et tri
  se recalculent depuis ce point. Les trois lieux ont des formes distinctes sur la
  carte : carré, losange, rond.
- **Liste filtrable** par type, budget, distance et nombre de personnes ; tri par
  distance ou par prix. Le filtre de distance s'applique au plus éloigné des trois
  lieux.
- **Carte synchronisée** : sélectionner une fiche met son repère en avant et zoome
  dessus, cliquer un repère fait défiler la liste jusqu'à la fiche. Les repères
  trop proches se regroupent en pastilles cliquables ; un repère se déplace à la
  main si sa position est fausse (la correction est conservée).
- **Itinéraires réels** (OSRM) : distance et temps voiture depuis le lieu de
  référence, trajets tracés entre les trois lieux, et « Itinéraire vers les 3
  lieux » depuis n'importe quel hébergement. À pied et en bus restent estimés,
  marqués `≈`.
- **Recherche concentrique** : cinq rayons (2, 5, 10, 17, 25 km) autour de chacun
  des trois lieux, par catégorie, avec déduplication — beaucoup moins d'oublis
  qu'une seule requête large. Mise en cache une semaine ; le bouton
  « Rechercher les hébergements autour de ces lieux » relance un balayage frais.
- **Plusieurs mariages** dans l'année : chaque événement garde ses prénoms, ses
  dates, ses trois lieux, son budget et ses profils invités.
- **Profils invités** : chacun ajoute son profil et sa photo, clique « Je dors ici »
  sur un hébergement, et le récapitulatif « Qui dort où » se remplit — avec les
  avatars sur les fiches et sur les repères de la carte.

## Ce que l'application ne fait pas

Ces limites sont assumées, pas des oublis — elles ont été discutées pendant la
conception (voir `design-handoff/chats/`) :

- **Ni notes ni avis.** Ils ne sont pas vérifiables établissement par
  établissement ; chaque fiche renvoie vers les avis réels plutôt que d'afficher
  un chiffre invérifiable.
- **Pas de photos d'établissement.** Même raison : un lien « Photos » ouvre les
  images réelles.
- **Tarifs indicatifs.** Ceux de la sélection d'origine datent de la conception ;
  les hébergements trouvés par la recherche affichent « tarif à vérifier ». Aucun
  prix n'est lu en direct pour vos dates.
- **Adresses des locations de particuliers.** Airbnb ne communique l'adresse
  exacte qu'après réservation : leur repère est placé au quartier, et la fiche le
  dit.
- **Tout est stocké sur l'appareil.** Sans serveur, vos amis ne voient pas vos
  affectations et vous ne voyez pas les leurs.

## Organisation du code

```
index.html              structure de la page
src/
  main.js               démarrage et branchements
  config.js             jeton, style de carte, rayons, clés de stockage
  state.js              état, filtres, tri, calcul des distances
  hooks.js              points de branchement entre modules mutuellement dépendants
  data/                 les trois lieux, les types, la sélection d'hébergements
  lib/                  géométrie, stockage local, échappement HTML
  services/             Mapbox (géocodage, annuaire), OSRM, recherche concentrique
  map/                  carte, repères, regroupement, tracés
  ui/                   liste, filtres, adresses, événements, profils, dialogues
  components/           <image-slot> (dépôt et recadrage d'une photo)
  styles/               feuille de style de l'application + jetons Clay
design-handoff/         bundle d'origine (transcriptions, prototype, design system)
```

Le CSS est repris à l'identique du prototype pour garder le rendu au pixel près.
Les jetons Clay (couleurs, typographie, espacements, rayons) sont copiés depuis
`design-handoff/project/_ds/`.

## Écarts par rapport au prototype

- **Leaflet est empaqueté** au lieu d'être chargé depuis un CDN : le prototype ne
  démarre pas du tout sans accès à unpkg.
- **Le jeton Mapbox sort du code** et passe par `.env`.
- **La photo du couple est conservée dans le navigateur** (stockage local) au lieu
  du fichier annexe qu'écrivait l'outil de design, qui n'existe pas ici. Le
  recadrage est inchangé.
- **Correction : un événement sans lieu placé ne casse plus la page.** Le
  prototype construisait un lien d'itinéraire depuis un lieu absent, ce qui
  interrompait tout l'affichage de la liste — c'est l'état par défaut d'un
  événement nouvellement créé. Les distances affichent désormais une invite tant
  qu'aucune adresse n'est renseignée.
- **Noms et adresses sont échappés** avant d'être insérés dans la page : une partie
  vient de l'annuaire Mapbox et des saisies libres.
- **« Je dors ici » sans profil** ouvre la boîte de dialogue d'ajout de profil au
  lieu d'une alerte navigateur.

## Reste à faire

- La photo du couple est commune à tous les événements ; la cloisonner par
  événement demande d'indexer l'emplacement sur l'identifiant de l'événement.
- Rien n'est partagé entre appareils : un vrai partage des affectations entre
  invités demanderait un serveur.
