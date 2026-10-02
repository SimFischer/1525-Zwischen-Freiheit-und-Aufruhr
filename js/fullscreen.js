import { notify } from './ui.js';

const isFullscreen = () => Boolean(document.fullscreenElement || document.webkitFullscreenElement);
const supported = () => Boolean(
  (document.fullscreenEnabled && document.documentElement.requestFullscreen) ||
  (document.webkitFullscreenEnabled !== false && document.documentElement.webkitRequestFullscreen)
);
const icon = active => `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${active ? 'M3 8h5V3M16 3v5h5M21 16h-5v5M8 21v-5H3' : 'M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5'}"/></svg>`;

export function fullscreenButton(exitOnly = false) {
  const active = isFullscreen(), label = active ? 'Vollbild verlassen' : 'Vollbild';
  return `<button type="button" class="quiet fullscreen-button" data-action="fullscreen" ${exitOnly ? 'data-exit-only' : ''} ${exitOnly && !active ? 'hidden' : ''} aria-label="${label}" aria-pressed="${active}" title="${supported() ? label : 'Vollbild ist in diesem Browser nicht verfügbar.'}" ${supported() ? '' : 'disabled'}>${icon(active)}</button>`;
}
function updateFullscreenButton() {
  const active = isFullscreen(), label = active ? 'Vollbild verlassen' : 'Vollbild';
  for (const button of document.querySelectorAll('[data-action="fullscreen"]')) {
    if (button.hasAttribute('data-exit-only')) button.hidden = !active;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(active));
    button.title = supported() ? label : 'Vollbild ist in diesem Browser nicht verfügbar.';
    button.innerHTML = icon(active);
  }
}
export async function toggleFullscreen() {
  try {
    if (isFullscreen()) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      await exit.call(document);
    } else {
      const request = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
      if (!request) return notify('Vollbild ist in diesem Browser nicht verfügbar.');
      await request.call(document.documentElement);
    }
  } catch {
    notify('Der Browser konnte den Vollbildmodus nicht wechseln.');
  }
  updateFullscreenButton();
}
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
