import { chapterFourDocuments,chapterFourPageText,chapterFourComparisonKey } from '../data/chapter-four-documents.js';
import { documentRegions } from '../data/chapter-four-document-regions.js';
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
 if(text==='In heutiger Sprache zusammengefasst'||text==='Historische Position in heutiger Sprache zusammengefasst')return `<p class="ch4-source-kind">${esc(text)}</p>`;
 if(/^(Martin Luther ·|Thüringen ·|(?:April|Mai) 1525$)/.test(text))return `<p class="ch4-source-date">${esc(text)}</p>`;
 if(text==='Thomas Müntzer')return `<p class="ch4-source-author">${esc(text)}</p>`;
 if(page==='ermahnung_closed'&&index===1)return `<p class="ch4-source-subtitle">${esc(text)}</p>`;
 return paragraph(text);
}
export function sourceCanvas(page,game=state){
 const meta=documentRegions[page]||{file:'props/ch4_prop_weingarten_report.png',size:[768,470],regions:[[12,13,89,86]],summaries:[]};
 const groups=chapterFourPageText[page];
 if(page==='luther_comparison_frame')return `<div class="ch4-source-canvas ch4-comparison-spread" data-page="${page}" style="aspect-ratio:${meta.size[0]}/${meta.size[1]}"><img src="assets/chapter4/${meta.file}" width="${meta.size[0]}" height="${meta.size[1]}" alt="Vergleich der Friedensermahnung mit Luthers schärferer Schrift" draggable="false">${groups.map((content,i)=>`<section class="ch4-source-text ch4-comparison-leaf" tabindex="0" aria-label="${esc(content[0])}">${content.map((text,n)=>sourceLine(page,text,n)).join('')}<p class="ch4-comparison-key">${esc(chapterFourComparisonKey[i])}</p></section>`).join('')}</div>`;
 const parts=meta.regions.map(([l,t,r,b],i)=>{
  const content=groups[i]||[];
  return `<section class="ch4-source-text" tabindex="0" style="left:${l}%;top:${t}%;width:${r-l}%;height:${b-t}%" aria-label="Textbereich ${i+1}">${content.map((text,n)=>sourceLine(page,text,n)+(page==='luther_freedom_small'&&n===0?'<p class="ch4-source-kind">In heutiger Sprache zusammengefasst</p>':'')).join('')}${page==='luther_freedom_small'?`<p class="ch4-source-personal">${esc('Dein damaliger Gedanke: '+(game.choiceTexts.initialFreedomInterpretation||'Noch keine Notiz.'))}</p>`:''}</section>`;
 }).join('');
 const summaries=(meta.summaries||[]).map(([l,t,r,b],i)=>`<aside class="ch4-source-text ch4-summary" tabindex="0" style="left:${l}%;top:${t}%;width:${r-l}%;height:${b-t}%">${paragraph(page==='ermahnung_lords'?'Herrschaft bleibt kritisierbar.':page==='ermahnung_peasants'?'Eine Klage rechtfertigt nicht jedes Mittel.':i===0?'Forderung und Mittel unterscheiden.':'Begründung und Härte getrennt beurteilen.')}</aside>`).join('');
 return `<div class="ch4-source-canvas" data-page="${page}" style="aspect-ratio:${meta.size[0]}/${meta.size[1]}"><img src="assets/chapter4/${meta.file}" width="${meta.size[0]}" height="${meta.size[1]}" alt="${esc(groups[0][0])}" draggable="false">${parts}${summaries}</div>`;
}
export function openChapterFourDocument(id,pages=null,onClose=()=>{},archive=false,onRead=()=>{}){
 const doc=chapterFourDocuments[id];if(!doc)return;
 // Archive never reveals a source (especially the May text) before its story checkpoint.
 const seen=state.notebook.passages[id]||[];
 const available=archive?doc.pages.filter(p=>seen.includes(p)):pages||doc.pages;
 if(!available.length)return;
 let position=0,enlarged=false;
 openOverlay(`<article class="ch4-reader"><header class="overlay-top"><h1 id="overlay-title">${esc(doc.title)}</h1>${button('Schließen ×','close-overlay','class="quiet"')}</header><div class="ch4-reader-scroll" tabindex="0" aria-label="Druckbogen"></div><footer class="panel-actions"><button data-ch4-source="previous">← Zurück</button><span class="ch4-page-number" aria-live="polite"></span><button data-ch4-source="next">Nächste Seite →</button><button data-ch4-source="zoom" aria-pressed="false">Vergrößern</button>${button(archive?'Zurück zum Notizbuch':'Zurück zum Gespräch','close-overlay','class="primary"')}</footer></article>`,onClose,'document');
 const reader=document.querySelector('.ch4-reader');
 const draw=()=>{
  const page=available[position];
  reader.classList.toggle('comparison-reading',page==='luther_comparison_frame');
  reader.querySelector('#overlay-title').textContent=page==='luther_comparison_frame'?'Friedensermahnung – schärfere Schrift':doc.title;
  if(!archive){addUnique(state.notebook.documents,id);addUnique(state.notebook.passages[id]||=([]),page);addUnique(state.chapter4.seenDocuments,page);save(state);}
  reader.querySelector('.ch4-reader-scroll').innerHTML=sourceCanvas(page)+(archive?`<details class="editorial-info"><summary>Zur Quelle</summary><p>Die Materialien sind heutige Illustrationen. ${doc.exact?'Die beiden Leitsätze sind behutsam modernisierte Quellenworte.':'Die Texte sind gekennzeichnete Zusammenfassungen und Einordnungen, keine wörtlichen historischen Zitate.'} Die Dorfgespräche sind erfunden.</p><a href="${esc(doc.sourceUrl)}" target="_blank" rel="noopener noreferrer">Historischer Text / Nachweis</a></details>`:'');
  reader.querySelector('.ch4-reader-scroll').scrollTop=0;
  reader.classList.toggle('enlarged',enlarged);
  reader.querySelector('.ch4-page-number').textContent=`${position+1} / ${available.length} · ${doc.year}`;
  reader.querySelector('[data-ch4-source="previous"]').disabled=position===0;
  reader.querySelector('[data-ch4-source="next"]').disabled=position===available.length-1;
  reader.querySelector('[data-ch4-source="zoom"]').textContent=enlarged?'Verkleinern':'Vergrößern';
  reader.querySelector('[data-ch4-source="zoom"]').setAttribute('aria-pressed',String(enlarged));
  if(!archive&&available.every(p=>(state.notebook.passages[id]||[]).includes(p)))onRead();
 };
 reader.addEventListener('click',e=>{const a=e.target.closest('[data-ch4-source]')?.dataset.ch4Source;if(!a)return;if(a==='next'&&position<available.length-1)position++;if(a==='previous'&&position>0)position--;if(a==='zoom')enlarged=!enlarged;draw();});draw();
}
