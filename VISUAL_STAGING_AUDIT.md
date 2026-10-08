# Visuelles Staging-Audit · Kapitel 1–5

Stand: 8. Oktober 2026. 108 registrierte Szenen wurden in ihrer ersten Spielansicht auf 1024×768, 820×640 und 1440×900 aufgenommen. Zusätzlich wurden tatsächliche Dialog-, Aufgaben-, Quellen-, Pfad- und Endphasen in den Kapitelprüfungen und vier echten Neuspielen aufgenommen. Das erste Szenenbild allein belegt nicht sämtliche Folgephasen. Verzeichnisse: `artifacts/game-audit/`, `artifacts/chapter5/`, `artifacts/whole-*.png`.

## Prüfkriterien und Ergebnis

Perspektive, Körpermaß, Fußlinie, Raumtiefe, Blickfokus, Licht, Möblierung, Wege, Interaktionsanker und Dialogzone wurden gegen die sichtbare Illustration geprüft. Raumplatten werden proportional gezeigt; sichtbare Alpha-Bounds bestimmen das Körpermaß. Die zentrale Fußlinie in Kapitel 5 ist 71%, der Dialog beginnt bei 74%. Ein Schritt kann eine eigene historische Arbeitsfläche zeigen, ohne gleichzeitig alle Körper hinter Text zu pressen. Ein registrierter Layer kann geometrisch korrekt sein und dennoch illustrativ unpassend wirken: A01 bleibt genau deshalb offen.

## Kapitel und Schauplätze

| Kapitel / Räume | Komposition / Körper / Möbel | Interaktion / Text | Ergebnis |
|---|---|---|---|
| 1 · Taverne | Peter, Jakob und Anna im integrierten Bild; gemeinsamer Tisch, Kerzen und Tür | Figurenschilder nahe den Figuren, kein früher Exit; Originalflugblätter vollständig, Text separat abrufbar | Beibehalten; keine unnötigen Pflichtobjekte |
| 2 · Dorf / Wald | Figuren an Hof oder Weg; Sammelstelle und Grenzzeichen räumlich verschieden | Vorhandene PNG-Wegweiser; keine Gesichtsschilder | Auf drei Größen geprüft |
| 2 · Frondienst / Abgaben | Hofarbeit, Herrenforderung und Haushalt räumlich motiviert | Tageszeiten und Sackmengen zeigen Belastung; keine künstliche Heroisierung | Auf drei Größen geprüft |
| 2 · Versammlung | Bekannte Taverne, Beschwerdezettel auf Tisch | Ein innerer Arbeitsbereich bei 820; erreichbare Fortsetzung, Hilfe ersetzt Raten | D01 behoben |
| 3 · Straße / Memmingen / Versammlung | Reisende und Sprecher in plausibler Tiefe; Matthes bleibt erkennbar | Wege, Forderung und Artikel sind getrennte Schritte | Auf drei Größen geprüft |
| 3 · Druckerei / Rückkehr | Druckpresse bleibt handwerklicher Gegenstand; Blattbündel reisen, Dorffiguren stehen am bekannten Platz | Ein Handdruck; danach sichtbare Öffentlichkeit | Keine neue Illustration nötig |
| 4 · Dorfzustände / Herrenhof / Gemeinde / Lager / Studiertisch | Vorhandene freigegebene Raumplatten, Alpha-Bodenanker und Canon; Gesprächspartner zum Fokus | Quellen am Tisch, Wege an Zugängen; eine führende Handlung | Raum- und Endvarianten geprüft |
| 4 · Quellen / Vergleich / fünf Fälle | Gealterter Rand, ruhige helle Textflächen, Bindung bleibt; Original und Zusammenfassung getrennt | Lesbare Serifentexte; fünf Fälle einzeln, Navigation erreichbar | Lesbarkeit / Zoom / Archiv geprüft |
| 5 · Morgenlager / Verhandlung / Beratung / Kirchhof | Vier Räume mit anderem Licht, Gruppierung und Props; keine bloße Umbenennung desselben Raums | Andere Aufgabe und Handlungsmittel; historische Lernflächen für lange Denkhandlungen | Pfade sofort visuell unterscheidbar |
| 5 · Wagen | Wagen an der Straße, vorhandener Bote auf Fußlinie wie Konrad/Matthes | Keine Nachricht aus einem nur unsichtbaren Amtskörper | V01 behoben |
| 5 · Gefangener / Truppen / Nachwirkung | Gegner an gemeinsamem Ort; Truppen in Raumtiefe; verändertes vertrautes Dorf | Handlungsbilder behaupten keine Flucht bei Standhalten | V02 behoben |
| 5 · Verletztennachricht, Haufen/Beratung | Kleine Gruppe links an großer Möblierung, Krisenmoment zu wenig integriert | Funktioniert technisch, aber die Illustration trägt den Moment nicht ausreichend | A01 high / BLOCKED_BY_ASSET |

