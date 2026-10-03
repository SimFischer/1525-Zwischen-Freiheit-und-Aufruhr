import { state, addUnique } from './state.js';
import { beginDialogue, advanceDialogue } from './dialogue-engine.js';
import { recordChoice } from './choice-engine.js';
import { syncConsequences } from './consequences.js';
import { chapterThreeChoices, chapterThreeDialogues, clusterReasons } from '../data/chapter-three.js';
import { openNotebook } from './notebook.js';
import { openArticles } from './chapter-three-documents.js';
import { notify } from './ui.js';
let hooks;
export function configureChapterThree(value){hooks=value;}
const c=()=>state.chapter3;
const go=id=>hooks.enterScene('ch3_'+id);
const talk=(lines,next)=>beginDialogue(lines,'chapter-three',next);
export function demandText(game=state){return chapterThreeChoices['ch3Demand_'+game.chapter3.entryFocus]?.options.find(o=>o.id===game.chapter3.demandChoice)?.text||'';}
export function priorRecall(game=state){
 const profile=game.chapter3.priorProfile, keys=['legal','community','resistance','prudence','theological'];
 const top=keys.reduce((best,key)=>(profile[key]||0)>(profile[best]||0)?key:best,keys[0]);
 if(!Object.values(profile).some(x=>x>0))return [{speaker:'anna',text:'Was wir im Dorf erlebt haben, steht jetzt neben den Erfahrungen anderer Gemeinden.'}];
 const first={legal:{speaker:'jakob',text:game.choices.forestResponse==='legal_basis'?'Du hast schon beim Wald zuerst gefragt, worauf ein Anspruch eigentlich beruht.':'Du hast schon im Dorf nach Begründungen und verbindlichen Regeln gefragt.'},community:{speaker:'anna',text:'Im Dorf wolltest du gemeinsam handeln.'},resistance:{speaker:'konrad',text:'Du hast bereits Widerspruch gewagt.'},prudence:{speaker:'peter',text:'Du hast bisher oft zuerst über die Folgen nachgedacht.'},theological:{speaker:'jakob',text:'Du hast schon in der Taverne gefragt, was christliche Freiheit bedeutet.'}};
 const second={legal:'Jetzt hast du ein ganzes Programm voller Begründungen vor dir.',community:'Jetzt versuchen ganze Gemeinden genau das.',resistance:'Die Frage ist nur, wie weit du diesmal gehen würdest.',prudence:'Vielleicht brauchen wir genau das jetzt.',theological:'Die Freiheit vor Gott ist damit nicht schon eine fertige politische Ordnung.'};
 return [first[top],{speaker:first[top].speaker,text:second[top]}];
}
// Compare the actual chosen proposal with the source, not a generic approval.
export const demandComparisons={
 labor:{
  A:'Artikel 6 verlangt Dienste nach dem früher vereinbarten Maß. Deine Forderung setzt allgemeiner auf vorher bekannte Grenzen.',
  B:'Artikel 7 schützt die Arbeit auf dem eigenen Hof: Zusätzliche Dienste sollen zur günstigen Zeit und ohne Nachteil verlangt werden. Dein Vorschlag gibt der eigenen Versorgung grundsätzlich Vorrang.',
  C:'Artikel 7 verlangt angemessene Vergütung für zusätzliche Dienste. Dein Vorschlag verlangt Entschädigung für alle verpflichtenden Dienste, also auch die schon vereinbarten.',
  D:'Artikel 6 will vereinbarte Dienste begrenzen; Artikel 7 regelt zusätzliche Arbeit. Du verlangst dagegen die vollständige Aufhebung der Frondienste.'},
 rights:{
  A:'Artikel 5 verlangt die Rückgabe angeeigneter Gemeindewälder, nimmt rechtmäßige Erwerbungen aber aus. Deine Forderung nach früheren Rechten lässt diese Prüfung noch offen.',
  B:'Artikel 5 will Gemeindewälder unter die Verfügung der Gemeinde stellen. Du willst die Nutzung zwischen Herrschaft und Gemeinde neu vereinbaren.',
  C:'Artikel 5 verlangt die Rückgabe angeeigneter Gemeindewälder. Deine Forderung macht den Zugang von einer festgelegten Abgabe abhängig; das ist eine zusätzliche Bedingung.',
  D:'Artikel 4 und 5 behandeln Gewässer und Wälder; Artikel 10 fordert Gemeindeland zurück. Du bündelst diese Bereiche grundsätzlich. Die Artikel verlangen bei rechtmäßigen Erwerbungen eine besondere Prüfung.'},
 church:{
  A:'Artikel 1 verlangt ebenfalls Wahl und Absetzung durch die ganze Gemeinde. Dazu nennt er einen Maßstab: die unverfälschte Predigt des Evangeliums.',
  B:'Artikel 1 überträgt Wahl und Absetzung der ganzen Gemeinde. Dein Vorschlag lässt der Herrschaft die Einsetzung, verlangt aber die Zustimmung der Gemeinde.',
  C:'Artikel 1 verbindet die Predigt des Evangeliums mit dem konkreten Recht, den Pfarrer zu wählen und abzusetzen. Deine Kriterien lassen noch offen, wer die Auswahl verbindlich trifft.',
  D:'Artikel 1 fordert die Wahl und Absetzung des Pfarrers durch die Gemeinde. Du schließt die Herrschaft dagegen von allen geistlichen Ämtern aus und gehst damit über diesen Artikel hinaus.'}
};
export function comparisonOptions(game=state){
 const f=game.chapter3.entryFocus,d=game.chapter3.demandChoice;
 const common=f==='labor'?['Verfügung über die eigene Arbeitszeit begrenzen','Dienste an nachvollziehbare Bedingungen binden']:f==='rights'?['Zugang zu gemeinschaftlichen Nutzungen sichern','Über Ansprüche an Wald und Land entscheiden']:['Einfluss der Gemeinde auf die Predigt stärken','Geistliche Verantwortung begründen'];
 const differences=['Die Artikel begründen ihr gemeinsames Programm ausdrücklich mit dem Evangelium.',demandComparisons[f]?.[d]||'Die Reichweite der Forderungen prüfen.'];
 return {common,differences};
}
export function prepareChapterThreeState(game,scene){
 const talk=(id,next)=>{game.dialogue={lines:structuredClone(typeof id==='string'?chapterThreeDialogues[id]:id),index:0,after:'chapter-three',context:next};};
 const choose=id=>{game.interaction={kind:'choice',id};};
 game.chapter=3;game.notebook.unlocked=true;game.chapter3.stage=scene.id.slice(4);syncConsequences(game);
 if(!Object.keys(game.chapter3.priorProfile).length){
  // Snapshot only earlier decisions; Chapter 3 never changes its own memory.
  const prior=structuredClone(game);for(const id of Object.keys(chapterThreeChoices))delete prior.choices[id];syncConsequences(prior);game.chapter3.priorProfile={...prior.orientation};
 }
 const stage=game.chapter3.stage;
 const dialogs={road:['ch3Road','road-ready'],arrivals:['ch3Arrivals','memory'],hinge:['ch3Hinge','workshop'],voices:['ch3Voices','religion'],news:['ch3News','end']};
 if(dialogs[stage])talk(...dialogs[stage]);
 if(stage==='entry')choose('ch3EntryFocus');
 if(stage==='demand')choose('ch3Demand_'+game.chapter3.entryFocus);
 if(stage==='religion')choose('ch3Religion');
 if(stage==='print')choose('ch3Print');
 if(stage==='resistance')choose('ch3Resistance');
 if(stage==='reason')choose('ch3Reason');
 if(stage==='lotzer')talk([{speaker:'lotzer',emotion:'talking',text:'Genau hier liegt das Problem.'},{speaker:'lotzer',text:'Wenn jedes Dorf nur seinen eigenen Streit aufschreibt, haben wir am Ende hundert Klagen.'},{speaker:'lotzer',text:'Eine gemeinsame Forderung muss mehrere Erfahrungen verbinden.'},...(game.choices.playerDemand?[{speaker:'player',text:game.choices.playerDemand}]:[]),{speaker:'lotzer',text:'Eure Forderung ist ein Anfang. Jetzt müssen wir sehen, ob andere Gemeinden darin ihre Lage wiedererkennen.'}],'demand');
 if(stage==='articles')talk('ch3Articles','read-articles');
 if(stage==='printshop'){
  const recall={distinction:'Du wolltest Freiheit vor Gott und politische Freiheit zunächst unterscheiden. Wie soll das auf dem Blatt sichtbar bleiben?',critical_gospel:'Du willst gesellschaftliche Verhältnisse am Evangelium prüfen. Welche Begründung sollen die Leser mitnehmen?',worldly_transformation:'Du willst, dass Glauben sichtbar etwas verändert. Welche Worte tragen diesen Anspruch?',hermeneutical_caution:'Du fragst nach der Prüfung religiöser Begründungen. Geben wir den Lesern genug, um selbst zu prüfen?'};
  talk([...chapterThreeDialogues.ch3Printer,{speaker:'jakob',text:recall[game.chapter3.religiousInterpretation]||'Was sollen die Leser zuerst erfahren?'}],'print');
 }
 if(stage==='return'){
  const texts={full:[['peter','Da steht mehr drin, als manche erzählen.']],summary:[['konrad','Jetzt versteht jeder sofort, worum es geht.'],['jakob','Oder glaubt es zumindest.']],religious:[['anna','Dann müssen wir auch erklären können, warum wir das Evangelium so verstehen.']],accusation:[['peter','Solche Worte finden schnell Zuhörer.'],['jakob','Und manchmal schneller Gegner.']]};
  talk([...texts[game.chapter3.printStrategy||'full'].map(([speaker,text])=>({speaker,text})),...priorRecall(game),{speaker:'konrad',text:'Und wenn der Herr einfach Nein sagt?'}],'resistance');
 }
 if(stage==='news'){
  const callbacks={negotiate:{speaker:'peter',text:'Du willst weiter verhandeln. Nun müssen wir jemanden finden, der unsere Forderungen auch anhört.'},collective_pressure:{speaker:'anna',text:'Du willst gemeinsam Druck aufbauen. Dann müssen wir die anderen Gemeinden zusammenhalten.'},open_resistance_possible:{speaker:'konrad',text:'Du schließt offenen Widerstand nicht aus. Was tun wir, wenn das Nein kommt?'},theological_clarification:{speaker:'jakob',text:'Du willst die religiöse Rechtfertigung zuerst klären. Die gedruckten Worte warten nicht, bis wir uns einig sind.'}};
  if(callbacks[game.chapter3.resistanceStrategy])game.dialogue.lines.push(callbacks[game.chapter3.resistanceStrategy]);
 }
 if(stage==='end'){game.chapter3.completed=true;addUnique(game.progress.completedScenes,scene.id);}
}
export function prepareChapterThree(scene){prepareChapterThreeState(state,scene);}
export function chapterThreeAction(action,target){
 if(action==='ch3-start'){go('road');return true;}
 if(state.chapter!==3)return false;
 if(action==='dialogue-next'){
  const result=advanceDialogue();if(result){
   if(result.context==='road-ready'){c().stage='road';}
   else if(result.context==='read-articles'){state.interaction=null;c().stage='articles';}
   else if(result.context==='hub')go('hub');
   else go(result.context);
  }return true;
 }
 if(action==='choose'){
  const id=target.dataset.choice;if(!chapterThreeChoices[id])return false;
  const option=recordChoice(id,target.dataset.option);if(!option)return true;
  const next={ch3EntryFocus:'clusters',ch3Religion:'printshop',ch3Print:'press',ch3Resistance:'reason',ch3Reason:'news'}[id]||'articles';
  talk(option.reaction,next);state.interaction=null;return true;
 }
 if(action==='ch3-go'){go(target.dataset.scene);return true;}
 if(action==='ch3-arrivals'){if(c().entryFocus)talk([{speaker:'georg',text:'Unsere Beschwerden stehen auf dem Tisch. Jetzt müssen wir gemeinsam formulieren.'}],'hub');else go('arrivals');return true;}
 if(action==='ch3-assembly'){if(!c().entryFocus){talk([{speaker:'lotzer',text:'Hör zuerst die Leute auf dem Platz an. Wir müssen wissen, was ihre Gemeinden bedrückt.'}],'hub');}else go(c().demandChoice?'compare':'clusters');return true;}
 if(action==='ch3-printer'){if(!c().religiousInterpretation)talk([{speaker:'printer',text:'Noch gibt es nichts zu vervielfältigen.'},{speaker:'printer',text:'Erst müsst ihr euch einigen, was überhaupt auf das Papier soll.'}],'hub');else go('printshop');return true;}
 if(action==='ch3-memory'){openNotebook('memmingen');return true;}
 if(action==='ch3-card'){chapterThreeSelect(target.dataset.card);return true;}
 if(action==='ch3-cluster'){
  if(c().pair.length<2)return true;
  const cards=[...c().pair].sort(),reason=target.dataset.reason;
  if(!clusterReasons[reason])return true;
  if(!c().complaintClusters.some(x=>x.reason===reason&&JSON.stringify(x.cards)===JSON.stringify(cards)))c().complaintClusters.push({cards,reason});
  c().pair=[];c().clusterFeedback='Diese Verbindung lässt sich begründen: '+clusterReasons[reason]+'. Prüfe jetzt, welche konkrete Forderung mehrere Gemeinden darin wiedererkennen könnten.';return true;
 }
 if(action==='ch3-document'){
  openArticles(false,()=>{hooks.render();hooks.persist();},()=>go('compare'));return true;
 }
 if(action==='ch3-compare'){
  const {group,index}=target.dataset;const options=comparisonOptions();const list=group==='common'?options.common:options.differences;
  if(!list[Number(index)])return true;c().articleComparison[group]=list[Number(index)];return true;
 }
 if(action==='ch3-comparison-next'){
  const d=c().demandChoice,f=c().entryFocus;
  const text=demandComparisons[f]?.[d]||'Welche Rechte und Grenzen nennt der Artikel genau?';
  talk([{speaker:'player',text:'Als Gemeinsamkeit sehe ich: '+c().articleComparison.common+' Als Unterschied: '+c().articleComparison.differences},{speaker:'lotzer',text},{speaker:'jakob',text:'Den Blick auf das Evangelium dürfen wir bei diesem Vergleich nicht übergehen.'}],'hinge');return true;
 }
 if(action==='ch3-interpret'){
  const id=target.dataset.item;if(c().interpretations.includes(id))c().interpretations=c().interpretations.filter(x=>x!==id);else c().interpretations.push(id);return true;
 }
 if(action==='ch3-workshop-next'){
  const a=c().interpretations;
  const text=a.includes('D')?'Diese Deutung zieht aus christlicher Freiheit eine sehr weitreichende politische Folgerung. Die Zwölf Artikel selbst gehen diesen Schritt nicht vollständig: Sie berufen sich auf Freiheit und halten zugleich daran fest, dass Obrigkeit bestehen kann.':a.includes('A')&&a.includes('C')?'Ihr verbindet die gemeinsame Erlösung mit der Verantwortung für den Nächsten. So lässt sich die Behandlung von Menschen wie Eigentum kritisieren; daraus entsteht noch keine fertige Ordnung.':a.includes('B')&&a.includes('C')?'Die Freiheit vor Gott und die Prüfung gesellschaftlicher Verhältnisse stehen in einer tragfähigen Spannung. Die eine ersetzt die andere nicht.':'Ihr haltet eine produktive Spannung fest: Erlösung kann Kritik an Abhängigkeit tragen, ohne automatisch eine bestimmte politische Ordnung festzulegen.';
  talk([{speaker:'jakob',text}],'voices');return true;
 }
 if(action==='ch3-print-piece'){chapterThreeSelect(target.dataset.card);return true;}
 if(action==='ch3-print-place'){chapterThreeDrop(target.dataset.card||c().selected,target.dataset.zone);return true;}
 if(action==='ch3-press'){
  if(c().printPhase==='press'){
   c().printPhase='remove';c().pressed=true;
   // Presentation-only motion; canonical phase is persisted immediately.
   const game=c();setTimeout(()=>{game.pressed=false;if(c()===game&&state.scene==='ch3_press')hooks.render();},750);
  }return true;
 }
 if(action==='ch3-map-next'){go('return');return true;}
 return false;
}
export function chapterThreeSelect(id){
 if(state.scene==='ch3_clusters'){
  if(!/^[0-7]$/.test(id))return;
  if(c().pair.includes(id))c().pair=c().pair.filter(x=>x!==id);else c().pair.push(id);
 }else c().selected=c().selected===id?null:id;
}
export function chapterThreeDrop(id,zone){
 if(state.scene==='ch3_clusters'){if(/^[0-7]$/.test(id)&&/^[0-7]$/.test(zone)&&id!==zone)c().pair=[...new Set([...c().pair,id,zone])];return;}
 if(state.scene!=='ch3_press')return;
 const phase=c().printPhase;
 const expected={ink:['ink','bed','paper'],paper:['paper','bed','form'],form:['form','bed','press'],remove:['finished','take','copying']}[phase];
 if(!expected||id!==expected[0]||zone!==expected[1]){notify('An der Presse: '+{ink:'Die Form braucht zuerst Farbe.',paper:'Lege Papier auf die eingefärbte Form.',form:'Bringe Form und Papier in die Presse.',press:'Betätige den Hebel.',remove:'Nimm den fertigen Bogen heraus.'}[phase]);return;}
 c().printPhase=expected[2];c().selected=null;
 if(phase==='remove'){c().printed=1;c().pressed=false;}
}
let copyTimer=null,copyOwner=null;
export function resumeChapterThreePrinting(){
 const game=c();
 if(!hooks.active()||state.scene!=='ch3_press'||game.printPhase!=='copying')return;
 if(copyTimer&&copyOwner===game)return;
 if(copyTimer)clearTimeout(copyTimer);
 copyOwner=game;
 game.pressed=true;
 copyTimer=setTimeout(()=>{
  copyTimer=null;
  if(!hooks.active()||c()!==game||state.scene!=='ch3_press'||game.printPhase!=='copying')return;
  game.printed++;game.pressed=false;
  if(game.printed>=4){game.printPhase='done';addUnique(state.minigames.completed,'ch3Print');}
  hooks.persist();hooks.render();
 },1700);
}
