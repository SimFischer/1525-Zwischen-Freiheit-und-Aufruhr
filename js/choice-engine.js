import { choices } from '../data/choices.js';
import { state } from './state.js';
import { esc } from './ui.js';
export function choiceView(id) {
  const choice = choices[id];
  return `<section class="choice-panel task-panel"><div class="choice-heading"><p class="eyebrow">${choice.reflective ? 'Dein Gedanke' : 'Aussagen prüfen'}</p>${choice.contextStatement ? `<blockquote class="task-statement context-statement"><strong>${esc(choice.contextLabel)}</strong><span>${esc(choice.contextStatement)}</span></blockquote>` : ''}${choice.statements ? choice.statements.map(text=>`<blockquote class="task-statement">„${esc(text)}“</blockquote>`).join('') : ''}<h2>${esc(choice.prompt)}</h2>${choice.instruction ? `<p>${esc(choice.instruction)}</p>` : ''}</div><div class="task-scroll">${choice.statement ? `<blockquote class="task-statement">„${esc(choice.statement)}“</blockquote>` : ''}<div class="choices">${choice.options.map(option => `<button data-action="choose" data-choice="${id}" data-option="${option.id}"><span class="choice-letter">${option.label || option.id}</span><span>${esc(option.text)}</span><span aria-hidden="true">↗</span></button>`).join('')}</div></div></section>`;
}
export function recordChoice(id, optionId) {
  const option = choices[id]?.options.find(item => item.id === optionId);
  if (!option) return null;
  state.choices[id] = optionId;
  state.choiceTexts[id] = option.text;
  return option;
}
