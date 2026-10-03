# Kapitel 4: Staging-Guide

Verbindliche Umsetzung: `js/chapter-four-view.js`, Körpergeometrie: `data/chapter-four-staging.js`. Alle Prozentwerte beziehen sich auf die unverzerrte1024×768-Raumplatte. Der Renderer misst den sichtbaren Körper statt der PNG-Leinwand.

## Raumregeln

| Bühne | Körperhöhe / Fußlinie | Horizont / Begründung |
|---|---|---|
| Dorf-Hub / Eskalation |41% /71% | Hauptfiguren-Augen ca.33%; Familie sitzt am linken Rand; Eskalationsfiguren x38/72%. |
| Herrenhof |41% /71% | Abordnung vor dem Hof; Tisch nur links an der Wand; Tor rechts frei. |
| Jakobs Raum |37% /71% | Intimer Raum, Wandtisch im hinteren Drittel; stehende Gruppen ohne kollidierende Sitzposen. |
| Gemeindeplatz |33% /72% | Andere Kamerahöhe: Augen ca.42%; Randgemeinde auf tieferer Bodenlinie. |
| Bauernlager |36% /71% | Augen ca.38%; bäuerliche Menschen am hinteren Rand; Reisende auf dem Abmarschlayer tiefer. |
| Speicher |33% /71% | Innenraum mit höherer Horizontlinie; Blockadelayer11% nach oben zur tatsächlichen Türschwelle. |

Spiegelung erfolgt ausschließlich in CSS: Randfigur links blickt rechts, Randfigur rechts blickt links. Mittlere Figuren behalten ihre vorhandene Blickrichtung. Bilder bleiben bytegleich. Keine neuen Posen.

Die Original-Prediger/Boten besitzen unveränderte Neutral-/Sprechzustände mit gleicher Leinwand. Aktive Sprecher verwenden die Sprechpose, Zuhörer die Neutralpose.

Unterste26% jeder Platte sind Dialog-Safe-Area. Die gesamte Platte wird bei Dialogen UND Aufgaben proportional in den freien Bereich über dem Panel eingepasst; kein Abschneiden von Gesichtern/Beinen. Aufgaben scrollen intern (max.60svh).

Zielgeräte sind iPads im Quer- und Hochformat sowie größere Bildschirme. Hotspots bleiben an den unten beschriebenen räumlichen Ankern; Touchflächen mindestens44px. Keine eigens für Handys eingeführten Layouts.

## Alle 36 Szenen

### Ein Dorf liest deine Forderungen (`ch4_opening`)

- Funktion / Trigger: Kapitel-3-Druckwirkung im Dorf erleben; Abschluss Kapitel 3: publicTone

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_consequence_hub.png`; Overlay: `assets/chapter4/overlays/ch4_overlay_consequence_nuanced.png`.

- Positionen: jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; konrad → left; Spiegelung nein

- Sprecher: traveler, anna, jakob, peter. Zuhörer: übrige anwesende Figuren (jakob, konrad). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y60% im freien Durchgang; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Abschluss Kapitel 3: publicTone; vollständige Branch-Tabelle unten.

### Welchen Weg du vorbereitet hast (`ch4_route`)

- Funktion / Trigger: Den vorbereiteten politischen Weg betreten; Kapitel 3: resistanceStrategy → A/B/C/D

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; envoy: x66%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; konrad → left; Spiegelung nein; envoy → left; Spiegelung nein

- Sprecher: peter, envoy, konrad. Zuhörer: übrige anwesende Figuren (peter, konrad, envoy). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: articles_on_table x7%/y44%/B6%, seal_document x12%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Kapitel 3: resistanceStrategy → A/B/C/D; vollständige Branch-Tabelle unten.

### Beim Verwalter (`ch4_authority`)

- Funktion / Trigger: Forderungen und Herrschaftsanspruch aushandeln; RouteA

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; overseer → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (peter, overseer). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: articles_on_table x7%/y44%/B6%, seal_document x12%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: RouteA; vollständige Branch-Tabelle unten.

### Gemeinsam auftreten (`ch4_community`)

- Funktion / Trigger: Gemeinsames Mandat und Risiko sichtbar machen; RouteB

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_assembly_rebuilt.png`; Overlay: `—`.

- Positionen: anna: x28%, H33%, Fuß72%; peter: x51%, H33%, Fuß72%; jakob: x72%, H33%, Fuß72%.

