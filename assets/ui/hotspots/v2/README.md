# Hotspot-Assets für die Spielwelt 1525

Erstellt mit dem eingebauten Bildgenerierungswerkzeug am 3. Oktober 2026.
Die drei PNG-Originale sind unverändert und besitzen transparente Hintergründe.
Sie sind Gestaltungsassets für das historische Adventure, keine historischen
Originalfundstücke. Zentral in Kapitel 1 und 2 über `css/art-direction.css`
und `js/hotspots.js` eingebaut; Grundlage für weitere Kapitel.

- `hotspot-object.png`: Papier auf Leder, Eisenstift; dunkle Schrift.
- `hotspot-path-right.png`: geschnitzter Holzwegweiser; helle Schrift.
- `hotspot-action.png`: genähtes Lederschild auf Holz, Nieten; helle Schrift.

## Einbindung

Die Bilder als Material hinter die vorhandenen HTML-Beschriftungen setzen.
Die gemeinsame Implementierung verwendet einen neunteiligen Bildrahmen:
Ecken und Kanten erhalten die Materialdetails, die Schreibfläche passt sich
der Beschriftung an. Die PNG-Dateien selbst bleiben unverändert.
Beschriftungen, Fokus, Mindestzielgröße von 44 Pixeln und zugängliche Namen
bleiben HTML. Keine Schrift in die Bilder einbrennen. Bildseitenverhältnis
bewahren: transparente Ränder berücksichtigen, ohne die Materialstärke
zusammenzudrücken. Die ruhigen Schreibflächen nutzen, Nieten und Pfeilspitze
freihalten. Für Rückwege nur das Holzbild spiegeln, niemals den HTML-Text.
Lange Beschriftungen knapp halten oder zweizeilig mit entsprechend größerem
Schild darstellen. Keine zusätzlichen rechteckigen CSS-Ränder, Glows oder
Farbflächen hinter die freigestellten Konturen legen.

Die Marker klein und räumlich nah an ihrem Ziel einsetzen. Wenn viele Figuren
gleichzeitig markiert sind, zurückhaltende Anker verwenden; zusätzliche Namen
können bei Fokus/Hover erscheinen, Touch muss ohne Hover verständlich bleiben.
Die Türfreischaltung sowie sämtliche Spiel- und Speicherlogik beibehalten.

## Verwendetes Prompt-Set

Gemeinsam: Production raster game UI asset for a warm painterly German village
point-and-click adventure set in 1525. One isolated physical handmade object,
front-facing, wide horizontal silhouette about 3.4:1, fully visible including
all edges and small natural contact shadow. Genuine transparent alpha
background. Mature painted tavern style, amber candlelight, ochre, umber,
muted brown, soft brushwork. Warm light from upper left. Asymmetrical contours,
tangible thickness, spacious empty middle for runtime text. No text, letters,
symbols, icons, watermark, background scene, modern UI card, perfect rectangle,
vector art, glossy 3D, fantasy ornament or gold luxury border.

Object: small cream rag-paper annotation strip pinned to narrow worn dark
leather backing, uneven hand-cut edges, slightly curled corner, faint fiber
grain, one tiny dark iron pin near upper left. Cream writing surface occupies
85 percent of width. Humble blank early-sixteenth-century note; not a scroll
or framed menu panel.

Path: modest hand-hewn oak direction sign pointing right, naturally carved
taper and arrowhead, broad flat empty dark warm brown writing area, worn grain,
small chips, visible bevel and thickness, two tiny forged iron nailheads near
left edge. No post, hanging rope or regular geometric border.

Action: oxblood-brown leather tag stretched over thin rough oak slat, broad
empty brown writing surface for light cream text, gently bowed top, uneven
leather edge, tiny muted aged brass rivet at each end, understated hand-stitched
seam at lower rim. Quiet rustic German village craftsmanship. No arrow,
perfect modern button or framed panel.