## Kapitel-5-Raumvertrag

Die Werte stammen aus `data/chapter-five-staging.js`; der Wagen ersetzt in der aktuellen Runtime den dort ursprünglich eingetragenen Peter durch den Boten. Canonmaßstab wird durch sichtbare Körperhöhe, nicht PNG-Gesamtfläche bestimmt.

| Raum | Horizont / Fluchtpunkt (%) | Vordergrund-Fußlinie / Körperhöhe (%) | Gruppierung | Hintergrund |
|---|---|---|---|---|
| peasant_camp_morning | 27 / {'x': 53, 'y': 27} | 71 / 48 | konrad, matthes, band1 | assets/chapter5/backgrounds/ch5_bg_peasant_camp_morning.png |
| road_with_peasant_band | 34 / {'x': 53, 'y': 34} | 71 / 42 | konrad, matthes | assets/chapter5/backgrounds/ch5_bg_road_with_peasant_band.png |
| road_stopped_dues_cart | 38 / {'x': 53, 'y': 38} | 71 / 36 | envoy, konrad, matthes | assets/chapter5/backgrounds/ch5_bg_road_stopped_dues_cart.png |
| camp_prisoner | 34 / {'x': 53, 'y': 34} | 71 / 41 | konrad, envoy, anna, jakob | assets/chapter5/backgrounds/ch5_bg_camp_prisoner.png |
| negotiation_chamber | 34 / {'x': 53, 'y': 34} | 71 / 41 | peter, anna, overseer | assets/chapter5/backgrounds/ch5_bg_negotiation_chamber.png |
| theological_council_evening | 34 / {'x': 53, 'y': 34} | 71 / 41 | jakob, anna, preacher | assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png |
| churchyard_dispute | 34 / {'x': 53, 'y': 34} | 71 / 41 | jakob, preacher | assets/chapter5/backgrounds/ch5_bg_churchyard_dispute.png |
| village_prisoner_courtyard | 34 / {'x': 53, 'y': 34} | 71 / 41 | konrad, envoy, anna, jakob | assets/chapter5/backgrounds/ch5_bg_village_prisoner_courtyard.png |
| road_troops_approaching | 34 / {'x': 53, 'y': 34} | 71 / 42 | matthes, peter | assets/chapter5/backgrounds/ch5_bg_road_troops_approaching.png |
| village_after_crisis | 33 / {'x': 53, 'y': 33} | 71 / 41 | anna, peter, jakob | assets/chapter5/backgrounds/ch5_bg_village_after_crisis.png |

## Hotspots und Bedienräume

Nur `js/hotspots.js` und die originalen Materialien in `assets/ui/hotspots/v2/`: Objekt Pergament, Weg Holz, Gespräch/Handlung Leder-Holz. Rückwege spiegeln nur das Holz, nicht die Schrift. Bildanker liegen nahe Figur/Objekt oder plausibler Wegöffnung; keine wichtigen Gesichter oder Hände wurden für einen Marker zugedeckt. Touchziele und Seiten-Overflow sind zusätzlich automatisiert geprüft. Kapitel-1-Tür bleibt bis zum Abschluss unmarkiert. Quellen- und Archivbedienelemente bleiben außerhalb des Druckblatts.

## Quellen, Aufgaben und Scrollen

Authentische Papieroptik bleibt am Rand stärker, Leseflächen ruhiger. Keine Kurrent-/Sütterlin-Haupttexte oder überlagerte doppelte Flugblattzitate. Einzelne große Quellendokumente und Archive können intern scrollen; die fünf Fälle und Kapitel-5-Lernflächen sind auf den drei Zielgrößen ohne inneres Scrollen bedienbar. Es gibt keine horizontale Seiten-Scrollbar in den 324 Aufnahmen. Physische iPad-/Safari-Bedienung und die behauptete Fünf-Sekunden-Orientierung benötigen separate echte Erprobung.

## Offener Produktionsbedarf

A01 wird nicht mit extremer Skalierung, Cropping oder weiteren Kaschierungslayern behandelt. `WORK_ASSET_REQUESTS.md` definiert eine neue vollständige Gruppendarstellung in der vorgegebenen Raumgeometrie. Bis zum Einbau ist die visuelle Freigabe dieses Moments eingeschränkt. Andere geprüfte Hauptkompositionen benötigen nach dieser Durchsicht keinen neuen Hintergrund oder neue Canon-Pose.
