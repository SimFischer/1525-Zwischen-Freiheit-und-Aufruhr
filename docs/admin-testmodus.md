# Versteckter Admin-/Testmodus

## Benutzung

Den Titel oben links fÃ¼nf Sekunden mit Maus oder Finger gedrÃ¼ckt halten. Auf dem Titelbild funktioniert auch der groÃŸe Spieletitel. Kurzes Anklicken hat keine Wirkung. Vorzeitiges Loslassen, Abbruch des Pointer-Ereignisses, Bewegung Ã¼ber zwÃ¶lf Pixel, Fensterwechsel und ein zweiter Finger brechen die Aktivierung ab. Textauswahl und KontextmenÃ¼ sind am Titel unterdrÃ¼ckt.

Alternativ mit `?debug=true` Ã¶ffnen und im Debugbereich â€žAdmin-Ãœbersicht Ã¶ffnenâ€œ wÃ¤hlen. Eine Debug-URL mit `start` bereitet das Szenenziel bereits als Testzustand vor.

Die beiden Kapitelregister enthalten alle vorhandenen Szenen sowie die geforderten Zwischenstationen. Jeder Sprung ersetzt den Testzustand durch passende Voraussetzungen. Kapitel 2 setzt Kapitel 1 als abgeschlossen voraus; die Versammlung setzt alle drei Dorfstationen als abgeschlossen voraus. Kapitelstart, aktuelles Kapitel zurÃ¼cksetzen, ganzes Testspiel zurÃ¼cksetzen und Kapitel abschlieÃŸen sind getrennte Funktionen. Der aktuelle Zustand lÃ¤sst sich als lesbares JSON aufklappen und kopieren; bei gesperrter Zwischenablage wird der Text fÃ¼r manuelles Kopieren markiert.

## Schutz des normalen Spielstands

Der normale Spielstand bleibt unter `1525.freedom.save.v1` in localStorage. Der Testmodus verwendet ausschlieÃŸlich sessionStorage unter `1525.freedom.test.v1`; bei gesperrtem sessionStorage bleibt er im Arbeitsspeicher. Eine gesonderte Momentaufnahme bewahrt die Stelle, von der aus der Testmodus betreten wurde. â€žZum normalen Spiel zurÃ¼ckâ€œ beziehungsweise â€žTestmodus verlassenâ€œ stellt diese Stelle wieder her, ohne den gespeicherten normalen Spielstand zu Ã¼berschreiben. Auch die bisherigen Debugfunktionen arbeiten getrennt. RÃ¼cksetzen und LÃ¶schen betreffen im Testmodus ausschlieÃŸlich den Testspielstand.

TestzustÃ¤nde Ã¼berstehen das Neuladen desselben Tabs, sind jedoch nicht als dauerhafter SchÃ¼lerfortschritt gedacht. Ohne sessionStorage Ã¼berstehen sie kein Neuladen. Es gibt kein Backend, keine PasswÃ¶rter und keine Authentifizierung.

## Kapitel 3â€“6 ergÃ¤nzen

1. Die regulÃ¤ren Kapitel und Szenen wie bisher in den Daten registrieren.
2. Benannte Teststationen in `data/admin-targets.js` ergÃ¤nzen. Ohne eigene Zwischenstationen erscheinen alle regulÃ¤ren Szenen automatisch in der Ãœbersicht.
3. FÃ¼r jedes neue Kapitel in `adminChapterRegistry` in `js/admin-state.js` einen zentralen `prepare`-, `complete`- und `reset`-Handler sowie die zugehÃ¶rigen Choice- und Spiel-IDs angeben.

`prepareAdminStateForScene(sceneId)` erzeugt den frischen Testzustand, schlieÃŸt vorausgehende Kapitel ab und initialisiert Dialog, Aufgabe oder Dokument. Die Sprungbuttons enthalten keine eigenen State-Hacks. Die bestehende Speicherlogik entscheidet zentral zwischen normalem und temporÃ¤rem Speicher.

## PrÃ¼fung

Automatisierte BrowserprÃ¼fungen: `scripts/check-admin.cjs`, `scripts/check.cjs` und `scripts/check-chapter-two.cjs`. Der Admin-Test umfasst Maus- und Touch-Hold, vorzeitigen Abbruch, jedes Sprungziel, Voraussetzungen, JSON-Kopie, RÃ¼cksetzen, Kapitelabschluss, Neuladen und unverÃ¤nderten normalen Spielstand. Ansichten: 1024Ã—768, 820Ã—640 und 390Ã—844; keine horizontalen Scrollbars, erreichbare Navigation und Aufgaben Ã¼ber der Testleiste. Bestehende Kapiteltests decken regulÃ¤re AblÃ¤ufe, Save-Migration und fÃ¼nf Responsive-Ansichten ab.

## Komprimierte Sprungliste

Die normale Admin-Übersicht zeigt drei dramaturgische Hauptziele pro Kapitel. Kapitel 1: Taverne, Luther-Freiheit / zentrale Aufgaben (Einstieg in die Sortieraufgabe nach den drei Gesprächen), Kapitelabschluss. Kapitel 2: Dorf-Hub, Alltag / Pflichtstationen (Einstieg in Peters Tagesplanung; die anderen Stationen bleiben über den Hub erreichbar), Dorfversammlung / Kapitelabschluss (alle drei Pflichtstationen sind vorbereitet und abgeschlossen).

Mit `?debug=true` bleibt die Übersicht zunächst komprimiert. „Detailziele anzeigen“ schaltet auf alle bisherigen Zwischenstationen um; „Hauptziele anzeigen“ kehrt zurück. Die bisherige Debug-Szenenauswahl bleibt ebenfalls verfügbar. Die zentrale Vorbereitung, getrennte Testspeicherung, Konsequenz-Testwerte und Kapitel-Funktionen sind unverändert.

Weitere Kapitel tragen ihre drei bis fünf wichtigsten Knoten in `adminMainTargets` in `data/admin-targets.js` ein. Diese Auswahl verweist auf die bestehenden Detailziele und benötigt keine zusätzliche State-Logik.
