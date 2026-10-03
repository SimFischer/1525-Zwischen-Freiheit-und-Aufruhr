// Pointer Events support mouse, touch and pen; buttons remain keyboard-operable.
export function installDragDrop(root, onDrop, onSelect) {
  let drag = null, suppressUntil = 0;
  root.addEventListener('dragstart',event => {
    if(event.target.closest('.sort-card')) event.preventDefault();
  });
  root.addEventListener('click',event => {
    if (event.detail !== 0 && (event.target.closest('.sort-card') || (performance.now()<suppressUntil && event.target.closest('[data-drop-zone]')))) { event.preventDefault(); event.stopImmediatePropagation(); }
  },true);
  const clean = () => { drag?.ghost?.remove(); root.querySelectorAll('.drop-hover').forEach(node=>node.classList.remove('drop-hover')); drag=null; };
  root.addEventListener('pointerdown',event => {
    const card=event.target.closest('.sort-card');
    if (!card || event.button!==0) return;
    drag={card,id:card.dataset.card,pointer:event.pointerId,x:event.clientX,y:event.clientY,active:false};
    card.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove',event => {
    if (!drag || event.pointerId!==drag.pointer) return;
    if (!drag.active && Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<9) return;
    if (!drag.active) {
      drag.active=true; drag.ghost=drag.card.cloneNode(true);
      drag.ghost.className='drag-ghost'; drag.ghost.setAttribute('aria-hidden','true'); drag.ghost.tabIndex=-1;
      if(drag.card.classList.contains('ch4-case')) {
        const box=drag.card.getBoundingClientRect();
        drag.ghost.classList.add('ch4-drag-ghost');
        drag.ghost.style.width=box.width+'px';drag.ghost.style.height=box.height+'px';
        drag.ghost.style.background=getComputedStyle(drag.card).background;
      }
      if(drag.card.classList.contains('grain-sack')||drag.card.classList.contains('print-piece')) {
        const box=drag.card.getBoundingClientRect(), source=drag.card.querySelector('img');
        const imageBox=source.getBoundingClientRect(), image=drag.ghost.querySelector('img');
        drag.ghost.classList.add(drag.card.classList.contains('print-piece')?'print-drag-ghost':'grain-drag-ghost');
        drag.ghost.style.width=box.width+'px'; drag.ghost.style.height=box.height+'px';
        image.style.width=imageBox.width+'px'; image.style.height=imageBox.height+'px';
      }
      document.body.append(drag.ghost);
    }
    drag.ghost.style.left=event.clientX+'px'; drag.ghost.style.top=event.clientY+'px';
    root.querySelectorAll('.drop-hover').forEach(node=>node.classList.remove('drop-hover'));
    document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-drop-zone]')?.classList.add('drop-hover');
  });
  root.addEventListener('pointerup',event => {
    if (!drag || event.pointerId!==drag.pointer) return;
    const {active,id}=drag;
    const zone=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-drop-zone]')?.dataset.dropZone;
    clean(); suppressUntil=active ? performance.now()+100 : 0;
    if (active && zone) onDrop(id,zone); else onSelect(id);
  });
  root.addEventListener('pointercancel',clean);
}
