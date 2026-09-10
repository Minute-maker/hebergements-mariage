/**
 * Profils invités : « qui es-tu ? », « je dors ici », « qui dort où ».
 *
 * Tout est enregistré sur l'appareil, dans l'événement actif : sans serveur, les
 * profils ne se partagent pas entre les invités. Les photos sont recadrées au
 * carré et réduites à 96 px avant stockage, pour ne pas saturer le stockage local.
 */
import { DATA } from "../data/accommodations.js";
import { esc } from "../lib/html.js";
import { hooks } from "../hooks.js";
import { getMap } from "../map/map.js";
import { markers } from "../map/markers.js";
import { askText } from "./dialog.js";
import { activeEvent, save as saveEvents } from "./events.js";

let PEOPLE = [];
let STAYS = {};
/** Profil actif : celui auquel s'applique le bouton « Je dors ici ». */
let MEID = null;

const initials = (n) =>
  n
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function avatarHTML(p, cls) {
  const style = p.photo ? "background-image:url(" + p.photo + ")" : "";
  return (
    '<span class="av' +
    (cls ? " " + cls : "") +
    '" data-av="' +
    esc(p.id) +
    '" style="' +
    style +
    '" title="' +
    esc(p.name) +
    '">' +
    (p.photo ? "" : esc(initials(p.name))) +
    "</span>"
  );
}

export function sleepersOf(id) {
  return PEOPLE.filter((p) => STAYS[p.id] === id);
}

export function sleepersHTML(h) {
  const s = sleepersOf(h.id);
  if (!s.length) return "";
  return (
    '<div class="sleepers">' +
    s.map((p) => avatarHTML(p)).join("") +
    '<span class="cnt">' +
    esc(s.map((p) => p.name).join(", ")) +
    "</span></div>"
  );
}

export function sleepBtn(h) {
  if (!MEID) return "";
  const here = STAYS[MEID] === h.id;
  return (
    '<button class="verify' +
    (here ? " on" : "") +
    '" data-sleep="' +
    esc(h.id) +
    '">' +
    (here ? "Je ne dors plus ici" : "Je dors ici") +
    "</button>"
  );
}

function renderPeople() {
  const box = document.getElementById("plist");
  box.innerHTML =
    PEOPLE.map(
      (p) =>
        '<button class="person' +
        (p.id === MEID ? " on" : "") +
        '" data-me="' +
        esc(p.id) +
        '">' +
        avatarHTML(p) +
        '<span class="pn">' +
        esc(p.name) +
        "</span>" +
        '<span class="del" data-pdel="' +
        esc(p.id) +
        '" title="Supprimer">×</span></button>',
    ).join("") || '<div class="rhint">Aucun profil pour le moment.</div>';
}

function renderRecap() {
  const box = document.getElementById("recap");
  const byHeb = {};
  PEOPLE.forEach((p) => {
    const id = STAYS[p.id];
    if (id) (byHeb[id] = byHeb[id] || []).push(p);
  });
  const ids = Object.keys(byHeb);
  const unplaced = PEOPLE.filter((p) => !STAYS[p.id]);

  let html = "<h3>Qui dort où</h3>";
  if (!ids.length && !PEOPLE.length) {
    html +=
      '<div class="none">Ajoutez des profils à gauche, puis cliquez « Je dors ici » sur un hébergement.</div>';
  } else {
    html += ids
      .map((id) => {
        const heb = DATA.find((d) => d.id === id);
        return (
          '<div class="rline"><span>' +
          esc(heb ? heb.name : id) +
          '</span><span class="who">' +
          byHeb[id].map((p) => avatarHTML(p)).join("") +
          "</span></div>"
        );
      })
      .join("");
    if (unplaced.length)
      html +=
        '<div class="rline"><span style="color:var(--muted)">Sans hébergement</span><span class="who">' +
        unplaced.map((p) => avatarHTML(p)).join("") +
        "</span></div>";
  }
  box.innerHTML = html;
}

/**
 * Taille des avatars sur la carte, en pixels, selon le zoom.
 *
 * On choisit son hébergement en fonction de là où dorment ses amis : à la vue
 * d'ensemble il faut déjà les distinguer, et de près on veut les reconnaître.
 */
function avatarSize(zoom) {
  return Math.round(Math.max(28, Math.min(52, 28 + (zoom - 11) * 4)));
}

/** Pose les avatars au-dessus des repères concernés. */
export function paintPinAvatars() {
  const map = getMap();
  const size = avatarSize(map ? map.getZoom() : 13);
  DATA.forEach((h) => {
    const m = markers[h.id];
    if (!m) return;
    const el = m.getElement();
    if (!el) return;
    const old = el.querySelector(".pinav");
    if (old) old.remove();
    const s = sleepersOf(h.id);
    if (!s.length) return;
    const wrap = document.createElement("div");
    wrap.className = "pinav";
    wrap.style.setProperty("--pinav", size + "px");
    wrap.innerHTML =
      s
        .slice(0, 3)
        .map((p) => avatarHTML(p))
        .join("") + (s.length > 3 ? '<span class="more">+' + (s.length - 3) + "</span>" : "");
    wrap.title = s.map((p) => p.name).join(", ");
    el.style.position = "relative";
    el.appendChild(wrap);
  });
}

