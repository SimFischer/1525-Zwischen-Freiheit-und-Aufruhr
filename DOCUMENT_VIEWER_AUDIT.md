# Dokumentansichten: Qualitätsprüfung

Stand: 13. Oktober 2026. Bestehendes `main` vor Beginn aktualisiert; Ausgangsstand `af8bb09`. Keine neuen Bildassets, Speicherfelder, Dialoge, Aufgabenlösungen oder Kapitelstrukturen.

## Gemeinsame Ursachen und Umsetzung

Die Kapitel-4-Komponente koppelte ihre Höhe an das vollständige Bildformat. Darin lagen absolut positionierte, schmale Textrechtecke mit eigenem `overflow:auto`; zusätzlich scrollte der äußere Leser. Selbst kurze Texte konnten dadurch zwei Scrollbereiche erzeugen. Die deckenden Rechtecke und Schatten ließen Papier und Text wie getrennte Karten erscheinen. Eine feste Bildgröße eignete sich außerdem nicht für die schräge Weingarten-Requisite.

Die neue gemeinsame Darstellung in `js/chapter-four-documents.js` und `css/art-direction.css` verwendet intrinsischen Textfluss: Titelblatt, Einzelblatt/Folio und Vergleichsdoppelseite. HTML bleibt auswählbar und semantisch gegliedert. Es gibt nur den äußeren Reader als Scrollcontainer. Hintergrundmaterialien erzwingen keine 1000-Pixel-Seitenhöhe. Ruhige, weich auslaufende Papierflächen ersetzen die rechteckigen Lesekarten und Schatten; Alterung und Bindung bleiben außerhalb der Buchstaben sichtbar. Die Zeilenlänge ist begrenzt, Fließtext bleibt 20 px/1,6, der bestehende Vergleich 18 px/1,45; Zoom vergrößert auf 22 px. Lange Abschnitte werden nicht durch kleinere Schrift passend gemacht.

Die thematischen Gruppen längerer Texte sind echte aufeinanderfolgende Folioseiten. Die April/Mai-Gegenüberstellung bleibt eine Doppelseite. Vorhandene Quellen-IDs und Archivgrenzen bleiben bestehen; ein mehrseitiger Abschnitt wird erst nach Besuch sämtlicher Folios als gelesen markiert. Zwischenstände führen weder zur Freigabe des Mai-Textes noch zur Erledigung einer ungelesenen Quelle. Ältere Spielstände bleiben lesbar. Es gibt keine neuen persistenten Felder für Folionummern.

Die Navigation liegt als eigener Flexbereich außerhalb des Papiers: nächste Seite primär, zurück sekundär, Vergrößerung, Rückkehr und Quelleninformation zurückhaltend. Die optionale redaktionelle Quelleninformation lässt sich ausschließlich im Archiv über „Zur Quelle“ öffnen und nutzt dann denselben äußeren Scrollbereich.

Kapitel 3 nutzt dieselbe lokale Druckschrift und weiche Papierberuhigung; seine doppelten Dokumentregeln wurden zusammengeführt. Wortlaut und Zusammenfassungen der Zwölf Artikel bleiben unverändert. Kapitel 1 behält die beiden fertigen Flugblattbilder und seinen vorhandenen Reader; dessen zugänglicher Text ist korrekt als behutsam modernisierter Originalausschnitt bezeichnet.

## Fachliche Überarbeitung