- Blickrichtung / Spiegelung: anna → right; Spiegelung ja; peter → right; Spiegelung nein; jakob → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (anna, peter, jakob). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y30% nahe der Gemeinde; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: RouteB; vollständige Branch-Tabelle unten.

### Am Rand des Dorfes (`ch4_resistance`)

- Funktion / Trigger: Heterogene Motive des Bauernhaufens kennenlernen; RouteC

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_peasant_band_camp_edge.png`; Overlay: `—`.

- Positionen: konrad: x28%, H36%, Fuß71%; band1: x51%, H36%, Fuß71%; band2: x72%, H36%, Fuß71%.

- Blickrichtung / Spiegelung: konrad → right; Spiegelung ja; band1 → right; Spiegelung nein; band2 → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (konrad, band1, band2). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y25% oberhalb der Gesprächsgruppe; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: RouteC; vollständige Branch-Tabelle unten.

### Am Tisch mit Jakob (`ch4_preparation`)

- Funktion / Trigger: Freiheit, Evangelium und Gewissen gemeinsam auslegen; RouteD

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: RouteD; vollständige Branch-Tabelle unten.

### Was unser Handeln verändert (`ch4_opening_effect`)

- Funktion / Trigger: Die unmittelbare Handlungskonsequenz sehen; Entscheidung in A/B/C/D; vollständige Varianten unten

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; konrad → left; Spiegelung nein; overseer → left; Spiegelung nein

- Sprecher: peter, konrad. Zuhörer: übrige anwesende Figuren (peter, konrad, overseer). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: seal_document x7%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Entscheidung in A/B/C/D; vollständige Varianten unten; vollständige Branch-Tabelle unten.

### Eine Nachricht von Luther (`ch4_ermahnung`)

- Funktion / Trigger: Luthers Friedensermahnung als neue Stimme prüfen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: matthes, anna, jakob. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### An die Herren (`ch4_lords`)

- Funktion / Trigger: Kritik an Unterdrückung und Verantwortung der Herren prüfen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### An die Bauern (`ch4_peasants`)

- Funktion / Trigger: Beschwerde und Mittel des Aufruhrs unterscheiden; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Begründung und Mittel (`ch4_peasants_complement`)

- Funktion / Trigger: Die Begründung an der Quelle prüfen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Freiheit damals und jetzt (`ch4_memory`)

- Funktion / Trigger: Eigenes früheres Freiheitsurteil wieder aufnehmen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: jakob. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Ein erstes Urteil (`ch4_early`)

- Funktion / Trigger: Ein vorläufiges theologisches Urteil bilden; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Glaube, Gewissen und äußere Ordnung (`ch4_regiments`)

- Funktion / Trigger: Geistliches Wirken und äußere Ordnung auf Fälle anwenden; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; anna: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; anna → left; Spiegelung nein

- Sprecher: jakob, anna. Zuhörer: übrige anwesende Figuren (jakob, anna). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Eine Grenze der Obrigkeit (`ch4_boundary`)

- Funktion / Trigger: Grenzen obrigkeitlicher Gewalt am Gewissen prüfen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Eine andere reformatorische Stimme (`ch4_muentzer`)

- Funktion / Trigger: Eine seriöse reformatorische Gegenposition kennenlernen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: preacher: x28%, H37%, Fuß71%; konrad: x51%, H37%, Fuß71%; jakob: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: preacher → right; Spiegelung nein; konrad → left; Spiegelung nein; jakob → left; Spiegelung nein

- Sprecher: matthes, preacher, konrad, jakob. Zuhörer: übrige anwesende Figuren (preacher, konrad, jakob). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: thuringia_report x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Drei Wege, die Schrift auszulegen (`ch4_interpretations`)

- Funktion / Trigger: Drei Deutungen anhand derselben Kriterien vergleichen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: preacher: x28%, H37%, Fuß71%; konrad: x51%, H37%, Fuß71%; jakob: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: preacher → right; Spiegelung nein; konrad → left; Spiegelung nein; jakob → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (preacher, konrad, jakob). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: thuringia_report x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Mit welcher Begründung handeln? (`ch4_theology`)

- Funktion / Trigger: Eine religiös begründete Handlungsrichtung wählen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: preacher: x28%, H37%, Fuß71%; konrad: x51%, H37%, Fuß71%; jakob: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: preacher → right; Spiegelung nein; konrad → left; Spiegelung nein; jakob → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (preacher, konrad, jakob). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: thuringia_report x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Bedingungen am Herrenhof (`ch4_negotiation`)

- Funktion / Trigger: Begrenzte Vereinbarung ohne Happy-End-Versprechen prüfen; theologicalPath=luther_order

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; overseer → left; Spiegelung nein

- Sprecher: peter, konrad. Zuhörer: übrige anwesende Figuren (peter, overseer). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: seal_document x7%/y44%/B6%, articles_on_table x12%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: theologicalPath=luther_order; vollständige Branch-Tabelle unten.

### Die Gemeinde stellt Bedingungen (`ch4_conditions`)

- Funktion / Trigger: Gemeinsame Bedingungen öffentlich verantworten; theologicalPath=gospel_critique

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_assembly_rebuilt.png`; Overlay: `—`.

