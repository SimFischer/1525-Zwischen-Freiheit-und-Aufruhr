# Kapitel 5 – Du musst handeln

## Umsetzung

27 Szenen auf dem bestehenden Szenen-, Dialog-, Material-, Hotspot- und Speichersystem. Keine Bilder neu erzeugt oder Originalbilder verändert. Die Registrierungen aus `chapter5_assets_manifest.json` sind in `data/chapter-five-staging.js` übernommen: vollständige 4:3-Platten, gemessene Canon-Körper, Fußlinien, Blickrichtungen, registrierte transparente Ergänzungen und Schreibbereiche. Die vier Arbeitsflächen enthalten zugänglichen HTML-Text mit mindestens 18 Pixeln. Die alte Kapitel-5-Platzhalteransicht führt jetzt in das spielbare Kapitel.

| Eingang | Ausgangslage aus Kapitel 4 | Eigene Handlung |
|---|---|---|
| Bauernhaufen | `joining_peasant_band` | Wagen, Versorgung, Abordnung oder Gewaltgrenze; unterschiedliche Folgeszenen |
| Verhandlung | `negotiation_open` | Vier Bedingungen; Abordnung bleibt oder verlässt sichtbar den Raum |
| Theologische Beratung | `events_moved_without_you`, vorsichtige Auslegung | Vier Aussagen jeweils auf Orientierung und Grenze prüfen; Rat an den Prediger |
| Religiöser Streit | `religious_polarization` | Gefahren und blinde Flecken beider Gruppen prüfen |

Explizite Weltzustände haben Vorrang. Bei `mobilized_community` oder älteren unvollständigen Spielständen entscheiden die theologische Position, das Verhalten bei Weingarten, der Branch-Ausgang, das Orientierungsprofil und gegebenenfalls die öffentliche religiöse Deutung. Die zentrale Funktion `deriveChapter5OpeningPath` enthält die Reihenfolge; sie ist nicht in Bild- oder Szenenvarianten versteckt.

## Lernen und Folgen

Frühe Freiheitsdeutung, Dorf-Forderung, Memminger Religionsdeutung, Druck- und Widerstandsstrategie, Beziehungen sowie frühere Luther-Urteile werden im Gespräch aufgegriffen. Weingarten, frühere Verweigerung und die öffentliche Zuspitzung beeinflussen die spätere Verhandlung. Eine zuvor erklärte Gewaltgrenze öffnet zusätzlich den ausdrücklich geschützten Rückzug.

Die gemeinsame Krise unterscheidet widersprüchliche Berichte von gesichertem Wissen. Jede Einordnung erhält eine konkrete Erklärung; die eigene Antwort bleibt in `reportAnswers`, die gemeinsam gesicherten Aussagen in `violenceReportsAssessment`. Die Gefangenenentscheidung beeinflusst Schutzpflichten, das Mandat des Rates und den Gesprächsweg. Der Prediger spricht seinen zuvor erteilten Rat später wieder aus.

Luther ist in Freiheitsrückblick, Nächstenliebe, Ordnung, Aufruhrkritik, Gewissen und Folgenverantwortung präsent. Das fachlich geschlossene Nächstenliebe-Urteil hat eine begründete zweite Überlegung und danach eine gemeinsame Sicherung. Offene Entscheidungen, Religionsfunktionen, Luther-Spannung und Argumentgewichtung haben keine Musterlösung und keine sichtbaren Punktwerte. Nach der finalen Handlung folgen drei Phasen des Erlebens ohne neue Aufgabe. Erst anschließend wird der eigene Weg reflektiert.

Die Quellenbegriffe sind heutige Zusammenfassungen. Die drei Berichte und die Dorfszenen sind erfunden. Redaktionelle Einordnung liegt geschlossen im Quellenarchiv; Originalauszüge bleiben in den bestehenden freigeschalteten Dokumenten.

## Deterministische Ausgänge

Die fünf Ableitungsfunktionen in `data/chapter-five-state.js` sind unabhängig von der Oberfläche prüfbar. Kein Zufall, keine Gleichsetzung von Widerstand mit persönlichem Verlust. Beispielsweise kann Konrad bei begrenzter Verteidigung sicher zurückkehren; bei erfolgreichem Schutz des Dorfes kann sein eigener Aufenthaltsort trotzdem unbekannt bleiben.

| Größe | Ausgänge |
|---|---|
| Konrad | `safe`, `injured`, `captured`, `missing` |
| Verhandlung | `partial_agreement`, `open`, `collapsed` |
| Unbeteiligte | `many_protected`, `some_protected`, `high_exposure` |
| Dorfzustand | `violent_defeat`, `negotiation_collapsed`, `civilians_protected`, `community_fragmented`, `fragile_deescalation` |

Jeder Dorfzustand verwendet genau einen freigegebenen Nachwirkungs-Layer. Politische Vereinbarung, Schutz von Menschen und Konrads persönlicher Ausgang bleiben getrennt. Die Figuren berichten konkrete Folgen statt moralische Gesamtnoten.

## Speichern, Notizbuch, Testsprünge

