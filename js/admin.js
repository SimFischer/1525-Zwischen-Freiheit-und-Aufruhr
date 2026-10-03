import { chapterFourFields } from '../data/chapter-four-state.js';
import { applyChapterFourTestFields } from './chapter-four-admin.js';
import { adminMainTargets } from '../data/admin-targets.js';
import { syncConsequences, getSavedDecisions, setAdminOrientation } from './consequences.js';
import { orientationKeys, decisionRules, perceptionCharacters, perceptionTags } from '../data/consequences.js';
import { choices } from '../data/choices.js';
import { grievances } from '../data/chapter-two.js';
import { state, freshState, replaceState } from './state.js';
import { isTestMode, setTestMode, save, load } from './save-system.js';
import { adminTargets, adminChapterRegistry, prepareAdminStateForScene, resetAdminChapter } from './admin-state.js';
import { esc, button, openOverlay, closeOverlay, notify } from './ui.js';
const editableChoices={...choices,duesSecondSacrifice:{options:[{id:'food',text:'Vorrat / Nahrung'},{id:'seed',text:'Saatgut'},{id:'reserve',text:'Reserve'},{id:'refuse',text:'Zusätzliche Forderung verweigern'}]}};
const SNAPSHOT='1525.freedom.test.normal-snapshot';
let hooks, normalSnapshot=null, adminDetails=false;
const detailDebug=new URLSearchParams(location.search).get('debug')==='true';
try { normalSnapshot=JSON.parse(sessionStorage.getItem(SNAPSHOT)); } catch {}
export function configureAdmin(value) { hooks=value; }
export function ensureAdminSession() {
  if(isTestMode()) return;
  normalSnapshot={state:structuredClone(state),playing:hooks.isPlaying()};
  try { sessionStorage.setItem(SNAPSHOT,JSON.stringify(normalSnapshot)); } catch {}
  setTestMode(true); replaceState(structuredClone(state)); save(state); hooks.render();
}
export function testToolbar() {
  return isTestMode()?`<aside class="test-toolbar" aria-label="Lokaler Testmodus"><strong>Testmodus · separater Spielstand</strong>${button('Admin-Übersicht','admin-open')}${button('Testmodus verlassen','admin-exit')}</aside>`:'';
}
export function openAdmin(chapter=state.chapter,detailed=adminDetails) {
  adminDetails=detailDebug&&detailed;
  ensureAdminSession(); syncConsequences(state);
  const groups=adminTargets(), group=groups.find(item=>item.chapter.id===Number(chapter))||groups[0];
  const main=adminMainTargets[group.chapter.id]||[group.targets[0],group.targets.at(-1)].filter((target,index,list)=>target&&list.findIndex(item=>item?.id===target.id)===index);
  const visibleTargets=adminDetails?group.targets:main;
  openOverlay(`<article class="admin-console"><div class="overlay-top"><p class="eyebrow">Internes Testwerkzeug · nur in diesem Browser</p>${button('Weitertesten ×','close-overlay','class="quiet"')}</div><h1 id="overlay-title">Admin- / Testübersicht</h1><p class="admin-safety">Du arbeitest mit einem getrennten, vorübergehenden Test-Spielstand. Der normale Schüler-Spielstand wird weder überschrieben noch gelöscht. Beim Verlassen kehrst du zu ihm zurück.</p><nav class="notebook-tabs" aria-label="Testkapitel">${groups.map(item=>button('Kapitel '+item.chapter.id,'admin-tab',`data-chapter="${item.chapter.id}" aria-current="${item===group?'page':'false'}"`)).join('')}</nav><div class="admin-scroll"><h2>Kapitel ${group.chapter.id} – ${esc(group.chapter.title)}</h2><p>Ein Sprung setzt die benötigten Voraussetzungen automatisch.</p><div class="admin-targets">${visibleTargets.map(target=>button(esc(target.label),'admin-jump',`data-target="${target.id}"`)).join('')}</div>${detailDebug?button(adminDetails?'Hauptziele anzeigen':'Detailziele anzeigen','admin-toggle-details',`aria-pressed="${adminDetails}" data-chapter="${group.chapter.id}" class="quiet"`):''}<div class="admin-chapter-actions">${button('Ganzes Kapitel starten','admin-start',`data-chapter="${group.chapter.id}"`)}${button('Aktuelles Kapitel zurücksetzen','admin-reset-chapter')}${button('Kapitel vollständig abschließen','admin-complete',`data-chapter="${group.chapter.id}"`)}${button('Gesamten Test-Spielstand zurücksetzen','admin-reset-all')}</div>${consequenceEditor()}${detailDebug?`<details><summary>Kapitel 4 – vollständige Testfelder</summary><p>Nur im getrennten Testzustand. Kanonische Entscheidungen werden synchron übernommen; neue Szenensprünge werden weiterhin zentral vorbereitet.</p><textarea data-chapter-four spellcheck="false" aria-label="Kapitel-4-Testfelder">${esc(JSON.stringify(state.chapter4,null,2))}</textarea>${button('Kapitel-4-Testfelder übernehmen','admin-ch4-apply')}</details>`:''}<details class="admin-state"><summary>Aktuellen Spiel-State als JSON anzeigen</summary><p>Testzustand: Kapitel ${state.chapter}, ${esc(state.scene)}</p>${button('JSON kopieren','admin-copy')}<textarea readonly spellcheck="false" aria-label="Aktueller Spiel-State als lesbares JSON">${esc(JSON.stringify(state,null,2))}</textarea></details></div><div class="panel-actions">${button('Zum normalen Spiel zurück','admin-exit','class="primary"')}</div></article>`,()=>hooks.render(), 'admin');
  document.querySelector('.admin-state textarea').value=JSON.stringify(state,null,2);
}
function show(next,playing=true) {
  const overlay=document.querySelector('#overlay');
  if(overlay.open) { overlay.onclose=()=>hooks.showState(next,playing); closeOverlay(); }
  else hooks.showState(next,playing);
}
export function adminAction(action,target) {
  if(action==='admin-open') { openAdmin(state.chapter,false); return true; }
  if(!action.startsWith('admin-')) return false;
  if(action==='admin-exit') {
    const restored=normalSnapshot||{state:load(true)||freshState(),playing:Boolean(load(true))};
    setTestMode(false); normalSnapshot=null;
    try {sessionStorage.removeItem(SNAPSHOT);} catch {}
    show(restored.state,restored.playing); return true;
  }
  ensureAdminSession();
  if(action==='admin-ch4-apply'){try{applyChapterFourTestFields(state,JSON.parse(document.querySelector('[data-chapter-four]').value));state.consequences.adminScenario||={decisions:{},orientation:{},perceptions:{}};state.consequences.adminScenario.chapter4=structuredClone(state.chapter4);for(const [field,id] of Object.entries(chapterFourFields))state.consequences.adminScenario.decisions[id]=state.chapter4[field];save(state);openAdmin();notify('Kapitel-4-Testfelder übernommen.');}catch(e){notify(e.message);}return true;}
  if(action==='admin-apply-consequences') { applyEditor(); return true; }
  if(action==='admin-clear-consequences') { state.consequences.orientationAdjustments={};state.consequences.perceptionAdditions={};state.consequences.adminScenario=null;syncConsequences(state);save(state);openAdmin();return true;}
  if(action==='admin-toggle-details') openAdmin(target.dataset.chapter,!adminDetails);
  if(action==='admin-tab') openAdmin(target.dataset.chapter);
  if(action==='admin-jump') show(prepareAdminStateForScene(target.dataset.target,state.consequences.adminScenario));
  if(action==='admin-start') show(prepareAdminStateForScene(adminTargets().find(group=>group.chapter.id===Number(target.dataset.chapter)).targets[0].id));
  if(action==='admin-reset-chapter') show(resetAdminChapter(state,state.chapter));
  if(action==='admin-reset-all') show(freshState(),false);
  if(action==='admin-complete') {
    const chapter=Number(target.dataset.chapter), group=adminTargets().find(item=>item.chapter.id===chapter);
    const next=prepareAdminStateForScene(group.targets.at(-1).id); adminChapterRegistry[chapter]?.complete(next); next.progress.completedScenes=[...new Set(next.progress.completedScenes)]; show(next);
  }
  if(action==='admin-copy') {
    const text=JSON.stringify(state,null,2), field=document.querySelector('.admin-state textarea');
    const fallback=()=>{field.focus();field.select();notify('JSON ist markiert. Kopiere es mit Strg+C oder der Kopieren-Funktion deines Geräts.');};
    if(navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(()=>notify('Test-State als JSON kopiert.')).catch(fallback); else fallback();
  }
  return true;
}

function consequenceEditor() {
 const decisions=getSavedDecisions(state);
 return `<details class="admin-consequences" id="admin-consequences"><summary>Konsequenzen anzeigen / Testwerte ändern</summary><p>Nur im getrennten Test-Spielstand. Geänderte Entscheidungen und Orientierungen werden bei weiteren Szenensprüngen übernommen. „Ganzes Kapitel starten“ beginnt mit frischen Testvoraussetzungen.</p><fieldset><legend>Orientation (intern)</legend><div class="admin-orientation">${orientationKeys.map(key=>`<label>${key}<input type="number" min="0" max="100" step="0.5" data-orientation="${key}" data-current="${state.orientation[key]}" value="${state.orientation[key]}"></label>`).join('')}</div></fieldset><fieldset><legend>Gespeicherte Entscheidungen</legend>${Object.keys(decisionRules).filter(id=>editableChoices[id]).map(id=>`<label>${id}<select data-decision="${id}" data-current="${esc(state.choices[id]||'')}"><option value="">Noch nicht gewählt</option>${editableChoices[id].options.map(option=>`<option value="${option.id}" ${state.choices[id]===option.id?'selected':''}>${esc(option.text)}</option>`).join('')}</select></label>`).join('')}<label>Priorisierte Beschwerden (bis zu drei)<select multiple data-priorities data-current="${esc(JSON.stringify(state.choices.priorityGrievances))}">${grievances.map(item=>`<option value="${item.id}" ${state.choices.priorityGrievances.includes(item.id)?'selected':''}>${esc(item.title)}</option>`).join('')}</select></label><label>Eigene Forderung<textarea data-demand data-current="${esc(state.choices.playerDemand||'')}" maxlength="1000">${esc(state.choices.playerDemand||'')}</textarea></label></fieldset><fieldset><legend>Character Perceptions</legend><pre>${esc(JSON.stringify(state.perceptions,null,2))}</pre><label>Figur<select data-perception-character>${perceptionCharacters.map(id=>`<option>${id}</option>`).join('')}</select></label><label>Zusätzliche Tags (mit Komma trennen)<input data-perception-tags placeholder="community_minded, seeks_negotiation"></label><p>Erlaubt: ${esc(perceptionTags.join(', '))}</p></fieldset><details><summary>Entscheidungen und Beschwerden im Überblick</summary><pre>${esc(JSON.stringify({decisions,grievances:state.grievances,flags:state.consequences.flags},null,2))}</pre></details><div class="admin-chapter-actions">${button('Testwerte übernehmen','admin-apply-consequences')}${button('Zusätzliche Testwerte entfernen','admin-clear-consequences')}</div></details>`;
}
function applyEditor() {
 const panel=document.querySelector('#admin-consequences'), scenario=structuredClone(state.consequences.adminScenario||{decisions:{},orientation:{},perceptions:{}});
 const orientation=[...panel.querySelectorAll('[data-orientation]')];
 if(orientation.some(field=>field.value.trim()===''||!Number.isFinite(Number(field.value))||Number(field.value)<0||Number(field.value)>100)) {notify('Orientierungen müssen Zahlen zwischen 0 und 100 sein.');return;}
 const priorities=[...panel.querySelector('[data-priorities]').selectedOptions].map(option=>option.value);
 const tags=panel.querySelector('[data-perception-tags]').value.split(',').map(tag=>tag.trim()).filter(Boolean);
 if(priorities.length>3||tags.some(tag=>!perceptionTags.includes(tag))) {notify('Wähle höchstens drei Beschwerden und verwende die angegebenen Wahrnehmungs-Tags.');return;}
 for(const field of panel.querySelectorAll('[data-decision]')) if(field.value!==field.dataset.current) {
  const id=field.dataset.decision;state.choices[id]=field.value||null;scenario.decisions[id]=state.choices[id];
  if(field.value) state.choiceTexts[id]=editableChoices[id].options.find(option=>option.id===field.value).text;else delete state.choiceTexts[id];
 }
 if(JSON.stringify(priorities)!==panel.querySelector('[data-priorities]').dataset.current) state.choices.priorityGrievances=scenario.decisions.priorityGrievances=priorities;
 const demand=panel.querySelector('[data-demand]');if(demand.value!==demand.dataset.current) state.choices.playerDemand=scenario.decisions.playerDemand=demand.value||null;
 if(tags.length) {const person=panel.querySelector('[data-perception-character]').value;scenario.perceptions[person]=[...new Set([...(scenario.perceptions[person]||[]),...tags])];state.consequences.perceptionAdditions[person]=scenario.perceptions[person];}
 syncConsequences(state);
 for(const [key,value] of Object.entries(scenario.orientation)) setAdminOrientation(key,value,state);
 for(const field of orientation) if(Number(field.value)!==Number(field.dataset.current)) {scenario.orientation[field.dataset.orientation]=Number(field.value);setAdminOrientation(field.dataset.orientation,Number(field.value),state);}
 state.consequences.adminScenario=scenario;save(state);openAdmin();document.querySelector('#admin-consequences').open=true;notify('Testwerte übernommen. Weitere Sprünge verwenden dieses Testszenario.');
}

export function installAdminHold(root=document) {
  let hold=null;
  const cancel=()=>{if(hold) clearTimeout(hold.timer);hold=null;};
  const start=(target,pointer,x=0,y=0)=>{
    cancel(); const current={target,pointer,x,y}; hold=current;
    current.timer=setTimeout(()=>{if(hold===current&&target.isConnected&&!document.hidden) {cancel();openAdmin();}},5000);
  };
  root.addEventListener('pointerdown',event=>{
    const target=event.target.closest('.wordmark,[data-admin-hold]');
    if(!event.isPrimary) {cancel();return;}
    if(!target||event.button!==0) return;
    event.preventDefault(); target.setPointerCapture(event.pointerId); start(target,event.pointerId,event.clientX,event.clientY);
  });
  root.addEventListener('pointermove',event=>{if(hold&&event.pointerId===hold.pointer&&Math.hypot(event.clientX-hold.x,event.clientY-hold.y)>12) cancel();});
  for(const name of ['pointerup','pointercancel','lostpointercapture']) root.addEventListener(name,event=>{if(hold&&event.pointerId===hold.pointer) cancel();});
  root.addEventListener('contextmenu',event=>{if(event.target.closest('.wordmark,[data-admin-hold]')) event.preventDefault();});
  root.addEventListener('keydown',event=>{
    if(!event.target.closest('.wordmark,[data-admin-hold]')||!['Enter',' '].includes(event.key)) return;
    event.preventDefault(); if(!event.repeat) start(event.target,'keyboard');
  });
  root.addEventListener('keyup',event=>{if(hold?.pointer==='keyboard'&&['Enter',' '].includes(event.key)) cancel();});
  root.addEventListener('touchcancel',cancel);
  document.addEventListener('visibilitychange',cancel); window.addEventListener('blur',cancel);
}
