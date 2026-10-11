# Theologisches Dossier: lokaler PDF-Export

## Architektur und Zugang

`gameState → buildTheologicalDossier(state, options) → neutrales Report-Modell → buildDossierDocument(report, format) → generateTheologicalDossierPdf(report, format) → Blob-Download`.

- `js/dossier-model.js` ordnet ausschließlich gespeicherte Entscheidungen zu und enthält die gemeinsame fachliche Sicherung. Keine DOM- oder Layoutlogik.
- `js/dossier-pdf.js` setzt das Modell in durchsuchbaren Text, Vektornetzwerk und Tabellen um. Derselbe Renderer bietet `full` und `summary`.
- `js/dossier-export.js` verwaltet nur das vorübergehende Formular, Lade-/Fehlermeldungen und den lokalen Downloadlink. Beim Schließen werden Blob-URLs freigegeben; geschlossene Erzeugungsvorgänge lösen keine späteren Downloads aus.
- `js/epilogue.js` zeigt „Ergebnisse sichern“ ausschließlich im fertigen Schlussbild. Der bestehende Abschluss und die sieben Sekunden des letzten Epilogbilds bleiben Voraussetzung. Auch direkt ausgelöste Exportaktionen prüfen diese Voraussetzung.

Kein neuer Save-Schlüssel, keine Änderung von Story, Bewertungen, Quellenwortlaut oder Fortschrittslogik. Wiederholter Export und Epilogwiederholung bleiben lesend.

## Report-Modell und State-Mapping

| Modell | Verwendete gespeicherte Felder |
| --- | --- |
| `meta` | lokales Exportdatum, optionale vorübergehende Formulareingaben Name/Kurs |
| `guidingQuestion` | `chapter5.openTheologicalQuestion`, alternativ `chapter6.openingQuestion`; vorhandene fünf fachliche Fragen |
| `theologicalFoundations` | gemeinsame fachliche Sicherung zu Rechtfertigung/Freiheit, Nächstenliebe, Obrigkeit, Gewissen und Widerstand |
| `decisionsAsCases` | `choices.forestResponse`, `choices.duesResponse`; `chapter3.printStrategy`, `resistanceStrategy` (alternativ religiöse Deutung bei fehlender Veröffentlichung); `chapter4.weingartenResponse`; `chapter5.prisonerDecision`, `finalAction` |
| Folgen | vorhandene unmittelbare Dialogreaktionen; vorhandene Veröffentlichungseffekte; dokumentierte Konrad-, Verhandlungs-, Zivilisten- und Weltzustände aus Kapitel 5 |
| `theologicalNetwork` | ausschließlich `chapter6.theologicalNetwork.links`, `selectedExplanations`, `networkExplanations` |
| `lutherComparison` | gemeinsame Gegenüberstellung; `lutherContinuityJudgment`, `lutherContinuityReasoning`, `lutherCounterArgument` |
| `lutherMuentzer` | unveränderte Kapitel-6-Vergleichstabelle; `lutherMuentzerJudgment.moreWeightyRisk` |
| `evidence` | ausschließlich gültige Einträge aus `chapter6.selectedEvidence`; vorhandene Belegkatalog-Kernaussagen |
| `judgment` | `finalPosition`, `judgmentDimensions`, `dimensionReasoning`, `selectedEvidence`, `counterArgument`, `finalJudgmentText` |
| `freedomDefinition` | `choices.initialFreedomInterpretation` bzw. vorhandenes `freedomThen`; `finalFreedomDefinition` |
| `keyInsights`, `sources` | gemeinsame Fachsicherung und vorhandene Quellenmetadaten aus Kapitel 4 und Epilog |

Die Auswahl umfasst bei vollständigen Testständen sieben wichtige Konfliktentscheidungen, keine Klickhistorie. Unmittelbare Antworten werden ausdrücklich als „Rückmeldung in der Simulation“ kenntlich gemacht. Der Schlussverlauf ist als dokumentierter Simulationsverlauf bezeichnet, nicht als alleinige Wirkung der letzten Handlung. Die Gefangenenfolge beim Verhandlungspfand entspricht der bestehenden Spielauswertung. Fehlende Entscheidungen werden nicht ergänzt.

Eigene Texte bleiben im Modell exakt erhalten, einschließlich Absätzen, typografischen Anführungszeichen und Gedankenstrichen. Der Renderer übernimmt sie ohne sprachliche Bearbeitung, Kürzung, Bewertung oder automatisches Feedback. Die Darstellung kann durch Zeilen- und Seitenumbrüche technisch abweichen. Gemeinsame Fachtexte sind kein angeblich persönliches Ergebnis. Nicht eingeführte lateinische Fachbegriffe werden nicht ergänzt.

