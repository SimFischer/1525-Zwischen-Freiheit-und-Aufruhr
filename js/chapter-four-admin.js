import { freshChapterFour,initializeOpening,chapterFourFields,determineEndWorldState,chapterFiveHandoff } from '../data/chapter-four-state.js';
import { chapterFourScenes,chapterFourChoices,regimentsCases } from '../data/chapter-four.js';
import { documentStagePages } from '../data/chapter-four-documents.js';
import { syncConsequences } from './consequences.js';
// Ordered prerequisites are centralized here; ordinary story logic never uses fixtures.
export function prepareChapterFourAdmin(game,scene,complete=false){
 const c=game.chapter4,index=complete?chapterFourScenes.length:chapterFourScenes.findIndex(s=>s.id===scene.id),reached=s=>index>chapterFourScenes.findIndex(x=>x.id==='ch4_'+s);
 const choose=(id,value)=>{game.choices[id]=value;game.choiceTexts[id]=chapterFourChoices[id].options.find(o=>o.id===value).text;};
 if(reached('authority'))choose('ch4Authority','legal');
 if(reached('opening_effect'))c.authorityEncounter='negotiation';
 if(reached('lords')){c.lutherLordsUnderstood=true;c.resolved.lords=true;c.selections.lords=['B','C'];}
 if(reached('peasants')){choose('ch4Peasants','A');c.resolved.ch4Peasants=true;}
 if(reached('peasants_complement')){c.resolved.peasants_complement=true;c.selections.peasants_complement=['B','D'];}
 if(reached('memory'))c.memoryRead=true;
 if(reached('early'))choose('ch4Early','tension');
 if(reached('regiments')){for(const item of regimentsCases)c.twoRegimentsCases[item.id]={classification:item.preferred[0],reasoning:'sphere'};c.regimentsIndex=5;c.resolved.regiments=true;c.selections.regiments_synthesis=['A','B','D'];}
 if(reached('boundary')){choose('ch4Boundary','A');c.resolved.ch4Boundary=true;}
 if(reached('interpretations'))c.comparisonCriteria=[0,1,2,3,4];
 if(reached('theology')){choose('ch4Theology','luther_order');c.branchOutcome='negotiation_partial';}
 if(reached('negotiation'))choose('ch4Condition','services');
 if(reached('conditions'))c.communityConditions=['services','voice'];
 if(reached('hermeneutics'))c.hermeneuticalCriteria=['context','contradiction'];
 if(reached('weingarten_choice'))choose('ch4Weingarten','support_negotiation');
 if(reached('escalation'))choose('ch4Escalation','protect');
 if(reached('comparison')){choose('ch4Comparison','B');c.resolved.ch4Comparison=true;}
 if(reached('structure')){c.resolved.structure=true;c.selections.structure=['A','B','D','E'];}
 if(reached('risk'))choose('ch4Risk','both');
 if(reached('judgment'))choose('ch4HarshJudgment','excessive');
 const stage=scene.id.slice(4);
 const openingStrategy={community:'collective_pressure',resistance:'open_resistance_possible',preparation:'theological_clarification'}[stage];
 if(openingStrategy){game.choices.ch3Resistance=openingStrategy;}
 const path={conditions:'gospel_critique',band:'prophetic_resistance',hermeneutics:'hermeneutical_caution'}[stage];
 if(path){choose('ch4Theology',path);c.branchOutcome={gospel_critique:'community_conditions',prophetic_resistance:'resistance_pending',hermeneutical_caution:'interpretive_depth'}[path];}
 for(const [stage,[id,pages]] of Object.entries(documentStagePages))if(reached(stage)){
  c.docRead[stage]=true;game.notebook.documents.push(id);game.notebook.passages[id]=[...new Set([...(game.notebook.passages[id]||[]),...pages])];c.seenDocuments.push(...pages);
 }
 if(reached('regiments')){c.docRead.c4_authority=true;game.notebook.documents.push('c4_authority');game.notebook.passages.c4_authority=['worldly_authority_small'];}
 game.notebook.documents=[...new Set(game.notebook.documents)];c.seenDocuments=[...new Set(c.seenDocuments)];
 syncConsequences(game);initializeOpening(game);
 if(reached('world_end')||complete){c.completed=true;c.endWorldState=determineEndWorldState(game);c.handoff=chapterFiveHandoff(game);}
 game.progress.completedScenes.push(...chapterFourScenes.slice(0,index).map(s=>s.id));
}
export function resetChapterFour(game){game.chapter4=freshChapterFour();game.notebook.documents=game.notebook.documents.filter(id=>!id.startsWith('c4_'));for(const id of Object.keys(game.notebook.passages))if(id.startsWith('c4_'))delete game.notebook.passages[id];}
export function applyChapterFourTestFields(game,values){
 const defaults=freshChapterFour();if(!values||Array.isArray(values)||typeof values!=='object')throw Error('Kapitel 4 benötigt ein JSON-Objekt.');
 for(const [key,value] of Object.entries(values)){
  if(!Object.hasOwn(defaults,key))throw Error('Unbekanntes Kapitel-4-Feld: '+key);
  if(typeof defaults[key]==='boolean'&&typeof value!=='boolean')throw Error(key+' benötigt true oder false.');
  if(Array.isArray(defaults[key])&&(!Array.isArray(value)||value.length>50))throw Error(key+' benötigt eine Liste.');
  if(Object.hasOwn(chapterFourFields,key)){
   const id=chapterFourFields[key];if(value!==null&&!chapterFourChoices[id].options.some(o=>o.id===value))throw Error('Unbekannter Wert für '+key);
  }
  const enums={openingWorldState:['nuanced','simplified','religious','confrontational'],openingRoute:['A','B','C','D'],authorityEncounter:['negotiation'],endWorldState:['negotiation_open','mobilized_community','joining_peasant_band','religious_polarization','events_moved_without_you']};
  if(enums[key]&&value!==null&&!enums[key].includes(value))throw Error('Unbekannter Wert für '+key);
 }
 Object.assign(game.chapter4,structuredClone(values));
 for(const [field,id] of Object.entries(chapterFourFields))if(Object.hasOwn(values,field)){
  game.choices[id]=values[field];if(values[field])game.choiceTexts[id]=chapterFourChoices[id].options.find(o=>o.id===values[field]).text;else delete game.choiceTexts[id];
 }
 syncConsequences(game);
}
