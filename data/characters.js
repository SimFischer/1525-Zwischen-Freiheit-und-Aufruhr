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
for (const [id,name,file] of [['overseer','Der Verwalter','overseer_neutral'],['margarethe','Margarethe','margarethe_thinking'],['konrad','Konrad','konrad_arguing'],['traveler','Eine Reisende','older_peasant_woman_worried']]) characters[id]={name,states:{neutral:{asset:'assets/chapter2/characters/ch2_char_'+file+'.png'}},sceneStates:{}};
// Safe head-and-shoulder windows in the existing full-body originals.
// Include headwear and chin; original raster assets remain unchanged.
const portraitFrames = {
  overseer: { width:311, height:864, viewBox:'45 -8 230 250' },
  margarethe: { width:299, height:767, viewBox:'40 -8 225 250' },
  konrad: { width:346, height:808, viewBox:'60 -8 245 255' },
  traveler: { width:319, height:736, viewBox:'95 -8 220 250' }
};
for (const [id,frame] of Object.entries(portraitFrames)) characters[id].states.neutral.portraitFrame=frame;
export function characterState(id, emotion = 'neutral') { return characters[id].states[emotion] || characters[id].states.neutral; }
export function sceneCharacterState(id, active, emotion = 'neutral') {
  const pose = id === 'jakob' && emotion === 'reading' ? 'reading' : active ? 'talking' : 'neutral';
  return { pose, asset: characters[id].sceneStates[pose] };
}
for(const [id,name,poses] of [['lotzer','Sebastian Lotzer',['neutral','talking','reading']],['matthes','Matthes',['neutral','talking','reading']],['georg','Georg',['neutral']],['katharina','Katharina',['neutral']],['hans','Hans',['neutral']],['printer','Der Drucker',['working']]]) {
 const states=Object.fromEntries(poses.map(p=>[p,{asset:`assets/chapter3/portraits/ch3_portrait_${id}_${p}.png`} ])); if(!states.neutral) states.neutral=states.working;
 characters[id]={name,states,sceneStates:Object.fromEntries(poses.map(p=>[p,`assets/chapter3/characters/ch3_char_${id}_${p}.png`]))};
}
for(const [id,name,file,poses] of [['preacher','Der Prediger','local_preacher',['neutral','talking']],['envoy','Der Bote','authority_envoy',['neutral','talking']],['band1','Ein Bauer am Lager','peasant_band_member_1',['neutral']],['band2','Ein anderer Bauer','peasant_band_member_2',['neutral']]]) {
 const path=(type,pose)=>`assets/chapter4/${type}/ch4_${type==='portraits'?'portrait':'char'}_${file}${file.startsWith('peasant_band')?'':'_'+pose}.png`;
 characters[id]={name,states:Object.fromEntries(poses.map(p=>[p,{asset:path('portraits',p)}])),sceneStates:Object.fromEntries(poses.map(p=>[p,path('characters',p)]))};
}
let preloaded = false;
export function preloadCharacters() {
  if (preloaded) return;
  preloaded = true;
  for (const person of Object.values(characters).filter(person=>! /\/chapter[34]\//.test(person.states.neutral.asset))) for (const mood of Object.values(person.states)) { const image = new Image(); image.src = mood.asset; }
  for (const asset of ['k1_taverne_exploration.png','k1_taverne_dialog_group.png']) { const image = new Image(); image.src = 'assets/chapter1/' + asset; }
}
