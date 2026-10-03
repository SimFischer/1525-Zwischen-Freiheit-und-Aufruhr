# Kapitel 4: Work-Assets und Runtime-Abgleich

Ausgangspunkt: aktueller `main`, Commit `2e29c3e`. Der Stand enthielt bereits die Work-Produktion und deren erste Integration. Die Originaldateien wurden nicht neu erzeugt, verändert oder doppelt kopiert.

## Abschließende Integration

Der Szenenrenderer wählt jetzt unmittelbar die freigegebenen Kompositionen. Die alte Auswahl problematischer Platten und Gruppen mit anschließendem Überschreiben ist entfernt. Hintergrund, Overlay und Props besitzen eine gemeinsame Asset-Zuordnung für Darstellung und Detail-Debugmodus. `?debug=true` zeigt `chapter4World` einschließlich der aktiven Dateien und Figurenanker.

Die Zuordnung folgt `CH4_STAGING_GUIDE.md` und `manifest.json.scene_staging`. Der Browsertest vergleicht alle 36 Szenen und 37 Varianten direkt mit dem Manifest: Hintergrund, Overlay, Canon-Figuren, Körperhöhe, Fußlinie und Props. Ein zusätzlicher Vergleich gegen den bisherigen Renderer ergab identische Kompositionen in allen 365 gespeicherten Prüffällen. Änderungen betreffen die Darstellung und ihre Prüfung; fachliche Entscheidungen, Dialoge, Aufgaben, Notizbuch und Speicherstruktur sind erhalten.

## Freigegebene Work-Kompositionen

| Bereich | Aktive Dateien |
|---|---|
| Dorf und Druckwirkung | `ch4_bg_village_consequence_hub.png` mit genau einem der vier `ch4_overlay_consequence_*`-Zustände |
| Verhandlung | `ch4_bg_manor_negotiation_rebuilt.png`; Peter, Konrad und Verwalter/Bote; Schriftstücke auf dem Wandtisch |
| Gemeinde | `ch4_bg_village_assembly_rebuilt.png`; Anna, Peter und Jakob in der freien Sprecherfläche |
| Theologische Quellenarbeit | `ch4_bg_jakob_study_rebuilt.png`; vollständige Canon-Figuren, Thüringen-Bericht bzw. Warnbrief am Tisch |
| Eskalation | `ch4_bg_village_escalation_rebuilt.png`; gezielte Figurengruppe, kein zusätzlicher Rauch-/Flüchtlings-/Bewaffneten-Layer |
| Widerstand | Original-Speicher und Bauernlager; freigegebene Blockade-/Abmarsch-Overlays |
| Quellen und Aufgaben | Elf Dokumentunterlagen, Weingarten-Bericht, Zwei-Regimente-Tisch, Fallzettel und Drei-Auslegungs-Tisch |

Körperhöhen und Bodenlinien bleiben raumbezogen: Dorf/Hof 41%/71%, Studierraum 37%/71%, Gemeinde 33%/72%, Lager 36%/71%, Speicher 33%/71%. Spiegelung betrifft ausschließlich die Figurenbilder. Alle Assets und Canon-Dateien stimmen bytegenau mit den Work- bzw. Wiederverwendungsnachweisen überein.

## Aus aktiven Routen ausgeschlossen

Die alten Hintergründe `manor_negotiation`, `village_assembly_large`, `village_edge_group`, `jakob_study_table` und `village_escalation`; die Gruppenlayer `delegation`, `withheld_dues`, `public_meeting`, `resistance_group`, `smoke_distance`, `refugees_cart`, `armed_group`, `religious_polarization` und `events_moved_without_you`; die alten frei schwebenden Props `warning_notice`, `letters_other_villages` und `bible_open`.

Diese Dateien bleiben entsprechend dem Work-Manifest archiviert. Der Runtime-Test prüft, dass keine davon angefordert wird und jedes freigegebene aktive Asset tatsächlich verwendet wird.

## Prüfung

- Fünf vollständige Routen A–E an drei Bildschirmgrößen; alle vier Einstiegspfade, alle theologischen Wege und alle fünf Endzustände. Je Route elf echte Save/Reload-Checkpoints, insgesamt 165.
- Alle 56 Antwortoptionen, unmittelbare Konsequenzen, Quellenfreischaltung, Archiv, spätere Verhandlung nach Begrenzung der Mittel und Revision des Endzustands.
- 73 Szenen/Varianten bei 1024×768, 820×640, 1440×900 sowie 768×1024 und 1024×1366: Manifest-Übereinstimmung, unverzerrte Körper, Bodenkontakt, Blickrichtung, keine Körperkollisionen oder abgeschnittenen Figuren, freie Panelbereiche und mindestens 44px große Bedienelemente.
- Zusätzliche Exploration nach Dialogende: räumlich verankerte Fortsetzungsmarker ohne Körperkollision.
- 120 Quellen-/Zoomansichten: mindestens 18px Text, vollständiger Inhalt, Scrollen bis zum Ende, erreichbare Navigation, keine horizontalen Scrollbars.
- Maus, Touch-Tippen, Touch-Ziehen, Tastatur und Abbruch; Admin/Debug, getrennte Testzustände, alte Saves und Schutz des Schüler-Spielstands.
- Bestehende Prüfungen für Kapitel 1–3, Hotspots, Konsequenzen, Portraits, Quellen, Druckerpresse, Übergänge und vollständige Spielrouten.
- Asset-Paket und ZIP bytegleich; keine fehlenden aktiven Dateien oder JavaScript-Fehler.

Alle fünf Endzustände bleiben unterscheidbar: Verhandlung am Hof, versammelte Gemeinde, Bauernhaufen mit Abmarsch, religiöse Polarisierung und leerer Dorfplatz mit Jakob. Der vorhandene Kapitel-5-Ausblick bleibt gespeichert und unverändert.

Screenshots und Maschinenprotokolle liegen lokal unter `artifacts/ch4-consolidation/`, `artifacts/chapter4/`, `artifacts/chapter4-details/`, `artifacts/ch4-source-scroll/` und `artifacts/ch4-integration/`. Die subjektive Wirkung wurde zusätzlich anhand der gerenderten Gesprächsgruppen und Szenenübersichten geprüft. Kein verbleibender technischer Fehler in den geprüften Szenen.