- **Weltliche Obrigkeit:** Schutzaufgabe, Grenze gegenüber Glauben und Gewissen, äußere Pflichten und Nächstenliebe bilden einen zusammenhängenden Gedankengang.
- **Friedensermahnung:** unterschiedliche Verantwortungsbereiche von Herren und Bauern, Prüfung von Beschwerden, Verständigung, Berechtigung einer Forderung gegenüber Legitimität ihrer Mittel sowie die Spannung zwischen Herrschaftskritik und äußerer Ordnung.
- **An die Herren:** eigener Abschnitt über Mitverantwortung für Missstände; zweite Folioseite über Herrschaft, Evangelium und Verantwortung. Der isolierte Merksatz entfällt zugunsten der Argumentation.
- **An die Bauern:** Beschwerden werden nicht abgewiesen, aber eigenmächtige Gewalt wird begrenzt; christliche Freiheit ist kein unmittelbares politisches Recht zur gewaltsamen Neuordnung. Der offene Konflikt bei verweigerter Abhilfe bleibt benannt.
- **Müntzer:** eigenständige theologische Position mit Prophetie, Schrift und erfahrener Offenbarung, Auftrag der Herrscher, Widerstand und Prüfung religiöser Gewissheit. Keine moralische Farbcodierung oder bloße „Gegenstimme“ zu Luther. „Eine andere reformatorische Stimme“ wurde durch „Göttliche Ordnung und Widerstand“ ersetzt; der Katalogtitel lautet „Thomas Müntzer über göttliche Ordnung und Widerstand“. Es ist ausdrücklich eine heutige Zusammenfassung nach der Fürstenpredigt, kein erfundener historischer Werktitel.
- **Mai-Schrift:** Vorwürfe des Treuebruchs, der Gewalt und des Evangeliumsmissbrauchs; obrigkeitliches Eingreifen und seine möglichen Folgen. Historische Erklärung und ethische Rechtfertigung bleiben getrennt.
- **Weingarten:** „Vom Vertrag zu Weingarten“ benennt den Gegenstand genauer. Daten, beteiligte Haufen, Schiedsverfahren, Zugeständnisse und begrenzte regionale Übertragbarkeit sind gegliedert; kein allgemeiner Sieg und keine Universallösung.
- **Kapitel 5:** alle Quellen-/Arbeitsflächen geprüft. Die vier theologischen Aussagen und vier Luther-Gedanken sind bereits ausdrücklich moderne Zusammenfassungen innerhalb einer Aufgabe, mit anschließender Prüfung von Grenzen und Folgen; sie werden nicht als Originalzitate ausgegeben. Diese Aufgabeninhalte und Rückmeldungen bleiben bestehen. Die drei Perspektivberichte bleiben vollständig und wortgleich als „Erfundene Spielsituation“ bezeichnet. Mehr Innenabstand und eine ruhigere Druckschrift verbessern ihren Satz. Ihr originaler 4:3-Träger bleibt unverzerrt; kleine Ansichten scrollen die Arbeitsfläche bei weiterhin sichtbarer Fortsetzung.

