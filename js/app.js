import { state, freshState, replaceState, addUnique } from './state.js';
import { load, save, clearSave } from './save-system.js';
import { sceneById, scenes } from '../data/scenes.js';
import { chapters } from '../data/chapters.js';
import { dialogues } from '../data/dialogues.js';
import { puzzles, sortingGames } from '../data/minigames.js';
import { sceneView } from './scene-engine.js';
import { beginDialogue, advanceDialogue, dialogueView } from './dialogue-engine.js';
import { choiceView, recordChoice } from './choice-engine.js';
import { openDocument } from './document-viewer.js';
import { openNotebook, chosenText } from './notebook.js';
import { axisView, puzzleView, checkAxis } from './minigames/sorting.js';
import { installDragDrop } from './minigames/dragdrop.js';
import { debugView } from './debug.js';
import { esc, button, openOverlay, closeOverlay, notify } from './ui.js';

const app = document.querySelector('#app');
let playing = false, selectedCard = null;
function persist() { const ok = save(state); const label = document.querySelector('#save-status'); if (label) label.textContent = ok ? '✓ Spielstand gespeichert · auf diesem Gerät' : 'Speicherung nicht verfügbar'; }
document.addEventListener('storage-error', () => notify('Der Browser erlaubt gerade keine lokale Speicherung. Dein Fortschritt bleibt für diese Sitzung erhalten.'));

