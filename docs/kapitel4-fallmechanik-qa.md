# Kapitel 4: fünf einzelne Konfliktfälle

Die Szene `ch4_regiments` zeigt jeweils einen Fall mit vier Einordnungen im
2×2-Raster. Erst eine Einordnung öffnet drei fallbezogene Begründungen. Die
gewählte Begründung ersetzt diese Auswahl durch eine kurze Rückmeldung und
einen aktiven Fortsetzungsbutton. Nach Fall 5 folgt die Mehrfachauswahl zur
Synthese; A, B und D sind tragfähig. Die nächste Spielszene bleibt `ch4_boundary`.

Die Begründungen unterscheiden jeweils zwei sinnvolle Prüfungsaspekte von
einem zu weitreichenden Schluss. Es gibt keine erzwungene Einwortlösung für
jeden Fall. Rückmeldungen berücksichtigen Einordnung und Begründung; auch
eine problematische Auswahl blockiert die Fallfolge nicht. Die Aufgabe
verändert weder Orientierungen noch Figurenwahrnehmungen.

## Speicherung

- `chapter4.twoRegimentsCases[caseId] = { classification, reasoning }`
- `chapter4.regimentsIndex`: aktueller Fall, 0–4; 5 bedeutet Synthese.
- Synthese: `selections.regiments_synthesis`, `resolved.regiments`.
- Alte Kategorie-Strings mit separaten `caseReasons` werden beim Laden
  zusammengeführt. Der erste noch offene Fall wird wieder aufgenommen.
- Neue Spielstände behalten den aktuellen Fall auch nach der Begründung bei,
  bis „Nächster Fall“ gewählt wird. Rückmeldungen werden aus den gespeicherten
  Entscheidungen erneut dargestellt.
- Admin-Sprünge zu späteren Szenen setzen die vollständig bearbeitete Aufgabe
  zentral in `prepareChapterFourAdmin` voraus.

## Prüfung

`scripts/check-chapter-four-regiments.cjs` prüft 1024×768, 820×640 und 1440×900:
einzelne Fälle, 2×2-Auswahl, progressive Begründungen, alle 60 Rückmeldungs-
kombinationen, keine Seiten- oder internen Scrollbars, mindestens 44 Pixel
große Touchziele, Klick/Tap/Tastatur, Fokus beim Weitergehen, Reloads,
Synthese, alte/ungültige Speicherdaten und den geschützten normalen Spielstand.

Zusätzlich bestanden: alle 15 Kapitel-4-Durchläufe (fünf Wege × drei Größen),
Kapitel-4-Detailtests für Szenen/Quellen/Archiv/Admin, Konsequenz- und
Speichertests sowie Originalbild- und Exportprüfungen. Die alten Tisch- und
Drag-Kartenbilder bleiben unverändert im Assetpaket, sind aber als nicht mehr
aktive Materialien registriert. Es wurden keine neuen Bilder erzeugt.
