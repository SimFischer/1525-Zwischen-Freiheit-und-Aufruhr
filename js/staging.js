// Presentation only: the saved chapter state continues to use the existing ending scene.
let revealed = false, timer;
export function endingRevealed() { return revealed; }
export function resetStaging() { clearTimeout(timer); revealed = false; }
export function highlightHotspot(node) {
  node.classList.add('touched');
  setTimeout(() => node.classList.remove('touched'),1200);
}
export function leaveTavern(onReveal) {
  const stage = document.querySelector('.stage');
  if (!stage || stage.classList.contains('leaving')) return;
  stage.classList.add('leaving');
  stage.inert = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  timer = setTimeout(() => { revealed = true; onReveal(); document.querySelector('.ending')?.focus(); },reduced ? 0 : 1500);
}
