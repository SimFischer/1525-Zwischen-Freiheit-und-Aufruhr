# Kapitel 4: neuer Dorf-Hub

Neuer Master und vier reduzierte RGBA-Zustände erstellt. Die bisherige
Vier-Gruppen-Komposition ist verworfen; ihre Dateien sind als Altstand archiviert.

Der Canon-Ort bleibt an Kirche, Fachwerk und Tavernenschild erkennbar.
Der neue feste Platz bietet drei freie Positionen auf einer gemeinsamen Ebene.
Brunnen und Zustandsmerkmale liegen am Rand, ohne Gesprächsachsen zu blockieren.
Der Hintergrund enthält keine Personen. Die Zustände zeigen höchstens zwei
entfernte Personen; Prediger und Bote sind nicht in Overlays eingebaut.

**45 Canon-Kompositionen bestanden:** A Peter/Anna/Jakob,
B Konrad/Prediger/Jakob, C Matthes/Peter/Konrad; jeweils Master und vier
Zustände bei **1024×768, 820×640, 1440×900**.

Geprüft: gemeinsame Körperhöhe41% und Fußlinie71%, erhaltene Proportionen,
Bodenkontakt, nach innen gerichtete Randfiguren, vollständige Körper,
freie Gesichter und Hotspots, mindestens44px Bedienflächen und kein horizontaler
Überlauf. Die entfernten Personen nutzen eine hintere Bodenlinie52% und Höhe20%;
ihre Augen liegen annähernd auf derselben Horizontlinie.
Blätter sitzen auf vorhandener Wandtafel bzw. Randbank.
Untere26%-Dialogfläche und alle drei Canon-Zonen bleiben in Overlays leer.

Alle Canon-Dateien per SHA-256 geprüft: unverändert. Peter verwendet die
vorhandene vollständige stehende Neutralpose; Anna/Jakob/Konrad die vorhandenen
vollständigen Kapitel-3-Dateien. Kein Neuzeichnen. Sitzposen werden auf dem
neuen Dorfplatz nicht eingesetzt.

Die aktive Dorfansicht nutzt den neuen Master und reduzierte Zustände.
Figuren werden nach gemessenen Körper-Bounds skaliert und auf die gemeinsame
Bodenlinie gesetzt. Spiegelung nur im Renderer. Änderungen betreffen
Bildpfade und Darstellung; Fachtexte, Entscheidungen und Spielstandlogik bleiben.

Nachweise: `scripts/check-chapter-four-village.cjs`,
`scripts/check-chapter-four-assets.py`, lokale45 Screenshots unter
`artifacts/ch4-village-qa/`; Beispiele unter `docs/chapter4-village-preview/`.
Eingebautes ImageGen; Prompts: `docs/chapter4-consequence-prompts.json`.

Bestehende Prüfungen: 15 vollständige Routen über fünf Endzustände in drei
Auflösungen mit je11 Reload-Checkpoints bestanden. Zusätzlich alle56 Optionen,
36 Szenen, Quellen-/Archivansichten, Maus/Touch und Spielstandschutz bestanden.
Der Asset-Nutzungsnachweis prüft sämtliche aktiven Bilder und alle fünf neuen
Dorfdateien; zehn bewusst aus dem Dorf entfernte Gruppen/Props sind ausdrücklich
im Manifest gelistet. Alpha-/Maß-/Hashprüfung und ZIP-Bytevergleich bestanden.
