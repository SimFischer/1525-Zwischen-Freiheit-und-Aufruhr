import { openArticles } from './chapter-three-documents.js';
import { documents } from '../data/documents.js';
import { state, addUnique } from './state.js';
import { save } from './save-system.js';
import { openOverlay, esc, button } from './ui.js';
export function openDocument(id, passage = null, onClose = () => {}, archive = false, returnLabel = archive ? 'Zurück zum Notizbuch' : 'Zurück zum Gespräch') {
  if(id==='articles')return openArticles(archive,onClose);
  const doc = documents[id];
  addUnique(state.notebook.documents, id);
  const seen = state.notebook.passages[id] ||= [];
  if (passage !== null) addUnique(seen, passage);
  save(state);
  // Archive navigation is confined to passages already read in the story.
  const indices = passage === null ? (seen.length ? [...seen].sort((a, b) => a - b) : [0]) : [passage];
  let position = 0, reading = false, enlarged = false;
  const control = (label, action, extra = '') => `<button type="button" data-source-action="${action}" ${extra}>${label}</button>`;
  openOverlay(`<div class="document-table"><h1 id="overlay-title" class="sr-only">${esc(doc.title)}</h1><div class="overlay-top document-controls">${control('Text lesen', 'read', 'aria-pressed="false" aria-controls="source-viewport"')}${control('Vergrößern', 'zoom', 'aria-pressed="false" aria-controls="source-viewport"')}${button('Schließen ×', 'close-overlay', 'class="quiet"')}</div><div id="source-viewport" class="source-viewport" tabindex="0" aria-label="Druckblatt"></div><div class="source-footer">${indices.length > 1 ? `<nav class="source-navigation" aria-label="Druckblattseiten">${control('← Zurück', 'previous')}<span class="source-page-number" aria-live="polite"></span>${control('Weiter →', 'next')}</nav>` : '<span class="source-page-number"></span>'}${button(esc(returnLabel), 'close-overlay', 'class="primary"')}</div></div>`, onClose, 'document');
  const table = document.querySelector('#overlay .document-table');
  const viewport = table.querySelector('.source-viewport');
  const read = table.querySelector('[data-source-action="read"]');
  const zoom = table.querySelector('[data-source-action="zoom"]');
  function renderPage() {
    const index = indices[position];
    viewport.innerHTML = `<figure class="source-image${enlarged ? ' enlarged' : ''}" ${reading ? 'hidden' : ''}><img src="${doc.pageAssets[index]}" alt="Historisches Druckblatt: ${esc(doc.title)}, Seite ${index + 1}" width="1024" height="1536"></figure><article class="source-readable" ${reading ? '' : 'hidden'}><h2>${esc(doc.title)}</h2><blockquote>„${esc(doc.passages[index])}“</blockquote><p>${esc(doc.author)} · ${esc(doc.year)}</p></article>${archive ? `<details class="editorial-info"><summary>Zur Quelle</summary><p class="source-note">${esc(doc.note)} ${esc(doc.imageNote)}</p><a href="${esc(doc.sourceUrl)}" target="_blank" rel="noopener noreferrer">Historischer Druck und Text · Oxford</a></details>` : ''}`;
    viewport.classList.toggle('reading', reading);
    viewport.classList.toggle('enlarged', enlarged && !reading);
    viewport.scrollTop = 0;
    table.querySelector('.source-page-number').textContent = `Seite ${index + 1}`;
    read.textContent = reading ? 'Druckblatt ansehen' : 'Text lesen';
    read.setAttribute('aria-pressed', String(reading));
    zoom.textContent = enlarged ? 'Verkleinern' : 'Vergrößern';
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.disabled = reading;
    if (indices.length > 1) {
      table.querySelector('[data-source-action="previous"]').disabled = position === 0;
      table.querySelector('[data-source-action="next"]').disabled = position === indices.length - 1;
    }
  }
  table.addEventListener('click', event => {
    const action = event.target.closest('[data-source-action]')?.dataset.sourceAction;
    if (!action) return;
    if (action === 'read') reading = !reading;
    if (action === 'zoom') enlarged = !enlarged;
    if (action === 'previous' && position > 0) position--;
    if (action === 'next' && position < indices.length - 1) position++;
    renderPage();
  });
  renderPage();
}
