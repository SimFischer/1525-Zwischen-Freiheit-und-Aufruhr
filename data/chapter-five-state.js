import { chapterFiveFields,chapterFiveChoices,finalActions,availableFinalActions,reportFacts,religionFunctions,lutherThoughts,debateArguments,theologicalArguments } from './chapter-five.js';
export function freshChapterFive(){return {openingPath:null,stage:'',firstAction:null,duesAction:null,negotiationCondition:null,theologicalCounsel:{},communityCounsel:null,polarizationAnalysis:{},violenceReportsAssessment:{certain:[],uncertain:[]},prisonerDecision:null,neighborLoveInterpretation:null,religionFunctions:{strongest:[],dangerousWhenAbsolute:null},lutherTension:{helpful:null,tension:null},internalDebate:{strongestArgument:null,mostDangerousAbsolute:null},finalAction:null,outcomeProfile:null,konradOutcome:null,negotiationOutcome:null,civilianOutcome:null,endWorldState:null,freedomAfterAction:null,completed:false,step:0,phase:'',selections:[],attempts:{},resolved:{},feedback:null,supplyAction:null,limitsViolence:false,reportAnswers:{},handoff:null};}
const c5=g=>g.chapter5||freshChapterFive();
export function deriveChapter5OpeningPath(g){
 const c=g.chapter4||{},world=c.endWorldState||c.handoff?.endWorldState;
 // Explicit world outcomes take precedence over earlier interpretive tendencies.
 if(world==='joining_peasant_band')return 'peasant_band';
 if(world==='negotiation_open')return 'negotiation';
 if(world==='religious_polarization')return 'religious_conflict';
 if(world==='events_moved_without_you'||c.theologicalPath==='hermeneutical_caution'||c.branchOutcome==='interpretive_depth')return 'theological_council';
 if(c.weingartenResponse==='support_negotiation')return 'negotiation';
 if(c.theologicalPath==='prophetic_resistance'||['resistance_occupation','resistance_armed_defense'].includes(c.branchOutcome))return 'peasant_band';
 const o=g.orientation||{};
 if((o.resistance||0)>Math.max(o.prudence||0,o.community||0,o.theological||0))return 'peasant_band';
 if(g.chapter3?.publicTone==='religious'&&g.perceptions?.jakob?.includes('questions_religious_certainty'))return 'religious_conflict';
 return (o.legal||0)>(o.theological||0)?'negotiation':'theological_council';
}
export function deriveKonradOutcome(g){const c=c5(g),f=c.finalAction;
 if(['stay_with_band','join_band'].includes(f))return c.prisonerDecision==='bargaining_leverage'||c.duesAction==='detain_messenger'?'captured':'injured';
 if(f==='support_one_group')return 'missing';
 if(['protect_wounded','protect_people','joint_protection','evacuate_civilians','protected_retreat'].includes(f))return 'safe';
 if(f==='defensive_only')return c.limitsViolence||c.prisonerDecision==='hand_to_council'?'safe':'injured';
 if(['last_delegation','mediate','negotiate_village_protection'].includes(f)&&deriveNegotiationOutcome(g)==='collapsed')return c.duesAction==='return_goods'||c.prisonerDecision==='bargaining_leverage'?'captured':'missing';
 if(['public_religious_warning','revise_counsel'].includes(f)&&c.communityCounsel==='limits_of_obedience')return 'injured';
 if(['urge_retreat','separate_faith_and_strategy','reject_divine_certainty'].includes(f))return c.duesAction==='detain_messenger'?'missing':'safe';
 return c.firstAction==='support_supply'||c.communityCounsel==='protect_people'?'safe':'missing';
}
export function deriveNegotiationOutcome(g){const c=c5(g),old=g.chapter4||{},f=c.finalAction;
 if(['stay_with_band','join_band','support_one_group'].includes(f))return 'collapsed';
 const antagonism=(c.prisonerDecision==='bargaining_leverage'?2:0)+(c.duesAction==='detain_messenger'||c.duesAction==='return_goods'?1:0)+(g.choices?.corveeResponse==='refuse'?1:0)+(g.chapter3?.publicTone==='confrontational'?1:0);
 const mandate=c.negotiationCondition==='community_representation'||c.prisonerDecision==='hand_to_council';
 const inherited=old.weingartenResponse==='support_negotiation'||old.endWorldState==='negotiation_open';
 if(['last_delegation','negotiate_village_protection','mediate'].includes(f)){
  if(c.negotiationCondition==='no_persecution'||antagonism>=3)return 'collapsed';
  if(inherited&&(mandate||c.negotiationCondition==='suspend_burdens')&&antagonism<2)return 'partial_agreement';
  return 'open';
 }
 if(antagonism>=3||old.weingartenResponse==='reject_retreat')return 'collapsed';
 return 'open';
}
export function deriveCivilianOutcome(g){const c=c5(g),f=c.finalAction,o=c.outcomeProfile||g.orientation||{};
 if(['protect_wounded','protect_people','joint_protection','evacuate_civilians','protected_retreat'].includes(f))return 'many_protected';
 if(f==='negotiate_village_protection')return deriveNegotiationOutcome(g)==='collapsed'?'some_protected':'many_protected';
 if(['stay_with_band','join_band','support_one_group'].includes(f))return c.firstAction==='support_supply'||c.communityCounsel==='protect_people'?'some_protected':'high_exposure';
 const care=c.firstAction==='support_supply'||c.communityCounsel==='protect_people'||c.prisonerDecision==='protect_detention'||c.limitsViolence;
 if(['urge_retreat','separate_faith_and_strategy'].includes(f)&&care)return 'many_protected';
 if(f==='defensive_only'&&!care&&(o.prudence||0)+(o.community||0)<(o.resistance||0))return 'high_exposure';
 return 'some_protected';
}
export function deriveChapter5EndWorldState(g){const c=c5(g),f=c.finalAction,neg=deriveNegotiationOutcome(g),civil=deriveCivilianOutcome(g);
 if(['stay_with_band','join_band'].includes(f))return 'violent_defeat';
 if(f==='support_one_group')return 'community_fragmented';
 if(['last_delegation','negotiate_village_protection','mediate'].includes(f)&&neg==='collapsed')return 'negotiation_collapsed';
 if(civil==='many_protected')return 'civilians_protected';
 if(['urge_retreat','separate_faith_and_strategy','reject_divine_certainty','public_religious_warning','revise_counsel','mediate','last_delegation'].includes(f)&&neg!=='collapsed')return 'fragile_deescalation';
 return neg==='collapsed'?'negotiation_collapsed':civil==='high_exposure'?'violent_defeat':'community_fragmented';
}
export function resolveChapterFiveOutcomes(g){
 // Freeze the profile at the action, so subsequent reflection cannot rewrite events.
 if(!g.chapter5.outcomeProfile)g.chapter5.outcomeProfile=structuredClone(g.orientation||{});
 Object.assign(g.chapter5,{konradOutcome:deriveKonradOutcome(g),negotiationOutcome:deriveNegotiationOutcome(g),civilianOutcome:deriveCivilianOutcome(g),endWorldState:deriveChapter5EndWorldState(g)});
}
export function chapterSixHandoff(g){return {initialFreedomInterpretation:g.choices?.initialFreedomInterpretation,orientation:structuredClone(g.orientation),perceptions:structuredClone(g.perceptions),chapter3:structuredClone(g.chapter3),chapter4:structuredClone(g.chapter4),chapter5:structuredClone({...g.chapter5,handoff:null})};}
export function sanitizeChapterFive(g){
 const raw=g.chapter5||{},base=freshChapterFive(),record=x=>x&&typeof x==='object'&&!Array.isArray(x);
 if(record(raw.outcomeProfile)&&Object.values(raw.outcomeProfile).every(n=>Number.isFinite(n)&&n>=0&&n<=100))base.outcomeProfile=structuredClone(raw.outcomeProfile);
 const enumValue=(v,a)=>a.includes(v)?v:null;
 base.openingPath=enumValue(raw.openingPath,Object.keys(finalActions));
 for(const [field,id] of Object.entries(chapterFiveFields)){const v=g.choices?.[id]??raw[field];base[field]=enumValue(v,chapterFiveChoices[id].options.map(o=>o.id));if(base[field])g.choices[id]=base[field];}
 base.stage=g.scene?.startsWith('ch5_')?g.scene.slice(4):typeof raw.stage==='string'?raw.stage:'';base.phase=['help','limit','blind','assessment','risk','tension','danger'].includes(raw.phase)?raw.phase:'';
 base.step=Number.isInteger(raw.step)?Math.max(0,Math.min(raw.step,5)):0;
 if(base.stage==='theological_arguments')base.step=Math.min(base.step,4);
 if(base.stage==='polarization_analysis')base.step=Math.min(base.step,2);
 base.selections=Array.isArray(raw.selections)?[...new Set(raw.selections.filter(v=>typeof v==='string'))].slice(0,6):[];
 for(const key of ['theologicalCounsel','polarizationAnalysis','reportAnswers','resolved','attempts'])base[key]=record(raw[key])?structuredClone(raw[key]):{};
 base.attempts=Object.fromEntries(Object.entries(base.attempts).filter(([id,n])=>Number.isInteger(n)&&n>=0&&n<=20));
 const pair=(key,fields,allowed)=>{for(const field of fields)base[key][field]=enumValue(raw[key]?.[field],allowed);};
 const funcs=religionFunctions.map(([id])=>id);base.religionFunctions.strongest=Array.isArray(raw.religionFunctions?.strongest)?[...new Set(raw.religionFunctions.strongest.filter(v=>funcs.includes(v)))].slice(0,2):[];
 pair('religionFunctions',['dangerousWhenAbsolute'],funcs);pair('lutherTension',['helpful','tension'],lutherThoughts.map(([id])=>id));pair('internalDebate',['strongestArgument','mostDangerousAbsolute'],debateArguments.map(([id])=>id));
 for(const key of ['certain','uncertain'])base.violenceReportsAssessment[key]=Array.isArray(raw.violenceReportsAssessment?.[key])?[...new Set(raw.violenceReportsAssessment[key].filter(id=>reportFacts.some(f=>f[0]===id)))]:[];
 base.supplyAction=enumValue(raw.supplyAction,['food','material','wounded']);base.limitsViolence=raw.limitsViolence===true||base.firstAction==='limit_violence';
 base.finalAction=enumValue(raw.finalAction,availableFinalActions(base).map(([id])=>id));
 if(base.finalAction)g.choices.ch5Final=base.finalAction;else delete g.choices.ch5Final;
 base.feedback=record(raw.feedback)&&typeof raw.feedback.text==='string'?structuredClone(raw.feedback):null;
 base.completed=raw.completed===true&&!!base.finalAction;g.chapter5=base;
 if(['action_effect','after_crisis','konrad_news','path_reflection','freedom_after_action','end','chapter6'].includes(base.stage)&&!base.finalAction){g.scene='ch5_troops_approach';base.stage='troops_approach';base.phase='';base.step=0;base.feedback=null;g.dialogue=null;g.interaction=null;g.resumeSetup=true;}
 if(base.finalAction)resolveChapterFiveOutcomes(g);
 if(base.completed)base.handoff=chapterSixHandoff(g);
 return base;
}
