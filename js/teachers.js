import {button,openOverlay,closeOverlay} from './ui.js';
import {isTestMode} from './save-system.js';
let backToAdmin=()=>{};
export function configureTeachers(back){backToAdmin=back;}
const chapters=[
 ['Was heißt frei?','Rechtfertigung · Freiheit · Nächstenliebe'],
 ['Wie frei ist dein Leben?','Waldrechte · Frondienst · Abgaben'],
 ['Aus Beschwerden werden Forderungen','Memmingen · Zwölf Artikel · Druck'],
 ['Ordnung oder Widerstand?','Obrigkeit · Gewissen · Luther/Müntzer'],
 ['Du musst handeln','Handlungsdruck · Entscheidung · lokale Folgen'],
 ['Was bleibt von Freiheit?','Quellenbelege · Gegenargument · eigenes Urteil']
];
const stops=[
 ['Nach Kap. 1','Was bedeutet Freiheit bei Luther – und was nicht?'],
 ['Nach den Belastungen','Wann wird aus einer Beschwerde eine Forderung?'],
 ['Nach den Zwölf Artikeln','Was verändert eine religiöse Begründung?'],
 ['Nach Luther/Müntzer','Wo unterscheiden sich ihre Widerstandsverständnisse?'],
 ['Vor dem Schlussurteil','Konsequent, widersprüchlich – oder beides? Welcher Beleg trägt dein Urteil?']
];
const problems=[
 ['Bei Aufgabe festgefahren','Hinweise nutzen; nach 3 Fehlern Lösung erklärt. Entscheidungen bleiben offen.'],
 ['Anderes Gerät','Spielmenü → Spielstand sichern → Code am Zielgerät verwenden.'],
 ['Code vergessen / ungültig','Eingabe/Internet prüfen; bei vorhandenem lokalem Stand neuen Code erzeugen.'],
 ['Szene im Plenum zeigen','Lehrkraftmodus → Kapitel → Szene zeigen.'],
 ['Kapitel erneut testen','Kapitel zurücksetzen; bei Bedarf nur die aktuelle Aufgabe.'],
 ['Endzustand zeigen','Vorführbereich → einen von fünf Ausgängen öffnen.'],
 ['Rückblick zeigen','Vorführbereich → Rückblick ab Kapitel 1–5.'],
 ['Kap. 6 / Dossier zeigen','Kapitel 6 → Szene; Vorführbereich → „Dossier / PDF vorführen“.']
];
export function openTeachers(){
 if(!isTestMode())return;
 openOverlay(`<article class="teacher-guide"><div class="teacher-scroll"><section class="teacher-cheatsheet" aria-label="Spickzettel fürs Lehrerpult"><h1 id="overlay-title">Spickzettel fürs Lehrerpult</h1><p class="teacher-subtitle">1525 – Zwischen Freiheit und Aufruhr · Evangelische Religion · Q1</p><div class="teacher-print-columns"><section aria-label="Unterricht ablaufen lassen"><h2>Start</h2><ul><li><strong>Vorbereiten:</strong> Link öffnen, iPads/Browser prüfen, Code erklären und Stopps planen.</li><li><strong>Loslegen:</strong> individuell starten; kein Login nötig.</li><li><strong>Begleiten:</strong> nicht jede Aufgabe gemeinsam erklären; an Stopps vergleichen, nicht durch Lösungen führen.</li></ul><h2>Spielprinzip</h2><p class="teacher-learning-path">erleben → entscheiden → Konsequenzen sehen → Quellen/Positionen prüfen → neu urteilen</p><h2>Kapitel auf einen Blick</h2><ol class="teacher-chapters">${chapters.map(([title,focus],i)=>`<li><strong>${i+1} · ${title}</strong><span>${focus}</span></li>`).join('')}</ol><h2>Gute Stopps fürs Plenum</h2><ul class="teacher-stops">${stops.map(([where,q])=>`<li><strong>${where}</strong><br>→ „${q}“</li>`).join('')}</ul><aside class="teacher-key teacher-key-green"><h2>Zentrale Begriffe</h2><p>Rechtfertigung · christliche Freiheit · Nächstenliebe · Gewissen · Obrigkeit · Widerstand · Gewalt · Verantwortung</p></aside><h2>Die Schülerinnen und Schüler …</h2><ul class="teacher-learners"><li>erkunden, sprechen, handeln und entscheiden;</li><li>sehen Folgen, prüfen Quellen, vergleichen Luther/Müntzer;</li><li>beurteilen Widerstand/Gewalt, formulieren ein Urteil und exportieren Dossier/PDF.</li></ul></section><section aria-label="Hilfe und Steuerung"><h2>Wenn etwas hakt</h2><table class="teacher-problems"><thead><tr><th scope="col">Problem</th><th scope="col">Lösung</th></tr></thead><tbody>${problems.map(([problem,solution])=>`<tr><th scope="row">${problem}</th><td>${solution}</td></tr>`).join('')}</tbody></table><aside class="teacher-key teacher-key-ochre"><h2>Lehrkraftmodus</h2><p>„1525 – Zwischen Freiheit und Aufruhr“ <strong>5 Sekunden halten</strong> (Maus/Touch).</p><ul class="teacher-inline-list"><li>Szenen öffnen</li><li>Testpfade setzen</li><li>Lösungen anzeigen</li><li>Kapitel zurücksetzen</li><li>Enden/Recap testen</li><li>Dossier · Spickzettel</li></ul><p><strong>Separater Teststand:</strong> Der Schülerstand bleibt erhalten.</p></aside><aside class="teacher-key"><h2>Spielstand / Fortsetzungscode</h2><ul><li><strong>Lokal:</strong> automatisch gespeichert.</li><li><strong>Wechsel:</strong> Spielmenü → Spielstand sichern → Code kopieren/notieren → „Mit Code fortsetzen“.</li><li>Nach weiterer Arbeit neu sichern · 90 Tage gültig · Internet nötig.</li></ul></aside><aside class="teacher-key teacher-key-green"><h2>Quellen im Spiel</h2><ul><li><strong>Originalausschnitt</strong> → historischer Quellentext</li><li><strong>In heutiger Sprache</strong> → didaktische Übertragung</li><li><strong>Rekonstruierte Spielsituation</strong> → keine historische Quelle</li></ul></aside></section></div></section></div><footer class="panel-actions">${button('Zurück zum Lehrkraftmodus','teacher-back','class="quiet"')}${button('Drucken','teacher-print','class="primary"')}</footer></article>`,()=>{document.body.classList.remove('printing-teacher');backToAdmin();},'teacher');
}
export function teacherAction(action){
 if(!isTestMode())return false;
 if(action==='teacher-open'){openTeachers();return true;}
 if(action==='teacher-back'){closeOverlay();return true;}
 if(action==='teacher-print'){document.body.classList.add('printing-teacher');window.print();return true;}
 return false;
}
window.addEventListener('afterprint',()=>document.body.classList.remove('printing-teacher'));
