# Kapitel 2 – Umsetzung und Prüfung

Prüfdatum: 2. Oktober 2026. Statische Anwendung, lokaler Entwicklungsstand.

## Spielablauf

Der vorhandene Abschluss von Kapitel 1 führt über die bestehende Überblendung und Kapitelkarte in den nächsten Morgen. Das Dorf bietet drei frei wählbare Wege. Erst nach Wald, Peters Hof und Margarethes Hof öffnet sich die Versammlung in der bekannten Taverne.

- **Wald:** drei Hinweise entdecken, ältere Nutzungsrechte gegen einen neuen Herrschaftsanspruch abwägen, eine offene Reaktion wählen und eigene Beobachtungen notieren. Der Verwalter erscheint nach zwei Hinweisen; der dritte bleibt vor dem Gespräch untersuchbar.
- **Frondienst:** Peters drei Arbeiten in einer eigenen Reihenfolge planen; die Forderung des Herrenhofs unterbricht diesen Plan. Der ursprüngliche Ablauf bleibt sichtbar. Verschobene Arbeit und gewählte Reaktion werden gespeichert.
- **Abgaben:** zehn einzeln zugeordnete Säcke auf Nahrung, Saatgut und Reserve verteilen. Drei Säcke werden aus dieser Planung entnommen. Das Zurückbehalten eines Sacks führt ihn tatsächlich in seinen vorherigen Bereich zurück. Die weitere Forderung entnimmt einen weiteren Sack oder wird verweigert. Kein Bestand wird negativ.
- **Versammlung:** gemeinsame Struktur erkennen, mindestens drei unterschiedliche Beschwerdepaare begründen, Prioritäten wählen, Beschwerden in konkrete Forderungen übersetzen und Konrads Schlussfolgerung anhand beider bekannter Lutherseiten prüfen. Satzbausteine formulieren die eigene Forderung. Nachrichten aus Memmingen führen zur Kapitel-3-Karte; Kapitel 3 ist nicht implementiert.

Offene Entscheidungen erhalten Figurenreaktionen ohne fachliche Bewertung. Fachliche Aufgaben verwenden die vorhandenen drei Feedbackstufen. Verbindungen können mehrere Begründungen haben; doppelte Paare zählen nicht mehrfach. Die religiöse Verbindung zwischen Pfarrerwahl und dem christlich begründeten Befreiungsanspruch wird zugelassen, ohne daraus eine unmittelbare politische Folgerung aus Luther zu behaupten.

## Integration und Bilder

Inhalte liegen in `data/chapter-two.js`. Ablauf und Darstellung sind auf `js/chapter-two.js` und `js/chapter-two-view.js` verteilt. Dialog-, Auswahl-, Feedback-, Quellen-, Notizbuch-, Pointer- und Vollbildfunktionen werden weiterverwendet. Die gemeinsame Materialsprache bleibt in `css/art-direction.css`, die Inszenierung in `css/staging.css`.

Die gelieferten Einzelbilder liegen unter `assets/chapter2`. Referenz-Sheets werden nicht als Szenen verwendet. Die bekannte Kapitel-1-Taverne und die Porträts von Peter, Anna und Jakob bleiben erhalten. Fremde Randfragmente in den gelieferten Figuren werden durch begrenzte Darstellung ausgespart; die Originaldateien bleiben erhalten. Feuerholz, Säcke und Verwalteraktivität zeigen Veränderungen im Dorf ohne Haken oder moderne Statusanzeigen.

Das Notizbuch erhält „Unser Dorf“ mit Begriffssicherung, persönlichen Beobachtungen, Entscheidungen und der eigenen Forderung. Die zehn Säcke sind eine didaktische Planungsmenge; regionale Unterschiede werden im Notizbuch erläutert.

Speicherformat 4 erweitert das bisherige gemeinsame Schema. Bestehende Formate 1, 2 und 3 bleiben lesbar. Plan, Sackzuordnungen, Entnahmen, Hinweise, Reflexionen, ausgewählte Beschwerdepaare, Verbindungen, Satzbausteine und laufende Dialoge/Aufgaben werden gespeichert. Neue Felder werden auf gültige Werte geprüft.

