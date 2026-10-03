# Kapitel 3 – Asset-Paket und Prüfung

Erstellt am 3. Oktober 2026 für „Aus Beschwerden werden Forderungen“.
Referenz: das gelieferte Canon-Archiv für Kapitel 1/2 und die Originalmaterialien
im bestehenden Repository. Neue Bilder mit der eingebauten Imagegen-Funktion;
Prompts in `chapter3-asset-prompts.json`.

## Lieferumfang

`exports/chapter3_assets_final/` enthält 45 neue PNGs, `manifest.json` und
`README_ASSET_NOTES.txt`. Das gleichnamige Wurzelverzeichnis ist vollständig
in `exports/1525_kapitel3_assets_final.zip` verpackt, einschließlich des bewusst
leeren `overlays/`-Ordners. Neue globale UI oder Hotspot-Bilder sind nicht nötig.

| Gruppe | Anzahl | Export |
| --- | ---: | --- |
| Hintergründe | 4 | exakt 1024 × 768, 4:3 |
| Figuren | 10 | 512 × 896, transparent |
| Sprecherportraits | 10 | 512 × 512, transparent |
| Versammlungsobjekte | 6 | kompakte transparente PNGs |
| Dokumentuntergründe | 4 | ruhige, textfreie Papierflächen |
| Druckerei-Layer | 8 | transparente Einzelobjekte |
| Karte und Marker | 3 | Karte 1024 × 768; zwei kompakte Marker |

Lotzer: neutral, sprechend und lesend. Dazu Georg, Katharina, Hans, Drucker
und Matthes (neutral, sprechend, lesend). Die Sprecherportraits übernehmen ihre jeweiligen Identitäten.
Keine bestehenden Figuren oder Bilder wurden überschrieben.

## Wiederverwendung und Matthes-Canon

Peter, Anna, Jakob, Konrad, Dorf-Hub, Dialogbox, Portraitslot, Notizbuch,
Buttons, Leder-/Pergamentmaterialien und die drei v2-Hotspots werden direkt
aus dem Repository geladen. Das Manifest listet die Originalpfade und
Prüfsummen; die ZIP enthält keine redundanten Canon-Kopien.

Der Nutzer bestätigt, dass Matthes bisher keinen sichtbaren Auftritt hatte.
Auf seinen ausdrücklichen Wunsch wird die bisher generische Reisendenfigur
zum ersten verbindlichen Matthes-Canon. Neutralfigur und Neutralportrait
bleiben bytegleich und erhalten eindeutige Matthes-Dateinamen. Sprechende
und lesende Figur mit textfreien Papieren sowie passende Portraits wurden
mit Imagegen unter Erhalt von Gesicht, Kleidung, Tasche und Gehstock ergänzt.
Das Manifest dokumentiert alle sechs Zustände, Ursprungsprüfsummen und
Dateinamenmigration. Die frühere Canon-Lücke ist damit geschlossen.

## Visuelle und technische Prüfung

Alle Bilder wurden einzeln während der Produktion und abschließend in
Übersichten mit hellem Papierhintergrund betrachtet. Vollständige Köpfe,
Haare, Kopfbedeckungen, Kinn, Hände und Objektränder geprüft. Lotzers
Gesprächspose wurde wegen eines zusätzlichen Arms ersetzt. Die Druckplatte
wurde aus dem Pressengestell entfernt, damit sie separat bewegt werden kann.

PNG-Export: Proportionen erhalten, nur technische Skalierung und enge
Objektgrenzen mit transparentem Rand; nahezu unsichtbares Alpha-Rauschen
entfernt. Kein Bildinhalt wurde mit programmatisch erzeugten Ersatzgrafiken
ersetzt. Transparenz wurde anhand des Alpha-Kanals geprüft, nicht allein
anhand der Bildvorschau. Eine Vorschau zeigte beim Tisch unsichtbare RGB-
Hintergrundfarben; die finalen PNGs sind tatsächlich freigestellt.

`scripts/check-chapter-three-assets.py` besteht: 45 Dateien, vollständige
Manifestfelder, Maße, Alpha, mindestens 4px Sicherheitsrand, kompakte
Objektgrenzen, Prüfsummen, verfügbare Reuse-Pfade und ZIP-Integrität.

