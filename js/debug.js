import { state } from './state.js';
import { scenes } from '../data/scenes.js';
import { esc } from './ui.js';
import { chapterFourWorld,chapterFourWorldAssets } from './chapter-four-view.js';
import { chapterFiveWorld } from './chapter-five-view.js';
export const debugEnabled = new URLSearchParams(location.search).get('debug') === 'true';
export function debugView(open = false) {
  if (!debugEnabled) return '';
  const chapter4World=state.chapter===4?chapterFourWorld():null;
  return `<details class="debug" ${open ? 'open' : ''}><summary>Debug · ${state.scene}</summary><div><button data-action="admin-open">Admin-Übersicht öffnen</button><label>Szenensprung <select id="debug-scene">${scenes.map(s => `<option value="${s.id}" ${s.id === state.scene ? 'selected' : ''}>${s.id}</option>`).join('')}</select></label><button data-action="debug-prev">← Vorherige</button><button data-action="debug-next">Nächste →</button><button data-action="debug-documents">Alle Dokumente</button><button data-action="ch2-start">Kapitel 2 starten</button><button data-action="debug-ch2-complete">Drei Dorfstationen abschließen</button><button data-action="debug-clear">Save löschen</button><pre>${esc(JSON.stringify({ ...(chapter4World?{chapter4World:{...chapter4World,assets:chapterFourWorldAssets(chapter4World)}}:{}), chapter6:state.chapter6,chapter5:state.chapter5,chapter5World:state.chapter===5?chapterFiveWorld():null,chapter4:state.chapter4, chapter3:state.chapter3,orientation:state.orientation,perceptions:state.perceptions, chapter2:state.chapter2, forestEvidence:state.forestEvidence, grievances:state.grievances, scene: state.scene, uiMode: state.uiMode, dimensions: state.dimensions, relationships: state.relationships, world: state.world, choices: state.choices, progress: state.progress, attempts: state.minigames.attempts, assisted: state.minigames.assisted }, null, 2))}</pre></div></details>`;
}
