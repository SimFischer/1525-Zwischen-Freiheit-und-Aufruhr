import {epilogueBeats} from '../data/epilogue.js';
import {multiselectTasks} from '../data/chapter-four.js';
import {reportFacts} from '../data/chapter-five.js';
import {choices} from '../data/choices.js';
import {puzzles,sortingGames} from '../data/minigames.js';
import {regimentsCases,regimentsZones} from '../data/chapter-four-regiments.js';
import {sceneById} from '../data/scenes.js';
import {prepareAdminStateForScene} from './admin-state.js';
import {isTestMode,load} from './save-system.js';
import {esc,button} from './ui.js';
import {decisionHistory} from './decision-history.js';
export const teacherPaths=[['negotiation','Verhandlung','ch5_negotiation_room'],['peasant_band','Bauernhaufen','ch5_peasant_camp'],['theological_council','Theologischer Rat','ch5_theological_council'],['religious_conflict','Religiöser Konflikt','ch5_churchyard_conflict']];
export const teacherEndings=[
 ['violent_defeat','Gewaltsame Niederlage','peasant_band','stay_with_band','release'],
 ['negotiation_collapsed','Gescheiterte Verhandlung','negotiation','last_delegation','bargaining_leverage'],
 ['civilians_protected','Zivilbevölkerung geschützt','religious_conflict','joint_protection','protect_detention'],
 ['community_fragmented','Gemeinschaft zerbrochen','religious_conflict','support_one_group','release'],
 ['fragile_deescalation','Vorläufige Deeskalation','theological_council','public_religious_warning','release']
];
export function teacherTestState(kind,id){
 if(kind==='path'){const p=teacherPaths.find(p=>p[0]===id);if(!p)throw Error('Unbekannter Testpfad.');return prepareAdminStateForScene(p[2],{chapter5:{openingPath:id}});}
 if(kind==='ending'){const e=teacherEndings.find(e=>e[0]===id);if(!e)throw Error('Unbekannte Endtafel.');const g=prepareAdminStateForScene('ch5_freedom_after_action',{chapter5:{openingPath:e[2],finalAction:e[3],prisonerDecision:e[4],negotiationCondition:e[3]==='last_delegation'?'no_persecution':null}});g.chapter5.recap.phase='ending';g.chapter5.endingSeen=false;return g;}
 if(kind==='recap'){const g=teacherTestState('ending','civilians_protected');g.chapter5.recap.phase='slides';g.chapter5.recap.index=Math.max(0,Math.min(4,Number(id)||0));return g;}
 if(kind==='dossier'){const g=prepareAdminStateForScene('ch6_ending');g.chapter6.completed=true;g.chapter6.epilogue={index:epilogueBeats.length-1,elapsed:0,paused:true,finished:true};g.chapter6.epilogueSeen=true;return g;}
 throw Error('Unbekannte Vorführung.');
}
const checkpointKey='1525.teacher.task-checkpoint';
let checkpoint=null,checkpointId=null;
export function rememberAdminTask(g){
 if(!isTestMode()){checkpoint=null;checkpointId=null;try{sessionStorage.removeItem(checkpointKey);}catch{}return;}
 const c=g['chapter'+g.chapter];if(g.interaction?.kind==='feedback'||c?.feedback)return;
 const id=[g.scene,c?.stage,g.phase,g.interaction?.id,g.dialogue?'dialogue':'task'].join(':');
 if(checkpointId===id)return;
 if(!checkpoint)try{const stored=JSON.parse(sessionStorage.getItem(checkpointKey));if(stored?.id===id){checkpoint=stored.state;checkpointId=id;return;}}catch{}
 checkpoint=structuredClone(g);checkpointId=id;try{sessionStorage.setItem(checkpointKey,JSON.stringify({id,state:checkpoint}));}catch{}
}
export function resetAdminTask(g){
 if(!checkpoint)try{const stored=JSON.parse(sessionStorage.getItem(checkpointKey));if(stored?.state){checkpoint=stored.state;checkpointId=stored.id;}}catch{}
 return checkpoint?.scene===g.scene?structuredClone(checkpoint):prepareAdminStateForScene(g.scene,g.consequences.adminScenario);
}
export function teacherTools(g,chapter=g.chapter){
 const normal=load(true),path=teacherPaths.find(p=>p[0]===g.chapter5.openingPath),ending=teacherEndings.find(e=>e[0]===g.chapter5.endWorldState);
 const selected=['initialFreedomInterpretation','forestResponse','corveeResponse','duesResponse','ch3Religion','ch3Print','ch4Theology','ch4Risk','ch5First','ch5Condition','ch5Counsel','ch5Prisoner'].filter(id=>choices[id]&&g.choices[id]);
 return `<section class="teacher-state"><h2>Welchen Weg hat dieser Stand genommen?</h2><p>Kapitel ${g.chapter}: ${esc(sceneById[g.scene]?.title)}<br>Kapitel-4-Weg: ${esc(({A:'Verhandlung',B:'Gemeinschaft',C:'Widerstand',D:'Theologische Prüfung'})[g.chapter4.openingRoute]||'noch offen')}<br>Kapitel-5-Pfad: ${esc(path?.[1]||'noch offen')}<br>Ausgang: ${esc(ending?.[1]||'noch nicht erreicht')}</p><details><summary>Wichtige bisherige Entscheidungen</summary><p>Beispielvoraussetzungen eines Szenensprungs gehören zum Teststand; sie sind kein beobachteter Schülerweg.</p>${selected.length?selected.map(id=>decisionHistory(id,g)).join('')+decisionHistory('ch5Final',g):'<p>Noch keine Entscheidungen festgehalten.</p>'}</details><p>Normaler lokaler Schülerstand: ${normal?'vorhanden · Kapitel '+normal.chapter:'nicht vorhanden'}. Fortsetzungscode: in der veröffentlichten App verfügbar, benötigt Internet; im getrennten Teststand absichtlich gesperrt.</p></section><details class="teacher-solutions"><summary>Lösungen anzeigen</summary><p>Nur fachliche Aufgaben haben Lösungshinweise. Echte Entscheidungen und das Schlussurteil sind offene Zielkonflikte; hierfür gibt es keine Musterentscheidung.</p>${solutions(chapter)}</details><details class="teacher-demonstration"><summary>Pfade, Endtafeln und Rückblick zeigen</summary><p>Alle Vorführungen verwenden den getrennten Teststand.</p><h3>Kapitel-5-Startpfade</h3><div class="admin-targets">${teacherPaths.map(([id,label])=>button(label,'admin-demonstrate',`data-kind="path" data-item="${id}"`)).join('')}</div><h3>Fünf persönliche Ausgänge</h3><div class="admin-targets">${teacherEndings.map(([id,label])=>button(label,'admin-demonstrate',`data-kind="ending" data-item="${id}"`)).join('')}</div><h3>Rückblick ab …</h3><div class="admin-targets">${[1,2,3,4,5].map(n=>button('Kapitel '+n,'admin-demonstrate',`data-kind="recap" data-item="${n-1}"`)).join('')}</div><div class="admin-chapter-actions">${button('Dossier / PDF vorführen','admin-demonstrate','data-kind="dossier" data-item="dossier"')}</div><p>Das Dossier dieser Vorführung enthält vorbereitete Beispielantworten, keine Schülerleistung.</p></details>`;
}
function solutions(chapter){
 const prefix={3:'ch3',4:'ch4',5:'ch5'}[chapter];
 const list=Object.entries(choices).filter(([id,c])=>!c.reflective&&c.solution&&(prefix?id.startsWith(prefix):chapter===6?false:chapter===2?/^(forest|corvee|dues|assembly|lutherPolitical)/.test(id):!/^(ch[345]|forest|corvee|dues|assembly|lutherPolitical)/.test(id)));
 let html=list.map(([,c])=>{const o=c.options.find(o=>o.id===c.solution);return `<details><summary>${esc(c.prompt)}</summary><p><strong>Lösung:</strong> ${esc(o.text)}</p><p>${esc(o.feedback||c.securing||'Die Lösung folgt der in dieser Aufgabe geprüften Unterscheidung.')}</p></details>`;}).join('');
 if(chapter===1)html+=Object.values(puzzles).map(p=>`<details><summary>${esc(p.title)}</summary><p>${p.solution.map(id=>esc(p.parts.find(x=>x.id===id).text)).join(' → ')}</p><p>${esc(p.success)}</p></details>`).join('')+Object.values(sortingGames).map(p=>`<details><summary>${esc(p.title)}</summary><ul>${p.cards.map(c=>`<li>${esc(c.text)} → ${esc(p.zones.find(z=>z.id===c.preferred).title)}. ${esc(c.example)}</li>`).join('')}</ul><p>Die Schwerpunktzuordnung ersetzt nicht die Prüfung begründbarer Überschneidungen.</p></details>`).join('');
 if(chapter===4)html+=Object.values(multiselectTasks).map(t=>`<details><summary>${esc(t.title)}</summary><ul>${(t.solution?[t.solution]:t.alternatives).map(ids=>'<li>'+ids.map(id=>esc(t.items.find(i=>i[0]===id)[1])).join(' + ')+'</li>').join('')}</ul><p>${esc(t.feedback)}</p></details>`).join('')+`<details><summary>Zwei Regimente: Fälle und Begründungen</summary>${regimentsCases.map(c=>`<p><strong>${esc(c.text)}</strong><br>${c.preferred.map(id=>esc(regimentsZones.find(z=>z[0]===id)[1])).join(' / ')}. ${esc(c.feedback)}</p>`).join('')}</details>`;
 if(chapter===5)html+=`<details><summary>Nachrichten prüfen: drei Berichte</summary><ul>${reportFacts.map(([id,text,zone,why])=>`<li>${esc(text)} → ${esc(({certain:'Gesichert',uncertain:'Unsicher'})[zone]||zone)}. ${esc(why)}</li>`).join('')}</ul><p>Unterscheide eine belegte Nachricht von Hörensagen und wertender Deutung; die Berichte sind rekonstruierte Spielsituationen.</p></details>`;
 if(chapter===6)html='<p>Kapitel 6 verlangt ein eigenes begründetes Urteil. Prüfkriterien sind Quellenbelege, nachvollziehbare Argumentation, historische Einordnung und die Auseinandersetzung mit einem Gegenargument. Keine der angebotenen Schlusspositionen wird als richtige Meinung bewertet.</p>';
 return html||'<p>Hier stehen die Begründung und die Folgen deiner Entscheidung im Mittelpunkt. Fachliche Hinweise stehen auch in der jeweiligen Aufgabenrückmeldung.</p>';
}
