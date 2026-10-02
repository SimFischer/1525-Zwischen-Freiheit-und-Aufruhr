import { state } from './state.js';
export function applyEffects(effects = {}) {
  for (const group of ['dimensions', 'relationships']) for (const [key, delta] of Object.entries(effects[group] || {})) if (key in state[group]) state[group][key] += delta;
  Object.assign(state.world, effects.world || {});
}
