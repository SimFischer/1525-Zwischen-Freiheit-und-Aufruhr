import { button } from './ui.js';

// Presentation only. Actions, prerequisites and save state belong to the scene.
// Every chapter uses the same marker slot; staging CSS supplies its anchor.
export function hotspot(label,action,{kind='object',direction='right',classes='',attrs='',labelClass=''}={}) {
  if(!['object','path','action'].includes(kind)) throw new Error('Unknown hotspot type: '+kind);
  return button(`<span class="hotspot-label ${labelClass}">${label}</span>`,action,
    `class="scene-hotspot hotspot-${kind} ${kind==='path'&&direction==='left'?'hotspot-path-left':''} ${classes}" ${attrs}`);
}
