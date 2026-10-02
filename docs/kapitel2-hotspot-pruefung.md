# Kapitel 2: Prüfung der Hotspots am Bild

Geprüft am 2. Oktober 2026: alle 23 registrierten Kapitel-2-Testpunkte und
zusätzlich der Dorf-Hub nach allen Pflichtstationen sowie die drei erneut
betretenen, abgeschlossenen Stationen. Ansichten: 1024×768 und 820×640;
Exploration und Gesprächseinstieg zusätzlich 390×844 mit Touch.

## Einzelprüfung der räumlichen Hotspots

| Szene / Hotspot | Bezug im tatsächlichen Hintergrundbild | Prüfung |
|---|---|---|
| Dorf: Zum Wald | linker Weg am Waldrand | am Weg, frei von Zaun und Holzstapel |
| Dorf: Peters Hof | Zugang vom Dorfweg zum Hof links des Brunnens | Pfeil zum Zugang, nicht auf Dach oder Fassade |
| Dorf: Margarethes Hof | rechte Abzweigung hinter dem Brunnen | Richtungsschild am Weg; Brunnen und Figuren bleiben frei |
| Dorf: Zur Taverne | Zugang rechts bei der Tavernenfassade | erst nach Freischaltung sichtbar; frei von den später hinzukommenden Säcken |
| Wald: Alter Sammelplatz | Boden- und Zaunbereich unterhalb der Holzscheite | markiert die Fläche, nicht den Stapel |
| Wald: Älteres Nutzungszeichen | obere Kante des großen Stumpfs rechts | eingraviertes Zeichen darunter vollständig sichtbar |
| Wald: Neuer Grenzpfahl | unmittelbar rechts des herrschaftlichen Pfahls | Adler und Herrschaftszeichen frei; auch auf kleinen Ansichten keine verdeckte Anna |
| Wald: Zurück ins Dorf | unterer Waldweg in Richtung Dorf | Wegweiser am Rückweg; getrennt vom Gesprächseinstieg |
| Wald: Mit dem Verwalter sprechen | Verwalter rechts von Anna | Figur direkt anklickbar; Lederschild unmittelbar unter den Füßen statt auf dem Körper |

Die vier Dorfziele wurden sowohl ohne als auch mit den sichtbaren Folgen der
abgeschlossenen Stationen geprüft. Dabei lagen zuvor das Hofschild vor dem
Verwalter und das Tavernen-Schild auf den Getreidesäcken. Die Figur und die
Säcke stehen jetzt außerhalb der Wegweiser.

## Übrige Szenen und Interaktionen

- Kapitelstart und Kapitelende: Bedienelemente auf der bestehenden
  Pergament-Kapitelkarte, keine räumlichen Objekt- oder Figurenmarker.
- Peters Hof: Tagesplan, Entscheidung, Sicherung, Reflexion und erneuter
  Besuch geprüft. Arbeitskarten und Rückkehr liegen im bestehenden
  Aufgaben-/Abschlusspanel; sie behaupten keinen Bezug zu einem zufälligen
  Hintergrundobjekt. Dialoge nutzen die vorhandene Sprecheransicht.
- Margarethes Hof: Ausgangsplanung, Forderungen, Vorratsbereiche, Reflexion
  und erneuter Besuch geprüft. Sack-Auswahl und Ablegen/Entnehmen beziehen
  sich auf den jeweiligen Sack bzw. beschrifteten Vorratsbereich im
  Pergamentpanel. Keine zusätzlichen Marker am Brunnen, an Geräten oder
  an den Figuren.
- Dorfversammlung: Gespräch, Beschwerdetisch, Forderungen, Luther-Rückgriff,
  eigene Forderung, Konrad und Memmingen geprüft. Auswahlmarkierungen liegen
  auf ihren Dokumenten, Fortsetzung und Quellen-Navigation an den passenden
  Panels. Keine zusätzlichen, beliebig platzierten Szenenmarker.
- Quellen, Notizbuch, Spielmenü und Kopfzeile: vorhandene historische
  Bedienelemente bleiben erhalten. Die vollständigen Kapiteltests prüfen
  Quellenfolge, Notebook, Save/Reload und die Navigation mit.

Alle räumlichen Marker verwenden dieselben Materialvariablen wie Kapitel 1:
Holz für Wege, Pergament für Spuren und Leder für das Gesprächsschild.
Markierungen bleiben ohne Hover sichtbar; Fokus unterstreicht ihre Beschriftung.
Es wurden keine Bilder erzeugt, Inhalte oder Spiel-/Speicherlogik geändert.

