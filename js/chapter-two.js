import { getContextualDialogue } from './consequences.js';
import { state, addUnique } from './state.js';
import { beginDialogue, advanceDialogue } from './dialogue-engine.js';
import { recordChoice } from './choice-engine.js';
import { choiceFeedback } from './feedback.js';
import { chapterTwoChoices, dayReactions, stores, storeConsequences, grievances, linkReasons, linkPrompts, prioritySubjects, demandParts } from '../data/chapter-two.js';
import { notify } from './ui.js';
import { openDocument } from './document-viewer.js';
let hooks;
export function configureChapterTwo(value) { hooks=value; }
const c=()=>state.chapter2;
export const station=()=>state.scene.slice(4);
export const counts=()=>Object.fromEntries(Object.keys(stores).map(key=>[key,Object.values(c().grain).filter(value=>value===key).length]));
function stage(value) { c().stage=value; state.interaction=null; }
function talk(id,next) { beginDialogue(id,'chapter-two',next); }
function choice(id) { stage(id); state.interaction={kind:'choice',id}; }
const nextChoices={forestArgument:'forestReply',forestConflict:'forestOrder',forestResponse:'reflect',corveeSacrifice:'corveeAnswer',corveeResponse:'corveeDefinition',corveeDefinition:'reflect',duesResponse:'duesExtra',assemblyConnection:'links',forestDemand:'corveeDemand',corveeDemand:'duesDemand',duesDemand:'lutherRecall',lutherPoliticalInference:'compose'};
function proceed(value) {
  if(value==='hub') return hooks.enterScene('ch2_hub');
  if(chapterTwoChoices[value]) return choice(value);
  const dialogueNext={forestReply:'forestConflict',forestOrder:'forestResponse',corveeAnswer:'corveeResponse',duesExtra:'extra',lutherRecall:'source',assemblyPressure:'news',memmingenNews:'end'};
  if(dialogueNext[value]) return talk(value,dialogueNext[value]);
  if(value==='news') return talk('memmingenNews','end');
  if(value==='end') { c().assemblyComplete=true; hooks.enterScene('ch2_end'); return; }
  if(value==='compose' && !Object.hasOwn(c().demand,'subject')) c().demand.subject=prioritySubjects[state.choices.priorityGrievances?.[0]]??0;
  stage(value);
}
export function prepareChapterTwo(scene) {
  state.chapter=2; state.notebook.unlocked=true; addUnique(state.notebook.documents,'freedom'); state.notebook.passages.freedom=[0,1];
  c().assemblyUnlocked=['forest','corvee','dues'].every(key=>c()[key+'Complete']);
  stage(scene.kind==='forest' ? 'clues' : scene.kind==='corvee' ? 'plan' : scene.kind==='dues' ? 'allocation' : scene.kind);
  if(c()[scene.kind+'Complete']) { stage('complete'); return; }
  if(scene.kind==='corvee') talk('corveeIntro','plan');
  if(scene.kind==='dues') talk('duesIntro','allocation');
  if(scene.kind==='assembly') {
    if(!c().assemblyUnlocked) { hooks.enterScene('ch2_hub',false); return; }
    talk('assemblyIntro','assemblyConnection');
  }
}
export function chapterTwoAction(action,target) {
  if(action==='ch2-start') { hooks.enterScene('ch2_intro'); return true; }
  if(state.chapter!==2) return false;
  if(action==='dialogue-next') { const result=advanceDialogue(); if(result) proceed(result.context); return true; }
  if(action==='choose') {
    const id=target.dataset.choice, option=recordChoice(id,target.dataset.option);
    if(!option) return true;
    if(id==='forestArgument' && option.id==='A' && Object.values(state.forestEvidence).every(Boolean)) state.choiceTexts[id]='Die lange Nutzung und die älteren Zeichen sprechen für überlieferte, geregelte Nutzungsrechte der Gemeinde.';
    if(chapterTwoChoices[id].reflective) {
      if(id==='duesResponse' && option.id==='withhold') { const removed=c().removed.at(-1); if(removed) c().grain[removed.id]=removed.from; }
      talk(option.reaction,nextChoices[id]);
    } else state.interaction=choiceFeedback(id,option);
    return true;
  }
  if(action==='feedback-next') { const feedback=state.interaction; if(feedback.after==='retry-choice') choice(feedback.id); else proceed(nextChoices[feedback.id]); return true; }
  if(action==='ch2-travel') { hooks.enterScene(target.dataset.scene); return true; }
  if(action==='ch2-morning') { talk('ch2Morning','hub'); return true; }
  if(action==='ch2-hub') { hooks.enterScene('ch2_hub'); return true; }
  if(action==='ch2-clue') {
    state.forestEvidence[target.dataset.clue]=true;
    const clue=hooks.clues[target.dataset.clue];
    talk([{speaker:'anna',text:clue.speech}], 'clues'); return true;
  }
  if(action==='ch2-encounter') { talk('forestEncounter','forestArgument'); return true; }
  if(action==='ch2-plan') {
    const plan=state.choices.peterDayPlan ||= []; const id=target.dataset.task;
    if(plan.includes(id)) plan.splice(plan.indexOf(id),1); else plan.push(id); return true;
  }
  if(action==='ch2-plan-next') { talk([{speaker:'peter',text:dayReactions[state.choices.peterDayPlan[0]]},...getContextualDialogue('corveeInterrupt',state,hooks.dialogues.corveeInterrupt)],'corveeSacrifice'); return true; }
  if(action==='ch2-grain') { c().selected=target.dataset.card; return true; }
  if(action==='ch2-store') { if(c().selected) { c().grain[c().selected]=target.dataset.store; c().selected=null; } return true; }
  if(action==='ch2-allocation-next') { state.choices.initialFarmPlan=counts(); c().removed=[]; talk('duesFirst','sacrifice'); return true; }
  if(action==='ch2-sacrifice') {
    const from=target.dataset.store, id=Object.keys(c().grain).find(key=>c().grain[key]===from);
    if(!id) return true;
    c().grain[id]='dues'; c().removed.push({id,from});
    state.choices.duesFirstSacrifice=c().removed.map(item=>item.from);
    notify(storeConsequences[from]);
    if(c().removed.length===3) talk('duesQuestion','duesResponse'); return true;
  }
  if(action==='ch2-extra') {
    const from=target.dataset.store;
    if(from!=='refuse') { const id=Object.keys(c().grain).find(key=>c().grain[key]===from); if(!id) return true; c().grain[id]='dues'; }
    state.choices.duesSecondSacrifice=from;
    talk([{speaker:from==='refuse'?'overseer':'margarethe',text:from==='refuse'?'Auch diese Weigerung werde ich melden.':storeConsequences[from]},...hooks.dialogues.duesRealization],'reflect'); return true;
  }
  if(action==='ch2-reflect' || action==='ch2-priority') {
    const list=action==='ch2-reflect' ? state.grievances[station()] : (state.choices.priorityGrievances ||= []), id=target.dataset.item;
    if(list.includes(id)) list.splice(list.indexOf(id),1); else if(list.length<(action==='ch2-reflect'?2:3)) list.push(id); return true;
  }
  if(action==='ch2-finish') {
    c()[station()+'Complete']=true;
    c().assemblyUnlocked=['forest','corvee','dues'].every(key=>c()[key+'Complete']); hooks.enterScene('ch2_hub'); return true;
  }
  if(action==='ch2-link-card') { selectCard(target.dataset.card); return true; }
  if(action==='ch2-reason') {
    const [a,b]=c().pair.map(id=>grievances.find(item=>item.id===id)), reason=target.dataset.reason;
    if(!a || !b) return true;
    if(!a.tags.includes(reason) || !b.tags.includes(reason)) { c().linkAttempts=(c().linkAttempts||0)+1; c().linkHint=c().linkAttempts>=3 ? 'Beide betreffen '+Object.entries(linkReasons).filter(([id])=>a.tags.includes(id)&&b.tags.includes(id)).map(([,label])=>label).join(' oder ')+'. Wähle eine passende Begründung.' : c().linkAttempts===2 ? linkPrompts[reason] : 'Prüfe die beiden Beschwerden: Welche Entscheidung, Belastung oder Abhängigkeit kommt in beiden vor?'; return true; }
    const key=[a.id,b.id].sort().join(':'); if(!c().links.some(link=>link.key===key)) c().links.push({key,a:a.id,b:b.id,reason});
    c().pair=[]; c().linkHint='Diese Verbindung ist nachvollziehbar: '+linkReasons[reason]+'. Weitere Begründungen können ebenfalls passen.'; c().linkAttempts=0; return true;
  }
  if(action==='ch2-links-next') { stage('priorities'); return true; }
  if(action==='ch2-priorities-next') { talk('demandIntro','forestDemand'); return true; }
  if(action==='ch2-source') { openDocument('freedom',null,()=>{choice('lutherPoliticalInference'); hooks.render(); hooks.persist();},false,'Zurück zum Gespräch'); return true; }
  if(action==='ch2-compose') { state.choices.playerDemand=demandSentence(); talk('assemblyPressure','news'); return true; }
  return false;
}
export function demandSentence() { return 'Wir fordern, dass '+Object.entries(demandParts).map(([key,options])=>options[c().demand[key]||0]).join(' ')+'.'; }
export function selectCard(id) { const pair=c().pair; if(pair.includes(id)) pair.splice(pair.indexOf(id),1); else if(pair.length<2) pair.push(id); else c().pair=[id]; }
export function chapterTwoDrop(id,zone) {
  if(station()==='dues') { if(Object.hasOwn(stores,zone)) { c().grain[id]=zone; c().selected=null; } }
  else if(c().stage==='links' && id!==zone) c().pair=[id,zone];
}
