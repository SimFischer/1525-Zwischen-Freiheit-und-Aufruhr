const character = (id, name, states) => ({
  name,
  states: Object.fromEntries(states.map(([emotion, label]) => [emotion, { label, asset: `assets/characters/${id}/${id}_${emotion}.png` }]))
});
export const characters = {
  peter: character('peter', 'Peter', [['neutral', 'Im Gespräch'], ['concerned', 'Besorgt'], ['skeptical', 'Skeptisch'], ['determined', 'Entschlossen'], ['angry', 'Verärgert']]),
  anna: character('anna', 'Anna', [['neutral', 'Im Gespräch'], ['concerned', 'Besorgt'], ['sad', 'Traurig'], ['thoughtful', 'Nachdenklich'], ['engaged', 'Zugewandt']]),
  jakob: character('jakob', 'Jakob', [['neutral', 'Im Gespräch'], ['reading', 'Liest das Flugblatt'], ['thoughtful', 'Nachdenklich'], ['skeptical', 'Zweifelnd'], ['explaining', 'Erläutert einen Gedanken']])
};
export function characterState(id, emotion = 'neutral') { return characters[id].states[emotion] || characters[id].states.neutral; }
let preloaded = false;
export function preloadCharacters() {
  if (preloaded) return;
  preloaded = true;
  for (const person of Object.values(characters)) for (const mood of Object.values(person.states)) { const image = new Image(); image.src = mood.asset; }
}
