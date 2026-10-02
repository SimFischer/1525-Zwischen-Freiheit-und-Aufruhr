import { documents } from '../data/documents.js';
import { state, addUnique } from './state.js';
import { save } from './save-system.js';
import { openOverlay, esc, button } from './ui.js';
export function openDocument(id, passage = null, onClose = () => {}, archive = false) {
  const doc = documents[id];
  addUnique(state.notebook.documents, id);
  const seen = state.notebook.passages[id] ||= [];
  if (passage !== null) addUnique(seen, passage);
  save(state);
  const indices = passage === null ? (seen.length ? seen : [0]) : [passage];
  openOverlay(`<article class="document-sheet"><div class="overlay-top"><span class="eyebrow">${esc(doc.type)}</span>${button('Schließen ×', 'close-overlay', 'class="quiet"')}</div><p class="source-author">${esc(doc.author)} · ${doc.year}</p><h1 id="overlay-title">${esc(doc.title)}</h1><div class="document-rule"></div>${indices.map(index => `<p class="passage-label">${index + 1}. Leitsatz</p><blockquote>„${esc(doc.passages[index])}“</blockquote>`).join('')}<p class="source-note">${esc(doc.note)}</p><div class="source-footer"><span class="archive-note">✓ Im Quellenarchiv aufgenommen</span>${button(archive ? 'Zurück zum Notizbuch' : 'Zurück zum Gespräch →', 'close-overlay', 'class="primary"')}</div></article>`, onClose);
}
