# Kapitel 6 – Asset-QA

Geprüft am 10. Oktober 2026. Umfang: Assetpaket, Staging und separater Prüfprototyp. Keine neue Kapitel-6-Runtime oder Auswertungslogik.

## Ergebnis

**54 bestandene Kompositionen**:18 Ansichten in jedem geforderten Format. Kein Browserfehler, keine fehlende Bilddatei, kein horizontaler Überlauf, kein abgeschnittener HTML-Text und kein überlappendes Touchziel.

| Ansicht | Fälle | Lesetext | Touchziele | Ergebnis |
|---|---:|---|---|---|
| 1024×768 | 18 | mindestens18px, vollständig sichtbar | mindestens44×44px | bestanden |
| 820×640 | 18 | mindestens18px, ohne verschachteltes Scrollen | mindestens44×44px | bestanden |
| 1440×900 | 18 | mindestens18px, ganze proportionale Bühne | mindestens44×44px | bestanden |

Der vollständige Nachweis steht unter `assets/chapter6/qa/results.json`.18 Bilder bei1024×768 liegen unter `qa/screenshots/`. Die36 zusätzlichen Bilder bei820×640 und1440×900 liegen lokal unter `artifacts/ch6-production/screenshots/` und sind auch im ZIP enthalten.

## Geprüfte Modi

Einstieg, vollständige Reflexionsbelegung, Freiheit damals/heute, theologisches Netz, Luther1520/1525, Erinnerungsbelege, Luther/Müntzer, reduzierter Urteilskomposition, drei Prüfdimensionen, Deutungsfelder, fünf Positionen, Schreiben, persönliche Abschlussseite, finale Freiheitsfrage, Pro/Contra-Arbeit, offenes Notizbuch, offene Mappe und alle offenen Tischobjekte gemeinsam.

- Begriffsnetz: Zentrum plus sieben Begriffe und sieben dynamische SVG-Verbindungen; keine Überschneidung der Touchflächen. Begriffe lassen sich per Touch auswählen.
- Positionierung: genau fünf echte Papierstreifen; exklusiver Wechsel per Touch geprüft.
- Schreiben: drei Belege, Gegenargument und acht kurze Absätze vollständig sichtbar.
- Abschlussübersicht: acht inhaltliche Bereiche vollständig sichtbar.
- Luthervergleich: kurze Zusammenfassungen, überprüfte Originalausschnitte und sichtbare Bezugsfrage vor den drei Deutungsaktionen.
- Quellenvergleich: gleiche Papierqualität, Farbgebung, Maßstäbe und Satzspiegel; keine Luther-hell/Müntzer-dunkel-Codierung.
- Erinnerungschronik: vier dynamische Originalbilder und HTML-Bildunterschriften; keine in die PNGs eingebrannten Screenshots.
- Kein Produktionsspielstand wurde angelegt oder verändert.

## Visuelle Prüfung

Die zwölf neuen Einzelbilder sowie Kompositionen in voller und kleiner Tabletansicht wurden angesehen. Der Raum gehört durch Holz, Leder, Pergament, groben Putz und zurückhaltendes Seitenlicht zur vorhandenen Spielwelt. Figurenfreie Arbeitsflächen und große Quellenansichten markieren den Perspektivwechsel. Keine Kinderfiguren, Abzeichen, Punkte, Comic- oder White-Card-Optik.

Die Tischrequisiten liegen innerhalb der tatsächlich dargestellten Tischfläche. Die offenen Varianten sind zusätzlich gemeinsam im Modus `prop_plane` geprüft. Blick-/Körpermaßstäbe sind hier kein neues Problem: Es gibt keine neue menschliche Figur. Originale Canon-Dateien bleiben unverändert. Die rohe alte Margarethe-Datei mit Randfragmenten wird nicht verwendet; der aktive Renderer verweist auf die reparierte Fassung.

Die Raumplanung und die tatsächliche malerische Tischperspektive unterscheiden sich. Das Manifest dokumentiert den anfänglichen Kameraplan und die am Bild gemessenen Kanten getrennt. Integrationsanker folgen der geprüften Tischfläche statt einem unzutreffenden abstrakten Horizont.

`qa/four-phases.png` stellt Einstieg, Netz, Quellenvergleich und Urteil nebeneinander. `qa/chapter5-6-coherence.png` zeigt Kapitel5/6 im Vergleich: gleiche Welt und Materialästhetik, bewusst anderer Arbeitsmodus. Das finale Buch lässt große ruhige freie Flächen; die Schlussfassung dimmt denselben Raum, ohne dramatische Steigerung.

## Dateiprüfung

Die zwölf neuen PNGs sind1024×768. Transparente Requisiten und Unterlagen sindRGBA mit echter Transparenz, ohne Hintergrundplatte; der Erinnerungsrahmen hat zusätzlich eine transparente Bildöffnung. Raum-/Arbeitsplatten sindRGB. Die komplette Leinwand wurde proportional exportiert, keine Gliedmaßen oder Objekte angeschnitten.

Das Manifest enthält24 vollständige Rollen und erklärt jede Wiederverwendung. Hashes sichern alle Bilddateien, die zehn bisherigen Kapitel-5-Canon-Referenzen und acht zusätzliche aktive Figurenreferenzen. Die ZIP-Prüfung vergleicht alle enthaltenen Dateien bytegenau mit den geprüften Originalen.

## Quellen der beiden kurzen Originalausschnitte

Die Freiheitsschrift wird nach der [digitalen Edition der Taylor Institution Library, Oxford](https://editions.mml.ox.ac.uk/editions/freiheit-1520/) verwendet. Der kurze Ausschnitt aus der schärferen Bauernkriegsschrift wurde an der [Quellendarstellung der Stiftung Luthergedenkstätten](https://www.luthermuseen.de/en/node/889) überprüft. Kürzungen sind mit […] markiert. Die übrigen theologischen Satzmuster sind ausdrücklich heutige Zusammenfassungen und unverbindliche QA-Beispiele.

Keine dieser Aussagen oder Überschriften ist im PNG eingebrannt. Die spätere Integration nutzt den vorhandenen Quellenrenderer und dessen editorische Einordnung.

## Prüfgrenzen und Integration

Zusätzlich bestanden die vorhandenen Prüfungen `check-chapter-five-state.cjs` (deterministische Folgen, widersprüchliche Saves, Idempotenz und Admin-Voraussetzungen) und `check-chapter-five-responsive.cjs` (vier vorhandene Leseflächen bei820×640, inklusive Tastaturauswahl). Das bestehende Kapitel5 bleibt unverändert.

Browserprüfung mit Edge/Chromium und Touch-Emulation auf Windows; kein Test auf einem physischen iPad mit Safari. Die drei verlangten Ansichten sind bestanden. Das Paket ist keine neue Handyversion.

Die Testtexte legen keine fachliche Musterlösung und kein tatsächliches Schülerurteil fest. Für wesentlich längere persönliche Ausarbeitungen sind aufeinanderfolgende volle Leseseiten vorgesehen; nicht immer mehr Inhalt in kleinere Schrift oder verschachtelte Scrollfenster pressen. Nach der späteren Integration sind echte Spielstände, personalisierte Rückschau, finale Fachtexte, Speicherverhalten und iPad-Safari gesondert zu prüfen.

Prüfskripte: `scripts/check-chapter-six-assets.cjs` und `scripts/check-chapter-six-package.py`. Keine Änderungen an bestehender Story-/Save-Logik oder dem GitHub-Pages-Deploymentweg.
