import { state } from './state.js';
import { sceneById } from '../data/scenes.js';
import { characters } from '../data/characters.js';
import { ch4Asset,villageBackground,regimentsCases,regimentsZones,caseReasons,preparationThoughts,communityConditions,hermeneuticalCriteria,interpretationCriteria,multiselectTasks } from '../data/chapter-four.js';
import { documentStagePages } from '../data/chapter-four-documents.js';
import { chapterFourChoiceId } from './chapter-four.js';
import { choiceView } from './choice-engine.js';
import { dialogueView } from './dialogue-engine.js';
import { esc,button } from './ui.js';
import { hotspot } from './hotspots.js';
import { villageCanonStaging } from '../data/chapter-four-staging.js';
const act=(text,id,attrs='')=>button(text,'ch4-'+id,attrs);
const next=(text,id,disabled=false)=>act(text,'go',`data-scene="${id}" class="primary" ${disabled?'disabled':''}`);
const list=(items,stage,action='multi')=>`<div class="ch4-paper-options">${items.map(([id,text])=>act(esc(text),action,`data-item="${id}" aria-pressed="${(state.chapter4.selections[stage]||[]).includes(id)}"`)).join('')}</div>`;
function task(title,body,footer=''){return `<section class="task-panel ch4-task"><div class="task-heading"><p class="eyebrow">${['escalation','escalation_effect','harsh','comparison','structure','analysis','risk','judgment','world_end','end','chapter5'].includes(state.chapter4.stage)?'Mai':'April'} 1525</p><h2>${esc(title)}</h2></div><div class="task-scroll">${body}</div><div class="panel-actions">${footer}</div></section>`;}
const ready=(text,id)=>next(text,id);
export function chapterFourPanel(){
 const c=state.chapter4,s=c.stage;
 if(state.dialogue)return dialogueView();
 if(c.feedback)return task('Den Zusammenhang prüfen',`<p role="status">${esc(c.feedback.text)}</p>`,act(c.feedback.resolved?'Weiter →':'Noch einmal prüfen →','feedback','class="primary"'));
 const spec=documentStagePages[s];
 if(spec&&!c.docRead[s])return task(sceneById[state.scene].title,'<p>Ein Druckbogen liegt bereit. Lies ihn im Zusammenhang mit dem Streit, den wir gerade erlebt haben.</p>',act('Den Bogen lesen →','read','class="primary"'));
 if(state.interaction?.kind==='choice')return choiceView(state.interaction.id);
 if(s==='ermahnung')return task('Zuerst die Herren prüfen','<p>Luther richtet seine Mahnung auch an die Herrschaft. Was verlangt er von ihr?</p>',next('An die Herren →','lords'));
 if(s==='harsh')return task('Begründung und Härte unterscheiden','<p>Die neue Schrift verlangt erheblich schärferes Eingreifen. Vergleiche sie mit der Ermahnung, bevor du urteilst.</p>',next('April und Mai vergleichen →','comparison'));
 if(multiselectTasks[s]){const t=multiselectTasks[s];return task(t.title,list(t.items,s),act('Mit dem Text prüfen →','check',`class="primary" ${(c.selections[s]||[]).length?'':'disabled'}`));}
 if(chapterFourChoiceId(s))return task(sceneById[state.scene].title,`<p>${s==='negotiation'&&c.authorityTone==='pressure'?'Der direkte Zugang zum Herrn bleibt geschlossen. Erst nach einer Begrenzung der Mittel hört der Verwalter die Abordnung an.':'Was willst du aus dem bisherigen Gespräch und der Quelle folgern?'}</p>`,s==='negotiation'&&c.authorityTone==='pressure'&&!c.meansLimited?act('Keine Gewalt gegen Menschen zusagen','limit','class="primary"'):act('Meine Antwort geben →','choice','class="primary"'));
 if(s==='preparation')return task('Welche Spannung müssen wir klären?',`<p>Verbinde zwei Gedanken, die sich nicht einfach gleichsetzen lassen. Lies dazu beide kleinen Schriften.</p><div class="panel-actions">${act('Freiheit · 1520','read','data-document="c4_memory"')}${act('Weltliche Obrigkeit · 1523','read','data-document="c4_authority"')}</div>${list(preparationThoughts,'preparation','thought')}<ul>${c.preparationPairs.map(t=>'<li>'+esc(t)+'</li>').join('')}</ul>`,act('Die Verbindung festhalten','pair',`${(c.selections.preparation||[]).length===2?'':'disabled'}`)+next('Was geschieht währenddessen? →','opening_effect',!c.preparationPairs.length||!c.docRead.c4_memory||!c.docRead.c4_authority));
 if(s==='memory')return task('Dein Freiheitsgedanke im Notizbuch',`<p>Deine Worte aus der Taverne bleiben erhalten. Stelle sie neben die Ermahnung, bevor du neu urteilst.</p>`,act('Im Notizbuch gegenüberstellen','memory')+ready('Mein erstes Urteil →','early').replace('class="primary"',`class="primary" ${c.memoryRead?'':'disabled'}`));
 if(s==='regiments'){
  const current=regimentsCases.find(x=>x.id===c.selected);
  return task('Fünf Fälle an Luthers Unterscheidung prüfen',`<p>Ziehe einen Fall auf einen Bereich oder tippe ihn an und wähle den Bereich. Begründe jeden Fall. Die Unterscheidung beendet den Streit um Gerechtigkeit nicht.</p>${act('Luthers Obrigkeitsschrift lesen','read','data-document="c4_authority"')}<div class="ch4-table-object"><img class="ch4-work-table" src="${ch4Asset('ui','ui_two_regiments_table')}" alt="Ein Tisch mit getrennten Bereichen"><span style="left:17%;top:20%;width:22%;height:17%">Glaube und Gewissen</span><span style="left:64%;top:15%;width:19%;height:16%">Äußere Ordnung</span></div><div class="ch4-cases">${regimentsCases.map((cas,i)=>`<button class="sort-card ch4-case" data-action="ch4-case" data-card="${cas.id}" aria-pressed="${c.selected===cas.id}" style="--card-x:${i%2?100:0}%;--card-y:${Math.floor(i/2)%2?100:0}%"><span>${esc(cas.text)}</span><small>${esc(regimentsZones.find(x=>x[0]===c.twoRegimentsCases[cas.id])?.[1]||'Noch nicht zugeordnet')}</small></button>`).join('')}</div><div class="ch4-zones">${regimentsZones.map(([id,text])=>act(esc(text),'place',`data-drop-zone="${id}" data-zone="${id}" aria-label="${text}"`)).join('')}</div>${current&&c.twoRegimentsCases[current.id]?'<h3>Deine Begründung: '+esc(current.text)+'</h3><div class="ch4-paper-options">'+caseReasons.map(([id,text])=>act(esc(text),'case-reason',`data-reason="${id}" aria-pressed="${c.caseReasons[current.id]===id}"`)).join('')+'</div>':''}<p role="status">${esc(c.caseFeedback)}</p>`,next('Eine Grenze genauer prüfen →','boundary',regimentsCases.some(x=>!c.twoRegimentsCases[x.id]||!c.caseReasons[x.id])||!c.docRead.c4_authority));
 }
 if(s==='muentzer')return task('Thomas Müntzer als Gegenposition','<p>Konrad hört einen möglichen Widerstandsauftrag. Jakob fragt nach den Maßstäben der Auslegung. Vergleiche die Positionen.</p>',ready('Drei Auslegungen vergleichen →','interpretations'));
 if(s==='interpretations'){
  const i=c.comparisonIndex??0,row=interpretationCriteria[i];
  return task('Worin unterscheiden sich die Auslegungen?',`<div class="ch4-table-object"><img class="ch4-work-table" src="${ch4Asset('ui','ui_three_interpretations_table')}" alt="Drei Lesebereiche auf einem Holztisch"><span style="left:15%;top:15%;width:16%;height:21%">Luther</span><span style="left:40%;top:15%;width:19%;height:21%">Evangelium als Kritik</span><span style="left:70%;top:15%;width:17%;height:21%">Prophetische Deutung</span></div><nav class="ch4-paper-options" aria-label="Vergleichskriterien">${interpretationCriteria.map((r,i)=>act(esc(r[0]),'criterion',`data-index="${i}" aria-pressed="${c.comparisonCriteria.includes(i)}"`)).join('')}</nav><div class="ch4-interpretations">${['Luthers Unterscheidung','Evangelium als Herrschaftskritik','Prophetische Veränderung'].map((title,j)=>`<section><h3>${title}</h3><p>${esc(row[j+1])}</p></section>`).join('')}</div><p>Diese drei Akzente sind keine vollständig getrennten Konfessionen. Prüfe jeweils, welcher Schluss vom Glauben auf äußeres Handeln gezogen wird.</p>`,next('Mit welcher Begründung handeln? →','theology',c.comparisonCriteria.length<5));
 }
 if(s==='conditions')return task('Zwei verbindliche Bedingungen',`<p>Wähle genau zwei Bedingungen für das gemeinsame Mandat. Die Gemeinde vertritt sie öffentlich.</p>${list(communityConditions,'conditions')}`,act('Die Gemeinde öffentlich verpflichten →','conditions-next',`class="primary" ${(c.selections.conditions||[]).length===2?'':'disabled'}`));
 if(s==='hermeneutics')return task('Maßstäbe unserer Auslegung',`<p>Wähle mindestens zwei Maßstäbe, an denen du auch den eigenen Anspruch prüfen lassen willst. Währenddessen mobilisieren andere weiter.</p>${list(hermeneuticalCriteria,'hermeneutics')}`,act('Die Maßstäbe festhalten →','hermeneutics-next',`class="primary" ${(c.selections.hermeneutics||[]).length>=2?'':'disabled'}`));
 if(s==='weingarten')return task('Ein Verhandlungsweg mit einem Preis','<p>Eine reale Vereinbarung eröffnet einen Weg. Zugleich verlangt sie von den Bauern, Bindungen aufzulösen und wieder Gehorsam zu leisten. Was davon trägt hier?</p>',ready('Unsere Position neu prüfen →','weingarten_choice'));
 if(s==='analysis')return task('Ein Prinzip oder eine neue Anwendung?','<p>Deine frühere Quellenprüfung eröffnet diese zusätzliche Frage: Ändert Luther seine Unterscheidung grundsätzlich, seine Einschätzung des Aufruhrs oder die Mittel, die er für gerechtfertigt hält?</p>',act('Die drei Ebenen unterscheiden →','analysis','class="primary"'));
 if(s==='chapter5')return task('Kapitel 5 – Du musst handeln',`<p>Die nächste Handlung beginnt in einem Dorf, dessen Lage du mitgeprägt hast.</p><p>${esc({negotiation_open:'Die Verhandlung bleibt offen.',mobilized_community:'Die Gemeinde steht mit Bedingungen zusammen.',joining_peasant_band:'Du stehst in der Nähe des Bauernhaufens.',religious_polarization:'Die Auslegungen haben die Gemeinde gespalten.',events_moved_without_you:'Andere haben bereits gehandelt.'}[c.endWorldState])}</p><p>Dieses Kapitel wird noch vorbereitet. Deine Entscheidungen und die Ausgangslage bleiben gespeichert.</p>`,button('Notizbuch öffnen','notebook')+next('Zur Ausgangslage zurück →','world_end'));
 if(s==='end')return `<section class="ch4-ending"><p>Aus Forderungen wurden Entscheidungen.</p><p>Jetzt haben sie Folgen für andere.</p>${next('Weiter zu Kapitel 5 →','chapter5').replace('class="primary"','class="primary chapter-continue"')}<div class="ending-actions">${button('Notizbuch öffnen','notebook','class="quiet"')}${button('Zum Titelbild','home','class="quiet"')}</div></section>`;
 // These checkpoints deliberately leave the changed scene visible, not behind a task.
 return '';
}
const sceneProps=(...p)=>p;
export function chapterFourWorld(game=state){
 const c=game.chapter4,s=c.stage;let background='jakob_study_table',overlay=null,figures=[['jakob',28],['matthes',72]],props=sceneProps(['bible_open',48,47,18]);
 const village=(o)=>{background='village';overlay=o;figures=[['jakob',43],['konrad',61]];props=[];};
 if(s==='opening'){village('village_'+(c.openingWorldState||'nuanced'));if(c.openingWorldState==='confrontational')props=[['warning_notice',78,28,12]];}
 if(['route','authority','community','resistance','preparation'].includes(s)){
  const route={authority:'A',community:'B',resistance:'C',preparation:'D'}[s]||c.openingRoute;
  background={A:'manor_negotiation',B:'village_assembly_large',C:'village_edge_group',D:'jakob_study_table'}[route];
  figures={A:[['peter',28],['overseer',72]],B:[['anna',28],['konrad',72]],C:[['band1',28],['band2',72]],D:[['jakob',28],['matthes',72]]}[route];
  props={A:[['articles_on_table',49,49,15],['seal_document',61,49,11]],B:[['letters_other_villages',28,53,10]],C:[],D:[['bible_open',48,47,18]]}[route];
  if(s==='route'&&route==='A')figures=[['peter',28],['envoy',72]];
 }
 if(s==='opening_effect'){
  if(c.openingRoute==='A'){if(c.authorityTone==='pressure'){village('village_confrontational');props=[['authority_warning',76,36,17]];}else if(c.authorityTone==='gospel')village('village_religious');else village('delegation');}
  if(c.openingRoute==='B'){village({delegation:'delegation',withhold_dues:'withheld_dues',other_villages:'public_meeting',public_meeting:'public_meeting'}[c.communityAction]);if(c.communityAction==='other_villages')props=[['letters_other_villages',54,64,20]];if(c.communityAction==='withhold_dues')props=[['dues_cart',56,64,17]];}
  if(c.openingRoute==='C'){if(c.resistanceAction==='block_storehouse'){background='storehouse';overlay='blockade';figures=[];props=[];}else if(c.resistanceAction==='return_to_negotiation'){background='manor_negotiation';overlay='delegation';figures=[['overseer',72]];props=[['seal_document',58,49,11]];}else village(c.resistanceAction==='refuse_dues'?'withheld_dues':'resistance_group');}
  if(c.openingRoute==='D')village('events_moved_without_you');
 }
 if(s==='negotiation'){background='manor_negotiation';figures=[['peter',28],['overseer',72]];props=[['seal_document',59,49,11],['articles_on_table',47,49,15]];}
 if(s==='conditions'){background='village_assembly_large';figures=[['anna',28],['peter',72]];props=[['letters_other_villages',28,53,10]];}
 if(s==='band'){background='peasant_band_camp_edge';figures=[['band1',28],['band2',72]];props=[];}
 if(s==='hermeneutics'){background='jakob_study_table';figures=[['jakob',28],['preacher',72]];props=[['bible_open',48,47,18]];}
 if(s==='branch_effect'){
  if(c.theologicalPath==='luther_order'){background='manor_negotiation';overlay='delegation';figures=[['overseer',72]];props=[['seal_document',57,49,11]];}
  if(c.theologicalPath==='gospel_critique'){village('public_meeting');figures=[['anna',51]];props=[['letters_other_villages',51,53,9]];}
  if(c.theologicalPath==='prophetic_resistance'){
   if(c.bandAction==='resistance_occupation'){background='storehouse';overlay='blockade';figures=[];props=[];}
   else if(c.bandAction==='resistance_armed_defense'){village('armed_group');figures=[['band1',33]];props=[];}
   else {background='peasant_band_camp_edge';overlay=null;figures=c.bandAction==='resistance_limit'?[['band1',28],['konrad',72]]:[['band1',28],['band2',72]];props=c.bandAction==='resistance_dues'?[['dues_cart',51,64,18]]:[];}
  }
  if(c.theologicalPath==='hermeneutical_caution')village('events_moved_without_you');
 }
 if(['muentzer','interpretations','theology'].includes(s)){figures=[['preacher',28],['jakob',72]];props=[['thuringia_report',61,47,12]];}
 if(['weingarten','weingarten_choice'].includes(s)){background='village';overlay='delegation';figures=[['matthes',61]];props=[['weingarten_report',49,58,18]];}
 if(s==='escalation'){background='village_escalation';overlay=null;figures=[['anna',28],['konrad',72]];props=[];}
 if(s==='escalation_effect'){
  village({protect:'refugees_cart',warn:'smoke_distance',join:'armed_group',verify:'smoke_distance'}[c.escalationResponse]);figures=c.escalationResponse==='join'?[['band1',33]]:[['anna',39],['matthes',59]];
 }
 if(['harsh','comparison','structure','analysis','risk','judgment'].includes(s)){background='jakob_study_table';figures=[['jakob',28],['matthes',72]];props=[['authority_warning',62,47,12]];}
 if(['world_end','chapter5'].includes(s)){
  village(null);
  if(c.endWorldState==='negotiation_open'){background='manor_negotiation';overlay='delegation';figures=[['overseer',72]];props=[['seal_document',57,49,11]];}
  if(c.endWorldState==='mobilized_community'){background='village_assembly_large';overlay=null;figures=[['anna',28],['peter',72]];props=[['letters_other_villages',28,53,10]];}
  if(c.endWorldState==='joining_peasant_band'){background='village_edge_group';overlay='joining_peasant_band';figures=[['konrad',66]];}
  if(c.endWorldState==='religious_polarization'){overlay='religious_polarization';figures=[];}
  if(c.endWorldState==='events_moved_without_you'){overlay='events_moved_without_you';figures=[['jakob',57]];}
 }
 // The assembly already contains listeners: place speakers in its open foreground,
 // below the baked faces, rather than covering another villager's head.
 if(background==='village_assembly_large'){
  figures=figures.map(([id],i)=>[id,i?62:44,34,83]);
  props=props.map(([name,x,y,width])=>name==='letters_other_villages'?[name,44,68,8]:[name,x,y,width]);
 }
 if(background==='village'){
  // Only sparse world features belong on the new master. Legacy crowd layers are retired here.
  const reducedTone={religious_polarization:'religious',events_moved_without_you:'simplified',public_meeting:'nuanced',delegation:'nuanced',resistance_group:'confrontational',withheld_dues:'confrontational',armed_group:'confrontational',refugees_cart:'confrontational',smoke_distance:'confrontational'};
  const tone=(overlay?.startsWith('village_')?overlay.slice(8):reducedTone[overlay]||c.openingWorldState)||'nuanced';
  overlay='consequence_'+(['nuanced','simplified','religious','confrontational'].includes(tone)?tone:'nuanced');
  figures=figures.map(([id],i)=>[id,figures.length===3?[28,51,72][i]:figures.length===1?51:i?72:28,41,71]);
  props=[]; // Papers and books are anchored in the reduced edge overlays, never floating between speakers.
 }
 return {background,overlay,figures,props};
}
export function chapterFourFigure([id,x,height=43,feet=72],village=false){
 if(village&&villageCanonStaging[id]){
  const g=villageCanonStaging[id],[l,t,r,b]=g.bounds,k=height/(b-t);
  const flip=x<45&&g.facing==='left'||x>58&&g.facing==='right';
  const centre=flip?g.width-(l+r)/2:(l+r)/2;
  const left=x+(g.width/2-centre)*k*.75,bottom=100-feet-(g.height-b)*k;
  return `<span class="ch4-ground" style="left:${x-4}%;top:${feet-.5}%" aria-hidden="true"></span><img class="ch4-person" src="${g.asset}" data-person="${id}" data-canon-facing="${flip?(g.facing==='left'?'right':'left'):g.facing}" style="left:${left}%;width:${g.width*k*.75}%;max-width:none;height:${g.height*k}%;bottom:${bottom}%;transform:translateX(-50%)${flip?' scaleX(-1)':''}" alt="${esc(characters[id].name)}" draggable="false">`;
 }
 const current=state.dialogue?.lines[state.dialogue.index],active=current?.speaker===id;
 let src;
 if(['peter','anna','jakob'].includes(id))src=characters[id].sceneStates[active?'talking':'neutral'];
 else if(id==='konrad')src='assets/chapter3/characters/ch3_char_konrad_repaired.png';
 else if(id==='overseer')src='assets/chapter2/characters/ch2_char_overseer_neutral.png';
 else src=characters[id].sceneStates[active?'talking':'neutral']||characters[id].sceneStates.neutral;
 const modern=src.includes('/chapter4/')||id==='matthes',bottom=100-feet-(modern?height*15/896:0);
 return `<span class="ch4-ground" style="left:${x-5}%;top:${feet-1}%" aria-hidden="true"></span><img class="ch4-person" src="${src}" data-person="${id}" style="left:${x}%;height:${height}%;bottom:${bottom}%" alt="${esc(characters[id].name)}" draggable="false">`;
}
export function chapterFourScene(header){
 const c=state.chapter4,w=chapterFourWorld(),s=c.stage;
 if(s==='chapter5')header=header.replace('Kapitel 04','Kapitel 05').replace('Ordnung oder Widerstand?','Du musst handeln');
 const bg=w.background==='village'?villageBackground:ch4Asset('backgrounds','bg_'+w.background);
 const panel=chapterFourPanel();
 const links={opening:['Unseren Weg aufnehmen','route'],route:[{A:'Zum Verwalter',B:'Gemeinsam auftreten',C:'Zur Gruppe',D:'Mit Jakob prüfen'}[c.openingRoute],'route-go'],opening_effect:['Eine neue Nachricht lesen','ermahnung'],branch_effect:['Matthes anhören','weingarten'],escalation_effect:['Luthers neue Schrift lesen','harsh'],world_end:['Was nun auf dem Spiel steht','end']};
 const target=!panel&&links[s];
 const travel=s==='opening'||s==='route'&&c.openingRoute==='A';
 const signX=w.background==='village'?51:travel?84:51,signY=w.background==='village'?13:travel?48:92;
 const signs=target?hotspot(esc(target[0])+' →',target[1]==='route-go'?'ch4-route-go':'ch4-go',{kind:travel?'path':'action',classes:'ch4-hotspot',attrs:`${target[1]==='route-go'?'':`data-scene="${target[1]}"`} style="left:${signX}%;top:${signY}%"`}):'';
 return header+`<main class="game-layout chapter-four-layout ${panel?'task-layout':'exploration-layout'} ${s==='end'?'ch4-fade':''}"><section class="stage chapter-four" data-scene="${state.scene}" data-world="${w.background}" data-overlay="${w.overlay||''}" aria-label="${esc(sceneById[state.scene].title)}"><div class="room"><img class="room-image" src="${bg}" alt="${esc(sceneById[state.scene].title)}" draggable="false">${w.overlay?`<img class="ch4-world-overlay" src="${ch4Asset('overlays','overlay_'+w.overlay)}" alt="Sichtbare Merkmale der Dorflage" draggable="false">`:''}<div class="ch4-figures">${w.figures.map(f=>chapterFourFigure(f,w.background==='village')).join('')}</div>${w.props.map(([name,x,y,width])=>`<img class="ch4-prop" data-prop="${name}" src="${ch4Asset('props','prop_'+name)}" style="left:${x}%;top:${y}%;width:${width}%" alt="${esc({warning_notice:'Warnung des Herren',authority_warning:'Herrschaftlicher Warnbrief',letters_other_villages:'Briefe an andere Dörfer',bible_open:'Aufgeschlagene Bibel',seal_document:'Gesiegelte Vereinbarung',articles_on_table:'Die Artikel auf dem Tisch',dues_cart:'Zurückgehaltene Abgaben',thuringia_report:'Nachricht aus Thüringen',weingarten_report:'Nachricht aus Weingarten'}[name])}" draggable="false">`).join('')}${signs}<div class="stage-caption"><h1>${esc(sceneById[state.scene].title)}</h1></div></div></section><div id="interaction" class="interaction" data-stage="${s}">${panel}</div><footer class="game-footer"><span id="save-status"></span></footer></main>`;
}
export function fitChapterFourScene(){
 const room=document.querySelector('.chapter-four-layout .room'),stage=room?.parentElement,panel=document.querySelector('.chapter-four-layout .dialogue-panel');if(!room||!stage)return;
 const box=stage.getBoundingClientRect(),available=panel?Math.max(100,panel.getBoundingClientRect().top-box.top-10):box.height;
 room.style.width=Math.min(box.width,available*4/3)+'px';room.style.top=available/2+'px';
}
window.addEventListener('resize',fitChapterFourScene);
