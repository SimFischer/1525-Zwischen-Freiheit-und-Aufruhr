# Kapitel 6 · Was bleibt von Freiheit?

Implementierung vom 10. Oktober 2026 auf main. Kapitel 6 ist die theologische Auswertung der abgeschlossenen Geschichte. Es gibt keine neue Handlung, dauerhaften Story-NPCs, Orientierungsgewinne, Musterposition, Punktanzeige, Backend- oder API-Abhängigkeit.

## Dramaturgie und Phasen

Der bestehende Kapitel-5-Perspektivwechsel bleibt als kompatibler Checkpoint `ch5_chapter6` bestehen. Seine dominante Fortsetzungsaktion öffnet `ch6_reflection_entry`. Neue und alte Spielstände behalten ihre Szenen-IDs.

38 nachvollziehbare Leseschritte verteilen die 13 verlangten Hauptphasen:

1. Fast leerer Reflexionsraum mit persönlichem Notizbuch und der tatsächlich gewählten offenen Frage.
2. Quellen, Erinnerungen und Gegenpositionen liegen auf dem Tisch.
3. Freiheit zu Beginn / heute: vier aufeinanderfolgende Schreibseiten zu Gottesbeziehung, Nächsten, ungerechter Ordnung und Handlungsgrenzen.
4. Begriffsnetz: acht Begriffe, eigene Tintenverbindungen, zwei ausgewählte und schriftlich begründete Beziehungen.
5. Luther 1520 / 1525: heutige Zusammenfassungen und Originalausschnitte auf getrennten Leseseiten.
6. Kontinuität, Spannung, Widerspruch oder eigene Deutung; anschließend Begründung und verpflichtender Einwand.
7. Vier dynamische Erinnerungen; mindestens eine stützende und eine andere herausfordernde Erfahrung.
8. Luther / Müntzer: fünf gleichwertige Vergleichsseiten zu Gottes Wirken, Obrigkeit, Bibel, Widerstand und Gefahr. Anschließend drei offene Risikoeinschätzungen.
9. Reduzierter Urteilstisch; theologische, historische und ethische Prüfdimensionen werden einzeln positioniert und begründet.
10. Fünf gleichberechtigte Gesamtpositionen; mindestens drei Belege aus Quellen, theologischen Zusammenhängen oder Spielweg.
11. Verpflichtender Gegenbeleg/Einwand, eigenes schriftliches Urteil und offene Strukturprüfung.
12. Persönliche Abschlussausarbeitung als nacheinander lesbare volle Manuskriptseiten.
13. Schlussbuch mit früherer Deutung und eigener finaler Freiheitsdefinition; danach ruhige Schlussseite.

## State und offene Urteilsbildung

`chapter6` ergänzt die bestehende State- und Save-Architektur. Keine neue State-Engine oder Frameworkmigration. Die verlangten Felder sind implementiert: openingQuestion, freedomThen, freedomNow, theologicalNetwork, lutherContinuityJudgment, lutherContinuityReasoning, lutherCounterArgument, memoryEvidence, lutherMuentzerJudgment, judgmentDimensions, finalPosition, selectedEvidence, counterArgument, finalJudgmentText, finalFreedomDefinition und completed. Ergänzend werden die Begründungen der Prüfdimensionen, Netzbegründungen und Leseseiten gespeichert.

`initializeChapterSix` liest die echte `chapter5.openTheologicalQuestion`, ersatzweise den vorhandenen Handoff. Die fünf IDs bleiben unverändert. Fehlende alte Antworten werden nicht erfunden. Die frühe Freiheit wird gegen die kanonische Kapitel-1-Auswahl geprüft.

Das Begriffsnetz verlangt keine vorgegebene Topologie. Zwei Begriffe werden nacheinander gewählt; eine erneute Verbindung entfernt die Linie. Aus dem eigenen Netz werden zwei Beziehungen ausgewählt. Jede erhält eine eigene Begründung; beide bleiben über Reload erhalten. Die App setzt keine theologische Musterlösung voraus.

