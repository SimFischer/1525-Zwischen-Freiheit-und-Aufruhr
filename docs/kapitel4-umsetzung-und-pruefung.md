# Kapitel 4 – Ordnung oder Widerstand?

Implementierung auf dem aktuellen `main`, Ausgangsstand `c8a8c19`, 3. Oktober 2026.
Die Verbesserungen von Kapitel 1–3 bleiben erhalten. Kapitel 5 ist ausschließlich
eine Übergangskarte; seine Spielsituationen sind noch nicht implementiert.

## Spielablauf und sichtbare Konsequenzen

36 registrierte Prüfstellen bilden ein zusammenhängendes Kapitel. Der Weg führt
vom veränderten Dorf über eine erste Handlung, Luthers Friedensermahnung,
Freiheit und Obrigkeit, fünf konkrete Fälle, Müntzer und drei Auslegungen zu
einer zweiten Handlung. Weingarten erlaubt eine ausdrückliche Revision. Erst
danach folgen die Eskalation im Mai, Luthers schärfere Schrift und das Urteil.

| Entscheidung | Unmittelbare Folge | Weitere Folge / gespeicherte Verantwortung |
|---|---|---|
| Druckstrategie aus Kapitel 3 | Genau ein vollständiges Dorf-Overlay: differenzierte Lektüre, Kurzfassungen, religiöse Diskussion oder Warnung | Gerüchte, Auslegungsstreit und herrschaftliches Misstrauen kehren wieder |
| Widerstandsstrategie aus Kapitel 3 | Herrenhof, große Versammlung, Dorfgruppe oder Jakobs Tisch | Unterschiedliche erste Handlungsmöglichkeiten; theologische Vorbereitung kostet Einfluss auf die frühe Mobilisierung |
| Argument vor dem Verwalter | Abordnung, religiöse Diskussion oder Warnung | Eine Drohung schließt die unmittelbare Audienz. Erst die Begrenzung der Mittel öffnet wieder ein Gespräch über die Abordnung |
| Gemeinschaftsaktion | Abordnung, zurückgehaltene Abgaben, Briefe oder öffentliche Versammlung | Das Dorf übernimmt gemeinsam Versorgung, Öffentlichkeit und Verantwortung |
| Erste Widerstandshandlung | Zurückgehaltene Abgaben, Gruppe, blockierter Speicher oder Rückkehr zum Herrenhof | Die konkrete Handlung bleibt für den Endzustand und die spätere Ausgangslage erhalten |
| Theologische Handlungsbegründung | Herrenhof, Gemeindeversammlung, Bauernlager oder Auslegungstisch | Teilvereinbarung, gemeinsames Mandat, konkrete Widerstandsverpflichtung oder vertiefte Prüfung bei fortlaufender Mobilisierung |
| Handlung am Lager | Vorräte schützen, Speicher besetzen, zur bewaffneten Gruppe treten oder außerhalb dieser Gruppe bleiben | Mittel, Grenzen und Nähe zum Bauernhaufen werden übergeben |
| Weingarten | Eine neue Position wird ausdrücklich formuliert | Unterstützung einer Verhandlung öffnet diesen Endweg auch nach einer früheren Widerstandsentscheidung |
| Handlung in der Eskalation | Flüchtlingswagen, Blick auf den Rauch oder bewaffnete Gruppe | Die Handlung und ihre Menschenfolgen bleiben im Weg und im Übergabezustand |
| Gefahr und Lutherurteil | Unterschiedliche Figurenreaktionen, vorläufiges Urteil im Notizbuch | Keine richtige Gesinnung; das konkrete Urteil bleibt für Kapitel 6 verfügbar |

Der Endzustand ist deterministisch, ohne Zufall oder sichtbare Bewertung:

1. Die ausdrückliche Revision zugunsten einer Verhandlung hat Vorrang.
2. Vertiefte Auslegungsprüfung bei weitergehenden Ereignissen führt je nach
   religiösem Dorfzustand / benannter Gefahr zu Polarisierung oder verselbständigten Ereignissen.
3. Prophetischer Widerstand mit Ablehnung des Rückzugs führt zur Nähe zum Bauernhaufen.
4. Bedingte Verhandlung erhält ein gemeinsames Mandat; ein offener, nicht bedrohter
   Verhandlungsweg kann am Herrenhof bleiben.
