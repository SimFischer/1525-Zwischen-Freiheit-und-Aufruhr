# Verbindliche Art Direction: 1525 – Zwischen Freiheit und Aufruhr

Diese Regeln gelten für alle bestehenden und zukünftigen Screens, Assets,
Buttons, Dialoge, Aufgaben, Hotspots, Dokumente und Overlays dieses Projekts.
Die Anwendung ist ein historisches Point-and-Click-Adventure für ältere
Schülerinnen und Schüler. Jede Komponente muss auch ohne lesbaren Inhalt
glaubwürdig zur selben Spielwelt um 1525 gehören.

## Gemeinsame visuelle Sprache

- Warm, malerisch bzw. handgezeichnet, erwachsen, ruhig und hochwertig.
- Gedeckte warme Farben und atmosphärisches Licht; Materialwirkung von Holz,
  Leder, Pergament, Stoff, Metall und Wachs.
- Keine weißen Cards, sterilen Modals, modernen Pill-Buttons, Dashboard- oder
  Quiztool-Optik, Debug-Flächen, Neonfarben oder starken Glows im Spiel.
- Bestehende Tavernenillustrationen und die große Spielszene beibehalten.
- Lesbarkeit und Touchbedienung sind wichtiger als Dekoration. Keine
  überladenen Ornamente oder dunkle Fantasy-Optik.
- `css/art-direction.css` definiert die gemeinsame Material- und UI-Sprache;
  `css/staging.css` steuert die Szene und ihre Inszenierung. Vorhandene
  Komponenten und Materialvariablen wiederverwenden, kein paralleles System.

## Komponenten

- Dialoge: helles warmes Pergament mit Papierstruktur, dunkler Holz-/Lederrand,
  kleines Namensschild, klare Serifenschrift und großzügige Abstände.
- Buttons: Holz, dunkles Leder oder Pergament, optional dezente Metallkante;
  Serifenschrift, leichte Tiefe und dezente Aufhellung bei Hover/Fokus/Tap.
- Aufgaben und Antworten: Pergamentkarten, Dokumentstreifen, Holztafeln oder
  beschriftete Spielobjekte. Keine modernen Multiple-Choice-Cards.
- Dokumente: historische Flugblätter, Druckbogen, Buchseiten, Briefe oder
  Notizen. Exakte Quellen weiterhin als responsiven HTML-Text rendern.
- Notizbuch: dunkler Lederumschlag, Pergamentseiten, Buchkante, dezente
  Gebrauchsspuren, Leder-/Pergamentregister und historischer Schließen-Button.
- Hotspots: dezente Objekt-Hervorhebung oder kleine Schilder, Plaketten,
  Siegel, Metallmarker bzw. Pfeile. Orientierung an „Im Zeichen der Wende“:
  klar, spielerisch und atmosphärisch, niemals technische Rechtecke.
  Flugblatt, Figuren und Exit nutzen dieselben Holz-/Pergamentmaterialien;
  kein separates grünes Exit-Feld.
- Der Lesemoment zeigt das historische Druckblatt und seinen Text. Editorische
  Hinweise bleiben in einem geschlossenen, optionalen Infobereich des Archivs.
- Entscheidungen zeigen vor den Antworten die konkrete Bezugsfrage oder
  Aussage aus dem Gespräch. Keine kontextlosen „Was meinst du?“-Screens.
- Bereits abgeschlossene Gespräche geben beim erneuten Anklicken nur eine
  kurze Rückmeldung in der Spielwelt. Vorhandene Abschlussmerker nutzen;
  weder Dialog noch Auswertung erneut starten oder den Spielstand verändern.

## Tür und Kapitelübergang

Für alle Kapitel gilt das gemeinsame Hotspot-System aus `js/hotspots.js`:
`object` (Pergament), `path` (Holzwegweiser), `action` (Leder-/Holzschild).
Die originalen PNG-Materialien liegen unter `assets/ui/hotspots/v2/` und werden
zentral als Rahmen mit anpassbarer Schreibfläche verwendet. Keine nachgebauten
CSS-Karten als Ersatz. Für Rückwege nur das Holzbild spiegeln; HTML-Schrift
und zugängliche Beschriftungen bleiben unverändert lesbar.
Materialien und Bedienzustände liegen zentral in `css/art-direction.css`,
räumliche Anker in `css/staging.css`. Verfügbare Marker sind ohne Hover sichtbar;
Touchziele mindestens 44 Pixel. Platzierung am Bildinhalt prüfen, Gesichter,
Hände und wichtige Objekte freihalten. Details: `docs/hotspot-system.md`.

Die Tür in Kapitel 1 bleibt vor Abschluss aller verpflichtenden Stationen
unmarkierter Teil des Hintergrundbilds. Kein sichtbarer Button, Label oder
Rechteck; auch Fokus darf keinen frühen Exit anzeigen.

Erst am bestehenden Abschlusscheckpoint von Kapitel 1 wird der Exit sichtbar:
„Die Taverne verlassen“, optional darunter „Der Morgen beginnt.“.
Kein „Kapitel 2 beginnen“ auf dem Hotspot. Den bestehenden Übergang mit
Überblendung/Morgendämmerung beibehalten; danach die Kapitelkarte
„Kapitel 2 – Wie frei ist dein Leben?“ zeigen.

## Grenzen und Prüfung

Art-Direction-Arbeit ändert keine fachlichen Inhalte, Story, Aufgaben- oder
Feedbacklogik, Notizbuchtexte, Speicherlogik oder Kapitelstruktur.
Keine Audio-/Musikfunktionen oder neuen Bildassets ohne entsprechenden Auftrag.

Alle sichtbaren Modi prüfen: Start, Exploration, Dialog, Antworten, Aufgaben,
Feedback, Quellen, Notizbuch, Menüs und Kapitelübergang. Mindestens 1024×768
und eine kleinere iPad-ähnliche Ansicht prüfen: keine horizontalen Scrollbars,
überlappenden Touchziele oder abgeschnittenen Buttons. Kleine Screens nutzen
internes Scrollen. Bestehende Kapitel-, Save- und Responsive-Tests verwenden.

## Veröffentlichung

Auf ausdrücklichen Wunsch des Nutzers vom 3. Oktober 2026: Fertige, geprüfte
Änderungen anschließend direkt committen und auf den bestehenden Projektbranch
pushen. Den vorhandenen GitHub-Pages-Deploymentweg beibehalten. Push und
sichtbaren Remote-Commit überprüfen; etwaige Fehler ausdrücklich berichten.
