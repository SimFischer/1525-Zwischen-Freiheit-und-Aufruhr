# Kapitel 5 · Abschluss der erzählten Handlung

Stand: 10. Oktober 2026. Bestehende Szene-IDs, Konsequenzregeln und Bildoriginale bleiben erhalten. Kapitel 6 ist weiterhin ein vorbereiteter theologischer Perspektivwechsel, kein neues Handlungskapitel.

## Aufbau

1. `ch5_action_effect`: die tatsächliche Schlussaktion, Gefangenenfolge und gegebenenfalls Predigerrat werden ausgespielt.
2. `ch5_after_crisis`: Weltzustand, Unbeteiligte, Verhandlung und Versorgung erscheinen im vertrauten Dorf.
3. `ch5_konrad_news`: sichere, verletzte, gefangene oder vermisste Rückkehr bleibt an die bestehenden deterministischen Outcomes gebunden. Kein neuer Auftrag folgt.
4. `ch5_path_reflection`: Peter, Anna und Jakob schließen das Gespräch. Konrad spricht nur bei `safe`; andernfalls übernimmt Anna die gemeinsame Verantwortungsaussage. Ein ruhiger Erzählmoment trennt die letzten beiden Jakob-Zeilen.
5. `ch5_freedom_after_action`: eine dynamische Chronik führt durch die fünf Kapitel, anschließend eine persönliche Buchseite mit sechs Einträgen und eine offene Frage.
6. `ch5_end`: drei zeitlich versetzte Sätze in einer Schwarzblende. Nach zwölf Sekunden folgt der Perspektivwechsel automatisch; eine dezente Aktion erlaubt den Übergang früher.
7. `ch5_chapter6`: „Was bleibt von Freiheit? – Eine theologische Rückschau“. Die tatsächlich gewählte Frage steht im Mittelpunkt des vorbereiteten Einstiegs. Keine weitere Lernaufgabe wurde für Kapitel 6 gebaut.

Die frühere abschließende Freiheitsauswahl wird in der normalen Story nicht mehr gestellt. Ihr bestehender State `freedomAfterAction` und die alten Choice-IDs bleiben für frühere Saves lesbar. Neue Spielstände erhalten stattdessen `openTheologicalQuestion`; keine frühere Antwort wird in eine dieser Fragen übersetzt.

## Filmische Chronik

`buildStoryRecap(state)` in `data/story-recap.js` erzeugt deterministisch 14 Erinnerungsmomente mit insgesamt **89 Sekunden** Laufzeit, ohne Pausen. Die Schwarzblende ist zusätzlich zwölf Sekunden lang. Chronik und Frage warten auf den Leser. Es gibt keine MP4, Audiospur, neue Illustration, Punktanzeige oder Bewertung.

| Erinnerung | Sekunden | Bild / Inhalt |
|---|---:|---|
| Freiheit | 5 | Integrierte Taverne; Ausgangsfrage |
| Rechtfertigung | 5 | Freiheit vor Gott ohne eigene Rechtfertigungsleistung |
| Dienst | 7 | Dienst am Nächsten und die tatsächliche frühe Deutung |
| Wald | 5 | Nutzungsrechte und gespeicherte Waldentscheidung |
| Zeit | 5 | Frondienst und fremdbestimmte Arbeit |
| Ertrag | 6 | Abgabenentscheidung und gemeinsame Forderungen |
| Gemeinsame Forderungen | 5 | Das Dorf als Ausgangspunkt der gemeinsamen Stimme |
| Memmingen | 7 | Forderungen und Evangelium; Originalraum und Canon-Anker |
| Öffentlichkeit | 7 | Tatsächliche Druckentscheidung und ihre Dorfreaktion |
| Ordnung / Widerstand | 7 | Tatsächlicher Kapitel-4-Einstiegsraum |
| Forderung / Mittel | 7 | Luthers Unterscheidung und gespeicherter Risiko-Schwerpunkt |
| Handeln | 5 | Tatsächlicher Kapitel-5-Ausgangsraum |
| Menschen / Mittel | 8 | Gefangenenentscheidung und Schlussaktion |
| Folgen | 10 | Nur die gespeicherten Konrad-, Verhandlungs-, Zivil- und Weltzustände |

Die Bilder überblenden sich mit ruhigen Kamerabewegungen bis maximal 2,5% Vergrößerung. Alle verwendeten Raumplatten sind aktuell gültig. Kapitel-3-Figuren nutzen dieselbe Renderfunktion und dieselben Bodenanker wie im tatsächlichen Kapitel; spätere Canon-Körper nutzen die gemeinsame Kapitel-4/5-Funktion. Die Kirchhofgruppen und Endzustandslayer verwenden ihre ursprünglichen Registrierungen. Kein ungeeignetes Asset musste neu produziert oder durch extremes Cropping ersetzt werden.

## Personalisierung und Kausalität

Die fünf `deriveChapter…Recap`-Funktionen lesen den State und verändern ihn nicht. Bekannte Auswahl-IDs werden gegen die kanonischen Kataloge geprüft; fehlende oder unbekannte Werte führen zu allgemeinen Erinnerungen, niemals zu behaupteten Entscheidungen.

