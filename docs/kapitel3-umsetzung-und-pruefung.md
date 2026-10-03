# Kapitel 3 – Umsetzung und Prüfung

Ausgangsstand: `af7a8d7f56d541477613ada6f9f62c3a64934721`, bestehender Branch `main`.

## Integration

Die bestehenden Scene-, Dialogue-, Choice-, Save-, Notebook-, Hotspot- und Consequence-Systeme bleiben die Einstiegspunkte. Kapitel 3 registriert seine Daten in deren bestehenden Katalogen. Seine Szenen benutzen dieselben Gesprächs- und Entscheidungsansichten wie die ersten beiden Kapitel. `prepareChapterThreeState` initialisiert sowohl normale Szenen als auch zentral vorbereitete Admin-Zustände; es verändert keinen fremden Spielstand.

Alle 45 gelieferten PNGs liegen unverändert und mit denselben Namen unter `assets/chapter3/`. Ein SHA-256-Vergleich mit dem Produktionspaket bestätigt identische Dateien. Die gelieferten Bilder bleiben unverändert; drei separate Reparaturfassungen älterer Figuren werden ausschließlich in Kapitel 3 verwendet (siehe Revision unten). Die bisherigen Porträts bleiben erhalten. Matthes erscheint ausschließlich mit seinen eigenen neuen Assets. Kapitel 2 behält seine bisherigen Figuren und Texte. Gemessene Alpha-Grenzen halten die Füße neuer Figuren auch beim Wechsel zwischen Sprechen und Lesen am gleichen Bodenanker.

## Dramaturgie und Entscheidungen

Straße → Stadtplatz → drei Gemeinden → Dorfnotizen → Schwerpunkt → Beschwerdetisch → Lotzer → eigene Forderung → Zwölf Artikel → Quellenvergleich → religionsdidaktisches Scharnier → Auslegungswerkstatt → drei Stimmen → religiöse Position → Druckstrategie → vier Druckbögen → Verbreitung → Dorf → Widerstandsentscheidung → Schlussposition → Nachricht → Kapitelende.

Drei Einstiege (`labor`, `rights`, `church`) mit je vier offenen Forderungen; vier religiöse Positionen, vier Druckstrategien, vier Widerstandsstrategien und fünf Abschlussbegründungen. Insgesamt 32 offene Optionen. Keine dieser Entscheidungen hat eine versteckte Musterlösung. Beschwerdegruppen können sich überschneiden und verschiedene Begründungen aufnehmen; fachliche Auslegung unterscheidet produktive Spannungen von der weitreichenden Folgerung D, ohne die Fortsetzung zu sperren.

Die Schwerpunktwahl verändert Gespräch, Forderungsset und zuerst gelesenen Artikel. Die Forderung verändert den Vergleich. Die religiöse Position wird in der Druckerei aufgegriffen. Die Druckstrategie verändert `publicTone` und die tatsächliche Rückkehrreaktion. Die Widerstandsstrategie wird in der letzten Nachricht aufgegriffen. Alle Entscheidungen sind im Notizbuch und im Epilog-Export vorhanden; Konsequenzen werden aus kanonischen Choices neu berechnet und beim Reload nicht addiert.

Die Dorfnotizen zeigen die echten `priorityGrievances`, `playerDemand` und früheren Handlungen. Der Profilrückgriff benutzt eine Momentaufnahme der Kapitel-1/2-Orientierungen, damit spätere Entscheidungen die Erinnerung nicht nachträglich verfälschen. Gleichstände sind deterministisch. Erinnerungen behaupten keine Waldhandlung, die nicht gespeichert ist.

## Quellen und historische Grenzen

