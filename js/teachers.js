import {button,openOverlay,closeOverlay} from './ui.js';
import {isTestMode} from './save-system.js';
let backToAdmin=()=>{},currentPage=0;
export function configureTeachers(back){backToAdmin=back;}
const pageTitles=['Schnellstart und Unterrichtsüberblick','Wenn etwas hakt','Fachliche Orientierung'];
const chapters=[
 ['Was heißt frei?','Rechtfertigung, Freiheit, Nächstenliebe.'],
 ['Wie frei ist dein Leben?','Waldrechte, Frondienst, Abgaben.'],
 ['Aus Beschwerden werden Forderungen','Zwölf Artikel und Öffentlichkeit.'],
 ['Ordnung oder Widerstand?','Obrigkeit, Gewissen, Luther/Müntzer.'],
 ['Du musst handeln','Handlungsdruck und lokale Folgen.'],
 ['Was bleibt von Freiheit?','Belege und theologisches Urteil.']
];
const stops=[
 ['Nach Kapitel 1','Was bedeutet Freiheit bei Luther – und was gerade nicht?'],
 ['Nach den sozialen Belastungen','Wann wird aus einer Beschwerde eine politische Forderung?'],
 ['Nach den Zwölf Artikeln','Was verändert sich, wenn Forderungen religiös begründet werden?'],
 ['Nach Luther und Müntzer','Wo unterscheiden sich ihre Vorstellungen von Widerstand?'],
 ['Vor dem Schlussurteil','Ist Luther konsequent, widersprüchlich oder beides? Welcher Beleg trägt dein Urteil?']
];
const problems=[
 ['Eine Fachaufgabe blockiert.','Die gestuften Hinweise nutzen. Nach mehreren Versuchen erklärt das Spiel die Lösung. Entscheidungen bleiben offen.'],
 ['Auf einem anderen Gerät weiterspielen.','„Spielstand sichern“ wählen und den Code aufbewahren. Am Zielgerät „Mit Code fortsetzen“ wählen.'],
 ['Der Code fehlt oder funktioniert nicht.','Eingabe und Verbindung prüfen. Ist der lokale Stand vorhanden, dort einen neuen Code erzeugen.'],
 ['Eine Quelle oder Aufgabe im Plenum zeigen.','Lehrkraftmodus → Kapitel → „Szene zeigen“. Die nötigen Voraussetzungen werden automatisch vorbereitet.'],
 ['Eine Aufgabe oder ein Kapitel erneut testen.','„Aktuelle Aufgabe zurücksetzen“ oder „Aktuelles Kapitel zurücksetzen“ wählen. Beides ändert nur den Teststand.'],
 ['Einen Testpfad oder Endzustand vorführen.','„Pfade, Endtafeln und Rückblick zeigen“ öffnen. Einen Startpfad oder Ausgang wählen.'],
 ['Rückblick oder Schluss zeigen.','„Rückblick ab …“ im Vorführbereich wählen. Die Urteilsphase ist über Kapitel 6 direkt erreichbar.'],
 ['Dossier oder PDF finden.','Am Spielende das Dossier exportieren. „Dossier / PDF vorführen“ im Lehrkraftmodus zeigt Beispielantworten.']
];
const terms=[
 ['Rechtfertigung','Gottes Annahme aus Gnade; gute Werke verdienen sie nicht.'],
 ['Christliche Freiheit','Freiheit vor Gott und äußere Abhängigkeiten unterscheiden.'],
 ['Nächstenliebe','Die Freiheit wird im Dienst am anderen konkret.'],
 ['Gewissen','Glaubensgewissheit lässt sich nicht durch Herrschaft erzwingen.'],
 ['Obrigkeit','Aufgabe und Grenzen weltlicher Ordnung prüfen.'],
 ['Widerstand','Begründung, Ziel und Mittel getrennt beurteilen.'],
 ['Gewalt','Ein berechtigtes Anliegen rechtfertigt nicht jedes Mittel.'],
 ['Verantwortung','Absichten und Folgen für andere berücksichtigen.'],
 ['Zwei-Regimente-Lehre','Geistliches und weltliches Regieren unterscheiden; Grenzfälle prüfen.'],
 ['Luther / Müntzer','Unterschiedliche theologische Begründungen des Handelns vergleichen.']
];
const box=(title,body,tone='')=>`<section class="teacher-box ${tone}"><h3>${title}</h3>${body}</section>`;
const list=items=>`<ul>${items.map(t=>`<li>${t}</li>`).join('')}</ul>`;
function pages(){
 const first=box('Worum geht es?',`<p>Ein Lernspiel für Evangelische Religion in der Q1. Die Lernenden erleben historische Konflikte, entscheiden und prüfen ihre Deutungen an Quellen.</p><p><strong>Leitfrage:</strong> Hat Luther seine eigenen Ideen verraten – oder folgt sein Verhalten aus seiner Theologie?</p>`,'teacher-tone-subject')+`<section class="teacher-process"><h3>Der Lernweg</h3><ol>${['erleben','entscheiden','Konsequenz sehen','Quelle prüfen','urteilen'].map(t=>`<li>${t}</li>`).join('')}</ol></section>`+`<div class="teacher-columns"><div>${box('So starten Sie',list(['<strong>Vorbereiten:</strong> Link im Browser öffnen und auf den iPads prüfen. Eine Anmeldung ist nicht nötig.','<strong>Starten:</strong> Die Lernenden spielen individuell. Für die Fortsetzung denselben Browser oder einen Code nutzen.','<strong>Begleiten:</strong> Spielphasen mit kurzen Plenumsstopps verbinden. Nicht jede Aufgabe gemeinsam lösen.']),'teacher-tone-organisation')}${box('Die sechs Kapitel',`<ol class="teacher-chapters">${chapters.map(([title,focus],i)=>`<li><strong>${i+1} · ${title}</strong><span>${focus}</span></li>`).join('')}</ol>`)}</div><div>${box('Gute Stopps fürs Plenum',`<ol class="teacher-stops">${stops.map(([where,q])=>`<li><strong>${where}</strong><span>„${q}“</span></li>`).join('')}</ol>`,'teacher-tone-stops')}</div></div>`;
 const second=`<table class="teacher-problems"><caption>Praktische Hilfe im Unterricht</caption><thead><tr><th scope="col">Problem</th><th scope="col">Lösung / nächster Schritt</th></tr></thead><tbody>${problems.map(([p,s])=>`<tr><th scope="row">${p}</th><td>${s}</td></tr>`).join('')}</tbody></table><div class="teacher-columns"><div>${box('Lehrkraftmodus',`<p>Den Titel <strong>„1525 – Zwischen Freiheit und Aufruhr“ fünf Sekunden gedrückt halten</strong> – mit Maus oder Finger.</p>${list(['Szenen öffnen und Testpfade setzen.','Lösungen ansehen; Aufgaben/Kapitel zurücksetzen.','Enden, Rückblick und Dossier vorführen.'])}<p><strong>Getrennter Teststand:</strong> „Zum normalen Spiel zurück“ stellt den unveränderten Schülerstand wieder her.</p>`,'teacher-tone-organisation')}</div><div>${box('Spielstand / Fortsetzungscode',`<ol><li><strong>Lokal:</strong> Das Spiel speichert automatisch auf diesem Gerät.</li><li><strong>Sichern:</strong> Spielmenü → „Spielstand sichern“ → Code kopieren oder notieren.</li><li><strong>Laden:</strong> Auf dem anderen Gerät „Mit Code fortsetzen“ wählen.</li></ol><p>Nach weiterer Arbeit neu sichern. Alte Codes aktualisieren sich nicht. Sie sind 90 Tage gültig.</p>`,'teacher-tone-technical')}${box('Technik-Kurzinfo',list(['<strong>Browser / iPad:</strong> denselben Browser und dasselbe Geräteprofil nutzen.','<strong>Internet:</strong> zum Sichern und Laden von Codes nötig.','<strong>Wenn es hängt:</strong> Vollbild verlassen oder neu laden. Keine Browserdaten löschen.']),'teacher-tone-technical')}</div></div>`;
 const third=`<div class="teacher-columns"><div>${box('Zentrale Begriffe – als Erinnerung',`<dl class="teacher-terms">${terms.map(([term,note])=>`<div><dt>${term}</dt><dd>${note}</dd></div>`).join('')}</dl>`,'teacher-tone-subject')}</div><div>${box('Was die Lernenden üben',list(['Historische Situationen erschließen und Perspektiven vergleichen.','Theologische Deutungen an Quellen prüfen.','Luther und Müntzer unterscheiden.','Entscheidungen begründen und ihre Folgen reflektieren.','Ein eigenes theologisches Urteil mit Belegen und Gegenargument formulieren.']),'teacher-tone-subject')}${box('Quellen im Spiel',`<dl class="teacher-sources"><dt>Originalausschnitt</dt><dd>Authentischer historischer Quellentext.</dd><dt>In heutiger Sprache zusammengefasst</dt><dd>Didaktische Übertragung, kein wörtliches Zitat.</dd><dt>Rekonstruierte Spielsituation</dt><dd>Für das Spiel entworfene Begegnung, keine historische Quelle.</dd></dl>`,'teacher-tone-technical')}${box('Hinweise für die Begleitung',list(['Nicht jede Aufgabe gemeinsam lösen. Die Hinweise im Spiel zuerst nutzen lassen.','Nach Belastungen und Quellenarbeit Erfahrungen im Plenum vergleichen.','Vor dem Schlussurteil einen Beleg und ein Gegenargument sammeln lassen.','Historische Erklärung und ethische Rechtfertigung auseinanderhalten.']),'teacher-tone-stops')}${box('Didaktischer Kern',`<p>Spielhandlung trägt das Lernen: historische Erfahrung, Entscheidungen, Folgen und Quellenarbeit führen zur theologischen Urteilsbildung.</p><p>Das Schlussurteil bleibt offen. Entscheidend sind nachvollziehbare Gründe und tragfähige Belege.</p>`)}</div></div>`;
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