Die Kontinuitätsdeutung verlangt schriftliche Begründung und Gegenargument. Alle fünf Gesamtpositionen funktionieren gleich. Das spätere Urteil setzt mindestens drei Belege, einen Einwand und die drei begründeten Prüfdimensionen voraus. Kurze Mindestlängen verhindern leere Felder; sie bewerten keine inhaltliche Qualität. Die Strukturprüfung sagt ausdrücklich, dass vollständig ausgefüllte Felder noch kein tragfähiges Urteil garantieren. Freitexte werden weder semantisch benotet noch als richtig/falsch klassifiziert.

Historische Erklärung und ethische Rechtfertigung werden ausdrücklich getrennt. Müntzer wird als eigenständige reformatorische Gegenposition behandelt, ohne Duellinszenierung oder Fanatiker-Karikatur. Keine Gesamtposition verändert Orientierung oder Wahrnehmungen.

## Personalisierung und Quellenebenen

Die Erinnerungen verwenden `buildStoryRecap` und denselben Figuren-/Layer-Renderer wie Kapitel 5. Sie rekonstruieren Wald/Abgaben, Druck/Forderungen, Ordnung/Widerstand sowie Handeln/Folgen. Reale alte Entscheidungen stammen aus kanonischen States; fehlende Vorgeschichten führen zu allgemeinen Erinnerungen.

Frühere Gedanken werden gezielt über eine optionale Lesefläche eingeblendet, maximal zwei pro Abruf: Kapitel-3-Religionsdeutung und Widerstandsstrategie, Kapitel-4-Theologie, Weingarten, frühes/späteres Lutherurteil und Risiko sowie Kapitel-5-Religionsfunktion, Luther-Spannung und internes Argument. Der Folgenrückblick verwendet die gespeicherten Konrad-, Verhandlungs-, Zivil- und Weltzustände.

Historische Quellen, heutige Zusammenfassungen und Erfahrungen aus dem Spielweg sind ausdrücklich unterschieden. Die eigene Erfahrung ist Reflexionsmaterial, kein historischer Beweis über Luther. Es wird keine Wirkung der Spielerentscheidung auf Luthers historische Position behauptet.

