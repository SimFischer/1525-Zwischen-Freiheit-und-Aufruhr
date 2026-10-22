# Zusätzliche Weltzustands-Assets

Stand:22. Oktober 2026. Genau zwei neue Bilddateien; keine neue Spiellogik, Figurenfassung, Hintergrundplatte oder UI.

| Datei | Zustand | Typ | Verbindliche Basis |
|---|---|---|---|
| village-escalation-overlay.png | zunehmende Eskalation | transparentes Overlay | assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png |
| negotiation-collapsed-overlay.png | negotiation_collapsed, verlassener Gesprächsort | transparentes Overlay | assets/chapter5/backgrounds/ch5_bg_negotiation_chamber.png |

Beide Dateien:1024×768, RGBA, volle Leinwand. Über die gesamte unverzerrte Basisszene legen: links0, oben0, Maßstab1. Nicht zuschneiden, nicht zusätzlich zentrieren. Die Originalkamera und das ursprüngliche Licht bleiben erhalten; neue Gegenstände liegen ausschließlich im transparenten Zusatzlayer. y74–100% ist vollständig transparent.

Das Dorf erhält Vorrat/Ausrüstung, niedrige Hindernisse und einen beschädigten Anschlag am Rand. Die Mitte bleibt offen. Vorhandene Hauptfiguren gegebenenfalls **oberhalb** des Layers darstellen. Die Komposition wurde mit den vorhandenen Anna-/Peter-/Jakob-Dateien und deren bestehendem Körpermaßstab geprüft.

Die Verhandlungsstube erhält verstreute Blätter, ein gelöstes Lederband und einen umgestürzten Hocker. Der vorhandene Tisch und die hinteren Stühle stammen vollständig aus der Basis. Für den verlassenen Raum später keine Gesprächsgruppe darstellen. Dieser Layer ist eine zusätzliche Innenraumansicht; das vorhandene Dorf-Endbild für negotiation_collapsed bleibt brauchbar. Nicht gleichzeitig mit dem älteren negotiation_broken-Buch-/Brief-Layer auflegen.

Die übrigen Zustände sind durch vorhandene Szenen, Canon-Figuren und registrierte Layer abgedeckt. Deshalb keine neuen Varianten für Mobilisierung, Polarisierung, Beratung, Niederlage, Schutz, Spaltung oder fragile Deeskalation. Zuordnung aller elf Zustände in manifest.json; alte Layer brauchen weiterhin ihre originalen Registrierungen aus data/chapter-five-staging.js. Die Nullposition der **neuen** PNGs nicht auf ältere Layer übertragen. Verworfene Kapitel-4-Dateien bleiben ausgeschlossen.

QA: echte Transparenz, Bildmaße, Alpha-Bounds, Dateihashes und vollständige leere Dialogzone geprüft. Sichtkontrolle über den Originalplatten bei1024×768 und820×640 sowie im Dorf mit Originalfiguren. Keine neuen menschlichen Figuren, keine Schrift, keine Bodenplatte und keine Möbelkollision. Die Bildobjekte bleiben deutlich unterhalb der Köpfe. Proofs lokal unter artifacts/worldstates/qa/; diese Testmontagen sind keine neuen Spielassets.

Erzeugung: eingebautes ImageGen; Prompts/Korrekturen, Basishashes, Bounds und Zuordnung stehen in manifest.json. Nur proportionale Verkleinerung der kompletten generierten Leinwand; kein Objektzuschnitt oder nachträgliches Umstellen. Ein-Level-Alpha-Quantisierungsstaub wurde beim PNG-Export entfernt.
