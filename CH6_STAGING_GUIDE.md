# Kapitel 6 – Staging-Guide

Stand: 10. Oktober 2026. Assetproduktion für „Was bleibt von Freiheit?“, ohne neue Kapitel-, Aufgaben- oder Speicherlogik.

## Verbindliche Auflösung der Assetnamen

Das Manifest enthält **alle 24 verlangten Funktionsnamen**, aber nur **12 neue PNGs**. Geeignete Materialien werden bewusst mehrfach verwendet: zwei Zustände desselben Raums, neutrale Mappen, gleichwertige Buchseiten und die große Schreibfläche. `filename` benennt die gewünschte Funktion; **`path` ist die tatsächlich zu ladende Datei**. `aliasOf` und `reusedFrom` erklären jede Wiederverwendung. Keine Aliasdateien oder konkurrierenden Canon-Bilder erzeugen.

`ch6_bg_reflection_room_entry.png` und `ch6_bg_judgment_table.png` werden als **Kompositionen über der Hauptplatte** geliefert. Ihre verbindlichen Objektbelegungen stehen unter `compositions.entry` und `compositions.judgment`. Es gibt keine zusätzliche nahezu identische Raumkopie und keine fest eingebrannten Quellen.

## Kamera und räumlicher Vertrag

Alle neuen PNGs haben 1024×768 Pixel. Die gesamte 4:3-Leinwand proportional darstellen; weder beschneiden noch verzerren. Raumplatte und Betrachtungsflächen sind verschiedene Ansichten: kleine Requisiten liegen auf dem Tisch, umfangreiche Texte erscheinen auf einer großen Buch-/Manuskriptansicht.

Die Kameraplanung begann mit Horizont27% und Fluchtpunkt52%/27%. Am fertigen malerischen Bild ergeben die verlängerten Tischkanten einen ungefähren Tisch-Fluchtpunkt55%/-12%, außerhalb der Leinwand. **Die gemessene Tischfläche ist deshalb verbindlich**, nicht der anfängliche Planungswert. Das Manifest dokumentiert beide Werte. Tischpolygon: hinten(18,43)/(84,43), vorne(97,67)/(2,67). Dokumentebene ungefähr(20,46)/(80,46)/(88,64)/(10,64).

Licht: spätes neutrales Tageslicht von links; dezentes Kerzenlicht rechts. Die Schlussfassung behält die Architektur und reduziert das Licht. Keine Figuren in Hintergrundplatten oder Arbeitsflächen.

Die untere Raumzone y74–100% ist für Dialog/Einordnung reserviert. Für Lesemodi wird die ganze Bühne genutzt; nicht gleichzeitig einen Raumdialog über Buchtext legen. Oberer rechter freier Wandbereich x68/y15/B18/H15 bleibt zusätzlich verfügbar und hält Abstand zur Kerze. Im Quellenraum gehören die Marker räumlich zu den Objekten.

## Requisiten platzieren

`compositions` liefert Objektmittelpunkte `x/y`, die **sichtbare** Breite `visibleWidth` und eine ausdrücklich dokumentierte Tischprojektion `scaleY`. Die nativen `alphaBounds` bestimmen die echte Objektgröße. Beispiel: sichtbare Breite13% geteilt durch die Breite der Alpha-Bounds ergibt die Bildskalierung; anschließend deren Mittelpunkt am Ziel verankern. Transparente Randflächen zählen nicht als Körper-/Objektgröße.

Bereits perspektivische neue Bücher/Mappen und die Bibel behalten `scaleY:1`. Frontal gezeichnete ältere Dokumente erhalten die flache Tischprojektion0.38–0.4, das alte geschlossene Notizbuch0.6. Das betrifft **nur die Bilddarstellung im Raum**. HTML-Schrift niemals mit verzerren. Lesetexte erst in der großen Ansicht darstellen.

Der Test `prop_plane` zeigt offene Notizbuchvariante, offene Mappe und Bibel auf derselben Tischfläche. Keine erfundenen zusätzlichen Schattenplatten. Die Bilddateien bleiben unverändert.

## Phasen und Lesemodi