## PDF-Struktur und Gestaltung

A4 hoch, 54 pt Seitenränder, 48/52 pt oben/unten. Eingebettete Source Serif 4, 11 pt Fließtext, 10,5 pt bibliographische Nachweise, 9 pt Footer; dunkle Schrift, weiße Seiten, sehr helle Tabellenköpfe und feine Linien. Alle Informationen bleiben in Graustufen erkennbar. Tabellen wiederholen ihre Kopfzeile und brechen einzelne Zeilen nicht auf; lange persönliche Texte fließen auf weitere Seiten. Überschriften werden gegen verwaiste Platzierung geprüft.

Das vollständige Dossier hat in allen vier geprüften vollständigen Berichten neun Seiten:

1. Titel, Datum, Leitfrage und Vertiefungsschwerpunkt.
2. Theologische Bezugspunkte.
3. Handlungsentscheidungen als ausdrücklich bezeichnetes Fallmaterial.
4. Gespeichertes Vektornetzwerk mit eigenen Begründungen und Luthervergleich 1520/1525.
5. Vollständiger Luther/Müntzer-Vergleich und persönliche Gewichtung.
6. Tatsächlich ausgewählte Argumentationsgrundlage, Typ, Kernaussage, Bedeutung.
7. Gesamturteil, Prüfdimensionen, eigene Begründungen und Einwand.
8. Ausgangsdeutung und Freiheitsdefinition, elf gemeinsame Fachresultate, sechs Materialnachweise.
9. Reduzierte Schlussseite „Was heißt frei?“ mit unveränderter Freiheitsdefinition.

Die Kurzfassung hat in diesen vier Berichten drei Seiten: Leitfrage/Grundlagen/Bauernbewegung; Luther 1520/1525 und kompakter Luther/Müntzer-Vergleich (vier unveränderte Vergleichsaspekte); eigene Einordnung, ausgewählte Belege, Einwand und Freiheitsdefinition. Eigene Texte werden auch hier nicht zusammengefasst. Die ausführliche Bibelrubrik des Müntzervergleichs bleibt im Dossier.

Längere Texte dürfen den Zielumfang überschreiten. Der Langtexttest mit rund 1500 Zeichen Gesamturteil, längerem Einwand und sehr langer Freiheitsdefinition ergibt elf bzw. vier Seiten. Ein leerer älterer Bericht enthält nur gemeinsame Inhalte; seine Kurzfassung hat zwei Seiten. Leere persönliche Abschnitte erzeugen keine großen Leerfelder.

Metadaten: Dokumenttitel nach Format, Subject „Christliche Freiheit, Obrigkeit, Widerstand und Verantwortung“, Creator „1525 – Zwischen Freiheit und Aufruhr“, kein personenbezogener Author. Footer enthält Titel und Seitenzahl, keine Personalangaben.

## Bibliothek, Schriften und Rechte

Keine vorhandene PDF-Abhängigkeit gefunden. Mitgeliefert und erst beim Export geladen:

- pdfmake 0.3.11, MIT: `assets/vendor/pdfmake/pdfmake.min.js` und `LICENSE`. Bezugsquelle: https://unpkg.com/pdfmake@0.3.11/build/pdfmake.min.js ; https://github.com/bpampuch/pdfmake/releases/tag/0.3.11 . Browser-API: https://pdfmake.github.io/docs/0.3/getting-started/client-side/methods/ .
- Adobe Source Serif 4 Regular/Bold, SIL OFL 1.1: `assets/vendor/source-serif/`, inklusive Lizenz. Bezugsquelle: https://github.com/adobe-fonts/source-serif/tree/release/TTF . Die eingebetteten Dateien sind feste lokale Kopien, keine Laufzeit-CDN-Abhängigkeit.

Gesamtgröße der Bibliothek und beiden Schriften ca. 1,59 MB unkomprimiert. Die Fontdateien werden lokal in das virtuelle Dateisystem geladen. Externe URL-Zugriffe der PDF-Bibliothek sind gesperrt. Die bibliographischen Links sind PDF-Linkannotationen; bei der Erstellung werden ihre Ziele nicht abgerufen.

Keine historischen Abbildungen eingebettet, keine Bildrechteübernahme notwendig. Die PDF nennt vorhandene Text-/Katalognachweise: Freiheitsschrift 1520, Obrigkeitsschrift 1523, Zwölf Artikel 1525, Ermahnung zum Frieden 1525, schärfere Bauernkriegsschrift 1525 und Müntzers Schutzrede 1524. Historische Quellen, heutige Zusammenfassungen, theologische Positionen und Simulationsfälle werden unterschieden.

