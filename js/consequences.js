import { chapterFourFields } from '../data/chapter-four-state.js';
import { decisionRules, orientationKeys, perceptionCharacters, perceptionTags, recallLines } from '../data/consequences.js';
import { grievances } from '../data/chapter-two.js';
import { choices } from '../data/choices.js';
const blankOrientation=()=>Object.fromEntries(orientationKeys.map(key=>[key,0]));
export function syncConsequences(game) {
 const previous=game.consequences||{}, adjustments=blankOrientation();
 for(const key of orientationKeys) { const value=previous.orientationAdjustments?.[key]; if(Number.isFinite(value)&&Math.abs(value)<=100) adjustments[key]=value; }
 const orientation=blankOrientation(), priorOrientation=blankOrientation(), perceptions=Object.fromEntries(perceptionCharacters.map(id=>[id,[]]));
 for(const [id,rule] of Object.entries(decisionRules)) {
  const effect=rule.options?.[game.choices[id]]; if(!effect) continue;
  for(const [key,value] of Object.entries(effect.orientation)) { orientation[key]+=value; if(rule.chapter<3) priorOrientation[key]+=value; }
  for(const [person,tags] of Object.entries(effect.perceptions)) perceptions[person].push(...tags);
 }
 const overrides={};
 for(const person of perceptionCharacters) {
  overrides[person]=Array.isArray(previous.perceptionAdditions?.[person])?previous.perceptionAdditions[person].filter(tag=>perceptionTags.includes(tag)):[];
  perceptions[person]=[...new Set([...perceptions[person],...overrides[person]])];
 }
 for(const key of orientationKeys) orientation[key]=Math.max(0,orientation[key]+adjustments[key]);
 if(game.chapter3) {
  // Old chapter-3 snapshots included a reward for the closed Luther task.
  // Migrate once from canonical earlier decisions, retaining explicit test edits.
  if((previous.version||0)<2&&Object.keys(game.chapter3.priorProfile||{}).length) {
   for(const key of orientationKeys) priorOrientation[key]=Math.max(0,priorOrientation[key]+adjustments[key]);
   game.chapter3.priorProfile=priorOrientation;
  }
  for(const [field,id] of Object.entries({entryFocus:'ch3EntryFocus',religiousInterpretation:'ch3Religion',printStrategy:'ch3Print',resistanceStrategy:'ch3Resistance',mainReason:'ch3Reason'})) game.chapter3[field]=game.choices[id]??null;
  game.chapter3.demandChoice=game.choices['ch3Demand_'+game.chapter3.entryFocus]??null;
  game.chapter3.publicTone={full:'nuanced',summary:'simplified',religious:'religious',accusation:'confrontational'}[game.chapter3.printStrategy]??null;
 }
 if(game.chapter4)for(const [field,id] of Object.entries(chapterFourFields))game.chapter4[field]=game.choices[id]??null;
 game.orientation=orientation; game.perceptions=perceptions;
 game.consequences={adminScenario:previous.adminScenario||null,version:2,orientationAdjustments:adjustments,perceptionAdditions:overrides,flags:{forestReported:game.choices.forestResponse==='take',corveeRefused:game.choices.corveeResponse==='refuse',duesWithheld:game.choices.duesResponse==='withhold',additionalDuesRefused:game.choices.duesSecondSacrifice==='refuse'}};
 return game;
}
// Recomputing from canonical choices is idempotent: retries, reload and admin
// changes replace their contribution; they never accumulate duplicate points.
export function applyDecisionConsequences(decisionId,optionId,game) {
 const rule=decisionRules[decisionId]; if(!rule) return false;
 if(decisionId==='priorityGrievances'&&(!Array.isArray(optionId)||optionId.length>3||new Set(optionId).size!==optionId.length||optionId.some(id=>!grievances.some(item=>item.id===id)))) return false;
 if(decisionId==='playerDemand'&&(typeof optionId!=='string'||optionId.length>1000)) return false;
 if(rule.options&&!Object.hasOwn(rule.options,optionId)&&!choices[decisionId]?.options.some(option=>option.id===optionId)) return false;
 game.choices[decisionId]=structuredClone(optionId); syncConsequences(game); return true;
}
export function hasDecision(id,option,game) {return JSON.stringify(game.choices[id])===JSON.stringify(option);}
export function getOrientationProfile(game) {return {...syncConsequences(game).orientation};}
export function getCharacterPerceptions(person,game) {return [...(syncConsequences(game).perceptions[person]||[])];}
export function getSavedDecisions(game) {return Object.fromEntries(Object.keys(decisionRules).map(id=>[id,structuredClone(game.choices[id]??null)]));}
export function setAdminOrientation(key,value,game) {
 if(!orientationKeys.includes(key)||!Number.isFinite(value)||value<0||value>100) return false;
 syncConsequences(game); game.consequences.orientationAdjustments[key]+=value-game.orientation[key]; syncConsequences(game); return true;
}
function matches(condition,game) {
 if(!condition) return true;
 if(condition.all&&!condition.all.every(item=>matches(item,game))) return false;
 if(condition.any&&!condition.any.some(item=>matches(item,game))) return false;
 if(condition.not&&matches(condition.not,game)) return false;
 if(condition.orientation&&!Object.entries(condition.orientation).every(([key,min])=>orientationKeys.includes(key)&&game.orientation[key]>=min)) return false;
 if(condition.decision&&!hasDecision(condition.decision.id,condition.decision.option,game)) return false;
 if(condition.perception&&!game.perceptions[condition.perception.character]?.includes(condition.perception.tag)) return false;
 return true;
}
// Existing core options stay available. Future optional choices explicitly opt
// into requirements; alternative wording can use the same condition language.
export function getAvailableChoiceOptions(choiceId,game,definition=choices[choiceId]) {
 syncConsequences(game);
 return (definition?.options||[]).filter(option=>!option.optional||matches(option.requires,game)).map(option=>({...option,text:(option.contextTexts||[]).find(variant=>matches(variant.when,game))?.text||option.text}));
}
export function getContextualDialogue(dialogueId,game,base=[]) {
 syncConsequences(game); const extra=[];
 if(dialogueId==='ch2Morning') {
  const id=game.choices.initialFreedomInterpretation||game.choices.freedomSocialFirstThought||game.choices.freedomAndOuterLife;
  if(recallLines.morning[id]) extra.push(recallLines.morning[id]);
 }
 if(dialogueId==='corveeIntro') {
  const memories={peter_god_first:'Gestern hast du die Freiheit zuerst auf Gott bezogen. Heute wartet trotzdem die Arbeit des Herrenhofs auf uns.',peter_social_consequence:'Gestern hast du gefragt, ob Freiheit auch unser äußeres Leben verändern müsste. Wie wir heute unsere Arbeit schaffen, ist so eine Frage.',peter_uncertain:'Gestern warst du noch unsicher, was diese Freiheit für uns bedeutet. Heute sehen wir, woran es im Alltag hängt.'};
  if(memories[game.choices.freedomSocialFirstThought]) extra.push({speaker:'peter',text:memories[game.choices.freedomSocialFirstThought]});
 }
 if(dialogueId==='lutherRecall'&&game.choices.freedomAndOuterLife==='D') extra.push({speaker:'jakob',text:'In der Taverne hast du Freiheit vor Gott und äußere Ordnung unterschieden. Auch jetzt müssen wir prüfen, welche politischen Forderungen sich damit begründen lassen.'});
 if(dialogueId==='assemblyIntro') {
  const forest=recallLines.forest[game.choices.forestResponse]; if(forest) extra.push(forest);
  const corvee=[recallLines.corvee[game.choices.corveeResponse],recallLines.sacrifice[game.choices.corveeSacrifice]].filter(Boolean).join(' ');
  if(corvee) extra.push({speaker:'peter',text:corvee});
  const dues=[recallLines.dues[game.choices.duesResponse],recallLines.supply[game.choices.duesSecondSacrifice]].filter(Boolean).join(' ');
  if(dues) extra.push({speaker:'margarethe',text:dues});
 }
 if(dialogueId==='assemblyPressure') {
  if(game.choices.playerDemand) extra.push({speaker:'anna',text:'Auf unserem Blatt steht: '+game.choices.playerDemand+' Können auch andere Gemeinden dafür einstehen?' });
  if(game.choices.corveeResponse==='refuse') extra.push({speaker:'konrad',text:'Beim Frondienst hast du schon widersprochen. Du weißt also, dass wir auch Nein sagen können. Aber bleiben die anderen dann bei uns?'});
  else if(game.choices.corveeResponse==='delay'||game.choices.duesResponse==='delay') extra.push({speaker:'konrad',text:'Du hast schon um Aufschub gebeten. Was tun wir, wenn sie uns wieder warten lassen?'});
 }
 if(dialogueId==='corveeInterrupt'&&game.consequences.flags.forestReported) extra.push({speaker:'overseer',text:'Ihr habt meine Anordnung schon im Wald missachtet. Auch das wird der Herrenhof erfahren.'});
 if(dialogueId==='duesFirst'&&game.consequences.flags.corveeRefused) extra.push({speaker:'overseer',text:'Die Weigerung beim Frondienst ist dem Herrenhof gemeldet. Die Abgabenpflicht bleibt bestehen.'});
 return [...structuredClone(base),...structuredClone(extra)];
}
export function prepareConsequencesForEpilogue(game) {
 const orientation=getOrientationProfile(game), maximum=Math.max(...Object.values(orientation));
 return {chapter4:structuredClone(game.chapter4),chapter5Handoff:structuredClone(game.chapter4?.handoff),chapter3:structuredClone(game.chapter3),orientation,dominantOrientations:maximum>0?orientationKeys.filter(key=>orientation[key]===maximum):[],decisions:getSavedDecisions(game),perceptions:structuredClone(game.perceptions),flags:structuredClone(game.consequences.flags),grievances:structuredClone(game.grievances),priorityGrievances:structuredClone(game.choices.priorityGrievances),playerDemand:game.choices.playerDemand};
}
