import { freshState } from './state.js';
import { canonicalScene, sceneById, scenes } from '../data/scenes.js';
import { choices } from '../data/choices.js';
import { sortingGames } from '../data/minigames.js';
const KEY = '1525.freedom.save.v1';
let storageFailed = false;
export function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); storageFailed = false; return true; }
  catch { if (!storageFailed) document.dispatchEvent(new CustomEvent('storage-error')); storageFailed = true; return false; }
}
function migrate(value) {
  const base = freshState();
  const legacyIds = ['freedom_no_obedience', 'freedom_different_kind', 'freedom_life_tension', 'freedom_responsibility'];
  const legacyTexts = [
    'Dann braucht ein Christ keinem Menschen mehr zu gehorchen.',
    'Vielleicht spricht Luther von einer anderen Art von Freiheit.',
    'So wie es dort steht, widerspricht es unserer Lebenswirklichkeit.',
    'Vielleicht bedeutet Freiheit nicht, keine Verantwortung mehr zu haben.'
  ];
  const first = ['A','B','C','D'].indexOf(value.choices?.initialFreedomInterpretation);
  if (first >= 0) { base.choices.initialFreedomInterpretation = legacyIds[first]; base.choiceTexts.initialFreedomInterpretation = legacyTexts[first]; }
  base.notebook.documents = Array.isArray(value.notebook?.documents) ? value.notebook.documents.filter(id => id === 'freedom') : [];
  base.notebook.passages = value.notebook?.passages || {};
  base.progress.flyerUnlocked = Boolean(value.progress?.flyerUnlocked);
  const id = canonicalScene(value.scene);
  base.scene = scenes.findIndex(s => s.id === id) >= scenes.findIndex(s => s.kind === 'conversations') ? 'ch1_s5_conversations' : id;
  base.resumeSetup = true;
  return base;
}
export function load() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY));
    if (!value || ![1,2,3].includes(value.version) || !sceneById[canonicalScene(value.scene)]) return null;
    if (value.version === 1) return migrate(value);
    const base = freshState();
    for (const key of ['dimensions','relationships','world','notebook','progress','minigames','choices','choiceTexts']) {
      if (!value[key] || typeof value[key] !== 'object' || Array.isArray(value[key])) return null;
      base[key] = { ...base[key], ...value[key] };
    }
    for (const list of [base.notebook.entries, base.notebook.documents, base.progress.completedScenes, base.progress.visitedHotspots, base.progress.conversations, base.minigames.completed, base.minigames.puzzle]) if (!Array.isArray(list)) return null;
    for (const key of ['sorting','attempts','resolved','assisted','history']) if (!base.minigames[key] || typeof base.minigames[key] !== 'object' || Array.isArray(base.minigames[key])) return null;
    if (value.version === 2) {
      const oldAxis = base.minigames.axis;
      if (!oldAxis || typeof oldAxis !== 'object' || Array.isArray(oldAxis) || Object.values(oldAxis).some(n => typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100)) return null;
      base.minigames.sorting = Object.fromEntries(sortingGames.freedomSorting.cards.filter(card=>oldAxis[card.id]!==undefined).map(card=>[card.id,oldAxis[card.id]<=50 ? 'god' : 'world']));
      base.progress.freedomSortingComplete = Boolean(base.progress.freedomAxisComplete);
      delete base.progress.freedomAxisComplete;
      delete base.minigames.axis;
      for (const key of ['attempts','resolved','assisted','history']) for (const id of ['freedomAxis','serviceBoundary','obedienceBoundary','innerConsolidation','politicalConsolidation']) delete base.minigames[key][id];
      base.minigames.completed = base.minigames.completed.map(id=>id==='freedomAxis' ? 'freedomSorting' : id);
      base.progress.completedScenes = base.progress.completedScenes.map(canonicalScene);
      for (const id of ['serviceBoundary','obedienceBoundary','innerConsolidation','politicalConsolidation']) { delete base.choices[id]; delete base.choiceTexts[id]; }
    }
    if (Object.entries(base.minigames.sorting).some(([id,zone])=>!sortingGames.freedomSorting.cards.some(card=>card.id===id) || !['god','world'].includes(zone))) return null;
    for (const [key, id] of Object.entries(base.choices)) if (id !== null && (!choices[key] || !choices[key].options.some(option => option.id === id))) delete base.choices[key];
    base.scene = canonicalScene(value.scene); base.phase = value.phase || 'active';
    base.interaction = value.interaction || null;
    if (base.interaction && !['choice','puzzle','feedback'].includes(base.interaction.kind)) return null;
    if (base.interaction?.kind === 'choice' && !choices[base.interaction.id]) return null;
    base.dialogue = value.dialogue && Array.isArray(value.dialogue.lines) && value.dialogue.lines.every(line => typeof line.text === 'string') && Number.isInteger(value.dialogue.index) && value.dialogue.index >= 0 && value.dialogue.index < value.dialogue.lines.length ? value.dialogue : null;
    if (value.version === 2 && scenes.findIndex(scene=>scene.id===base.scene)>=scenes.findIndex(scene=>scene.kind==='sorting') && scenes.findIndex(scene=>scene.id===base.scene)<scenes.findIndex(scene=>scene.kind==='notebook')) {
      base.scene = 'ch1_s6_freedom_sorting'; base.phase = 'active'; base.dialogue = null; base.interaction = null; base.resumeSetup = true;
      base.progress.freedomSortingComplete = false;
      base.progress.completedScenes = base.progress.completedScenes.filter(id=>!id.startsWith('ch1_s6'));
      base.minigames.completed = base.minigames.completed.filter(id=>id!=='freedomSorting');
    }
    return base;
  } catch { return null; }
}
export function clearSave() { try { localStorage.removeItem(KEY); return true; } catch { return false; } }
