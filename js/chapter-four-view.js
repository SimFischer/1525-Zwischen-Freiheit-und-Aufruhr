import { caseComplete,regimentsFeedback,regimentsSynthesis,regimentsSummary } from '../data/chapter-four-regiments.js';
import { state } from './state.js';
import { sceneById } from '../data/scenes.js';
import { characters } from '../data/characters.js';
import { ch4Asset,villageBackground,regimentsCases,regimentsZones,preparationThoughts,communityConditions,hermeneuticalCriteria,interpretationCriteria,multiselectTasks } from '../data/chapter-four.js';
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
 if(c.feedback)return task('Den Zusammenhang prüfen',`${c.feedback.submitted?`<p class="personal-note">Dein Gedanke: ${esc(c.feedback.submitted)}</p>`:''}<p role="status">${esc(c.feedback.text)}</p>`,act(c.feedback.resolved?'Weiter →':'Mit diesem Hinweis neu prüfen →','feedback','class="primary"'));
 const spec=documentStagePages[s];
 if(spec&&!c.docRead[s])return task(sceneById[state.scene].title,'<p>Ein Druckbogen liegt bereit. Lies ihn im Zusammenhang mit dem Streit, den wir gerade erlebt haben.</p>',act('Den Bogen lesen →','read','class="primary"'));
 if(state.interaction?.kind==='choice')return choiceView(state.interaction.id);
 if(s==='ermahnung')return task('Zuerst die Herren prüfen','<p>Luther richtet seine Mahnung auch an die Herrschaft. Was verlangt er von ihr?</p>',next('An die Herren →','lords'));
 if(s==='harsh')return task('Begründung und Härte unterscheiden','<p>Die neue Schrift verlangt erheblich schärferes Eingreifen. Vergleiche sie mit der Ermahnung, bevor du urteilst.</p>',next('April und Mai vergleichen →','comparison'));
 if(multiselectTasks[s]){const t=multiselectTasks[s];return task(t.title,list(t.items,s),act('Mit dem Text prüfen →','check',`class="primary" ${(c.selections[s]||[]).length?'':'disabled'}`));}
 if(chapterFourChoiceId(s))return task(sceneById[state.scene].title,`<p>${s==='comparison'?'Was hat sich zwischen den beiden Texten verändert?':s==='negotiation'&&c.authorityTone==='pressure'?'Der direkte Zugang zum Herrn bleibt geschlossen. Erst nach einer Begrenzung der Mittel hört der Verwalter die Abordnung an.':'Was willst du aus dem bisherigen Gespräch und der Quelle folgern?'}</p>`,s==='negotiation'&&c.authorityTone==='pressure'&&!c.meansLimited?act('Keine Gewalt gegen Menschen zusagen','limit','class="primary"'):act('Meine Antwort geben →','choice','class="primary"'));
 if(s==='preparation'){
  if(!c.docRead.c4_memory||!c.docRead.c4_authority){
   const first=!c.docRead.c4_memory;
   return task('Zuerst die beiden Schriften lesen',`<p>Jakob legt die Freiheitsschrift von 1520 neben die Obrigkeitsschrift von 1523. Lies beide, bevor du Gedanken miteinander verbindest.</p><p role="status">${first?'Lies noch die Freiheitsschrift; danach folgt die Obrigkeitsschrift.':'Die Freiheitsschrift ist gelesen. Lies nun die Obrigkeitsschrift.'}</p>`,act(first?'Freiheit · 1520 lesen →':'Weltliche Obrigkeit · 1523 lesen →','read',`data-document="${first?'c4_memory':'c4_authority'}" class="primary"`));
  }
  return task('Welche Spannung müssen wir klären?',`<p>Wähle zwei Gedanken, die sich nicht einfach gleichsetzen lassen, und halte ihre Verbindung fest.</p>${list(preparationThoughts,'preparation','thought')}<ul>${c.preparationPairs.map(t=>'<li>'+esc(t)+'</li>').join('')}</ul>`,((c.selections.preparation||[]).length===2?act('Die Verbindung festhalten →','pair',`class="${c.preparationPairs.length?'quiet':'primary'}"`):'')+(c.preparationPairs.length?next('Was geschieht währenddessen? →','opening_effect'):'')+act('Freiheit erneut lesen','read','data-document="c4_memory" class="quiet"')+act('Obrigkeit erneut lesen','read','data-document="c4_authority" class="quiet"'));
 }
 if(s==='memory')return task('Dein Freiheitsgedanke im Notizbuch',`<p>Deine Worte aus der Taverne bleiben erhalten. Stelle sie neben die Ermahnung, bevor du neu urteilst. Öffne dazu zuerst das Notizbuch.</p>`,act('Im Notizbuch gegenüberstellen','memory')+ready('Mein erstes Urteil →','early').replace('class="primary"',`class="primary" ${c.memoryRead?'':'disabled'}`));
 if(s==='regiments')return regimentsPanel(c);
 if(s==='muentzer')return task('Thomas Müntzer als Gegenposition','<p>Konrad hört einen möglichen Widerstandsauftrag. Jakob fragt nach den Maßstäben der Auslegung. Vergleiche die Positionen.</p>',ready('Drei Auslegungen vergleichen →','interpretations'));
 if(s==='interpretations'){
  const i=c.comparisonIndex??0,row=interpretationCriteria[i];
  return task('Worin unterscheiden sich die Auslegungen?',`<div class="ch4-table-object"><img class="ch4-work-table" src="${ch4Asset('ui','ui_three_interpretations_table')}" alt="Drei Lesebereiche auf einem Holztisch"><span style="left:15%;top:15%;width:16%;height:21%">Luther</span><span style="left:40%;top:15%;width:19%;height:21%">Evangelium als Kritik</span><span style="left:70%;top:15%;width:17%;height:21%">Prophetische Deutung</span></div><nav class="ch4-paper-options" aria-label="Vergleichskriterien">${interpretationCriteria.map((r,i)=>act(esc(r[0]),'criterion',`data-index="${i}" aria-pressed="${c.comparisonCriteria.includes(i)}"`)).join('')}</nav><div class="ch4-interpretations">${['Luthers Unterscheidung','Evangelium als Herrschaftskritik','Prophetische Veränderung'].map((title,j)=>`<section><h3>${title}</h3><p>${esc(row[j+1])}</p></section>`).join('')}</div><p>Diese drei Akzente sind keine vollständig getrennten Konfessionen. Prüfe jeweils, welcher Schluss vom Glauben auf äußeres Handeln gezogen wird. Lies alle fünf Kriterien, bevor du deine Begründung wählst.</p><p class="securing" role="status">${5-c.comparisonCriteria.length?`Noch ${5-c.comparisonCriteria.length} Kriterien zu lesen.`:'Die fünf Kriterien liegen nebeneinander.'}</p>`,next('Mit welcher Begründung handeln? →','theology',c.comparisonCriteria.length<5));
 }
 if(s==='conditions')return task('Zwei verbindliche Bedingungen',`<p>Wähle genau zwei Bedingungen für das gemeinsame Mandat. Die Gemeinde vertritt sie öffentlich.</p>${list(communityConditions,'conditions')}`,act('Die Gemeinde öffentlich verpflichten →','conditions-next',`class="primary" ${(c.selections.conditions||[]).length===2?'':'disabled'}`));
 if(s==='hermeneutics')return task('Maßstäbe unserer Auslegung',`<p>Wähle mindestens zwei Maßstäbe, an denen du auch den eigenen Anspruch prüfen lassen willst. Währenddessen mobilisieren andere weiter.</p>${list(hermeneuticalCriteria,'hermeneutics')}`,act('Die Maßstäbe festhalten →','hermeneutics-next',`class="primary" ${(c.selections.hermeneutics||[]).length>=2?'':'disabled'}`));
 if(s==='weingarten')return task('Ein Verhandlungsweg mit einem Preis','<p>Eine reale Vereinbarung eröffnet einen Weg. Zugleich verlangt sie von den Bauern, Bindungen aufzulösen und wieder Gehorsam zu leisten. Was davon trägt hier?</p>',ready('Unsere Position neu prüfen →','weingarten_choice'));
 if(s==='analysis')return task('Ein Prinzip oder eine neue Anwendung?','<p>Deine frühere Quellenprüfung eröffnet diese zusätzliche Frage: Ändert Luther seine Unterscheidung grundsätzlich, seine Einschätzung des Aufruhrs oder die Mittel, die er für gerechtfertigt hält?</p>',act('Die drei Ebenen unterscheiden →','analysis','class="primary"'));
 if(s==='chapter5')return task('Kapitel 5 – Du musst handeln','<p>Was gestern noch eine Forderung war, ist heute eine Entscheidung.</p>',button('Den Weg aufnehmen →','ch5-start','class="primary chapter-continue"'));
 if(s==='end')return `<section class="ch4-ending"><p>Aus Forderungen wurden Entscheidungen.</p><p>Jetzt haben sie Folgen für andere.</p>${next('Weiter zu Kapitel 5 →','chapter5').replace('class="primary"','class="primary chapter-continue"')}<div class="ending-actions">${button('Notizbuch öffnen','notebook','class="quiet"')}${button('Zum Titelbild','home','class="quiet"')}</div></section>`;
 // These checkpoints deliberately leave the changed scene visible, not behind a task.
 return '';
}
function regimentsPanel(c){
 const cas=regimentsCases[c.regimentsIndex],entry=cas&&c.twoRegimentsCases[cas.id];
 const option=(id,text,action,attrs,pressed)=>act(`<span class="choice-letter">${id}</span><span>${esc(text)}</span>`,action,`${attrs} aria-pressed="${pressed}"`);
 if(!cas){
  const selected=c.selections.regiments_synthesis||[],done=c.resolved.regiments;
  return `<section class="task-panel ch4-task ch4-regiments" aria-labelledby="regiments-title"><p class="eyebrow">Fünf Fälle · Gemeinsamer Blick</p><h2 id="regiments-title">Was zeigt sich an den fünf Fällen?</h2><p class="regiments-question">Wähle alle tragfähigen Aussagen.</p><div class="regiments-synthesis">${regimentsSynthesis.map(([id,text])=>option(id,text,'multi',`data-selection="regiments_synthesis" data-item="${id}" ${done?'disabled':''}`,selected.includes(id))).join('')}</div>${done||c.caseFeedback?`<p class="regiments-feedback" role="status">${esc(done?regimentsSummary:c.caseFeedback)}</p>`:''}<div class="panel-actions">${done?next('Zur nächsten Szene →','boundary'):selected.length?act('Die Aussagen prüfen →','synthesis','class="primary"'):'<p>Wähle zunächst die Aussagen, die du für tragfähig hältst.</p>'}</div></section>`;
 }
 const completed=caseComplete(cas,entry),reason=cas.reasons.find(([id])=>id===entry?.reasoning);
 return `<section class="task-panel ch4-task ch4-regiments" aria-labelledby="regiments-title"><p class="eyebrow">Fall ${c.regimentsIndex+1} von 5</p><h2 id="regiments-title">${esc(cas.text)}</h2><p class="regiments-question">Wo liegt das Problem aus Luthers Perspektive vor allem?</p><div class="regiments-categories">${regimentsZones.map(([id,text],i)=>option(String.fromCharCode(65+i),text,'classify',`data-zone="${id}"`,entry?.classification===id)).join('')}</div>${entry?.classification?`<section class="regiments-reasoning" aria-labelledby="regiments-why"><h3 id="regiments-why">Warum?</h3>${completed?`<p class="regiments-chosen-reason">${esc(reason[1])}</p><p class="regiments-feedback" role="status">${esc(regimentsFeedback(cas,entry))}</p>`:`<div class="regiments-reasons">${cas.reasons.map(([id,text],i)=>option(String.fromCharCode(65+i),text,'case-reason',`data-reason="${id}"`,false)).join('')}</div>`}</section>`:'<p class="regiments-instruction">Wähle eine Einordnung. Danach begründest du deine Wahl.</p>'}${completed?`<div class="panel-actions">${act(c.regimentsIndex===4?'Zum gemeinsamen Blick →':'Nächster Fall →','case-next','class="primary"')}</div>`:''}</section>`;
}
// Direct Work-approved compositions from CH4_STAGING_GUIDE.md.
// No legacy plate or crowd layer is selected and then replaced afterwards.
export function chapterFourWorld(game=state){
 const c=game.chapter4,s=c.stage;
 const world=(background,figures,height,feet,overlay=null,props=[])=>({background,overlay,figures:figures.map(([id,x])=>[id,x,height,feet]),props});
 const village=(tone=c.openingWorldState||'nuanced',figures=[['jakob',28],['konrad',72]])=>world('village',figures,41,71,tone===null?null:'consequence_'+(['nuanced','simplified','religious','confrontational'].includes(tone)?tone:'nuanced'));
 const manor=(delegation=false,props=[['articles_on_table',7,44,6],['seal_document',12,44,6]],envoy=false)=>world('manor_negotiation_rebuilt',delegation?[['peter',28],['konrad',48],[envoy?'envoy':'overseer',envoy?66:68]]:[['peter',28],['overseer',68]],41,71,null,props);
 const assembly=(figures=[['anna',28],['peter',51],['jakob',72]])=>world('village_assembly_rebuilt',figures,33,72);
 const camp=(figures=[['konrad',28],['band1',51],['band2',72]],overlay=null)=>world('peasant_band_camp_edge',figures,36,71,overlay);
 const study=(figures=[['jakob',28],['matthes',72]],props=[])=>world('jakob_study_rebuilt',figures,37,71,null,props);
 const delegation=()=>manor(true,[['seal_document',7,44,6]]);
 const blockade=()=>world('storehouse',[],33,71,'blockade');
 if(s==='opening')return village();
 if(['route','authority','community','resistance','preparation'].includes(s)){
  const route={authority:'A',community:'B',resistance:'C',preparation:'D'}[s]||c.openingRoute;
  if(route==='A')return manor(s==='route',undefined,s==='route');
  if(route==='B')return assembly();
  if(route==='C')return camp();
  return study();
 }
 if(s==='opening_effect'){
  if(c.openingRoute==='A')return c.authorityTone==='legal'?delegation():village({pressure:'confrontational',gospel:'religious'}[c.authorityTone]||'nuanced');
  if(c.openingRoute==='B'){
   if(c.communityAction==='delegation')return delegation();
   if(c.communityAction==='withhold_dues')return world('storehouse',[['peter',28],['anna',72]],33,71,null,[['dues_cart',87,62,18]]);
   return assembly();
  }
  if(c.openingRoute==='C'){
   if(c.resistanceAction==='block_storehouse')return blockade();
   if(c.resistanceAction==='return_to_negotiation')return delegation();
   if(c.resistanceAction==='demonstrate')return camp([['konrad',28],['band1',72]]);
   return village('confrontational');
  }
  if(c.openingRoute==='D')return village('simplified');
 }
 if(s==='negotiation')return manor(false,[['seal_document',7,44,6],['articles_on_table',12,44,6]]);
 if(s==='conditions')return assembly();
 if(s==='band')return camp();
 if(s==='branch_effect'){
  if(c.theologicalPath==='luther_order')return delegation();
  if(c.theologicalPath==='gospel_critique')return assembly([['anna',28],['peter',72]]);
  if(c.theologicalPath==='hermeneutical_caution')return village('simplified');
  if(c.theologicalPath==='prophetic_resistance'){
   if(c.bandAction==='resistance_occupation')return blockade();
   if(c.bandAction==='resistance_armed_defense')return village('confrontational',[['band1',51]]);
   return camp([['band1',28],[c.bandAction==='resistance_limit'?'konrad':'band2',72]]);
  }
 }
 if(['muentzer','interpretations','theology'].includes(s))return study([['preacher',28],['konrad',51],['jakob',72]],[['thuringia_report',62,35,7]]);
 if(['weingarten','weingarten_choice'].includes(s))return village('nuanced',[['matthes',51]]);
 if(s==='escalation')return world('village_escalation_rebuilt',[['anna',38],['konrad',72]],41,71);
 if(s==='escalation_effect')return world('village_escalation_rebuilt',c.escalationResponse==='join'?[['band1',72]]:[['anna',38],['matthes',72]],41,71,'consequence_confrontational');
 if(['harsh','comparison','structure','analysis','risk','judgment'].includes(s))return study(undefined,[['authority_warning',62,35,7]]);
 if(['world_end','chapter5'].includes(s)){
  if(c.endWorldState==='negotiation_open')return delegation();
  if(c.endWorldState==='mobilized_community')return assembly();
  if(c.endWorldState==='joining_peasant_band')return camp([['konrad',72]],'joining_peasant_band');
  if(c.endWorldState==='religious_polarization')return village('religious',[['preacher',28],['jakob',72]]);
  if(c.endWorldState==='events_moved_without_you')return village(null,[['jakob',51]]);
  return village();
 }
 return s==='regiments'?study([['jakob',28],['anna',72]]):study();
}
export function chapterFourFigure([id,x,height=43,feet=72],village=true){
 if(village&&villageCanonStaging[id]){
  const original=villageCanonStaging[id],active=state.dialogue?.lines[state.dialogue.index]?.speaker===id;
  const g=['preacher','envoy'].includes(id)&&!active?{...original,asset:original.asset.replace('_talking.png','_neutral.png')}:original;
  const [l,t,r,b]=g.bounds,k=height/(b-t);
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
// One asset map for the renderer and the optional debug inspector.
export function chapterFourWorldAssets(world=chapterFourWorld()){
 return {
  background:world.background==='village'?villageBackground:ch4Asset('backgrounds','bg_'+world.background),
  overlay:world.overlay?ch4Asset('overlays','overlay_'+world.overlay):null,
  props:world.props.map(([name])=>ch4Asset('props','prop_'+name))
 };
}
export function chapterFourScene(header){
 const c=state.chapter4,w=chapterFourWorld(),s=c.stage;
 if(s==='chapter5')header=header.replace('Kapitel 04','Kapitel 05').replace('Ordnung oder Widerstand?','Du musst handeln');
 const worldAssets=chapterFourWorldAssets(w),bg=worldAssets.background;
 const panel=chapterFourPanel();
 const links={opening:['Unseren Weg aufnehmen','route'],route:[{A:'Zum Verwalter',B:'Gemeinsam auftreten',C:'Zur Gruppe',D:'Mit Jakob prüfen'}[c.openingRoute],'route-go'],opening_effect:['Eine neue Nachricht lesen','ermahnung'],branch_effect:['Matthes anhören','weingarten'],escalation_effect:['Luthers neue Schrift lesen','harsh'],world_end:['Was nun auf dem Spiel steht','end']};
 const target=!panel&&links[s];
 const travel=s==='opening'||s==='route'&&c.openingRoute==='A';
 const signX=w.background.startsWith('manor_')?87:w.background==='storehouse'?61:w.background==='village'&&w.figures.length===1?78:51,signY=w.background.startsWith('manor_')?38:w.background==='storehouse'?29:w.background==='peasant_band_camp_edge'?(w.figures.length===3?25:67):w.background==='jakob_study_rebuilt'?41:w.background==='village_assembly_rebuilt'?30:w.background==='village'?60:23;
 const signs=target?hotspot(esc(target[0])+' →',target[1]==='route-go'?'ch4-route-go':'ch4-go',{kind:travel?'path':'action',classes:'ch4-hotspot',attrs:`${target[1]==='route-go'?'':`data-scene="${target[1]}"`} style="left:${signX}%;top:${signY}%"`}):'';
 return header+`<main class="game-layout chapter-four-layout ${panel?'task-layout':'exploration-layout'} ${s==='end'?'ch4-fade':''}"><section class="stage chapter-four" data-scene="${state.scene}" data-world="${w.background}" data-overlay="${w.overlay||''}" aria-label="${esc(sceneById[state.scene].title)}"><div class="room"><img class="room-image" src="${bg}" alt="${esc(sceneById[state.scene].title)}" draggable="false">${w.overlay?`<img class="ch4-world-overlay" style="${w.overlay==='blockade'?'transform:translateY(-11%)':w.overlay==='joining_peasant_band'?'transform:translateY(-8%)':''}" src="${worldAssets.overlay}" alt="Sichtbare Merkmale der Dorflage" draggable="false">`:''}<div class="ch4-figures">${w.figures.map(f=>chapterFourFigure(f,true)).join('')}</div>${w.props.map(([name,x,y,width],index)=>`<img class="ch4-prop" data-prop="${name}" src="${worldAssets.props[index]}" style="left:${x}%;top:${y}%;width:${width}%" alt="${esc({warning_notice:'Warnung des Herren',authority_warning:'Herrschaftlicher Warnbrief',letters_other_villages:'Briefe an andere Dörfer',bible_open:'Aufgeschlagene Bibel',seal_document:'Gesiegelte Vereinbarung',articles_on_table:'Die Artikel auf dem Tisch',dues_cart:'Zurückgehaltene Abgaben',thuringia_report:'Nachricht aus Thüringen',weingarten_report:'Nachricht aus Weingarten'}[name])}" draggable="false">`).join('')}${signs}<div class="stage-caption"><h1>${esc(sceneById[state.scene].title)}</h1></div></div></section><div id="interaction" class="interaction" data-stage="${s}">${panel}</div><footer class="game-footer"><span id="save-status"></span></footer></main>`;
}
export function fitChapterFourScene(){
 const room=document.querySelector('.chapter-four-layout .room'),stage=room?.parentElement,panel=document.querySelector('.chapter-four-layout .interaction>.dialogue-panel,.chapter-four-layout .interaction>.task-panel');if(!room||!stage)return;
 const box=stage.getBoundingClientRect(),available=panel?Math.max(100,panel.getBoundingClientRect().top-box.top-10):box.height;
 room.style.width=Math.min(box.width,available*4/3)+'px';room.style.top=available/2+'px';
}
window.addEventListener('resize',fitChapterFourScene);
