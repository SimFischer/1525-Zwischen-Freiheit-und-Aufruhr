// Save defaults and deterministic consequences are independent of the UI.
export const chapterFourFields={authorityTone:'ch4Authority',communityAction:'ch4Community',resistanceAction:'ch4Resistance',lutherFreedomJudgmentEarly:'ch4Early',theologicalPath:'ch4Theology',negotiationCondition:'ch4Condition',bandAction:'ch4Band',weingartenResponse:'ch4Weingarten',escalationResponse:'ch4Escalation',centralRisk:'ch4Risk',lutherHarshTextJudgment:'ch4HarshJudgment'};
export const openingRoutes={negotiate:'A',collective_pressure:'B',open_resistance_possible:'C',theological_clarification:'D'};
export function freshChapterFour(){return {openingWorldState:null,openingRoute:null,authorityEncounter:null,authorityTone:null,communityAction:null,resistanceAction:null,theologicalPreparation:false,lutherLordsUnderstood:false,lutherFreedomJudgmentEarly:null,twoRegimentsCases:{},theologicalPath:null,branchOutcome:null,unattendedMobilization:false,weingartenResponse:null,escalationResponse:null,centralRisk:null,lutherHarshTextJudgment:null,endWorldState:null,completed:false,stage:'',meansLimited:false,comparisonIndex:0,selected:null,selections:{},resolved:{},attempts:{},docRead:{},seenDocuments:[],communityConditions:[],hermeneuticalCriteria:[],preparationPairs:[],comparisonCriteria:[],caseReasons:{},caseFeedback:'',feedback:null,memoryRead:false,analysisRead:false,negotiationCondition:null,bandAction:null,handoff:null};}
export function initializeOpening(game){const c=game.chapter4;c.openingWorldState=game.chapter3.publicTone||'nuanced';c.openingRoute=openingRoutes[game.chapter3.resistanceStrategy]||'A';}
// A deliberate revision at Weingarten takes precedence over the earlier route.
// Caution has a real cost; mobilization is not a moral reward or punishment.
export function determineEndWorldState(game){
 const c=game.chapter4,wr=c.weingartenResponse;
 if(wr==='support_negotiation')return 'negotiation_open';
 if(c.theologicalPath==='hermeneutical_caution'&&wr!=='conditional_negotiation')return c.centralRisk==='religious_certainty'||c.openingWorldState==='religious'?'religious_polarization':'events_moved_without_you';
 if(c.theologicalPath==='prophetic_resistance'&&wr==='reject_retreat')return 'joining_peasant_band';
 if(wr==='conditional_negotiation')return c.theologicalPath==='luther_order'&&c.authorityTone!=='pressure'?'negotiation_open':'mobilized_community';
 if(c.theologicalPath==='gospel_critique')return 'mobilized_community';
 if(c.theologicalPath==='prophetic_resistance')return c.bandAction==='resistance_limit'?'mobilized_community':'joining_peasant_band';
 if(c.authorityTone==='pressure'||c.resistanceAction==='block_storehouse'||c.openingWorldState==='confrontational'&&game.orientation.resistance>game.orientation.prudence)return 'mobilized_community';
 return 'negotiation_open';
}
export function chapterFiveHandoff(game){const c=game.chapter4;return {endWorldState:c.endWorldState,theologicalPath:c.theologicalPath,weingartenResponse:c.weingartenResponse,lutherHarshTextJudgment:c.lutherHarshTextJudgment,centralRisk:c.centralRisk,branchOutcome:c.branchOutcome,orientation:{...game.orientation},perceptions:structuredClone(game.perceptions),negotiationOpen:c.endWorldState==='negotiation_open',proximityToPeasantBand:c.endWorldState==='joining_peasant_band',unattendedMobilization:c.unattendedMobilization,conditions:[...c.communityConditions],limitsViolence:c.bandAction==='resistance_limit'||c.bandAction==='resistance_occupation',priorDemand:game.choices.playerDemand};}
