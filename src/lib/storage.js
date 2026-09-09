/** Accès au stockage local, tolérant aux navigateurs qui le refusent. */

export function readJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

export function readText(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (e) {
    return fallback;
  }
}

export function writeText(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}
