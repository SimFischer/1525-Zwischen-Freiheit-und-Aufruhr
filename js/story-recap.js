import {state} from './state.js';
import {openTheologicalQuestions} from '../data/story-recap.js';
import {chapterSixHandoff} from '../data/chapter-five-state.js';
import {storyRecapView} from './story-recap-view.js';
import {openOverlay,closeOverlay} from './ui.js';
let hooks,replay=null;
export function configureStoryRecap(value){hooks=value;}
export function syncStoryRecap(){} // App hook retained; the reader never schedules playback.
function draw(){if(replay)openOverlay(storyRecapView(state,replay,true),()=>{replay=null;},'story-recap');else{hooks.render();hooks.persist();}}
export function storyRecapAction(action,target){if(!action.startsWith('recap-'))return false;
 if(action==='recap-replay'){if(!state.chapter5.finalAction)return true;replay={phase:'slides',index:0,elapsed:0,paused:false};draw();return true;}
 const m=replay||state.chapter5.recap;if(!m)return true;
 if(action==='recap-close'){closeOverlay();return true;}
 if(action==='recap-begin'&&!replay&&m.phase==='ending'){Object.assign(m,{phase:'slides',index:0,elapsed:0,paused:false});}
 if(action==='recap-back'&&m.phase==='slides')m.index=Math.max(0,m.index-1);
 if(action==='recap-next'&&m.phase==='slides'&&m.index<4)m.index++;
 if(action==='recap-question'&&!replay&&m.phase==='slides'&&m.index===4)m.phase='question';
 if(action==='recap-restart')Object.assign(m,{phase:'slides',index:0,elapsed:0,paused:false});
 if(action==='recap-select'&&!replay&&m.phase==='question'&&openTheologicalQuestions.some(([id])=>id===target.dataset.item))state.chapter5.openTheologicalQuestion=target.dataset.item;
 if(action==='recap-finish'&&!replay&&m.phase==='question'&&state.chapter5.openTheologicalQuestion){state.chapter5.completed=true;state.chapter5.handoff=chapterSixHandoff(state);hooks.enterScene('ch5_chapter6');return true;}
 draw();document.querySelector(replay?'#overlay .self-recap h1':'.chapter-five-layout .self-recap h1')?.focus({preventScroll:true});return true;
}
