# Abschlussprüfung Kapitel 1

Projekt: **1525 – Zwischen Freiheit und Aufruhr**  
Prüfdatum: **2. Oktober 2026**  
Stand: lokal überarbeitet; abschließender vollständiger Integrationstest bestanden.

## Ergebnis

Die bestehende Kapitelstruktur bleibt erhalten. Die Prüfung führte zu gezielten Änderungen an Rückmeldungen, Aufgabenformulierungen, Quellenführung und der gemeinsamen Gestaltung. Die integrierten Tavernenbilder und die beiden gelieferten Flugblattbilder bleiben unverändert. Es wurden keine neuen Bilder oder Audiofunktionen erzeugt.

Die fachliche Prüfung bezieht sich auf Luthers Freiheitsschrift von 1520: Glaube an Gottes Zusage in Christus, Annahme aus Gnade, Werke als Folge statt Voraussetzung der Rechtfertigung und Dienst am Nächsten. Die Unterscheidung von theologischer Freiheit und äußerer Ordnung begründet im Kapitel weder politische Emanzipation noch die Bedeutungslosigkeit des äußeren Lebens. Die gesellschaftliche Anschlussfrage bleibt offen.

Grundlagen: [Oxford, digitale Edition des historischen Drucks](https://editions.mml.ox.ac.uk/editions/freiheit-1520/), [Luther2017, modernisierter Text der Freiheitsschrift](https://www.luther2017.de/martin-luther/texte-quellen/lutherschrift-von-der-freiheit-eines-christenmenschen/), [EKD, Rechtfertigung und Freiheit](https://www.ekd.de/676.htm).

## Prüfung der 15 Bereiche

| Bereich | Befund und abschließende Umsetzung |
| --- | --- |
| 1. Gesamteindruck / Art Direction | Warmes Adventure mit Holz, Leder und Pergament. Bestehende Bildwelt beibehalten; Notizbuchregister und Dokumentnavigation an dieselben Materialien angeglichen. |
| 2. Assets und Bilder | Figuren, Tisch und Gegenstände bleiben Bestandteile der vollständigen Tavernenillustrationen. Keine zusätzlich schwebenden Figuren oder Gegenstände. Spielszene und Flugblattseiten werden ohne Verzerrung dargestellt. |
| 3. UI / Buttons / Hotspots | Deaktivierte Hotspots zeigen auch nach vorheriger Berührung keine Beschriftungen mehr über einem laufenden Dialog. Exit weiterhin erst am Abschlusscheckpoint. Leder- und Holzbuttons, warme Fokusmarkierungen, bedienbare Touchziele. |
| 4. Animationen / Interaktionen | Ruhige Sprecherhervorhebung und vorhandene Überblendung beibehalten. Reduzierte Bewegung einschließlich Kapitelübergang zusätzlich getestet. Keine Audioeffekte. |
| 5. Immersion | Technische Gefühlslabels unter Porträts entfernt. Editorische Angaben bleiben in der geschlossenen Quelleninformation. Doppelten Rückweg zum Startbildschirm auf der Kapitelkarte entfernt. |
| 6. Fachwissenschaftliche Texte | Glaube und Christusbezug in Kette, Dialog und Notizbuch ausdrücklich benannt. Gute Werke als freies Handeln statt Erwerb der Annahme beschrieben; pauschale Formulierung über Angst vor Gott präzisiert. Politische Gleichsetzung und Reduktion auf eine folgenlose Innerlichkeit weiterhin ausgeschlossen. |
| 7. Aufgabenqualität | Annas Kette nennt vier auszuwählende Gedanken und die Richtung von Annahme über Beweggrund zum Dienst. Sortierkarten enthalten Anwendungssituationen; Schwerpunkt und begründbare Grenzfälle werden kenntlich gemacht. Bestehende Mechanik und Antwortkennungen erhalten. |
| 8. Feedbackqualität | Die automatische Ausgabe der richtigen Antwort beim zweiten Fehlversuch entfernt. Gestufte Denkimpulse und präzisere zweite Hinweise ergänzt. Die abschließende Aussagenprüfung und ihre Sicherung begründen nun die tragfähige Antwort. Klare Auflösung nach mehreren Versuchen bleibt erhalten. |
| 9. Kontext vor Entscheidungen | Bestehende Kontextzitate für die Deutungsfragen erhalten; beide Aussagen der Sicherung bleiben sichtbar. Annas konkrete Frage steht jetzt auch während der Kettenaufgabe im Blick. |
| 10. Dialoglogik | Veralteten Hinweis auf dieselbe Dokumentseite ersetzt. Abgeschlossene Gespräche weiterhin nur kurze Rückmeldung; alle Wiederbesuche auf unveränderten Spielstand und fehlenden Dialogneustart geprüft. |
| 11. Dokumente / Flugblätter | Originalbilder, exakter zugänglicher HTML-Text, Vergrößerung und intern scrollbare Ansicht geprüft. Zweite Seite erst nach ihrem Lesemoment; Archiv zeigt nur gelesene Seiten. Wiederlesen aus der Taverne trägt jetzt den zutreffenden Rückweg „Zurück in die Taverne“. Künstlerische Neugestaltung und historischer Vergleichsdruck werden ausschließlich in der optionalen Quelleninformation ausgewiesen. |
| 12. Notizbuch | Lederregister, sichtbarer Bund und Papierkante ergänzt. Inhalte erhalten, Glaubensbezug präzisiert. Eigene aktuelle und übernommene frühere Deutungen, Quellen, Register und interne Seitenscrollung geprüft. |
| 13. Spielerführung | Jakob → Flugblatt → Deutung → zweiter Leitsatz → Gespräche → Aufgaben → Notizbuch → Schlussgespräch → Exit bleibt nachvollziehbar. Vier Kartenauswahlen ausdrücklich genannt; eindeutige Rückwege. Der vorhandene Hinweis auf das noch nicht spielbare Kapitel 2 bleibt auf der Kapitelkarte. |
| 14. Technische Qualität | Vollständiger lokaler Testlauf bestanden: alle Antwortvarianten, Hinweise, unterstützte Auflösungen, Hotspots, Dokumentseiten, Notizbuch, Vollbild, Tastatur, Touch, Save/Reload und alte Spielstände. Keine fehlenden Assets oder Konsolenfehler im Lauf. |
| 15. Abschlussbewertung | Kapitel nach den Änderungen erneut vollständig durchlaufen und die zentralen Modi visuell kontrolliert. Exploration, Dialog, Aufgaben und Quellen bleiben Teil derselben Spielwelt; die fachliche Sicherung bereitet die offene Leitfrage des nächsten Kapitels vor. |

## Technische Nachweise

Vollständiger Lauf von `scripts/check.cjs` mit Microsoft Edge und Playwright: **PASS**.

Geprüfte Ansichten: **1440×900, 1024×768, 820×620, 768×1024 und 390×844**. Zusätzlich echte Browser-Vollbildwechsel, Touch-Eingaben, Maus- und Touch-Drag, Antippen, Tastaturbedienung und reduzierte Bewegung. Prüfung von Save/Reload und Migration der vorhandenen alten Speicherformate.

Zusätzliche Regressionen sichern ab:

- zweite Hinweise unterscheiden sich vom ersten Hinweis und kopieren nicht die richtige Antwort;
- erfolgreiche Rückmeldungen enthalten eine Begründung;
- alle acht Sortierkarten enthalten eine Anwendungssituation;
- die Kettenaufgabe zeigt Annas Bezugsfrage;
- erneutes Lesen aus der Taverne öffnet kein vorzeitig freigeschaltetes Notizbuch und verändert den Fortschritt nicht;
- beide Dokumentseiten, Lesemodus und Vergrößerung verändern den Spielstand nicht;
- vollständige Druckblattdarstellung ohne Beschnitt, horizontale Scrollbars oder unerreichbare Bedienelemente;
- nur ein Startbildschirm-Rückweg auf der abschließenden Kapitelkarte.

Screenshots der kontrollierten Ansichten liegen in `artifacts/`, darunter Dialog, Auswahl, Aufgaben, Feedback, Notizbuch, Menü, beide Flugblattseiten und Kapitelabschluss. Auf kleinen Ansichten scrollen umfangreiche Inhalte intern; der untere Rand einer Karte oder eines Absatzes am Scrollfenster ist dabei kein Verlust des Inhalts.

## Grenzen der Prüfung

Die Tabletgrößen und Touch-Eingaben wurden im Browser emuliert. Ein physisches iPad und dessen Safari-Vollbildverhalten wurden nicht geprüft. Die didaktische Bewertung beruht auf Inhalts- und Aufgabenanalyse; eine empirische Erprobung mit einer Q1-Lerngruppe fand nicht statt.

Diese Prüfung betrifft den lokalen Stand. Sie veröffentlicht keine Änderungen auf GitHub Pages.