/** Enregistre dans l'événement actif et redessine tout ce qui montre des profils. */
function sync() {
  const cur = activeEvent();
  if (cur) {
    cur.people = PEOPLE;
    cur.stays = STAYS;
    cur.me = MEID;
    saveEvents();
  }
  renderPeople();
  renderRecap();
  hooks.render();
  paintPinAvatars();
}

/** Recadre au carré et réduit à 96 px, en JPEG — une photo brute ferait déborder le stockage. */
function shrinkImage(file, cb) {
  const fr = new FileReader();
  fr.onload = () => {
    const img = new Image();
    img.onload = () => {
      const s = 96,
        c = document.createElement("canvas");
      c.width = c.height = s;
      const ctx = c.getContext("2d");
      const k = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - k) / 2, (img.height - k) / 2, k, k, 0, 0, s, s);
      cb(c.toDataURL("image/jpeg", 0.72));
    };
    img.src = fr.result;
  };
  fr.readAsDataURL(file);
}

export function initPeople() {
  const cur = activeEvent() || {};
  PEOPLE = cur.people || [];
  STAYS = cur.stays || {};
  MEID = cur.me || (PEOPLE[0] && PEOPLE[0].id) || null;
  renderPeople();
  renderRecap();

  document.getElementById("addPerson").addEventListener("click", () => {
    askText("Prénom / nom de la personne", "", "Ajouter").then((n) => {
      if (!n || !n.trim()) return;
      const p = { id: "p" + Date.now(), name: n.trim(), photo: null };
      PEOPLE.push(p);
      MEID = p.id;
      sync();
    });
  });

  const plist = document.getElementById("plist");
  const avFile = document.getElementById("avFile");
  let avTarget = null;

  avFile.addEventListener("change", () => {
    const f = avFile.files && avFile.files[0];
    const p = PEOPLE.find((x) => x.id === avTarget);
    avFile.value = "";
    if (!f || !p || !/^image\//.test(f.type)) return;
    shrinkImage(f, (url) => {
      p.photo = url;
      sync();
    });
  });

  plist.addEventListener("click", (e) => {
    const av = e.target.closest(".av[data-av]");
    if (av) {
      e.stopPropagation();
      avTarget = av.dataset.av;
      avFile.click();
      return;
    }
    const d = e.target.closest("[data-pdel]");
    if (d) {
      e.stopPropagation();
      const id = d.dataset.pdel;
      PEOPLE = PEOPLE.filter((p) => p.id !== id);
      delete STAYS[id];
      if (MEID === id) MEID = PEOPLE[0] ? PEOPLE[0].id : null;
      sync();
      return;
    }
    const b = e.target.closest("[data-me]");
    if (!b) return;
    MEID = b.dataset.me;
    sync();
  });

  /* Glisser-déposer d'une photo sur n'importe quel avatar de la page. */
  document.addEventListener("dragover", (e) => {
    const av = e.target.closest(".av[data-av]");
    if (!av) return;
    e.preventDefault();
    av.classList.add("drop");
  });
  document.addEventListener("dragleave", (e) => {
    const av = e.target.closest(".av[data-av]");
    if (av) av.classList.remove("drop");
  });
  document.addEventListener("drop", (e) => {
    const av = e.target.closest(".av[data-av]");
    if (!av) return;
    e.preventDefault();
    av.classList.remove("drop");
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (!f || !/^image\//.test(f.type)) return;
    const p = PEOPLE.find((x) => x.id === av.dataset.av);
    if (!p) return;
    shrinkImage(f, (url) => {
      p.photo = url;
      sync();
    });
  });

  /* Capture : le bouton « Je dors ici » vit dans les fiches, redessinées en continu. */
  document.addEventListener(
    "click",
    (e) => {
      const b = e.target.closest("[data-sleep]");
      if (!b) return;
      e.stopPropagation();
      if (!MEID) {
        askText("Ajoutez d'abord votre profil (colonne de gauche)", "", "Ajouter").then((n) => {
          if (!n || !n.trim()) return;
          const p = { id: "p" + Date.now(), name: n.trim(), photo: null };
          PEOPLE.push(p);
          MEID = p.id;
          STAYS[MEID] = b.dataset.sleep;
          sync();
        });
        return;
      }
      const id = b.dataset.sleep;
      if (STAYS[MEID] === id) delete STAYS[MEID];
      else STAYS[MEID] = id;
      sync();
    },
    true,
  );
}
