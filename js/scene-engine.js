import { state, conversationDone } from './state.js';
import { sceneById } from '../data/scenes.js';
import { characters, sceneCharacterState } from '../data/characters.js';
import { chapters } from '../data/chapters.js';
import { documents } from '../data/documents.js';
import { assets } from '../data/assets.js';
import { button } from './ui.js';
export function sceneView() {
  const scene = sceneById[state.scene];
  return `<header class="game-header"><button class="wordmark" data-action="home" aria-label="Zum Startbildschirm">1525<span>Zwischen Freiheit und Aufruhr</span></button><div class="chapter-indicator"><span class="eyebrow">Kapitel 01</span><strong>${chapters[0].title}</strong></div><div class="header-actions">${button(`<img src="${assets.notebook}" alt=""> <span>Notizbuch</span>`, 'notebook', `class="book-button" ${!state.notebook.unlocked ? 'disabled title="Wird nach der Abschlusssicherung geöffnet"' : ''}`)}${button('☰ <span class="sr-only">Spielmenü</span>','menu','class="quiet menu-button"')}</div></header><main class="game-layout"><section class="stage" data-scene="${scene.id}" aria-label="Taverne am Abend"><div class="room"><div class="stage-caption"><span class="eyebrow">${chapters[0].season} · Taverne</span><h1>${scene.title}</h1></div>${button('<span>Fenster</span>','prop-window','class="room-hotspot window-hotspot" aria-label="Aus dem Fenster schauen"')}${button('<span>Tür</span>','prop-door','class="room-hotspot door-hotspot" aria-label="Tür ansehen"')}<div class="characters">${chapters[0].cast.map(id => `<button class="character" data-action="character" data-character="${id}" aria-label="Mit ${characters[id].name} sprechen"><img class="character-art" src="${sceneCharacterState(id,false).asset}" alt="${characters[id].name}"><span class="character-label">${characters[id].name}<span class="character-status"></span></span></button>`).join('')}</div><img class="table-art" src="${assets.table}" alt="" aria-hidden="true"><div class="table-props">${button('<span>Krug</span>','prop-mug','class="prop mug" aria-label="Krug ansehen"')}${button(`<img src="${documents.freedom.closedAsset}" alt=""><span>Flugblatt</span>`,'flyer','class="prop flyer" disabled aria-label="Flugblatt lesen"')}${button('<span>Kerze</span>','prop-candle','class="prop candle" aria-label="Kerze ansehen"')}</div><div class="stage-bottom"><span class="stage-progress"></span><span>${scene.station} / 8 Stationen</span></div></div></section><div id="interaction" class="interaction"></div></main><footer class="game-footer"><span>Freiheit beginnt mit einer Frage.</span><span id="save-status">Fortschritt wird lokal gespeichert</span></footer>`;
}
export function updateStage(stage) {
  const scene = sceneById[state.scene], current = state.dialogue?.lines[state.dialogue.index];
  const interactive = !state.dialogue && !state.interaction && ['explore','conversations','ending'].includes(scene.kind);
  stage.classList.toggle('has-speaker', Boolean(current?.speaker));
  stage.classList.toggle('exploring',interactive);
  for (const id of chapters[0].cast) {
    const node = stage.querySelector(`[data-character="${id}"]`), active = current?.speaker === id;
    const mood = sceneCharacterState(id,active,active ? current.emotion || 'neutral' : 'neutral');
    node.classList.toggle('speaking',active);
    node.disabled = !interactive;
    node.dataset.sceneState = mood.pose;
    const image = node.querySelector('.character-art');
    if (image.getAttribute('src') !== mood.asset) image.src = mood.asset;
    image.alt = characters[id].name;
    const done = conversationDone(id);
    node.querySelector('.character-status').textContent = done && scene.kind === 'conversations' ? '✓' : '';
    node.setAttribute('aria-label', `Mit ${characters[id].name} sprechen${done ? ', Gespräch abgeschlossen' : ''}`);
  }
  const flyer = stage.querySelector('[data-action="flyer"]');
  flyer.hidden = false;
  flyer.disabled = !interactive || !state.progress.flyerUnlocked;
  flyer.classList.toggle('unlocked',!flyer.disabled);
  for (const node of stage.querySelectorAll('.room-hotspot,[data-action="prop-mug"],[data-action="prop-candle"]')) node.disabled = !interactive;
  const door = stage.querySelector('[data-action="prop-door"]');
  door.classList.toggle('exit-ready',scene.kind === 'ending');
  door.setAttribute('aria-label',scene.kind === 'ending' ? 'Taverne verlassen' : 'Tür ansehen');
  stage.querySelector('.stage-progress').textContent = scene.kind === 'conversations' ? `${state.progress.conversations.length} / 3 Gespräche` : '';
}
