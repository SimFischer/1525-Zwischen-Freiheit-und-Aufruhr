# Work-Asset-Auftrag · Kapitel 1–5 · abgeschlossen

## Einbau und Abnahme · 8. Oktober 2026

A01 ist **RESOLVED**. Das gelieferte `assets/chapter5/overlays/ch5_overlay_wounded_return_council.png` wird unverändert in den beiden vorgesehenen Pfaden verwendet. Originalmaße 1024×768, RGBA, SHA-256 `1dfca360a5288ccbcb50e084c78360c6a4a327aac387df151670a0e09f636ed8`. Sichtbare Alpha-Bounds bei Schwelle 16: `[190, 231, 486, 546]`; die gesamte Dialogzone ab y=568 ist transparent. Registrierung: Skalierung 1, links 0, oben 0.

Während der Ankunft sind die drei illustrierten Erwachsenen die Vordergrundgruppe. Canon-Sprecher erscheinen im bestehenden Dialogportrait; ihre Körper werden in diesem einen Moment nicht zusätzlich darübergelegt. Andere Beratungsszenen behalten ihre Canon-Gruppe. Der ursprüngliche Lieferbestand und sein ZIP bleiben unverändert; `chapter5_assets_additions.json` dokumentiert das neue Runtime-Asset. Die folgende Anforderung bleibt als Produktionshistorie erhalten.

`scripts/check-chapter-five-wounded.cjs` prüft beide tatsächlichen Nachrichtenpfade auf 1024×768, 820×640 und 1440×900, jeweils mit Dialog, Anschlussansicht, Reload und Fortsetzung zu den Berichten. Bildkomposition und freie Bedienbereiche wurden zusätzlich visuell geprüft. Kapitel-5-, Save- und Responsive-Regressionen ergänzen die Abnahme.

Stand: 8. Oktober 2026. Ein komplexes illustriertes Asset benötigt Neuproduktion. Es wurde in diesem Audit ausdrücklich **nicht** mit CSS-Skalierung, Cropping oder weiteren darübergelegten Illustrationen ersetzt. Dieser Auftrag verändert keine Canon-Identität und keine Storyentscheidung.

## A01 · Verletzte in der Abendberatung

**Ursprüngliche Schwere:** high. **Aktueller Status:** `RESOLVED`.

**Kapitel / Szene:** Kapitel 5, `ch5_escalation_message`, Pfade `peasant_band` und `theological_council`.

**Problem:** Die vorhandene kleine Gruppe steht links bei der großen Feuerstelle/Möblierung. Ihre sichtbare Körperhöhe und Fußposition lesen sich eher als Hintergrundvignette. Im Haufenpfad fehlen zugleich große Vordergrundfiguren, sodass der zentrale Krisenmoment leer wirkt. Im Beratungspfad konkurriert die kleine Gruppe mit viel größeren Canon-Figuren. Die Registrierung löst technische Platzierung, nicht die unpassende Illustrationsperspektive.

**Vorhandene Dateien:**

- Raumreferenz: `assets/chapter5/backgrounds/ch5_bg_theological_council_evening.png`, 1024×768.
- Ungeeigneter aktueller Layer: `assets/chapter5/overlays/ch5_overlay_wounded_return.png`.
- Raumvertrag: `data/chapter-five-staging.js`, `theological_council_evening`.
- Stilreferenzen: `assets/chapter3/characters/ch3_char_jakob_repaired.png`, `assets/chapter3/characters/ch3_char_anna_repaired.png`, `assets/chapter4/characters/ch4_char_local_preacher_talking.png`.
- Problemaufnahme: `artifacts/chapter5/band-escalation_message.png`; aktuelle registrierte Erstansicht allein zeigt diesen Pfad nicht. Auch Beratung mit Verletzten prüfen.

**Lieferdatei:** `ch5_overlay_wounded_return_council.png`, anschließend unter `assets/chapter5/overlays/`.

**Format:** PNG, 1024×768, RGBA mit echter Transparenz. Keine Hintergrundplatte. Nicht beschneiden; vollständige Leinwand und vollständige Körper erhalten.