- Kapitel 1: `choices.initialFreedomInterpretation`.
- Kapitel 2: `forestResponse`, `duesResponse`, `playerDemand`.
- Kapitel 3: `religiousInterpretation`, `printStrategy`; die sichtbare Wirkung stammt aus der im Spiel bestehenden Druck-/Dorfreaktion. Keine erneute Berechnung von Profilpunkten.
- Kapitel 4: `openingRoute`, `centralRisk`, `lutherHarshTextJudgment`.
- Kapitel 5: `openingPath`, `prisonerDecision`, `finalAction`, `konradOutcome`, `negotiationOutcome`, `civilianOutcome`, `endWorldState`.

Beispiele: Eine gespeicherte Rechtsprüfung im Wald wird als Hinterfragen des Verbots erinnert. Vollständiger Druck verweist auf genauer lesbare Artikel; ein anklagendes Blatt auf den schärferen Dorf-/Herrschaftston. Freilassung wird als die tatsächliche Gefangenenentscheidung gezeigt, nicht als moralisch bessere Antwort. Nur bei `bargaining_leverage` benennt die Chronik den bereits ausgespielten Zusammenhang: Die Herrschaft verlangt Freilassung vor weiteren Gesprächen; das Druckmittel verschärft ihre Reaktion.

Andere Folgeworte lauten „Während ihr Quellen und Wege prüftet, eskalierte der Konflikt außerhalb des Dorfes weiter.“ bzw. benennen den gespeicherten Zustand. Kein Text behauptet, die einzelne Person habe den historischen Bauernkrieg verursacht. Ein übereinstimmendes grobes Endbild kann unterschiedliche persönliche und politische Folgen enthalten.

## Offene Frage und Kapitel-6-Hook

`chapter5.openTheologicalQuestion` speichert genau einen dieser Werte:

- `limits_of_resistance`
- `religious_certainty`
- `enemy_as_neighbor`
- `luther_freedom_tension`
- `unintended_consequences`

Die Auswahl besitzt weder Musterlösung noch Orientierungsgewinn. Sie bleibt nach Reload ausgewählt und erscheint im Kapitel-6-Einstieg sowie im Notizbuch. `chapterSixHandoff` enthält sie zusätzlich auf oberster Ebene. Kapitel 2, sämtliche Entscheidungen und Beschwerden werden nun neben der bisherigen Freiheit, Orientierung, Wahrnehmung, Kapitel 3/4 und Kapitel-5-Folgen ausdrücklich mitgegeben. Damit bleibt die Grundlage für später personalisierte erste Reflexionen erhalten.

## Bedienung, Speicherung und Wiederholung

- **Pause / Fortsetzen:** auch bei sofortiger Pause bleibt der Text sichtbar. Der gespeicherte Filmindex, die verstrichene Zeit und der Pausenzustand bleiben nach Reload erhalten.
- **Überspringen:** führt stets zur persönlichen Chronik; die Frage bleibt verpflichtend, bevor die Story geschlossen wird.
- **Wiederholung:** über die Chronik, den Kapitelabschluss oder das Notizbuch. Der Replay-Zustand bleibt ausschließlich vorübergehend. Die Chronik wird erneut gezeigt, aber keine neue Frage erzwungen und kein Save verändert.
- **Hintergrund / Notizbuch:** die Erinnerung läuft nicht weiter, während die Seite verborgen oder ein anderes Overlay geöffnet ist.
- **Reduced motion:** keine Kamerafahrten oder animierten Überblendungen; identische Bilder, Inhalte, Auswahl und Speicherung.
- **Kleine Ansicht:** während des Films kein Scrollen. Die Chronik hat einen einzigen mit Touch und Tastatur lesbaren Bereich; Fortsetzung bleibt außerhalb dieses Bereichs. Die fünf Fragen sind auf den Zielgrößen erreichbar.

## Abnahme

`check-story-recap.cjs` prüft vier reale gespeicherte Vorgeschichten auf 1024×768, 820×640 und 1440×900. Alle Film-Bilder laden, sechs Chronikeinträge und fünf Fragen erscheinen, Navigation bleibt erreichbar. Pause/Reload, Skip, Auswahl/Reload, Kapitel-6-Handoff und unveränderter Save bei Replay sind geprüft. Ein vollständiger automatischer Durchlauf läuft mit den tatsächlichen Zeitcallbacks unter einer virtuellen Uhr; anschließend wartet die Chronik. Reduced-motion ist separat geprüft.

`check-story-recap-state.cjs` prüft Determinismus, unveränderten Eingangsstate, vier deutlich verschiedene Chroniken, alle Outcomes, alle Gefangenenentscheidungen, die fünf Fragen und alte/ungültige Saves. Die bestehenden Kapitel-5-, Responsive-, State-, Admin- und Konsequenztests wurden ausgeführt. Vier echte Neuspielrouten führen weiterhin durch Kapitel 1–5 bis zum neuen Übergang. Lokale Screenshot-Nachweise: `artifacts/story-recap/`.

Die visuelle Durchsicht führte zu einer Korrektur der Memmingen-Anker: Die Rückschau verwendet die ursprünglichen Kapitel-3-Anker statt einer improvisierten späteren Figurengröße. Weitere Illustrator-Aufträge sind nicht erforderlich. Physisches iPad/Safari und eine Unterrichtserprobung mit Q1-Lernenden bleiben von der automatisierten Browserabnahme getrennt.
