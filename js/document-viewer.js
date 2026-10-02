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
  const indices = passage === null ? (archive ? [0, 1] : seen.length ? seen : [0]) : [passage];
  openOverlay(`<div class="document-table"><div class="overlay-top document-controls"><img src="${doc.closedAsset}" alt="" aria-hidden="true">${button('Schließen ×', 'close-overlay', 'class="quiet"')}</div><article class="document-sheet printed-leaf"><h1 id="overlay-title">${esc(doc.title)}</h1><div class="print-ornament" aria-hidden="true">❧</div>${indices.map(index => `<section class="printed-passage"><p class="passage-label">${index === 0 ? 'I.' : 'II.'}</p><blockquote>„${esc(doc.passages[index])}“</blockquote></section>`).join('')}<p class="print-imprint">${esc(doc.author)} · ${doc.year}</p></article>${archive ? `<details class="editorial-info"><summary>Zur Quelle</summary><p class="source-note">${esc(doc.note)}</p></details>` : ''}<div class="source-footer">${button(archive ? 'Zurück zum Notizbuch' : 'Zurück zum Gespräch', 'close-overlay', 'class="primary"')}</div></div>`, onClose, 'document');
}
