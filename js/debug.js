import { state } from './state.js';
import { scenes } from '../data/scenes.js';
import { esc } from './ui.js';
export const debugEnabled = new URLSearchParams(location.search).get('debug') === 'true';
export function debugView(open = false) {
  if (!debugEnabled) return '';
  return `<details class="debug" ${open ? 'open' : ''}><summary>Debug · ${state.scene}</summary><div><label>Szenensprung <select id="debug-scene">${scenes.map(s => `<option value="${s.id}" ${s.id === state.scene ? 'selected' : ''}>${s.id}</option>`).join('')}</select></label><button data-action="debug-prev">← Vorherige</button><button data-action="debug-next">Nächste →</button><button data-action="debug-documents">Alle Dokumente</button><button data-action="debug-clear">Save löschen</button><pre>${esc(JSON.stringify({ scene: state.scene, dimensions: state.dimensions, relationships: state.relationships, world: state.world, choices: state.choices }, null, 2))}</pre></div></details>`;
}
