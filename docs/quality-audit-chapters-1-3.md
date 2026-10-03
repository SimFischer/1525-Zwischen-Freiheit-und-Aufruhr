# Qualitätsprüfung Kapitel 1–3 · 3. Oktober 2026

Geprüft wurde das bestehende Adventure auf `main`; Engine, Kapitelstruktur und die gespeicherten Entscheidungs-IDs bleiben erhalten. Parallel hinzugekommene Kapitel-4-Assets sind kein Bestandteil dieser Überarbeitung.

## Gefundene Abweichungen und direkte Korrekturen

1. **Fachliche Antwort als Profilbelohnung:** `freedomAndOuterLife:D` erhöhte Theologie/Rechtsorientierung und eine Figurenwahrnehmung. Jetzt bleiben alle Optionen aller 14 fachlichen Auswahlen profilneutral. Die Antwort wird weiterhin gespeichert und im Luther-Rückgriff erinnert. Alte Kapitel-3-Profilschnappschüsse werden einmalig aus den tatsächlichen früheren Entscheidungen berichtigt; spätere Kapitel-3-Entscheidungen gelangen nicht in diese Erinnerung.
2. **Weltzustand ohne Bezug zur Wahl:** Im Dorf lag immer Reisig, auch nach Verzicht, Rechtsnachfrage und gemeinschaftlicher Beratung. Das Bündel erscheint jetzt ausschließlich nach dem tatsächlichen Mitnehmen. Gesprächsfolgen der anderen Wege bleiben bestehen.
3. **Unzutreffender Tagesplan:** Nach Verweigerung, Aufschub oder Vertretung stand weiterhin „Arbeit am Herrenhof“. Das Schild nennt jetzt den tatsächlichen Ausgang und bei Aufschub die offene Antwort. Verschobene eigene Arbeit wird nicht als erledigt dargestellt.
4. **Jahreszeit:** Das Frühjahr 1525 wurde mit gerade eingebrachter Ernte vermischt. Peters Getreidearbeit ist jetzt Aussaat; Margarethes Vorräte stammen von der letzten Ernte. Die vorhandenen Entscheidungen und Mengen bleiben erhalten.
5. **Zu allgemeiner Quellenvergleich:** Alle zwölf Kombinationen aus Beschwerdegruppe und eigener Forderung erhalten einen eigenen Vergleich mit den passenden Artikeln. Wahlrecht, Kriterien, rechtmäßige Erwerbungen, zusätzliche Dienste und vollständige Aufhebung werden unterschieden. Keine dieser freien Forderungen wird als falsche Wahl blockiert.
6. **Unkenntliche müntzernahe Position:** Matthes nennt Müntzer und Allstedt 1524. Erfahrener Gotteswille, Anfechtung und Erwartung des Gottesgerichts werden mit der Frage nach religiös legitimierter Gewalt verbunden. Jakob fragt nach der Prüfung dieser Gewissheit. Keine späteren Ereignisse werden vorgezogen. Quellenhinweis ausschließlich im geschlossenen Archivbereich.
7. **Q1-Abschlusssicherung:** Die zweite Luther-Folgerung fragt jetzt ausdrücklich nach dem Unterschied zwischen Dienst aus Glauben und einem politischen Zustimmungsverfahren. Die Ablenker prüfen die Reichweite der Folgerung statt einer Belohnung durch gute Werke.
8. **Schwache Wirkung der eigenen Dorfforderung:** Anna liest die tatsächlich formulierte Forderung zurück und fragt, ob andere Gemeinden dafür einstehen können. Alle 54 Kombinationen bleiben frei wählbar; die doppelte Begründungsklausel einer Kombination wurde bereinigt. Der spätere Lotzer-Rückgriff und das Notizbuch bleiben erhalten.
9. **Fremde Körperteile hinter Masken:** Kapitel 2 nutzt die bereits bereinigten Anna-/Konrad-Figuren auch aus Kapitel 3. Der Verwalter erhält seinen vorhandenen vollständigen neutralen Körper. Margarethes fremder Arm-/Schuhrest wurde am Originalmotiv mit dem eingebauten Bildwerkzeug entfernt. CSS-Schnittmasken sind entfernt; Blickspiegelungen bleiben bestehen.

