import { getContextualDialogue } from './consequences.js';
import { state } from './state.js';
import { dialogues } from '../data/dialogues.js';
import { characters, characterState } from '../data/characters.js';
import { esc, button } from './ui.js';
function portraitView(id,emotion) {
  const {asset,portraitFrame:frame}=characterState(id,emotion);
  return `<div class="portrait">${frame ? `<svg viewBox="${frame.viewBox}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><image href="${asset}" width="${frame.width}" height="${frame.height}" /></svg>` : `<img src="${asset}" alt="" draggable="false">`}</div>`;
}
export function beginDialogue(idOrLines, after, context = null) {
  state.dialogue = { lines: typeof idOrLines === 'string' ? getContextualDialogue(idOrLines,state,dialogues[idOrLines]) : idOrLines, index: 0, after, context };
}
export function dialogueView() {
  const current = state.dialogue;
  const line = current.lines[current.index];
  const character = characters[line.speaker];
  const emotion = line.emotion || 'neutral';
  return `<section class="dialogue-panel" aria-label="Gespräch"><p class="speaker-plaque">${character ? esc(character.name) : line.speaker==='player'?'Du':state.chapter===3?'März 1525':state.chapter===2?(state.scene==='ch2_intro'?'Am nächsten Morgen':'Im Dorf'):'In der Taverne'}</p><div class="dialogue-content">${character ? portraitView(line.speaker,emotion) : '<div class="narrator-mark" aria-hidden="true">✦</div>'}<div class="speech"><p class="spoken" aria-live="polite">${esc(line.text)}</p></div></div><div class="dialogue-footer"><span class="muted">${current.index + 1} / ${current.lines.length}</span>${button('Weiter <span aria-hidden="true">→</span>', 'dialogue-next', 'class="primary"')}</div></section>`;
}
export function advanceDialogue() {
  const current = state.dialogue;
  if (++current.index < current.lines.length) return null;
  state.dialogue = null;
  return { after: current.after, context: current.context };
}
