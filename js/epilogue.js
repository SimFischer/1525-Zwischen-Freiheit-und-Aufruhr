import {state} from './state.js';
import {epilogueSources,epilogueBeats,sanitizeEpilogue} from '../data/epilogue.js';
import {esc,button} from './ui.js';
import {epilogueRoom,personalPageView,personalPages} from './chapter-six-view.js';
let hooks,replay=null,timer=null;
const failedImages=new Set();
const model=()=>replay||state.chapter6.epilogue;
export function configureEpilogue(value){hooks=value;}
export function epilogueActive(){return Boolean(hooks?.active()&&state.scene==='ch6_ending'&&state.chapter6.completed&&model());}
export function beginEpilogue(){if(!state.chapter6.completed||state.scene!=='ch6_ending')return false;state.chapter6.epilogue||=sanitizeEpilogue(null);return true;}
function persist(){if(!replay)hooks.persist();}
export function advanceEpilogue(seconds=1){if(!epilogueActive())return;const e=model();if(e.finished||e.paused)return;const oldIndex=e.index;while(seconds>0&&!e.finished){const b=epilogueBeats[e.index],step=Math.min(seconds,b.duration-e.elapsed);e.elapsed+=step;seconds-=step;if(e.elapsed>=b.duration){if(e.index===epilogueBeats.length-1){e.finished=true;if(!replay)state.chapter6.epilogueSeen=true;}else{e.index++;e.elapsed=0;}}}persist();if(e.index!==oldIndex||e.finished)hooks.render();else syncEpilogue();}
export function syncEpilogue(){clearTimeout(timer);timer=null;if(!epilogueActive()||model().finished||model().paused)return;timer=setTimeout(()=>{if(document.hidden||document.querySelector('#overlay').open){syncEpilogue();return;}advanceEpilogue();},1000);}
const lines=text=>text.map(t=>'<p>'+esc(t)+'</p>').join('');
const sourceLine=s=>`${({peace:'Martin Luther: Ermahnung zum Frieden',muentzer:'Thomas Müntzer: Hoch verursachte Schutzrede',union:'Bundesordnung · Holzschneider unbekannt'})[s.id]||s.title} · ${s.year} · ${s.place.replace(', Melchior Ramminger (Katalogzuschreibung)',', [Melchior Ramminger]').replace(', Heinrich Steiner (Katalogzuschreibung)',', [Heinrich Steiner]').replace(', Hieronymus Höltzel (Katalogzuschreibung)',', [Hieronymus Höltzel]')} · ${s.institution.replace(' / Deutsche Digitale Bibliothek','')}`;
function sourceView(b){const s=epilogueSources.find(x=>x.id===b.source);if(!s)return '<section class="ep-text"><p>Quellennachweis nicht verfügbar.</p>'+lines(b.text)+'</section>';const image=s.image&&!failedImages.has(s.image);return `<section class="ep-source ${image?'':'ep-bibliographic'}"><figure>${image?`<img data-ep-image src="${s.image}" alt="${esc(s.title+' · historische Titelseite')}" >`:`<div class="ep-source-title"><p>${esc(s.status)}</p><h1>${esc(s.title)}</h1><p>${esc(s.creator)} · ${s.year}</p>${s.image?'<p>Das Digitalisat ist derzeit nicht verfügbar.</p>':'<p>Die Abbildung wird hier nicht eingebunden.</p>'}</div>`}<figcaption><span>${esc(s.type)}</span><br>${esc(sourceLine(s))}<br>${esc(s.rights)}</figcaption></figure><div class="ep-comment">${lines(b.text)}${image?button('Original größer ansehen','ep-image',`data-source="${s.id}" class="quiet"`):`<a href="${s.url}" target="_blank" rel="noopener">Institutioneller Nachweis ↗</a>`}</div></section>`;}
export function epilogueView(){const e=model(),b=epilogueBeats[e.index],room=b.id.startsWith('theology')||['personal','final'].includes(b.id);let body;
 if(b.id==='closing')body=`<section class="ep-closing ch6-stage">${personalPageView(state,personalPages(state).length-1).replace(/<nav[\s\S]*?<\/nav>/,'')}</section>`;
 else if(b.source)body=sourceView(b);
 else if(room)body=`<section class="ep-room"><div class="ep-room-art ch6-stage">${epilogueRoom()}</div><div class="ep-room-copy">${b.id==='personal'?'<p>Deine Antwort auf die Frage:</p><h1>Was heißt frei?</h1><p class="ep-answer">'+esc(state.chapter6.finalFreedomDefinition)+'</p>':b.id==='final'?'<h1>1525 – Zwischen Freiheit und Aufruhr</h1><h2>Was heißt frei?</h2><p>Eine Frage, die 1525 nicht endete.</p>':lines(b.text)}</div><small>Spielrekonstruktion · Reflexionsraum</small></section>`;
 else body='<section class="ep-text">'+lines(b.text)+'</section>';
 return `<main class="epilogue" data-beat="${b.id}" aria-label="Dokumentarischer Epilog"><div class="ep-content" data-ep-key="${b.id}">${body}</div><footer class="ep-controls">${e.finished?button('Zum Hauptmenü','home','class="quiet"')+button('Mein Urteil ansehen','ep-judgment','class="quiet"')+button('Epilog erneut ansehen','ep-replay','class="quiet"')+button('Quellen des Epilogs','ep-sources','class="quiet"'):button(e.paused?'Weiter ansehen':'Pause','ep-pause','class="quiet"')+button('Überspringen','ep-skip','class="quiet"')}${replay?'<span>Erneute Ansicht · unveränderter Spielstand</span>':''}</footer></main>`;
}
function modal(html){const d=document.querySelector('#overlay');d.onclose=()=>syncEpilogue();d.innerHTML='<article class="ep-reader">'+button('Zurück zum Epilog','ep-close','class="quiet"')+html+'</article>';d.showModal();d.querySelector('button').focus();syncEpilogue();}
export function epilogueAction(action,target){if(!action.startsWith('ep-'))return false;
 if(action==='ep-start'){if(beginEpilogue()){hooks.render();persist();}return true;}
 if(!epilogueActive())return true;const e=model();
 if(action==='ep-pause'){e.paused=!e.paused;persist();hooks.render();}
 if(action==='ep-skip'){e.index=epilogueBeats.length-1;e.elapsed=0;e.finished=false;e.paused=false;persist();hooks.render();}
 if(action==='ep-replay'){replay=sanitizeEpilogue(null);hooks.render();}
 if(action==='ep-close')document.querySelector('#overlay').close();
 if(action==='ep-judgment')modal('<h1 id="overlay-title">Mein abschließendes Urteil</h1><p class="ep-answer">'+esc(state.chapter6.finalJudgmentText)+'</p><h2>Was heißt frei?</h2><p class="ep-answer">'+esc(state.chapter6.finalFreedomDefinition)+'</p>');
 if(action==='ep-sources')modal('<h1 id="overlay-title">Quellen des Epilogs</h1>'+epilogueSources.map(s=>'<section><h2>'+esc(s.title)+'</h2><p>'+esc(s.creator+' · '+s.year+' · '+s.place)+'</p><p>'+esc(s.institution+' · '+s.signature)+'</p><p>'+esc(s.type+' · '+s.status+' · '+s.rights)+'</p><a href="'+s.url+'" target="_blank" rel="noopener">Institutioneller Nachweis ↗</a>'+ (s.id==='articles'?'<p><a href="'+s.reference+'" target="_blank" rel="noopener">Historischer Nachweis · Stadtarchiv Memmingen ↗</a></p>':'')+'</section>').join(''));
 if(action==='ep-image'){const s=epilogueSources.find(s=>s.id===target.dataset.source);if(s?.image)modal('<h1 id="overlay-title">'+esc(s.title)+'</h1><img data-ep-image class="ep-enlarged" src="'+s.image+'" alt="'+esc(s.title)+'"><p>'+esc(sourceLine(s))+'</p>');}
 return true;
}
document.addEventListener('error',event=>{const i=event.target;if(i.matches?.('[data-ep-image]')){failedImages.add(i.getAttribute('src'));if(epilogueActive()){if(i.closest('#overlay'))i.replaceWith(Object.assign(document.createElement('p'),{textContent:'Digitalisat derzeit nicht verfügbar. Der Nachweis bleibt in den Quellen des Epilogs erreichbar.'}));else hooks.render();}}},true);
document.addEventListener('visibilitychange',syncEpilogue);
export function leaveEpilogue(){clearTimeout(timer);timer=null;replay=null;}
