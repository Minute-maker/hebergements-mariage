import { defineConfig } from "vite";

/**
 * Sur GitHub Pages, un site de projet est servi depuis `/<nom-du-dépôt>/` : les
 * chemins doivent en tenir compte, sinon la page charge un script introuvable et
 * reste blanche. `GITHUB_REPOSITORY` (« propriétaire/dépôt ») n'existe que dans
 * les actions GitHub, d'où la racine par défaut en local.
 */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig({
  base: repo ? `/${repo}/` : "/",
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: { target: "es2022", outDir: "dist" },
});
