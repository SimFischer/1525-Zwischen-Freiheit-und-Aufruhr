import { state, addUnique } from './state.js';
import { articles, focusArticles, articleSource } from '../data/chapter-three-articles.js';
import { openOverlay, closeOverlay, button, esc } from './ui.js';
import { save } from './save-system.js';
export function openArticles(archive=false,onClose=()=>{},onContinue=null){
 addUnique(state.notebook.documents,'articles');
 let current=focusArticles[state.chapter3.entryFocus]||1;
 const allowed=archive?(state.chapter3.seenArticles.length?[...state.chapter3.seenArticles]:[current]):articles.map(a=>a.id);
 if(!allowed.includes(current))current=allowed[0];
 function render(){
  const a=articles.find(x=>x.id===current);
  addUnique(state.chapter3.seenArticles,current);state.notebook.passages.articles=[...state.chapter3.seenArticles];save(state);
  const required=[focusArticles[state.chapter3.entryFocus]||1,...(state.chapter3.entryFocus==='labor'?[7]:[]),3,12];
  const ready=required.every(id=>state.chapter3.seenArticles.includes(id));
  openOverlay(`<article class="ch3-article-view"><div class="overlay-top"><h1 id="overlay-title">Die Zwölf Artikel · 1525</h1>${button('Schließen ×','close-overlay','class="quiet"')}</div><nav class="notebook-tabs ch3-article-tabs" aria-label="Artikel">${allowed.map(id=>`<button data-article="${id}" aria-label="Artikel ${id}: ${esc(articles[id-1].title)}" title="${esc(articles[id-1].title)}" aria-current="${id===current?'page':'false'}">${id}</button>`).join('')}</nav><div class="ch3-article-scroll" tabindex="0"><div class="ch3-document-paper"><section class="ch3-article-leaf"><p class="eyebrow">Artikel ${a.id}</p><h2>${esc(a.title)}</h2><p class="ch3-summary-label">In heutiger Sprache</p><p>${esc(a.text)}</p></section><section class="ch3-article-leaf ch3-article-focus"><blockquote>„${esc(a.excerpt)}“</blockquote><p class="muted">Wortlaut des Augsburger Drucks · Auszug</p></section></div>${archive?`<details class="editorial-info"><summary>Zur Quelle</summary><p>Die Zwölf Artikel wurden Ende Februar / Anfang März 1525 in Memmingen formuliert. Sebastian Lotzer wirkte an ihrer Abfassung mit. Die Gesprächsfiguren und Spielszenen sind gestaltet; die Bilduntergründe sind keine Faksimiles. Die kurzen Zusammenfassungen unterscheiden sich ausdrücklich vom Originalwortlaut. Artikel 3 fordert das Ende der Leibeigenschaft und bewahrt zugleich Obrigkeit in christlichen und angemessenen Sachen. Artikel 12 stellt die Forderungen unter die Prüfung der Schrift.</p><a href="${articleSource}" target="_blank" rel="noopener noreferrer">Stadtarchiv Memmingen · Originaldruck und Transkription</a></details>`:''}</div><div class="panel-actions">${!archive?`<span>Für den Vergleich sind besonders ${required.map(id=>'Artikel '+id).join(', ')} interessant.</span>`:''}${onContinue?`<button data-article-continue class="primary" ${ready?'':'disabled'}>Mit unserer Forderung vergleichen →</button>`:button('Zurück zum Notizbuch','close-overlay','class="quiet"')}</div></article>`,onClose,'document');
  document.querySelector('.ch3-article-tabs').onclick=e=>{const n=e.target.closest('[data-article]');if(n){current=Number(n.dataset.article);render();}};
  const cont=document.querySelector('[data-article-continue]');if(cont)cont.onclick=()=>{if(!ready)return;closeOverlay();onContinue();};
 }
 render();
}
