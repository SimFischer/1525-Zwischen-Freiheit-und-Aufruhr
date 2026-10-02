export function freshState() {
  return {
    version: 3, chapter: 1, scene: 'ch1_s1_intro', phase: 'intro', uiMode: 'dialogue',
    dimensions: { negotiation: 0, resistance: 0, violence: 0, solidarity: 0, theologicalPoliticization: 0 },
    choices: { initialFreedomInterpretation: null, freedomSocialFirstThought: null, freedomAndOuterLife: null },
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
