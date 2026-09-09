/** « Signaler un bug » : enregistrement local, envoi par e-mail au choix. */
import { KEYS } from "../config.js";
import { readJSON, writeJSON } from "../lib/storage.js";

export function initBugReport() {
  const button = document.getElementById("bugBtn"),
    panel = document.getElementById("bugPanel"),
    field = document.getElementById("bugText"),
    message = document.getElementById("bugMsg");

  const load = () => readJSON(KEYS.bugs, []) || [];
  const showCount = () => {
    const n = load().length;
    message.textContent = n
      ? n + " signalement" + (n > 1 ? "s" : "") + " enregistré" + (n > 1 ? "s" : "") + " sur cet appareil."
      : "";
  };

  button.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) {
      showCount();
      field.focus();
    }
  });

  document.getElementById("bugSave").addEventListener("click", () => {
    const t = field.value.trim();
    if (!t) return;
    const all = load();
    all.push({ t, at: new Date().toISOString() });
    writeJSON(KEYS.bugs, all);
    field.value = "";
    showCount();
  });

  document.getElementById("bugMail").addEventListener("click", (e) => {
    const body = field.value.trim() || load().map((b) => "- " + b.t).join("\n");
    e.currentTarget.href =
      "mailto:?subject=" +
      encodeURIComponent("Bug — hébergements mariage") +
      "&body=" +
      encodeURIComponent(body);
  });

  showCount();
}
