export function freshState() {
  return { version: 1, chapter: 1, scene: 'ch1_s1_tavern_intro', dimensions: { negotiation: 0, resistance: 0, violence: 0, solidarity: 0, theologicalPoliticization: 0 }, choices: {}, relationships: { peter: 0, anna: 0, jakob: 0, konrad: 0 }, world: { villageState: 'calm', manorState: 'intact', campState: 'day' }, notebook: { unlocked: false, entries: [], documents: [], passages: {} }, progress: { completedScenes: [], visitedHotspots: [], conversations: [], flyerUnlocked: false }, minigames: { axis: {}, puzzle: [], completed: [] }, dialogue: null };
}
export let state = freshState();
export function replaceState(next) { state = next; }
export function addUnique(list, item) { if (!list.includes(item)) list.push(item); }