5. Danach zählen die theologische Richtung, die tatsächliche Widerstandshandlung,
   die Grenze der Mittel, frühere Drohungen, Öffentlichkeit und Orientierung.

Die fünf Bilder sind: `negotiation_open`, `mobilized_community`,
`joining_peasant_band`, `religious_polarization`, `events_moved_without_you`.
Die konkreten Regeln stehen zentral in `data/chapter-four-state.js`.

## Frühere Entscheidungen und Speicherstand

Die eigenen Worte aus Kapitel 1 erscheinen im Vergleich des Notizbuchs.
Die Forderung und priorisierten Beschwerden aus Kapitel 2 sowie die konkrete
Forderung, Deutung und Begründung aus Kapitel 3 werden im Dorf aufgegriffen.
Gemeldete Wald- und Frondienstkonflikte verändern das Gespräch am Herrenhof.
Ein früheres hermeneutisches Bedenken kann die zusätzliche Analysefrage öffnen.

`chapter4` ergänzt die bestehenden Save-Versionen 1–4 mit Standardwerten.
Kanonische freie Entscheidungen werden über das bestehende Konsequenzensystem
idempotent synchronisiert. Quellenaufgaben, Fallzuordnung und Hilfestellungen
verändern keine Orientierung oder Charakterbewertung.

Der Übergabezustand für Kapitel 5 enthält Endwelt, theologische Richtung,
Weingarten-Position, Risiko, Lutherurteil, Orientierung, Figurenwahrnehmungen,
Verhandlungszugang, Nähe zum Bauernhaufen, Grenzen der Mittel und Bedingungen.
Die Epilog-Vorbereitung übernimmt Kapitel 4 einschließlich dieser Übergabe.

## Assets, Quellen und Inszenierung

Alle **57 Original-PNGs** liegen bytegleich in `assets/chapter4/`.
Das Produktionspaket, Manifest und ZIP wurden nicht verändert. Die Bilder
werden nur an den benötigten Prüfstellen geladen; Kapitel 1 lädt keine neuen
Kapitel-4-Figuren vor. Keine neuen Rasterbilder, Canon-Varianten oder Audios.

Die unveränderte Dorfillustration wird mittig auf die festgelegte 4:3-Fläche
gesetzt. Dorf-Overlays behalten ihren vollständigen 1024×768-Canvas.
Die große Versammlung bringt bereits Zuhörer mit: Vordergrundsprecher stehen
im offenen Bereich unterhalb der vorhandenen Gesichter. Tischobjekte liegen
auf den Tischflächen; Briefe werden von Anna getragen. Neutral-/Sprechposen
und vollständige Portraits nutzen das bestehende Dialogsystem und `contain`.
Marker verwenden ausschließlich die globalen PNG-Materialien und 44-Pixel-Ziele.

Elf Dokumentbilder erhalten HTML in den Textregionen des Manifests, mit mindestens
18 Pixeln, 92 % Leseflächenbreite, erhaltenem Seitenverhältnis und internem Scrollen.
Der Leser bietet ständig erreichbare Seiten-, Größen-, Schließen- und Rückwege.
Das Archiv zeigt nur bereits gelesene Seiten; die Mai-Schrift ist vorher gesperrt.
Redaktionelle Hinweise stehen ausschließlich im geschlossenen Archivinformationsbereich.

Die beiden Freiheitsleitsätze bleiben behutsam modernisierte Quellenworte.
Die anderen Kapitel-4-Lesetexte sind ausdrücklich gekennzeichnete heutige
Zusammenfassungen und historische Einordnungen, keine erfundenen Lutherzitate.
Müntzers Offenbarungsverständnis und Herrschaftskritik werden ernst genommen,
ohne daraus eine unkritische Rechtfertigung jeder Gewalt zu machen.

Historische Bezugspunkte:

