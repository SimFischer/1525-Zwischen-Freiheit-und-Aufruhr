import { freshChapterFour } from '../data/chapter-four-state.js';
export function freshState() {
  return {
    version: 4, chapter: 1, scene: 'ch1_s1_intro', phase: 'intro', uiMode: 'dialogue',
    orientation: {community:0,legal:0,resistance:0,prudence:0,theological:0},
    perceptions: {peter:[],anna:[],jakob:[],margarethe:[],konrad:[],ulrich:[]},
    consequences: {version:2,orientationAdjustments:{},perceptionAdditions:{},flags:{}},
    dimensions: { negotiation: 0, resistance: 0, violence: 0, solidarity: 0, theologicalPoliticization: 0 },
    choices: { initialFreedomInterpretation: null, freedomSocialFirstThought: null, freedomAndOuterLife: null, forestArgument:null,forestResponse:null,peterDayPlan:[],corveeSacrifice:null,corveeResponse:null,initialFarmPlan:{food:0,seed:0,reserve:0},duesFirstSacrifice:[],duesResponse:null,duesSecondSacrifice:null,priorityGrievances:[],lutherPoliticalInference:null,playerDemand:null },
    chapter4:freshChapterFour(),
    chapter2: { forestComplete:false, corveeComplete:false, duesComplete:false, assemblyUnlocked:false, assemblyComplete:false, stage:'', grain:{}, links:[], pair:[], selections:[], demand:{}, removed:[] },
    chapter3: {"entryFocus": null, "complaintClusters": [], "demandChoice": null, "articleComparison": {}, "religiousInterpretation": null, "printStrategy": null, "publicTone": null, "resistanceStrategy": null, "mainReason": null, "completed": false, "pair": [], "interpretations": [], "printPhase": "ink", "printSequenceVersion": 2, "printed": 0, "selected": null, "seenArticles": [], "priorProfile": {}, "stage": ""},
    forestEvidence: { oldUse:false, customaryRules:false, newClaim:false },
    grievances: {forest:[],corvee:[],dues:[]},
    choiceTexts: {}, relationships: { peter: 0, anna: 0, jakob: 0, konrad: 0 },
    world: { villageState: 'calm', manorState: 'intact', campState: 'day' },
    notebook: { unlocked: false, entries: [], documents: [], passages: {} },
    progress: { completedScenes: [], visitedHotspots: [], conversations: [], flyerUnlocked: false, peterConversation: false, annaConversation: false, jakobConversation: false, freedomSortingComplete: false },
    minigames: { sorting: {}, puzzle: [], completed: [], attempts: {}, resolved: {}, assisted: {}, history: {} },
    dialogue: null, interaction: null
  };
}
export let state = freshState();
export function replaceState(next) { state = next; }
export function addUnique(list, item) { if (!list.includes(item)) list.push(item); }
export function conversationDone(id) { return state.progress[id + 'Conversation']; }
