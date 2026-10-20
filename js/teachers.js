import {button,openOverlay,closeOverlay} from './ui.js';
import {isTestMode} from './save-system.js';
let backToAdmin=()=>{},currentPage=0;
export function configureTeachers(back){backToAdmin=back;}
const pageTitles=['Schnellstart und Unterrichtsüberblick','Wenn etwas hakt','Fachliche Orientierung'];
const chapters=['Freiheit','Belastungen','Forderungen','Widerstand','Handeln','Urteil'];
const stops=[
 ['Freiheit verstehen','Nach Kapitel 1, wenn die meisten die Freiheitsaufgabe bearbeitet haben.','Was bedeutet Freiheit bei Luther – und was gerade nicht?','Aktuelle Aufgabe beenden lassen; Schnellere pausieren am Kapitelübergang.'],
 ['Belastungen bündeln','Nach Wald, Frondienst und Abgaben, vor den gemeinsamen Forderungen.','Wann wird aus einer Beschwerde eine politische Forderung?','Offene Stationen später fortsetzen; Fertige bringen ein Beispiel ins Plenum ein.'],
 ['Forderungen begründen','Wenn die meisten zentrale Artikel mit Beschwerden verglichen haben.','Was verändert sich, wenn Forderungen religiös begründet werden?','Abschnitt fertig lesen lassen; Schnellere wählen einen Beleg für die Diskussion.'],
 ['Widerstand prüfen','Nach Luther/Müntzer oder der Widerstandsfrage.','Wo unterscheiden sich ihre Vorstellungen von Widerstand?','An der nächsten Entscheidung pausieren oder am Stundenende gemeinsam sichern.'],
 ['Zum Urteil kommen','Vor dem Schlussurteil in Kapitel 6.','Ist Luther konsequent oder widersprüchlich – und welcher Beleg trägt dein Urteil?','Vorläufige Standpunkte und fertige Urteile gemeinsam diskutieren.']
];
const problems=[
 ['Eine Fachaufgabe blockiert.','Nutzen Sie die gestuften Hinweise. Nach mehreren Versuchen erklärt das Spiel die Lösung. Entscheidungen bleiben offen.'],
 ['Auf einem anderen Gerät fortsetzen.','Wählen Sie im Spielmenü „Spielstand sichern“. Bewahren Sie den Code auf und laden Sie ihn am Zielgerät mit „Mit Code fortsetzen“.'],
 ['Code vergessen oder ungültig.','Prüfen Sie Eingabe und Verbindung. Ist der lokale Stand noch vorhanden, erzeugen Sie dort einen neuen Code.'],
 ['Eine Szene im Plenum zeigen.','Öffnen Sie im Lehrkraftmodus das Kapitel und wählen Sie „Szene zeigen“. Nötige Voraussetzungen werden vorbereitet.'],
 ['Aktuelle Aufgabe erneut testen.','Wählen Sie „Aktuelle Aufgabe zurücksetzen“. Das setzt nur die Aufgabe im getrennten Teststand zurück.'],
 ['Aktuelles Kapitel erneut testen.','Wählen Sie „Aktuelles Kapitel zurücksetzen“. Der normale Schülerstand bleibt erhalten.'],
 ['Testpfad oder Endzustand öffnen.','Öffnen Sie „Pfade, Endtafeln und Rückblick zeigen“. Wählen Sie einen vorbereiteten Pfad oder Ausgang.'],
 ['Rückblick öffnen.','Wählen Sie im Vorführbereich „Rückblick ab …“ und das gewünschte Kapitel.'],
 ['Kapitel 6 öffnen.','Wechseln Sie zum Register Kapitel 6 und springen Sie zum Einstieg oder Schlussurteil.'],
 ['Dossier / PDF öffnen.','Exportieren Sie das Dossier am Spielende. Im Lehrkraftmodus öffnet „Dossier / PDF vorführen“ einen Stand mit Beispielantworten.'],
 ['Gesamten Spielstand zurücksetzen.','Wählen Sie für Tests „Gesamten Test-Spielstand zurücksetzen“. Für den Schülerstand erst den Testmodus verlassen, dann auf der Startseite zurücksetzen. Beide vollständigen Resets fragen nach.'],
 ['Seite hängt / Browserproblem.','Verlassen Sie Vollbild oder laden Sie neu. Nutzen Sie denselben Browser; löschen Sie keine Browserdaten. Bei Code-Problemen auch die Internetverbindung prüfen.']
];
const termClusters=[
 ['Freiheit','teacher-tone-subject',[
  ['Rechtfertigung',['Der Mensch wird vor Gott aus Gnade gerecht, nicht durch eigene Leistung oder Werke.','Gute Werke folgen aus dem Glauben; sie verdienen Gottes Annahme nicht. Diese Entlastung trägt Luthers Freiheitsverständnis.']],
  ['Christliche Freiheit',['Sie bezeichnet zuerst Freiheit vor Gott, keine bloße politische Unabhängigkeit.','Wer Gottes Annahme nicht verdienen muss, wird frei zum Dienst am Nächsten. Äußere Pflichten sind damit nicht automatisch aufgehoben.']],
  ['Nächstenliebe',['Der Dienst am Nächsten ist eine Konsequenz christlicher Freiheit.','Er begrenzt eigenes Handeln: Auch Gegner und die von Gewalt Betroffenen dürfen nicht aus dem Blick geraten.']]
 ]],
 ['Ordnung','teacher-tone-organisation',[
  ['Gewissen',['Bei Luther ist das Gewissen an Glaubensgewissheit und Gottes Wort gebunden, nicht an ein bloßes Bauchgefühl.','Gegenüber der Obrigkeit verlangt dieser Anspruch Begründung und Prüfung.']],
  ['Obrigkeit',['Weltliche Ordnung soll äußeren Frieden schützen und hat dabei Grenzen.','Ihre Zuständigkeit ist keine geistliche Herrschaft: Glaubensgewissheit lässt sich nicht erzwingen.']],
  ['Zwei-Regimente-Lehre',['Geistliches und weltliches Regieren unterscheiden sich: Glaube und Gewissen stehen neben der äußeren Ordnung.','Die Lebenswelten sind nicht vollständig getrennt; Grenzfälle müssen theologisch geprüft werden.']]
 ]],
 ['Konflikt','teacher-tone-stops',[
  ['Widerstand',['Widerstand ist nicht pauschal legitim oder illegitim; zu prüfen sind Begründung, Ziel und Mittel.','Im Bauernkrieg sind religiöse Ansprüche und politische Forderungen zu unterscheiden.']],
  ['Gewalt',['Ein berechtigtes Anliegen rechtfertigt nicht automatisch Gewalt.','Prüfen Sie Folgen, Verhältnismäßigkeit und Schutz anderer – auch bei obrigkeitlichem Eingreifen.']],
  ['Verantwortung',['Absichten und tatsächliche Folgen sind gemeinsam zu betrachten.','Verantwortung gilt dem Nächsten und der Gemeinschaft; gute Absichten allein genügen nicht.']]
 ]],
 ['Positionen','teacher-tone-technical',[
  ['Luther und Müntzer',['Beide begründen Ordnung, Widerstand und Gottes Willen theologisch, ziehen aber unterschiedliche Folgerungen.','Luthers Unterscheidung der Regimente und Müntzers stärker auf Veränderung gottwidriger Herrschaft bezogener Anspruch sind zu vergleichen. Keinen von beiden auf ein einfaches Schlagwort reduzieren.']]
 ]]
];
const box=(title,body,tone='')=>`<section class="teacher-box ${tone}"><h3>${title}</h3>${body}</section>`;
const list=items=>`<ul>${items.map(t=>`<li>${t}</li>`).join('')}</ul>`;
function pages(){
 const first=`<div class="teacher-columns">${box('Worum geht es?',`<p>Historisch-theologisches Lernspiel für Religion Q1: Konflikte erleben, entscheiden, Quellen prüfen und urteilen.</p><p><strong>Leitfrage:</strong> Hat Luther seine eigenen Ideen verraten – oder folgt sein Verhalten aus seiner Theologie?</p><p class="teacher-learning-line"><strong>Lernweg:</strong> erleben → entscheiden → Konsequenz sehen → Quelle prüfen → urteilen</p>`,'teacher-tone-subject')}${box('So starten Sie',list(['<strong>Vorbereiten:</strong> Link öffnen, iPads/Browser prüfen, Fortsetzungscode erklären.','<strong>Starten:</strong> individuell und ohne Anmeldung. Eigenes Tempo ist normal.','<strong>Begleiten:</strong> Plenumsstopps bewusst setzen; nicht jede Aufgabe gemeinsam lösen.'])+`<ol class="teacher-chapters" aria-label="Kapitel zur Orientierung">${chapters.map((title,i)=>`<li><strong>${i+1}</strong> ${title}</li>`).join('')}</ol>`,'teacher-tone-organisation')}</div><section class="teacher-plenum"><h3>Gute Stopps fürs Plenum</h3><p class="teacher-pace-note">Nicht auf exakt gleiche Spielstände warten: Stoppen Sie, wenn die meisten den Bezug kennen. Noch offene Arbeit wird danach fortgesetzt.</p><table class="teacher-stops"><thead><tr><th scope="col">Stopp</th><th scope="col">Wann?</th><th scope="col">Leitfrage</th><th scope="col">Bei unterschiedlichem Tempo</th></tr></thead><tbody>${stops.map(([title,when,question,pace],i)=>`<tr><th scope="row"><span>Stopp ${i+1}</span>${title}</th><td data-label="Wann?">${when}</td><td data-label="Leitfrage">„${question}“</td><td data-label="Bei unterschiedlichem Tempo">${pace}</td></tr>`).join('')}</tbody></table></section>`;
 const second=`<table class="teacher-problems"><caption>Problem finden → nächsten Schritt wählen</caption><thead><tr><th scope="col">Problem</th><th scope="col">Lösung / nächster Schritt</th></tr></thead><tbody>${problems.map(([p,s])=>`<tr><th scope="row">${p}</th><td>${s}</td></tr>`).join('')}</tbody></table>${box('Im Lehrkraftmodus verfügbar',list(['Szenen direkt öffnen und Aufgaben oder Kapitel zurücksetzen.','Testpfade und Endzustände öffnen; Lösungen anzeigen.','Rückblick, Kapitel 6 und Dossier vorführen.']),'teacher-tone-organisation teacher-functions')}`;
 const cluster=([title,tone,terms])=>box(title,`<dl class="teacher-terms">${terms.map(([term,notes])=>`<div><dt>${term}</dt><dd>${notes.map(note=>`<p>${note}</p>`).join('')}</dd></div>`).join('')}</dl>`,tone);
 const third=`<p class="teacher-subject-intro">Begriffe für die fachliche Einordnung – als Hilfe beim Nachfragen, Vergleichen und Sichern.</p><div class="teacher-term-clusters">${termClusters.map(cluster).join('')}</div>`;
 return [first,second,third];
}
function draw(){
 const content=pages();
 openOverlay(`<article class="teacher-guide"><header class="teacher-guide-header"><h1 id="overlay-title">Spickzettel fürs Lehrerpult</h1><p class="teacher-subtitle">1525 – Zwischen Freiheit und Aufruhr · Evangelische Religion · Q1</p><nav class="teacher-page-nav" aria-label="Seiten des Spickzettels">${['1 · Unterricht','2 · Hilfe','3 · Fachliches'].map((label,i)=>button(label,'teacher-page',`data-page="${i}" aria-current="${i===currentPage?'page':'false'}"`)).join('')}</nav></header><div class="teacher-scroll"><div class="teacher-cheatsheet">${content.map((html,i)=>`<section class="teacher-page" data-teacher-page="${i}" ${i===currentPage?'':'hidden'} aria-labelledby="teacher-page-${i}"><header class="teacher-page-heading"><p class="teacher-page-number">${i+1} / 3 · ${i===0?'Unterricht':i===1?'Hilfe und Steuerung':'Fachliche Orientierung'}</p><h2 id="teacher-page-${i}">${pageTitles[i]}</h2></header>${html}<p class="teacher-page-foot">1525 – Zwischen Freiheit und Aufruhr · Spickzettel fürs Lehrerpult · ${i+1} / 3</p></section>`).join('')}</div></div><footer class="teacher-guide-footer"><p>PDF: Im Druckdialog „Als PDF speichern“ wählen.</p><div class="panel-actions">${button('Zurück zum Lehrkraftmodus','teacher-back','class="quiet"')}${button('Als PDF speichern','teacher-pdf')}${button('Drucken','teacher-print','class="primary"')}</div></footer></article>`,()=>{document.body.classList.remove('printing-teacher');backToAdmin();},'teacher');
}
export function openTeachers(){if(!isTestMode())return;currentPage=0;draw();}
export function teacherAction(action,target){
 if(!isTestMode())return false;
 if(action==='teacher-open'){openTeachers();return true;}
 if(action==='teacher-back'){closeOverlay();return true;}
 if(action==='teacher-page'){const index=Number(target?.dataset.page);if(Number.isInteger(index)&&index>=0&&index<3){currentPage=index;draw();document.querySelector(`[data-action="teacher-page"][data-page="${index}"]`).focus();}return true;}
 if(action==='teacher-print'||action==='teacher-pdf'){document.body.classList.add('printing-teacher');window.print();return true;}
 return false;
}
window.addEventListener('afterprint',()=>document.body.classList.remove('printing-teacher'));
