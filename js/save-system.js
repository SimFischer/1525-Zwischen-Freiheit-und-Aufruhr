import { sanitizeChapterSix } from '../data/chapter-six-state.js';
import { sanitizeChapterFour } from '../data/chapter-four-save.js';
import { sanitizeChapterFive } from '../data/chapter-five-state.js';
import { syncConsequences } from './consequences.js';
import { freshState } from './state.js';
import { canonicalScene, sceneById, scenes } from '../data/scenes.js';
import { choices } from '../data/choices.js';
import { sortingGames } from '../data/minigames.js';
import { grievances, reflections, demandParts } from '../data/chapter-two.js';
const KEY = '1525.freedom.save.v1';
export const TEST_KEY = '1525.freedom.test.v1';
const TEST_ACTIVE = '1525.freedom.test.active';
let testMode = false, testMemory = null;
try { testMode=sessionStorage.getItem(TEST_ACTIVE)==='true'; testMemory=sessionStorage.getItem(TEST_KEY); } catch {}
export function isTestMode() { return testMode; }
export function setTestMode(active) {
  testMode=active;
  try { if(active) sessionStorage.setItem(TEST_ACTIVE,'true'); else {sessionStorage.removeItem(TEST_ACTIVE);sessionStorage.removeItem(TEST_KEY);} } catch {}
  if(!active) testMemory=null;
}
let storageFailed = false;
export function save(state) {
  syncConsequences(state);
  if(testMode) { testMemory=JSON.stringify(state); try { sessionStorage.setItem(TEST_KEY,testMemory); } catch {} return true; }
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
  return syncConsequences(base);
}
export function load(normal = false) {
  try {
    const value = JSON.parse(testMode&&!normal ? testMemory : localStorage.getItem(KEY));
    if (!value || ![1,2,3,4].includes(value.version) || !sceneById[canonicalScene(value.scene)]) return null;
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
    for (const key of ['chapter2','chapter3','chapter4','chapter5','chapter6','forestEvidence','grievances']) if(value[key] && typeof value[key]==='object' && !Array.isArray(value[key])) base[key]={...base[key],...value[key]};
    const isRecord = item => item && typeof item === 'object' && !Array.isArray(item);
    const validList = (items, allowed, max) => Array.isArray(items) && items.length<=max && new Set(items).size===items.length && items.every(item=>allowed.includes(item));
    const c3=base.chapter3;
    if(!isRecord(c3)||typeof c3.completed!=='boolean'||!Number.isInteger(c3.printed)||c3.printed<0||c3.printed>4||!['form','ink','paper','press','remove','stack','copying','done'].includes(c3.printPhase)) return null;
    // Preserve old press saves while removing the remaining repeated cycles.
    if(value.chapter3 && value.chapter3.printSequenceVersion!==2) {
      if(c3.printed>0 || c3.printPhase==='stack') { c3.printed=Math.max(1,c3.printed); c3.printPhase=c3.printed>=4?'done':'copying'; }
      else if(c3.printPhase==='form') c3.printPhase='ink';
      c3.printSequenceVersion=2; c3.selected=null;
    }
    if(!validList(c3.pair,Array.from({length:8},(_,i)=>String(i)),8)||!validList(c3.interpretations,['A','B','C','D'],4)||!validList(c3.seenArticles,Array.from({length:12},(_,i)=>i+1),12)||!isRecord(c3.articleComparison)||!isRecord(c3.priorProfile)||!Array.isArray(c3.complaintClusters)||c3.complaintClusters.length>28||c3.complaintClusters.some(x=>!isRecord(x)||!validList(x.cards,Array.from({length:8},(_,i)=>String(i)),8)||x.cards.length<2||!['rights','dependence','voice','basis'].includes(x.reason))) return null;
    const areas=['food','seed','reserve'];
    const complaintIds=grievances.map(item=>item.id);
    if (!validList(base.choices.peterDayPlan,['grain','fence','feed'],3) || !validList(base.choices.priorityGrievances,complaintIds,3)) return null;
    if (!isRecord(base.choices.initialFarmPlan) || areas.some(key=>!Number.isInteger(base.choices.initialFarmPlan[key]) || base.choices.initialFarmPlan[key]<0 || base.choices.initialFarmPlan[key]>10)) return null;
    if (!Array.isArray(base.choices.duesFirstSacrifice) || base.choices.duesFirstSacrifice.length>3 || base.choices.duesFirstSacrifice.some(key=>!areas.includes(key))) return null;
    if (base.choices.duesSecondSacrifice!==null && ![...areas,'refuse'].includes(base.choices.duesSecondSacrifice)) return null;
    if (base.choices.playerDemand!==null && (typeof base.choices.playerDemand!=='string' || base.choices.playerDemand.length>1000)) return null;
    for (const id of ['forest','corvee','dues']) if(!validList(base.grievances[id],reflections[id].items.map(item=>item[0]),2)) return null;
    for (const key of ['forestComplete','corveeComplete','duesComplete','assemblyUnlocked','assemblyComplete']) if(typeof base.chapter2[key]!=='boolean') return null;
    if(Object.values(base.forestEvidence).some(value=>typeof value!=='boolean')) return null;
    if (!isRecord(base.chapter2.grain) || Object.entries(base.chapter2.grain).some(([key,area])=>!/^sack-[0-9]$/.test(key)||![...areas,'dues'].includes(area))) return null;
    if (!validList(base.chapter2.pair,complaintIds,2) || !Array.isArray(base.chapter2.links) || base.chapter2.links.length>28 || base.chapter2.links.some(link=>!isRecord(link)||!complaintIds.includes(link.a)||!complaintIds.includes(link.b)||link.a===link.b||!grievances.find(item=>item.id===link.a).tags.includes(link.reason)||!grievances.find(item=>item.id===link.b).tags.includes(link.reason))) return null;
    if (!isRecord(base.chapter2.demand) || Object.entries(base.chapter2.demand).some(([key,index])=>!demandParts[key]||!Number.isInteger(index)||index<0||index>=demandParts[key].length)) return null;
    if (!Array.isArray(base.chapter2.removed) || base.chapter2.removed.length>3 || base.chapter2.removed.some(item=>!isRecord(item)||!/^sack-[0-9]$/.test(item.id)||!areas.includes(item.from))) return null;
    const extended=['ch5Final','peterDayPlan','initialFarmPlan','duesFirstSacrifice','duesSecondSacrifice','priorityGrievances','playerDemand'];
    if(value.consequences && typeof value.consequences==='object') base.consequences=value.consequences;
    base.chapter = sceneById[canonicalScene(value.scene)].chapter || 1;
    for (const [key, id] of Object.entries(base.choices)) if (!extended.includes(key) && id !== null && (!choices[key] || !choices[key].options.some(option => option.id === id))) delete base.choices[key];
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
    if(!Object.hasOwn(value.chapter4||{},'regimentsIndex'))delete base.chapter4.regimentsIndex;
    sanitizeChapterFour(base);
    syncConsequences(base);
    sanitizeChapterFive(base);
    sanitizeChapterSix(base);
    return syncConsequences(base);
  } catch { return null; }
}
export function clearSave() {
  if(testMode) { testMemory=null; try {sessionStorage.removeItem(TEST_KEY);} catch {} return true; }
  try { localStorage.removeItem(KEY); return true; } catch { return false; }
}
