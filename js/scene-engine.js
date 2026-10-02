import { chapterTwoScene } from './chapter-two-view.js';
import { state, conversationDone } from './state.js';
import { sceneById } from '../data/scenes.js';
import { characters } from '../data/characters.js';
import { chapters } from '../data/chapters.js';
import { assets } from '../data/assets.js';
import { button } from './ui.js';
import { hotspot } from './hotspots.js';
import { fullscreenButton } from './fullscreen.js';
const explorationImage = 'assets/chapter1/k1_taverne_exploration.png';
const dialogueImage = 'assets/chapter1/k1_taverne_dialog_group.png';
export function sceneView() {
  const scene = sceneById[state.scene];
  const header = `<header class="game-header"><button class="wordmark" data-action="title" aria-label="1525 – Zwischen Freiheit und Aufruhr">1525<span>Zwischen Freiheit und Aufruhr</span></button><div class="chapter-indicator"><span class="eyebrow">Kapitel 01</span><strong>${chapters[0].title}</strong></div><div class="header-actions">${button(`<img src="${assets.notebook}" alt=""> <span>Notizbuch</span>`, 'notebook', `class="book-button" ${!state.notebook.unlocked ? 'disabled title="Wird nach der Abschlusssicherung geöffnet"' : ''}`)}${button('☰ <span class="sr-only">Spielmenü</span>','menu','class="quiet menu-button"')}${fullscreenButton()}</div></header>`;
  if(scene.chapter===2) return chapterTwoScene(header.replace('Kapitel 01','Kapitel 02').replace(chapters[0].title,'Wie frei ist dein Leben?'));
  return header+`<main class="game-layout"><section class="stage" data-scene="${scene.id}" aria-label="Taverne am Abend"><div class="room"><img class="room-image" src="${explorationImage}" alt="Peter, Jakob und Anna am Tisch in der Taverne"><div class="speaker-shade" aria-hidden="true"></div><div class="stage-caption"><h1>${scene.title}</h1></div>${hotspot('Fenster','prop-window',{classes:'room-hotspot window-hotspot',attrs:'aria-label="Aus dem Fenster schauen"'})}${hotspot('<span class="door-arrow" aria-hidden="true">↗</span><span class="door-copy"><strong>Die Taverne verlassen</strong><small>Der Morgen beginnt.</small></span>','prop-door',{kind:'path',classes:'room-hotspot door-hotspot',attrs:'hidden aria-label="Die Taverne verlassen"'})}<div class="characters">${chapters[0].cast.map(id => hotspot(`${{peter:'Peter fragen',anna:'Anna ansprechen',jakob:'Jakob zuhören'}[id]}<span class="character-status"></span>`,'character',{kind:'action',classes:'character room-hotspot',labelClass:'character-label',attrs:`data-character="${id}" aria-label="Mit ${characters[id].name} sprechen"`})).join('')}</div><div class="table-props">${hotspot('Krug','prop-mug',{classes:'prop mug room-hotspot',attrs:'aria-label="Krug ansehen"'})}${hotspot('Das Blatt lesen','flyer',{classes:'prop flyer room-hotspot',labelClass:'flyer-plaque',attrs:'disabled aria-label="Flugblatt lesen"'})}${hotspot('Kerze','prop-candle',{classes:'prop candle room-hotspot',attrs:'aria-label="Kerze ansehen"'})}</div><div class="stage-bottom"><span class="stage-progress"></span><span>${scene.station} / 8</span></div></div></section><div id="interaction" class="interaction"></div><footer class="game-footer"><span id="save-status">Fortschritt wird lokal gespeichert</span></footer></main>`;
}
export function updateStage(stage) {
  const scene = sceneById[state.scene], current = state.dialogue?.lines[state.dialogue.index];
  const interactive = !state.dialogue && !state.interaction && ['explore','conversations','ending'].includes(scene.kind);
  const exploration = interactive;
  stage.classList.toggle('has-speaker', Boolean(current?.speaker));
  stage.classList.toggle('exploring',exploration);
  stage.dataset.view = exploration ? 'exploration' : 'dialogue';
  stage.dataset.speaker = current?.speaker || '';
  const image = stage.querySelector('.room-image'), source = exploration ? explorationImage : dialogueImage;
  if (image.getAttribute('src') !== source) image.src = source;
  for (const id of chapters[0].cast) {
    const node = stage.querySelector(`[data-character="${id}"]`), active = current?.speaker === id;
    node.classList.toggle('speaking',active);
    node.disabled = !interactive;
    const done = conversationDone(id);
    node.querySelector('.character-status').textContent = done && scene.kind === 'conversations' ? '✓' : '';
    node.setAttribute('aria-label', `Mit ${characters[id].name} sprechen${done ? ', Gespräch abgeschlossen' : ''}`);
  }
  const flyer = stage.querySelector('[data-action="flyer"]');
  flyer.disabled = !interactive || !state.progress.flyerUnlocked;
  flyer.classList.toggle('unlocked',!flyer.disabled);
  stage.classList.toggle('awaiting-flyer', scene.kind === 'explore' && !flyer.disabled);
  for (const node of stage.querySelectorAll('[data-action="prop-window"],[data-action="prop-door"],[data-action="prop-mug"],[data-action="prop-candle"]')) node.disabled = !interactive;
  const door = stage.querySelector('[data-action="prop-door"]');
  // This existing checkpoint follows every mandatory station; no new save field.
  const chapter1Complete = scene.kind === 'ending';
  door.hidden = !chapter1Complete;
  door.classList.toggle('exit-ready',chapter1Complete);
  door.querySelector('strong').textContent = 'Die Taverne verlassen';
  door.querySelector('small').textContent = 'Der Morgen beginnt.';
  door.setAttribute('aria-label', 'Die Taverne verlassen – Der Morgen beginnt.');
  stage.querySelector('.stage-progress').textContent = scene.kind === 'conversations' ? `${state.progress.conversations.length} / 3 Gespräche` : '';
}
