# Kapitel 5 – Staging-Guide

Assetproduktion für „Du musst handeln“. Zielgeräte: iPads in Quer- und Hochformat sowie größere Bildschirme. Die Szenen-IDs sind Integrationsvorschläge, keine neue verbindliche Storyreihenfolge.

## Gemeinsame Bühne

Alle Hintergrundplatten und Overlays haben 1024×768 Pixel. Kamera und Raumbühne werden proportional dargestellt, nicht beschnitten. Untere26% bleiben Dialog-Safe-Area. Alle Maßangaben unten sind Prozent der Raumplatte; Figurenhöhen beziehen sich auf den sichtbaren Körper innerhalb der gemessenen Canon-Bounds, nicht auf die PNG-Leinwand.

Vollständige Canon-Körper stehen auf derselben primären Fußlinie und erhalten denselben Körpermaßstab pro Raum. Linke Randfigur blickt rechts, rechte Randfigur links; mittlere Figuren zum gemeinsamen Gespräch. Spiegelung ausschließlich im Renderer, Originaldateien unverändert. Keine neuen Posen erforderlich.

Die gemessene Raumwirkung hat unterschiedliche Profile ergeben: das offene Morgenlager mit48% Körperhöhe, Straßen mit42%, die Wagenbucht mit36%, die übrigen Bühnen mit41%. Kein pauschaler Maßstab anhand der Dateigröße. Die Profile wurden mit den Originalfiguren probeweise eingesetzt und visuell geprüft.

## Verbindliche Registrierung transparenter Layer

Die PNGs enthalten transparente Leinwandränder. Ihre Ausgabegröße allein ist KEIN Positionierungsvertrag. Jede registrierte Ergänzung benötigt die Werte `scale`, `left`, `top` aus `preferredStaging` im Manifest. `left`/`top` beziehen sich auf die gesamte Szene, `width=height=scale*100%`, Ursprung oben links. Kein Zuschnitt, keine Verzerrung, keine zusätzliche automatische Zentrierung. Die QA-Vorschau zeigt diese Registrierung verbindlich.

Gruppen werden nach Körperhöhe UND Bodenebene auf eine gemeinsame Perspektive gesetzt. Die Registrierungen korrigieren keine Gesichter oder Kleidung. Originalalpha einschließlich sehr schwacher Randpixel bleibt erhalten; `visibleAlphaBounds` nutzt die Schwelle16/255 für den tatsächlichen Objektbereich. Die untere Safe-Area enthält keine relevanten sichtbaren Objekte.

| Overlay | Maßstab | Links | Oben | Verwendung |
|---|---:|---:|---:|---|
| `after_deescalation` | 1 | 0% | -9% | registrierte Ergänzung, separat vom Canon |
| `after_defeat` | 1 | 0% | -10% | registrierte Ergänzung, separat vom Canon |
| `after_fragmentation` | 1 | 0% | -6% | registrierte Ergänzung, separat vom Canon |
| `after_negotiation_collapse` | 1 | 0% | -3% | registrierte Ergänzung, separat vom Canon |
| `after_protection` | 1 | 0% | 0% | registrierte Ergänzung, separat vom Canon |
| `armed_tension` | 0.510111 | 1.8127% | 19.9594% | registrierte Ergänzung, separat vom Canon |
| `camp_departure` | 0.601043 | 34.3391% | 16.2609% | registrierte Ergänzung, separat vom Canon |
| `camp_supply` | 0.401569 | 3.6863% | 26.0131% | registrierte Ergänzung, separat vom Canon |
| `delegation_inside` | 0.192948 | 44.9852% | 29.9659% | registrierte Ergänzung, separat vom Canon |
| `distant_troops` | 0.363243 | 50.5752% | 20.3311% | registrierte Ergänzung, separat vom Canon |
| `group_retreat` | 0.379929 | 58.4717% | 23.2261% | registrierte Ergänzung, separat vom Canon |
| `justice_group` | 0.445935 | 50.3105% | 21.0387% | registrierte Ergänzung, separat vom Canon |
| `negotiation_broken` | 0.30797 | 39.5865% | 24.2356% | registrierte Ergänzung, separat vom Canon |
| `order_group` | 0.406588 | 8.461% | 27.2824% | registrierte Ergänzung, separat vom Canon |
| `people_evacuating` | 0.527634 | 1.9781% | 20.916% | registrierte Ergänzung, separat vom Canon |
| `wounded_return` | 0.554513 | 1.796% | 24.3971% | registrierte Ergänzung, separat vom Canon |

