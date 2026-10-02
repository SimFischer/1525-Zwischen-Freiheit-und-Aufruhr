import { state } from './state.js';
import { choices } from '../data/choices.js';
import { documents } from '../data/documents.js';
import { notebookEntries } from '../data/notebook-entries.js';
import { openOverlay, esc, button } from './ui.js';
export function chosenText(id) { return state.choiceTexts[id] || choices[id]?.options.find(item => item.id === state.choices[id])?.text || 'Noch keine Deutung festgehalten.'; }
export function openNotebook(tab = 'freedom') {
  let content = '';
  if (tab === 'freedom') content = state.notebook.entries.map(id => {
    const entry = notebookEntries[id];
    return entry ? `<h2>${esc(entry.title)}</h2>${entry.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}<p class="securing">${esc(entry.motto)}</p>${entry.additional.map(p => `<p>${esc(p)}</p>`).join('')}` : '';
  }).join('');
  if (tab === 'documents') content = state.notebook.documents.map(id => `<button class="document-card" data-action="archive-document" data-document="${id}"><span>${documents[id].author}</span><strong>${esc(documents[id].title)} (${documents[id].year})</strong><span>Quelle öffnen ↗</span></button>`).join('');
  if (tab === 'path') content = `<h2>Meine erste Deutung von Freiheit</h2><div class="personal-note"><p>„${esc(chosenText('initialFreedomInterpretation'))}“</p></div>${['freedomSocialFirstThought','freedomAndOuterLife'].filter(id => state.choices[id]).map(id => `<div class="path-entry"><p class="eyebrow">${esc(choices[id].prompt)}</p><p>${esc(chosenText(id))}</p></div>`).join('')}`;
  openOverlay(`<article class="notebook"><div class="overlay-top"><span class="eyebrow">Dein Notizbuch</span>${button('Schließen ×','close-overlay','class="quiet"')}</div><h1 id="overlay-title">Notizbuch</h1><nav class="notebook-tabs" aria-label="Notizbuch">${[['freedom','Freiheit'],['documents','Dokumente'],['path','Mein Weg']].map(([id,label]) => `<button data-action="notebook-tab" data-tab="${id}" aria-current="${tab === id ? 'page' : 'false'}">${label}</button>`).join('')}</nav><div class="notebook-content">${content}</div></article>`, () => {}, 'notebook');
}