import { configureAdmin, installAdminHold, adminAction, testToolbar, ensureAdminSession, openAdmin } from './admin.js';
import { prepareAdminStateForScene } from './admin-state.js';
import { configureChapterTwo, prepareChapterTwo, chapterTwoAction, chapterTwoDrop, selectCard } from './chapter-two.js';
import { forestClues, chapterTwoDialogues } from '../data/chapter-two.js';
import { state, freshState, replaceState, addUnique, conversationDone } from './state.js';
import { load, save, clearSave, isTestMode } from './save-system.js';
import { canonicalScene, sceneById, scenes } from '../data/scenes.js';
import { chapters } from '../data/chapters.js';
import { choices } from '../data/choices.js';
import { puzzles, sortingGames } from '../data/minigames.js';
import { preloadCharacters } from '../data/characters.js';
import { sceneView, updateStage } from './scene-engine.js';
import { toggleFullscreen, fullscreenButton } from './fullscreen.js';
import { endingRevealed, resetStaging, leaveTavern, highlightHotspot } from './staging.js';
import { beginDialogue, advanceDialogue, dialogueView } from './dialogue-engine.js';
import { choiceView, recordChoice } from './choice-engine.js';
import { attempt, choiceFeedback, feedbackView } from './feedback.js';
import { openDocument } from './document-viewer.js';
import { openNotebook } from './notebook.js';
import { sortingView, puzzleView, checkSorting } from './minigames/sorting.js';
import { installDragDrop } from './minigames/dragdrop.js';
import { debugView } from './debug.js';
import { esc, button, openOverlay, closeOverlay, notify, setMode } from './ui.js';

