import { state } from './state.js';
import { choices } from '../data/choices.js';
import { esc, button } from './ui.js';
export function attempt(id, submitted) {
  state.minigames.attempts[id] = (state.minigames.attempts[id] || 0) + 1;
  (state.minigames.history[id] ||= []).push(submitted);
  return state.minigames.attempts[id];
}
export function choiceFeedback(id, option, context = null) {
  const choice = choices[id], count = attempt(id, option.id);
  const solution = choice.options.find(item => item.id === choice.solution);
  const correct = option.id === choice.solution;
  const assisted = !correct && count >= 3;
  if (correct || assisted) {
    state.minigames.resolved[id] = true;
    if (assisted) state.minigames.assisted[id] = true;
    return { kind: 'feedback', id, context, after: context ? 'complete-conversation' : 'next-scene', assisted,
      solution: assisted ? solution.text : null,
      text: solution.feedback, securing: choice.securing };
  }
  const hint = option.hints?.[Math.min(count - 1, option.hints.length - 1)] || choice.wrongFeedback;
  return { kind: 'feedback', id, context, after: 'retry-choice',
    text: option.partial ? option.feedback + '\n\n' + option.followup : count === 2 && (!option.hints || option.hints.length < 2) ? 'Hinweis:\n' + solution.text : hint };
}
export function feedbackView(feedback) {
  return `<section class="feedback-panel task-panel"><div class="task-heading"><p class="eyebrow">${feedback.assisted ? 'Lösung und fachliche Sicherung' : 'Ein Gedanke zum Weiterdenken'}</p></div><div class="task-scroll">${feedback.solution ? `<p class="solution-text">${esc(feedback.solution)}</p>` : ''}<p class="feedback-text" role="status">${esc(feedback.text)}</p>${feedback.securing ? `<p class="securing">${esc(feedback.securing)}</p>` : ''}${feedback.highlights ? `<div class="boundary-cards">${feedback.highlights.map(text=>`<span>${esc(text)}</span>`).join('')}</div>` : ''}</div><div class="panel-actions">${button(feedback.after.startsWith('retry') ? 'Noch einmal prüfen →' : 'Weiter →', 'feedback-next', 'class="primary"')}</div></section>`;
}