## Prüfung

Reproduzierbare Prüfungen: `node scripts/check.cjs` und `node scripts/check-chapter-two.cjs`, mit installiertem Playwright und Microsoft Edge. In dieser Umgebung wird das gebündelte Playwright über `PLAYWRIGHT_MODULE` gefunden.

- Alle sechs Reihenfolgen der Pflichtstationen bis zur Kapitel-3-Karte.
- Alle offenen Wald-, Frondienst- und Abgabenreaktionen; alle drei verschobenen Arbeiten, sechs Tagesreihenfolgen, alle Bereiche der zusätzlichen Abgabe sowie deren Verweigerung.
- Alle fachlichen Antwortoptionen einschließlich Denkimpuls, präziserem Hinweis und Unterstützung beim dritten Versuch.
- Einzeln nachvollziehbare Sackbestände, tatsächliche Rückgabe beim Zurückbehalten, Entnahme aus allen drei Bereichen.
- Wiederaufnahme während Wald, Tagesplanung, Sackverteilung, zusätzlicher Forderung, vor der Versammlung, bei Verbindungen und beim Formulieren der Forderung.
- Mausziehen, Touchziehen, Tap-Alternative und Tastatur; echte Fullscreen-API in Edge.
- Unterschiedliche gültige Verbindungsgründe, unpassende Begründungen mit gestuften Hinweisen und Schutz gegen mehrfach gezählte Paare.
- Notizbuch mit tatsächlichen Entscheidungen; Debug-Freischaltung und fehlende Debug-Oberfläche im normalen Spiel.
- Beide unveränderten Lutherbilder und zugänglicher HTML-Text im Versammlungsgespräch. Redaktionelle Quellenhinweise bleiben im Archiv.
- 1440×900, 1024×768, 820×640, 768×1024 und 390×844: interne Aufgaben-Scrollbereiche, erreichbare Abschlussbuttons und Header, keine horizontalen Scrollbars, keine fehlenden Bilder oder Laufzeitfehler.
- Kapitel-1-Regression einschließlich Quellen, Aufgaben, Speicherung, Migrationen und Responsive-Prüfungen; der tatsächliche Türübergang wird zusätzlich mit dem neuen Kapitelstart geprüft.

Die Tablet-Prüfungen sind Browseremulationen, kein Test an einem physischen iPad. Eine Erprobung mit einer realen Q1-Lerngruppe ist damit nicht ersetzt.

## Historische Orientierung

Waldnutzung, Dienstpflichten, Abgaben, Pfarrerwahl und christlich begründete Befreiungsansprüche orientieren sich an den [Zwölf Artikeln bei German History in Documents and Images](https://germanhistorydocs.org/de/von-den-reformationen-bis-zum-dreissigjaehrigen-krieg-1500-1648/beschwerden-und-forderungen-die-zwoelf-artikel-der-schwaebischen-bauern-27-febraur-1-maerz-1525). Die acht Beschwerdezettel sind ein didaktischer Vergleichsraum und keine vollständige Wiedergabe oder feste Gliederung der zwölf Artikel.

Die Nachricht zu Sebastian Lotzer und Memmingen wird durch das [Stadtarchiv Memmingen](https://stadtarchiv.memmingen.de/publikationen/historische-orte-in-memmingen-zum-aufbegehren-der-bauern-1525/wohnhaus-des-sebastian-lotzer.html) gestützt. Dorf, Figurenbegegnungen und konkrete Tagesforderungen sind die fiktive Inszenierung des Kapitels.

## Lokale Vorschau

Der normale Entwicklungsserver läuft auf Port 4173. Eine separate Vorschau von Kapitel 2 ist auf `http://127.0.0.1:4176/?start=ch2_hub` geöffnet. Ihr eigener Browser-Speicher schützt den bisherigen Kapitel-1-Spielstand auf Port 4173. Dieser Stand ist lokal und noch nicht veröffentlicht.
