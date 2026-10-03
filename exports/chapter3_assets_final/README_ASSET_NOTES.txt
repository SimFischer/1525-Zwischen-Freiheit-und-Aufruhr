1525 – Kapitel 3: Aus Beschwerden werden Forderungen

41 neue Produktions-PNGs: 4 Hintergründe, 8 Figurenposen, 8 Sprecherportraits,
6 Versammlungsrequisiten, 4 Dokumentuntergründe, 8 Druckerei-Layer, 3 Kartenassets.
Verbindlich ist die warme, erwachsene, strukturierte Art Direction aus dem
Canon-Archiv Kapitel 1/2: Holz, Leder, Papier, Stoff, Eisen; gedeckte Erdfarben.
Produktion mit built-in image_gen. Promptprotokoll: docs/chapter3-asset-prompts.json
im Projekt. Technischer Export erhält Proportionen und reduziert unsichtbares
Alpha-Rauschen; keine Neugestaltung bestehender Assets.

Wiederverwenden: Peter, Anna, Jakob, Konrad, Dorf-Hub, Dialogbox, Portraitslot,
Notizbuch, Buttons und globale Pergament-/Lederrahmen. Keine Kopien im Paket.
Matthes: Original fehlt im gelieferten Archiv und Repository; kein Ersatz erzeugt.
Vor einer Szene mit Matthes verbindliches Original bereitstellen.
Die globale UI und ihre Texte bleiben unverändert. overlays ist bewusst leer.
Hotspots ausschließlich aus assets/ui/hotspots/v2/ und js/hotspots.js laden:
object / path / action; Beschriftungen als HTML, Rückweg nur Holz spiegeln.

Alle 4 Hintergründe: exakt 1024x768, komponiert im Verhältnis 4:3.
Unteres 26%-Band für Dialoge; Ziele/Gesichter oberhalb. Auf kleinerem iPad
das vollständige Bild mit contain darstellen, nicht seitlich mit cover beschneiden.
Figuren 512x896 und Portraits 512x512; vollständige Köpfe/Haar/Kinn.
Alle separaten Assets besitzen echte Transparenz und Sicherheitsränder.
Tight bounds und tatsächliche Maße stehen im Manifest. Kleine Objektmarker
brauchen unabhängig vom Bild mindestens 44px große Touchziele.
Drag-Ghost muss dieselbe feste CSS-Größe wie das Quellobjekt bekommen;
keine Vergrößerung aus naturalWidth/naturalHeight. Objekt-Hitbox am sichtbaren
Alpha-Bereich orientieren. Pressengestell ohne bewegliche Platte/Hebel;
Layer in einer eigenen Objektansicht bzw. freien Werkbankfläche verwenden,
nicht auf die bereits im Raum gemalte vollständige Presse doppelt montieren.

Keine finalen Texte in PNGs. Quellen/Fragen/Beschriftungen als HTML,
Routen als SVG/CSS. Die Karte ist abstrakt, keine genaue historische Karte.
Stadt-/Werkstattszenen und Lotzers Gesicht sind plausible Spielillustrationen,
keine belegten Rekonstruktionen. März 1525: Luthers Ermahnung zum Frieden
noch nicht als bereits veröffentlichte Quelle zeigen. Details/Quellen im Manifest.
Das Paket fügt keine Story, Speicherlogik, Aufgaben, Audio oder Spielkapitel hinzu.

Neue Dateien:
chapter3/backgrounds/ch3_bg_road_to_memmingen.png
chapter3/backgrounds/ch3_bg_memmingen_square.png
chapter3/backgrounds/ch3_bg_memmingen_assembly.png
chapter3/backgrounds/ch3_bg_memmingen_printshop.png
chapter3/characters/ch3_char_lotzer_neutral.png
chapter3/characters/ch3_char_lotzer_talking.png
chapter3/characters/ch3_char_lotzer_reading.png
chapter3/characters/ch3_char_georg_neutral.png
chapter3/characters/ch3_char_katharina_neutral.png
chapter3/characters/ch3_char_hans_neutral.png
chapter3/characters/ch3_char_printer_working.png
chapter3/characters/ch3_char_traveler_neutral.png
chapter3/portraits/ch3_portrait_lotzer_neutral.png
chapter3/portraits/ch3_portrait_lotzer_talking.png
chapter3/portraits/ch3_portrait_lotzer_reading.png
chapter3/portraits/ch3_portrait_georg_neutral.png
chapter3/portraits/ch3_portrait_katharina_neutral.png
chapter3/portraits/ch3_portrait_hans_neutral.png
chapter3/portraits/ch3_portrait_printer_working.png
chapter3/portraits/ch3_portrait_traveler_neutral.png
chapter3/props/ch3_prop_complaint_notes_set.png
chapter3/props/ch3_prop_wooden_assembly_table.png
chapter3/props/ch3_prop_ink_bottle.png
chapter3/props/ch3_prop_quill.png
chapter3/props/ch3_prop_paper_stack.png
chapter3/props/ch3_prop_scroll_bundle.png
chapter3/documents/ch3_doc_twelve_articles_closed.png
chapter3/documents/ch3_doc_twelve_articles_open.png
chapter3/documents/ch3_doc_article_focus_frame.png
chapter3/documents/ch3_doc_gospel_argument_sheet.png
chapter3/minigames/ch3_print_press_base.png
chapter3/minigames/ch3_print_press_platen.png
chapter3/minigames/ch3_print_press_handle.png
chapter3/minigames/ch3_print_type_form.png
chapter3/minigames/ch3_print_ink_tool.png
chapter3/minigames/ch3_print_blank_sheet.png
chapter3/minigames/ch3_print_finished_sheet.png
chapter3/minigames/ch3_print_stack.png
chapter3/maps/ch3_map_distribution_base.png
chapter3/maps/ch3_map_paper_bundle_marker.png
chapter3/maps/ch3_map_route_markers.png
