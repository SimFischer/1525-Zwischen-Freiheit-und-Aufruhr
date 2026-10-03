1525 – Zwischen Freiheit und Aufruhr
Kapitel 4: Ordnung oder Widerstand? – finales Asset-Paket

Umfang: 57 neue PNGs; 7 Hintergründe, 15 Zustands-Overlays, 6 Figurenposen,
6 Sprecherportraits, 9 Props, 11 Dokumente und 3 Arbeitsflächen.
manifest.json beschreibt jede Datei, Maße, Alpha-Bounds, SHA-256,
Safe Areas, Textflächen und Wiederverwendung. Dieses Paket enthält keine
Kapitelimplementierung, Aufgabenlogik oder finalen Quellentexte.

ART DIRECTION UND CANON
Warme, erwachsene, malerische Spielwelt um 1525: Braun, Ocker, Creme,
gedämpftes Grün und Rostrot; Holz, Leder, Stoff, Papier und Wachs.
Peter, Anna, Jakob, Konrad, Matthes und Verwalter bleiben bestehender Canon.
Neue Personen: lokaler Prediger, herrschaftlicher Bote und zwei ergänzende
Bauernhaufen-Mitglieder. Neutral-/Sprechposen und Portraits gehören zusammen.
Prediger und Mitglied 1 blicken rechts; Bote und Mitglied 2 links.
Gesprächspartner entsprechend gegenüberstellen; Posen nur bei Bedarf spiegeln.
Portraits mit object-fit: contain, niemals Kopf/Kappe mit cover abschneiden.

WIEDERVERWENDUNG
Alle Reuse-Pfade in manifest.json sind relativ zur Repository-Wurzel und
werden nicht als Kopien in das ZIP aufgenommen. Dazu gehören die sechs
Canon-Figuren mit vorhandenen Posen/Portraits, Dorf-Hub aus Kapitel 2,
Zwölf Artikel samt Leserahmen aus Kapitel 3, originale Hotspot-PNGs,
js/hotspots.js, Dialograhmen, Notizbuch und gemeinsame Material-CSS.
Warnzettel sind Spielobjekte; sie ersetzen keine globalen Hotspot-Materialien.
Die zwei-/drei-geteilten Tische sind Kapitelobjekte, keine neue globale UI.

FORMATE UND STAGING
Hintergründe: exakt 1024x768 RGB. Untere 26% sind Gesprächsbereich;
wichtige Gesichter und Untersuchungsobjekte darüber platzieren.
Figuren: 512x896 RGBA; Portraits: 512x512 RGBA. Props kompakt bis 768 Pixel,
Dokumente/Arbeitsflächen bis 1024 Pixel. Alle proportional exportiert.
Alpha-Rauschen <=8 wurde entfernt; vollständige Körper und Werkzeugspitzen
bleiben erhalten. Figuren anhand alpha_bbox/foot_anchor auf den Boden setzen.
Dezente Bodenschatten gehören später in den Szenenrenderer, nicht in die PNGs.
Prüfansichten nutzen Fußlinie 72%, Figurenhöhe 43% und untere Dialogbox 26%.
Bei Jakobs Tisch liegen die freien Vordergrundpositionen etwa bei x42/65%.
Andere Hintergründe erlauben x28/72%; mit Dorf-Overlays x41/61%.
Diese Anker sind geprüfte Ausgangspunkte, keine neue Staging-Implementierung.