## Szenen

### ch5_peasant_camp_morning

Konrad, Matthes und Bauernmitglied organisieren Versorgung

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_peasant_camp_morning.png`; Pfad A.

- Horizont/Augenebene: etwa 27%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe48%. Maximal3 Hauptfiguren.

- Figuren:

  - konrad: x29%, Höhe48%, Füße71%; Blick right; CSS-Spiegelung ja.

  - matthes: x52%, Höhe48%, Füße71%; Blick left; CSS-Spiegelung nein.

  - band1: x75%, Höhe48%, Füße71%; Blick left; CSS-Spiegelung ja.

- Tiefen: vorne71%/48%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: `food_supplies`, `tools_weapons_bundle`. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `camp_supply`, `armed_tension`.

- Hotspot: vorhandenes `object`-Material aus `js/hotspots.js`, x52%/y16%, Beschriftung „Vorräte ansehen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_road_with_peasant_band

Abordnung oder Aufbruch auf der Straße

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_road_with_peasant_band.png`; Pfad A.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe42%. Maximal2 Hauptfiguren.

- Figuren:

  - konrad: x30%, Höhe42%, Füße71%; Blick right; CSS-Spiegelung ja.

  - matthes: x65%, Höhe42%, Füße71%; Blick left; CSS-Spiegelung nein.

- Tiefen: vorne71%/42%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: keine zusätzlichen Objekte nötig. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `camp_departure`, `group_retreat`, `distant_troops`.

- Hotspot: vorhandenes `path`-Material aus `js/hotspots.js`, x51%/y23%, Beschriftung „Der Straße folgen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_road_stopped_dues_cart

Der Abgabenwagen wird aufgehalten

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_road_stopped_dues_cart.png`; Pfad A.

- Horizont/Augenebene: etwa 38%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe36%. Maximal3 Hauptfiguren.

- Figuren:

  - peter: x25%, Höhe36%, Füße71%; Blick right; CSS-Spiegelung nein.

  - konrad: x48%, Höhe36%, Füße71%; Blick left; CSS-Spiegelung nein.

  - matthes: x68%, Höhe36%, Füße71%; Blick left; CSS-Spiegelung nein.

- Tiefen: vorne71%/36%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: keine zusätzlichen Objekte nötig. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: keine.

- Hotspot: vorhandenes `object`-Material aus `js/hotspots.js`, x86%/y47%, Beschriftung „Abgaben prüfen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_camp_prisoner

Gefangenenentscheidung im Bauernlager

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_camp_prisoner.png`; Pfad A/E.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe41%. Maximal4 Hauptfiguren.

- Figuren:

  - konrad: x15%, Höhe41%, Füße71%; Blick right; CSS-Spiegelung ja.

  - envoy: x38%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

  - anna: x62%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

  - jakob: x85%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

- Tiefen: vorne71%/41%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: keine zusätzlichen Objekte nötig. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: keine.

- Hotspot: vorhandenes `action`-Material aus `js/hotspots.js`, x51%/y23%, Beschriftung „Zum Gefangenen sprechen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

Der bestehende Amtsbote (`envoy`) ist die mögliche gefangene Person. Das beschreibt nur eine wiederverwendbare Assetrolle. Eine spätere Runtime darf die Identität mit der Story abstimmen. Kein zusätzlicher Kerker, kein Pranger und keine dramatische Fesselung; das lose Seil bleibt unbenutzt.

### ch5_negotiation_chamber

Verhandlung mit ungleichen Handlungsmöglichkeiten

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_negotiation_chamber.png`; Pfad B.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe41%. Maximal3 Hauptfiguren.

- Figuren:

  - peter: x22%, Höhe41%, Füße71%; Blick right; CSS-Spiegelung nein.

  - anna: x39%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

  - overseer: x77%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

- Tiefen: vorne71%/41%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: `negotiation_terms`, `village_petition`, `seal_and_wax`. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `delegation_inside`, `negotiation_broken`.

- Hotspot: vorhandenes `object`-Material aus `js/hotspots.js`, x58%/y42%, Beschriftung „Bedingungen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_theological_council_evening

Unter Zeitdruck theologisch beraten

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png`; Pfad C.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe41%. Maximal3 Hauptfiguren.

- Figuren:

  - jakob: x25%, Höhe41%, Füße71%; Blick right; CSS-Spiegelung ja.

  - anna: x48%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

  - preacher: x74%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung ja.

