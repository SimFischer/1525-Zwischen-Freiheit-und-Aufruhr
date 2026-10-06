import { chapterFiveScenes,chapterFiveChoices,chapterFiveFields,theologicalArguments,reportFacts } from '../data/chapter-five.js';
import { freshChapterFive,deriveChapter5OpeningPath,resolveChapterFiveOutcomes,sanitizeChapterFive } from '../data/chapter-five-state.js';
import { syncConsequences } from './consequences.js';
export function prepareChapterFiveAdmin(g,scene,complete=false){
 const c=g.chapter5,index=complete?chapterFiveScenes.length:chapterFiveScenes.findIndex(s=>s.id===scene.id),past=id=>index>chapterFiveScenes.findIndex(s=>s.id==='ch5_'+id);
 const set=(id,value)=>{const d=chapterFiveChoices[id];g.choices[id]=value;g.choiceTexts[id]=d.options.find(o=>o.id===value).text;c[d.field]=value;};
 c.openingPath||={peasant_camp:'peasant_band',dues_cart:'peasant_band',supply:'peasant_band',limit_violence:'peasant_band',negotiation_room:'negotiation',negotiation_effect:'negotiation',theological_council:'theological_council',theological_arguments:'theological_council',community_counsel:'theological_council',churchyard_conflict:'religious_conflict',polarization_analysis:'religious_conflict'}[scene.id.slice(4)]||deriveChapter5OpeningPath(g);
 if(past('peasant_camp')&&c.openingPath==='peasant_band')set('ch5First','stop_dues');
 if(scene.id==='ch5_supply'){set('ch5First','support_supply');c.duesAction=null;delete g.choices.ch5Dues;delete g.choiceTexts.ch5Dues;}
 if(scene.id==='ch5_limit_violence'){set('ch5First','limit_violence');c.limitsViolence=true;c.duesAction=null;delete g.choices.ch5Dues;delete g.choiceTexts.ch5Dues;}
 if(past('dues_cart')&&c.firstAction==='stop_dues')set('ch5Dues','block_only');
 if(past('negotiation_room')&&c.openingPath==='negotiation')set('ch5Condition','community_representation');
 if(past('theological_arguments')&&c.openingPath==='theological_council')for(const [id] of theologicalArguments)c.theologicalCounsel[id]={help:'help',limit:'limit'};
 if(past('community_counsel')&&c.openingPath==='theological_council')set('ch5Counsel','reject_sacralized_violence');
 if(past('polarization_analysis')&&c.openingPath==='religious_conflict')c.polarizationAnalysis={order:{danger:'violence',overlooked:'injustice'},justice:{danger:'oppression',overlooked:'certainty'}};
 if(past('three_reports'))for(const [id,,zone] of reportFacts){c.violenceReportsAssessment[zone].push(id);c.reportAnswers[id]=zone;}
 if(past('prisoner_scene'))set('ch5Prisoner','protect_detention');
 if(past('neighbor_love')){set('ch5Neighbor','B');c.resolved.ch5Neighbor=true;}
 if(past('religion_functions'))c.religionFunctions={strongest:['critique','limit'],dangerousWhenAbsolute:'legitimate'};
 if(past('luther_balance'))c.lutherTension={helpful:'service',tension:'revolt'};
 if(past('internal_debate'))c.internalDebate={strongestArgument:'peter',mostDangerousAbsolute:'konrad'};
 if(past('troops_approach')){c.finalAction={peasant_band:'protect_wounded',negotiation:'negotiate_village_protection',theological_council:'public_religious_warning',religious_conflict:'joint_protection'}[c.openingPath];g.choices.ch5Final=c.finalAction;syncConsequences(g);resolveChapterFiveOutcomes(g);}
 if(past('freedom_after_action'))set('ch5Freedom','complex');
 if(complete)c.completed=true;
 g.progress.completedScenes.push(...chapterFiveScenes.slice(0,index).map(s=>s.id));
}
export function resetChapterFive(g){g.chapter5=freshChapterFive();}
export function applyChapterFiveTestFields(g,values){
 if(!values||Array.isArray(values)||typeof values!=='object')throw Error('Kapitel 5 benötigt ein JSON-Objekt.');
 for(const key of Object.keys(values))if(!Object.hasOwn(freshChapterFive(),key))throw Error('Unbekanntes Kapitel-5-Feld: '+key);
 Object.assign(g.chapter5,structuredClone(values));
 for(const [field,id] of Object.entries(chapterFiveFields))if(Object.hasOwn(values,field)){g.choices[id]=values[field];const o=chapterFiveChoices[id].options.find(o=>o.id===values[field]);if(values[field]&&!o)throw Error('Unbekannter Wert für '+field);if(o)g.choiceTexts[id]=o.text;}
 if(Object.hasOwn(values,'finalAction'))g.choices.ch5Final=values.finalAction;
 if(['openingPath','firstAction','duesAction','negotiationCondition','communityCounsel','prisonerDecision','limitsViolence','finalAction'].some(key=>Object.hasOwn(values,key)))g.chapter5.outcomeProfile=null;
 syncConsequences(g);
 sanitizeChapterFive(g);
}