DORF-OVERLAYS
Overlays sind absichtlich transparente 1024x768-Szenenflächen; nicht trimmen.
Sie liegen auf dem unveränderten Dorf-Hub, mittig mit object-fit: cover auf
4:3 abgebildet. Das Original ist 1672x941; sichtbarer Ausschnitt ungefähr
x208.667..1463.333, y0..941. Hintergrund und Overlay gemeinsam skalieren.
Gruppen stehen seitlich, die Mitte bleibt frei; ab y568 sind alle Alpha=0.
publicTone: nuanced, simplified, religious, confrontational.
Strategie-Overlays: delegation, withheld_dues, public_meeting,
resistance_group, blockade. Eskalation: smoke_distance, refugees_cart,
armed_group. Endzustände siehe end_states in manifest.json.
Öffentliche Versammlung und religiöse Polarisierung haben zwei getrennte
Gruppen mit freier Mitte x355..670. Die bekannte Architektur bleibt sichtbar.
Keine Architektur in Overlays; nur Personen, bewegliche Dinge und Rauch.
Nicht sämtliche Zustände gleichzeitig kombinieren. Die große Versammlung
und der Eskalations-Hintergrund enthalten bereits Menschen bzw. Rauch;
zusätzliche Gruppen/Rauch dort nur gezielt verwenden, keine Verdopplung.
Die Eskalationsszene rekonstruiert denselben Ort anhand des Canon-Bildes;
kleine malerische Geometrieabweichungen sind vorhanden, keine pixelgenaue Kopie.

DOKUMENTE UND ARBEITSFLÄCHEN
Alle Quellen, Überschriften, Zusammenfassungen und Falltexte später als HTML.
Dokumente dürfen 88–94%, empfohlen 92%, der Lesefensterbreite nutzen.
Mindestens 18px Quellen-Schrift und internes Scrollen; Navigation darunter
sekundär. Keine winzige Textbox in einem großen Fenster.
html_text_regions_percent im Manifest enthält [links, oben, rechts, unten]
in Prozent der finalen Bildfläche. Quellentext und heutige Zusammenfassung
haben bei Ermahnung-Auszügen und Luthervergleich getrennte Bereiche.
Ermahnung an Bauern: zwei Seiten mit jeweils getrenntem unteren Bereich.
Geschlossene Druckschriften zeigen eine einzelne Vorderseite; offene zwei.
Perspektivische Tische: Beschriftungen horizontal als HTML über die ruhigen
Papierflächen legen. Die mittlere Papierbahn der Zwei-Regimente-Tafel ist
für Grenzfälle vorgesehen; keine ausschließliche binäre Zuordnung vorgeben.
ch4_case_cards_set.png enthält vier Karten im 2x2-Raster. Einzelne Karten
später per Bildausschnitt oder proportionalem Export verwenden, mit >=44px
Bedienflächen; Falltexte nicht fest in die Bilddatei schreiben.

HISTORISCHE LEITPLANKEN
Plausible Illustration, keine behauptete exakte Rekonstruktion von Personen,
Amtsräumen, Druckausgaben oder Vertragsurkunden.
Ermahnung zum Frieden: nach Mitte April, Kritik an beiden Seiten und Ausgleich.
Luthers schärferer Text folgt der Eskalation im Mai und darf nicht davor stehen.
Weingarten: mündliche Einigung 17. April 1525, Urkunde ratifiziert 22. April.
Das Nachrichtenobjekt verweist auf reale Verhandlung und Schlichtung, nicht
auf einen allgemeinen Sieg oder eine originalgetreue Vertragsurkunde.
Müntzer als seriöse reformatorische Gegenposition, keine dämonische Karikatur.
Bauernhaufen bleiben heterogene kleine Gruppen, keine heroische Fantasy-Armee.
Nachweise: historische Quellenlinks und Hinweise in manifest.json.

HERSTELLUNG UND PRÜFUNG
Erzeugt mit dem eingebauten image_gen.imagegen-Werkzeug und Canon-Referenzen.
Vollständige akzeptierte Prompts: docs/chapter4-asset-prompts.json im Repository.
Geprüft: alle 57 PNGs visuell, Alpha/Bounds/Maße/Hashes automatisiert,
82 Browser-Prüfansichten bei 1024x768 und 820x640, Originaldialog/Hotspots,
18px HTML-Prüftext und interne Scrollbereiche. Details: QA_REPORT.md.
Die Prüftexte sind ausschließlich Testdaten und kein fachlicher Kapitelinhalt.
