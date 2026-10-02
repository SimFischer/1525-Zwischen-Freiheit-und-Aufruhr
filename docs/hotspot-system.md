# Gemeinsames Hotspot-System

Alle Kapitel verwenden `hotspot()` aus `js/hotspots.js`. Die Funktion erstellt
nur die Darstellung; bestehende Aktionen, Freischaltungen und Speicherfelder
bleiben bei den Szenen.

| Typ | Einsatz | Material |
| --- | --- | --- |
| `object` | Gegenstände, Quellen, untersuchbare Bereiche | Warmes Pergament mit unregelmäßiger Kante |
| `path` | Ortswechsel, Ausgänge | Dunkler Holzwegweiser mit Pfeilspitze; `direction:'left'` für Rückwege |
| `action` | Figuren, Gespräche, Handlung | Leder-/Holzschild |

Neue Kapitel verwenden beispielsweise
`hotspot('Mit Anna sprechen', 'character', {kind:'action', classes:'anna-marker', attrs:'data-character="anna"'})`.
Beschriftungen und Attribute stammen aus vertrauenswürdigen lokalen Inhalten;
variable Texte vorher mit der vorhandenen HTML-Escape-Funktion schützen.

`css/art-direction.css` definiert Materialien und sichtbare Bedienzustände.
Die drei originalen PNGs unter `assets/ui/hotspots/v2/` liefern die tatsächlichen
Materialien. Ein neunteiliger Bildrahmen passt die Schreibfläche an die Länge
der HTML-Beschriftung an und erhält die handgefertigten Kanten. Es gibt keine
zusätzliche rechteckige CSS-Karte hinter den Bildern. `direction:'left'`
spiegelt ausschließlich die Bildebene des Holzwegweisers, niemals den Text.
`css/staging.css` definiert ausschließlich die Anker der jeweiligen Szene.
`hotspot-sign` kennzeichnet ein kompaktes Schild ohne zusätzliche Objektfläche.
Die Beschriftung eines transparenten Figuren-/Objektbereichs darf daneben liegen
und bleibt selbst anklickbar. Nicht verfügbare Marker bleiben verborgen.

Verfügbare Marker sind im Ruhezustand sichtbar und mindestens 44 Pixel hoch.
Hover, Touch und Fokus hellen das Material dezent auf; Tastaturfokus unterstreicht
die Beschriftung. Keine leuchtenden Flächen oder technischen Rechtecke über Figuren.

Jeden Anker gegen das tatsächliche Bild prüfen: nahe am Ziel, außerhalb von
Gesichtern, Händen und wichtigen Gegenständen. Wege markieren den Zugang.
Mindestens bei 1024×768 und einer kleineren iPad-Ansicht auf Überlappung,
Erreichbarkeit und horizontales Überlaufen prüfen. Kapitel 1 zeigt den
Türwegweiser weiterhin erst am bestehenden Abschlusscheckpoint.

## Prüfung am 3. Oktober 2026

Kapitel 1: Fenster, Krug, Kerze, Flugblatt, Peter, Jakob, Anna und die erst am
Abschluss freigegebene Tür verwenden die gemeinsamen Typen. Beschriftungen
liegen außerhalb der Gesichter und Tischgegenstände; schmale Ansichten haben
eigene Anker. Auf Telefonbreite nutzt der Türwegweiser den freien Bereich
oberhalb des Raumbildes.

Kapitel 2: alle Wege im Dorf-Hub, die drei Waldspuren, der Rückweg und das
Gespräch mit dem Verwalter verwenden dieselbe Komponente. Der Weg zur Taverne
wurde vom später sichtbaren Verwalter und dessen Schatten abgerückt.
Frondienst, Abgaben, Versammlung und ihre Folgeaufgaben wurden über sämtliche
vorhandenen Checkpoints geprüft; ihre Aufgabenbedienung bleibt bestehen.

`scripts/check-world-hotspots.cjs` prüft sichtbare Beschriftungen, Mindestgröße,
Überlappung, vollständige Darstellung, Tastaturfokus, Touch-Lesen und den
verborgenen frühen Exit bei 1024×768, 820×640 und 390×844.
Die bestehenden Kapitel-, Admin-/Save-, Konsequenz- und Inszenierungsprüfungen
decken zusätzlich Szenenfolgen, Aufgaben, Quellen, Notizbuch und spätere
Freischaltungen ab. Die Inszenierungsprüfung umfasst alle 27 Kapitel-2-Zustände
bei 1440×900, 1024×768 und 820×640.
