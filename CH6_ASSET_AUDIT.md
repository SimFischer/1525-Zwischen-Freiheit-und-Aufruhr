# Kapitel 6 – Asset-Audit

Stand:10. Oktober 2026. Ausgangsstand715fece; ausschließlich Assetproduktion, Staging, QA und Dokumentation. Keine komplexe Kapitel-6-Logik, keine Änderungen an Kapitel1–5, Saves oder fachlichen Texten.

## Prüfung des vorhandenen Projekts

Geprüft: aktuelle Kapiteldefinitionen1–5, Kapitel-5-Abschluss und Handoff, filmische persönliche Rückschau in data/story-recap.js, vorhandene Quellen/Quellenregionen, Notizbuchdaten, Material-CSS, Hotspot-System, Kapitel4-Legacy-Liste, aktuelle Kapitel4/5-Staging-Guides und QA-Berichte. Die bekannten Probleme zu kleiner Leseflächen und falscher Objektgrößen wurden in die neue Tabletprüfung aufgenommen.

Die zehn Figurenreferenzen des Kapitel-5-Manifests und acht weitere Figuren aus Kapitel2/3 sind erfasst und als Originale angesehen. Bestehende Hashes bleiben unverändert. Niemand wird für Kapitel6 neu erzeugt oder zur dauerhaft anwesenden Erklärfigur gemacht.

## Neue PNGs (12)

Alle neuen Bilder wurden mit dem eingebauten ImageGen-Werkzeug erzeugt und mit vollständiger Leinwand auf1024×768 exportiert. Acht transparente Objekte/Unterlagen behalten RGBA; vier Raum-/Arbeitsplatten sind RGB. Ein-Level-Alpha-Quantisierungsstaub wurde beim Export entfernt. Keine malerische Montage aus Code, keine neu gezeichneten Canon-Figuren.

- assets/chapter6/backgrounds/ch6_bg_reflection_room.png — Zentraler Quellen- und Reflexionsraum

- assets/chapter6/backgrounds/ch6_bg_final_question.png — Ruhige Abendlichtfassung des identischen Raums; Schlussbuch separat

- assets/chapter6/props/ch6_prop_personal_notebook_open.png — Offene Variante der vertrauten Notizbuchfamilie

- assets/chapter6/props/ch6_prop_luther_folder_closed.png — Neutrale Quellenmappe; Name per HTML

- assets/chapter6/props/ch6_prop_luther_folder_open.png — Geöffnete neutrale Quellenmappe; Lesetext erst in Großansicht

- assets/chapter6/ui/ch6_ui_freedom_then_now.png — Gleichwertige frühe und heutige Freiheitsdeutung

- assets/chapter6/ui/ch6_ui_theological_network_table.png — Kontinuierliche Arbeitsfläche für acht dynamische Begriffsanker und Tintenlinien

- assets/chapter6/ui/ch6_ui_luther_interpretation_scale.png — Drei gleichwertige Interpretationsblätter; optional unentschieden als gemeinsame Nebenaktion

- assets/chapter6/ui/ch6_ui_memory_evidence_table.png — Vier dynamische Erinnerungsausschnitte in einer Chronik

- assets/chapter6/ui/ch6_ui_memory_frame.png — Holz-/Pergamentrahmen mit transparentem Bildfenster

- assets/chapter6/ui/ch6_ui_final_position.png — Fünf gleichwertige historische Auswahlstreifen

- assets/chapter6/ui/ch6_ui_final_judgment_writing.png — Große ruhige Schreibfläche für fünf bis acht Absätze

## Bewusste funktionale Wiederverwendung

Alle24 geforderten Rollen sind aufgelöst. Die zwölf folgenden Namen sind Rollenalias, keine fehlenden Assets. Integration lädt ausschließlich path; dadurch entstehen keine unnötigen Kopien.

- ch6_bg_reflection_room_entry.png → assets/chapter6/backgrounds/ch6_bg_reflection_room.png — Einstieg als Belegung desselben Raums: nur persönliches Notizbuch

- ch6_bg_judgment_table.png → assets/chapter6/backgrounds/ch6_bg_reflection_room.png — Reduzierte Urteilsbelegung mit sechs relevanten Quellen

- ch6_prop_personal_notebook_closed.png → assets/ui/ui_notebook_closed.png — Dasselbe persönliche Spielnotizbuch

- ch6_prop_muentzer_folder_closed.png → assets/chapter6/props/ch6_prop_luther_folder_closed.png — Gleichwertige Müntzermappe; dieselbe neutrale Bilddatei, eigene HTML-Beschriftung

- ch6_prop_muentzer_folder_open.png → assets/chapter6/props/ch6_prop_luther_folder_open.png — Gleichwertige offene Müntzermappe; dieselbe neutrale Bilddatei