Alle vier Hintergründe wurden außerdem in einer separaten Browser-Prüfansicht
bei 1024 × 768 und 820 × 640 mit zwei Figuren, Sprecherportrait, Dialogbereich
und dem originalen Hotspot-System betrachtet. Das vollständige 4:3-Bild bleibt
sichtbar, Bedienflächen sind mindestens 44px groß, keine horizontalen
Scrollbars oder fehlenden Bilder. Prüfaufnahmen liegen lokal unter
`artifacts/ch3-qa/` und sind nicht Teil der Spieloberfläche oder der ZIP.
Die unteren 26% sind als Dialogzone vorgesehen; konkrete Szenenanker müssen
bei der späteren Kapitelimplementierung am tatsächlichen Bild geprüft werden.

Bestehende Regressionen bestanden:

- `check.cjs`: vollständiges Kapitel 1, Dialog/Antworten/Aufgaben/Feedback,
  Quellen, Notizbuch, Save/Reload, Tastatur und fünf Viewports.
- `check-chapter-two.cjs`: alle Stationsreihenfolgen, Feedback, Touch/Maus,
  Notizbuch, Übergänge und fünf Viewports.
- `check-admin.cjs`: alle Checkpoints und Schutz des regulären Spielstands.
- `check-world-hotspots.cjs`: Sichtbarkeit, 44px-Ziele, Fokus, Touch,
  Überlappungen und weiterhin verborgener früher Exit.
- `check-chapter-two-staging.cjs`: alle Kapitel-2-Checkpoints bei 1440 × 900,
  1024 × 768 und 820 × 640; Figurenmaße und Bodenkontakt.
- `check-ui-details.cjs`: alle Portraitzustände, Übergangshierarchie und
  konstante Drag-Ghost-Größen bei 1440, 1024 und 820px.
- `check-consequences.cjs`: Konsequenzen, Legacy-/Reload-Fälle, Kapitel-
  Rückmeldungen, Admin-Sprünge und geschützter Schüler-Spielstand.

## Historische Einordnung und Einsatzgrenzen

Plausibilität anhand des Stadtarchivs Memmingen und des Gutenberg-Museums
geprüft: Lotzer als Kürschner/Schreiber, Beratungen im März 1525, hölzerne
Handpresse, Metalltypen und Lederfarbballen. Quellenlinks stehen im Manifest.
Die Stadt-/Werkstattansichten sind atmosphärische Spielillustrationen;
sie behaupten keine belegte Rekonstruktion eines konkreten Memminger Ortes.
Insbesondere ist die Spielwerkstatt keine Aussage über den Ort des Erstdrucks
der Zwölf Artikel. Lotzers Gesicht ist kein historisch belegtes Porträt.
Die Karte ist abstrakt; konkrete Orte und Ausbreitungsrouten gehören ins
geprüfte HTML-/SVG-Overlay. Luthers „Ermahnung zum Frieden“ darf nicht als
bereits veröffentlichte Quelle im März-Abschnitt verwendet werden.

Dieses Ergebnis ist das beauftragte Asset-Paket. Kapitel-3-Spiel-, Dialog-,
Aufgaben- und Speicherlogik wurden nicht ergänzt. Deshalb sind die neuen
Assets noch keine spielbare Kapitel-3-Integration. Auf vorhandene Figuren,
Notizbuchtexte, fachliche Inhalte, Save-System und Kapitelstruktur wurde
nicht eingewirkt. Der bestehende GitHub-Pages-Veröffentlichungsweg bleibt
unverändert.

## Matthes-Ergänzung vom 3. Oktober 2026

Alle sechs Matthes-Assets auf hellem Papierhintergrund geprüft: vollständige
Köpfe, Kinn, Hände, Füße und Gehstock; genau zwei Arme/Hände in den Posen.
Alle drei Zustände zusätzlich mit originaler Dialog- und Hotspot-UI bei
1024 × 768 und 820 × 640 geprüft. Der Asset-Check kontrolliert die sechs
Canon-Dateien und unveränderte neutrale Ursprungsbilder ausdrücklich.
Die oben aufgeführten Spielregressionen stammen aus der Paket-Erstprüfung;
für diese reine Asset-Ergänzung wurde keine Spiellogik verändert.
