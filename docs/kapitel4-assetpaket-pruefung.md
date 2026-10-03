# Kapitel 4 – Assetprüfung

Geprüft am 3. Oktober 2026. Ergebnis: **57 neue Assets freigegeben**.
Umfang ist das Asset-Paket; Kapitel 4 wird hier noch nicht implementiert.

- Alle 57 PNGs einzeln auf Kontaktbögen angesehen: warme Canon-Farbwelt,
  plausible Kleidung/Materialien um 1525, vollständige Köpfe, Kappen,
  Hände, Schuhe und Werkzeugspitzen; keine modernen Elemente oder Bildtexte.
- 7 Hintergründe exakt 1024×768; Figuren 512×896, Portraits 512×512.
  Props und Lesematerial proportional exportiert, ohne Streckung.
- Transparenz, Sicherheitsränder, Alpha-Bounds, Maße und SHA-256 geprüft.
  Überlagerungen lassen den unteren Dialogbereich ab y568 vollständig frei;
  die beiden geteilten Gruppen lassen auch x355–670 frei.
- 82 Browseransichten bei **1024×768 und 820×640** bestanden: alle sieben
  Hintergründe mit zwei einander zugewandten Figuren, Originaldialog,
  Sprecherportrait und drei originalen Hotspots; zusätzlich alle 15 Overlays,
  fünf Endzustände und 14 Dokument-/Arbeitsflächenansichten.
- Gesprächsfiguren besitzen sichtbaren Bodenkontakt; Portraits werden
  vollständig mit `contain` angezeigt. Hotspots und Weiter-Aktion mindestens
  44 Pixel; keine fehlenden Bilder oder horizontalen Scrollbars.
- Quellen-Prüftext mit 18px Schrift, 92% Lesebreite und internem Scrollen;
  getrennte Quellen-, Titel- und Zusammenfassungsflächen ebenfalls geprüft.
  Testtexte sind keine Kapiteltexte. Endgültiger Quellentext und seine
  Umbrüche bleiben Aufgabe der späteren Kapitelimplementierung.
- 46 vorhandene Bild-/Systemreferenzen im Manifest mit Prüfsummen erfasst.
  Die sechs benannten Canon-Figuren, Dorf-Hub, globale Hotspots, Dialograhmen,
  Notizbuch und Zwölf Artikel werden referenziert, nicht neu gezeichnet.
- Historische Leitplanken überprüft: Ermahnung vor schärferem Mai-Text,
  Weingarten als Verhandlungsalternative, Müntzer ohne dämonische Bildsprache.
  Historisch plausible Illustrationen, keine exakten Rekonstruktionen.

Bei der visuellen Prüfung korrigiert: vollständige Speerspitze, Außenränder
zweier Gruppen, reiner transparenter Distanzrauch, gewöhnliche Laien in beiden
religiösen Gruppen, Abgabenlager ohne Kücheninszenierung, wirklich geschlossene
spätere Druckschrift und größere Zusammenfassungsfelder im Luthervergleich.
Die Dorfrekonstruktion erhält die erkennbaren Landmarken; geringe malerische
Geometrieabweichungen bleiben. Für deckungsgleiche Zustände die Overlays auf
dem unveränderten Dorf-Hub verwenden.

Bestehende Prüfprogramme verwendet: `check.cjs`, `check-chapter-two.cjs`,
`check-chapter-two-staging.cjs`, `check-chapter-three.cjs`,
`check-chapter-three-staging.cjs`, `check-chapter-three-documents.cjs`,
`check-chapter-three-drag.cjs`, `check-world-hotspots.cjs`,
`check-ui-details.cjs`, `check-consequences.cjs`, `check-admin.cjs`.
Die ersten zehn bestanden; der erste Admin-Lauf hatte einen Bild-Warte-Timeout.
Die diagnostische Wiederholung des unveränderten Admin-Tests bestand alle
registrierten Prüfstationen sowie Spielstandschutz, Reload und Tabletansichten.
Während dieser Prüfungen kamen im gemeinsamen Arbeitsordner fremde Änderungen
an Kapitel 2/3 hinzu; sie gehören nicht zu dieser Asset-Lieferung.

Wiederholbare Asset-Prüfungen im Repository:
`scripts/check-chapter-four-assets.py` (Pillow) und
`scripts/check-chapter-four-composition.cjs` (Playwright/Edge).
Browser-Ergebnisse: `docs/chapter4-asset-qa-results.json`.
Die finale ZIP-Prüfung vergleicht sämtliche Paketdateien byteweise mit dem Archiv.
Kontrollansichten liegen lokal unter `artifacts/ch4-qa/`.

Historische Nachweise:
[Weingartener Vertrag – LEO-BW](https://www.leo-bw.de/fr/web/guest/themenmodul/bauernkrieg/vertraege/weingartener-vertrag),
[Ermahnung – bavarikon](https://www.bavarikon.de/object/BSB-HSS-00000BSB00089333?lang=de),
[Chronologie des schärferen Textes – LutherMuseen](https://www.luthermuseen.de/en/node/889).