Margarethe: `assets/chapter2/characters/ch2_char_margarethe_repaired.png`. Reparaturprompt: Fremden Arm und Schuh am rechten Rand entfernen; Identität, Gesicht, Denkpose, eigene Hände, Kleidung, beide vollständigen Schuhe, Licht und Stil erhalten; transparenter Hintergrund. Eingebautes Bildwerkzeug, keine CLI/API-Fallback-Erzeugung.

## Entscheidungen einzeln geprüft

Der maschinenlesbare Katalog `quality-audit-choice-catalog.json` enthält alle **28 Auswahlen mit 108 Optionen**: 14 offene Entscheidungen und 14 fachlich prüfbare Quellen-/Begründungsaufgaben. Jede offene Option hat eine direkte Figurenreaktion. Jede fachliche Option wurde zusätzlich auf Profil- und Wahrnehmungsneutralität sowie wiederholte Synchronisation geprüft.

| Auswahl-ID | Art | Prüfung / Folge |
|---|---|---|
| `ch3EntryFocus` | offen | Individuelle Figurenreaktionen; entry branch / print publicTone / resistance callback / notebook; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Demand_labor` | offen | Individuelle Figurenreaktionen; articleComparison / village return; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Demand_rights` | offen | Individuelle Figurenreaktionen; articleComparison / village return; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Demand_church` | offen | Individuelle Figurenreaktionen; articleComparison / village return; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Religion` | offen | Individuelle Figurenreaktionen; entry branch / print publicTone / resistance callback / notebook; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Print` | offen | Individuelle Figurenreaktionen; entry branch / print publicTone / resistance callback / notebook; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Resistance` | offen | Individuelle Figurenreaktionen; entry branch / print publicTone / resistance callback / notebook; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `ch3Reason` | offen | Individuelle Figurenreaktionen; entry branch / print publicTone / resistance callback / notebook; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `forestArgument` | fachlich | Fachlich präziseste Lösung A; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `forestConflict` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `forestResponse` | offen | Individuelle Figurenreaktionen; assemblyIntro; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `corveeSacrifice` | offen | Individuelle Figurenreaktionen; assemblyIntro; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `corveeResponse` | offen | Individuelle Figurenreaktionen; assemblyIntro / assemblyPressure; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `corveeDefinition` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `duesResponse` | offen | Individuelle Figurenreaktionen; assemblyIntro / assemblyPressure; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `assemblyConnection` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `forestDemand` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `corveeDemand` | fachlich | Fachlich präziseste Lösung A; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `duesDemand` | fachlich | Fachlich präziseste Lösung A; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `lutherPoliticalInference` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `initialFreedomInterpretation` | offen | Individuelle Figurenreaktionen; ch2Morning; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `freedomSocialFirstThought` | offen | Individuelle Figurenreaktionen; corveeIntro; kanonische Wahl im Spielstand und Folgekapitel-Export. |
| `freedomAndOuterLife` | fachlich | Fachlich präziseste Lösung D; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `serviceBoundary` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `obedienceBoundary` | fachlich | Fachlich präziseste Lösung B; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `freedomComparison` | fachlich | Fachlich präziseste Lösung D; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `innerConsolidation` | fachlich | Fachlich präziseste Lösung A; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |
| `politicalConsolidation` | fachlich | Fachlich präziseste Lösung A; differenzierte Hinweise, unterstützter Weg; keine Profil-/Beziehungsbelohnung. |

Weitere Handlungen wurden gesondert geprüft:

- Rechtfertigungskette: Ursache/Folge zwischen Gnade, Glauben und Werken; Umordnen und gestufte Hilfe.
- Zwei-Feld-Sortierung: konkrete Beispiele; sechs eindeutige Zuordnungen und zwei begründungsbedürftige Grenzfälle, keine politische Gleichsetzung.
- Peters Tagesplanung: alle sechs Reihenfolgen, erste Tätigkeit als Figurenreaktion, gespeicherter Plan und Unterbrechung.
- Getreideplanung/Abgabe: tatsächliche Vorratsbestände statt moralischer Wertung; entnommene Säcke ändern den sichtbaren Bestand. Nahrung, Saat und Reserve haben unterschiedliche Versorgungsfolgen; Verweigerung behält den Sack und führt zur Meldung.
- Reflexionen und Prioritäten: keine Musterlösung für freie Schwerpunktsetzung; Notizbuch, sichtbare eigene Beschwerde und vorgewähltes Forderungsthema.
- Beschwerdeverbindungen: Gemeinsamkeiten müssen zu beiden Beschwerden passen; fachliche Begründung statt zufälliger Kombination.
- Forderungsbaukasten: 54 Kombinationen mit unmittelbarem Rücklesen und späterem Lotzer-Rückbezug; alte gespeicherte Wortlaute bleiben erhalten.
- Evangeliumswerkstatt: alle sechs Paare der vier Auslegungen führen weiter. Unterschiedliche Reichweiten werden besprochen, keine Überzeugung als Spielerfehler blockiert.
- Druck: genau ein manueller Ablauf mit Farbe, Papier, Form, Pressen, Entnehmen; danach automatische Vervielfältigung von einem auf vier Bögen. Keine Wiederholungsschleife.