## Datenschutz und Fallbacks

Alle Erzeugungsschritte laufen auf dem Gerät. Keine KI, Uploads, externe PDF-Dienste, Inhalts-Telemetrie oder personenbezogene Requests. Name/Kurs sind freiwillig, nur im offenen Formular und in der erzeugten PDF vorhanden; sie gelangen weder in `state` noch in Save, Footer oder Author-Metadaten. Der Browser lädt nur statische Projektdateien. Der vorhandene Spielstand bleibt unverändert.

Bei fehlenden älteren Feldern entfallen persönliche Abschnitte. Unbekannte Belege/Entscheidungen und ungültige Netzwerkverbindungen werden nicht exportiert. Quellen und gemeinsame Sicherung bleiben nutzbar. Ein Erzeugungsfehler zeigt „Das PDF konnte nicht erstellt werden. Deine Ergebnisse sind weiterhin gespeichert.“ und „Erneut versuchen“. Nach dem automatischen Download bleibt zusätzlich ein expliziter Downloadlink für Browser mit abweichender Downloadbehandlung sichtbar. Die Schlussseite bleibt erhalten.

## Tests und Abnahme

- `scripts/check-dossier.cjs`: selbstständige Testfixtures in `scripts/fixtures/dossier-routes.json`, aus den vier bereits durchgespielten Kapitel-1–5-Routen. Kapitel-3-Felder sind aus den tatsächlich gespeicherten Auswahl-IDs rekonstruiert; Kapitel-6-Freitexte sind ausdrücklich künstliche Testantworten. Vier verschiedene persönliche Reports/PDF-Paare, keine erfundenen Entscheidungen, unveränderte Texte, State-Unveränderlichkeit, belegte Folgen, ungültige/alte Daten, alle acht Netzwerkknoten, lange Absätze und deutsche Sonderzeichen.
- Tatsächliche Edge-Downloads bei 1024×768, 820×640 und 1440×900. Kein früher Zugang, keine horizontale Seiten-Scrollbar, alle Schlussbuttons mindestens 44 px und erreichbar. Optionales Formular, Fehler und erneuter erfolgreicher Download geprüft. Requestkontrolle: ausschließlich lokale GETs, kein Personenname in Requests.
- WebKit 26.5 mit Touch-/Mobilkontext: beide Downloads, 1024×768 und 820×640, unveränderter State. Kein physischer iPad-/Safari-Gerätetest.
- `scripts/check-dossier-pdf.py`: A4, Druckränder, keine leeren Seiten oder verwaisten Überschriften, Unicode-Textausgabe, exakte persönliche Texte nach Entfernung der Seitenfooter/technischer Zeilenumbrüche, unpersönliche Metadaten. Graustufenraster aller relevanten Seiten; visuell geprüft: Titel, Fachsicherung, Fälle, Netzwerk, Luthervergleich, Müntzervergleich, Belege, Gesamturteil und Schlussseite, auch Langtext und Teil-Save.
- Bestehende Kapitel-6-Prüfung: 114 Ansichten, vier vollständige Wege, Save/Reload, Notizbuch, normaler Abschluss.
- Bestehende Epilogprüfung: 57 Ansichten, Laufzeit, Pause, Save/Reload, sieben Sekunden Schlussbild, unveränderter Replay, Quellen und Fallbacks.
- Bestehende Kapitel-6-, Kapitel-5-, Story-Recap- und Epilog-State-Tests bestanden.
- Bestehende Admin-Prüfung bestanden: sämtliche Sprungziele, 5-Sekunden-Hold, getrennte Teststände, JSON, Reset, Reload, Debug und Tabletansichten.

Testausgaben unter `artifacts/dossier/` sind ignoriert und werden nicht veröffentlicht. Ausführung: Node mit vorhandener Playwright-Installation für `check-dossier.cjs`; Python mit pypdf, pdfplumber, pypdfium2 und Pillow für `check-dossier-pdf.py`.

Bekannte Grenzen: keine Garantie eines festen Seitenumfangs bei langen Freitexten oder vielen Belegen; keine automatisierte inhaltliche Bewertung; keine Behauptung eines echten iPad-Tests. Source Serif deckt die geprüften deutschen/lateinischen Zeichen ab; ein beliebiges Emoji- oder außereuropäisches Schriftsystem ist nicht zugesichert. Das PDF besteht aus auswählbarem Text und Vektoren, hat aber keine zugesicherte PDF/UA-Zertifizierung.
