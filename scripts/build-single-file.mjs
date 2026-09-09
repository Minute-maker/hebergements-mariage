/**
 * Fabrique une version autonome de l'application : un seul fichier HTML, sans
 * serveur ni installation — il s'ouvre d'un double-clic depuis le disque.
 *
 * Deux contraintes imposent une compilation à part :
 *  - un fichier ouvert en `file://` ne peut pas charger de module ES, d'où le
 *    format `iife` (script classique) ;
 *  - il ne peut pas charger de fichier voisin non plus, d'où l'incorporation de
 *    la feuille de style, du script et des images dans la page elle-même.
 *
 * Usage : npm run build:single  →  dist-single/hebergements-mariage.html
 */
import { build, loadEnv } from "vite";
import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { buildDefines } from "./build-env.mjs";

const OUT_DIR = "dist-single";
const OUT_FILE = "hebergements-mariage.html";

await rm(OUT_DIR, { recursive: true, force: true });

await build({
  configFile: false,
  // `configFile: false` écarte vite.config.js : il faut réinjecter les valeurs
  // de compilation, sinon le fichier autonome part sans jeton Mapbox.
  define: buildDefines({ ...loadEnv("production", process.cwd(), ""), ...process.env }),
  build: {
    outDir: OUT_DIR,
    target: "es2022",
    cssCodeSplit: false,
    // Tout devient data-URI : plus aucun fichier voisin à charger.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      output: { format: "iife", inlineDynamicImports: true, entryFileNames: "app.js" },
    },
  },
});

const dir = join(process.cwd(), OUT_DIR);
let html = await readFile(join(dir, "index.html"), "utf8");

/* Incorpore la feuille de style. */
const cssHref = html.match(/<link rel="stylesheet"[^>]*href="\/?([^"]+\.css)"[^>]*>/);
if (cssHref) {
  const css = await readFile(join(dir, cssHref[1]), "utf8");
  html = html.replace(cssHref[0], "<style>\n" + css + "\n</style>");
}

/**
 * Incorpore le script, en script classique : `type="module"` est refusé en
 * file://. Il faut aussi le remettre en fin de `<body>` — la compilation le
 * place dans `<head>`, où un module attend le document, mais où un script
 * classique s'exécuterait avant que la page existe.
 */
const scriptTag = html.match(/<script[^>]*src="\/?([^"]+\.js)"[^>]*><\/script>/);
if (!scriptTag) throw new Error("script introuvable dans le HTML compilé");
const js = await readFile(join(dir, scriptTag[1]), "utf8");
html = html.replace(scriptTag[0], "");
html = html.replace("</body>", "<script>\n" + js + "\n</script>\n</body>");

/* Un mot pour l'utilisateur qui ouvrirait le fichier dans un éditeur. */
html = html.replace(
  "<head>",
  `<head>
<!-- Version autonome : cette page contient tout (styles, script, images).
     Ouvrez-la d'un double-clic, aucune installation n'est nécessaire.
     Le fond de carte, la recherche d'adresses et les itinéraires ont besoin
     d'une connexion internet. -->`,
);

await mkdir(dir, { recursive: true });
await writeFile(join(dir, OUT_FILE), html);
await rm(join(dir, "index.html"));
await rm(join(dir, "assets"), { recursive: true, force: true });

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`\n✓ ${OUT_DIR}/${OUT_FILE} — ${kb} Ko, autonome`);
