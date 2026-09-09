/**
 * Boîtes de dialogue intégrées.
 *
 * `prompt()` et `confirm()` natifs sont bloqués dans certains contextes
 * d'aperçu — et n'ont pas le style de l'application.
 */
function elements() {
  return {
    wrap: document.getElementById("dlgWrap"),
    form: document.getElementById("dlg"),
    input: document.getElementById("dlgInput"),
    title: document.getElementById("dlgTitle"),
    ok: document.getElementById("dlgOk"),
    cancel: document.getElementById("dlgCancel"),
  };
}

/** Demande une saisie. Résout avec la valeur, ou null si annulé. */
export function askText(title, defaultValue, okLabel) {
  return new Promise((resolve) => {
    const { wrap, form, input, title: t, ok, cancel } = elements();
    t.textContent = title;
    input.value = defaultValue || "";
    input.style.display = "";
    ok.textContent = okLabel || "Valider";
    wrap.classList.add("open");
    setTimeout(() => {
      input.focus();
      input.select();
    }, 20);

    function done(value) {
      wrap.classList.remove("open");
      form.onsubmit = null;
      cancel.onclick = null;
      wrap.onclick = null;
      resolve(value);
    }
    form.onsubmit = (e) => {
      e.preventDefault();
      done(input.value);
    };
    cancel.onclick = () => done(null);
    wrap.onclick = (e) => {
      if (e.target === wrap) done(null);
    };
  });
}

/** Demande une confirmation de suppression. Résout avec true / false. */
export function askConfirm(title) {
  return new Promise((resolve) => {
    const { wrap, form, input, title: t, ok, cancel } = elements();
    t.textContent = title;
    input.style.display = "none";
    ok.textContent = "Supprimer";
    wrap.classList.add("open");

    function done(value) {
      wrap.classList.remove("open");
      input.style.display = "";
      form.onsubmit = null;
      cancel.onclick = null;
      wrap.onclick = null;
      resolve(value);
    }
    form.onsubmit = (e) => {
      e.preventDefault();
      done(true);
    };
    cancel.onclick = () => done(false);
    wrap.onclick = (e) => {
      if (e.target === wrap) done(false);
    };
  });
}
