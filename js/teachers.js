import {button,openOverlay,closeOverlay} from './ui.js';
import {isTestMode} from './save-system.js';
let backToAdmin=()=>{};
export function configureTeachers(back){backToAdmin=back;}
const chapters=[
 ['Was heißt frei?','Christliche Freiheit und Rechtfertigung vom äußeren Leben unterscheiden; Dienst am Nächsten begründen.'],
 ['Wie frei ist dein Leben?','Waldrechte, Frondienst und Abgaben erleben; aus Belastungen Forderungen entwickeln.'],
 ['Aus Beschwerden werden Forderungen','Zwölf Artikel und religiöse Begründung in Memmingen prüfen; die Wirkung des Drucks beobachten.'],
 ['Ordnung oder Widerstand?','Obrigkeit, Gewissen und Gewalt an Luther/Müntzer sowie Verhandlungen prüfen.'],
 ['Du musst handeln','Unter Handlungsdruck entscheiden und lokale Folgen für andere sehen.'],
 ['Was bleibt von Freiheit?','Belege und Gegenargumente prüfen; aus Quellen und Spielweg ein theologisches Urteil entwickeln.']
];
const stops=[
 ['Nach Kapitel 1','Was bedeutet Freiheit bei Luther – und was gerade nicht?'],
 ['Nach den sozialen Belastungen','Wann wird aus einer Beschwerde eine politische Forderung?'],
 ['Nach den Zwölf Artikeln','Was verändert sich, wenn politische Forderungen religiös begründet werden?'],
 ['Nach Luther/Müntzer','Welche theologischen Voraussetzungen führen zu unterschiedlichen Grenzen des Widerstands?'],
 ['Nach dem Ausgang von Kapitel 5','Wie unterscheiden sich Absicht, lokale Folge und Verantwortung in deinem Weg?'],
 ['Vor dem Schlussurteil','Ist Luthers Haltung 1525 eher konsequent, widersprüchlich oder beides – und welcher Beleg trägt dein Urteil?']
];
const problems=[
 ['Fachaufgabe blockiert','Hinweise nutzen; beim dritten Fehlversuch wird die Lösung erklärt. Offene Entscheidungen bleiben offen.'],
 ['Anderes Gerät','Menü → Spielstand sichern → Code notieren/kopieren → am Zielgerät „Mit Code fortsetzen“.'],
 ['Anderer Pfad / andere Szene gesucht','Lehrkraftmodus → Szene zeigen. Der Sprung verändert nur den temporären Teststand; verschiedene Schülerwege sind vorgesehen.'],
 ['Aufgabe oder Quelle am Beamer zeigen','Lehrkraftmodus → Kapitel → Quelle oder Aufgabe direkt öffnen; Voraussetzungen sind vorbereitet.'],
 ['Kapitel erneut testen','„Aktuelles Kapitel zurücksetzen“ oder „Aktuelle Aufgabe zurücksetzen“. Beides betrifft nur den Teststand.'],
 ['Ende / Rückblick zeigen','„Pfade, Endtafeln und Rückblick zeigen“: fünf Ausgänge, Recap ab Kapitel 1–5 und Dossier/PDF.'],
 ['Code funktioniert nicht','Eingabe/Internet prüfen, Fehlermeldung beachten. Ist der ursprüngliche lokale Stand vorhanden, dort einen neuen Code erzeugen.'],
 ['Anzeige / Verbindung gestört','Vollbild verlassen oder neu laden. Denselben Browser nutzen, keine Browserdaten löschen. Codes benötigen Internet.']
];
export function openTeachers(){
 if(!isTestMode())return;
 openOverlay(`<article class="teacher-guide"><div class="teacher-scroll"><section class="teacher-cheatsheet" aria-label="Spickzettel fürs Lehrerpult"><h1 id="overlay-title">Spickzettel fürs Lehrerpult</h1><p class="teacher-subtitle"><strong>1525 – Zwischen Freiheit und Aufruhr</strong><br>Evangelische Religion · gymnasiale Oberstufe / Q1 · historisch-theologisches Lernspiel</p><div class="teacher-key"><strong>Leitfrage:</strong> Hat Luther seine eigenen Ideen verraten – oder folgt sein Verhalten aus seiner Theologie?<p class="teacher-learning-path">erleben → entscheiden → Konsequenz sehen → Quelle / Position prüfen → neu urteilen</p></div><div class="teacher-print-columns"><section><h2>Kapitel und Lernweg</h2><ol>${chapters.map(([title,text])=>`<li><strong>${title}</strong> – ${text}</li>`).join('')}</ol><h2>Was die Lernenden tun</h2><p>Räume erkunden, mit Figuren sprechen und Gegenständen handeln; entscheiden, Quellen prüfen, Luther/Müntzer vergleichen und Folgen beobachten. Notizbuch und Rückblick sichern den Weg. Kapitel 6 führt zum Urteil und Dossier/PDF.</p><h2>Was die Lehrkraft tut</h2><p><strong>Vorbereiten:</strong> Browser/iPads prüfen, Link bereitstellen, Fortsetzungscode erklären, wenige Stopps planen.</p><p><strong>Begleiten:</strong> Individuell spielen lassen; nicht jede Aufgabe gemeinsam erklären. An Stopps Wege vergleichen; bei Problemen Lehrkraftmodus nutzen, nicht durch Lösungen führen.</p><h2>Fachbegriffe zur Orientierung</h2><p>Rechtfertigung · christliche Freiheit · Nächstenliebe · Gewissen · Obrigkeit · Widerstand · Gewalt · Verantwortung</p><aside class="teacher-key"><h2>Quellen im Spiel</h2><p><strong>Originalausschnitt</strong> = authentischer Quellentext.<br><strong>In heutiger Sprache zusammengefasst</strong> = didaktische Übertragung, kein wörtliches Zitat.<br><strong>Rekonstruierte Spielsituation</strong> = keine historische Quelle.</p></aside><h2>Wenige gemeinsame Stopps</h2><ol>${stops.map(([where,q])=>`<li><strong>${where}:</strong> ${q}</li>`).join('')}</ol></section><section><h2>Wenn etwas hakt</h2><table class="teacher-problems"><thead><tr><th scope="col">Problem</th><th scope="col">Lösung / nächster Schritt</th></tr></thead><tbody>${problems.map(([problem,solution])=>`<tr><th scope="row">${problem}</th><td>${solution}</td></tr>`).join('')}</tbody></table><aside class="teacher-key"><h2>Lehrkraftmodus</h2><p>Titel „1525 – Zwischen Freiheit und Aufruhr“ <strong>fünf Sekunden gedrückt halten</strong> (Maus/Touch).</p><p><strong>Getrennter Teststand:</strong> Sprünge und Lösungen dienen der Vorführung. „Zum normalen Spiel zurück“ stellt den vorherigen Stand wieder her. Der normale Schülerstand bleibt erhalten.</p></aside><h2>Fortschritt und Abschluss</h2><p>Automatisch lokal gespeichert: denselben Browser verwenden. Code vor Gerätewechsel oder Unterrichtsende neu sichern; alte Codes aktualisieren sich nicht. Gültig: 90 Tage.</p><p>Persönlicher Ausgang → Rückblick im eigenen Tempo → Kapitel 6: Belege, Gegenargument, Urteil → Dossier/PDF herunterladen (auf dem Gerät erstellt).</p><p>Normalen Stand nur auf der Startseite nach Sicherheitsabfrage zurücksetzen; ggf. vorher sichern. Historische Erklärung ≠ ethische Rechtfertigung. Das Schlussurteil bleibt offen.</p></section></div></section></div><footer class="panel-actions">${button('Zurück zum Lehrkraftmodus','teacher-back','class="quiet"')}${button('Drucken','teacher-print','class="primary"')}</footer></article>`,()=>{document.body.classList.remove('printing-teacher');backToAdmin();},'teacher');
}
export function teacherAction(action){
 if(!isTestMode())return false;
 if(action==='teacher-open'){openTeachers();return true;}
 if(action==='teacher-back'){closeOverlay();return true;}
 if(action==='teacher-print'){document.body.classList.add('printing-teacher');window.print();return true;}
 return false;
}
window.addEventListener('afterprint',()=>document.body.classList.remove('printing-teacher'));
