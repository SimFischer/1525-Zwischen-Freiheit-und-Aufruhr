1525 – Zwischen Freiheit und Aufruhr: Kapitel4, konsolidiertes Assetpaket

62 PNGs, manifest.json, Szenen-Audit, Staging-Guide und QA-Bericht.
Der neue Dorf-Hub samt vier reduzierten Zuständen bleibt unverändert.
Vier gezielte neue Raumplatten:
  ch4_bg_manor_negotiation_rebuilt.png
  ch4_bg_jakob_study_rebuilt.png
  ch4_bg_village_assembly_rebuilt.png
  ch4_bg_village_escalation_rebuilt.png

Canon-Dateien NICHT neu zeichnen. Originalkörper mit gemessenen Bounds
verwenden; Spiegelung nur in CSS. Nicht überall den Dorfmaßstab verwenden.
Verbindliche Positionen und sämtliche Branch-Varianten stehen in
CH4_STAGING_GUIDE.md; Entscheidungen behalten/ersetzen/ergänzen für alle
36 Szenen stehen in CH4_ASSET_AUDIT.md.

17 als legacy markierte Dateien dienen nur dem Archiv. Nicht zusammen mit
den konsolidierten Raumplatten rendern. Die zuvor aus dem Paket genommenen
Vier-Gruppen-Dorf-Overlays liegen separat in exports/chapter4_retired_village/.
Die aktiven Hintergründe, Figuren und Layer pro Szene sind im Manifest
unter scene_staging erfasst. Die fünf Endzustände haben konkrete eigene
Konstellationen; keine zusätzliche alte Dorfgruppe einblenden.

Alle Hintergrundplatten1024×768 RGB; reduzierte Overlays1024×768 RGBA.
Unterste26% bleiben ohne wichtige Bildobjekte. Dokumente bleiben groß
mit responsivem HTML-Text (mindestens18px) und internem Scrollen.
Quellenworte/modernisierte Worte und heutige Zusammenfassungen sind getrennt
bezeichnet. Generierte Bildunterlagen tragen keine erfundenen Quellenzitate.

Geprüft:365 Szenen-/Variantenansichten in fünf Auflösungen,215 Explorationsansichten,
120 Quellen-/Zoomansichten und45 Dorf-Testbilder,
15 vollständige Routen mit je11 Reload-Checkpoints,56 Optionen, Quellen,
Touch/Maus/Tastatur und Speicherstände. Original-Canon- und Dorf-Hashes geprüft.
ImageGen: eingebautes Tool; Prompts im Repository unter
docs/chapter4-consolidation-prompts.json. Spielinhalte und Speicherlogik unverändert.