const app = document.querySelector('#app');
let playing = false, selectedCard = null;
function showPreparedState(next,active=true) {
  resetStaging(); replaceState(next); playing=active; selectedCard=null; preloadCharacters(); render(); if(isTestMode()) persist();
}
function persist() {
  const ok = save(state), label = document.querySelector('#save-status');
  if (label && isTestMode()) { label.textContent='Testzustand · getrennt vom normalen Spielstand'; return; }
  if (label) label.textContent = ok ? '' : 'Speicherung nicht verfügbar';
}
document.addEventListener('storage-error', () => notify('Der Browser erlaubt gerade keine lokale Speicherung. Dein Fortschritt bleibt für diese Sitzung erhalten.'));
function startScreen() {
  document.body.dataset.testMode=String(isTestMode());
  resetStaging();
  playing = false;
  setMode('exploration');
  const saved = load();
  app.innerHTML = `<main class="start-screen">${fullscreenButton(true)}<div class="start-copy"><p class="start-year" data-admin-hold>1525<span class="year-dot">.</span></p><h1 data-admin-hold><span class="sr-only">1525 – </span>Zwischen Freiheit<br>und Aufruhr</h1><p class="start-description">Frühjahr 1525.<br>Ein Blatt aus Wittenberg erreicht das Dorf.<br>Am Abend wird darüber in der Taverne gesprochen.</p><div class="start-actions">${button('Neues Spiel',saved ? 'confirm-new' : 'new','class="primary"')}${saved ? button('Spiel fortsetzen','resume','class="secondary"') : ''}</div>${saved ? `<p class="resume-note">Zuletzt: ${esc(sceneById[saved.scene].title)}</p>${button('Spielstand zurücksetzen','confirm-reset','class="text-button"')}` : ''}</div></main>${testToolbar()}${debugView()}`;
}
function enterScene(id, complete = true) {
  id = canonicalScene(id);
  if (!sceneById[id]) { notify('Diese Szene ist nicht verfügbar.'); return; }
  document.querySelector('#notice').classList.remove('visible');
  resetStaging();
  if (complete) addUnique(state.progress.completedScenes,state.scene);
  state.scene = id; state.phase = 'active'; state.dialogue = null; state.interaction = null; selectedCard = null;
  const scene = sceneById[id];
  state.chapter=scene.chapter||1;
  if (scene.chapter===2) { playing=true; prepareChapterTwo(scene); render(); persist(); return; }
  if (scene.intro) beginDialogue(scene.intro,'idle');
  if (scene.kind === 'dialogue') beginDialogue(scene.dialogue,scene.choice ? 'scene-choice' : 'next-scene');
  if (scene.kind === 'task') state.interaction = { kind:'choice',id:scene.choice };
  if (scene.kind === 'document') state.phase = 'document';
  if (scene.beforeDocument) { state.phase = 'before-document'; beginDialogue(scene.beforeDocument,'open-document'); }
  if (scene.beforeGame) { state.phase = 'before-game'; beginDialogue(scene.beforeGame,'open-game'); }
  if (scene.kind === 'notebook') {
    state.notebook.unlocked = true; addUnique(state.notebook.entries,scene.entry);
    state.notebook.passages.freedom = [0,1];
  }
  if (scene.kind === 'ending') addUnique(state.progress.completedScenes,id);
  playing = true; preloadCharacters(); render(); persist();
}
function completeConversation(id) {
  addUnique(state.progress.conversations,id);
  state.progress[id + 'Conversation'] = true;
  state.dialogue = null; state.interaction = null;
}
function showFeedback(data) { state.interaction = { kind:'feedback',...data }; }
function render() {
  document.body.dataset.testMode=String(isTestMode());
  if (!playing) return startScreen();
  const scene = sceneById[state.scene], debugWasOpen = app.querySelector('.debug')?.open || false;
  if(scene.chapter===2) {
    const previousPanel=app.querySelector('#interaction'), previousScroll=previousPanel?.querySelector('.task-scroll')?.scrollTop||0;
    const focused=document.activeElement, selector=focused?.closest('#app')&&focused.dataset.action ? ['action','card','task','item','store','choice','option','reason'].filter(key=>focused.dataset[key]).map(key=>`[data-${key}="${CSS.escape(focused.dataset[key])}"]`).join('') : null;
    const previousStage=previousPanel?.dataset.stage;
    setMode(state.dialogue?'dialogue':state.interaction?'choice':scene.kind==='hub'?'exploration':'minigame'); app.innerHTML=sceneView()+debugView(debugWasOpen)+testToolbar();
    const panel=app.querySelector('#interaction');
    if(previousStage===state.chapter2.stage&&panel?.querySelector('.task-scroll')) panel.querySelector('.task-scroll').scrollTop=previousScroll;
    if(selector) (app.querySelector(selector)||panel.querySelector('button:not(:disabled)'))?.focus({preventScroll:true});
    return;
  }
  const active = document.activeElement;
  const focusSelector = active?.closest('#app') && active.dataset.action ? ['action','character','choice','option','card'].filter(key => active.dataset[key]).map(key => `[data-${key}="${CSS.escape(active.dataset[key])}"]`).join('') : null;
  const feedbackMode = state.interaction?.kind === 'feedback' ? (puzzles[state.interaction.id] ? 'puzzle' : sortingGames[state.interaction.id] ? 'minigame' : 'choice') : null;
  const mode = scene.kind === 'ending' && endingRevealed() ? 'transition' : state.dialogue ? 'dialogue' : feedbackMode || (state.interaction?.kind === 'choice' ? 'choice' : state.interaction?.kind === 'puzzle' ? 'puzzle' : scene.kind === 'sorting' ? 'minigame' : scene.kind === 'notebook' ? 'notebook' : 'exploration');
  state.uiMode = mode; setMode(mode);
  if (scene.kind === 'ending' && endingRevealed()) {
    app.innerHTML = `<main class="ending" tabindex="-1">${fullscreenButton(true)}<span class="eyebrow">Die Nacht geht zu Ende</span><div class="ending-lines">${chapters[0].next.lines.map((line,i) => `<p class="ending-line line-${i}">${esc(line)}</p>`).join('')}</div><div class="next-chapter"><h1>Kapitel 2 – ${chapters[0].next.title}</h1>${button('Der Morgen beginnt →','ch2-start','class="primary chapter-continue"')}<div class="ending-actions">${button('Zurück zum Titelbild','home','class="quiet"')}${button('Kapitel 1 erneut spielen','confirm-new','class="quiet"')}${button('Notizbuch öffnen','notebook','class="quiet"')}</div></div></main>${debugView(debugWasOpen)}${testToolbar()}`;
    return;
  }
  // Keep the same scene DOM so speaker focus can transition smoothly.
  const previousStage = app.querySelector('.stage');
  const previousView = app.querySelector('#interaction')?.dataset.view;
  const previousScroll = app.querySelector('.task-scroll')?.scrollTop || 0;
  app.innerHTML = sceneView() + debugView(debugWasOpen)+testToolbar();
  if (previousStage?.dataset.scene === scene.id) app.querySelector('.stage').replaceWith(previousStage);
  updateStage(app.querySelector('.stage'));
  const panel = app.querySelector('#interaction');
  panel.dataset.view = (state.dialogue ? 'dialogue' : state.interaction?.kind || scene.kind) + ':' + (state.interaction?.id || scene.game || scene.id);
  if (state.dialogue) panel.innerHTML = dialogueView();
  else if (state.interaction?.kind === 'choice') panel.innerHTML = choiceView(state.interaction.id);
  else if (state.interaction?.kind === 'puzzle') panel.innerHTML = puzzleView(state.interaction.id);
  else if (state.interaction?.kind === 'feedback') panel.innerHTML = feedbackView(state.interaction);
  else if (scene.kind === 'sorting') panel.innerHTML = sortingView(scene.game,selectedCard);
  else if (scene.kind === 'notebook') panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">${esc(scene.title)}</p><p>${esc(scene.instruction)}</p><div class="panel-actions">${button('Notizbuch lesen','notebook','class="secondary"')}${button('Zurück zur Taverne →','next-scene','class="primary"')}</div></section>`;
  else if (['explore','conversations'].includes(scene.kind)) {
    const finished = chapters[0].cast.every(conversationDone);
    panel.innerHTML = scene.kind === 'explore' && state.progress.flyerUnlocked ? '' : `<nav class="exploration-tools" aria-label="Erkundung"><span>${esc(scene.kind === 'explore' && state.progress.flyerUnlocked ? scene.flyerInstruction : scene.instruction)}</span>${scene.kind === 'conversations' && finished ? button('Gedanken ordnen →','next-scene','class="primary"') : ''}</nav>`;
  } else if (scene.kind === 'ending') {
    panel.innerHTML = '';
  } else panel.innerHTML = `<section class="instruction-panel"><h2>${scene.title}</h2>${button('Flugblatt öffnen','scene-document','class="primary"')}</section>`;
  app.querySelector('.game-layout').classList.toggle('task-layout',Boolean(panel.querySelector('.task-panel')));
  app.querySelector('.game-layout').classList.toggle('exploration-layout',mode === 'exploration' && ['explore','conversations','ending'].includes(scene.kind));
  if (previousView === panel.dataset.view && panel.querySelector('.task-scroll')) panel.querySelector('.task-scroll').scrollTop = previousScroll;
  if (focusSelector) {
    const same = document.querySelector(focusSelector);
    const next = selectedCard && active.dataset.action === 'sort-card' ? panel.querySelector('.sort-target:not(:disabled)') : same && !same.disabled ? same : panel.querySelector('button:not(:disabled)');
    next?.focus({preventScroll:true});
  }
  if (state.phase === 'document' && !state.dialogue && !document.querySelector('#overlay').open) openSceneDocument();
}
function openSceneDocument() {
  const scene = sceneById[state.scene];
  openDocument(scene.document,scene.passage,() => {
    if (scene.dialogue) { state.phase = 'discussion'; beginDialogue(scene.dialogue,'next-scene'); render(); persist(); }
    else enterScene(scene.next);
  });
}
function newGame() { replaceState(freshState()); enterScene(state.scene,false); }
function confirmReset(newAfter = false) {
  openOverlay(`<article class="confirmation"><p class="eyebrow">Neuanfang</p><h1 id="overlay-title">${newAfter ? 'Kapitel 1 neu beginnen?' : 'Spielstand zurücksetzen?'}</h1><p>${isTestMode()?'Nur die Entscheidungen und das Notizbuch im getrennten Testzustand werden gelöscht.':'Deine bisherigen Entscheidungen und dein Notizbuch auf diesem Gerät werden gelöscht.'}</p><div class="panel-actions">${button('Abbrechen','close-overlay','class="quiet"')}${button(newAfter ? 'Neues Spiel beginnen' : 'Spielstand löschen',newAfter ? 'reset-new' : 'reset','class="primary"')}</div></article>`,() => {},state.uiMode);
}
function afterDialogue(result) {
  if (!result) return false;
  const scene = sceneById[state.scene];
  switch (result.after) {
    case 'unlock-flyer': state.progress.flyerUnlocked = true; break;
    case 'scene-choice': state.interaction = {kind:'choice',id:scene.choice}; break;
    case 'conversation-choice': state.interaction = {kind:'choice',id:scene.conversations[result.context].choice,context:result.context}; break;
    case 'conversation-puzzle': state.interaction = {kind:'puzzle',id:scene.conversations[result.context].puzzle,context:result.context}; break;
    case 'conversation-done': completeConversation(result.context); break;
    case 'open-document': state.phase = 'document'; break;
    case 'open-game': state.phase = 'game'; break;
    case 'next-scene': enterScene(scene.next); return true;
  }
  return false;
}
function checkPuzzle() {
  const id = state.interaction.id, game = puzzles[id], context = state.interaction.context;
  const count = attempt(id,[...state.minigames.puzzle]);
  const correct = game.solution.every((item,index) => state.minigames.puzzle[index] === item);
  const assisted = !correct && count >= 3;
  if (correct || assisted) {
    addUnique(state.minigames.completed,id);
    state.minigames.resolved[id] = true;
    if (assisted) { state.minigames.assisted[id] = true; state.minigames.puzzle = [...game.solution]; }
    showFeedback({id,context,after:'after-puzzle',assisted,solution:assisted ? game.solution.join(' → ') : null,text:game.success,securing:assisted ? game.securing : null});
  } else showFeedback({id,context,after:'retry-puzzle',text:game.hints[Math.min(count-1,1)]});
}
function checkFreedomSorting() {
  const scene = sceneById[state.scene], game = sortingGames[scene.game];
  const count = attempt(scene.game,{...state.minigames.sorting});
  const correct = checkSorting(scene.game), assisted = !correct && count >= 3;
  if (correct || assisted) {
    if (assisted) {
      state.minigames.assisted[scene.game] = true;
      for (const card of game.cards) state.minigames.sorting[card.id] = card.preferred;
    }
    state.progress.freedomSortingComplete = true;
    state.minigames.resolved[scene.game] = true;
    addUnique(state.minigames.completed,scene.game);
    showFeedback({id:scene.game,after:'next-scene',assisted,text:game.success,securing:game.securing,highlights:game.cards.filter(card=>card.boundary).map(card=>card.text),solution:assisted ? game.cards.map(card=>`${card.text} → ${game.zones.find(zone=>zone.id===card.preferred).title}`).join('\n') : null});
  } else showFeedback({id:scene.game,after:'retry-sorting',text:game.hints[Math.min(count-1,1)]});
}
document.addEventListener('click',event => {
  const target = event.target.closest('[data-action]') || event.target.closest('[data-drop-zone]');
  if (!target || target.disabled) return;
  const action = target.dataset.action || (target.dataset.dropZone ? 'sort-target' : null), scene = sceneById[state.scene];
  if(action==='title') return;
  if(adminAction(action,target)) return;
  if(action.startsWith('debug-') || target.closest('.debug')) ensureAdminSession();
  if (action === 'fullscreen') return void toggleFullscreen();
  if (action === 'close-overlay') return closeOverlay();
  if (action === 'new') return newGame();
  if (action === 'confirm-new') return confirmReset(true);
  if (action === 'confirm-reset') return confirmReset(false);
  if (action === 'reset-new' || action === 'reset') { closeOverlay(); clearSave(); replaceState(freshState()); return action === 'reset-new' ? newGame() : startScreen(); }
  if (action === 'resume') {
    resetStaging();
    const saved = load(); if (!saved) return startScreen();
    replaceState(saved); playing = true; preloadCharacters();
    if (state.resumeSetup) { delete state.resumeSetup; enterScene(state.scene,false); notify('Dein bisheriger Spielstand wurde übernommen. Die neuen Aufgaben stehen bereit.'); }
    else render();
    return;
  }
  if (action === 'home') { if (playing) persist(); return startScreen(); }
  if (action === 'menu') return openOverlay(`<article class="confirmation"><p class="eyebrow">Kapitel ${state.chapter}</p><h1 id="overlay-title">Eine kurze Pause.</h1><div class="menu-actions">${button('Weiterspielen →','close-overlay','class="primary"')}${button('Zum Startbildschirm','menu-home','class="secondary"')}${button('Spielstand zurücksetzen','confirm-reset','class="quiet"')}</div></article>`,() => {},state.uiMode);
  if (action === 'menu-home') { closeOverlay(); persist(); return startScreen(); }
  if (action === 'notebook') { document.querySelector('#notice').classList.remove('visible'); return openNotebook(); }
  if (action === 'notebook-tab') return openNotebook(target.dataset.tab);
  if (action === 'archive-document') return openDocument(target.dataset.document,null,() => openNotebook('documents'),true);
  if (action === 'scene-document') return openSceneDocument();
  if(action==='debug-ch2-complete' && new URLSearchParams(location.search).get('debug')==='true') { const next=prepareAdminStateForScene('ch2_assembly'); next.scene='ch2_hub'; next.dialogue=null; next.interaction=null; next.chapter2.stage='hub'; showPreparedState(next); return; }
  if (chapterTwoAction(action,target)) { render(); persist(); return; }
  if (action === 'prop-door') {
    if (scene.kind !== 'ending') return notify('Für heute bleibst du noch hier.');
    setMode('transition');
    return leaveTavern(render);
  }
  if (action === 'next-scene') {
    if (scene.kind === 'conversations' && !chapters[0].cast.every(conversationDone)) return;
    return enterScene(scene.next);
  }
  if (action === 'character') {
    if (state.dialogue || state.interaction) return;
    const id = target.dataset.character;
    if ((scene.kind === 'conversations' && conversationDone(id)) || (scene.kind === 'explore' && id === 'jakob' && state.progress.flyerUnlocked)) {
      const replies = {
        peter: 'Peter hat mir dazu schon seine Gedanken gesagt.',
        jakob: 'Jakob hat mir dazu schon seine Gedanken gesagt.',
        anna: 'Anna wartet, was ich nun daraus mache.'
      };
      return notify(replies[id]);
    }
    if ((scene.kind === 'explore' && !scene.hotspots[id]) || scene.kind === 'ending') { highlightHotspot(target); return; }
    document.querySelector('#notice').classList.remove('visible');
    addUnique(state.progress.visitedHotspots,`${scene.id}:${id}`);
    if (scene.kind === 'explore') {
      const hotspot = scene.hotspots[id]; if (!hotspot) return;
      beginDialogue(hotspot.dialogue,hotspot.after,id);
    } else {
      const conversation = scene.conversations[id];
      beginDialogue(conversation.dialogue,conversation.puzzle ? 'conversation-puzzle' : 'conversation-choice',id);
    }
  }
  if (action === 'flyer') { document.querySelector('#notice').classList.remove('visible'); return scene.kind === 'explore' ? enterScene(scene.next) : openDocument('freedom',null,() => {},true,'Zurück in die Taverne'); }
  if (action === 'dialogue-next' && afterDialogue(advanceDialogue())) return;
  if (action === 'choose') {
    const id = target.dataset.choice, context = state.interaction.context;
    const option = recordChoice(id,target.dataset.option);
    if (!option) return;
    state.interaction = null;
    if (choices[id].reflective) beginDialogue(option.reaction,context ? 'conversation-done' : 'next-scene',context);
    else state.interaction = choiceFeedback(id,option,context);
  }
  if (action === 'feedback-next') {
    const feedback = state.interaction;
    state.interaction = null;
    switch (feedback.after) {
      case 'retry-choice': state.interaction = {kind:'choice',id:feedback.id,context:feedback.context}; break;
      case 'retry-puzzle': state.interaction = {kind:'puzzle',id:feedback.id,context:feedback.context}; break;
      case 'retry-sorting': break;
      case 'complete-conversation': completeConversation(feedback.context); break;
      case 'after-puzzle': beginDialogue(scene.conversations[feedback.context].afterPuzzle,'conversation-done',feedback.context); break;
      case 'next-scene': return enterScene(scene.next);
    }
  }
  if (action === 'puzzle-part') {
    const id = target.dataset.part, selected = state.minigames.puzzle;
    if (selected.includes(id)) selected.splice(selected.indexOf(id),1);
    else if (selected.length < 4) selected.push(id);
  }
  if (action === 'puzzle-move') {
    const index = Number(target.dataset.index), destination = index + Number(target.dataset.direction), selected = state.minigames.puzzle;
    if (destination >= 0 && destination < selected.length) [selected[index],selected[destination]] = [selected[destination],selected[index]];
  }
  if (action === 'puzzle-reset') state.minigames.puzzle = [];
  if (action === 'puzzle-check') checkPuzzle();
  if (action === 'sort-card') selectedCard = selectedCard === target.dataset.card ? null : target.dataset.card;
  if (action === 'sort-target' && selectedCard && ['god','world'].includes(target.dataset.zone)) { state.minigames.sorting[selectedCard] = target.dataset.zone; selectedCard = null; }
  if (action === 'sort-reset') { state.minigames.sorting = {}; selectedCard = null; }
  if (action === 'sort-check') checkFreedomSorting();
  if (action === 'debug-prev' || action === 'debug-next') return showPreparedState(prepareAdminStateForScene(scenes[Math.max(0,Math.min(scenes.length-1,scenes.indexOf(scene)+(action === 'debug-next' ? 1 : -1)))].id));
  if (action === 'debug-clear') { clearSave(); notify('Gespeicherten Spielstand gelöscht.'); return; }
  if (action === 'debug-documents') { state.notebook.documents = ['freedom']; state.notebook.passages.freedom = [0,1]; state.notebook.unlocked = true; notify('Alle Dokumente freigeschaltet.'); }
  if (playing) { render(); persist(); }
});
document.addEventListener('change',event => {
  if(event.target.dataset.demand) { state.chapter2.demand[event.target.dataset.demand]=Number(event.target.value); render(); persist(); }
  if (event.target.id === 'debug-scene') { ensureAdminSession(); showPreparedState(prepareAdminStateForScene(event.target.value)); }
});
configureChapterTwo({enterScene,render,persist,clues:forestClues,dialogues:chapterTwoDialogues});
installDragDrop(app,(id,zone) => { if(state.chapter===2) { chapterTwoDrop(id,zone); render(); persist(); return; } state.minigames.sorting[id] = zone; selectedCard = null; render(); persist(); },id => { if(state.chapter===2) { if(state.scene==='ch2_dues') state.chapter2.selected=id; else selectCard(id); render(); persist(); return; } selectedCard = selectedCard === id ? null : id; render(); });
configureAdmin({isPlaying:()=>playing,render,showState:showPreparedState});
installAdminHold();
const start = canonicalScene(new URLSearchParams(location.search).get('start'));
if (start && sceneById[start]) { replaceState(load() || freshState()); if(new URLSearchParams(location.search).get('debug')==='true') { ensureAdminSession(); showPreparedState(prepareAdminStateForScene(start)); } else enterScene(start,false); }
else { startScreen(); if (start) notify('Unbekannte Szenen-ID. Bitte starte mit Kapitel 1.'); }
