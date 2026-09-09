import { defineConfig, loadEnv } from "vite";
import { buildDefines } from "./scripts/build-env.mjs";

/**
 * Sur GitHub Pages, un site de projet est servi depuis `/<nom-du-dépôt>/` : les
 * chemins doivent en tenir compte, sinon la page charge un script introuvable et
 * reste blanche. Partout ailleurs — en local, sur Vercel, sur Netlify — le site
 * est servi à la racine, d'où la condition sur les actions GitHub uniquement.
 */
const onGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig(({ mode }) => ({
  base: onGitHubPages && repo ? `/${repo}/` : "/",
  // Les fichiers `.env` d'abord, les variables de l'hébergeur ensuite : en ligne,
  // c'est le réglage du tableau de bord qui doit l'emporter.
  define: buildDefines({ ...loadEnv(mode, process.cwd(), ""), ...process.env }),
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: { target: "es2022", outDir: "dist" },
}));
