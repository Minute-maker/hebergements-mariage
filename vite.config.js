import { defineConfig } from "vite";

/**
 * Sur GitHub Pages, un site de projet est servi depuis `/<nom-du-dépôt>/` : les
 * chemins doivent en tenir compte, sinon la page charge un script introuvable et
 * reste blanche. Partout ailleurs — en local, sur Vercel, sur Netlify — le site
 * est servi à la racine, d'où la condition sur les actions GitHub uniquement.
 */
const onGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig({
  base: onGitHubPages && repo ? `/${repo}/` : "/",
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: { target: "es2022", outDir: "dist" },
});
