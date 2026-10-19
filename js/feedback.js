import {learningFeedback} from './learning-feedback.js';
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
  // Three graduated attempts for knowledge tasks; genuine choices bypass this module.
  const assisted = !correct && count >= 3;
  if (correct || assisted) {
    state.minigames.resolved[id] = true;
    if (assisted) state.minigames.assisted[id] = true;
    return { kind: 'feedback', id, context, after: context ? 'complete-conversation' : 'next-scene', assisted,
      submitted: option.text, solution: assisted ? solution.text : null,
      text: assisted ? (option.feedback || option.hints?.at(-1) || choice.wrongFeedback || '') + '\n\n' + solution.feedback : solution.feedback, securing: choice.securing };
  }
  return { kind: 'feedback', id, context, after: 'retry-choice',
    submitted: option.text,
    text: learningFeedback({count,correct:false,solution:solution.text,explanation:solution.feedback,hints:option.hints||choice.hints,response:option.partial?[option.feedback,option.followup].join(' '):option.feedback}).text };
}
export function feedbackView(feedback) {
  return `<section class="feedback-panel task-panel"><div class="task-heading"><p class="eyebrow">${feedback.assisted ? 'Gemeinsam den Zusammenhang sichern' : 'Ein Gedanke zum Weiterdenken'}</p></div><div class="task-scroll">${feedback.submitted ? `<p class="personal-note">Dein Gedanke: ${esc(feedback.submitted)}</p>` : ''}${feedback.solution ? `<p class="solution-text">${esc(feedback.solution)}</p>` : ''}<p class="feedback-text" role="status">${esc(feedback.text)}</p>${feedback.securing ? `<p class="securing">${esc(feedback.securing)}</p>` : ''}${feedback.highlights ? `<div class="boundary-cards">${feedback.highlights.map(text=>`<span>${esc(text)}</span>`).join('')}</div>` : ''}</div><div class="panel-actions">${button(feedback.after.startsWith('retry') ? 'Mit diesem Hinweis neu prüfen →' : 'Weiter →', 'feedback-next', 'class="primary"')}</div></section>`;
}
