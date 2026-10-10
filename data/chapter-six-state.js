import {sanitizeEpilogue} from './epilogue.js';
import { concepts,interpretations,finalPositions,risks,freedomFields,dimensions,evidence,qualitative,earlyFreedom,openTheologicalQuestions,chapterSixScenes } from './chapter-six.js';
export const freshChapterSix=()=>({openingQuestion:null,freedomThen:null,freedomNow:Object.fromEntries(freedomFields.map(([id])=>[id,null])),theologicalNetwork:{links:[],selectedExplanations:[]},lutherContinuityJudgment:null,lutherContinuityReasoning:null,lutherCounterArgument:null,memoryEvidence:{supports:[],challenges:[]},lutherMuentzerJudgment:{lutherRisk:null,muentzerRisk:null,moreWeightyRisk:null},judgmentDimensions:Object.fromEntries(dimensions.map(([id])=>[id,null])),dimensionReasoning:Object.fromEntries(dimensions.map(([id])=>[id,null])),finalPosition:null,selectedEvidence:[],counterArgument:null,finalJudgmentText:null,finalFreedomDefinition:null,completed:false,stage:'reflection_entry',selectedConcept:null,networkExplanations:{},personalPage:0,networkExplanationPage:0,epilogue:null,epilogueSeen:false});
export function initializeChapterSix(g){g.chapter6||=freshChapterSix();g.chapter6.openingQuestion ||= g.chapter5?.openTheologicalQuestion||g.chapter5?.handoff?.openTheologicalQuestion||null;g.chapter6.freedomThen ||= earlyFreedom(g);g.notebook.unlocked=true;return g.chapter6;}
const validText=x=>typeof x==='string'?x.slice(0,12000):null;
export function sanitizeChapterSix(g){const raw=g.chapter6||{},c=freshChapterSix(),pick=(v,list)=>list.includes(v)?v:null,list=(v,allowed)=>Array.isArray(v)?[...new Set(v.filter(x=>allowed.includes(x)))]:[];
 c.openingQuestion=pick(raw.openingQuestion,openTheologicalQuestions.map(([id])=>id));c.freedomThen=validText(raw.freedomThen);
 for(const id of ['lutherContinuityReasoning','lutherCounterArgument','counterArgument','finalJudgmentText','finalFreedomDefinition'])c[id]=validText(raw[id]);
 for(const [id]of freedomFields)c.freedomNow[id]=validText(raw.freedomNow?.[id]);
 c.lutherContinuityJudgment=pick(raw.lutherContinuityJudgment,interpretations.map(([id])=>id));c.finalPosition=pick(raw.finalPosition,finalPositions.map(([id])=>id));c.selectedEvidence=list(raw.selectedEvidence,evidence.map(([id])=>id));
 for(const id of Object.keys(c.lutherMuentzerJudgment))c.lutherMuentzerJudgment[id]=pick(raw.lutherMuentzerJudgment?.[id],risks.map(([id])=>id));
 for(const [id]of dimensions){c.judgmentDimensions[id]=pick(raw.judgmentDimensions?.[id],qualitative.map(([id])=>id));c.dimensionReasoning[id]=validText(raw.dimensionReasoning?.[id]);}
 c.memoryEvidence={supports:list(raw.memoryEvidence?.supports,['village','print','resistance','action']),challenges:list(raw.memoryEvidence?.challenges,['village','print','resistance','action'])};c.memoryEvidence.challenges=c.memoryEvidence.challenges.filter(x=>!c.memoryEvidence.supports.includes(x));
 c.theologicalNetwork.links=Array.isArray(raw.theologicalNetwork?.links)?[...new Set(raw.theologicalNetwork.links.filter(x=>typeof x==='string'&&/^\d-\d$/.test(x)&&+x[0]<+x[2]&&+x[2]<concepts.length))].slice(0,28):[];
 c.theologicalNetwork.selectedExplanations=list(raw.theologicalNetwork?.selectedExplanations,c.theologicalNetwork.links).slice(0,2);
 for(const id of c.theologicalNetwork.links)c.networkExplanations[id]=validText(raw.networkExplanations?.[id]);
 c.selectedConcept=Number.isInteger(raw.selectedConcept)&&raw.selectedConcept>=0&&raw.selectedConcept<concepts.length?raw.selectedConcept:null;
 c.stage=chapterSixScenes.some(s=>s.id==='ch6_'+raw.stage)?raw.stage:'reflection_entry';c.personalPage=Number.isInteger(raw.personalPage)?Math.max(0,raw.personalPage):0;
 c.networkExplanationPage=raw.networkExplanationPage===1?1:0;
 c.completed=raw.completed===true&&Boolean(c.finalJudgmentText?.trim()&&c.finalFreedomDefinition?.trim())&&(raw.stage==='ending'||g.progress?.completedScenes?.includes('ch6_ending')); c.epilogue=c.completed&&raw.epilogue?sanitizeEpilogue(raw.epilogue):null;c.epilogueSeen=c.completed&&raw.epilogueSeen===true; g.chapter6=c;return c;
}
export const substantial=t=>typeof t==='string'&&t.trim().length>=12;
export function phaseReady(c,stage){
 if(stage.startsWith('freedom_'))return substantial(c.freedomNow[stage.slice(8)]);
 if(stage==='theological_network')return c.theologicalNetwork.links.length>=2;
 if(stage==='network_reasoning')return c.theologicalNetwork.selectedExplanations.length===2&&c.theologicalNetwork.selectedExplanations.every(id=>substantial(c.networkExplanations[id]));
 if(stage==='interpretation')return Boolean(c.lutherContinuityJudgment);
 if(stage==='continuity_reasoning')return substantial(c.lutherContinuityReasoning);
 if(stage==='continuity_counterargument')return substantial(c.lutherCounterArgument);
 if(stage==='memory_support')return c.memoryEvidence.supports.length>0;
 if(stage==='memory_challenge')return c.memoryEvidence.challenges.length>0;
 if(stage.startsWith('risk_'))return Boolean(c.lutherMuentzerJudgment[{risk_luther:'lutherRisk',risk_muentzer:'muentzerRisk',risk_weight:'moreWeightyRisk'}[stage]]);
 if(stage.startsWith('dimension_'))return Boolean(c.judgmentDimensions[stage.slice(10)])&&substantial(c.dimensionReasoning[stage.slice(10)]);
 if(stage==='final_position')return Boolean(c.finalPosition);
 if(stage==='evidence')return c.selectedEvidence.length>=3;
 if(stage==='counterargument')return substantial(c.counterArgument);
 if(stage==='final_judgment')return substantial(c.finalJudgmentText)&&c.finalJudgmentText.trim().length>=80;
 if(stage==='final_question')return substantial(c.finalFreedomDefinition);
 if(stage==='judgment_review')return c.selectedEvidence.length>=3&&substantial(c.counterArgument)&&dimensions.every(([id])=>substantial(c.dimensionReasoning[id]));
 return true;
}
export function prepareChapterSixAdmin(g,scene,complete=false){const c=initializeChapterSix(g),index=chapterSixScenes.findIndex(s=>s.id===scene.id);const sample='Ich unterscheide die theologische Begründung von den Folgen für andere Menschen.';
 const reached=id=>complete||index>chapterSixScenes.findIndex(s=>s.id==='ch6_'+id);
 for(const [id]of freedomFields)if(reached('freedom_'+id))c.freedomNow[id]=sample;
 if(reached('theological_network'))c.theologicalNetwork.links=['0-1','0-2'];if(reached('network_reasoning')){c.theologicalNetwork.selectedExplanations=['0-1','0-2'];c.networkExplanations={'0-1':'Rechtfertigung bedeutet Annahme aus Gnade, nicht durch eigene Leistung.','0-2':'Freiheit ermöglicht den Dienst am Nächsten, auch gegenüber Gegnern.'};}
 if(reached('interpretation'))c.lutherContinuityJudgment='tension';if(reached('continuity_reasoning'))c.lutherContinuityReasoning=sample;if(reached('continuity_counterargument'))c.lutherCounterArgument=sample;
 if(reached('memory_support'))c.memoryEvidence.supports=['village'];if(reached('memory_challenge'))c.memoryEvidence.challenges=['action'];
 for(const [stage,key]of [['risk_luther','lutherRisk'],['risk_muentzer','muentzerRisk'],['risk_weight','moreWeightyRisk']])if(reached(stage))c.lutherMuentzerJudgment[key]='both';
 for(const [id]of dimensions)if(reached('dimension_'+id)){c.judgmentDimensions[id]='partly';c.dimensionReasoning[id]=sample;}
 if(reached('final_position'))c.finalPosition='tension';if(reached('evidence'))c.selectedEvidence=['freedom','authority','harsh'];if(reached('counterargument'))c.counterArgument=sample;if(reached('final_judgment'))c.finalJudgmentText=sample+' Die Eskalation von 1525 erklärt die Härte, rechtfertigt sie aber nicht schon.';if(reached('final_question'))c.finalFreedomDefinition=sample;
 c.stage=scene.id.slice(4);c.completed=Boolean(complete&&c.finalJudgmentText&&c.finalFreedomDefinition);return c;
}
