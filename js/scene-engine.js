import { state, conversationDone } from './state.js';
import { sceneById } from '../data/scenes.js';
import { characters, characterState } from '../data/characters.js';
import { chapters } from '../data/chapters.js';
import { documents } from '../data/documents.js';
import { assets } from '../data/assets.js';
import { esc, button } from './ui.js';
export function sceneView() {
  const scene = sceneById[state.scene];
  return `<header class="game-header"><button class="wordmark" data-action="home" aria-label="Zum Startbildschirm">1525<span>Zwischen Freiheit und Aufruhr</span></button><div class="chapter-indicator"><span class="eyebrow">Kapitel 01</span><strong>${chapters[0].title}</strong></div><div class="header-actions">${button(`<img src="${assets.notebook}" alt=""> <span>Notizbuch</span>`, 'notebook', `class="book-button" ${!state.notebook.unlocked ? 'disabled title="Wird nach der Abschlusssicherung geöffnet"' : ''}`)}${button('☰ <span class="sr-only">Spielmenü</span>','menu','class="quiet menu-button"')}</div></header><main class="game-layout"><section class="stage" data-scene="${scene.id}" aria-label="Taverne am Abend"><div class="stage-caption"><span class="eyebrow">${chapters[0].season} · Taverne</span><h1>${scene.title}</h1></div><div class="characters">${chapters[0].cast.map(id => `<button class="character" data-action="character" data-character="${id}" aria-label="Mit ${characters[id].name} sprechen"><img class="character-art" src="${characterState(id,scene.emotions?.[id]).asset}" alt="${characters[id].name}"><span class="character-label">${characters[id].name}<span class="character-status"></span></span></button>`).join('')}</div><img class="table-art" src="${assets.table}" alt="" aria-hidden="true"><div class="table-props">${button(`<img src="${assets.mug}" alt=""><span>Krug</span>`,'prop-mug','class="prop mug" disabled')}${button(`<img src="${documents.freedom.closedAsset}" alt=""><span>Flugblatt</span><img class="new-hotspot" src="${assets.newHotspot}" alt="Neu">`,'flyer','class="prop flyer" disabled')}${button(`<img src="${assets.candle}" alt=""><span>Kerze</span>`,'prop-candle','class="prop candle" disabled')}</div><div class="stage-bottom"><span class="stage-progress"></span><span>${scene.station} / 8 Stationen</span></div></section><div id="interaction" class="interaction"></div></main><footer class="game-footer"><span>Freiheit beginnt mit einer Frage.</span><span id="save-status">Fortschritt wird lokal gespeichert</span></footer>`;
}
export function updateStage(stage) {
  const scene = sceneById[state.scene], current = state.dialogue?.lines[state.dialogue.index];
  const interactive = !state.dialogue && !state.interaction && ['explore','conversations'].includes(scene.kind);
  stage.classList.toggle('has-speaker', Boolean(current?.speaker));
  for (const id of chapters[0].cast) {
    const node = stage.querySelector(`[data-character="${id}"]`), active = current?.speaker === id;
    const mood = characterState(id,active ? current.emotion || 'neutral' : scene.emotions?.[id] || 'neutral');
    node.classList.toggle('speaking',active);
    node.disabled = !interactive || (scene.kind === 'explore' && !scene.hotspots[id]);
    node.dataset.emotion = Object.keys(characters[id].states).find(key => characters[id].states[key] === mood);
    const image = node.querySelector('.character-art');
    if (image.getAttribute('src') !== mood.asset) image.src = mood.asset;
    image.alt = `${characters[id].name}, ${mood.label}`;
    const done = conversationDone(id);
    node.querySelector('.character-status').textContent = done && scene.kind === 'conversations' ? '✓' : !node.disabled ? '＋' : '';
    node.setAttribute('aria-label', `Mit ${characters[id].name} sprechen${done ? ', Gespräch abgeschlossen' : ''}`);
  }
  const flyer = stage.querySelector('[data-action="flyer"]');
  flyer.hidden = scene.kind !== 'explore';
  flyer.disabled = !interactive || !state.progress.flyerUnlocked;
  flyer.classList.toggle('unlocked',!flyer.disabled);
  flyer.querySelector('.new-hotspot').hidden = flyer.disabled;
  stage.querySelector('.stage-progress').textContent = scene.kind === 'conversations' ? `${state.progress.conversations.length} / 3 Gespräche` : '';
}