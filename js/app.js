import { state, freshState, replaceState, addUnique, conversationDone } from './state.js';
import { load, save, clearSave } from './save-system.js';
import { canonicalScene, sceneById, scenes } from '../data/scenes.js';
import { chapters } from '../data/chapters.js';
import { choices } from '../data/choices.js';
import { puzzles, sortingGames } from '../data/minigames.js';
import { preloadCharacters } from '../data/characters.js';
import { sceneView, updateStage } from './scene-engine.js';
import { beginDialogue, advanceDialogue, dialogueView } from './dialogue-engine.js';
import { choiceView, recordChoice } from './choice-engine.js';
import { attempt, choiceFeedback, feedbackView } from './feedback.js';
import { openDocument } from './document-viewer.js';
import { openNotebook } from './notebook.js';
import { axisView, puzzleView, checkAxis, axisPosition } from './minigames/sorting.js';
import { installDragDrop } from './minigames/dragdrop.js';
import { debugView } from './debug.js';
import { esc, button, openOverlay, closeOverlay, notify, setMode } from './ui.js';

const app = document.querySelector('#app');
let playing = false, selectedCard = null;
function persist() {
  const ok = save(state), label = document.querySelector('#save-status');
  if (label) label.textContent = ok ? '✓ Spielstand gespeichert · auf diesem Gerät' : 'Speicherung nicht verfügbar';
}
document.addEventListener('storage-error', () => notify('Der Browser erlaubt gerade keine lokale Speicherung. Dein Fortschritt bleibt für diese Sitzung erhalten.'));
function startScreen() {
  playing = false;
  setMode('exploration');
  const saved = load();
  app.innerHTML = `<main class="start-screen"><div class="start-copy"><div class="edition"><span class="tiny-rule"></span> Ein historisch-theologisches Adventure</div><p class="start-year">1525<span class="year-dot">.</span></p><h1>Zwischen Freiheit<br>und Aufruhr</h1><p class="start-description">Eine neue Idee erreicht das Dorf.<br>Ein Blatt Papier stellt alles infrage.<br>Und du sitzt mit am Tisch.</p><div class="start-actions">${button('Neues Spiel <span aria-hidden="true">→</span>',saved ? 'confirm-new' : 'new','class="primary"')}${saved ? button('Spiel fortsetzen <span aria-hidden="true">↗</span>','resume','class="secondary"') : ''}</div>${saved ? `<p class="resume-note">Zuletzt: ${esc(sceneById[saved.scene].title)}</p>${button('Spielstand zurücksetzen','confirm-reset','class="text-button"')}` : '<p class="resume-note">Kapitel 1 · Was heißt frei?</p>'}<div class="start-meta"><span>Q1 · Evangelische Religion</span><span>Lesen. Fragen. Entscheiden.</span></div></div><div class="start-art"><div class="art-border"></div><div class="art-label"><span class="eyebrow">Frühjahr 1525</span><p>${chapters[0].question}</p><span class="art-caption">Kapitel 01 — Was heißt frei?</span></div><span class="art-credit">Die Gesprächssituation und die Figuren sind erfunden.</span></div></main>`;
}
function enterScene(id, complete = true) {
  id = canonicalScene(id);
  if (!sceneById[id]) { notify('Diese Szene ist nicht verfügbar.'); return; }
  if (complete) addUnique(state.progress.completedScenes,state.scene);
  state.scene = id; state.phase = 'active'; state.dialogue = null; state.interaction = null; selectedCard = null;
  const scene = sceneById[id];
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
  if (!playing) return startScreen();
  const scene = sceneById[state.scene], debugWasOpen = app.querySelector('.debug')?.open || false;
  const active = document.activeElement;
  const focusSelector = active?.closest('#app') && active.dataset.action ? ['action','character','choice','option','card'].filter(key => active.dataset[key]).map(key => `[data-${key}="${CSS.escape(active.dataset[key])}"]`).join('') : null;
  const feedbackMode = state.interaction?.kind === 'feedback' ? (puzzles[state.interaction.id] ? 'puzzle' : sortingGames[state.interaction.id] ? 'minigame' : 'choice') : null;
  const mode = scene.kind === 'ending' ? 'transition' : state.dialogue ? 'dialogue' : feedbackMode || (state.interaction?.kind === 'choice' ? 'choice' : state.interaction?.kind === 'puzzle' ? 'puzzle' : scene.kind === 'sorting' ? 'minigame' : scene.kind === 'notebook' ? 'notebook' : 'exploration');
  state.uiMode = mode; setMode(mode);
  if (scene.kind === 'ending') {
    app.innerHTML = `<main class="ending"><span class="eyebrow">Kapitel 1 abgeschlossen</span><div class="ending-lines">${chapters[0].next.lines.map((line,i) => `<p class="ending-line line-${i}">${esc(line)}</p>`).join('')}</div><div class="next-chapter"><span class="eyebrow">Kapitel 2</span><h1>${chapters[0].next.title}</h1><p>Kapitel 2 ist noch nicht spielbar.</p>${button('Vertical Slice beendet','home','class="primary"')}<div class="ending-actions">${button('Kapitel 1 erneut spielen','confirm-new','class="quiet"')}${button('Zum Startbildschirm','home','class="quiet"')}${button('Notizbuch öffnen','notebook','class="quiet"')}</div></div></main>${debugView(debugWasOpen)}`;
    return;
  }
  // Keep the same scene DOM so speaker focus can transition smoothly.
  const previousStage = app.querySelector('.stage');
  const previousView = app.querySelector('#interaction')?.dataset.view;
  const previousScroll = app.querySelector('.task-scroll')?.scrollTop || 0;
  app.innerHTML = sceneView() + debugView(debugWasOpen);
  if (previousStage?.dataset.scene === scene.id) app.querySelector('.stage').replaceWith(previousStage);
  updateStage(app.querySelector('.stage'));
  const panel = app.querySelector('#interaction');
  panel.dataset.view = (state.dialogue ? 'dialogue' : state.interaction?.kind || scene.kind) + ':' + (state.interaction?.id || scene.game || scene.id);
  if (state.dialogue) panel.innerHTML = dialogueView();
  else if (state.interaction?.kind === 'choice') panel.innerHTML = choiceView(state.interaction.id);
  else if (state.interaction?.kind === 'puzzle') panel.innerHTML = puzzleView(state.interaction.id);
  else if (state.interaction?.kind === 'feedback') panel.innerHTML = feedbackView(state.interaction);
  else if (scene.kind === 'sorting') panel.innerHTML = axisView(scene.game,selectedCard);
  else if (scene.kind === 'notebook') panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">${esc(scene.title)}</p><p>${esc(scene.instruction)}</p><div class="panel-actions">${button('Notizbuch lesen','notebook','class="secondary"')}${button('Zurück zur Taverne →','next-scene','class="primary"')}</div></section>`;
  else if (['explore','conversations'].includes(scene.kind)) {
    const finished = chapters[0].cast.every(conversationDone);
    panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">${scene.title}</p><h2>${esc(scene.kind === 'explore' && state.progress.flyerUnlocked ? scene.flyerInstruction : scene.instruction)}</h2>${scene.kind === 'conversations' ? `<div class="conversation-progress">${chapters[0].cast.map(id => `<span class="${conversationDone(id) ? 'done' : ''}">${conversationDone(id) ? '✓' : '○'} ${id[0].toUpperCase() + id.slice(1)}</span>`).join('')}</div>${finished ? button('Zur Freiheitsachse →','next-scene','class="primary"') : ''}` : ''}</section>`;
  } else panel.innerHTML = `<section class="instruction-panel"><h2>${scene.title}</h2>${button('Flugblatt öffnen','scene-document','class="primary"')}</section>`;
  app.querySelector('.game-layout').classList.toggle('task-layout',Boolean(panel.querySelector('.task-panel')));
  if (previousView === panel.dataset.view && panel.querySelector('.task-scroll')) panel.querySelector('.task-scroll').scrollTop = previousScroll;
  if (focusSelector) {
    const same = document.querySelector(focusSelector);
    const next = selectedCard && active.dataset.action === 'axis-card' ? panel.querySelector('#axis-range') : same && !same.disabled ? same : panel.querySelector('button:not(:disabled)');
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
  openOverlay(`<article class="confirmation"><p class="eyebrow">Neuanfang</p><h1 id="overlay-title">${newAfter ? 'Kapitel 1 neu beginnen?' : 'Spielstand zurücksetzen?'}</h1><p>Deine bisherigen Entscheidungen und dein Notizbuch auf diesem Gerät werden gelöscht.</p><div class="panel-actions">${button('Abbrechen','close-overlay','class="quiet"')}${button(newAfter ? 'Neues Spiel beginnen' : 'Spielstand löschen',newAfter ? 'reset-new' : 'reset','class="primary"')}</div></article>`,() => {},state.uiMode);
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
function checkFreedomAxis() {
  const scene = sceneById[state.scene], game = sortingGames[scene.game];
  const count = attempt(scene.game,{...state.minigames.axis});
  const correct = checkAxis(scene.game), assisted = !correct && count >= 3;
  if (correct || assisted) {
    if (assisted) {
      state.minigames.assisted[scene.game] = true;
      for (const card of game.cards) state.minigames.axis[card.id] = Math.round((card.range[0]+card.range[1])/2);
    }
    state.progress.freedomAxisComplete = true;
    addUnique(state.minigames.completed,scene.game);
    showFeedback({id:scene.game,after:'next-scene',assisted,text:game.success,solution:assisted ? game.cards.map(card => `${card.text}: ${card.range[0]}–${card.range[1]} %`).join('\n') : null});
  } else showFeedback({id:scene.game,after:'retry-axis',text:(count === 1 ? 'Denkimpuls:\n' : 'Hinweis:\n')+(count === 1 ? game.success : game.instruction)});
}
document.addEventListener('click',event => {
  const target = event.target.closest('[data-action]');
  if (!target || target.disabled) return;
  const action = target.dataset.action, scene = sceneById[state.scene];
  if (action === 'close-overlay') return closeOverlay();
  if (action === 'new') return newGame();
  if (action === 'confirm-new') return confirmReset(true);
  if (action === 'confirm-reset') return confirmReset(false);
  if (action === 'reset-new' || action === 'reset') { closeOverlay(); clearSave(); replaceState(freshState()); return action === 'reset-new' ? newGame() : startScreen(); }
  if (action === 'resume') {
    const saved = load(); if (!saved) return startScreen();
    replaceState(saved); playing = true; preloadCharacters();
    if (state.resumeSetup) { delete state.resumeSetup; enterScene(state.scene,false); notify('Dein bisheriger Spielstand wurde übernommen. Die neuen Aufgaben stehen bereit.'); }
    else render();
    return;
  }
  if (action === 'home') { if (playing) persist(); return startScreen(); }
  if (action === 'menu') return openOverlay(`<article class="confirmation"><p class="eyebrow">Kapitel 1</p><h1 id="overlay-title">Eine kurze Pause.</h1><p>Dein Fortschritt wird automatisch auf diesem Gerät gespeichert.</p><div class="menu-actions">${button('Weiterspielen →','close-overlay','class="primary"')}${button('Zum Startbildschirm','menu-home','class="secondary"')}${button('Spielstand zurücksetzen','confirm-reset','class="quiet"')}</div></article>`,() => {},state.uiMode);
  if (action === 'menu-home') { closeOverlay(); persist(); return startScreen(); }
  if (action === 'notebook') return openNotebook();
  if (action === 'notebook-tab') return openNotebook(target.dataset.tab);
  if (action === 'archive-document') return openDocument(target.dataset.document,null,() => openNotebook('documents'),true);
  if (action === 'scene-document') return openSceneDocument();
  if (action === 'next-scene') {
    if (scene.kind === 'conversations' && !chapters[0].cast.every(conversationDone)) return;
    return enterScene(scene.next);
  }
  if (action === 'character') {
    if (state.dialogue || state.interaction) return;
    const id = target.dataset.character;
    addUnique(state.progress.visitedHotspots,`${scene.id}:${id}`);
    if (scene.kind === 'explore') {
      const hotspot = scene.hotspots[id]; if (!hotspot) return;
      beginDialogue(hotspot.dialogue,hotspot.after,id);
    } else {
      const conversation = scene.conversations[id];
      beginDialogue(conversation.dialogue,conversation.puzzle ? 'conversation-puzzle' : 'conversation-choice',id);
    }
  }
  if (action === 'flyer') return enterScene(scene.next);
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
      case 'retry-axis': break;
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
  if (action === 'axis-card') selectedCard = selectedCard === target.dataset.card ? null : target.dataset.card;
  if (action === 'axis-position' && selectedCard) state.minigames.axis[selectedCard] = event.detail ? axisPosition(target,event.clientX) : state.minigames.axis[selectedCard] ?? 50;
  if (action === 'axis-reset') { state.minigames.axis = {}; selectedCard = null; }
  if (action === 'axis-check') checkFreedomAxis();
  if (action === 'debug-prev' || action === 'debug-next') return enterScene(scenes[Math.max(0,Math.min(scenes.length-1,scenes.indexOf(scene)+(action === 'debug-next' ? 1 : -1)))].id,false);
  if (action === 'debug-clear') { clearSave(); notify('Gespeicherten Spielstand gelöscht.'); return; }
  if (action === 'debug-documents') { state.notebook.documents = ['freedom']; state.notebook.passages.freedom = [0,1]; state.notebook.unlocked = true; notify('Alle Dokumente freigeschaltet.'); }
  if (playing) { render(); persist(); }
});
document.addEventListener('input',event => {
  if (event.target.id !== 'axis-range' || !selectedCard) return;
  state.minigames.axis[selectedCard] = Number(event.target.value);
  document.querySelector('#axis-value').textContent = event.target.value + ' %';
  const card = document.querySelector(`[data-card="${selectedCard}"] small`);
  if (card) card.textContent = event.target.value + ' %';
  // Keep the native range input in place during a touch gesture.
  const rail = app.querySelector('.axis-rail');
  let marker = rail.querySelector('.axis-marker');
  if (!marker) { marker = document.createElement('span'); marker.className = 'axis-marker'; marker.setAttribute('aria-hidden','true'); rail.append(marker); }
  marker.style.left = event.target.value + '%';
  persist();
});
document.addEventListener('change',event => {
  if (event.target.id === 'debug-scene') enterScene(event.target.value,false);
  if (event.target.id === 'axis-range') { render(); persist(); }
});
installDragDrop(app,(id,position) => { state.minigames.axis[id] = position; selectedCard = id; render(); persist(); },id => { selectedCard = selectedCard === id ? null : id; render(); });
const start = canonicalScene(new URLSearchParams(location.search).get('start'));
if (start && sceneById[start]) { replaceState(load() || freshState()); enterScene(start,false); }
else { startScreen(); if (start) notify('Unbekannte Szenen-ID. Bitte starte mit Kapitel 1.'); }