## Ganze Geschichte: drei echte neue Spiele

`scripts/check-whole-game.cjs` beginnt jede Route mit „Neues Spiel“. Kein Admin, keine Kapitel-Sprünge, keine manipulierten Speicherstände. Alle verpflichtenden Gespräche, Aufgaben, Quellen und Übergänge werden durch die tatsächliche Oberfläche gespielt; Reloads erhalten Entscheidungen und Folgen.

| Route | Ansicht | Schwerpunkt / sichtbare Folgen |
|---|---|---|
| A | 1024×768, Maus | Theologische Differenzierung, Rechtsnachfrage im Wald, Aufschub, Begründung der Abgabe, vollständiger Druck und Verhandlung; kein fiktiv gesammeltes Holz. |
| B | 820×640, Touch-Kontext | Gemeinschaft, Vertretung, Aufschub der Abgabe, gemeinsame Pfarrerwahl, zusammenfassender Druck und kollektiver Druck; Hilfe und Einigkeit werden zum Problem. |
| C | 1440×900, Maus | Holzmitnahme, Dienstverweigerung, zurückbehaltener Sack und weitere Verweigerung, vollständige Aufhebung, anklagender Druck und offener Widerstand; Meldungen und Gegner werden sichtbar. |

Die Route beeinflusst unmittelbare Reaktionen, Dorfversammlung, frühere Erinnerungen in Memmingen, öffentliche Wirkung und Widerstandsfrage. Quellen und zentrale Inhalte bleiben in allen drei Wegen erreichbar. Exporte für spätere Kapitel/Epilog bewahren Wahl, Forderung, Orientierung, Wahrnehmungen und Konfliktmerker. Kapitel 4–6 sind hier nicht als fertige Handlungsfortsetzungen behauptet.

## Fachliche und visuelle Gesamtprüfung

Luther: Annahme aus Gnade im Glauben; Werke als Folge; Freiheit setzt zum Dienst frei, ohne automatisch eine politische Ordnung festzulegen. Die Bauernartikel begründen Forderungen mit dem Evangelium, halten angemessene Obrigkeit fest und lassen ihre Ansprüche anhand der Schrift prüfen. Müntzer ist als eigene theologische Perspektive kenntlich; religiöse Gewissheit begründet nicht automatisch legitimes Handeln.

