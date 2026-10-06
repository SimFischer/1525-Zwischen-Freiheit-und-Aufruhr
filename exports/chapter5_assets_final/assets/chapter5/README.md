# Kapitel 5 – „Du musst handeln“

43 finale Bildassets:10 Hintergründe,16 transparente Zustandslayer,13 Requisiten,4 historische Arbeitsflächen.

Zielgeräte: iPads im Quer-/Hochformat und größere Bildschirme. Keine neue Spielkapitel-Logik in dieser Runde.

Verbindlich: chapter5_assets_manifest.json, CH5_STAGING_GUIDE.md, CH5_ASSET_AUDIT.md und CH5_ASSET_QA.md.
Canon-Pfade und Hashes verweisen auf unveränderte Originale des bestehenden Projekts. Keine Figuren neu gestalten.
Für alle Overlays die Registrierung aus preferredStaging anwenden: scale/left/top, Ursprung oben links, Prozent der Raumplatte.
Fünf Nachwirkungen alternativ, nicht stapeln; Gruppen des Kirchhofs dagegen gemeinsam möglich.
Keine Truppen doppeln, keinen zweiten Wagen auf die Wagenplatte stellen, kein zusätzliches Mobiliar mit zufälliger Tiefe.

Texte als HTML, mindestens18px. Arbeitsflächen in großer Dokumentansicht darstellen; kein kleiner zweiter Dialograhmen um das Bild.
Vorhandene Hotspot-PNGs und zentrale Materialvariablen beibehalten. Quellenrahmen aus Kapitel4 können weiterverwendet werden.
Die QA-Texte und das Auswahlbeispiel sind ausschließlich Layout-/Touchtests. Endgültige Texte und Speicherlogik folgen später.

qa/ enthält getrennte Vorschau, Testdaten, Ergebnisprotokoll,20 ausgewählte Screenshots und drei Kontaktbögen.
Testkompositionen niemals als Runtime-Hintergrund verwenden. Die HTML-Prüfseite benötigt das bestehende Projekt unter einem lokalen Webserver.
Bildgenerierung: eingebautes ImageGen; vollständige verwendete Prompts im Repository unter docs/chapter5-asset-prompts.json.