**Perspektive:** Horizont y=34%, Fluchtpunkt x=53%, y=34%. Vordergrund-Fußlinie y=71%, sichtbare aufrechte Erwachsenenhöhe etwa 41% der Bildhöhe. Die verletzte Person darf gebeugt sein; Helfende definieren den Maßstab. Mitteltiefe y=58% / Körperhöhe 27%, hintere Tiefe y=48% / Höhe 16% nur als Referenz, keine zusätzliche Gruppe dort.

**Staging:** eine Gruppe aus einem verletzten Erwachsenen und zwei Helfenden im linken/mittleren Vordergrund. Geplante sichtbare Gruppe innerhalb x=10–58%, y=29–72%. Füße und Kontakt-/Bodenschatten an y≈71%. Blick der Helfenden zur verletzten Person und zum gemeinsamen sicheren Platz. Eine unblutige, unheroische Hilfesituation; keine zusätzlichen bewaffneten Hauptfiguren.

**Dialog-Safe-Area:** x=0–100%, y=74–100% vollkommen transparent, einschließlich Schatten. **Hotspot-Safe-Area:** x=68–96%, y=8–26% frei. Tisch/Bibel im Hintergrund dürfen weiter sichtbar sein; kein neues Möbelstück in den Laufweg setzen.

**Integration nach Lieferung:** Gruppe während der Ankunft als Fokus verwenden, statt sie zusätzlich vor drei großen Canon-Körpern zu stapeln. In genau diesem Nachrichtenmoment können Canon-Stimmen im bestehenden Dialogportrait sprechen; spätere Beratung stellt die vorhandene Gruppe wieder her. Diese Integrationsentscheidung ist erst nach Prüfung des gelieferten Assets umzusetzen. Neue Registrierung aus der tatsächlichen Alpha-Maske bestimmen; bei einer raumregistrierten Vollleinwand mit den oben genannten Koordinaten keine zusätzliche extreme Vergrößerung. Originalasset, Originalhashes und andere Szenen nicht überschreiben.

### Vollständig kopierbarer Work-Prompt