Die großen Quellen bleiben über den bestehenden Quellenrenderer zugänglich. Fachliche Grundlage: bestehende Kapitel-4-Quellendaten, [Freiheitsschrift/Oxford](https://editions.mml.ox.ac.uk/editions/freiheit-1520/), [Schärfere Schrift/Luthergedenkstätten](https://www.luthermuseen.de/en/node/889), [Von weltlicher Obrigkeit](https://www.luther2017.de/martin-luther/texte-quellen/lutherschrift-von-weltlicher-obrigkeit-wie-weit-man-ihr-gehorsam-schuldig-sei/index.html) und [Müntzers Fürstenpredigt/DHI](https://germanhistorydocs.org/de/von-den-reformationen-bis-zum-dreissigjaehrigen-krieg-1500-1648/ghdi:document-4270). Originalausschnitte und Kürzungen sind kenntlich. Die Quellen bleiben ohne Netzverbindung lesbar; externe Links dienen nur der optionalen Vertiefung.

## Work-Assets und Bedienung

Alle Rollen werden über die tatsächlichen `path`-Werte des vorhandenen Manifests aufgelöst. Die zwölf produzierten PNGs und zwölf Rollenalias bleiben unverändert. `data/chapter-six-assets.js` ist die statische Manifestübernahme für die Runtime; Staging verwendet Alpha-Bounds, Tischprojektionen, Netzwerkanker, Bildfenster und Text-Safe-Areas.

Verwendet: Reflexionsraum, Schlussraum, geschlossenes Notizbuch, neutrale Mappen, Bibel und Quellenprops; Doppelbuch, Netzwerkfläche, Deutungsblätter, Erinnerungschronik, fünf Positionsstreifen und Manuskriptfläche. Offene Mappen sind vorhandene Betrachtungsvarianten, keine dauerhaft nötigen Zusatzprops. Kein QA-Screenshot wird als Produktionsasset geladen. Keine neuen Illustrationen oder Work-Ersatzaufträge sind nötig.

Raum und Arbeitsflächen bleiben proportional 4:3. Die Erinnerungskompositionen werden vollständig in ihre Bildfenster eingepasst. Die Marker verwenden `hotspot()` und dieselben originalen PNG-Rahmen wie Kapitel 1–5; Material-CSS bleibt zentral. Keine parallele Hotspot-Sprache.

Lesetext mindestens 18px. Große Aufgaben werden auf Folgeseiten verteilt. Es gibt keine ineinander verschachtelten Lesescrollcontainer. Längere eigene Eingaben können innerhalb ihres einzigen Schreibfelds gelesen werden; lange Abschlussausarbeitungen erscheinen auf aufeinanderfolgenden vollständigen Seiten. Navigation bleibt außerhalb der Bildfläche. Die Titelzeile erklärt das Begriffsnetz, statt dunkle Schrift auf den dunklen Bildrand zu setzen.

## Speicherung, Notizbuch, Admin

Jedes Input-Ereignis speichert synchron über das bestehende Save-System. Damit gibt es keine noch ausstehende Debounce-Eingabe bei Reload oder Overlaywechsel. Texte werden unverändert gespeichert und bei Anzeige HTML-escaped. Netzwerk, Auswahlen, Szene und Leseseite werden ebenfalls gespeichert. Sanitizing entfernt ungültige IDs, doppelte/ungültige Netzverbindungen und widersprüchliche Belegzuordnungen.

`completed` wird im normalen Ablauf erst beim Erreichen der Schlussseite gesetzt, nachdem finales Urteil und finale Freiheitsdefinition gespeichert wurden. Das Notizbuch enthält die Rückschau und öffnet die persistierte Abschlussausarbeitung erneut. Die Leseansicht ändert weder das Urteil noch Konsequenzen oder den normalen Save.

Der kompakte Admin erhält drei Hauptziele: Einstieg, Luther/Müntzer, finales Urteil. Detailed Debug bietet alle 38 Phasen und den vollständigen Kapitel-6-State. Die zentrale Kapitelregistry bereitet frühere Kapitel und plausible Testantworten vor. Diese Antworten sind ausschließlich Testfixtures im separaten Testmodus. Kapitelreset setzt nur die aktuelle Rückschau zurück, ohne den vorherigen Storyweg zu löschen.

## Prüfung und Grenzen

`check-chapter-six.cjs`: 114 Szenen-/Viewportprüfungen mit Screenshots, bei 1024×768, 820×640 und 1440×900; vier vollständige personalisierte Durchläufe aus realen Kapitel-1–5-Vorgeschichten; fünf offene Fragen; alle fünf Gesamtpositionen; Freitext-Reloads bei Freiheitsvergleich, Deutung, Gegenargument, Urteil und Freiheitsdefinition; Notizbuch-Leseansicht mit unverändertem Save; alte Saves; keine fehlenden Bilder oder Browserfehler.

`check-chapter-six-state.cjs`: offene Fragen, neutrale Positionen, notwendige Voraussetzungen, ungültige States, alte Saves und wörtliche Freitextpersistenz. Bestehende Kapitel-5-State-, Rückblick-State-, Admin- und vollständige Kapitel-1–5-Neuspieltests sichern den Anschluss und die Save-Isolation.

Screenshots und Testergebnisse liegen lokal unter `artifacts/chapter6/`. Die Bildprüfung führte zur Korrektur der Bühnenhöhe sowie zur Aufteilung dichter Original-/Belegseiten. Edge/Chromium und Touch-Emulation sind geprüft; physisches iPad/Safari und Unterrichtserprobung sind weiterhin gesonderte Abnahmen. Die App ersetzt keine fachliche Rückmeldung der Lehrkraft zu frei formulierten Urteilen.
