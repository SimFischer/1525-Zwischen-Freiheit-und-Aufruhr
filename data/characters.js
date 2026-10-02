const character = (id, name, states, sceneStates) => ({
  name,
  states: Object.fromEntries(states.map(([emotion, label]) => [emotion, { label, asset: `assets/characters/${id}/portrait/${id}_${emotion}.png` }])),
  sceneStates: Object.fromEntries(sceneStates.map(state => [state, `assets/characters/${id}/scene/${id}_scene_${state}.webp`]))
});
export const characters = {
  peter: character('peter', 'Peter', [['neutral', 'Im Gespräch'], ['concerned', 'Besorgt'], ['skeptical', 'Skeptisch'], ['determined', 'Entschlossen'], ['angry', 'Verärgert']], ['neutral','talking']),
  anna: character('anna', 'Anna', [['neutral', 'Im Gespräch'], ['concerned', 'Besorgt'], ['sad', 'Traurig'], ['thoughtful', 'Nachdenklich'], ['engaged', 'Zugewandt']], ['neutral','talking']),
  jakob: character('jakob', 'Jakob', [['neutral', 'Im Gespräch'], ['reading', 'Liest das Flugblatt'], ['thoughtful', 'Nachdenklich'], ['skeptical', 'Zweifelnd'], ['explaining', 'Erläutert einen Gedanken']], ['neutral','reading','talking'])
};
export function characterState(id, emotion = 'neutral') { return characters[id].states[emotion] || characters[id].states.neutral; }
export function sceneCharacterState(id, active, emotion = 'neutral') {
  const pose = id === 'jakob' && emotion === 'reading' ? 'reading' : active ? 'talking' : 'neutral';
  return { pose, asset: characters[id].sceneStates[pose] };
}
let preloaded = false;
export function preloadCharacters() {
  if (preloaded) return;
  preloaded = true;
  for (const person of Object.values(characters)) for (const asset of [...Object.values(person.states).map(mood => mood.asset), ...Object.values(person.sceneStates)]) { const image = new Image(); image.src = asset; }
}
