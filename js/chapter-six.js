import {state} from './state.js';
import {initializeChapterSix,phaseReady,substantial} from '../data/chapter-six-state.js';
import {previousNotes,chapterSixScenes,concepts,interpretations,finalPositions,risks,qualitative,evidence} from '../data/chapter-six.js';
import {openDocument} from './document-viewer.js';
import {openOverlay,closeOverlay,notify,esc,button} from './ui.js';
import {personalPageView,personalPages,chapterSixSourceActions} from './chapter-six-view.js';
let hooks,notebookPage=null;
export function configureChapterSix(value){hooks=value;}
export function prepareChapterSix(scene){const c=initializeChapterSix(state);c.stage=scene.id.slice(4);state.dialogue=null;state.interaction=null;if(c.stage==='ending'&&substantial(c.finalJudgmentText)&&substantial(c.finalFreedomDefinition))c.completed=true;}
const set=(path,value)=>{const parts=path.split('.');if(parts.length===2)state.chapter6[parts[0]][parts[1]]=value;else state.chapter6[path]=value;};
export const editableChapterSixFields=['lutherContinuityReasoning','lutherCounterArgument','counterArgument','finalJudgmentText','finalFreedomDefinition',...['godRelation','neighborRelation','unjustOrder','limitsOfAction'].map(x=>'freedomNow.'+x),...['theologicalConsistency','historicalContext','ethicalResponsibility'].map(x=>'dimensionReasoning.'+x)];
export function chapterSixInput(target){const field=target.dataset.ch6Field;if(!field||(!editableChapterSixFields.includes(field)&&!/^networkExplanations.[0-7]-[0-7]$/.test(field)))return false;set(field,target.value.slice(0,12000));hooks.persist();const next=document.querySelector('[data-action="ch6-next"]');if(next)next.disabled=!phaseReady(state.chapter6,state.chapter6.stage);return true;}
function showPersonal(){const pages=personalPages();notebookPage=Math.max(0,Math.min(notebookPage,pages.length-1));openOverlay(`<article class="ch6-final-reader"><h1 id="overlay-title">Meine persönliche Abschlussseite</h1><section class="ch6-stage">${personalPageView(state,notebookPage)}</section>${button('Zurück zum Notizbuch','ch6-reader-close','class="quiet"')}</article>`,()=>{notebookPage=null;},'notebook');}
export function chapterSixAction(action,t){if(!action.startsWith('ch6-')&&action!=='recap-ch6-start')return false;const c=state.chapter6;
 if(action==='recap-ch6-start'){hooks.enterScene('ch6_reflection_entry');return true;}
 if(action==='ch6-reader'){notebookPage=0;showPersonal();return true;}
 if(action==='ch6-reader-close'){closeOverlay();hooks.openNotebook('theology');return true;}
 if(action==='ch6-page'){if(notebookPage!==null){notebookPage=+t.dataset.page;showPersonal();return true;}c.personalPage=+t.dataset.page;}
 if(action==='ch6-personal'){notebookPage=0;showPersonal();return true;}
 if(action==='ch6-past'){const n=previousNotes(state),s=c.stage,lines=s.startsWith('freedom')?n.freedom:s.startsWith('comparison')?[n.comparison,n.theology]:s.startsWith('risk')?[n.risk,n.action]:s.startsWith('continuity')?n.continuity:s.startsWith('memory')?[n.tension,n.debate]:[n.network,n.tension];openOverlay('<article class="ch6-source-menu"><h1 id="overlay-title">Erinnerung aus deinem Spielweg</h1>'+lines.filter(Boolean).map(t=>'<p>'+esc(t)+'</p>').join('')+(!lines.some(Boolean)?'<p>Diese Gedanken fehlen in deinem älteren Spielstand.</p>':'')+button('Zurück zur Rückschau','close-overlay','class="quiet"')+'</article>');return true;}
 if(action==='ch6-source'){openDocument(t.dataset.item,null,()=>{},true,'Zurück zur Rückschau');return true;}
 if(action==='ch6-room'){const id=t.dataset.item;if(id==='entry-0')hooks.openNotebook('theology');else if(id==='reflection-0')hooks.openNotebook('path');else openOverlay(`<article class="ch6-source-menu"><h1 id="overlay-title">Quellen prüfen</h1><p>Die Quellen und ihre heutigen Zusammenfassungen bleiben getrennt gekennzeichnet.</p>${chapterSixSourceActions()}${button('Zurück zur Rückschau','close-overlay','class="quiet"')}</article>`);return true;}
 if(action==='ch6-select'){const path=t.dataset.field,allowed=path==='lutherContinuityJudgment'?interpretations:path==='finalPosition'?finalPositions:path.startsWith('lutherMuentzerJudgment.')?risks:path.startsWith('judgmentDimensions.')?qualitative:[];if(allowed.some(([id])=>id===t.dataset.value))set(path,t.dataset.value);}
 if(action==='ch6-concept'){const id=+t.dataset.item;if(!Number.isInteger(id)||id<0||id>=concepts.length)return true;if(c.selectedConcept===null)c.selectedConcept=id;else{if(c.selectedConcept!==id){const key=[c.selectedConcept,id].sort((a,b)=>a-b).join('-'),links=c.theologicalNetwork.links;if(links.includes(key)){links.splice(links.indexOf(key),1);c.theologicalNetwork.selectedExplanations=c.theologicalNetwork.selectedExplanations.filter(x=>x!==key);delete c.networkExplanations[key];}else links.push(key);}c.selectedConcept=null;}}
 if(action==='ch6-explanation-page')c.networkExplanationPage=c.networkExplanationPage?0:1;
 if(action==='ch6-explanation'){const ids=c.theologicalNetwork.selectedExplanations,key=t.dataset.item;if(ids.includes(key))ids.splice(ids.indexOf(key),1);else if(ids.length<2&&c.theologicalNetwork.links.includes(key))ids.push(key);else notify('Wähle zwei Beziehungen. Eine vorhandene Auswahl lässt sich lösen.');}
 if(action==='ch6-memory'){const key=t.dataset.field,id=t.dataset.item;if(['supports','challenges'].includes(key)&&['village','print','resistance','action'].includes(id)){const list=c.memoryEvidence[key];if(list.includes(id))list.splice(list.indexOf(id),1);else list.push(id);}}
 if(action==='ch6-evidence'){const id=t.dataset.item,list=c.selectedEvidence;if(evidence.some(e=>e[0]===id)){if(list.includes(id))list.splice(list.indexOf(id),1);else list.push(id);}}
 if(action==='ch6-edit-judgment'){hooks.enterScene('ch6_final_judgment');return true;}
 if(action==='ch6-next'||action==='ch6-back'){const i=chapterSixScenes.findIndex(x=>x.id===state.scene);if(action==='ch6-next'&&!phaseReady(c,c.stage))return true;const target=chapterSixScenes[i+(action==='ch6-next'?1:-1)];if(target)hooks.enterScene(target.id);return true;}
 hooks.render();hooks.persist();return true;
}