function startScreen() {
  playing = false;
  const saved = load();
  app.innerHTML = `<main class="start-screen"><div class="start-copy"><div class="edition"><span class="tiny-rule"></span> Ein historisch-theologisches Adventure</div><p class="start-year">1525<span class="year-dot">.</span></p><h1>Zwischen Freiheit<br>und Aufruhr</h1><p class="start-description">Eine neue Idee erreicht das Dorf.<br>Ein Blatt Papier stellt alles infrage.<br>Und du sitzt mit am Tisch.</p><div class="start-actions">${button('Neues Spiel <span aria-hidden="true">→</span>', saved ? 'confirm-new' : 'new', 'class="primary"')}${saved ? button('Spiel fortsetzen <span aria-hidden="true">↗</span>', 'resume', 'class="secondary"') : ''}</div>${saved ? `<p class="resume-note">Zuletzt: ${esc(sceneById[saved.scene].title)}</p>${button('Spielstand zurücksetzen', 'confirm-reset', 'class="text-button"')}` : '<p class="resume-note">Kapitel 1 · Was heißt frei? · etwa 15–20 Minuten</p>'}<div class="start-meta"><span>Q1 · Evangelische Religion</span><span>Lesen. Fragen. Entscheiden.</span></div></div><div class="start-art"><div class="art-border"></div><div class="art-label"><span class="eyebrow">Frühjahr 1525</span><p>Was meint Luther,<br>wenn er von Freiheit spricht?</p><span class="art-caption">Kapitel 01 — Was heißt frei?</span></div><span class="art-credit">Illustrative Platzhalter · Szenen und Figuren sind erfunden</span></div></main>`;
}
function enterScene(id, complete = true) {
  if (!sceneById[id]) { notify('Diese Szene ist nicht verfügbar.'); return; }
  if (complete) addUnique(state.progress.completedScenes, state.scene);
  state.scene = id; state.dialogue = null; state.interaction = null; selectedCard = null;
  const scene = sceneById[id];
  if (scene.kind === 'dialogue') beginDialogue(scene.dialogue, scene.choice ? 'scene-choice' : 'next-scene');
  if (scene.kind === 'notebook') { state.notebook.unlocked = true; addUnique(state.notebook.entries, scene.entry); }
  if (scene.kind === 'ending') addUnique(state.progress.completedScenes, id);
  playing = true; render(); persist();
}
function completeConversation(id) { addUnique(state.progress.conversations, id); state.interaction = null; render(); persist(); }
function render() {
  if (!playing) return startScreen();
  const debugWasOpen = document.querySelector('.debug')?.open || false;
  const active = document.activeElement;
  const focusSelector = active?.closest('#app') && active.dataset.action ? ['action', 'character', 'choice', 'option', 'card', 'zone'].filter(key => active.dataset[key]).map(key => `[data-${key}="${CSS.escape(active.dataset[key])}"]`).join('') : null;
  const scene = sceneById[state.scene];
  if (scene.kind === 'ending') {
    app.innerHTML = `<main class="ending"><span class="eyebrow">Kapitel 1 abgeschlossen</span><div class="ending-lines">${chapters[0].next.lines.map((line, i) => `<p class="ending-line line-${i}">${esc(line)}</p>`).join('')}</div><div class="next-chapter"><span class="eyebrow">Ein Ausblick · Kapitel 2</span><h1>${chapters[0].next.title}</h1><p>Hier endet die spielbare Fassung von Kapitel 1.<br>Kapitel 2 ist noch nicht spielbar.</p>${button('Vertical Slice beendet →', 'home', 'class="primary"')}<div class="ending-actions">${button('Kapitel 1 erneut spielen', 'confirm-new', 'class="quiet"')}${button('Zum Startbildschirm', 'home', 'class="quiet"')}${button('Notizbuch öffnen', 'notebook', 'class="quiet"')}</div></div></main>${debugView(debugWasOpen)}`;
    return;
  }
  app.innerHTML = sceneView() + debugView(debugWasOpen);
  const panel = document.querySelector('#interaction');
  if (state.dialogue) panel.innerHTML = dialogueView();
  else if (state.interaction?.kind === 'choice') panel.innerHTML = choiceView(state.interaction.id);
  else if (state.interaction?.kind === 'puzzle') panel.innerHTML = puzzleView('grace', state.interaction.feedback);
  else if (state.interaction?.kind === 'feedback') panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">Ein Gedanke zum Weiterdenken</p><p class="spoken">${esc(state.interaction.feedback)}</p>${button('Zurück zum Tisch →', 'conversation-complete', `class="primary" data-character="${state.interaction.context}"`)}</section>`;
  else if (scene.kind === 'sorting') panel.innerHTML = axisView(scene.game, state.interaction?.feedback || '', selectedCard);
  else if (scene.kind === 'notebook') panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">Dein Notizbuch ist jetzt geöffnet</p><h2>Was bleibt von diesem Gespräch?</h2><p>Die wichtigsten Gedanken und deine erste Deutung findest du ab jetzt im Notizbuch. Auch das Flugblatt liegt im Quellenarchiv.</p><div class="panel-actions">${button('Notizbuch lesen ↗', 'notebook', 'class="secondary"')}${button('Zurück zur Taverne →', 'next-scene', 'class="primary"')}</div></section>`;
  else if (scene.kind === 'explore' || scene.kind === 'conversations') panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">${scene.kind === 'explore' ? 'Ankommen · Zuhören · Entdecken' : 'Freiheit aus drei Perspektiven'}</p><h2>${scene.kind === 'explore' ? 'Eine Idee kommt auf den Tisch.' : 'Mit wem sprichst du als Nächstes?'}</h2><p>${state.progress.flyerUnlocked && scene.kind === 'explore' ? 'Jakob legt das Flugblatt auf den Tisch. Tippe es an und lies selbst.' : scene.instruction}</p>${scene.kind === 'explore' ? `<p class="muted">${chapters[0].season}. ${chapters[0].intro}</p>` : `<div class="conversation-progress">${['peter', 'anna', 'jakob'].map(id => `<span class="${state.progress.conversations.includes(id) ? 'done' : ''}">${state.progress.conversations.includes(id) ? '✓' : '○'} ${id[0].toUpperCase() + id.slice(1)}</span>`).join('')}</div>${state.progress.conversations.length === 3 ? button('Gedanken auf der Freiheitsachse ordnen →', 'next-scene', 'class="primary"') : ''}`}</section>`;
  else panel.innerHTML = `<section class="instruction-panel"><p class="eyebrow">Eine Quelle lesen</p><h2>${scene.title}</h2>${button('Flugblatt öffnen ↗', 'scene-document', 'class="primary"')}</section>`;
  if (focusSelector) {
    const same = document.querySelector(focusSelector);
    const next = selectedCard && active.dataset.action === 'axis-card' ? panel.querySelector('.zone-target') : same && !same.disabled ? same : panel.querySelector('button:not(:disabled)');
    next?.focus({ preventScroll: true });
  }
  if (['document', 'document-dialogue'].includes(scene.kind) && !state.dialogue && !state.interaction) openSceneDocument();
}
function openSceneDocument() {
  const scene = sceneById[state.scene];
  openDocument(scene.document, scene.passage, () => {
    if (scene.kind === 'document-dialogue') { beginDialogue(scene.dialogue, 'next-scene'); render(); persist(); }
    else enterScene(scene.next);
  });
}
function newGame() { replaceState(freshState()); enterScene(state.scene, false); }
function confirmReset(newAfter = false) {
  openOverlay(`<article class="confirmation"><p class="eyebrow">Neuanfang</p><h1 id="overlay-title">${newAfter ? 'Kapitel 1 neu beginnen?' : 'Spielstand zurücksetzen?'}</h1><p>Deine bisherigen Entscheidungen und dein Notizbuch auf diesem Gerät werden gelöscht.</p><div class="panel-actions">${button('Abbrechen', 'close-overlay', 'class="quiet"')}${button(newAfter ? 'Neues Spiel beginnen' : 'Spielstand löschen', newAfter ? 'reset-new' : 'reset', 'class="primary"')}</div></article>`);
}
function afterDialogue(result) {
  if (!result) return;
  const scene = sceneById[state.scene];
  switch (result.after) {
    case 'unlock-flyer': state.progress.flyerUnlocked = true; break;
    case 'scene-choice': state.interaction = { kind: 'choice', id: scene.choice }; break;
    case 'conversation-choice': state.interaction = { kind: 'choice', id: scene.conversations[result.context].choice, context: result.context }; break;
    case 'conversation-puzzle': state.interaction = { kind: 'puzzle', context: 'anna' }; break;
    case 'turn-page': beginDialogue('turnPage', 'next-scene'); break;
    case 'conversation-done': completeConversation(result.context); break;
    case 'next-scene': enterScene(scene.next); return true;
  }
}
document.addEventListener('click', event => {
  const target = event.target.closest('[data-action]');
  if (!target || target.disabled) return;
  const action = target.dataset.action, scene = sceneById[state.scene];
  if (action === 'close-overlay') return closeOverlay();
  if (action === 'new') return newGame();
  if (action === 'confirm-new') return confirmReset(true);
  if (action === 'confirm-reset') return confirmReset(false);
  if (action === 'reset-new' || action === 'reset') { closeOverlay(); clearSave(); replaceState(freshState()); return action === 'reset-new' ? newGame() : startScreen(); }
  if (action === 'resume') { const saved = load(); if (!saved) return startScreen(); replaceState(saved); playing = true; render(); return; }
  if (action === 'home') { if (playing) persist(); return startScreen(); }
  if (action === 'menu') return openOverlay(`<article class="confirmation"><p class="eyebrow">Kapitel 1</p><h1 id="overlay-title">Eine kurze Pause.</h1><p>Dein Fortschritt wird automatisch auf diesem Gerät gespeichert.</p><div class="menu-actions">${button('Weiterspielen →', 'close-overlay', 'class="primary"')}${button('Zum Startbildschirm', 'menu-home', 'class="secondary"')}${button('Spielstand zurücksetzen', 'confirm-reset', 'class="quiet"')}</div></article>`);
  if (action === 'menu-home') { closeOverlay(); persist(); return startScreen(); }
  if (action === 'notebook') return openNotebook();
  if (action === 'notebook-tab') return openNotebook(target.dataset.tab);
  if (action === 'archive-document') return openDocument(target.dataset.document, null, () => openNotebook('documents'), true);
  if (action === 'scene-document') return openSceneDocument();
  if (action === 'next-scene') return enterScene(scene.next);
  if (action === 'character') {
    if (state.dialogue || state.interaction) return;
    const id = target.dataset.character; addUnique(state.progress.visitedHotspots, `${scene.id}:${id}`);
    if (scene.kind === 'explore') beginDialogue(`intro${id[0].toUpperCase() + id.slice(1)}`, id === 'jakob' ? 'unlock-flyer' : 'idle');
    else { const conversation = scene.conversations[id]; beginDialogue(conversation.dialogue, conversation.puzzle ? 'conversation-puzzle' : 'conversation-choice', id); }
  }
  if (action === 'flyer') return enterScene('ch1_s2_document');
  if (action === 'prop-candle' || action === 'prop-mug') beginDialogue(action === 'prop-candle' ? 'candle' : 'mug', 'idle');
  if (action === 'dialogue-next' && afterDialogue(advanceDialogue())) return;
  if (action === 'choose') {
    const id = target.dataset.choice, option = recordChoice(id, target.dataset.option), context = state.interaction?.context;
    state.interaction = null;
    if (id === 'initialFreedomInterpretation') beginDialogue(option.reaction, 'turn-page');
    else if (option.feedback) state.interaction = { kind: 'feedback', feedback: option.feedback, context };
    else completeConversation(context);
  }
  if (action === 'conversation-complete') completeConversation(target.dataset.character);
  if (action === 'puzzle-part') {
    const id = target.dataset.part, selected = state.minigames.puzzle;
    if (selected.includes(id)) selected.splice(selected.indexOf(id), 1);
    else if (selected.length < 2) selected.push(id);
    state.interaction.feedback = '';
  }
  if (action === 'puzzle-reset') { state.minigames.puzzle = []; state.interaction.feedback = ''; }
  if (action === 'puzzle-check') {
    const game = puzzles.grace;
    if (game.solution.every((id, index) => state.minigames.puzzle[index] === id)) { addUnique(state.minigames.completed, 'grace'); state.interaction = { kind: 'feedback', feedback: `${game.sentence} ${game.success}`, context: 'anna' }; }
    else state.interaction.feedback = game.hint;
  }
  if (action === 'axis-card') selectedCard = selectedCard === target.dataset.card ? null : target.dataset.card;
  if (action === 'axis-zone' && selectedCard) { state.minigames.axis[selectedCard] = target.dataset.zone; selectedCard = null; }
  if (action === 'axis-reset') { state.minigames.axis = {}; selectedCard = null; state.interaction = null; }
  if (action === 'axis-check') {
    if (checkAxis(scene.game)) { addUnique(state.minigames.completed, scene.game); persist(); return openOverlay(`<article class="confirmation"><p class="eyebrow">Freiheit und Lebenswirklichkeit</p><h1 id="overlay-title">Zwischen den Bereichen.</h1><p>${sortingGames[scene.game].success}</p>${button('Im Notizbuch festhalten →', 'axis-done', 'class="primary"')}</article>`, () => enterScene(scene.next)); }
    else state.interaction = { kind: 'axis-feedback', feedback: sortingGames[scene.game].hint };
  }
  if (action === 'axis-done') return closeOverlay();
  if (action === 'debug-prev' || action === 'debug-next') return enterScene(scenes[Math.max(0, Math.min(scenes.length - 1, scenes.indexOf(scene) + (action === 'debug-next' ? 1 : -1)))].id, false);
  if (action === 'debug-clear') { clearSave(); notify('Gespeicherten Spielstand gelöscht.'); return; }
  if (action === 'debug-documents') { state.notebook.documents = ['freedom']; state.notebook.passages.freedom = [0, 1]; state.notebook.unlocked = true; notify('Alle Dokumente freigeschaltet.'); }
  if (playing) { render(); persist(); }
});
document.addEventListener('change', event => { if (event.target.id === 'debug-scene') enterScene(event.target.value, false); });
installDragDrop(app, (id, zone) => { state.minigames.axis[id] = zone; selectedCard = null; render(); persist(); }, id => { selectedCard = selectedCard === id ? null : id; render(); });
const start = new URLSearchParams(location.search).get('start');
if (start && sceneById[start]) { replaceState(load() || freshState()); enterScene(start, false); }
else { startScreen(); if (start) notify('Unbekannte Szenen-ID. Bitte starte mit Kapitel 1.'); }