## Nachweis

`scripts/check-chapter-two-staging.cjs` prüft jeden registrierten Testpunkt
und die abgeschlossenen Zustände bei beiden Tablet-Größen. Es erfasst alle
sichtbaren Szenenmarker und Panel-Bedienelemente, speichert Screenshots und
eine lesbare Inventarliste in `artifacts/chapter-two-hotspot-inventory.json`.
Es prüft außerdem Touchziele, überlappende Marker, freie Figuren und
Fortschrittsobjekte im Dorf, das Schild unter dem Verwalter, Figurenrichtung,
Auftritt, Gespräch und Reload sowie fehlenden horizontalen Überlauf.

Die automatische Geometrieprüfung ergänzt die Sichtprüfung am tatsächlichen
Bild; sie ersetzt die Prüfung der inhaltlichen Zuordnung nicht.

## Erweiterter visueller und szenischer Qualitätscheck – 3. Oktober 2026

Alle 27 Zustände zusätzlich bei 1440×900 geprüft. Die vorhandenen
Kapitel-1-Hintergründe, Figurenidentitäten und Dialogporträts bleiben erhalten.
Peter, Anna und Jakob wurden mit der bestehenden Tavernenillustration und
ihren vorhandenen Porträts verglichen. Gesicht, Haar, Bart, Kleidung und
Palette der verwendeten Assets wurden nicht verändert. Neue Figuren nutzen
weiterhin dieselben vorhandenen Assets wie bei ihrem ersten Auftreten;
die Reisende erscheint im vorhandenen Dialogporträt.

| Bereich | Sichtprüfung und Korrekturen |
|---|---|
| Dorf | alle Wege und sichtbaren Stationsfolgen; kleine Figur mit Kontaktellipse im Hintergrund, Marker bleiben frei |
| Wald | Bodenkontakt, Blickachsen, vollständig sichtbare Zeichen, sanfter Auftritt, Schild unter den Füßen; kleine Ansichten ebenfalls geprüft |
| Peters Hof | Verwalter auf freien Boden vor dem Zaun versetzt und zu Peter gespiegelt; Fremdfigur am Rand des Zeige-Sprites durch eine Darstellungsmaskierung ausgeblendet; Tagesplan auf Pergamentstreifen, Planung auf Holzunterlage |
| Margarethes Hof | Verwalter aus dem Bereich der rechten Möbel auf freien Boden versetzt und zu Margarethe gespiegelt; fremder Handrest am Spriterand ausgeblendet; Säcke ohne dauerhafte Kartenkästen und Vorratsbereiche mit Holzrahmen |
| Dorfversammlung | Konrad und Margarethe kleiner an freie Randbereiche des Raumes versetzt, zum Gespräch gewendet und im warmen Abendlicht abgedunkelt; Dokumente kleiner auf die Tischkante gelegt, Luthers Blatt bei Jakob bleibt frei |
| Beschwerdetisch | gleiche Aufgabenkomponente mit Holzunterlage und losen Pergamentzetteln; keine neue Minispiel-Logik |
| Luther-Rückgriff und Forderung | bestehende Quellenbilder und HTML-Texte, Dialog- und Aufgabenkomponenten behalten; Quellennavigation mit vollständigem Kapiteltest geprüft |
| Übergänge und Abschluss | kurzer Bild-Fade bei Ortswechseln und sanftes erstes Auftreten der Figuren; Wiederholungsrenders spielen den Auftritt nicht erneut ab; reduzierte Bewegung berücksichtigt |

Zusätzlich zu den 27 Zuständen wurden Rückmeldung nach einer falschen Antwort und beide Quellenbilder im Luther-Rückgriff bei allen drei Größen aufgenommen und geprüft.

Die zusätzlichen Schatten liegen unmittelbar unter den Füßen. Lichtfilter,
Spiegelung und Maskierung betreffen nur die Darstellung; die Originaldateien
werden unverändert verwendet. Aufgabenpanels liegen wie in Kapitel 1 im
Vordergrund und können den unteren Teil der Szene verdecken; die Figurenassets
werden dabei nicht verzerrt oder an den Viewporträndern abgeschnitten.

Der erweiterte Staging-Test prüft die Seitenverhältnisse, Bildgrenzen und
Abstände zwischen Füßen und Kontaktschatten aller zusätzlichen Figuren bei
jedem Testpunkt. Die Prüfung dokumentiert den Stand am Bild, nicht eine
Garantie historischer Detailgenauigkeit der vorhandenen Illustrationen.
