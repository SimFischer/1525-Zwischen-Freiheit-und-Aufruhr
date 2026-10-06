# Kapitel 5 – Asset-Audit

Geprüfter Ausgangsstand: `7670c339b9724d18288c7873c917d6f61d0579ca`. Kapitel 1–4, Canon-Bounds, Kapitel 4-Staging, globaler Materialstil und Hotspot-System wurden vor Produktion geprüft. Kapitel 5 bestand im Repository als gespeicherter Handoff und Ausblick; neue Runtime-Story wurde nicht erfunden.

## Neue, verwendbare Assets

43 finale PNGs:10 Raumplatten,16 transparente Layer,13 transparente Requisiten und4 ruhige historische Arbeitsflächen. ImageGen im eingebauten Tool-Modus; jeder Assettyp einzeln erzeugt. Technische Normalisierung der Seitenlänge bewahrt Bildverhältnis und Alpha.

| Typ | Datei | Pfad / Verwendung |
|---|---|---|
| backgrounds | `ch5_bg_peasant_camp_morning.png` | A |
| backgrounds | `ch5_bg_road_with_peasant_band.png` | A |
| backgrounds | `ch5_bg_road_stopped_dues_cart.png` | A |
| backgrounds | `ch5_bg_camp_prisoner.png` | A/E |
| backgrounds | `ch5_bg_negotiation_chamber.png` | B |
| backgrounds | `ch5_bg_theological_council_evening.png` | C |
| backgrounds | `ch5_bg_churchyard_dispute.png` | D |
| backgrounds | `ch5_bg_village_prisoner_courtyard.png` | B/C/D/E |
| backgrounds | `ch5_bg_road_troops_approaching.png` | F |
| backgrounds | `ch5_bg_village_after_crisis.png` | G |
| overlays | `ch5_overlay_camp_supply.png` | A |
| overlays | `ch5_overlay_camp_departure.png` | A |
| overlays | `ch5_overlay_armed_tension.png` | A |
| overlays | `ch5_overlay_negotiation_broken.png` | B |
| overlays | `ch5_overlay_delegation_inside.png` | B |
| overlays | `ch5_overlay_order_group.png` | D |
| overlays | `ch5_overlay_justice_group.png` | D |
| overlays | `ch5_overlay_wounded_return.png` | C |
| overlays | `ch5_overlay_people_evacuating.png` | F |
| overlays | `ch5_overlay_group_retreat.png` | A, F |
| overlays | `ch5_overlay_distant_troops.png` | A |
| overlays | `ch5_overlay_after_defeat.png` | G |
| overlays | `ch5_overlay_after_negotiation_collapse.png` | G |
| overlays | `ch5_overlay_after_protection.png` | G |
| overlays | `ch5_overlay_after_fragmentation.png` | G |
| overlays | `ch5_overlay_after_deescalation.png` | G |
| props | `ch5_prop_tools_weapons_bundle.png` | A |
| props | `ch5_prop_food_supplies.png` | A |
| props | `ch5_prop_simple_banner.png` | Detailansicht / übergreifend |
| props | `ch5_prop_dues_cart_stopped.png` | Detailansicht / übergreifend |
| props | `ch5_prop_negotiation_terms.png` | B |
| props | `ch5_prop_village_petition.png` | B |
| props | `ch5_prop_seal_and_wax.png` | B |
| props | `ch5_prop_bible_council.png` | C |
| props | `ch5_prop_luther_text_stack.png` | C |
| props | `ch5_prop_emergency_report.png` | C, F |
| props | `ch5_prop_competing_flyers.png` | D |
| props | `ch5_prop_public_bible.png` | D |
| props | `ch5_prop_prisoner_rope_loose.png` | Detailansicht / übergreifend |
| ui | `ch5_ui_theological_arguments_table.png` | Detailansicht / übergreifend |
| ui | `ch5_ui_luther_four_thoughts.png` | Detailansicht / übergreifend |
| ui | `ch5_ui_three_reports.png` | Detailansicht / übergreifend |
| ui | `ch5_ui_religion_functions.png` | Detailansicht / übergreifend |

## Wiederverwendeter Canon