- Tiefen: vorne71%/41%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: `bible_council`, `luther_text_stack`, `emergency_report`. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `wounded_return`.

- Hotspot: vorhandenes `object`-Material aus `js/hotspots.js`, x51%/y24%, Beschriftung „Berichte und Schrift prüfen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_churchyard_dispute

Zwei ernsthafte religiöse Deutungen im selben Kirchhof

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_churchyard_dispute.png`; Pfad D.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe41%. Maximal2 Hauptfiguren.

- Figuren:

  - jakob: x38%, Höhe41%, Füße71%; Blick right; CSS-Spiegelung ja.

  - preacher: x62%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung ja.

- Tiefen: vorne71%/41%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: `competing_flyers`, `public_bible`. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `order_group`, `justice_group`.

- Hotspot: vorhandenes `object`-Material aus `js/hotspots.js`, x51%/y25%, Beschriftung „Die Deutungen vergleichen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_village_prisoner_courtyard

Gemeinsame Gefangenenentscheidung im Hof

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_village_prisoner_courtyard.png`; Pfad B/C/D/E.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe41%. Maximal4 Hauptfiguren.

- Figuren:

  - konrad: x15%, Höhe41%, Füße71%; Blick right; CSS-Spiegelung ja.

  - envoy: x38%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

  - anna: x62%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

  - jakob: x85%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

- Tiefen: vorne71%/41%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: keine zusätzlichen Objekte nötig. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: keine.

- Hotspot: vorhandenes `action`-Material aus `js/hotspots.js`, x51%/y23%, Beschriftung „Den Bericht anhören“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

Der bestehende Amtsbote (`envoy`) ist die mögliche gefangene Person. Das beschreibt nur eine wiederverwendbare Assetrolle. Eine spätere Runtime darf die Identität mit der Story abstimmen. Kein zusätzlicher Kerker, kein Pranger und keine dramatische Fesselung; das lose Seil bleibt unbenutzt.

### ch5_road_troops_approaching

