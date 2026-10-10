import {hotspot} from '../../../js/hotspots.js';
const m=await fetch('../../../chapter6_assets_manifest.json').then(r=>r.json());
const assets=Object.fromEntries(m.assets.map(a=>[a.id,a]));
const extra=Object.fromEntries(m.reusedAssets.map(a=>[a.path,a]));
const stage=document.querySelector('#stage'),actions=document.querySelector('#actions');
const scene=new URLSearchParams(location.search).get('scene')||'entry';
document.body.dataset.scene=scene;
const path=p=>'../../../'+p;
const box=(x,y,w,h)=>'left:'+x+'%;top:'+y+'%;width:'+w+'%;height:'+h+'%';
const img=(p,cls='underlay',style='')=>'<img alt="" class="'+cls+'" src="'+path(p)+'" style="'+style+'">';
const base=id=>{stage.innerHTML=img(assets[id].path,'base');};
function under(id){stage.insertAdjacentHTML('beforeend',img(assets[id].path));}
function field(x,y,w,h,html,cls='',tag='section'){
 stage.insertAdjacentHTML('beforeend','<'+tag+' class="field '+cls+'" style="'+box(x,y,w,h)+'" '+(tag==='button'?'type="button" aria-pressed="false"':'')+'>'+html+'</'+tag+'>');
}
function pair(id,left,right){base('bg_reflection_room');under(id);const a=assets[id].textSafeArea;for(const [i,t]of [left,right].entries())field(a[i].x,a[i].y,a[i].width,a[i].height,t);}
function prop(id,x,y,w,squash=1){
 const a=assets[id]||extra[id],b=a.alphaBounds,s=w/(b.right-b.left),iw=a.dimensions.width*s,ih=iw*a.dimensions.height/a.dimensions.width*1024/768;
 const cx=(b.left+b.right)/2/a.dimensions.width,cy=(b.top+b.bottom)/2/a.dimensions.height;
 stage.insertAdjacentHTML('beforeend',img(a.path,'prop','left:'+(x-cx*iw)+'%;top:'+(y-cy*ih)+'%;width:'+iw+'%;height:'+ih+'%;transform:scaleY('+squash+')'));
}
function roomMemory(p,x,y,w=9){
 stage.insertAdjacentHTML('beforeend','<div class="room-memory" style="'+box(x-w/2,y-w*0.75/2,w,w*.75)+'">'+img(p,'picture')+img(assets.ui_memory_frame.path,'frame')+'</div>');
}
function markers(list){stage.classList.add('room');for(const [label,x,y,w]of list)stage.insertAdjacentHTML('beforeend',hotspot(label,'qa-open',{kind:'object',classes:'hotspot-sign',attrs:'style="'+box(x,y,w,9)+'"'}));}
const paragraph=t=>'<p>'+t+'</p>';
const head=t=>'<h2>'+t+'</h2>';
const titles={entry:'Die Ereignisse liegen hinter dir',reflection:'Dein Weg, Quellen und Gegenpositionen',freedom:'Freiheit: zu Beginn und heute',network:'Christliche Freiheit in Beziehungen',luther:'Luther 1520 und 1525',memory:'Erinnerungen werden zu Belegen',comparison:'Luther und Müntzer',judgment:'Welche Quellen tragen dein Urteil?',dimensions:'Drei verschiedene Prüfbereiche',interpretation:'Wie deutest du die Spannung?',position:'Deine begründete Position',writing:'Belege, Gegenargument und Urteil',personal:'Mein Urteil über Luther und christliche Freiheit',final:'Was heißt frei?',evidence:'Was stützt mein Urteil – was fordert es heraus?',notebook:'Dein vertrautes Notizbuch',folders:'Quellen in der geöffneten Mappe'};
document.querySelector('#title').textContent=titles[scene]||scene;
if(['entry','reflection','judgment'].includes(scene)){
 base('bg_reflection_room');
 if(scene==='entry'){prop('prop_personal_notebook_closed',22,55,16,.6);markers([['Mein Notizbuch',13,34,19]]);stage.insertAdjacentHTML('beforeend','<p class="room-caption">Die Ereignisse liegen hinter dir. Jetzt werden deine Entscheidungen und die Quellen zum Gegenstand deines Urteils.</p>');}
 if(scene==='reflection'){
  prop('prop_personal_notebook_closed',17,55,13,.6);
  prop('assets/chapter4/documents/ch4_doc_luther_freedom_small.png',37,50,10,.38);
  prop('assets/chapter4/documents/ch4_doc_harsh_text_closed.png',51,50,10,.38);
  prop('assets/chapter5/props/ch5_prop_bible_council.png',65,49,13);
  prop('prop_muentzer_folder_closed',79,55,12);
  for(const [i,p]of ['assets/chapter2/backgrounds/ch2_bg_forest_edge_path.png','assets/chapter3/backgrounds/ch3_bg_memmingen_assembly.png','assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png'].entries())roomMemory(p,32+14*i,60);
  markers([['Mein Weg',9,33,18],['Luthers Schriften',36,33,25],['Gegenpositionen',69,33,23]]);
 }
 if(scene==='judgment'){
  prop('prop_personal_notebook_closed',17,57,13,.6);
  const docs=['luther_freedom_small','worldly_authority_small','ermahnung_closed','harsh_text_closed','muentzer_context_closed'];
  for(const [i,d]of docs.entries())prop('assets/chapter4/documents/ch4_doc_'+d+'.png',34+12*i,54,9,.4);
  markers([['Quellen prüfen',35,34,26]]);
  stage.insertAdjacentHTML('beforeend','<p class="room-caption">Eine theologisch verständliche Begründung beantwortet noch nicht die Frage nach der ethischen Verantwortbarkeit ihrer Folgen.</p>');
 }
}
if(scene==='freedom')pair('ui_freedom_then_now',head('Zu Beginn')+paragraph('Freiheit hieß für mich zuerst, dass niemand über mein Leben bestimmen sollte. Die Forderungen des Dorfes schienen mir ein Schritt zu dieser Freiheit.')+paragraph('Ich verband Luthers Worte vor allem mit äußeren Rechten.'),head('Heute')+paragraph('Ich unterscheide Freiheit vor Gott und äußere Freiheit deutlicher. Nächstenliebe verlangt Verantwortung auch für Menschen, die meine Ziele nicht teilen.')+paragraph('Offen bleibt, wann Widerstand diese Verantwortung wahrt.'));
if(scene==='network'){
 base('ui_theological_network_table');
 const nodes=[['Christliche Freiheit',40,46,20,14],['Rechtfertigung',20,29,26,12],['Nächstenliebe',57,29,26,12],['Gewissen',9,46,23,12],['Obrigkeit',69,46,23,12],['Widerstand',15,65,23,12],['Gewalt',42,67,16,12],['Verantwortung',63,65,25,12]];
 const centers=nodes.map(n=>[n[1]+n[3]/2,n[2]+n[4]/2]);
 let svg='<svg class="links" viewBox="0 0 1000 750" aria-label="Sieben veränderbare Verbindungen">';
 for(const [x,y]of centers.slice(1))svg+='<path d="M500 397 Q'+(x*10+500)/2+' '+(y*7.5+397)/2+' '+x*10+' '+y*7.5+'"/>';
 stage.insertAdjacentHTML('beforeend',svg+'</svg>');
 for(const [label,x,y,w,h]of nodes)stage.insertAdjacentHTML('beforeend','<button type="button" class="paper-marker node" aria-pressed="false" style="'+box(x,y,w,h)+'">'+label+'</button>');
}
if(scene==='luther'){
 pair('ui_luther_1520_1525',head('1520 · Freiheit')+paragraph('Freiheit vor Gott wird durch Glauben geschenkt. Sie macht frei zum Dienst am Nächsten.')+'<blockquote>Eyn Christen mensch ist eyn freyer herr / uͤber alle ding / vnd niemandt vnterthan.</blockquote>'+paragraph('<span class="source">Freiheitsschrift · § 1 · Originalwortlaut</span>'),head('1525 · Bauernkrieg')+paragraph('Luther unterscheidet berechtigte Forderungen und ihre gewaltsame Durchsetzung.')+'<blockquote>Drumb sol hie zuschmeyssen, wurgen und stechen heymlich odder offentlich, wer da kann […]</blockquote>'+paragraph('<span class="source">Wider die Rotten · kurzer Originalausschnitt</span>'));
 field(5,89,90,7,'Wie passen Freiheit und Gewaltforderung zusammen?','question');
 actions.innerHTML=['Kontinuität','Spannung','Widerspruch'].map(t=>'<button type="button" aria-pressed="false">'+t+'</button>').join('');
}
if(scene==='memory'){
 base('ui_memory_evidence_table');
 const pictures=['assets/chapter2/backgrounds/ch2_bg_forest_edge_path.png','assets/chapter3/backgrounds/ch3_bg_memmingen_assembly.png','assets/chapter4/backgrounds/ch4_bg_village_consequence_hub.png','assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png'],labels=['Wald und Rechte','Zwölf Artikel','Ordnung/Widerstand','Handeln und Folgen'];
 assets.ui_memory_evidence_table.imageWindows.forEach((b,i)=>{stage.insertAdjacentHTML('beforeend',img(pictures[i],'memory-image',box(b.x,b.y,b.width,b.height)));const c=assets.ui_memory_evidence_table.textSafeArea[i];field(c.x,c.y,c.width,c.height,labels[i],'memory-caption');});
}
if(scene==='comparison')pair('ui_luther_muentzer_comparison',head('Luther')+paragraph('Freiheit vor Gott ist nicht mit der Abschaffung äußerer Pflichten identisch. Obrigkeit soll das Zusammenleben schützen; Gewissen und Glaube entziehen sich ihrem Zwang.')+paragraph('Wie lässt sich diese Grenze mit dem scharfen Eingreifen von 1525 verbinden?'),head('Müntzer')+paragraph('Glaube und die Veränderung gottwidriger Verhältnisse hängen enger zusammen. Ungerechte Herrschaft kann ihren Anspruch auf Gehorsam verlieren.')+paragraph('Wie lässt sich der Anspruch prüfen, Gottes Willen für eine politische Handlung zu erkennen?'));
if(['dimensions','interpretation'].includes(scene)){
 base('bg_reflection_room');under('ui_judgment_dimensions');
 const data=scene==='dimensions'?[['Theologische Folgerichtigkeit','Passt die Position zu Rechtfertigung, Freiheit und Nächstenliebe?'],['Historische Einordnung','Welche Lage, Konflikte und Handlungsmöglichkeiten prägen das Urteil von 1525?'],['Ethische Verantwortbarkeit','Welche Gewalt und welche Folgen für andere werden durch die Position ermöglicht?']]:[['Kontinuität','Eine frühere Unterscheidung bleibt im neuen Konflikt leitend.'],['Spannung','Grundgedanken bleiben erkennbar, geraten aber unter Druck.'],['Widerspruch','Die spätere Forderung lässt sich mit einem früheren Anspruch nicht vereinbaren.']];
 assets.ui_judgment_dimensions.textSafeArea.forEach((b,i)=>field(b.x,b.y,b.width,b.height,head(data[i][0])+paragraph(data[i][1]),'small-heading'));
}
if(scene==='position'){
 document.querySelector('#title').textContent='Wie beurteilst du Luthers Haltung im Bauernkrieg?';
 base('bg_reflection_room');under('ui_final_position');
 const labels=['Weitgehend konsequent','Theologisch nachvollziehbar, aber ethisch problematisch','Deutliche Spannung','Wesentlicher Widerspruch','Keine der Einordnungen reicht aus'];
 assets.ui_final_position.textSafeArea.forEach((b,i)=>field(b.x,b.y,b.width,b.height,labels[i],'selection','button'));
}
if(scene==='writing'||scene==='personal'){
 base('bg_reflection_room');under('ui_final_judgment_writing');
 const data=scene==='writing'?[
 ['Freiheit 1520','Der Glaube macht frei zum Dienst am Nächsten.'],
 ['Obrigkeit 1523','Äußere Ordnung und Gewissen bleiben zu unterscheiden.'],
 ['Bauernkrieg 1525','Luthers scharfe Forderung kann Gewalt legitimieren.'],
 ['Gegenargument','Er fürchtet den Zusammenbruch schützender Ordnung.'],
 ['Mein Urteil','Ich erkenne theologische Kontinuität und ethische Spannung.'],
 ['Historische Lage','Die Eskalation erklärt die Härte, rechtfertigt sie aber nicht schon.'],
 ['Verantwortung','Auch Gegner und Unbeteiligte bleiben Nächste.'],
 ['Offene Frage','Wie kann Widerstand Unrecht bekämpfen und andere schützen?']
 ]:[
 ['Offene Frage','Wann ist Widerstand gegen ungerechte Herrschaft legitim?'],
 ['Zu Beginn','Freiheit bedeutete für mich vor allem äußere Rechte.'],
 ['Heute','Freiheit vor Gott befähigt zur Verantwortung für andere.'],
 ['Zentraler Konflikt','Schutz vor Unrecht und Schutz vor Gewalt geraten in Spannung.'],
 ['Lutherurteil','Theologisch nachvollziehbar, aber ethisch problematisch.'],
 ['Belege','Freiheit 1520, Obrigkeit 1523 und die schärfere Schrift 1525.'],
 ['Gegenargument','Eine schützende Ordnung braucht Grenzen gewaltsamen Handelns.'],
 ['Abschließender Satz','Christliche Freiheit entbindet mich nicht von Verantwortung.']
 ];
 const b=assets.ui_final_judgment_writing.textSafeArea[0];
 field(b.x,b.y,b.width,b.height,head(scene==='writing'?'Mein begründetes Urteil':'Mein Urteil über christliche Freiheit')+data.map(([h,t])=>paragraph('<strong>'+h+':</strong> '+t)).join(''),'writing '+(scene==='personal'?'personal':''));
}
if(scene==='evidence')pair('ui_evidence_pro_contra',head('Stützt mein Urteil')+paragraph('Luther unterscheidet die Freiheit vor Gott von politischen Forderungen. Diese Unterscheidung bleibt auch 1525 erkennbar.')+paragraph('Im Spiel zeigte sich: Eine berechtigte Forderung entscheidet noch nicht über ihre Mittel.'),head('Stellt es infrage')+paragraph('Nächstenliebe richtet sich auch an den Gegner. Die scharfe Schrift kann Gewalt gegen Menschen legitimieren.')+paragraph('Wie weit reicht Verantwortung für Folgen, die nicht beabsichtigt waren?'));
if(scene==='notebook'){
 base('bg_reflection_room');under('prop_personal_notebook_open');
 const [l,r]=assets.prop_personal_notebook_open.textSafeArea;
 field(l.x,l.y,l.width,l.height,head('Mein Weg')+paragraph('Die Freiheit vor Gott und das Leben im Dorf blieben in Spannung.'));
 field(r.x,r.y,r.width,r.height,head('Meine Frage')+paragraph('Wie kann verantwortliches Handeln unter Unsicherheit gelingen?'));
}
if(scene==='folders'){
 base('bg_reflection_room');under('prop_luther_folder_open');
 const a=assets.prop_luther_folder_open.textSafeArea;
 field(a[0].x,a[0].y,a[0].width,a[0].height,head('Luther')+paragraph('Freiheit · Obrigkeit · Bauernkrieg'));
 field(a[1].x,a[1].y,a[1].width,a[1].height,head('Müntzer')+paragraph('Glaube · Herrschaft · Widerstand'));
}
if(scene==='prop_plane'){
 base('bg_reflection_room');prop('prop_personal_notebook_open',26,55,20);prop('prop_luther_folder_open',56,55,24);prop('assets/chapter5/props/ch5_prop_bible_council.png',79,56,13);
 document.querySelector('#title').textContent='Notizbuch, Quellenmappe und Bibel auf derselben Tischfläche';
}
if(scene==='final'){
 base('bg_final_question');under('ui_final_book');
 const a=assets.ui_final_book.textSafeArea;
 field(a[0].x,a[0].y,a[0].width,a[0].height,head('Zu Beginn')+paragraph('Freiheit hieß für mich, über mein Leben selbst bestimmen zu können.'));
 field(a[1].x,a[1].y,a[1].width,a[1].height,head('Heute')+paragraph('Freiheit vor Gott eröffnet Verantwortung. Wie ich für andere handle, bleibt meine Aufgabe.'));
 actions.innerHTML='<p class="hint">Was bleibt von christlicher Freiheit, wenn sie auf Unrecht, Gewalt und Verantwortung trifft?</p>';
}
if(!actions.innerHTML)actions.innerHTML='<button type="button" class="chapter-continue">Weiter prüfen</button>';
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.hasAttribute('aria-pressed')){if(b.classList.contains('selection'))for(const o of document.querySelectorAll('.selection'))o.setAttribute('aria-pressed','false');b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='true'?'false':'true');}else if(b.dataset.action==='qa-open')b.dataset.visited='true';});
await Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise((resolve,reject)=>{i.onload=resolve;i.onerror=reject;})));
window.qaReady=true;window.qaManifest=m;window.qaScene=scene;
