export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function button(text, action, extra = '') { return `<button type="button" data-action="${action}" ${extra}>${text}</button>`; }
let noticeTimer;
export function notify(text) { const node = document.querySelector('#notice'); node.textContent = text; node.classList.add('visible'); clearTimeout(noticeTimer); noticeTimer = setTimeout(() => node.classList.remove('visible'), 4800); }
export function openOverlay(html, onClose = () => {}) {
  const overlay = document.querySelector('#overlay');
  const previous = document.activeElement;
  overlay.innerHTML = html;
  overlay.onclose = () => { onClose(); if (previous?.isConnected) previous.focus(); };
  if (!overlay.open) overlay.showModal();
  overlay.scrollTop = 0;
  overlay.querySelector('button')?.focus();
}
export function closeOverlay() { document.querySelector('#overlay').close(); }