Matthes bringt Nachricht angesichts nähernder Truppen

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_road_troops_approaching.png`; Pfad F.

- Horizont/Augenebene: etwa 34%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe42%. Maximal2 Hauptfiguren.

- Figuren:

  - matthes: x29%, Höhe42%, Füße71%; Blick right; CSS-Spiegelung ja.

  - peter: x65%, Höhe42%, Füße71%; Blick left; CSS-Spiegelung ja.

- Tiefen: vorne71%/42%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: `emergency_report`. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `people_evacuating`, `group_retreat`.

- Hotspot: vorhandenes `path`-Material aus `js/hotspots.js`, x51%/y23%, Beschriftung „Den Rückweg prüfen“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

### ch5_village_after_crisis

Das vertraute Dorf trägt die Folgen

- Hintergrund: `assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png`; Pfad G.

- Horizont/Augenebene: etwa 33%; primärer Fluchtpunkt x53%, auf der Augenebene. Haupt-Tiefenebene: offene Gesprächsfläche vor hinterer Möblierung; Fußlinie71%, Körperhöhe41%. Maximal3 Hauptfiguren.

- Figuren:

  - anna: x28%, Höhe41%, Füße71%; Blick right; CSS-Spiegelung ja.

  - peter: x51%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung ja.

  - jakob: x74%, Höhe41%, Füße71%; Blick left; CSS-Spiegelung nein.

- Tiefen: vorne71%/41%; mittlere Ebene etwa 58%/27%; hinten etwa 48%/16%. Kleine Personen nur auf der zur Platte passenden registrierten Bodenebene einsetzen.

- Requisiten: keine zusätzlichen Objekte nötig. Nicht doppelt auflegen, wenn bereits in der Platte vorhanden.

- Overlays/Varianten: `after_defeat`, `after_negotiation_collapse`, `after_protection`, `after_fragmentation`, `after_deescalation`.

- Hotspot: vorhandenes `action`-Material aus `js/hotspots.js`, x51%/y24%, Beschriftung „Was bleibt zu tun?“. Mindestens44px, ohne Hover sichtbar. Anker wurde gegen Canon-Körper geprüft.

- Dialog-Safe-Area: x0/y74/B100/H26; Köpfe, Hände und zentrale Dokumente bleiben oberhalb. QA zeigt die vollständigen Körper bei eingeblendetem Pergamentdialog. Bei größeren Runtime-Dialogen die gesamte Raumplatte proportional in den freien Bereich darüber einpassen, wie Kapitel 4.

- Nicht kombinieren: siehe Konfliktliste unten; keine alten Kapitel 4-Gruppenlayer ergänzen.

## Objekte und Hotspot-Zonen

Objektbilder bleiben getrennt vom Hintergrund. Wagen-Prop nicht zusätzlich auf `road_stopped_dues_cart` legen: dort ist der Wagen bereits Bestandteil der Raumplatte. Bibel und Kerze im Beratungsraum sind ebenfalls schon enthalten. Die separaten Buch-/Briefobjekte dienen Detailansichten oder einer alternativen, vorher geprüften Objektinszenierung.

Auf dem Verhandlungstisch liegen Bedingungen/Mappe im hinteren Zentrum um x55/y42. Auf dem Beratungstisch nur eine aktive Lesequelle anzeigen; Bericht und Lutherstapel können stattdessen in einer Detailansicht erscheinen. Im Kirchhof steht eine optionale öffentliche Bibel am rechten Rand um x86/y52; niemals zwischen Jakob und Prediger. Versorgung im Morgenlager bleibt in der registrierten linken Randzone.

## UI und Textflächen

Die vier Arbeitsflächen verwenden ausschließlich responsiven HTML-Text über blanken Bildflächen, mindestens 18px. Die QA-Texte sind redaktionelle Beispiele und Zusammenfassungen, keine historischen Zitate. Drei Berichte nutzen die erwartete vollständige Textmenge.

Schreibbereiche und maximale Zeilen stehen pro PNG im Manifest unter `textSafeArea`: x/y/Breite/Höhe in Prozent. Überschriften und Fließtext zusammen zählen. Bei längeren endgültigen Unterrichtstexten die Abnahme wiederholen; nicht die Schrift verkleinern.

Die Arbeitsfläche erhält die verfügbare Bildschirmfläche als große Dokumentansicht; Überschrift/Schließen sitzen über dem freien oberen Holzrand. Kein zusätzlicher72px-Kopfbereich oberhalb des Bilds. So passen die geprüften Texte bei1024×768 und in den kleineren Tabletansichten ohne innere Scrollbars. UI-PNGs nicht nochmals in einen kleinen Dialogkasten verschachteln.

Für Religionsfunktionen sind sechs vollständige Schreib-/Touchbereiche vorhanden: zwei Funktionen wählen, ein Risiko getrennt markieren. Die QA demonstriert nur den Auswahlzustand; Auswertung und Speicherung werden bei der späteren Runtime-Integration umgesetzt.

## Nicht kombinierbare Overlays

- Die fünf `after_*`-Layer sind alternative Endzustände auf derselben Nachwirkungsplatte; jeweils höchstens einer.

- `negotiation_broken` und `delegation_inside` nicht gemeinsam; verschiedene Gesprächszustände.

- `camp_departure` und `group_retreat` nicht zugleich am selben Weg.

- `distant_troops` nicht auf `road_troops_approaching`: dort sind die Truppen bereits eingebaut. Auf der freien Straßenplatte kann er als späteres Zustandszeichen dienen.

- `order_group` und `justice_group` dürfen gemeinsam auf dem Kirchhof stehen. Keine moralische Farbcodierung.

- `wounded_return`, Evakuierung und Rückzug sind einzeln geprüfte Ergänzungen. Kombinationen benötigen erneute Raumprüfung, besonders mit vier Hauptfiguren.

## Empfohlene Integration

Vorhandenen Kapitel 4-Handoff lesen und in eine der vier Eingangswelten übersetzen; Auswahlregeln nicht in Bilddateien verstecken. Hintergrund → registrierter Zustand → Kontakt-/Bodenschatten → separate Canon-Figuren → gemeinsamer Hotspot → Dialog/Quellen. Texte, fachliche Auswertung und Speicherung bleiben Aufgabe der folgenden Runtime-Runde.

Neue Dateien aus `assets/chapter5` verwenden, Canon-Pfade und Hashes aus `canonReferences` beibehalten. Die bestehenden globalen Materialvariablen und `js/hotspots.js` wiederverwenden. Keine neue parallele UI-Sprache.

`assets/chapter5/qa/preview.html` ist eine getrennte Prüfseite mit Testzuständen; keine neue Spielkapitel-Route. Screenshots und Composites niemals als Runtime-Hintergrund verwenden.
