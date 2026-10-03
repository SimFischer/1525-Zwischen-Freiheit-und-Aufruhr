import { figureFrames } from '../data/chapter-three-figures.js';
import { state } from './state.js';
import { sceneById } from '../data/scenes.js';
import { characters } from '../data/characters.js';
import { chapterThreeChoices, complaints, interpretationTexts, clusterReasons } from '../data/chapter-three.js';
import { articles, focusArticles } from '../data/chapter-three-articles.js';
import { chapterTwoBackgrounds, grievances } from '../data/chapter-two.js';
import { dialogueView } from './dialogue-engine.js';
import { choiceView } from './choice-engine.js';
import { demandText, comparisonOptions } from './chapter-three.js';
import { esc, button } from './ui.js';
import { hotspot } from './hotspots.js';
const asset=(type,name)=>`assets/chapter3/${type}/ch3_${name}.png`;
const act=(text,id,attrs='')=>button(text,'ch3-'+id,attrs);
const next=(text,id,disabled=false)=>act(text,'go',`class="primary ${id==='chapter4'?'chapter-continue':''}" data-scene="${id}" ${disabled?'disabled':''}`);
function task(title,body,footer=''){return `<section class="task-panel ch3-task"><div class="task-heading"><p class="eyebrow">${sceneById[state.scene].background==='village'?'Unser Dorf':'März 1525 · Memmingen'}</p><h2>${esc(title)}</h2></div><div class="task-scroll">${body}</div><div class="panel-actions">${footer}</div></section>`;}
export function memoryText(game=state){return '<h2>Was du aus deinem Dorf mitbringst</h2><p>'+esc((game.choices.priorityGrievances||[]).map(id=>grievances.find(g=>g.id===id)?.title).filter(Boolean).join(' · ')||'Die Erfahrungen aus Wald, Frondienst und Abgaben stehen nebeneinander.')+'</p><div class="personal-note"><p>'+esc(game.choices.playerDemand||'Noch keine gemeinsame Forderung aus deinem Dorf festgehalten.')+'</p></div>'+['forestResponse','corveeResponse','duesResponse'].filter(id=>game.choiceTexts[id]).map(id=>'<p>'+esc(game.choiceTexts[id])+'</p>').join('');}
function printView(){
 const c=state.chapter3,phase=c.printPhase;
 const piece=(id,file,label)=>`<button class="sort-card print-piece ${c.selected===id?'selected':''}" data-action="ch3-print-piece" data-card="${id}" aria-pressed="${c.selected===id}" aria-label="${label}"><img src="${asset('minigames',file)}" alt="" draggable="false"><span>${label}</span></button>`;
 const ready={form:['form','print_type_form','Druckform'],ink:['ink','print_ink_tool','Farbe'],paper:['paper','print_blank_sheet','Papier'],remove:['finished','print_finished_sheet','Bedruckter Bogen'],stack:['finished','print_finished_sheet','Bedruckter Bogen']}[phase];
 const instructions={form:'Setze die Druckform auf den Schlitten.',ink:'Trage Farbe auf die Form auf.',paper:'Lege einen unbedruckten Bogen ein.',press:'Betätige den Hebel der Presse.',remove:'Nimm den fertigen Bogen heraus.',stack:'Lege ihn auf den Stapel.',done:'Vier Bögen liegen bereit. Wer trägt sie weiter?'};
 return task('An der Druckerpresse',`<p>${instructions[phase]} Du kannst die Dinge ziehen oder antippen und ihren Platz wählen.</p><div class="ch3-print-workbench"><div class="press-object ${c.pressed?'pressing':''}" aria-label="Druckpresse"><img class="press-base" src="${asset('minigames','print_press_base')}" alt="Hölzerne Druckpresse"><img class="press-platen" src="${asset('minigames','print_press_platen')}" alt=""><img class="press-handle" src="${asset('minigames','print_press_handle')}" alt="">${phase!=='form'?`<img class="press-form ${phase!=='ink'?'inked':''}" src="${asset('minigames','print_type_form')}" alt="Druckform">`:''}${['press','remove'].includes(phase)?`<img class="press-sheet" src="${asset('minigames',phase==='remove'?'print_finished_sheet':'print_blank_sheet')}" alt="Bogen auf der Form">`:''}${['form','ink','paper'].includes(phase)?`<button data-drop-zone="bed" data-action="ch3-print-place" data-zone="bed" class="press-bed" aria-label="Auf die Druckform legen" ${['form','ink','paper'].includes(phase)?'':'disabled'}>Auf den Schlitten</button>`:''}${phase==='press'?act('Den Hebel betätigen','press','class="primary press-lever"'):''}${phase==='remove'?act('Bogen herausnehmen','print-place','data-zone="take" data-card="finished" class="press-take"'):''}</div><div class="print-tools">${ready?piece(...ready):''}<div class="print-stack" data-drop-zone="stack"><img src="${asset('minigames','print_stack')}" alt="Papierstapel" style="opacity:${.3+c.printed*.175};height:${80+c.printed*9}px"><p>${c.printed?c.printed+' bedruckte Bögen':'Der Platz für die Bögen'}</p>${phase==='stack'?act('Zum Stapel legen','print-place','data-zone="stack" data-card="finished"'):''}</div>${['form','ink','paper'].includes(phase)?act('Auf die Form legen','print-place',`data-zone="bed" ${c.selected?'':'disabled'}`):''}</div></div>`,phase==='done'?next('Die Bögen weitertragen →','map'):'');
}
export function chapterThreePanel(){
 const c=state.chapter3,stage=c.stage;
 if(state.dialogue)return dialogueView();
 if(state.interaction?.kind==='choice')return choiceView(state.interaction.id);
 if(stage==='hub')return '';
 if(stage==='road')return task('März 1525 · Memmingen','<p>Hinter dem Stadttor kommen Erfahrungen aus vielen Gemeinden zusammen.</p>',next('In die Stadt →','hub'));
 if(stage==='memory')return task('Erfahrungen aus deinem Dorf','<p>Schlage deine Notizen auf. Was möchtest du in Memmingen vorbringen?</p>',act('Notizbuch aufschlagen','memory')+next('Die erste Gruppe wählen →','entry'));
 if(stage==='clusters')return task('Welche größere Frage verbindet diese Beschwerden?',`<p>Lege mindestens zwei unterschiedliche Gruppen aus jeweils zwei oder mehr Zetteln zusammen. Du kannst Zettel antippen oder aufeinanderziehen. Begründe jede Verbindung.</p><div class="ch3-complaint-table"><div class="ch3-writing-tools"><img src="${asset('props','prop_ink_bottle')}" alt="" draggable="false"><img src="${asset('props','prop_quill')}" alt="" draggable="false"><img src="${asset('props','prop_paper_stack')}" alt="" draggable="false"><img src="${asset('props','prop_scroll_bundle')}" alt="" draggable="false"></div><img src="${asset('props','prop_complaint_notes_set')}" alt="" class="ch3-table-notes"><div class="complaint-grid">${complaints.map((text,i)=>`<button class="document-card sort-card complaint" data-action="ch3-card" data-card="${i}" data-drop-zone="${i}" aria-pressed="${c.pair.includes(String(i))}">${i+1}. ${esc(text)}</button>`).join('')}</div></div>${c.pair.length>=2?'<p>Diese Zettel verbindet für mich:</p><div class="ch2-papers">'+Object.entries(clusterReasons).map(([id,t])=>act(esc(t),'cluster',`data-reason="${id}"`)).join('')+'</div>':''}<p role="status">${esc(c.clusterFeedback||'Welche Erfahrungen könnten mehrere Gemeinden teilen?')}</p><ul>${c.complaintClusters.map(g=>'<li>'+g.cards.map(id=>Number(id)+1).join(' + ')+': '+clusterReasons[g.reason]+'</li>').join('')}</ul>`,next('Mit Lotzer formulieren →','lotzer',c.complaintClusters.length<2));
 if(stage==='articles')return task('Die Zwölf Artikel','<p>Ein gemeinsamer Text liegt vor euch. Lies zuerst den Artikel zu deinem Schwerpunkt, dann Artikel 3 und den Schluss in Artikel 12.</p><img class="ch3-closed-document" src="'+asset('documents','doc_twelve_articles_closed')+'" alt="Ein gedruckter Bogen">',act('Den Druckbogen lesen →','document','class="primary"'));
 if(stage==='compare'){
  const a=articles[(focusArticles[c.entryFocus]||1)-1],opts=comparisonOptions();
  return task('Vergleiche beide Forderungen',`<div class="ch3-comparison"><section><h3>Deine Forderung</h3><p>${esc(demandText())}</p></section><section><h3>Forderung der Zwölf Artikel · ${c.entryFocus==='labor'?'6 / 7':a.id}</h3><p>${esc(a.text)}${c.entryFocus==='labor'?' '+esc(articles[6].text):''}</p></section></div>${Object.entries(opts).map(([g,list])=>`<h3>${g==='common'?'Eine Gemeinsamkeit':'Ein Unterschied'}</h3><div class="ch2-papers">${list.map((text,i)=>act(esc(text),'compare',`data-group="${g==='common'?'common':'differences'}" data-index="${i}" aria-pressed="${c.articleComparison[g==='common'?'common':'differences']===text}"`)).join('')}</div>`).join('')}`,act('Den Vergleich besprechen →','comparison-next',`class="primary" ${c.articleComparison.common&&c.articleComparison.differences?'':'disabled'}`));
 }
 if(stage==='workshop')return task('Freiheit auslegen',`<div class="ch3-gospel-paper"><blockquote>Christus hat uns erlöst – wir sind frei.</blockquote><p>Sinngemäß zusammengefasst</p></div><p>Welche Aussagen lassen sich miteinander verbinden? Wo entsteht eine Grenze? Wähle mindestens zwei.</p><div class="ch2-papers">${interpretationTexts.map((text,i)=>act(String.fromCharCode(65+i)+'. '+esc(text),'interpret',`data-item="${String.fromCharCode(65+i)}" aria-pressed="${c.interpretations.includes(String.fromCharCode(65+i))}"`)).join('')}</div>`,act('Die Verbindung besprechen →','workshop-next',`class="primary" ${c.interpretations.length>=2?'':'disabled'}`));
 if(stage==='press')return printView();
 if(stage==='map')return task('Die Bögen reisen weiter',`<div class="ch3-distribution"><img src="${asset('maps','map_distribution_base')}" alt="Gezeichnete Landschaft mit Orten">${[[17,66],[55,37],[81,64],[40,77]].map(([x,y])=>`<img class="ch3-route-markers" style="left:${x}%;top:${y}%" src="${asset('maps','map_route_markers')}" alt="">`).join('')}<svg viewBox="0 0 1000 700" aria-hidden="true"><path d="M170 460 Q300 190 550 260 T820 450 M550 260 Q570 470 400 540"/></svg><img class="ch3-map-bundle" src="${asset('maps','map_paper_bundle_marker')}" alt="Ein Bündel Flugblätter"></div><p>Matthes: „Einer trägt zehn Bögen. Der nächste nimmt zwei weiter. Und plötzlich spricht ein Ort davon, den keiner von uns je gesehen hat.“</p>`,act('Zurück in unser Dorf →','map-next','class="primary"'));
 if(stage==='end')return `<section class="ch3-ending"><p class="ch3-ending-first">Die Forderungen stehen.</p><p class="ch3-ending-second">Jetzt geht es darum, wie weit man für sie gehen darf.</p>${next('Weiter zu Kapitel 4 →','chapter4')}<div class="ending-actions">${button('Notizbuch öffnen','notebook','class="quiet"')}${button('Zum Titelbild','home','class="quiet"')}</div></section>`;
 if(stage==='chapter4')return task('Kapitel 4 – Ordnung oder Widerstand?','<p>Die Forderungen sind unterwegs. Wie weit darf man für sie gehen?</p><p>Die Fortsetzung wird noch vorbereitet.</p>',button('Notizbuch öffnen','notebook','class="quiet"')+next('Zu den Forderungen zurück','end'));
 return '';
}
function figure(id,x,height,bottom,pose='neutral'){
 const person=characters[id],active=state.dialogue?.lines[state.dialogue.index]?.speaker===id;
 const emotion=active?(state.dialogue.lines[state.dialogue.index].emotion||'talking'):pose;
 const old={peter:'peter_'+(active?'talking':'neutral'),anna:'anna_'+(active?'talking':'neutral'),jakob:'jakob_'+(active&&emotion!=='reading'?'talking':'reading'),konrad:'konrad_arguing'};
 const src=old[id]?'assets/chapter2/characters/ch2_char_'+old[id]+'.png':person.sceneStates[emotion]||person.sceneStates[pose]||person.sceneStates.neutral;
 const frame=figureFrames[src], ratio=sceneById[state.scene].background==='village'?9/16:3/4;
 const imageBottom=frame?bottom-height*(1-frame.bounds[3]/frame.height):bottom;
 const center=frame?x+height*ratio*(frame.bounds[0]+frame.bounds[2])/2/frame.height:x+10;
 return src?`<span class="ch3-ground" style="left:${center-5}%;bottom:${bottom}%" aria-hidden="true"></span><img class="ch3-person" data-person="${id}" src="${src}" style="left:${x}%;height:${height}%;bottom:${imageBottom}%" alt="${person.name}">`:'';
}
export function chapterThreeScene(header){
 const scene=sceneById[state.scene],c=state.chapter3,stage=c.stage;
 const bg=scene.background==='village'?chapterTwoBackgrounds.hub:asset('backgrounds','bg_'+scene.background);
 const quiet=stage==='hub'&&!state.dialogue;
 const signs=quiet?[[ 'Ankommende anhören','arrivals','action',49,68],['Zur Versammlung','assembly','path',87,67],['Zur Druckerei','printer','path',12,63]].map(([t,id,kind,x,y])=>hotspot(t,'ch3-'+id,{kind,direction:id==='printer'?'left':'right',classes:'hotspot-sign ch3-hotspot',attrs:`style="left:${x}%;top:${y}%"`})).join(''):'';
 // Background square contains its own crowd; only dedicated foreground speakers
 // are added during conversation, away from embedded faces and object hotspots.
 const speaker=state.dialogue?.lines[state.dialogue.index]?.speaker;
 let figures='';
 if(scene.background==='memmingen_assembly')figures=figure('lotzer',4,60,8)+figure('jakob',72,55,8,'reading');
 else if(scene.background==='road_to_memmingen')figures=figure('matthes',9,56,9)+figure('konrad',70,53,9);
 else if(scene.background==='memmingen_square'&&!quiet&&speaker&&['georg','katharina','hans'].includes(speaker))figures=figure(speaker,45,55,6);
 else if(scene.background==='memmingen_printshop'&&stage!=='press')figures=figure('printer',67,61,7,'working');
 else if(scene.background==='village')figures=figure('peter',14,57,12)+figure('anna',46,57,12)+figure('jakob',70,57,12,'reading');
 const changed=scene.background==='village'?`<img class="ch3-village-bundle" src="${asset('maps','map_paper_bundle_marker')}" alt="Flugblätter sind im Dorf angekommen">`:'';
 return header+`<main class="game-layout chapter-three-layout ${quiet?'exploration-layout':'task-layout'} ${stage==='press'?'print-layout':''}"><section class="stage chapter-three ${scene.background==='village'?'ch3-village':''}" data-scene="${scene.id}" aria-label="${esc(scene.title)}" style="--world-image:url('${new URL(bg,location.href).href}')"><div class="room"><img class="room-image" src="${bg}" alt="${esc(scene.title)}"><div class="ch3-figures">${figures}</div>${changed}${signs}${quiet?'<div class="stage-caption"><h1>Gemeinden kommen zusammen.</h1></div>':''}</div></section><div id="interaction" class="interaction" data-stage="${state.scene}">${chapterThreePanel()}</div><footer class="game-footer"><span id="save-status"></span></footer></main>`;
}