Historische Gegenprüfung: [Luther 1520, digitale Edition](https://editions.mml.ox.ac.uk/editions/freiheit-1520/), [Augsburger Druck der Zwölf Artikel, Stadtarchiv Memmingen](https://stadtarchiv.memmingen.de/quellen/reformation-und-bauernaufstand/zwoelf-artikel-der-bauernschaft-augsburger-erstdruck.html), [Müntzer, Fürstenpredigt vom 13. Juli 1524](https://germanhistorydocs.org/de/von-den-reformationen-bis-zum-dreissigjaehrigen-krieg-1500-1648/ghdi:document-4270). Die Ermahnung zum Frieden wird in Kapitel 3 nicht als bereits vorliegende Reaktion behandelt.

Alle registrierten Szenen und Sprechermodi wurden auf Bildbezug, Personen, Blickrichtung, Boden, Portraits, Bedienflächen und Quellen geprüft. Originale Materialrahmen des gemeinsamen Hotspot-Systems bleiben erhalten; HTML-Schrift wird nicht gespiegelt. Früher Tavernenexit bleibt unsichtbar. Keine dekorativen Krug-/Kerzen-/Fensteraktionen.

1024×768, 820×640, 1440×900 sowie die vorhandenen Hochformat-/Telefonansichten: keine horizontalen Scrollleisten, fehlenden Bilder oder überlappenden Hotspot-Beschriftungen. Quellen werden vollständig dargestellt, Originaltext ist als HTML erreichbar. Alle zwölf Artikel sind in Spiel und Archiv lesbar. Längere Inhalte scrollen intern; Schließen und Navigation bleiben erreichbar. Sprecherköpfe sind vollständig im Portraitfenster, Maßstäbe und Blickrichtungen wurden verglichen.

## Reproduzierbare Prüfungen

- `check.cjs`: Kapitel 1 komplett, jede Antwort und Hilfestufe, Reihenfolge, Sortierung, Quellen, Tastatur, Mouse/Touch, Alt-Saves, fünf Ansichten.
- `check-chapter-two.cjs`: alle sechs Reihenfolgen der Alltagserkundung, jede fachliche Antwort, freie Handlungsoptionen, Vorräte, Quellen, Notizbuch, Reload und Übergang.
- `check-chapter-three.cjs`: vier Kapitelrouten, 32 Wahloptionen, sechs Auslegungspaare, Quellen, 24 Szenen, Speicherstände und drei Ansichten.
- `check-whole-game.cjs`: drei tatsächliche Durchläufe Kapitel 1–3, zurückkehrende Wahlfolgen, profilneutrale fachliche Aufgabe und Folgekapitel-Export.
- `check-consequences.cjs`: jede fachliche Auswahl profilneutral, idempotente Effekte, Migration alter Profilschnappschüsse, zwölf individuelle Quellenvergleiche, 54 Forderungen und unmittelbares Rücklesen, alle vier Tagesplan-Ausgänge, spätere Optionen und geschützter Schüler-Spielstand.
- `check-admin.cjs`: Mouse/Touch-Hold, drei Hauptsprünge je Kapitel, Detail-Debug, Voraussetzungen, separate Testzustände, Reset, JSON und Reload.
- `check-world-hotspots.cjs`, `check-chapter-two-staging.cjs`, `check-ui-details.cjs`: Materialien, räumliche Anker, 44-Pixel-Bedienung, Dialoge, Portraits, Übergänge und kontrollierte Drag-Vorschau.
- `check-chapter-three-staging.cjs`: 55 Dialogzeilen je Ansicht, vollständige Figuren ohne Schnittmasken, Bodenkontakt, gemeinsame Blickrichtungen und Druck-Save-Migration.
- `check-chapter-three-drag.cjs`: Maus und echte Touch-Ereignisse bei drei Größen, feste Ghost-Größe und ein manueller Druckvorgang.
- `check-chapter-three-documents.cjs`: alle zwölf Artikel bei drei Größen, lesbare Typografie, Quellen-/Zusammenfassungsunterscheidung und erreichbare Navigation.
- `check-chapter-three-assets.py`: 45 Originalassets, Alpha, Maße, Canon, Hashes und Paketintegrität.

Unveränderte inzwischen vorhandene Kapitel-4-Assetprüfungen werden ebenfalls ausgeführt; sie ergänzen keine Kapitel-4-Handlung.

Die Bildnachweise und vollständigen Routenprotokolle liegen lokal in `artifacts/whole-*.png`, `artifacts/whole-game-routes.json`, `artifacts/quality-ch1-3-contact.png` und den vorhandenen Szenen-/Quellen-Screenshots. Sie werden wegen Umfangs nicht veröffentlicht.

Abschließender Testlauf: alle elf bestehenden Browserprüfungen für Kapitel 1–3, der neue Gesamtdurchlauf sowie beide Assetprüfungen und die inzwischen vorhandene Kapitel-4-Kompositionsprüfung bestanden. Keine Konsolenfehler oder fehlenden Bilder.

## Ergebnis

Die Kapitel bilden eine durchgehende Geschichte: Deutung der Freiheit → Alltag unter herrschaftlicher Verfügung → gemeinsame, religiös begründete Forderungen → Öffentlichkeit und Widerstandsfrage. Entscheidungen werden weder als moralische Punkte sichtbar gemacht noch mit den fachlichen Aufgaben verwechselt. Begründungsaufgaben bleiben eingebettet in die Anliegen der Figuren. Die vorhandene Architektur bleibt erhalten.
