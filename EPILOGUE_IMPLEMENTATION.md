# Dokumentarischer Epilog

## Dramaturgie und Anbindung

Nach `ch6_final_question` erreicht der normale Lernweg `ch6_ending`. Die fachliche Abschlusslogik berechnet `chapter6.completed` wie bisher. Erst danach beginnt der Epilog automatisch; ältere vollständig abgeschlossene Spielstände bieten „Dokumentarischer Epilog“. Die vorherige persönliche Abschlussseite bleibt Voraussetzung des regulären Szenenwegs. Unabgeschlossene Zustände können den Epilog nicht starten. Der zentrale Admin-Präparator behandelt den vollständig vorbereiteten Endcheckpoint als abgeschlossen, damit der direkte Debugzugang sofort funktioniert; normale Lernwege werden dadurch nicht freigeschaltet.

109 Sekunden, 19 Stationen, kein Audio, Video, Quiz oder Urteilsscore. Pause und Originalvergrößerung verlängern nur die selbst gewählte Betrachtungszeit. Der Schluss steht mindestens sieben Sekunden, auch nach Skip, bevor Schlussaktionen sichtbar werden.

## Stationen, Texte und Timing

- **closing · 2 s**: Vorhandene persönliche Freiheitsseite ohne Seitennavigation.
- **reconstruction · 4 s**: Die Geschichte, die du erlebt hast, war rekonstruiert.
- **record · 4 s**: Die Konflikte, Forderungen und Texte dahinter sind historisch überliefert.
- **articles · 8 s**: Die Forderungen wurden 1525 gedruckt und verbreitet. / Soziale Beschwerden verbanden sich mit religiöser Argumentation.
- **union · 7 s**: Der Konflikt blieb nicht auf Forderungen und Flugschriften beschränkt. / Vielerorts eskalierte er gewaltsam; andernorts wurde weiter verhandelt.
- **portrait · 5 s**: Auch Luther musste 1525 religiöse Freiheit, politische Ordnung und Gewalt zueinander ins Verhältnis setzen.
- **peace · 7 s**: Luther kritisierte Missstände und lehnte gewaltsamen Aufruhr ab. / In der Friedensermahnung versuchte er zunächst, zwischen den Seiten zu vermitteln.
- **harsh · 8 s**: Mit der Eskalation wurde seine Sprache schärfer. / Seine Forderung nach gewaltsamer Niederschlagung gehört zu den problematischen Seiten seiner Haltung im Bauernkrieg.
- **muentzer · 7 s**: Thomas Müntzer deutete Religion und gesellschaftliche Veränderung anders. / Dieselbe religiöse Tradition konnte politisch unterschiedlich ausgelegt werden.
- **outcome · 6 s**: 1525 wurden zahlreiche Aufstände militärisch niedergeschlagen. / Zehntausende Menschen kamen ums Leben.
- **regions · 6 s**: Der Bauernkrieg verlief regional unterschiedlich. / Auch Verhandlungen und Vereinbarungen gehörten dazu, etwa der Weingartener Vertrag.
- **questions · 6 s**: Die Aufstände scheiterten vielerorts militärisch. / Fragen nach Herrschaft, Gerechtigkeit, Beteiligung und religiös begründetem Widerstand blieben umstritten.
- **tension · 8 s**: Missstandskritik, Aufruhrablehnung und Legitimation harter Gewalt stehen bei Luther in Spannung. / Christliche Freiheit unterschied er grundsätzlich von politischer Selbstbestimmung.
- **theology1 · 4 s**: Christliche Freiheit beantwortet nicht automatisch jede politische Frage.
- **theology2 · 4 s**: Aber sie verändert die Frage danach, wie Menschen miteinander umgehen.
- **theology3 · 4 s**: Freiheit, Ordnung, Widerstand und Verantwortung lassen sich nicht spannungsfrei voneinander trennen.
- **theology4 · 4 s**: Genau darin liegt die Herausforderung, die Luther und der Bauernkrieg bis heute stellen.
- **personal · 8 s**: Deine Antwort auf die Frage: Was heißt frei? Darunter der vollständige unveränderte gespeicherte Text.
- **final · 7 s**: 1525 – Zwischen Freiheit und Aufruhr / Was heißt frei? / Eine Frage, die 1525 nicht endete.

## Umsetzung / Dateien