> Erstelle genau ein hochwertiges illustriertes Spielasset für „1525 – Zwischen Freiheit und Aufruhr“, ein historisches Point-and-Click-Adventure für ältere Schülerinnen und Schüler. Liefere `ch5_overlay_wounded_return_council.png` als PNG mit 1024×768 Pixeln, RGBA und echter Transparenz. Die gesamte Leinwand muss erhalten bleiben. Keine Hintergrundplatte, keine Schrift, kein UI.
>
> Verwende das beigefügte Raumasset `ch5_bg_theological_council_evening.png` als verbindliche Perspektiv- und Lichtreferenz. Zeige es nicht im Ergebnis. Es ist eine warme, gedämpft beleuchtete Beratungsstube um 1525. Verwende die beigefügten Jakob-, Anna- und Prediger-Canonbilder nur als Referenz für malerische Qualität, erwachsene Anatomie, Materialwirkung und Farbpalette. Erzeuge keine neuen Fassungen dieser benannten Figuren.
>
> Male eine einzige zusammenhängende Gruppe: ein anonymer verletzter Erwachsener, der von zwei anonymen Erwachsenen behutsam in einen sicheren Innenraum gestützt wird. Kleidung süddeutscher ländlicher Menschen um 1525: Leinen, Wolle, einfache Lederdetails, Creme, Braun, Ocker, gedecktes Grün oder Rost. Keine moderne Kleidung, Rüstungsspektakel, Fantasyornamente, Heldenpose, dramatische Blutspuren oder Schlachtdarstellung. Die Verletzung kann an vorsichtiger Haltung, Belastung eines Beins und Hilfe sichtbar werden. Im Mittelpunkt steht verantwortliche Hilfe unter Unsicherheit.
>
> Verbindliche Raumgeometrie der 1024×768-Leinwand: Horizont bei y=34%, Fluchtpunkt x=53%/y=34%. Die Gruppe steht im Vordergrund. Die Fußkontakte liegen bei y≈71%, also ungefähr 545 Pixeln; aufrechte Helfende sind sichtbar ungefähr 41% der Bildhöhe, rund 315 Pixel, hoch. Körperhöhe meint den tatsächlich sichtbaren Körper, nicht leeren transparenten Rand. Die Kopfregion aufrechter Helfender liegt damit ungefähr bei y=30%. Alle sichtbaren Teile der Gruppe liegen innerhalb x=10–58%, y=29–72%. Stelle Körper, Hände und Füße vollständig dar, mit plausiblen Gelenken, gegenseitigem Kontakt und gemeinsamem Bodenniveau. Die gebeugte verletzte Person darf niedriger erscheinen. Kein Mensch im falschen Miniaturmaßstab. Keine abgeschnittenen Hände oder abgetrennten Randfragmente.
>
> Helfende schauen zur verletzten Person bzw. zum gemeinsamen sicheren Platz. Blick, Hände und Gewichtsverlagerung sollen eine echte gemeinsam ausgeführte Hilfe erkennen lassen. Das warme Seiten-/Kerzenlicht und die Schattenrichtung müssen zur Raumreferenz passen. Kleine weiche Bodenkontaktschatten dürfen Teil des transparenten Layers sein. Keine schwarze Halokante, kein Glow und keine übertriebene Unschärfe. Der Boden selbst, Feuerstelle, Tür, Wände, Bibeltisch und Möbel dürfen nicht mitgemalt werden.
>
> Halte die vollständige Dialogzone x=0–100%, y=74–100% transparent. Halte x=68–96%, y=8–26% als Hotspotzone frei. Kein Körper, Gegenstand oder Schatten darf in die Dialogzone ragen. Die bestehende Möblierung im Referenzbild soll erkennbar bleiben; die Gruppe darf nicht auf einem Tisch oder in der Feuerstelle stehen. Berücksichtige die tatsächliche Bodenperspektive, nicht nur abstrakte Prozentangaben.
>
> Nicht einbrennen: Schrift, Zitate, Namen, Labels, Pfeile, Hotspots, Dialogkästen, Buttons, Rahmen, Pergamentflächen, zusätzliche Canon-Figuren, komplette Raumteile oder weitere Menschen im Hintergrund. Liefere eine saubere einzelne raumregistrierte transparente Illustration, keine Kontaktübersicht und keine Variantenmontage.
>
> Prüfe vor Lieferung die Komposition über der originalen Raumreferenz bei 1024×768 und proportional verkleinert: keine schwebenden Füße, kein Miniaturmaßstab, keine Riesen, keine falsche Lichtquelle, keine Möbelkollision, kein Körper in der Dialogzone und keine abgeschnittenen Gliedmaßen. Der verletzte Mensch muss ohne Erklärung erkennbar Hilfe erhalten; die Gruppe muss Teil der Stube wirken. Das Ergebnis soll ruhig, glaubwürdig und ernsthaft sein, keine dramatische Sieges- oder Verlustillustration.

### Abnahme nach Lieferung

1. Maße, RGBA, echte transparente Zonen und vollständige Alpha-Bounds prüfen.
2. Über Originalraum bei 1024×768, 820×640 und 1440×900 betrachten: Fußkontakt, Maßstab, Perspektive, Licht und Möbelkollision.
3. Nachricht tatsächlich im Haufen- und Beratungspfad öffnen; Portrait, Dialog und Fortsetzung müssen erreichbar bleiben. Keine zusätzliche gestapelte Hauptgruppe.
4. Keine Änderung von Entscheidungen, Ereignisprofil, Folgen oder Speicherdaten für die neue Illustration.
5. Manifest/Registrierung und Asset-/Responsive-Prüfungen aktualisieren; erst nach bestandenem Vergleich `BLOCKED_BY_ASSET` schließen.

## Andere Befunde

Wagenbote und falsche Rückzugsdarstellung wurden mit vorhandenen Canon-/Weltzustandsassets direkt korrigiert. Dafür sind keine neuen Bilder nötig. Nicht aktive ältere Lieferposen sind im Canon-Audit benannt; ihre Existenz allein ist kein Produktionsauftrag. Die physische iPad-Abnahme und der Unterrichtspilot sind keine Bildasset-Probleme.
