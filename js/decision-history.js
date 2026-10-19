import {choices} from '../data/choices.js';
import {availableFinalActions} from '../data/chapter-five.js';
import {buildChapterFiveEnding} from '../data/chapter-five-ending.js';
import {esc} from './ui.js';
export function decisionHistory(id,g){
 if(id==='ch5Final'){
  const options=availableFinalActions(g.chapter5||{}),selected=options.find(([key])=>key===g.chapter5?.finalAction);if(!selected)return '';
  return `<details class="decision-history"><summary>Als die Truppen näher kamen<span>Deine Entscheidung: ${esc(selected[1])}</span></summary><p>Damals standen zur Wahl:</p><ul>${options.map(([key,text])=>`<li>${esc(text)}${key===selected[0]?' <strong>(gewählt)</strong>':''}</li>`).join('')}</ul><p><strong>Konkrete Folgen in deiner Umgebung:</strong> ${esc(buildChapterFiveEnding(g)?.personal||'Die Folgen sind im Rückblick auf deinen Weg festgehalten.')}</p></details>`;
 }
 const def=choices[id],selected=def?.options.find(o=>o.id===g.choices?.[id]);if(!selected)return '';
 const reaction=Array.isArray(selected.reaction)?selected.reaction.map(l=>l.text).filter(t=>typeof t==='string').join(' '):typeof selected.reaction==='string'?selected.reaction:null;
 return `<details class="decision-history"><summary>${esc(def.prompt)}<span>Deine Entscheidung: ${esc(g.choiceTexts?.[id]||selected.text)}</span></summary><p>Damals standen zur Wahl:</p><ul>${def.options.map((o,i)=>`<li${o.id===selected.id?' class="chosen"':''}>${esc(o.label||String.fromCharCode(65+i))} – ${esc(o.text)}${o.id===selected.id?' <strong>(gewählt)</strong>':''}</li>`).join('')}</ul><p><strong>${def.reflective?'Unmittelbare Rückmeldung im Spiel':'Fachliche Rückmeldung'}:</strong> ${esc(reaction||selected.feedback||'Die gewählte Perspektive wurde für den weiteren Spielweg festgehalten.')}</p></details>`;
}
