import { state } from './state.js';
import { buildStoryRecap,openTheologicalQuestions } from '../data/story-recap.js';
import { chapterSixHandoff } from '../data/chapter-five-state.js';
import { storyRecapView } from './story-recap-view.js';
import { openOverlay,closeOverlay } from './ui.js';
let hooks,timer,replay=null;
export function configureStoryRecap(value){hooks=value;}
const model=()=>replay||state.chapter5.recap;
function draw(){if(replay)openOverlay(storyRecapView(state,replay,true),()=>{replay=null;clearTimeout(timer);syncStoryRecap();},'story-recap');else {hooks.render();hooks.persist();}}
export function syncStoryRecap(){clearTimeout(timer);if(!replay&&!['ch5_freedom_after_action','ch5_end'].includes(state.scene))return;const m=model(),active=replay?document.querySelector('.story-recap-film'):document.querySelector('.chapter-five-layout .story-recap-film,.chapter-five-layout .story-closing');if(!m||!active||m.paused)return;
 timer=setTimeout(()=>{if(!document.querySelector('.story-recap-film,.story-closing'))return;if(document.hidden||(!replay&&document.querySelector('#overlay')?.open)){syncStoryRecap();return;}advanceStoryRecap(1);},1000);
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&document.querySelector('.story-recap-film,.story-closing')){draw();syncStoryRecap();}});
document.addEventListener('close',event=>{if(event.target.id==='overlay'&&!replay&&document.querySelector('.chapter-five-layout .story-recap-film')){draw();syncStoryRecap();}},true);
export function advanceStoryRecap(seconds){const m=model();if(!m||m.paused)return;
 const duration=m.phase==='closing'?12:buildStoryRecap(state).beats[m.index]?.duration;if(!duration)return;
 m.elapsed+=seconds;
 if(m.elapsed>=duration){m.elapsed=0;if(m.phase==='closing'){hooks.enterScene('ch5_chapter6');return;}m.index++;if(m.index>=buildStoryRecap(state).beats.length){m.index=0;m.phase='chronicle';}draw();}
 else if(m.phase==='closing'){draw();}else if(!replay)hooks.persist();
 syncStoryRecap();
}
export function storyRecapAction(action,target){if(!action.startsWith('recap-'))return false;
 if(action==='recap-replay'){if(!state.chapter5.finalAction)return true;replay={phase:'film',index:0,elapsed:0,paused:false};draw();syncStoryRecap();return true;}
 const m=model();if(!m)return true;
 if(action==='recap-close'){closeOverlay();return true;}
 if(action==='recap-pause'&&m.phase==='film')m.paused=!m.paused;
 if(action==='recap-skip'&&m.phase==='film'){m.phase='chronicle';m.paused=false;m.elapsed=0;}
 if(action==='recap-restart'){Object.assign(m,{phase:'film',index:0,elapsed:0,paused:false});}
 if(action==='recap-question'&&!replay&&m.phase==='chronicle')m.phase='question';
 if(action==='recap-select'&&!replay&&m.phase==='question'&&openTheologicalQuestions.some(([id])=>id===target.dataset.item))state.chapter5.openTheologicalQuestion=target.dataset.item;
 if(action==='recap-finish'&&!replay&&m.phase==='question'&&state.chapter5.openTheologicalQuestion){state.chapter5.recap.phase='closing';state.chapter5.recap.elapsed=0;state.chapter5.completed=true;state.chapter5.handoff=chapterSixHandoff(state);hooks.enterScene('ch5_end');return true;}
 if(action==='recap-transition'&&!replay&&state.scene==='ch5_end'){hooks.enterScene('ch5_chapter6');return true;}
 draw();syncStoryRecap();return true;
}