- [Luthers Friedensermahnung, Originaldruck und Einordnung · bavarikon](https://www.bavarikon.de/object/BSB-HSS-00000BSB00089333?lang=de).
- [Von weltlicher Obrigkeit, Druck von 1523 · Deutsche Digitale Bibliothek](https://www.deutsche-digitale-bibliothek.de/item/LVNOKZDWYU34MGVVQY3CA7T5EGCI46KO).
- [Fürstenpredigt von 1524, Quellenedition · German History in Documents and Images](https://germanhistorydocs.org/de/von-den-reformationen-bis-zum-dreissigjaehrigen-krieg-1500-1648/ghdi:document-4270).
- [Weingartener Vertrag · LEO-BW](https://www.leo-bw.de/fr/web/guest/themenmodul/bauernkrieg/vertraege/weingartener-vertrag): mündlich 17. April, ausgefertigt und ratifiziert 22. April; kein allgemeiner Sieg der Bauern.
- [Schärfere Mai-Schrift und Eskalation · LutherMuseen](https://www.luthermuseen.de/en/node/889): deutlich nach der Friedensermahnung, keine Vorwegnahme im April.

## Admin und Modulstruktur

Der normale versteckte Admin zeigt drei Kapitel-4-Ziele: Dorf / vorbereiteter Weg,
Luther / Ordnung und Auslegung, Eskalation / Urteil und Kapitelende.
`?debug=true` behält alle 36 Detailziele und bietet die vollständigen Testfelder.
Vorbereitung und Rücksetzung liegen zentral in `js/chapter-four-admin.js` und
der bestehenden Kapitelregistrierung. Geänderte Entscheidungen bleiben bei
weiteren Sprüngen erhalten. Der normale Schüler-Spielstand bleibt geschützt.

- `data/chapter-four*.js`: Szenen, Gespräche, Entscheidungen, Aufgaben, Quellen,
  Canvas-Regionen, Konsequenzen, Save-Standardwerte und Endregeln.
- `js/chapter-four.js`: Spielfortschritt und Handlungsfolgen.
- `js/chapter-four-view.js`: räumliche Anker, Vordergrund und Aufgabenansichten.
- `js/chapter-four-documents.js`: Lesetisch und freigeschaltetes Archiv.
- Bestehende App-, Scene-, Save-, Notebook- und Admin-Module: kleine Integrationspunkte.
- Materialregeln in `css/art-direction.css`, räumliche Regeln in `css/staging.css`.

## Prüfung

`check-chapter-four.cjs` spielt vier Hauptwege und einen zusätzlichen Weg für den
fünften Endzustand durch, jeweils bei **1024×768, 820×640 und 1440×900**.
Jeder Durchlauf lädt an elf Prüfstellen neu und vergleicht den vollständigen Save.
Alle 57 Runtime-Assets werden dabei tatsächlich angefordert und verwendet.

`check-chapter-four-details.cjs` prüft alle **56 Antwortoptionen**, unmittelbare
Handlungsfolgen, den verlorenen Zugang nach einer Drohung, Quellensperren,
alle 36 Szenen, fünf Endbilder und alle Leseseiten im wirklichen Archiv an den
drei Referenzgrößen. Dazu gehören Mouse-Drag, Touch-Tap, Touch-Drag,
gleich große Material-Geister, Abbruch, alte Saves, revidierte Entscheidungen,
Admin-Änderungen, Kapitel-Reset und der geschützte normale Spielstand.

Die bestehenden Kapitel-1-, Kapitel-2-, Kapitel-3-, Konsequenz-, Admin-,
Portrait-, Drag-, Source-, Staging-, Hotspot- und Gesamtspieltests bleiben aktiv.
`check-whole-game.cjs` spielt drei unveränderte Neuspielwege durch Kapitel 1–3.
Die beiden Asset-Prüfungen kontrollieren Originalhashes und ZIP-Integrität.
Die historischen Hashes veränderbarer wiederverwendeter Code-/CSS-Dateien
werden gegen den unveränderten Produktionscommit geprüft; die PNGs weiterhin
gegen die aktuellen Originaldateien. Keine Testassertion für Schülerzustände
oder Bilder wurde entfernt.

Bildbelege und Durchlaufprotokolle liegen lokal unter `artifacts/chapter4/`
und `artifacts/chapter4-details/`. Die Zielspielzeit 30–35 Minuten ist eine
didaktische Planung, keine empirisch gemessene Bearbeitungszeit einer Lerngruppe.
