import { choices } from '../data/choices.js';
import { state } from './state.js';
import { applyEffects } from './consequences.js';
import { esc } from './ui.js';
export function choiceView(id) {
  const choice = choices[id];
  return `<section class="choice-panel"><div class="choice-heading"><p class="eyebrow">Dein Gedanke</p><h2>${esc(choice.prompt)}</h2>${choice.reflective ? '<p class="muted">Eine erste Deutung. Keine Bewertung.</p>' : ''}</div><div class="choices">${choice.options.map(option => `<button data-action="choose" data-choice="${id}" data-option="${option.id}"><span class="choice-letter">${option.id}</span><span>${esc(option.text)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div></section>`;
}
export function recordChoice(id, optionId) {
  const option = choices[id]?.options.find(item => item.id === optionId);
  if (!option) return null;
  const prior = choices[id].options.find(item => item.id === state.choices[id]);
  if (prior?.effects) {
    const reverse = Object.fromEntries(Object.entries(prior.effects).map(([group, values]) => [group, Object.fromEntries(Object.entries(values).map(([key, value]) => [key, -value]))]));
    applyEffects(reverse);
  }
  state.choices[id] = optionId;
  applyEffects(option.effects);
  return option;
}
