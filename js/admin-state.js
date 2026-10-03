import { decisionRules } from '../data/consequences.js';
import { syncConsequences, getContextualDialogue, setAdminOrientation } from './consequences.js';
import { freshState } from './state.js';
import { scenes, sceneById, canonicalScene } from '../data/scenes.js';
import { chapters } from '../data/chapters.js';
import { choices } from '../data/choices.js';
import { dialogues } from '../data/dialogues.js';
import { puzzles, sortingGames } from '../data/minigames.js';
import { chapterThreeChoices, chapterThreeDialogues, chapterThreeScenes } from '../data/chapter-three.js';
import { prepareChapterThreeState } from './chapter-three.js';
import { chapterTwoChoices, demandParts } from '../data/chapter-two.js';
import { adminChapterTargets } from '../data/admin-targets.js';

const chapterOf=scene=>scene.chapter||1;
const clone=value=>structuredClone(value);
const sequence=['forestEncounter','forestArgument','forestReply','forestConflict','forestOrder','forestResponse','forestReflect','corveeInterrupt','corveeSacrifice','corveeAnswer','corveeResponse','corveeDefinition','corveeReflect','duesFirst','duesResponse','duesExtra','duesReflect','assemblyIntro','assemblyConnection','links','priorities','forestDemand','corveeDemand','duesDemand','lutherRecall','lutherPoliticalInference','compose','assemblyPressure','memmingenNews','end'];
function dialogue(id,after,context=null) { return {lines:clone(dialogues[id]),index:0,after,context}; }
function resolve(next,id) {
  const solution=choices[id]?.solution;
  next.minigames.resolved[id]=true;
  if(solution) { next.choices[id]=solution; next.choiceTexts[id]=choices[id].options.find(option=>option.id===solution).text; }
}
function sources(next,passages) { next.notebook.documents=['freedom']; next.notebook.passages.freedom=passages; }
function chapterOne(next,scene,target={},complete=false) {
  const list=scenes.filter(item=>chapterOf(item)===1), index=complete?list.length:list.findIndex(item=>item.id===scene.id);
  next.progress.completedScenes.push(...list.slice(0,index).map(item=>item.id));
  next.progress.flyerUnlocked=index>=1;
  if(index>=2) sources(next,index>=4?[0,1]:[0]);
  if(index>=3) { next.choices.initialFreedomInterpretation='freedom_different_kind'; next.choiceTexts.initialFreedomInterpretation=choices.initialFreedomInterpretation.options.find(option=>option.id==='freedom_different_kind').text; }
  if(index>=5) {
    next.progress.conversations=['peter','anna','jakob'];
    for(const person of next.progress.conversations) next.progress[person+'Conversation']=true;
    next.minigames.puzzle=[...puzzles.justification.solution]; next.minigames.completed.push('justification'); resolve(next,'justification');
    for(const id of ['freedomSocialFirstThought','freedomAndOuterLife']) { const option=choices[id].options[0]; next.choices[id]=option.id; next.choiceTexts[id]=option.text; }
  }
  if(index>=6) { next.progress.freedomSortingComplete=true; next.minigames.sorting=Object.fromEntries(sortingGames.freedomSorting.cards.map(card=>[card.id,card.preferred])); next.minigames.completed.push('freedomSorting'); resolve(next,'freedomSorting'); }
  for(const previous of list.slice(0,index)) if(previous.choice&&choices[previous.choice].solution) resolve(next,previous.choice);
  if(index>=11) { next.notebook.unlocked=true; next.notebook.entries=['freedom']; sources(next,[0,1]); }
}
function completeStations(next) {
  Object.assign(next.chapter2,{forestComplete:true,corveeComplete:true,duesComplete:true,assemblyUnlocked:true});
  Object.assign(next.forestEvidence,{oldUse:true,customaryRules:true,newClaim:true});
  next.grievances={forest:['rights','voice'],corvee:['planning','time'],dues:['uncertainty','supply']};
  for(const id of ['forestArgument','forestConflict','corveeDefinition']) resolve(next,id);
  for(const [id,value] of Object.entries({forestResponse:'community',corveeSacrifice:'fence',corveeResponse:'delay',duesResponse:'question_basis'})) {
    next.choices[id]=value; next.choiceTexts[id]=choices[id].options.find(option=>option.id===value).text;
  }
  next.choices.peterDayPlan=['grain','fence','feed'];
  next.choices.initialFarmPlan={food:5,seed:3,reserve:2};
  next.choices.duesFirstSacrifice=['food','seed','reserve']; next.choices.duesSecondSacrifice='food';
  next.chapter2.grain=Object.fromEntries(Array.from({length:10},(_,i)=>['sack-'+i,i<5?'food':i<8?'seed':'reserve']));
  next.chapter2.removed=[{id:'sack-0',from:'food'},{id:'sack-5',from:'seed'},{id:'sack-8',from:'reserve'}];
  for(const id of ['sack-0','sack-1','sack-5','sack-8']) next.chapter2.grain[id]='dues';
}
function chapterTwo(next,scene,target,complete=false) {
  next.notebook.unlocked=true; sources(next,[0,1]);
  const checkpoint=target.checkpoint, at=sequence.indexOf(checkpoint), reached=id=>at>=sequence.indexOf(id)&&at>=0;
  if(scene.kind==='forest' && checkpoint) {
    Object.assign(next.forestEvidence,{oldUse:true,customaryRules:true,newClaim:true});
    if(reached('forestReflect')) { resolve(next,'forestArgument'); resolve(next,'forestConflict'); next.choices.forestResponse='community'; next.choiceTexts.forestResponse=choices.forestResponse.options[3].text; }
  }
  if(scene.kind==='corvee' && checkpoint) {
    next.choices.peterDayPlan=['grain','fence','feed'];
    if(reached('corveeResponse')) { next.choices.corveeSacrifice='fence'; next.choiceTexts.corveeSacrifice=choices.corveeSacrifice.options[1].text; }
    if(reached('corveeDefinition')) { next.choices.corveeResponse='delay'; next.choiceTexts.corveeResponse=choices.corveeResponse.options[2].text; }
    if(reached('corveeReflect')) resolve(next,'corveeDefinition');
  }
  if(scene.kind==='dues' && checkpoint) {
    next.choices.initialFarmPlan={food:5,seed:3,reserve:2};
    next.chapter2.grain=Object.fromEntries(Array.from({length:10},(_,i)=>['sack-'+i,i<5?'food':i<8?'seed':'reserve']));
    if(reached('duesExtra')) {
      next.chapter2.removed=[{id:'sack-0',from:'food'},{id:'sack-5',from:'seed'},{id:'sack-8',from:'reserve'}];
      for(const item of next.chapter2.removed) next.chapter2.grain[item.id]='dues';
      next.choices.duesFirstSacrifice=['food','seed','reserve']; next.choices.duesResponse='pay'; next.choiceTexts.duesResponse=choices.duesResponse.options[0].text;
    }
    if(reached('duesReflect')) { next.chapter2.grain['sack-1']='dues'; next.choices.duesSecondSacrifice='food'; }
  }
  if(scene.kind==='assembly'||scene.kind==='chapter-ending'||complete) {
    completeStations(next);
    next.progress.completedScenes.push('ch2_intro','ch2_forest','ch2_corvee','ch2_dues');
    for(const id of sequence.slice(sequence.indexOf('assemblyConnection'),at)) if(chapterTwoChoices[id]?.solution) resolve(next,id);
    if(reached('forestDemand')) {
      next.chapter2.links=[{key:'dues:forest',a:'forest',b:'dues',reason:'economic'},{key:'corvee:dues',a:'corvee',b:'dues',reason:'voice'},{key:'bondage:movement',a:'bondage',b:'movement',reason:'dependence'}];
      next.choices.priorityGrievances=['forest','corvee','dues'];
    }
    if(reached('assemblyPressure')) { next.chapter2.demand={subject:0,rule:0,voice:0}; next.choices.playerDemand='Wir fordern, dass '+Object.entries(demandParts).map(([key,options])=>options[next.chapter2.demand[key]]).join(' ')+'.'; }
    if(scene.kind==='chapter-ending'||complete) { next.chapter2.assemblyComplete=true; next.progress.completedScenes.push('ch2_assembly','ch2_end'); }
  }
}