- `data/epilogue.js`: Quellenkatalog, Kennzeichnungen, Texte und Zeiten.
- `js/epilogue.js`: Timer, Wiederholung, Fortschritt, Originalvergrößerung und Nachweise.
- `js/app.js`: bestehende Kapitel-6-Anbindung, keine neuen fachlichen Szenen.
- `data/chapter-six-state.js`: getrennte Felder `epilogue` und `epilogueSeen`, sichere Normalisierung beim Laden.
- `js/chapter-six-view.js`: vorhandener Reflexionsraum mit drei vorhandenen Requisiten, keine neuen Bilder.
- `css/art-direction.css`: gemeinsame Materialbuttons und ruhige dokumentarische Darstellung.
- `assets/epilogue/`: vier Originaldigitalisate und ihre institutionellen Rechte-/Metadatenmanifeste.
- Vollständige Quellen und Einschränkungen: [EPILOGUE_SOURCE_MANIFEST.md](EPILOGUE_SOURCE_MANIFEST.md).

## Speicher, Wiederholung und Fallbacks

- Normaldurchlauf speichert Station, Sekunden, Pause und Abschluss. Reload setzt die aktuelle Station fort. Eine verborgene Browserseite oder ein geöffnetes Original-/Quellendialogfenster hält den Timer an.
- Replay verwendet ausschließlich einen temporären Zustand und schreibt weder Save noch Kapitelurteil, Definition, Abschlussmerker oder Orientierung.
- `epilogueSeen` wird erst nach dem sieben Sekunden gehaltenen Schlussbild gesetzt. Fachlicher Abschluss bleibt davon unabhängig.
- Skip führt zum letzten Raum, keine Rückkehr zu einer Lernaufgabe. Kein automatischer Reload.
- Textstationen statt ungeklärter Bilder; fehlende Bilddateien werden ohne defektes Bild durch den bibliografischen Nachweis ersetzt. Fehlt ein Katalogeintrag, bleiben die Einordnungstexte lesbar.
- Originale vollständig mittels `object-fit:contain`; Vergrößerung pausiert den Film. Kein informationsverfälschender Crop, keine heroischen Zooms.
- Alle modernisierten Einordnungen außerhalb des Originals; Original, bibliografischer Nachweis und illustrierte Rekonstruktion ausdrücklich unterscheidbar. Keine späteren Bilder benutzt.
- Schülerantwort wird HTML-escaped und mit Original-Zeilenumbrüchen angezeigt; keine Umformulierung. Lange Antworten scrollen im eigenen Lesebereich.
- Reduced Motion entfernt die Einblendanimation. Identische Stationen und Zeiten.

## Prüfungen

- `scripts/check-epilogue.cjs`: alle 19 Stationen auf 1024×768, 820×640 und 1440×900; 57 Screenshotansichten. Keine horizontale Scrollbar, Schlusssteuerung ≥44 Pixel und im Sichtbereich, Originale geladen, Quellenzeilen innerhalb der Lesefläche.
- Vollständiger zeitgesteuerter Ablauf, 109 Sekunden und sieben Sekunden Schlussstand; Pause, Skip, Replay, Reload, Rechte-/Quellendialog und wörtlicher persönlicher Text.
- Replay: gespeicherter JSON-String und gesamter laufender State vor/nach exakt gleich. `chapter6.completed` unverändert; `epilogueSeen` separat geprüft.
- `scripts/check-epilogue-state.cjs`: begrenzte Ladezustände, Laufzeit und dokumentierte Originale.
- Fehlendes Bild absichtlich blockiert: textbasierte Station und Einordnung bleiben, kein Broken-Image. Fehlender Quelleneintrag: Einordnung bleibt ohne erfundene Quellenzeile erhalten. Unabgeschlossener Kapitelzustand startet nicht.
- `scripts/check-chapter-six-state.cjs`: bestehende Urteils-, Struktur- und Save-Grenzen.
- `scripts/check-chapter-six.cjs`: bestehende 114 Kapitelansichten und vier vollständige reale Lernwegvarianten; Notizbuchprüfung vor dem neuen Nachlauf.
- Screenshot-QA nach Ende der Einblendung: Quellenansicht, persönliche Abschlussseite, leeres Zimmer und Schlusstitel. Keine Flecken über Dokumenttext durch zusätzliche Filter.