| Figur | Original | SHA-256 |
|---|---|---|
| peter | `assets/chapter2/characters/ch2_char_peter_neutral.png` | `ae216d280f7a23eaf3c41d802c43a288bed4c2729347047a735ac2cbe7ce1d95` |
| anna | `assets/chapter3/characters/ch3_char_anna_repaired.png` | `ee4b759dd9763157bc4f1ab4613400dffc06f582f1f682ce3a44d5b158da24d4` |
| jakob | `assets/chapter3/characters/ch3_char_jakob_repaired.png` | `dfa512a4975dc01e172d84c8b242f969dedd467e159b87f4613ffa1cd10e0d46` |
| konrad | `assets/chapter3/characters/ch3_char_konrad_repaired.png` | `9c5f0993802e97234ee55a858cfa90ee2064b598ab1de56a84901767938bef55` |
| matthes | `assets/chapter3/characters/ch3_char_matthes_talking.png` | `276340c554f59b6d62d28959dc837a1c6d06dde38d66f789b4413cfdc2fd0604` |
| preacher | `assets/chapter4/characters/ch4_char_local_preacher_talking.png` | `8fc1510a141530e8adfb792c8a745f7608125a11a9f0e37725e75af069be4d91` |
| envoy | `assets/chapter4/characters/ch4_char_authority_envoy_talking.png` | `8aa1327cbe3e3ec425ef970aa5948cd48792ca6d14c316261be196989db6d0aa` |
| band1 | `assets/chapter4/characters/ch4_char_peasant_band_member_1.png` | `c9c83364bff43919a42be96c34aaf24ef58dd0c80da54711dc51293460aa1353` |
| band2 | `assets/chapter4/characters/ch4_char_peasant_band_member_2.png` | `17a563f604d4e31c8c8b5123303d573653bf348460302516db87b689b1221d56` |
| overseer | `assets/chapter2/characters/ch2_char_overseer_neutral.png` | `c3e7e03d5f2085c4d2f2b94e43260157aa1cad72aa201f7155c4f15bfbdf735a` |

Alle Originaldateien bleiben unverändert. Peter, Anna, Jakob, Konrad, Matthes, Verwalter, Prediger und Bauernhaufen-Mitglieder wurden nicht neu gestaltet. Die Ausgabegröße wird aus dem sichtbaren Körper bestimmt. Weitere Originalposen und Portraits bleiben im vorhandenen Kapitel 2–4-Canon verfügbar; kein neuer konkurrierender Canon.

## Was aus Kapitel 4 weiter genutzt werden darf

- Die Dorf-Hub-Platte ist Architektur-/Kamerareferenz für die Nachwirkung; sie bleibt selbst unverändert.

- Canon-Figuren, gemessene Körper-Bounds, neutrale/Sprechzustände und vorhandene Portraits.

- Historische Quellenframes und der HTML-Quellenrenderer für die späteren exakten Luthertexte.

- Globale Hotspot-PNGs sowie die vorhandene Pergament-/Holz-/Leder-Sprache.

- Ausdrücklich nicht wiederverwenden: alte große Gruppen-Overlays, aus Kapitel 4 ausgeschiedene Raumplatten und alte Tür-/Wagenzusätze auf den neuen Platten. Neue Räume unterscheiden die vier Wege bereits ohne Text.

## Bewusst keine weiteren Bildassets

Keine neuen Standfiguren oder Portraits nötig. Verletzter und unterstützende Person stehen als kleiner Krisenlayer zur Verfügung; die Gefangenen-Testszene verwendet den bestehenden Amtsboten. Anonymer Guard im Endzustandslayer ist keine neue dialogische Hauptfigur.

Keine zusätzliche Dokumentserie: leere Requisiten und vier große Arbeitsflächen decken die visuellen Anforderungen ab; exakte Quellenworte kommen später als HTML. Keine Audioassets oder neue Musik. Das angeforderte lose Seil liegt als optionale Requisite bei, wird aber in keiner Gefangenenszene automatisch verwendet.

## Gezielte Korrekturen

Beim Delegationslayer wurde eine unerwünschte Holzplatte entfernt. Der Verhandlungsabbruch enthält keine zusätzliche Tür-/Bankarchitektur. Im Ruhe-Endzustand liegt das Banner nieder, statt eine Siegespose vorzugeben. Verschiedene Raummaßstäbe wurden anhand der Testkompositionen festgelegt.

## Branch-spezifisch und nicht kombinierbar

Die Pfade A/B/C/D verwenden Morgenlager/Verhandlungsraum/Abendberatung/Kirchhof. Gemeinsame Krise E hat einen eigenen Hof, Eskalation F eine Straße mit fernen Truppen, G den vertrauten veränderten Dorfplatz.

Die vollständigen Zuordnungen, Figuren pro Szene, registrierten Overlays und Konfliktlisten stehen im Manifest und Staging-Guide. Endzustandslayer ausschließlich alternativ; Kirchhofgruppen dagegen gemeinsam.

## Offene Arbeit außerhalb dieser Runde

Keine offene Pflicht-Assetlücke. Die vollständige Kapitel 5-Runtime einschließlich endgültiger Fachtexte, Branch-Regeln, Quellenbelege, Auswertung und Speicherintegration ist die ausdrücklich folgende Runde. QA-Beispielberichte sind erfunden und dürfen nicht als historische Quelle ausgegeben werden. Neue Kombinationen jenseits der geprüften Varianten brauchen erneut Staging-QA.