- Positionen: anna: x28%, H33%, Fuß72%; peter: x51%, H33%, Fuß72%; jakob: x72%, H33%, Fuß72%.

- Blickrichtung / Spiegelung: anna → right; Spiegelung ja; peter → right; Spiegelung nein; jakob → left; Spiegelung nein

- Sprecher: anna, peter. Zuhörer: übrige anwesende Figuren (anna, peter, jakob). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y30% nahe der Gemeinde; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: theologicalPath=gospel_critique; vollständige Branch-Tabelle unten.

### Am Lager der Bauern (`ch4_band`)

- Funktion / Trigger: Versorgung, Gewaltbereitschaft und Begrenzung auseinanderhalten; theologicalPath=prophetic_resistance

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_peasant_band_camp_edge.png`; Overlay: `—`.

- Positionen: konrad: x28%, H36%, Fuß71%; band1: x51%, H36%, Fuß71%; band2: x72%, H36%, Fuß71%.

- Blickrichtung / Spiegelung: konrad → right; Spiegelung ja; band1 → right; Spiegelung nein; band2 → left; Spiegelung nein

- Sprecher: band1, band2, konrad. Zuhörer: übrige anwesende Figuren (konrad, band1, band2). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y25% oberhalb der Gesprächsgruppe; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: theologicalPath=prophetic_resistance; vollständige Branch-Tabelle unten.

### Unsere Auslegung prüfen (`ch4_hermeneutics`)

- Funktion / Trigger: Auch die eigene Auslegung überprüfbar machen; theologicalPath=hermeneutical_caution

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: jakob, matthes. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: theologicalPath=hermeneutical_caution; vollständige Branch-Tabelle unten.

### Wer jetzt handelt (`ch4_branch_effect`)

- Funktion / Trigger: Die theologische Entscheidung räumlich wirksam sehen; Vier theologische Pfade und bandAction; Varianten unten

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; konrad → left; Spiegelung nein; overseer → left; Spiegelung nein

- Sprecher: peter, konrad. Zuhörer: übrige anwesende Figuren (peter, konrad, overseer). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: seal_document x7%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Vier theologische Pfade und bandAction; Varianten unten; vollständige Branch-Tabelle unten.

### Eine Nachricht aus Oberschwaben (`ch4_weingarten`)

- Funktion / Trigger: Eine mögliche Verhandlung mit Zugeständnissen kennenlernen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_consequence_hub.png`; Overlay: `assets/chapter4/overlays/ch4_overlay_consequence_nuanced.png`.

- Positionen: matthes: x51%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: matthes → left; Spiegelung nein