Primärgrundlage: Augsburger Erstdruck 1525, Transkription beim [Stadtarchiv Memmingen](https://stadtarchiv.memmingen.de/quellen/reformation-und-bauernaufstand/zwoelf-artikel-der-bauernschaft-augsburger-erstdruck.html).

Die HTML-Lesefassung umfasst alle zwölf Artikel, getrennt in einzelne anwählbare Abschnitte. Eigene Zusammenfassungen werden ausdrücklich vom kurzen Originalauszug unterschieden. Pflichtlektüre: Schwerpunktartikel, bei Frondienst auch Artikel 7, dazu Artikel 3 und 12. Das Archiv gibt nur bereits gelesene Abschnitte frei. Quellenhinweise bleiben optional und geschlossen im Archiv. Artikel 3 bewahrt Obrigkeit in angemessenen christlichen Sachen; Artikel 12 eröffnet die Prüfung an der Schrift. Keine pauschale Abschaffung jeder Herrschaft, kein März-Auftritt einer bereits veröffentlichten Luther-Ermahnung. Matthes berichtet eine zugespitzte Thüringer Position; seine Worte sind kein Müntzer-Zitat. Die Verbreitungskarte behauptet keine dokumentierten Einzelrouten.

## Spielstand und Testmodus

Fehlendes `chapter3` wird in älteren Version-4-Saves ergänzt. Druckphase, vier Bögen, Auswahl, Beschwerdegruppen, Quellenlektüre und Vergleich bleiben erhalten. Die normalen Saves verwenden weiterhin denselben Schlüssel und dieselbe Version. Drei kompakte Admin-Sprungpunkte; alle Detail-Szenen über Debug. Die bisherigen separaten Session-Teststände bleiben getrennt vom Schülerstand. Zurücksetzen von Kapitel 3 bewahrt die abgeschlossenen ersten beiden Kapitel.

## Validierung

Automatisierte komplette Spielrouten beginnen am echten Kapitel-2-Ende und führen über die sichtbaren Bedienelemente bis zum Kapitel-4-Platzhalter:

- labor → A → distinction → full → negotiate
- rights → B → critical_gospel → summary → collective_pressure
- church → D → worldly_transformation → religious → open_resistance_possible
- labor → C → hermeneutical_caution → accusation → theological_clarification

Zusätzlich: alle 32 Optionen, Quellen und Archiv, sechs Auslegungspaare einschließlich D, sinnvolle Admin-Voraussetzungen, Rücksetzung, Zwischen-Reloads und idempotente Konsequenzen. Szenenbilder und Bedienelemente werden bei 1024×768, 820×640 und 1440×900 geprüft; keine horizontale Scrollbar, erreichbare Fortsetzung und intern scrollende lange Aufgaben. Alpha-Bodenanker und Figurenränder werden geometrisch geprüft. Eigenes Pointer-Drag für Maus und Touch: ein Ghost, gleiche Bildgröße vor/während/nach dem Ziehen, contain und korrektes Ablegen.

Tests: `check-chapter-three.cjs`, `check-chapter-three-drag.cjs` sowie alle sieben verlangten Kapitel-1/2-, Admin-, Hotspot-, Staging-, UI- und Consequence-Prüfungen. Screenshots bleiben als lokale QA-Artefakte unter `artifacts/` außerhalb des Git-Commits.

Kapitel 4 ist ausdrücklich nur ein anschlussfähiger Platzhalter. Die gewünschte Spieldauer von 25–30 Minuten ist ein didaktischer Richtwert; eine empirische Zeitmessung mit einer Schülergruppe liegt nicht vor.

## Gezielte Revision vom 3. Oktober 2026

Ausgangsstand dieser Revision: `109795b6c849f9013e3769df1cfcb0df295c4f56`.

### Figuren und Fehlerursache

Der scheinbar abgetrennte Peter-Arm war kein z-index- oder Overflow-Fehler: Annas PNG enthielt fremde Hände bzw. einen fremden Ärmel an den transparenten Außenrändern. Peters Sprechpose endet außerdem mitten in seiner eigenen ausgestreckten Hand. Deshalb verwendet Kapitel 3 seine vollständige vorhandene Ruhepose. Für Anna wurde das vorhandene Ganzkörperbild repariert, mit vollständigen eigenen Händen und ohne fremde Randfragmente. Auch Jakob und Konrad enthielten schmale fremde Bildfragmente am unteren linken Rand; ihre vorhandenen Bilder wurden separat repariert. Keine CSS-Maske verdeckt Körperteile, Kapitel-2-Originale bleiben unverändert.

Neue Reparaturdateien (keine neuen Figuren):

- `assets/chapter3/characters/ch3_char_anna_repaired.png`
- `assets/chapter3/characters/ch3_char_jakob_repaired.png`
- `assets/chapter3/characters/ch3_char_konrad_repaired.png`

Alle drei Bearbeitungen erfolgten mit dem eingebauten ImageGen-Werkzeug. Prompt für Anna: „Remove the disconnected foreign male hands entering from BOTH left and right outer edges around shoulder/elbow height. Preserve Anna herself exactly: same face looking left, headscarf, green dress, white apron, her own two complete hands clasped at waist, arms, feet, body proportions, painterly texture, pose and colors. Entire figure must remain complete head to feet with transparent margin. No other person, no stray limb, no cropping, no new design. Actual transparent background.“ Prompt für Jakob und Konrad jeweils: „Remove ONLY the isolated foreign fragment at the extreme lower left edge of the transparent canvas (a narrow triangular brown sliver; NOT any part of the main man's legs or boots). Preserve the main man's entire body, own two hands, document if present, head and shoes fully visible with transparent margin. No new figure, no crop, no text, transparent background. Keep the supplied sprite unchanged otherwise.“

Die Straße zeigt Matthes, Jakob und Konrad als Gesprächsgruppe; Matthes blickt durch zulässige Spiegelung nach innen. Die Versammlung stellt Lotzer und Jakob einander gegenüber, ergänzt den jeweils relevanten Sprecher und zeigt bei den drei Stimmen ein eigenes Ensemble aus Georg, Matthes, Konrad und Jakob. In der Druckerei hört Jakob dem Drucker zu. Das Dorf behält exakt den Hintergrund aus Kapitel 2; Peter, Anna, Jakob und Konrad bzw. der Nachrichtenüberbringer stehen mit unterschiedlichen Höhen und Bodenankern zusammen. Anna wendet sich bei Beiträgen von rechts dorthin. Jede Gesprächsansicht reserviert Raum für das Dialogfeld und zeigt den unverzerrten, vollständigen Schauplatz darüber; Füße bleiben auf dem Boden des Originalbilds.

### Quellen

Das Modal belegt 92 Prozent der Breite (maximal 1300 Pixel) und 90 Prozent der Höhe. Bei 1024×768 und 820×640 liegen diese Maße innerhalb der geforderten Bereiche. Die zwölf nummerierten Pergamentregister passen in eine Reihe, behalten 44×44 Pixel Touchfläche und ausführliche zugängliche Beschriftungen. Links stehen Artikelnummer, größerer Titel und klar gekennzeichnete heutige Zusammenfassung; rechts der unveränderte Originalauszug. Alle zwölf Artikel passen an allen drei Referenzgrößen vollständig ohne internes Seitenscrollen. Das Archiv behält den geschlossenen Quellenhinweis und nur zuvor gelesene Artikel. Die fachlich notwendige Pflichtlektüre und sofortige Freigabe des Vergleichs bleiben erhalten; der Begleittext ist nun eine natürliche Orientierung.

### Druck

Ein manueller Durchgang: Farbe → Papier → Form mit Papier in die Presse → Hebel → fertigen Bogen herausnehmen. Danach übernimmt der Drucker drei kurze automatische Pressbewegungen, der Stapel wächst von einem auf vier Bögen. Anschließend folgt wie zuvor die Verbreitungskarte. Der Werkstattuntergrund nutzt den Ausschnitt rechts von der bereits im Hintergrund gemalten Presse; keine doppelte Presse. Auf alten Saves wird nur der Druckablauf angepasst: fertige Bögen bleiben erhalten, abgeschlossene Phasen müssen nicht wiederholt werden. Ein Zwischen-Reload während der automatischen Vervielfältigung setzt diese fort; keine zusätzlichen Entscheidungseffekte. Außerhalb des aktiven Spiels hält die automatische Folge an.

### Prüfung

- Vier vollständige Spielrouten bis zum Kapitelabschluss, alle 32 fachlichen Entscheidungen, Konsequenzen und Zwischen-Reloads bestanden.
- Alle zwölf Artikel einzeln bei 1024×768, 820×640 und 1440×900; zusätzlich alle zwölf im Archiv geöffnet. Sichere Modalgröße, maximal zwei Registerreihen, vollständige Leseflächen, keine horizontalen Scrollbars. `check-chapter-three-documents.cjs` prüft zusätzlich jedes Textelement und jeden Button auf vollständige Sichtbarkeit und ausreichende Touchhöhe.
- Ein manueller Druckdurchgang und automatische drei Folgebögen mit Maus und echten Touch-Ereignissen in allen drei Größen bestanden; Ghost behält die ursprüngliche Bildgröße.
- Alle 24 Szenen geprüft; zusätzlicher Test `check-chapter-three-staging.cjs` kontrolliert 55 Dialogzeilen pro Größe, Alpha-Grenzen, vollständige Körper, keine CSS-Clips, tatsächlichen Bodenkontakt und Abstand zum Dialogfeld. Alte Druckphasen werden einzeln auf die korrekte Fortsetzung geprüft.
- Alle sieben bisherigen Regressionstests für Kapitel 1/2, Admin, Save/Konsequenzen, Hotspots, Staging und UI bestanden.

Die Druckdauer von 45–75 Sekunden ist ein Bedienrichtwert, keine erzwungene Wartezeit. Es gibt keine neue Zeitbarriere; eine Messung mit Lernenden liegt noch nicht vor.
