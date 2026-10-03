1525 – Zwischen Freiheit und Aufruhr · Kapitel 4
Asset-Paket, Dorfrevision consequence_hub_v2

NEUER VERBINDLICHER DORF-HUB
backgrounds/ch4_bg_village_consequence_hub.png: 1024x768, 4:3.
Canon-Dorf an Fachwerkhaus, Kirche/Kirchturm und Tavernenschild erkennbar.
Vorder-/Mittelgrund vollständig neu komponiert: fester trockener Platz,
Brunnen hinten links, freie zusammenhängende Bodenebene. Keine eingebauten
Figuren, Tische oder Wagen zwischen Gesprächspartnern.

Nur die neuen vier consequence-Overlays auf diesem Master verwenden.
Alle 1024x768 RGBA, gleiche Koordinaten, proportional gemeinsam skalieren.
- nuanced: zwei entfernte Leser mit vollständigen Flugblättern.
- simplified: zwei getrennte Diskutierende mit kleinen Kurzblättern.
- religious: offene Bibel und Schrift auf vorhandener Randbank.
- confrontational: Warnzettel und abgerissenes Blatt auf vorhandener Wandtafel.
Prediger, Bote und alle Hauptfiguren bleiben separate unveränderte Canon-Dateien.
Keine neuen Personenfassungen, keine Texte fest in Bildern.

Die alten vier village_publicTone-Gruppen sind verworfen und außerhalb des
Pakets unter exports/chapter4_retired_village/ archiviert. Weitere frühere
Gruppen-Overlays sind legacy: NICHT auf den neuen Hub legen.
Im bestehenden Spiel nutzt der Dorf-Hub die reduzierte Zustandsebene.
Bildpfade und Figurenstaging sind angepasst; Story, Fachtexte, Entscheidungen
und Speicherlogik bleiben unverändert.

CANON-STAGING
Links x28%, Mitte x51%, rechts x72%; freie Zonen etwa22–35/45–58/66–78%.
Gemeinsame Fußlinie y71%, sichtbarer Körper ungefähr41% der Bildhöhe.
Maßstab nach Körper-Bounding-Box, nicht nach PNG-Leerflächen bestimmen.
Village-Canon-Dateien/Bounds: manifest.village_canon_staging und
data/chapter-four-staging.js. Referenzen und Maße, keine Neuzeichnungen.
Links rechtsblickend, rechts linksblickend; CSS-Spiegelung bei Bedarf.
Figuren proportional darstellen; kleine Bodenellipse im Szenenrenderer.
Hintergrundpersonen: Fußlinie etwa52%, Höhe20%, Augenlinie um33.5%.
Unterhalb y568 bleibt jedes neue Overlay komplett transparent.
Keine zusätzlichen schwebenden Props zwischen den Gesprächsfiguren.

TESTGRUPPEN
A Peter links · Anna Mitte · Jakob rechts
B Konrad links · Prediger Mitte · Jakob rechts
C Matthes links · Peter Mitte · Konrad rechts
Jeweils Master und vier Zustände bei1024x768,820x640,1440x900 geprüft:
45 Kombinationen; QA_REPORT.md und docs/chapter4-village-preview/.

RESTLICHES PAKET UND REUSE
58 PNGs: 8 Hintergründe,15 Overlays,6 Figurenposen,6 Portraits,
9 Props,11 Dokumente,3 Arbeitsflächen. Andere Bilder unverändert.
manifest.json nennt Maße, Transparenz, SHA-256, Status und Einsatzhinweise.
Reuse-Pfade relativ zur Repository-Wurzel; keine redundanten Kopien.
Peter/Anna/Jakob/Konrad/Matthes/Verwalter, globale Hotspot-PNGs, Originaldialog,
Notizbuch und Zwölf Artikel bleiben Canon. Andere Hintergründe behalten
ihre ortsspezifischen Staging-Regeln.

TEXT UND UI
Quellen/Überschriften/Zusammenfassungen als HTML:88–94%,empfohlen92%
Lesefensterbreite, mindestens18px, internes Scrollen, sekundäre Navigation.
html_text_regions_percent: [links,oben,rechts,unten] der finalen Bildfläche.
Portraits contain, nicht cover; Kopf/Kappe/Kinn vollständig anzeigen.
Globale Hotspots/Buttons/Notizbuch/Dialogmaterialien unverändert verwenden.

HISTORISCHE LEITPLANKEN
Warme malerische Material-/Farbwelt um1525, keine exakte Rekonstruktion behauptet.
Ermahnung nach Mitte April, schärferer Text anschließend im Mai.
Weingarten als reale Verhandlungsalternative; Müntzer ohne Dämonisierung.
Historische Quellen und Hinweise im Manifest.

HERSTELLUNG
Fünf neue Dateien mit image_gen.imagegen anhand des Kapitel-2-Canon-Dorfes
und des neuen Masters. Keine alten Gruppen als Generierungsreferenz.
Nur technische Alpha-Bereinigung, proportionale Skalierung und feste Platzierung.
Prompts: docs/chapter4-consequence-prompts.json.
