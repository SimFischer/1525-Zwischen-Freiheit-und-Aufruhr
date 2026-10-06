# Kapitel 5 – Asset-QA

Geprüft am 6. Oktober 2026. Assetproduktion mit separatem QA-Prototyp; noch keine Kapitel 5-Runtime-Integration.

## Automatische Prüfung

32 Testfälle in jeder der fünf Ansichten:1024×768,820×640,1440×900,768×1024 und1024×1366. Insgesamt160 bestandene Testfälle. Enthalten sind alle zehn Hintergrundplatten, sämtliche sechzehn Zustandslayer, die gemeinsam dargestellten Kirchhofgruppen und alle vier Arbeitsflächen. Bühnen wurden zusätzlich mit sichtbarem Pergamentdialog gerendert.

- Canon-Dateien anhand der gespeicherten SHA-256-Werte unverändert geprüft.
- Bilder vollständig geladen, keine Browserfehler oder fehlenden Ressourcen.
- Körper-Bounds und native Bildproportionen; Köpfe/Füße innerhalb der Szene, vollständige Hauptkörper oberhalb des Dialogs.
- Hotspots gegen Hauptkörper geprüft: keine Überdeckung, mindestens 44px, PNG-Materialien aus dem gemeinsamen System.
- Keine horizontalen Scrollbars. UI-Testtext mindestens 18px; vollständige realistische Textmenge passt in die vorgesehenen Felder, auch die drei längeren Berichte.
- Auswahl von zwei Religionsfunktionen plus einem getrennten Risiko mit Touch geprüft. Dies ist ausschließlich ein QA-Zustand, keine neue Spielauswertung.
- Pflichtdateien, Abmessungen, Alpha, sichtbare Overlay-Safe-Area, Manifest-Hashes und ZIP-Dateigleichheit werden durch die Paketprüfung kontrolliert.

## Visuelle Prüfung

Die zehn Raumplatten wurden einzeln angesehen. Originalfiguren wurden probeweise in die Bühnen gesetzt, anschließend die Layer in der passenden Tiefe registriert. Größenvergleich, Bodenberührung, Licht und Möbel wurden anhand der Kompositionen geprüft. Morgenlager48%, Straßen42%, Wagenbucht36%, Innenräume/Kirchhof/Hof/Dorf41% Körperhöhe auf primärer Fußlinie71%.

Das Morgenlager wirkt improvisiert und enthält keine Heldenformation. Verhandlung und Abendberatung unterscheiden sich sichtbar in Raumordnung, Licht und Arbeitsgegenständen. Kirchhofgruppen erhalten dieselbe gedeckte Palette und ruhige, ernsthafte Körpersprache. Eine Perspektive ist nicht als moralisch helle, die andere nicht als dunkle Seite markiert.

Bibel und lose Textstapel sind unterscheidbar. Luther bleibt an leere Manuskript-/Buchfelder und den vorhandenen Quellenrenderer anschließbar. Keine erfundenen langen Bildzitate. Verletzung bleibt als gestützte Person ohne Blutdarstellung sichtbar. Keine Leichen, Foltergeräte, Schlachtästhetik oder triumphale Nachwirkung.

Fünf Konsequenzlayer stehen alternativ über derselben vertrauten Dorfarchitektur. Schäden und Versorgung bleiben klein und am Rand; die Bühne wird nicht zur Ruinenlandschaft. Der Guard im Verhandlungsabbruch ist eine gewöhnliche Person; eine versehentlich erzeugte zusätzliche Tür wurde entfernt. Im Ruhe-Zustand ist das Banner niedergelegt.

Die hellen Schreibflächen und dunkle Serifenschrift wurden mit vollständigen HTML-Beispielen visuell geprüft. Die drei Berichte nutzen eine große Dokumentansicht, statt in einem kleinen Aufgabenpanel nochmals verkleinert zu werden. Gegenüber der ersten Testfassung wurden Schreibzonen und verfügbare Lesefläche erweitert; kein Text wurde für die Abnahme gekürzt.

## Nachweise

`assets/chapter5/qa/results.json` enthält alle 160 bestandenen Kombinationen. Unter `qa/screenshots/` liegen20 ausgewählte1024×768-Nachweise: jede Bühne, alle Arbeitsflächen, beide Kirchhofgruppen und die fünf Nachwirkungen. Die Kontaktbögen `four-paths.png`, `all-stages.png` und `aftermath.png` zeigen die Unterschiede nebeneinander. Vollständige lokale Browseraufnahmen aller Ansichten liegen in `artifacts/ch5/browser/`.

Prüfseite: `assets/chapter5/qa/preview.html`; Test: `scripts/check-chapter-five-assets.cjs`. Alle Kompositionen ausschließlich QA, niemals finale Runtime-Hintergründe.

## Reichweite der Abnahme

Die Browserprüfung verwendet Edge/Chromium mit Touch und emulierten Tabletansichten auf Windows. Eine Prüfung auf einem physischen iPad in Safari ist damit nicht ersetzt. Die finale Runtime muss mit den verbindlichen Registrierungen integriert und anschließend samt Quellen, Aufgaben, Saves und endgültigen Fachtexten erneut geprüft werden. Bestehende Kapitel 1–4 und Speicherlogik wurden in dieser Assetrunde nicht verändert.

Die Beispielberichte sind redaktionell erfunden; theologische Kurztexte sind Zusammenfassungen. Sie sind ausdrücklich keine historischen Quellenzitate und keine bereits freigegebene Kapitelstory.