- Sprecher: matthes, anna, konrad. Zuhörer: übrige anwesende Figuren (matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x78%, y60% am freien Randweg; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Verhandlung oder Rückzug? (`ch4_weingarten_choice`)

- Funktion / Trigger: Übertragbarkeit und Preis der Vereinbarung beurteilen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_consequence_hub.png`; Overlay: `assets/chapter4/overlays/ch4_overlay_consequence_nuanced.png`.

- Positionen: matthes: x51%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x78%, y60% am freien Randweg; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Anfang Mai – die Lage eskaliert (`ch4_escalation`)

- Funktion / Trigger: Gefährdete Menschen im selben Dorf wahrnehmen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_escalation_rebuilt.png`; Overlay: `—`.

- Positionen: anna: x38%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: anna → right; Spiegelung ja; konrad → left; Spiegelung nein

- Sprecher: matthes, konrad, anna, jakob. Zuhörer: übrige anwesende Figuren (anna, konrad). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y23% nahe der Gesprächszone; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Menschen im gefährdeten Dorf (`ch4_escalation_effect`)

- Funktion / Trigger: Schutz, Warnung, Mitgehen oder Prüfung sichtbar erleben; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_village_escalation_rebuilt.png`; Overlay: `assets/chapter4/overlays/ch4_overlay_consequence_confrontational.png`.

- Positionen: anna: x38%, H41%, Fuß71%; matthes: x72%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: anna → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (anna, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y23% nahe der Gesprächszone; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Luthers schärfere Schrift (`ch4_harsh`)

- Funktion / Trigger: Luthers verschärfte Reaktion im Mai lesen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: matthes, jakob. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: authority_warning x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### April und Mai nebeneinander (`ch4_comparison`)

- Funktion / Trigger: April und Mai in getrennten großen Quellenfeldern vergleichen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: authority_warning x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Die Begründung prüfen (`ch4_structure`)

- Funktion / Trigger: Begründung, Anwendung und Mittel unterscheiden; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: authority_warning x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Neue Lage, neues Prinzip? (`ch4_analysis`)

- Funktion / Trigger: Vertiefung nach früherer Quellenprüfung; Freigabe durch frühere Quellenprüfung

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: authority_warning x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Freigabe durch frühere Quellenprüfung; vollständige Branch-Tabelle unten.

### Welche Gefahr begrenzen? (`ch4_risk`)

- Funktion / Trigger: Konkurrierende Gefahren verantwortlich abwägen; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: peter, anna, jakob. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: authority_warning x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Ein vorläufiges Urteil (`ch4_judgment`)

- Funktion / Trigger: Ein begründetes vorläufiges Lutherurteil abgeben; Fortsetzung der Quellen-/Urteilsfolge

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: jakob → right; Spiegelung ja; matthes → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: authority_warning x62%/y35%/B7%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Fortsetzung der Quellen-/Urteilsfolge; vollständige Branch-Tabelle unten.

### Was aus unserem Dorf geworden ist (`ch4_world_end`)

- Funktion / Trigger: Den eigenen Konsequenzzustand als Welt sehen; determineEndWorldState; Weingarten kann früheren Weg revidieren

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; konrad → left; Spiegelung nein; overseer → left; Spiegelung nein

- Sprecher: peter, konrad, jakob. Zuhörer: übrige anwesende Figuren (peter, konrad, overseer). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: seal_document x7%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: determineEndWorldState; Weingarten kann früheren Weg revidieren; vollständige Branch-Tabelle unten.

### Jetzt geht es um die Folgen (`ch4_end`)

- Funktion / Trigger: Ruhiger Kapitelabschluss mit einer Fortsetzungsaktion; Nach world_end

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_jakob_study_rebuilt.png`; Overlay: `—`.

- Positionen: jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71%.

- Blickrichtung / Spiegelung: keine sichtbaren Hauptfiguren.

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (jakob, matthes). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: keine zusätzlichen Props; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x51%, y41% beim Studiertisch; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Nach world_end; vollständige Branch-Tabelle unten.

### Kapitel 5 – Du musst handeln (`ch4_chapter5`)

- Funktion / Trigger: Gespeicherte Ausgangslage übergeben; bestehender Ausblick, kein neues Kapitel; Nach Kapitelabschluss: gespeicherter Handoff

- Hintergrund: `assets/chapter4/backgrounds/ch4_bg_manor_negotiation_rebuilt.png`; Overlay: `—`.

- Positionen: peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71%.

- Blickrichtung / Spiegelung: peter → right; Spiegelung nein; konrad → left; Spiegelung nein; overseer → left; Spiegelung nein

- Sprecher: Aufgaben-/Quellenmoment; Optionsreaktion nach Auswahl. Zuhörer: übrige anwesende Figuren (peter, konrad, overseer). Bei mehr Gesprächsstimmen als dargestellten Körpern bleiben weitere Stimmen im Originalporträt; keine zusätzliche Figur zwischen Quellenobjekten erzwingen.

- Objektfokus: seal_document x7%/y44%/B6%; Quellen werden als große historische Dokumente mit HTML-Text geöffnet.

- Hotspot: x87%, y38% am Tor; vorhandenes Holz-/Leder-/Pergament-System, mindestens44px.

- Dialog-Safe-Area: unten26%; keine Hauptfiguren im Panel. Verdeckte Bühne im schwarzen Kapitelabschluss ist beabsichtigt.

- Varianten: Nach Kapitelabschluss: gespeicherter Handoff; vollständige Branch-Tabelle unten.

## Alle 37 zusätzlichen Varianten

| Szene | Entscheidung / Trigger | Platte | Figuren / Positionen | Overlay |
|---|---|---|---|---|
| route | openingRoute=A | `ch4_bg_manor_negotiation_rebuilt.png` | peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; envoy: x66%, H41%, Fuß71% | `—` |
| route | openingRoute=B | `ch4_bg_village_assembly_rebuilt.png` | anna: x28%, H33%, Fuß72%; peter: x51%, H33%, Fuß72%; jakob: x72%, H33%, Fuß72% | `—` |
| route | openingRoute=C | `ch4_bg_peasant_band_camp_edge.png` | konrad: x28%, H36%, Fuß71%; band1: x51%, H36%, Fuß71%; band2: x72%, H36%, Fuß71% | `—` |
| route | openingRoute=D | `ch4_bg_jakob_study_rebuilt.png` | jakob: x28%, H37%, Fuß71%; matthes: x72%, H37%, Fuß71% | `—` |
| opening_effect | openingRoute=A, authorityTone=legal | `ch4_bg_manor_negotiation_rebuilt.png` | peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71% | `—` |
| opening_effect | openingRoute=A, authorityTone=articles | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_nuanced.png` |
| opening_effect | openingRoute=A, authorityTone=gospel | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_religious.png` |
| opening_effect | openingRoute=A, authorityTone=pressure | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| opening_effect | openingRoute=B, communityAction=delegation | `ch4_bg_manor_negotiation_rebuilt.png` | peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71% | `—` |
| opening_effect | openingRoute=B, communityAction=withhold_dues | `ch4_bg_storehouse.png` | peter: x28%, H33%, Fuß71%; anna: x72%, H33%, Fuß71% | `—` |
| opening_effect | openingRoute=B, communityAction=other_villages | `ch4_bg_village_assembly_rebuilt.png` | anna: x28%, H33%, Fuß72%; peter: x51%, H33%, Fuß72%; jakob: x72%, H33%, Fuß72% | `—` |
| opening_effect | openingRoute=B, communityAction=public_meeting | `ch4_bg_village_assembly_rebuilt.png` | anna: x28%, H33%, Fuß72%; peter: x51%, H33%, Fuß72%; jakob: x72%, H33%, Fuß72% | `—` |
| opening_effect | openingRoute=C, resistanceAction=refuse_dues | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| opening_effect | openingRoute=C, resistanceAction=block_storehouse | `ch4_bg_storehouse.png` | keine Canon-Figuren | `ch4_overlay_blockade.png` |
| opening_effect | openingRoute=C, resistanceAction=demonstrate | `ch4_bg_peasant_band_camp_edge.png` | konrad: x28%, H36%, Fuß71%; band1: x72%, H36%, Fuß71% | `—` |
| opening_effect | openingRoute=C, resistanceAction=return_to_negotiation | `ch4_bg_manor_negotiation_rebuilt.png` | peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71% | `—` |
| opening_effect | openingRoute=D | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_simplified.png` |
| branch_effect | theologicalPath=luther_order | `ch4_bg_manor_negotiation_rebuilt.png` | peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71% | `—` |
| branch_effect | theologicalPath=gospel_critique | `ch4_bg_village_assembly_rebuilt.png` | anna: x28%, H33%, Fuß72%; peter: x72%, H33%, Fuß72% | `—` |
| branch_effect | theologicalPath=hermeneutical_caution | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_simplified.png` |
| branch_effect | theologicalPath=prophetic_resistance, bandAction=resistance_occupation | `ch4_bg_storehouse.png` | keine Canon-Figuren | `ch4_overlay_blockade.png` |
| branch_effect | theologicalPath=prophetic_resistance, bandAction=resistance_armed_defense | `ch4_bg_village_consequence_hub.png` | band1: x51%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| branch_effect | theologicalPath=prophetic_resistance, bandAction=resistance_limit | `ch4_bg_peasant_band_camp_edge.png` | band1: x28%, H36%, Fuß71%; konrad: x72%, H36%, Fuß71% | `—` |
| branch_effect | theologicalPath=prophetic_resistance, bandAction=resistance_dues | `ch4_bg_peasant_band_camp_edge.png` | band1: x28%, H36%, Fuß71%; band2: x72%, H36%, Fuß71% | `—` |
| escalation_effect | escalationResponse=protect | `ch4_bg_village_escalation_rebuilt.png` | anna: x38%, H41%, Fuß71%; matthes: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| escalation_effect | escalationResponse=warn | `ch4_bg_village_escalation_rebuilt.png` | anna: x38%, H41%, Fuß71%; matthes: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| escalation_effect | escalationResponse=join | `ch4_bg_village_escalation_rebuilt.png` | band1: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| escalation_effect | escalationResponse=verify | `ch4_bg_village_escalation_rebuilt.png` | anna: x38%, H41%, Fuß71%; matthes: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |
| world_end | endWorldState=negotiation_open | `ch4_bg_manor_negotiation_rebuilt.png` | peter: x28%, H41%, Fuß71%; konrad: x48%, H41%, Fuß71%; overseer: x68%, H41%, Fuß71% | `—` |
| world_end | endWorldState=mobilized_community | `ch4_bg_village_assembly_rebuilt.png` | anna: x28%, H33%, Fuß72%; peter: x51%, H33%, Fuß72%; jakob: x72%, H33%, Fuß72% | `—` |
| world_end | endWorldState=joining_peasant_band | `ch4_bg_peasant_band_camp_edge.png` | konrad: x72%, H36%, Fuß71% | `ch4_overlay_joining_peasant_band.png` |
| world_end | endWorldState=religious_polarization | `ch4_bg_village_consequence_hub.png` | preacher: x28%, H41%, Fuß71%; jakob: x72%, H41%, Fuß71% | `ch4_overlay_consequence_religious.png` |
| world_end | endWorldState=events_moved_without_you | `ch4_bg_village_consequence_hub.png` | jakob: x51%, H41%, Fuß71% | `—` |
| opening | openingWorldState=nuanced | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_nuanced.png` |
| opening | openingWorldState=simplified | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_simplified.png` |
| opening | openingWorldState=religious | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_religious.png` |
| opening | openingWorldState=confrontational | `ch4_bg_village_consequence_hub.png` | jakob: x28%, H41%, Fuß71%; konrad: x72%, H41%, Fuß71% | `ch4_overlay_consequence_confrontational.png` |

## Quellen und Arbeitsflächen

Elf Dokumentunterlagen plus Weingarten-Bericht bleiben erhalten. Reale Kapiteltexte wurden bei allen fünf Auflösungen gerendert, gelesen und bis zum Ende gescrollt. Textfelder mindestens18px, Vergrößerung22px; äußeres Dokument und einzelne Textfelder scrollen. Die Inhalte bleiben vollständig im DOM.

Der Vergleich April/Mai nutzt Hauptfelder x9–45% und55–91%, y18–70%; untere Vergleichsakzente y76–90%. Zusammenfassungen stehen im großen Hauptfeld und sind ausdrücklich als heutige Sprache gekennzeichnet. Die Freiheitsleitsätze tragen die Kennzeichnung „Behutsam modernisierte Quellenworte“.

Zwei-Regimente-Tisch, physische Fallzettel und drei Auslegungsfelder bleiben erhalten. Fünf Fälle können per Maus, Touch und Tastatur geistlich/weltlich/beiden/Grenzfall zugeordnet werden. Keine neue technische Oberfläche.

## Fachliche und historische Einordnung

Keine Quellenworte, Aufgabenlösungen, Entscheidungslogik oder Notizbuchtexte geändert. Keine Historienbilder von Luther oder Müntzer neu erfunden. Der lokale Prediger ist eine erfundene Dorfstimme, keine Müntzer-Porträtbehauptung. Bauernhaufen und Herrschaft bleiben ambivalent; die Familie und Verhandlung tragen menschliche Kosten statt Heldensymbolik.

Einordnung abgeglichen mit [Luthers Freiheitsdruck1520 / Oxford](https://editions.mml.ox.ac.uk/editions/freiheit-1520/), [Friedensermahnung / bavarikon](https://www.bavarikon.de/object/BSB-HSS-00000BSB00089333?lang=de), [Müntzers Fürstenpredigt / GHDI](https://germanhistorydocs.org/de/von-den-reformationen-bis-zum-dreissigjaehrigen-krieg-1500-1648/ghdi:document-4270), [Luthers Mai-Schrift / LutherMuseen](https://www.luthermuseen.de/en/node/889), [Weingartener Vertrag / LEO-BW](https://www.leo-bw.de/fr/web/guest/themenmodul/bauernkrieg/vertraege/weingartener-vertrag). Diese Links dienen Nachweisen; die Spieltexte sind weiterhin gekennzeichnete Zusammenfassungen.
