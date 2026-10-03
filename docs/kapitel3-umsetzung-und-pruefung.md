# Kapitel 3 – Umsetzung und Prüfung

Ausgangsstand: `af7a8d7f56d541477613ada6f9f62c3a64934721`, bestehender Branch `main`.

## Integration

Die bestehenden Scene-, Dialogue-, Choice-, Save-, Notebook-, Hotspot- und Consequence-Systeme bleiben die Einstiegspunkte. Kapitel 3 registriert seine Daten in deren bestehenden Katalogen. Seine Szenen benutzen dieselben Gesprächs- und Entscheidungsansichten wie die ersten beiden Kapitel. `prepareChapterThreeState` initialisiert sowohl normale Szenen als auch zentral vorbereitete Admin-Zustände; es verändert keinen fremden Spielstand.

Alle 45 gelieferten PNGs liegen unverändert und mit denselben Namen unter `assets/chapter3/`. Ein SHA-256-Vergleich mit dem Produktionspaket bestätigt identische Dateien. Keine neuen Bilder, keine Qualitätsreduktion. Die älteren Figuren nutzen ihre vorhandenen Kapitel-2-Ganzkörperbilder und die bisherigen Porträts. Matthes erscheint ausschließlich mit seinen eigenen neuen Assets. Kapitel 2 behält seine bisherigen Figuren und Texte. Gemessene Alpha-Grenzen halten die Füße neuer Figuren auch beim Wechsel zwischen Sprechen und Lesen am gleichen Bodenanker.

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
