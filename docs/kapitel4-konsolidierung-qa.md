# Kapitel 4: zweite Qualitäts- und Konsolidierungsrunde

Zielgeräte: iPads im Quer- und Hochformat sowie größere Bildschirme.
Handys sind kein Zielgerät; die zusätzlich eingeführten Handy-Sonderlayouts wurden entfernt.

Grundlage: Commit d6e4979. Der neue Dorf-Hub und seine vier reduzierten
Zustands-Overlays bleiben bytegleich erhalten. Keine Canon-Figur wurde neu
erzeugt oder verändert.

Gezielt neu gebaut: Herrenhof, Jakobs Studierraum, Gemeindeversammlung und
Eskalationsplatte. Hintergrund und Vordergrund wurden vor der Platzierung
der Figuren geplant. Tische stehen an Wänden, Hauptgesprächsflächen bleiben
frei. Die Eskalation verwendet dieselbe Dorfarchitektur, einen entfernten
Rauchzug und eine schutzsuchende Familie ohne Schlachtspektakel.

Alle Räume verwenden gemessene Körper-Bounds und unverzerrte Originalfiguren.
Je nach Bühne gelten 33%, 36%, 37% oder 41% Körperhöhe. Blickrichtungen werden
nur im Renderer gespiegelt. Dialoge und Aufgaben lassen die vollständige
Raumplatte darüber sichtbar; Aufgaben scrollen intern.

Bestandene Prüfungen:

- 36 Szenen und 37 zusätzliche Varianten bei 1024×768, 820×640 und 1440×900:
  365 gerenderte Ansichten einschließlich der im Projekt genutzten
  iPad-Hochformate 768×1024 und 1024×1366; Proportionen, gemeinsame Körperhöhe, Bodenkontakt,
  getrennte Körper, freie Panelbereiche, Hotspots und mindestens 44px große
  Bedienflächen geprüft.
- Zusätzlich 215 Explorationsansichten nach dem Schließen der Dialoge:
  Fortsetzungsplaketten auf allen fünf Bildschirmgrößen ohne Körperkollision; die historischen Schilder bleiben räumlich an der Szene verankert.
- 45 unveränderte Dorf-Canon-Testkompositionen A/B/C mit Master und vier Zuständen.
- 15 vollständige Routen über alle fünf Endzustände, je elf Reload-Checkpoints.
- Alle 56 Antwortoptionen, Quellen-/Archivansichten und fünf Endzustände.
- Alle Quellen mit tatsächlichem HTML-Text: mindestens 18px, Vergrößerung,
  vollständiger Inhalt und Scrollbereiche. Zusätzlich 120 Quellen-/Zoomansichten
  mit geprüftem Scrollen jedes Textfelds bis zum Ende. Vergleich April/Mai nutzt größere
  Hauptfelder. Auch auf iPads im Hochformat bleibt der Text innerhalb der historischen
  Dokumentansicht lesbar und scrollbar. Modernisierte Quellenworte und Zusammenfassungen sind bezeichnet.
- Mausziehen, Touch-Tippen und Touch-Ziehen, Tastatur, Abbruch, Speicherstände,
  ältere Saves und Schutz des normalen Schüler-Spielstands.
- Asset-Hashes, Original-Canon-Hashes, unveränderte Dorfdateien, transparente
  Overlay-Safe-Areas und bytegleiche Dateien im ZIP.

Erforderliche Gesprächsgruppen sind enthalten: Peter/Anna/Jakob auf dem
Gemeindeplatz; Konrad/Peter im Herrenhof; Jakob/Prediger bei der Auslegung;
Matthes/Jakob im Studierraum; Verwalter/Peter am Hof; Konrad und beide
Bauernhaufen-Mitglieder am Lager.

Die fünf Endzustände wurden einzeln gerendert: Abordnung am Herrenhof,
öffentlich versammelte Gemeinde, Nähe zum Bauernhaufen mit Abmarsch,
Prediger/Jakob mit religiöser Schrift und ein weitgehend leerer Platz mit Jakob.

Fachtexte, Lösungen, Feedback, Notizbuch, Entscheidungs- und Speicherlogik
bleiben unverändert. Historische Nachweise und Abgrenzung zwischen erfundenem
Dorfgespräch und Quellenmaterial stehen im Audit. Der vorhandene
Kapitel-5-Ausblick bleibt ein Ausblick.

Vollständige Umsetzungsvorgaben: `CH4_ASSET_AUDIT.md`,
`CH4_STAGING_GUIDE.md` und `exports/chapter4_assets_final/manifest.json`.
Szenen-/Variantenprüfung: `scripts/check-chapter-four-consolidation.cjs`.
Screenshots: `artifacts/ch4-consolidation/`; ausgewählte Endzustände und
Gesprächsgruppen: `docs/chapter4-consolidation-preview/`.
ImageGen-Prompts: `docs/chapter4-consolidation-prompts.json` (eingebautes Tool).
