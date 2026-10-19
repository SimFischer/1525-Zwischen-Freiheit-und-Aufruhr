import {decisionHistory} from './decision-history.js';
import { chapterFourDocuments,chapterFourPageText,chapterFourComparisonKey } from '../data/chapter-four-documents.js';
import { state,addUnique } from './state.js';
import { save } from './save-system.js';
import { esc,button,openOverlay } from './ui.js';
const paragraph=text=>`<p>${esc(text)}</p>`;
// Presentation roles only: source strings remain in the existing data module.
function sourceLine(page,text,index){
 if(index===0){
  const datedTitle=text.match(/^(.*?)( · (?:April|Mai|\d{4}))$/);
  return `<h2>${datedTitle?esc(datedTitle[1])+`<span class="ch4-title-date">${esc(datedTitle[2])}</span>`:esc(text)}</h2>`;
 }
 if(page==='luther_freedom_small')return `<p class="ch4-source-quotation">${esc(text)}</p>`;
 if(/^(In heutiger Sprache|Historische Position|Originalausschnitt)/.test(text))return `<p class="ch4-source-kind">${esc(text)}</p>`;
 if(/^(Martin Luther ·|Thüringen ·|(?:April|Mai) 1525$)/.test(text))return `<p class="ch4-source-date">${esc(text)}</p>`;
 if(text==='Thomas Müntzer')return `<p class="ch4-source-author">${esc(text)}</p>`;
 if(page==='ermahnung_closed'&&index===1)return `<p class="ch4-source-subtitle">${esc(text)}</p>`;
 return paragraph(text);
}
export function sourceCanvas(page,game=state,leaf=null){
 const groups=leaf===null?chapterFourPageText[page]:[chapterFourPageText[page][leaf]];
 const comparison=page==='luther_comparison_frame';
 const parts=groups.map((content,i)=>{
  return `<section class="ch4-source-text${comparison?' ch4-comparison-leaf':''}" tabindex="0" aria-label="${esc(content[0])}">${content.map((text,n)=>sourceLine(page,text,n)+(page==='luther_freedom_small'&&n===0?'<p class="ch4-source-kind">Originalausschnitt · behutsam modernisiert</p>':'')).join('')}${page==='luther_freedom_small'?`<p class="ch4-source-personal">${esc('Dein damaliger Gedanke: '+(game.choiceTexts.initialFreedomInterpretation||'Noch keine Notiz.'))}</p>`:''}${page==='luther_freedom_small'?decisionHistory('initialFreedomInterpretation',game):''}${comparison?`<p class="ch4-comparison-key">${esc(chapterFourComparisonKey[i])}</p>`:''}</section>`;
 }).join('');
 return `<div class="ch4-source-canvas historical-document ${groups.length>1?'document-spread':'document-sheet'}${comparison?' ch4-comparison-spread':''}" data-page="${page}">${parts}</div>`;
}
export function openChapterFourDocument(id,pages=null,onClose=()=>{},archive=false,onRead=()=>{}){
 const doc=chapterFourDocuments[id];if(!doc)return;
 // Archive never reveals a source (especially the May text) before its story checkpoint.
 const seen=state.notebook.passages[id]||[];
 const available=archive?doc.pages.filter(p=>seen.includes(p)):pages||doc.pages;
 if(!available.length)return;
 // Two long thematic leaves become actual successive folios. Parent source IDs
 // still control archive unlocks; a spread counts as read only after both folios.
 const folios=available.flatMap(page=>page==='luther_comparison_frame'||chapterFourPageText[page].length===1?[{page,leaf:null}]:chapterFourPageText[page].map((_,leaf)=>({page,leaf})));
 const visited=new Set();
 let position=0,enlarged=false,infoOpen=false;
 openOverlay(`<article class="ch4-reader"><header class="overlay-top"><h1 id="overlay-title">${esc(doc.title)}</h1>${button('Schließen ×','close-overlay','class="quiet"')}</header><div class="ch4-reader-scroll" tabindex="0" aria-label="Druckbogen"></div><footer class="panel-actions"><button data-ch4-source="previous">← Zurück</button><span class="ch4-page-number" aria-live="polite"></span><button data-ch4-source="next" class="primary">Nächste Seite →</button><button data-ch4-source="zoom" class="quiet" aria-pressed="false">Vergrößern</button>${archive?'<button data-ch4-source="info" class="quiet" aria-expanded="false">Zur Quelle</button>':''}${button(archive?'Zurück zum Notizbuch':'Zurück zum Gespräch','close-overlay','class="quiet"')}</footer></article>`,onClose,'document');
 const reader=document.querySelector('.ch4-reader');
 const draw=()=>{
  const {page,leaf}=folios[position];visited.add(position);
  reader.classList.toggle('comparison-reading',page==='luther_comparison_frame');
  reader.querySelector('#overlay-title').textContent=page==='luther_comparison_frame'?'Friedensermahnung – schärfere Schrift':doc.title;
  if(!archive&&folios.every((folio,i)=>folio.page!==page||visited.has(i))){addUnique(state.notebook.documents,id);addUnique(state.notebook.passages[id]||=([]),page);addUnique(state.chapter4.seenDocuments,page);save(state);}
  reader.querySelector('.ch4-reader-scroll').innerHTML=sourceCanvas(page,state,leaf)+(archive?`<section class="editorial-info" ${infoOpen?'':'hidden'} aria-label="Quelleninformation"><p>Die Materialien sind heutige Illustrationen. ${doc.exact?'Die beiden Leitsätze sind behutsam modernisierte Quellenworte.':'Die Texte sind gekennzeichnete Zusammenfassungen und Einordnungen, keine wörtlichen historischen Zitate.'} Die Dorfgespräche sind erfunden.</p><a href="${esc(doc.sourceUrl)}" target="_blank" rel="noopener noreferrer">Historischer Text / Nachweis</a></section>`:'');
  reader.querySelector('.ch4-reader-scroll').scrollTop=0;
  if(archive){reader.querySelector('[data-ch4-source="info"]').setAttribute('aria-expanded',String(infoOpen));if(infoOpen)reader.querySelector('.editorial-info').scrollIntoView({block:'nearest'});}
  reader.classList.toggle('enlarged',enlarged);
  reader.querySelector('.ch4-page-number').textContent=`${position+1} / ${folios.length} · ${doc.year}`;
  reader.querySelector('[data-ch4-source="previous"]').disabled=position===0;
  reader.querySelector('[data-ch4-source="next"]').disabled=position===folios.length-1;
  reader.querySelector('[data-ch4-source="zoom"]').textContent=enlarged?'Verkleinern':'Vergrößern';
  reader.querySelector('[data-ch4-source="zoom"]').setAttribute('aria-pressed',String(enlarged));
  if(!archive&&visited.size===folios.length)onRead();
 };
 reader.addEventListener('click',e=>{const a=e.target.closest('[data-ch4-source]')?.dataset.ch4Source;if(!a)return;if(a==='next'&&position<folios.length-1)position++;if(a==='previous'&&position>0)position--;if(a==='zoom')enlarged=!enlarged;if(a==='info')infoOpen=!infoOpen;else infoOpen=false;draw();});draw();
}
