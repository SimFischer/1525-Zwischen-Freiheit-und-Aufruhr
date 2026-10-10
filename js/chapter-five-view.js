import { state } from './state.js';
import { chapterFiveChoices,chapterFiveScenes,theologicalArguments,theologicalAlternatives,religionFunctions,lutherThoughts,reportTexts,reportFacts,debateArguments,finalActions,availableFinalActions } from '../data/chapter-five.js';
import { chapterFiveStaging as staging } from '../data/chapter-five-staging.js';
import { chapterFiveChoiceId,chapterFiveNext,pathReflection,endLabels,outcomeTexts } from './chapter-five.js';
import { dialogueView } from './dialogue-engine.js';
import { chapterFourFigure } from './chapter-four-view.js';
import { hotspot } from './hotspots.js';
import { button,esc } from './ui.js';
import { storyRecapView,storyClosingView,chapterSixTransition } from './story-recap-view.js';
const act=(text,id,attrs='')=>button(esc(text),'ch5-'+id,attrs);
const next=(text='Weiter →')=>act(text,'next','class="primary"');
const opts=(items,action,selected=null)=>`<div class="ch4-paper-options">${items.map(([id,text])=>act(text,action,`data-item="${id}" aria-pressed="${selected===id}"`)).join('')}</div>`;
function task(title,body,footer=''){return `<section class="task-panel ch4-task ch5-task"><p class="eyebrow">Mai 1525</p><h2 tabindex="-1">${esc(title)}</h2><div class="ch5-task-body">${body}</div><div class="panel-actions">${footer}</div></section>`;}
export function chapterFiveWorld(g=state){
 const c=g.chapter5,s=c.stage,route={peasant_band:'peasant_camp_morning',negotiation:'negotiation_chamber',theological_council:'theological_council_evening',religious_conflict:'churchyard_dispute'}[c.openingPath]||'peasant_camp_morning';
 let room=route,overlays=[];
 if(['dues_cart'].includes(s))room='road_stopped_dues_cart';
 if(s==='negotiation_room'||s==='negotiation_effect')room='negotiation_chamber';
 if(['prisoner_scene','neighbor_love','religion_functions','luther_balance','internal_debate'].includes(s))room=c.openingPath==='peasant_band'?'camp_prisoner':'village_prisoner_courtyard';
 if(['troops_approach','action_effect'].includes(s))room='road_troops_approaching';
 if(['after_crisis','konrad_news','path_reflection','freedom_after_action','end','chapter6'].includes(s))room='village_after_crisis';
 if(room==='churchyard_dispute')overlays=['order_group','justice_group'];
 if(s==='supply')overlays=['camp_supply'];
 if(s==='limit_violence')overlays=['armed_tension'];
 if(['negotiation_effect','escalation_message'].includes(s)&&room==='negotiation_chamber')overlays=[c.negotiationCondition==='no_persecution'?'negotiation_broken':'delegation_inside'];
 if(s==='escalation_message'&&room==='theological_council_evening')overlays=['wounded_return_council'];
 // The arriving group is registered to the council room, including the camp path.
 if(s==='escalation_message'&&c.openingPath==='peasant_band'){room='theological_council_evening';overlays=['wounded_return_council'];}
 if(s==='action_effect'){
  if(['evacuate_civilians','protect_wounded','protect_people','joint_protection','protected_retreat'].includes(c.finalAction))overlays=['people_evacuating'];
  else if(['urge_retreat','separate_faith_and_strategy'].includes(c.finalAction))overlays=['group_retreat'];
  // Staying, speaking and sending a delegation do not depict a retreat.
 }
 if(room==='village_after_crisis'&&c.endWorldState)overlays=[{violent_defeat:'after_defeat',negotiation_collapsed:'after_negotiation_collapse',civilians_protected:'after_protection',community_fragmented:'after_fragmentation',fragile_deescalation:'after_deescalation'}[c.endWorldState]];
 const spec=staging.scenes[room];let figures=spec.figures;
 // The speaking cart messenger is present in the scene; Peter does not speak here.
 if(s==='dues_cart')figures=figures.map(f=>f.id==='peter'?{...f,id:'envoy'}:f);
 // Three adults in the arrival layer occupy the foreground; Canon speakers remain in portraits.
 if(s==='escalation_message'&&room==='theological_council_evening')figures=[];
 if(s==='action_effect')figures=figures.filter(f=>f.id==='matthes');
 if(s==='negotiation_effect'&&c.negotiationCondition==='no_persecution')figures=figures.filter(f=>f.id==='overseer');
 return {room,spec,overlays,figures};
}
function worldHTML(w){return `<div class="room"><img class="room-image" src="${w.spec.background}" alt="${esc(w.spec.purpose)}">${w.overlays.map(name=>{const a=staging.assets['overlay_'+name],r=w.spec.overlayRegistration[name];if(!a||!r)throw Error('Unregistered chapter-5 layer '+name);return `<img class="ch5-world-overlay" data-overlay="${name}" src="${a.path}" style="left:${r.left}%;top:${r.top}%;width:${r.scale*100}%;height:${r.scale*100}%" alt="${esc(name.startsWith('after_')?endLabels[state.chapter5.endWorldState]:{order_group:'Gruppe, die Ordnung betont',justice_group:'Gruppe, die Gerechtigkeit betont',camp_supply:'Versorgung im Lager',armed_tension:'Bewaffnete warten auf den Aufbruch',delegation_inside:'Abordnung am Tisch',negotiation_broken:'Abordnung verlässt den Raum',wounded_return:'Ein Verwundeter wird gestützt',wounded_return_council:'Ein Verwundeter wird von zwei Menschen gestützt',people_evacuating:'Menschen verlassen den Gefahrenbereich',group_retreat:'Eine Gruppe zieht sich zurück'}[name])}">`;}).join('')}<div class="ch4-figures">${w.figures.map(f=>chapterFourFigure([f.id,f.x,f.bodyHeight,f.footline],true)).join('')}</div></div>`;}
function panel(){const c=state.chapter5,s=c.stage;
 if(state.dialogue)return dialogueView();
 if(c.feedback)return task('Deine Überlegung',`${c.feedback.submitted?`<p class="ch5-submitted">${esc(c.feedback.submitted)}</p>`:''}<p role="status">${esc(c.feedback.text)}</p>`,act(c.feedback.next?'Weiter zur nächsten Szene →':s==='neighbor_love'?'Noch einmal überlegen →':'Weiter →','feedback','class="primary"'));
 const id=chapterFiveChoiceId(s),def=chapterFiveChoices[id];
 if(def)return task(def.prompt,`<div class="ch4-paper-options">${def.options.map(o=>act(o.text,'choose',`data-option="${o.id}"`)).join('')}</div>`);
 if(s==='supply')return task('Was übernimmst du für die Versorgung?',opts([['food','Nahrung zu den Wartenden bringen.'],['material','Trageholz und Tücher bereitstellen.'],['wounded','Bei den Hilfsbedürftigen bleiben.']],'supply'));
 if(s==='theological_arguments'){
  if(c.step===4)return task('Ein Rat braucht beides','<p>Ordnung, Gewissen, Nächstenliebe und Selbstkritik können Orientierung geben. Keine einzelne Aussage entscheidet ohne Prüfung ihrer Grenzen.</p>',act('Dem Prediger einen Rat geben →','task-next','class="primary"'));
  const a=theologicalArguments[c.step],other=theologicalAlternatives[a[0]];return task(a[1],`<p>In heutiger Sprache zusammengefasst · ${c.phase==='limit'?'Welche Grenze möchtest du besonders mitdenken?':'Welche Orientierung möchtest du besonders betonen?'}</p>`+opts(c.phase==='limit'?[['limit',a[3]],['help',other[1]]]:[['help',a[2]],['limit',other[0]]],'field'));
 }
 if(s==='polarization_analysis'){
  if(c.step===2)return task('Keine Seite sieht alles','<p>Der Schutz vor Gewalt und die Kritik an Unrecht gehören zusammen. Welche religiöse Begründung ihr nutzt, muss auch an ihren blinden Flecken geprüft werden.</p>',act('Die neue Nachricht anhören →','task-next','class="primary"'));
  const order=c.step===0,blind=c.phase==='blind';return task((order?'Die Gruppe „Ordnung“':'Die Gruppe „Gerechtigkeit“')+' prüfen',`<p>${blind?'Welche Gefahr könnte sie übersehen?':'Welche Gefahr sieht sie besonders deutlich?'}</p>`+opts(order?(blind?[['injustice','Unrecht in der bestehenden Ordnung und Missbrauch von Obrigkeit.'],['division','Den Verlust gemeinsamer Überzeugungen.']]:[['violence','Eskalation, Gewalt und religiöse Selbstermächtigung.'],['poverty','Armut durch ausbleibende Veränderungen.']]):(blind?[['certainty','Gewaltfolgen und den Anspruch, Gottes Willen eindeutig zu kennen.'],['silence','Dass ohne Öffentlichkeit niemand die Forderungen hört.']]:[['oppression','Unterdrückung, ungerechte Ordnung und fehlende Veränderung.'],['instability','Die Unsicherheit eines offenen Konflikts.']]),'field'));
 }
 if(s==='three_reports'&&c.phase==='assessment'){
  if(c.step===5)return task('Handeln unter unsicherem Wissen','<p>Zusammenstoß und Verletzung sind belegt. Der erste Gewaltschlag und die Absichten aller bleiben offen. Hilfe darf nicht warten, bis jede Schuldfrage geklärt ist.</p>',act('Zum Gefangenen →','task-next','class="primary"'));
  return task('Was ist sicher, was bleibt offen?',`<p>${esc(reportFacts[c.step][1])}</p>`+opts([['certain','Das lässt sich sicher sagen.'],['uncertain','Das bleibt offen.']],'report'));
 }
 if(s==='internal_debate')return task(c.phase==='danger'?'Welches Argument wird gefährlich, wenn man es absolut setzt?':'Welches Argument überzeugt dich im Moment am meisten?',opts(debateArguments.map(([id,text])=>[id,text]),'debate',c.internalDebate[c.phase==='danger'?'mostDangerousAbsolute':'strongestArgument']),c.internalDebate[c.phase==='danger'?'mostDangerousAbsolute':'strongestArgument']?act('Meine Überlegung festhalten →','debate-next','class="primary"'):'<p>Wähle ein Argument; es gibt keine Musterlösung.</p>');
 if(s==='troops_approach')return task('Was wirst du jetzt tun?',`<p>Die Truppen nähern sich. Du kennst nicht alle Absichten. Eine Handlung kann Menschen schützen und zugleich einen anderen Weg erschweren.</p>`+opts(availableFinalActions(c),'final')+(c.limitsViolence?'<p>Deine frühere Grenze bleibt wirksam: Du kannst ausdrücklich zum Rückzug und zum Schutz auffordern.</p>':''));
 return '';
}
function workbench(){const c=state.chapter5,s=c.stage;if(state.dialogue||c.feedback)return '';
 let name,items,action,prompt,footer,selected;
 if(s==='theological_arguments'&&c.step===0&&!c.phase){name='theological_arguments_table';items=theologicalArguments.map(([id,title,help],i)=>[id,['Obrigkeit gehorchen','Gott mehr gehorchen','Nächstenliebe und Widerstand','Gottes Wille und eigener Wille'][i],help]);prompt='Vier Aussagen prüfen · In heutiger Sprache zusammengefasst';footer=act('Jede Aussage mit ihrer Grenze prüfen →','begin-arguments','class="primary"');}
 if(s==='three_reports'&&!c.phase){name='three_reports';items=reportTexts.map(([title,text],i)=>[String(i),title,text]);prompt='Drei Berichte · Erfundene Spielsituation';footer=act('Sicheres und Offenes unterscheiden →','reports-read','class="primary"');}
 if(s==='religion_functions'){name='religion_functions';items=religionFunctions;action='function';prompt=c.phase==='risk'?'Welche Funktion wird gefährlich, wenn sie absolut gesetzt wird?':'Welche zwei Funktionen waren besonders sichtbar?';selected=id=>c.phase==='risk'?c.religionFunctions.dangerousWhenAbsolute===id:c.religionFunctions.strongest.includes(id);footer=(c.phase==='risk'?!!c.religionFunctions.dangerousWhenAbsolute:c.religionFunctions.strongest.length===2)?act('Meine Überlegung festhalten →','functions-next','class="primary"'):`<p>${c.phase==='risk'?'Wähle eine Funktion.':'Wähle zwei Funktionen ('+c.religionFunctions.strongest.length+'/2).'}</p>`;}
 if(s==='luther_balance'){name='luther_four_thoughts';items=lutherThoughts;action='luther';prompt=c.phase==='tension'?'Welcher Gedanke erzeugt die größte Spannung?':'Welcher Gedanke hilft dir jetzt am meisten?';selected=id=>c.lutherTension[c.phase==='tension'?'tension':'helpful']===id;footer='<span class="ch5-source-kind">In heutiger Sprache zusammengefasst.</span>'+(c.lutherTension[c.phase==='tension'?'tension':'helpful']?act('Meine Überlegung festhalten →','luther-next','class="primary"'):'<p>Wähle einen Gedanken.</p>');}
 if(!name)return '';
 const a=staging.assets['ui_'+name];return `<section class="ch5-workspace" aria-label="${esc(prompt)}"><div class="ch5-work-title"><h1>${esc(prompt)}</h1></div><div class="ch5-work-sheet" data-work="${name}"><img src="${a.path}" alt="Historische Arbeitsfläche">${items.map(([id,title,text],i)=>{const r=a.textSafeArea[i],tag=action?'button':'article';return `<${tag} class="ch5-write-field" ${action?`type="button" data-action="ch5-${action}" data-item="${id}" aria-pressed="${selected(id)}"`:''} style="left:${r.x}%;top:${r.y}%;width:${r.width}%;height:${r.height}%"><strong>${esc(title)}</strong><p>${esc(text)}</p></${tag}>`;}).join('')}</div><div class="panel-actions ch5-work-controls">${footer}</div></section>`;
}
export function chapterFiveScene(header){const c=state.chapter5,s=c.stage,w=chapterFiveWorld(),bench=workbench();
 if(s==='freedom_after_action'||s==='end')return header+`<main class="game-layout chapter-five-layout recap-layout">${s==='end'&&c.recap.phase==='closing'?storyClosingView():storyRecapView()}</main>`;
 if(s==='chapter6')return header.replace('Kapitel 05','Kapitel 06').replace('Du musst handeln','Was bleibt von Freiheit?')+`<main class="game-layout chapter-five-layout recap-layout">${chapterSixTransition()}</main>`;
 if(s==='chapter6')header=header.replace('Kapitel 05','Kapitel 06').replace('Du musst handeln','Was bleibt von Freiheit?');
 if(s==='intro')return header+`<main class="game-layout chapter-five-layout ch5-intro"><section class="ch4-ending"><p class="eyebrow">Mai 1525</p><p>Was gestern noch eine Forderung war, ist heute eine Entscheidung.</p>${next('Den Weg aufnehmen →').replace('class="primary"','class="primary chapter-continue"')}</section></main>`;
 if(bench)return header+`<main class="game-layout chapter-five-layout ch5-learning">${bench}<footer class="game-footer"><span id="save-status"></span></footer></main>`;
 const p=panel(),n=chapterFiveNext(s),sign=!p&&n?hotspot('Weiter →','ch5-next',{kind:w.spec.hotspot.kind,classes:'ch4-hotspot',attrs:`style="left:${w.spec.hotspot.x}%;top:${w.spec.hotspot.y}%"`}):'';
 return header+`<main class="game-layout chapter-four-layout chapter-five-layout ${['end','chapter6'].includes(s)?'ch4-fade':''}"><section class="stage chapter-five" data-scene="${state.scene}" data-world="${w.room}">${worldHTML(w).replace('</div></div>','</div>'+sign+'</div>')}<div class="stage-caption"><h1>${esc(chapterFiveScenes.find(x=>x.id===state.scene).title)}</h1></div></section><div id="interaction" class="interaction" data-stage="${s}">${p}</div><footer class="game-footer"><span id="save-status"></span></footer></main>`;
}
export function fitChapterFiveScene(){
 const layout=document.querySelector('.chapter-five-layout');if(!layout)return;
 const sheet=layout.querySelector('.ch5-work-sheet');
 if(sheet){const rect=layout.getBoundingClientRect(),title=layout.querySelector('.ch5-work-title'),controls=layout.querySelector('.ch5-work-controls');const available=rect.height-title.offsetHeight-controls.offsetHeight-10;sheet.style.width=Math.min(rect.width-16,available*4/3,1200)+'px';return;}
 const room=layout.querySelector('.room'),stage=layout.querySelector('.stage'),p=layout.querySelector('.interaction>*');if(!room||!stage)return;
 const b=stage.getBoundingClientRect(),h=p?Math.max(100,p.getBoundingClientRect().top-b.top-8):b.height;room.style.width=Math.min(b.width,h*4/3)+'px';room.style.top=h/2+'px';
}
window.addEventListener('resize',fitChapterFiveScene);