Historische Nachweise: [Ermahnung zum Frieden, digitalisierter Druck](https://www.bavarikon.de/object/BSB-HSS-00000BSB00089333?lang=de), [Stadtarchiv Memmingen: zeitgenössische Quellen und Chronologie](https://stadtarchiv.memmingen.de/publikationen/memmingen-und-das-aufbegehren-von-bauern-und-buergern-1525.html), [Müntzers Fürstenpredigt, 13. Juli 1524](https://germanhistorydocs.org/de/von-den-reformationen-bis-zum-dreissigjaehrigen-krieg-1500-1648/ghdi:document-4270), [Landesarchiv/LEO-BW: Weingartener Vertrag](https://www.leo-bw.de/fr/web/guest/themenmodul/bauernkrieg/vertraege/weingartener-vertrag), [LutherMuseen: Mai-Schrift](https://www.luthermuseen.de/en/node/889). Die erweiterten Texte sind moderne fachliche Zusammenfassungen und Einordnungen, keine neu erfundenen Luther- oder Müntzer-Zitate.

## Typografie und Encoding

Der Quelltext der problematischen Wörter „mörderischen“ und „räuberischen“ war bereits korrekt UTF-8. Das Problem wurde deshalb nicht durch Umlautersetzungen oder pauschales Umcodieren behandelt. Die Dokumente nutzen jetzt die bereits für den PDF-Export vorhandenen, lokal gebündelten Source-Serif-4-Schriften (Regular/Bold, OFL), ohne externe Webfonts. Synthetische Kapitälchen und historisierende Glyphenwechsel entfallen. Originalzitate sind separat und leicht kursiv, Metadaten und Textart kleiner, aber lesbar.

`check-document-encoding.cjs` prüft UTF-8 für HTML/JS/JSON/CSS, fehlende Ersatzzeichen, HTML-Charset sowie die tatsächlichen OpenType-Glyphen für `ä ö ü Ä Ö Ü ß „ “ ‚ ‘ – — … ’` in beiden Schriftdateien. Der visuelle Zeichensatztest befindet sich unter `artifacts/document-audit/after/glyph-sample.png`; die Testzeichen werden nicht ins Spiel übernommen.

## Wiederverwendete Materialien

Unveränderte Kapitel-4-Titelbücher, die vorhandenen Ermahnungs-, Bauern-, Müntzer- und Mai-Buchseiten sowie die Vergleichsdoppelseite bleiben in Verwendung. Einzelne Folios zeigen jeweils die zugehörige Hälfte des vorhandenen Buchmaterials. Für die kurzen Rückgriffe und den Weingarten-Lesemoment dient das bestehende flache `ch4_doc_ermahnung_lords.png` als Textträger. Die drei Berichte verwenden unverändert `ch5_ui_three_reports.png`; Kapitel 3 sein vorhandenes Zwölf-Artikel-Buch.

Die schräge Weingarten-Requisite und die beiden kleinen, ungeeigneten Rückgriffsuntergründe bleiben im Repository erhalten, werden aber im Runtime-Register ausdrücklich als ersetzte Lesematerialien geführt. Ursprüngliche Assetdateien und Lieferprüfsummen bleiben unangetastet. Neue Rasterbilder waren nicht nötig.

## QA und Grenzen

Vorher: zwölf ursprüngliche Quellenansichten je Bildschirmgröße plus drei Berichte, unter `artifacts/document-audit/before/`. Nachher: alle 18 tatsächlichen Folios sowohl im Leser als auch im Archiv bei **1024×768, 820×640 und 1440×900** (108 Aufnahmen/Messungen), plus Berichte und Glyphentest. Die geometrischen Ergebnisse stehen unter `artifacts/document-audit/after/geometry.json`. Screenshots sind lokale, ignorierte QA-Artefakte.

- 1024×768 und 1440×900: alle normalen Quellen-/Archivfolios ohne unnötige vertikale Scrollleiste; vollständiger Text, keine horizontalen Scrollbars, erreichbare Bedienelemente ≥44 px. Große Ansichten behalten begrenzte Zeilenlängen und umliegende Spielatmosphäre.
- 820×640: längere Quellen, Zoom und der vollständige Berichte-Träger dürfen vertikal scrollen; keine verschachtelten Textscrollboxen, Navigation bleibt außerhalb erreichbar. Vollständigkeit wurde nach Scrollen geprüft.
- Die Quellen-/Zoomprüfung erfasst zusätzlich iPad-Portrait 768×1024 und 1024×1366, unveränderte Inhaltsvollständigkeit sowie tatsächliche Papier- und Fontnutzung.
- Kapitel-4-Prüfungen: fünf Spielwege in drei Größen, 11 Save-Checkpoints pro Weg, 56 Antwortreaktionen, alle 36 Szenen, fünf Endzustände, Archiv, unvollständiges Lesen, Maus/Touch/Tastatur, alte Saves und isolierter Adminzustand.
- Kapitel 5: vier vollständige Spielwege in drei Größen, alle 81 Szenen-/Viewport-Kombinationen, Entscheidungen, Verzweigungen, Endzustände, Admin und alte Spielstände. Der vorhandene kleine Kapitel-6-Übergang hat einen erlaubten inneren Scrollbereich; seine unteren Aktionen werden nach Scrollen auf Erreichbarkeit geprüft. Seine Story und Gestaltung wurden nicht geändert.
- Speicher-/Fortsetzungscodeprüfung: bestehende Kryptografie-, API-, Migration-, Offline- und Testmodusprüfungen; Edge und WebKit übertragen einen vollständigen Spielstand zwischen isolierten Sitzungen, öffnen danach die echte Quelle, wechseln Seiten und vergrößern, kehren zur unveränderten eigenen Antwort zurück und prüfen Autosave/Reload sowie PDF-Ausgabe. Die Wiederherstellungsprüfung wartet korrekt auf das asynchrone Dialog-Schließen-Ereignis.
- Bestehende Tests mit erzwungenem nativen Papier-Bildformat oder inneren Textscrollboxen wurden an den neuen intrinsischen Vertrag angepasst; Inhalts-, Freischaltungs-, Bedienungs- und Saveprüfungen bleiben erhalten.

Bewusste Grenzen: Zoom und lange Texte bei kleinen Viewports können scrollen. Die verwendeten Bilder bleiben heutige künstlerische Materialien, keine historischen Faksimiles. Physische iPad-Hardware wurde nicht verwendet; Touch-/WebKit- und Viewportprüfungen erfolgten automatisiert. Keine bekannten offenen Funktionsfehler im geprüften Umfang.

Geänderte Produktionsdateien: `css/art-direction.css`, `css/staging.css`, `data/chapter-four-documents.js`, `data/documents.js`, `js/chapter-four-documents.js`, `js/chapter-three-documents.js`, `js/chapter-five-view.js` und das Runtime-Register im vorhandenen Kapitel-4-Manifest. Dazu Dokumentations- und QA-Skripte. Die vorhandenen Deploymentwege für GitHub Pages und Vercel bleiben bestehen.
