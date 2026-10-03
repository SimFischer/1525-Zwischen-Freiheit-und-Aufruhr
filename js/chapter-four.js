import { caseComplete,regimentsComplete,regimentsSummary } from '../data/chapter-four-regiments.js';
import { state,addUnique } from './state.js';
import { chapterFourChoices,chapterFourDialogues,multiselectTasks,preparationPairs,regimentsCases,regimentsZones,communityConditions,hermeneuticalCriteria } from '../data/chapter-four.js';
import { chapterFourFields,initializeOpening,determineEndWorldState,chapterFiveHandoff } from '../data/chapter-four-state.js';
import { documentStagePages } from '../data/chapter-four-documents.js';
import { beginDialogue,advanceDialogue } from './dialogue-engine.js';
import { recordChoice } from './choice-engine.js';
import { syncConsequences } from './consequences.js';
import { openChapterFourDocument } from './chapter-four-documents.js';
import { openNotebook } from './notebook.js';
import { notify } from './ui.js';
import { grievances } from '../data/chapter-two.js';
let hooks;
export function configureChapterFour(value){hooks=value;}
const c=()=>state.chapter4;
const go=id=>hooks.enterScene('ch4_'+id);
const talk=(lines,next)=>beginDialogue(lines,'chapter-four',next);
const l=(speaker,text)=>({speaker,text});
export function openingDialogue(game){
 const tone=game.chapter4.openingWorldState;
 const lines={nuanced:[l('traveler','Im dritten Artikel steht etwas anderes, als ich gehört habe.'),l('anna','Und sie sagen ausdrücklich nicht, dass es gar keine Obrigkeit mehr geben soll.'),l('jakob','Wer den ganzen Text liest, erfährt manchmal etwas anderes als jemand, der ihn nur vom Hörensagen kennt.')],simplified:[l('traveler','Sie wollen doch alle Dienste abschaffen!'),l('peter','Auf meinem Blatt stand das anders.'),l('jakob','Ein kurzer Text reist schnell. Eine Verkürzung manchmal noch schneller.')],religious:[l('preacher','Wenn Christus uns frei macht, kann das doch nicht nur für den Sonntag gelten.'),l('anna','Und wer entscheidet, ob wir die Schrift richtig verstehen?')],confrontational:[l('envoy','Der Herr lässt ausrichten: Wer weiter zum Ungehorsam aufruft, wird zur Verantwortung gezogen.'),l('konrad','Dann haben sie wenigstens zugehört.')]}[tone];
 const demand=game.choiceTexts['ch3Demand_'+game.chapter3.entryFocus]||game.choices.playerDemand;
 const priorities=(game.choices.priorityGrievances||[]).map(id=>grievances.find(g=>g.id===id)?.title).filter(Boolean);
 return [...lines,...(game.choices.playerDemand?[l('peter','Aus unserem Alltag haben wir diese Forderung mitgebracht: '+game.choices.playerDemand)]:[]),...(priorities.length?[l('anna','Unsere Schwerpunkte waren: '+priorities.join(', ')+'. Die müssen auch auf dem nächsten Weg vorkommen.')]:[]),...(demand?[l('anna','In Memmingen hast du daraus diese Forderung gemacht: '+demand)]:[]),...(game.chapter3.mainReason?[l('jakob','Du hast deinen Weg so begründet: '+game.choiceTexts.ch3Reason)]:[])];
}
const choiceFor={authority:'ch4Authority',community:'ch4Community',resistance:'ch4Resistance',peasants:'ch4Peasants',early:'ch4Early',boundary:'ch4Boundary',theology:'ch4Theology',negotiation:'ch4Condition',band:'ch4Band',weingarten_choice:'ch4Weingarten',escalation:'ch4Escalation',comparison:'ch4Comparison',risk:'ch4Risk',judgment:'ch4HarshJudgment'};
export function prepareChapterFourState(game,scene){
 game.chapter=4;game.notebook.unlocked=true;const c=game.chapter4;c.stage=scene.id.slice(4);c.feedback=null;game.dialogue=null;game.interaction=null;syncConsequences(game);
 if(!c.openingRoute)initializeOpening(game);
 const stage=c.stage;
 const startTalk=(lines,next)=>{game.dialogue={lines:structuredClone(lines),index:0,after:'chapter-four',context:next};};
 if(stage==='opening')startTalk(openingDialogue(game),'ready');
 else if(stage==='route')startTalk(chapterFourDialogues['route'+c.openingRoute],'ready');
 else if(chapterFourDialogues[stage])startTalk(chapterFourDialogues[stage],'ready');
 if(stage==='authority'){
  c.authorityEncounter='negotiation';
  const recalls=[];
  if(game.consequences.flags.forestReported)recalls.push(l('overseer','Die Missachtung der Waldanordnung ist dem Herrenhof gemeldet. Ihr kommt also nicht nur mit einem neuen Blatt.'));
  if(game.consequences.flags.corveeRefused)recalls.push(l('overseer','Die Weigerung beim Frondienst ist nicht vergessen. Welche Regel soll künftig gelten?'));
  if(game.choices.forestResponse==='legal_basis')recalls.push(l('peter','Schon im Wald wolltest du wissen, worauf ihr Anspruch beruht. Jetzt können wir verlangen, dass er die Grundlage verbindlich nennt.'));
  if(recalls.length)startTalk(recalls,'ready');
 }
 if(stage==='ermahnung'&&game.choiceTexts.ch3Religion)game.dialogue.lines.push(l('jakob','Deine Deutung in Memmingen war: '+game.choiceTexts.ch3Religion+' Halte sie neben Luthers Antwort, statt sie jetzt einfach zu vergessen.'));
 if(stage==='opening_effect')startTalk(effectDialogue(game),'ready');
 if(stage==='branch_effect')startTalk(branchDialogue(game),'ready');
 if(stage==='world_end'){
  const testEnd=game.consequences.adminScenario?.chapter4?.endWorldState;
  c.endWorldState=['negotiation_open','mobilized_community','joining_peasant_band','religious_polarization','events_moved_without_you'].includes(testEnd)?testEnd:determineEndWorldState(game);c.completed=true;c.handoff=chapterFiveHandoff(game);
  startTalk([l('peter','Wir wollten wissen, was gerecht ist. Jetzt müssen wir sehen, was unser Weg für die Menschen bedeutet.'),l('konrad','Wer handelt, geht ein Risiko ein. Wer wartet, überlässt es anderen.'),l('jakob','Nicht alles, was wir gerecht nennen, ist deshalb gerecht.'),...endingDialogue(game)],'ready');
 }
 if(stage==='chapter5')c.handoff=chapterFiveHandoff(game);
}
export function prepareChapterFour(scene){prepareChapterFourState(state,scene);}
function effectDialogue(game){const c=game.chapter4;
 if(c.openingRoute==='D')return [l('jakob','Du hast diese Spannung festgehalten: '+(c.preparationPairs[0]||'Freiheit und äußere Ordnung.')),l('matthes','Während wir die Schriften prüfen, ziehen andere bereits gemeinsam los. Deine Prüfung eröffnet genauere Fragen; ihre Entscheidung kannst du nicht anhalten.')];
 if(c.openingRoute==='A')return [l('peter',c.authorityTone==='pressure'?'Die direkte Audienz ist verloren. Der Bote bringt eine Warnung. Wir können nur über eine Abordnung und eine ausdrückliche Grenze unserer Mittel weiterreden.':c.authorityTone==='gospel'?'Der Streit wird nun auch ein Streit um die Auslegung. Der Prediger hat von unserer Begründung erfahren.':'Eine Abordnung darf wiederkommen. Das ist ein Gesprächsweg, noch keine Einigung.'),l('konrad','Was sich am Ende an unseren Pflichten ändert, wird sich erst zeigen.')];
 if(c.openingRoute==='B')return [l('anna',{delegation:'Die Abordnung geht zum Herrenhof. Das Dorf wartet auf eine Antwort.',withhold_dues:'Der Abgabenwagen bleibt bei uns. Wir sind nun gemeinsam für den Vorrat und die Folgen verantwortlich.',other_villages:'Die Briefe gehen in andere Dörfer. Ihr Handeln kann unsere Lage verändern.',public_meeting:'Die Forderungen sind öffentlich. Auch die Herrschaft kann nun sehen, wer mit uns auftritt.'}[c.communityAction])];
 return [l('konrad',{refuse_dues:'Die Säcke bleiben hier; der Bote wird die Weigerung melden.',block_storehouse:'Wir stehen jetzt vor dem Speicher. Auch wer nur Versorgung sichern wollte, steht der Herrschaft im Weg.',demonstrate:'Die Gruppe bleibt sichtbar zusammen. Der Zugang zum Speicher ist frei.',return_to_negotiation:'Wir sind zum Herrenhof zurückgegangen. Die Gruppe wartet, statt den Speicher zu blockieren.'}[c.resistanceAction])];
}
function branchDialogue(game){const c=game.chapter4;
 const labels=(ids,items)=>ids.map(id=>items.find(x=>x[0]===id)?.[1]).filter(Boolean).join('; ');
 return {luther_order:[l('peter','Der Verwalter hat unsere Bedingung aufgenommen: '+game.choiceTexts.ch4Condition),l('konrad','Eine Teilzusage. Andere Forderungen bleiben offen.')],gospel_critique:[l('anna','Diese Bedingungen vertreten wir gemeinsam: '+labels(c.communityConditions,communityConditions)+'.'),l('matthes','Die Briefe tragen dieses Mandat weiter. Der öffentliche Treffpunkt bleibt bestehen.')],prophetic_resistance:[l('band1','Du hast dich festgelegt: '+game.choiceTexts.ch4Band),l('band2',c.bandAction==='resistance_limit'?'Dann bleibst du außerhalb der bewaffneten Gruppe.':'Unser nächster Weg führt uns näher an eine offene Auseinandersetzung.')],hermeneutical_caution:[l('jakob','Du verlangst von unserer Auslegung: '+labels(c.hermeneuticalCriteria,hermeneuticalCriteria)+'.'),l('matthes','Währenddessen sind einige bereits fort. Du hast mehr Maßstäbe für die Prüfung, aber weniger Einfluss auf ihre erste Handlung.')]}[c.theologicalPath];
}
export function endingDialogue(game){return {negotiation_open:[l('peter','Eine Abordnung bleibt im Gespräch. Du hast diesen Weg zuletzt offengehalten; eine endgültige Einigung gibt es noch nicht.')],mobilized_community:[l('anna','Die Gemeinde bleibt zusammen. Unsere Bedingungen stehen in den Briefen; die Entscheidung fällt nicht mehr nur am Herrenhof.')],joining_peasant_band:[l('konrad','Du bist bei der Gruppe. Deine Grenze bleibt: '+(game.choiceTexts.ch4Band||'gemeinsam für die Forderungen einzustehen')+'. Ob alle sie tragen, zeigt sich erst bei der nächsten Handlung.')],religious_polarization:[l('jakob','Die Gruppen berufen sich auf verschiedene Auslegungen. Deine Vorsicht beseitigt den Streit um Gottes Willen nicht.')],events_moved_without_you:[l('matthes','Andere sind losgezogen, während du geprüft hast. Für die nächste Entscheidung musst du mit ihren Folgen umgehen.')]}[game.chapter4.endWorldState];}
function nextAfterChoice(id){return {ch4Authority:'opening_effect',ch4Community:'opening_effect',ch4Resistance:'opening_effect',ch4Peasants:'peasants_complement',ch4Early:'regiments',ch4Boundary:'muentzer',ch4Theology:{luther_order:'negotiation',gospel_critique:'conditions',prophetic_resistance:'band',hermeneutical_caution:'hermeneutics'}[c().theologicalPath],ch4Condition:'branch_effect',ch4Band:'branch_effect',ch4Weingarten:'escalation',ch4Escalation:'escalation_effect',ch4Comparison:'structure',ch4Risk:'judgment',ch4HarshJudgment:'world_end'}[id];}
export function chapterFourAction(action,target){
 if(action==='ch4-start'){go('opening');return true;}
 if(state.chapter!==4)return false;
 const stage=c().stage;
 if(action==='dialogue-next'&&state.dialogue?.after==='chapter-four'){
  const result=advanceDialogue();if(result&&result.context!=='ready')go(result.context);return true;
 }
 if(action==='choose'&&chapterFourChoices[target.dataset.choice]){
  const id=target.dataset.choice,def=chapterFourChoices[id],option=recordChoice(id,target.dataset.option);if(!option)return true;
  if(def.reflective){
   if(id==='ch4Theology') {c().branchOutcome={luther_order:'negotiation_partial',gospel_critique:'community_conditions',prophetic_resistance:'resistance_pending',hermeneutical_caution:'interpretive_depth'}[option.id];if(option.id==='hermeneutical_caution')c().unattendedMobilization=true;}
   if(id==='ch4Band')c().branchOutcome=option.id;
   talk(option.reaction,nextAfterChoice(id));state.interaction=null;
  }else {
   const n=(c().attempts[id]||0)+1;c().attempts[id]=n;
   const correct=option.id===def.solution,assisted=!correct&&n>=3;
   c().feedback={text:correct?option.feedback:assisted?'Gemeinsam sichern wir den Kern: '+def.options.find(x=>x.id===def.solution).feedback:option.feedback,resolved:correct||assisted,next:nextAfterChoice(id)};
   if(correct||assisted){c().resolved[id]=true;state.minigames.resolved[id]=true;if(assisted)state.minigames.assisted[id]=true;}
  }return true;
 }
 if(!action.startsWith('ch4-'))return false;
 if(action==='ch4-go'){if(stage==='regiments'&&target.dataset.scene==='boundary'&&(!regimentsComplete(c())||!c().resolved.regiments))return true;go(target.dataset.scene);return true;}
 if(action==='ch4-route-go'){go({A:'authority',B:'community',C:'resistance',D:'preparation'}[c().openingRoute]);return true;}
 if(action==='ch4-choice'){const id=choiceFor[stage];if(id)state.interaction={kind:'choice',id};return true;}
 if(action==='ch4-read'){
  const spec=target.dataset.document?[target.dataset.document,null]:documentStagePages[stage];
  if(!spec)return true;
  const key=target.dataset.document||stage;
  openChapterFourDocument(spec[0],spec[1],()=>{hooks.render();hooks.persist();},false,()=>{c().docRead[key]=true;hooks.persist();});return true;
 }
 if(action==='ch4-memory'){c().memoryRead=true;openNotebook('freedom');return true;}
 if(action==='ch4-feedback'){const f=c().feedback;c().feedback=null;if(f.resolved&&f.next)go(f.next);return true;}
 if(action==='ch4-multi'){
  const id=target.dataset.item,key=stage==='regiments'?'regiments_synthesis':stage,list=c().selections[key]||=[];
  if(stage==='regiments'&&(c().regimentsIndex!==5||c().resolved.regiments||!['A','B','C','D'].includes(id)))return true;
  if(list.includes(id))list.splice(list.indexOf(id),1);else list.push(id);return true;
 }
 if(action==='ch4-check'){
  const task=multiselectTasks[stage],a=[...(c().selections[stage]||[])].sort(),valid=(task.alternatives||[task.solution]).some(s=>JSON.stringify([...s].sort())===JSON.stringify(a));
  const n=(c().attempts[stage]||0)+1;c().attempts[stage]=n;
  if(valid||n>=3){c().resolved[stage]=true;if(!valid)c().selections[stage]=[...(task.solution||task.alternatives[0])];if(stage==='lords')c().lutherLordsUnderstood=true;}
  c().feedback={text:valid?task.feedback:n>=3?'Wir halten gemeinsam fest: '+task.feedback:'Prüfe die Reichweite: Die Kritik an Unrecht rechtfertigt nicht jedes Mittel; Sorge um Ordnung rechtfertigt ebenso wenig jede Herrschaftsgewalt.',resolved:valid||n>=3,next:{lords:'peasants',peasants_complement:'memory',structure:c().theologicalPreparation||c().branchOutcome==='interpretive_depth'||state.chapter3.religiousInterpretation==='hermeneutical_caution'?'analysis':'risk'}[stage]};return true;
 }
 if(action==='ch4-thought'){
  const list=c().selections.preparation||=[],id=target.dataset.item;if(list.includes(id))list.splice(list.indexOf(id),1);else if(list.length<2)list.push(id);return true;
 }
 if(action==='ch4-pair'){
  const list=c().selections.preparation||[];if(list.length!==2)return true;const key=[...list].sort().join(':');
  c().preparationPairs.push(preparationPairs[key]||'Wie hängen diese beiden Gedanken zusammen, und wo darf der eine nicht einfach zum Auftrag für den anderen werden?');c().selections.preparation=[];c().theologicalPreparation=true;c().unattendedMobilization=true;return true;
 }
 if(action==='ch4-classify'){
  const cas=regimentsCases[c().regimentsIndex],classification=target.dataset.zone;
  if(stage!=='regiments'||!cas||!regimentsZones.some(([id])=>id===classification))return true;
  if(c().twoRegimentsCases[cas.id]?.classification!==classification)c().twoRegimentsCases[cas.id]={classification,reasoning:null};return true;
 }
 if(action==='ch4-case-reason'){
  const cas=regimentsCases[c().regimentsIndex],entry=cas&&c().twoRegimentsCases[cas.id];
  if(stage!=='regiments'||!entry?.classification||!cas.reasons.some(([id])=>id===target.dataset.reason))return true;
  entry.reasoning=target.dataset.reason;return true;
 }
 if(action==='ch4-case-next'){
  const cas=regimentsCases[c().regimentsIndex];
  if(stage==='regiments'&&cas&&caseComplete(cas,c().twoRegimentsCases[cas.id]))c().regimentsIndex++;return true;
 }
 if(action==='ch4-synthesis'){
  if(stage!=='regiments'||!regimentsComplete(c())||c().regimentsIndex!==5||c().resolved.regiments)return true;
  const selected=[...(c().selections.regiments_synthesis||[])].sort();
  const valid=JSON.stringify(selected)===JSON.stringify(['A','B','D']);
  const attempt=(c().attempts.regiments_synthesis||0)+1;c().attempts.regiments_synthesis=attempt;
  if(valid||attempt>=3){c().resolved.regiments=true;c().selections.regiments_synthesis=['A','B','D'];c().caseFeedback=regimentsSummary;}
  else c().caseFeedback='Die Unterscheidung hilft bei der Prüfung, entscheidet aber nicht jeden Konflikt automatisch. Prüfe auch, wo beide Bereiche berührt sind und ihre Grenzen überschritten werden können.';
  return true;
 }
 if(action==='ch4-criterion'){const i=Number(target.dataset.index);if(i>=0&&i<5)addUnique(c().comparisonCriteria,i);c().comparisonIndex=i;return true;}
 if(action==='ch4-conditions-next'){c().communityConditions=[...(c().selections.conditions||[])];if(c().communityConditions.length===2)go('branch_effect');return true;}
 if(action==='ch4-hermeneutics-next'){c().hermeneuticalCriteria=[...(c().selections.hermeneutics||[])];if(c().hermeneuticalCriteria.length>=2)go('branch_effect');return true;}
 if(action==='ch4-limit'){c().meansLimited=true;notify('Die Abordnung erklärt: keine Gewalt gegen Menschen. Ein unmittelbares Gespräch mit dem Herrn bleibt ausgeschlossen.');return true;}
 if(action==='ch4-analysis'){c().analysisRead=true;talk([l('jakob','Dieselbe Unterscheidung kann in einer neuen Lage zu ganz anderen Schlussfolgerungen führen. Darum prüfen wir drei Ebenen: die theologische Begründung, die Einschätzung der Lage und die Verhältnismäßigkeit der geforderten Mittel.')],'risk');return true;}
 return true;
}
export function chapterFourChoiceId(stage){return choiceFor[stage];}