- ch6_ui_concept_marker_blank.png → assets/ui/hotspots/v2/hotspot-object.png — Vorhandene echte Pergamentmarker als dynamische Begriffsanker

- ch6_ui_luther_1520_1525.png → assets/chapter6/ui/ch6_ui_freedom_then_now.png — Gleichwertiger Quellenvergleich; Deutungsfrage/Skala als eigene Folgefläche

- ch6_ui_evidence_pro_contra.png → assets/chapter6/ui/ch6_ui_freedom_then_now.png — Zwei gleichwertige Argumentationsseiten: stützt / stellt infrage

- ch6_ui_luther_muentzer_comparison.png → assets/chapter6/ui/ch6_ui_freedom_then_now.png — Gleichwertiger seriöser Positionsvergleich

- ch6_ui_judgment_dimensions.png → assets/chapter6/ui/ch6_ui_luther_interpretation_scale.png — Theologische Folgerichtigkeit / historische Einordnung / ethische Verantwortbarkeit

- ch6_ui_personal_final_page.png → assets/chapter6/ui/ch6_ui_final_judgment_writing.png — Persönliche Abschlussseite mit acht semantischen Abschnitten; HTML ohne moderne Teilkarten

- ch6_ui_final_book.png → assets/chapter6/ui/ch6_ui_freedom_then_now.png — Schlussbuch mit gleichwertigen frühen und späteren Freiheitsdeutungen

## Weiterverwendete Quellen und Erinnerungen

- assets/chapter4/documents/ch4_doc_luther_freedom_small.png — Freiheitsschrift; vorhandener HTML-Quellentext

- assets/chapter4/documents/ch4_doc_worldly_authority_small.png — Obrigkeit 1523; vorhandener HTML-Quellentext

- assets/chapter4/documents/ch4_doc_ermahnung_closed.png — Ermahnung zum Frieden; vorhandener Quellenrenderer

- assets/chapter4/documents/ch4_doc_harsh_text_closed.png — Schärfere Bauernkriegsschrift; vorhandener Quellenrenderer

- assets/chapter4/documents/ch4_doc_muentzer_context_closed.png — Müntzer-Kontext; vorhandener Quellenrenderer

- assets/chapter5/props/ch5_prop_bible_council.png — Bibel als stilles Quellenobjekt

- assets/chapter2/backgrounds/ch2_bg_forest_edge_path.png — Erinnerung: Wald und Nutzungsrechte

- assets/chapter3/backgrounds/ch3_bg_memmingen_assembly.png — Erinnerung: Zwölf Artikel; spätere Runtime aus Rückschau komponieren

- assets/chapter4/backgrounds/ch4_bg_village_consequence_hub.png — Erinnerung: eigener Kapitel-4-Pfad

- assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png — Erinnerung: Kapitel-5-Entscheidung und Stilvergleich

- assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png — Erinnerung: Folgen; spätere Runtime mit tatsächlicher Rückschau kombinieren

## Bewusst vermieden

- Keine neuen Erinnerungsbilder der Kapitel1–5; reale Rückschau später über den vorhandenen Renderer zusammensetzen.
- Keine kopierten Quellen-/Canon-Versionen oder neu erfundenen Luther-/Müntzer-Ganzkörperfiguren.
- Die optionalen Porträts sind für den dokumentenzentrierten Raum nicht erforderlich und werden nicht neu erzeugt.
- Keine fast identischen Entry-/Judgment-Hintergrundplatten; beide sind dokumentierte Zustände desselben Raums.
- Keine festen Tintenverbindungen, Fachbegriffe, Quellenzitate, Namen, Radio-/Score-Elemente oder UI-Texte im PNG.
- Keine verworfenen Dorfgruppen, alten study_table/manor/village-Platten oder anderen Legacy-Dateien aus assets/chapter4/LEGACY_ASSETS.md. Die frühere Study-Table-Platte wurde nur bei der Bestandsprüfung betrachtet, nicht als Produktionseingabe oder in der QA verwendet.

## Offene Integrationsarbeit

Bei der Bestandsprüfung wurden Randfragmente in älteren Reise-/Margarethebildern erkannt. Sie werden in Kapitel6 nicht geladen. Für Margarethe ist ausdrücklich die aktive reparierte Szenenfassung erfasst; die ältere Reisende bleibt nur eine unveränderte Archiv-/Figurenreferenz, keine Kapitel-6-Requisite.

Keine Asset-Lücke innerhalb des vereinbarten Funktionsumfangs. Kapitel6 muss später fachlich integriert und mit echten personalisierten Spielständen erneut geprüft werden. QA-Texte sind ausschließlich Satz-/Layoutbeispiele; sie legen kein Schülerurteil fest. Die zusätzlichen Originalausschnitte sind als solche gekennzeichnet und haben überprüfte Quellenlinks. Längere eigene Urteile benötigen nacheinander geöffnete Leseseiten; die große Schlussseite ist eine Übersicht.
