import { freshState } from './state.js';
import { sceneById } from '../data/scenes.js';
const KEY = '1525.freedom.save.v1';
let storageFailed = false;
export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); storageFailed = false; return true; }
  catch { if (!storageFailed) document.dispatchEvent(new CustomEvent('storage-error')); storageFailed = true; return false; }
}
export function load() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    if (!value || value.version !== 1 || !sceneById[value.scene]) return null;
    const base = freshState();
    for (const key of ['dimensions', 'relationships', 'world', 'notebook', 'progress', 'minigames']) {
      if (!value[key] || typeof value[key] !== 'object' || Array.isArray(value[key])) return null;
      base[key] = { ...base[key], ...value[key] };
    }
    for (const list of [base.notebook.entries, base.notebook.documents, base.progress.completedScenes, base.progress.visitedHotspots, base.progress.conversations, base.minigames.completed, base.minigames.puzzle]) if (!Array.isArray(list)) return null;
    if (!value.choices || typeof value.choices !== 'object' || Array.isArray(value.choices)) return null;
    base.scene = value.scene; base.choices = value.choices; base.interaction = value.interaction || null;
    base.dialogue = value.dialogue && Array.isArray(value.dialogue.lines) && Number.isInteger(value.dialogue.index) && value.dialogue.index >= 0 && value.dialogue.index < value.dialogue.lines.length ? value.dialogue : null;
    return base;
  } catch { return null; }
}
export function clearSave() { try { localStorage.removeItem(KEY); return true; } catch { return false; } }