// One registry controls prerequisites, chapter completion and owned state fields.
function chapterThree(next,scene,target={},complete=false) {
 const index=complete?chapterThreeScenes.length:chapterThreeScenes.findIndex(s=>s.id===scene.id), reached=id=>index>chapterThreeScenes.findIndex(s=>s.id==='ch3_'+id);
 next.notebook.unlocked=true;syncConsequences(next);next.chapter3.priorProfile={...next.orientation};
 const fixture=(id,value)=>{next.choices[id]=value;next.choiceTexts[id]=chapterThreeChoices[id].options.find(o=>o.id===value).text;};
 if(reached('entry'))fixture('ch3EntryFocus','labor');
 if(reached('clusters'))next.chapter3.complaintClusters=[{cards:['0','6'],reason:'dependence'},{cards:['1','4','5'],reason:'rights'}];
 if(reached('demand'))fixture('ch3Demand_labor','A');
 if(reached('articles')){next.chapter3.seenArticles=[6,3,12];next.notebook.documents.push('articles');next.notebook.passages.articles=[6,3,12];}
 if(reached('compare'))next.chapter3.articleComparison={common:'Belastung begrenzen',differences:'Die Artikel begründen die Forderung ausdrücklich mit dem Evangelium.'};
 if(reached('workshop'))next.chapter3.interpretations=['A','C'];
 if(reached('religion'))fixture('ch3Religion','distinction');
 if(reached('print'))fixture('ch3Print','full');
 if(reached('press')){next.chapter3.printPhase='done';next.chapter3.printed=4;next.minigames.completed.push('ch3Print');}
 if(reached('resistance'))fixture('ch3Resistance','negotiate');
 if(reached('reason'))fixture('ch3Reason','burdens');
 if(reached('news')||complete)next.chapter3.completed=true;
 next.progress.completedScenes.push(...chapterThreeScenes.slice(0,index).map(s=>s.id));syncConsequences(next);
}
export const adminChapterRegistry = {
  3:{prepare:chapterThree,complete:next=>chapterThree(next,sceneById.ch3_end,{},true),reset:next=>{next.chapter3=freshState().chapter3;next.notebook.documents=next.notebook.documents.filter(id=>id!=='articles');delete next.notebook.passages.articles;},ownedChoices:()=>Object.keys(chapterThreeChoices),games:['ch3Print']},
  1:{prepare:chapterOne,complete:next=>chapterOne(next,sceneById.ch1_end,{},true),reset:next=>{
    for(const key of ['flyerUnlocked','peterConversation','annaConversation','jakobConversation','freedomSortingComplete']) next.progress[key]=false;
    next.progress.conversations=[]; next.minigames.sorting={}; next.minigames.puzzle=[];
    next.notebook.entries=next.notebook.entries.filter(id=>id!=='freedom'); next.notebook.documents=next.notebook.documents.filter(id=>id!=='freedom'); delete next.notebook.passages.freedom; next.notebook.unlocked=false;
  },ownedChoices:()=>Object.keys(choices).filter(id=>!chapterTwoChoices[id]&&!chapterThreeChoices[id]),games:['justification','freedomSorting']},
  2:{prepare:chapterTwo,complete:next=>chapterTwo(next,sceneById.ch2_end,{checkpoint:'end'},true),reset:next=>{
    const fresh=freshState(); for(const key of ['chapter2','forestEvidence','grievances']) next[key]=fresh[key];
  },ownedChoices:()=>[...Object.keys(chapterTwoChoices),'peterDayPlan','initialFarmPlan','duesFirstSacrifice','duesSecondSacrifice','priorityGrievances','playerDemand'],games:[]}
};
export function adminTargets() {
  return chapters.map(chapter=>({chapter,targets:[...(adminChapterTargets[chapter.id]||[]),...scenes.filter(scene=>chapterOf(scene)===chapter.id&&!(adminChapterTargets[chapter.id]||[]).some(target=>target.scene===scene.id)).map(scene=>({id:scene.id,scene:scene.id,label:scene.title}))]}));
}
export function prepareAdminStateForScene(sceneId,scenario=null) {
  const id=canonicalScene(sceneId), target=adminTargets().flatMap(group=>group.targets).find(item=>item.id===id);
  if(!target||!sceneById[target.scene]) throw new Error('Unbekanntes Test-Sprungziel.');
  const scene=sceneById[target.scene], chapter=chapterOf(scene), next=freshState();
  for(const previous of chapters.filter(item=>item.id<chapter)) {
    if(!adminChapterRegistry[previous.id]) throw new Error('Für dieses Kapitel fehlen Test-Voraussetzungen.');
    adminChapterRegistry[previous.id].complete(next);
  }
  adminChapterRegistry[chapter]?.prepare(next,scene,target);
  next.chapter=chapter; next.scene=scene.id; next.phase=target.phase||'active'; next.dialogue=null; next.interaction=null;
  if(chapter===2) next.chapter2.stage=target.stage||target.choice||target.checkpoint||({forest:'clues',corvee:'plan',dues:'allocation'}[scene.kind]||scene.kind);
  if(target.conversation) {
    const conversation=scene.conversations[target.conversation];
    next.dialogue=dialogue(conversation.dialogue,conversation.puzzle?'conversation-puzzle':'conversation-choice',target.conversation);
  } else if(target.choice||scene.kind==='task') next.interaction={kind:'choice',id:target.choice||scene.choice};
  else if(target.dialogue) next.dialogue=dialogue(target.dialogue,'chapter-two',target.after);
  else if(scene.kind==='document'||target.phase==='document') next.phase='document';
  else if(!target.stage&&!target.phase) {
    if(scene.intro) next.dialogue=dialogue(scene.intro,'idle');
    if(scene.kind==='dialogue') next.dialogue=dialogue(scene.dialogue,scene.choice?'scene-choice':'next-scene');
    if(scene.beforeDocument) { next.phase='before-document'; next.dialogue=dialogue(scene.beforeDocument,'open-document'); }
    if(scene.beforeGame) { next.phase='before-game'; next.dialogue=dialogue(scene.beforeGame,'open-game'); }
  }
  if(scene.kind==='notebook') { next.notebook.unlocked=true; if(!next.notebook.entries.includes(scene.entry)) next.notebook.entries.push(scene.entry); }
  next.progress.completedScenes=[...new Set(next.progress.completedScenes)];
  if(scenario) {
    for(const [id,value] of Object.entries(scenario.decisions||{})) {
      if(choices[id]&&(value===null||choices[id].options.some(option=>option.id===value))) {next.choices[id]=value; if(value) next.choiceTexts[id]=choices[id].options.find(option=>option.id===value).text; else delete next.choiceTexts[id];}
      else if(!choices[id]&&decisionRules[id]?.options&&(value===null||Object.hasOwn(decisionRules[id].options,value))) next.choices[id]=value;
      else if(id==='playerDemand'&&(value===null||typeof value==='string'&&value.length<=1000)) next.choices[id]=value;
      else if(id==='priorityGrievances'&&Array.isArray(value)&&value.length<=3) next.choices[id]=[...value];
    }
    next.consequences.perceptionAdditions=structuredClone(scenario.perceptions||{});
    syncConsequences(next);
    for(const [key,value] of Object.entries(scenario.orientation||{})) setAdminOrientation(key,value,next);
    next.consequences.adminScenario=structuredClone(scenario);
  }
  if(chapter===3) { next.dialogue=null;next.interaction=null;prepareChapterThreeState(next,scene); }
  if(target.dialogue&&next.dialogue) next.dialogue.lines=getContextualDialogue(target.dialogue,next,next.dialogue.lines);
  return syncConsequences(next);
}
export function resetAdminChapter(current,chapter) {
  const next=clone(current), fresh=freshState(), registry=adminChapterRegistry[chapter];
  if(!registry) throw new Error('Für dieses Kapitel fehlt die Test-Rücksetzung.');
  registry.reset(next);
  next.consequences={version:1,orientationAdjustments:{},perceptionAdditions:{},adminScenario:null};
  const owned=[...registry.ownedChoices(),...registry.games];
  for(const id of registry.ownedChoices()) { if(Object.hasOwn(fresh.choices,id)) next.choices[id]=clone(fresh.choices[id]); else delete next.choices[id]; delete next.choiceTexts[id]; }
  for(const key of ['attempts','resolved','assisted','history']) for(const id of owned) delete next.minigames[key][id];
  next.minigames.completed=next.minigames.completed.filter(id=>!owned.includes(id));
  for(const key of ['completedScenes','visitedHotspots']) next.progress[key]=next.progress[key].filter(id=>!id.startsWith('ch'+chapter+'_'));
  const entry=prepareAdminStateForScene(adminTargets().find(group=>group.chapter.id===chapter).targets[0].id);
  next.scene=entry.scene; next.chapter=chapter; next.phase=entry.phase; next.dialogue=entry.dialogue; next.interaction=entry.interaction;
  if(chapter===2) next.chapter2.stage=entry.chapter2.stage;
  if(chapter===3) next.chapter3.stage=entry.chapter3.stage;
  return syncConsequences(next);
}