Der vorhandene Spielstand bleibt abwärtskompatibel. Kapitel 5 ergänzt denselben Save; Entscheidungen werden bei jeder Handlung gespeichert. Konsequenzen werden aus kanonischen Entscheidungen neu berechnet und nicht mehrfach addiert. Das Profil zum Zeitpunkt der finalen Handlung bleibt eingefroren; eine spätere Reflexion kann eingetretene Folgen nicht rückwirkend ändern. Ungültige verschachtelte Daten werden begrenzt; ein Nachwirkungs-Save ohne finale Handlung führt zur Entscheidung zurück. Das Notizbuchregister „Mein Handeln“ zeigt Entscheidungen, Religionsfunktionen, Luther-Spannung, Streitargumente und konkrete Folgen.

Der normale Admin bietet drei Kapitel-5-Knoten. Alle 27 Szenen bleiben im Detailmodus erreichbar; ihre Voraussetzungen setzt ein zentraler Adapter. Der bestehende temporäre Teststand schützt weiterhin den normalen Schüler-Spielstand. JSON-Anzeige, Kopieren, Zurücksetzen und Abschließen sind angeschlossen. Das Debugfeld und `chapter6Handoff` erhalten die frühen Deutungen sowie sämtliche Kapitel-5-Urteile und Ausgänge. Kapitel 6 selbst ist weiterhin ein ausdrücklich gekennzeichneter Ausblick.

## Prüfnachweise

- `check-chapter-five.cjs`: zwölf vollständige Durchläufe, vier Hauptpfade bei 1024×768, 820×640 und 1440×900; tatsächliche Spielbedienung ab Kapitel-4-Abschluss, wiederholter Save/Reload, Notizbuch und Rückgriff des Predigers.
- `check-chapter-five-details.cjs`: sämtliche 27 Szenen bei drei Größen, alle Entscheidungsalternativen, Versorgung/Delegation/Gewaltgrenze, sämtliche 16 Haupt-Finalaktionen, fünf visuelle Endzustände, kompakter und detaillierter Admin, JSON und Schutz des normalen Saves.
- `check-chapter-five-state.cjs`: alle vier Konrad-, drei Verhandlungs-, drei Schutz- und fünf Dorf-Ausgänge; widersprüchliche Daten, wiederholte Berechnung, zwölf zentrale Admin-Voraussetzungen und Rücksetzung.
- `check-chapter-five-responsive.cjs`: vier große Lernflächen zusätzlich bei 820×640 im Debugmodus mit Testleiste; keine überlaufenden Schreibfelder oder horizontalen Scrollbars, Tastaturwahl und erhaltener Fokus.
- Bestehende Kapitel-, Save-, Konsequenz-, Lernführungs-, Quellen-, Figuren-, Hotspot-, Responsive-, Admin- und Originalasset-Prüfungen für Kapitel 1–4. Die vier bestehenden vollständigen Neuspielrouten durch Kapitel 1–4 sind weiter spielbar.
- Bestehende Kapitel-5-Assetprüfung: 160 freigegebene Kompositionen einschließlich Tablet-Hochformat. Paketprüfung kontrolliert Originalbytes und Manifestzuordnung.

Laufberichte und Screenshots liegen lokal unter `artifacts/chapter5/`; sie sind keine Runtime-Assets. Die ausgewählten Aufnahmen zeigen alle Eingangswelten, Wagen, Berichte, Gefangenenentscheidung, Luther-Arbeitsfläche, herannahende Truppen und die fünf Nachwirkungen. Bühnen werden proportional in die freie Fläche über dem Dialog eingepasst; Figuren, Hände und Füße bleiben sichtbar. Kleine Lernansichten werden durch kürzere Übersichtstexte entlastet, ohne die vollständigen Aussagen oder die 18-Pixel-Schrift zu verkleinern.

Die Tests emulieren Tabletansichten und Touch in Edge/Chromium auf Windows. Ein physisches iPad mit Safari und die Unterrichtsdauer von 30–40 Minuten sind damit nicht empirisch geprüft. Eine Lerngruppen-Erprobung bleibt für die zeitliche Einordnung notwendig.

## Fachliche Referenzen

- Luther, *Von der Freiheit eines Christenmenschen* (1520), [Taylor Editions, Universität Oxford](https://editions.mml.ox.ac.uk/editions/freiheit-1520/).
- [Quellentext der Freiheitsschrift, Fordham University](https://sourcebooks.web.fordham.edu/source/luther-freiheit.asp), insbesondere Freiheit, Dienst und der Abschluss über Christus und den Nächsten.
- Bereits integrierte Originalauszüge und Nachweise zu weltlicher Obrigkeit, Friedensermahnung und der schärferen Schrift im Kapitel-4-Archiv.
- [Landesarchiv Baden-Württemberg: Weingartener Vertrag](https://www.leo-bw.de/fr/web/guest/themenmodul/bauernkrieg/vertraege/weingartener-vertrag), Gespräch, Rückkehr zum Gehorsam, Schiedsgerichte und unterschiedliche Reaktionen. Die Kapitel-5-Teilvereinbarung ist eine erfundene Dorfsituation und keine behauptete Bestimmung dieses Vertrags.