| Phase / QA-ID | Background / Arbeitsfläche | Belegung, Text und Handlung |
|---|---|---|
| entry | reflection_room_entry → Hauptplatte | Nur Notizbuch, x22/y55/B16; object-Marker „Mein Notizbuch“, x13/y34/B19/H9. |
| reflection | reflection_room | Notebook links, zwei Lutherdokumente mittig, Bibel und Müntzermappe rechts; drei Erinnerungsausschnitte im Vorderteil. Exakte Werte im Manifest. |
| freedom | freedom_then_now | Gleich große frühe/heutige Schreibseiten. Kein richtig/falsch-Farbcode. |
| network | theological_network_table + vorhandener Blankmarker | Zentrum und sieben Begriffe; sieben dünne SVG-Tintenlinien, nicht im PNG. Koordinaten unter networkNodes. |
| luther | luther_1520_1525 → Doppelbuch | Zusammenfassung und kurzer überprüfter Originalausschnitt je Seite; Deutungsfrage vor der Auswahl, Auswahl als eigenes Folio/Handlung. |
| interpretation | luther_interpretation_scale | Drei gleichwertige Felder. „Nicht eindeutig“ bei Bedarf als gemeinsame Nebenaktion. |
| memory | memory_evidence_table | Vier dynamische Bilder in imageWindows, kurze einzeilige HTML-Bildunterschriften. |
| evidence | evidence_pro_contra → Doppelbuch | Gleiche Lesefläche für stützende und herausfordernde Argumente. |
| comparison | luther_muentzer_comparison → Doppelbuch | Luther/Müntzer gleicher Maßstab, gleiches Material, gleichwertige Textmengen. |
| judgment | judgment_table → Hauptplatte | Nur Notebook, Freiheit, Obrigkeit, Friedensermahnung, schärfere Schrift und Müntzer-Kontext. Keine zusätzlichen Erinnerungsrahmen. |
| dimensions | judgment_dimensions → Dreiblatt | Theologische Folgerichtigkeit, historische Einordnung und ethische Verantwortbarkeit gleichwertig prüfen. |
| position | final_position | Genau fünf großzügige Auswahlstreifen; eine Position auswählen, keine Radio-/Scoreoptik. |
| writing | final_judgment_writing | Drei Belege, Gegenargument und acht kurze Absätze im Test. Ruhige durchgehende Schreibfläche. |
| personal | personal_final_page → Schreibfläche | Acht semantische Abschnitte: offene Frage, Anfang, Ende, Konflikt, Urteil, Belege, Gegenargument, Schluss. |
| final | final_question + final_book | Gedämpfter identischer Raum, nur großes Buch mit frühem/heutigem Verständnis und Freiheitsfrage. |
| notebook / folders | offene Props in Betrachtungsansicht | Nur kurze Hinweise; längere Texte verwenden die große Buchansicht. |
| prop_plane | Hauptplatte | Zusätzliche reine Perspektivprüfung aller offenen Tischobjekte. |

Der Einstieg ist fast leer. Mehr Materialien werden erst für die Rekonstruktion bereitgelegt. Netz und Vergleich bündeln die Arbeit; finale Urteils- und Buchansicht reduzieren sie wieder. Nicht alle Materialien gleichzeitig zeigen.

## Text-Safe-Areas

Für jedes UI im Manifest: x/y/width/height, fontSizePx, maxCharacters und scrollAllowed. Prozentwerte beziehen sich immer auf die **ganze Bilddatei**. Die aufgeführten Beispielmengen sind Orientierung, keine Garantie für beliebige Wortlängen. In der kleineren Ansicht ist die geprüfte Textmenge maßgeblich.

Fließtext bleibt mindestens18px, Zeilenhöhe ungefähr1.3–1.36. Deutsche Worttrennung erlauben. Doppelbuch: links x11/y15/B34/H65, rechts x55/y15/B34/H65. Schreiben: x10/y12/B80/H76. Beide Quellenpositionen erhalten denselben Satzspiegel. Die Quelle und deren Einordnung sind HTML, keine Bildschrift.

Die lange persönliche Ausarbeitung kann mehr Text erzeugen als das Muster. Dann **aufeinanderfolgende volle Leseseiten** vorsehen, keine kleinen verschachtelten Scrollfenster. Die Abschlussübersicht fasst die eigene Ausarbeitung zusammen. Diese Runde implementiert dafür keine neue Logik.

## Hotspots und Responsive

Bestehendes `hotspot()` aus `js/hotspots.js`; Typen object/path/action; Originalmaterialien aus `assets/ui/hotspots/v2/`. Farben, Schriften und Materialvariablen aus `css/art-direction.css`; keine zweite globale Designsprache. Die QA-Seite verwendet dieselben Marker und verändert keine globale CSS-Datei.

Geprüfte Ansichten:1024×768,820×640,1440×900. Mindest-Touchziel44px. In der QA wird die Bühne auf `min(viewportWidth-16,(viewportHeight-118)*4/3)` gesetzt; HTML-Schrift bleibt unabhängig davon18px. Leseflächen bevorzugt vollflächig öffnen. Für die spätere Runtime übernimmt `css/staging.css` die räumlichen Anker. Diese Runde baut keine Handyoptimierung.

## Anschluss an Kapitel 5

Rückschau aus `data/story-recap.js` weiterverwenden. `buildStoryRecap(g)` rekonstruiert die tatsächlichen Entscheidungen/Folgen. Nicht die QA-Bilder als persönliche Rückschau ausgeben. Geprüfte dynamische Beispiele zeigen vorhandene Originalplatten; später dieselben Figuren-/Layerregistrierungen wie in der Rückschau übernehmen.

Vorhandene Felder: `chapter5.openTheologicalQuestion`, `choices.initialFreedomInterpretation`, `chapter5.freedomAfterAction`. Den Kapitel-5-Abschluss, aktuelle Speicherfelder, Quellenrenderer und Gesprächsmarker nicht durch Assetarbeit verändern. Keine Storyfigur wird zur dauerhaften Erklärfigur.

## Nicht kombinieren

- Entry nur mit Notebook; keine Quellenfülle.
- Judgment ohne Memory-/Netzbelegung.
- Netz und Doppelbuch sind alternative große Arbeitsansichten.
- Offene/geschlossene Version eines Objekts nicht zugleich zeigen.
- Luther-/Müntzermappen sind zwei Instanzen derselben neutralen Bilder; HTML-Name bleibt unabhängig.
- Keine Legacy-Dorfplatten oder verworfenen Gruppenschichten.
- QA-Screenshots niemals als finale Hintergrundplatten laden.

Prüfseite: `assets/chapter6/qa/preview.html?scene=entry`. Sie ist ein separater Assetprototyp und keine freigeschaltete Kapitel-6-Runtime.
