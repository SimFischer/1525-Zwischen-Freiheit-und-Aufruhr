import { state } from './state.js';
import { dialogues } from '../data/dialogues.js';
import { characters } from '../data/characters.js';
import { esc, button } from './ui.js';
export function beginDialogue(idOrLines, after, context = null) {
  state.dialogue = { lines: typeof idOrLines === 'string' ? dialogues[idOrLines] : idOrLines, index: 0, after, context };
}
export function dialogueView() {
  const current = state.dialogue;
  const line = current.lines[current.index];
  const character = characters[line.speaker];
  const emotion = line.emotion || 'neutral';
  return `<section class="dialogue-panel" aria-label="Gespräch"><div class="dialogue-content">${character ? `<div class="portrait"><img src="${character.asset}" alt=""><span>${esc(character.states[emotion])}</span></div>` : '<div class="narrator-mark" aria-hidden="true">✦</div>'}<div class="speech"><p class="eyebrow">${character ? esc(character.name) : 'In der Taverne'}</p><p class="spoken" aria-live="polite">${esc(line.text)}</p></div></div><div class="dialogue-footer"><span class="muted">${current.index + 1} / ${current.lines.length}</span>${button(current.index + 1 < current.lines.length ? 'Weiter <span aria-hidden="true">→</span>' : 'Zum nächsten Gedanken <span aria-hidden="true">→</span>', 'dialogue-next', 'class="primary"')}</div></section>`;
}
export function advanceDialogue() {
  const current = state.dialogue;
  if (++current.index < current.lines.length) return null;
  state.dialogue = null;
  return { after: current.after, context: current.context };
}
