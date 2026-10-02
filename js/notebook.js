import { state } from './state.js';
import { choices } from '../data/choices.js';
import { documents } from '../data/documents.js';
import { notebookEntries } from '../data/notebook-entries.js';
import { scenes } from '../data/scenes.js';
import { openOverlay, esc, button } from './ui.js';
export function chosenText(id) { return choices[id]?.options.find(item => item.id === state.choices[id])?.text || 'Noch keine Deutung festgehalten.'; }
export function openNotebook(tab = 'freedom') {
  let content = '';
  if (tab === 'freedom') content = state.notebook.entries.map(id => { const entry = notebookEntries[id]; return entry ? `<p class="eyebrow">${esc(entry.category)}</p><h2>${esc(entry.title)}</h2>${entry.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}` : ''; }).join('') + `<div class="personal-note"><p class="eyebrow">Meine erste Deutung</p><p>„${esc(chosenText('initialFreedomInterpretation'))}“</p></div>`;
  if (tab === 'documents') content = `<h2>Quellenarchiv</h2>${state.notebook.documents.map(id => `<button class="document-card" data-action="archive-document" data-document="${id}"><span>${documents[id].author} · ${documents[id].year}</span><strong>${esc(documents[id].title)}</strong><span>Quelle öffnen ↗</span></button>`).join('') || '<p>Hier erscheinen die gelesenen Quellen.</p>'}`;
  if (tab === 'path') content = `<h2>Mein Weg durch Kapitel 1</h2><p class="muted">Deine Gedanken werden festgehalten, nicht benotet.</p>${Object.keys(choices).filter(id => state.choices[id]).map(id => `<div class="path-entry"><p class="eyebrow">${esc(choices[id].prompt)}</p><p>${esc(chosenText(id))}</p></div>`).join('')}<h3>Erkundete Stationen</h3><ol>${state.progress.completedScenes.map(id => `<li>${esc(scenes.find(s => s.id === id)?.title || id)}</li>`).join('')}</ol>`;
  openOverlay(`<article class="notebook"><div class="overlay-top"><span class="eyebrow">Dein Notizbuch</span>${button('Schließen ×', 'close-overlay', 'class="quiet"')}</div><h1 id="overlay-title">Was bleibt.</h1><nav class="notebook-tabs" aria-label="Notizbuch">${[['freedom', 'Freiheit'], ['documents', 'Dokumente'], ['path', 'Mein Weg']].map(([id, label]) => `<button data-action="notebook-tab" data-tab="${id}" aria-current="${tab === id ? 'page' : 'false'}">${label}</button>`).join('')}<button disabled title="In einem späteren Kapitel">Gerechtigkeit · später</button></nav><div class="notebook-content">${content}</div></article>`);
}
