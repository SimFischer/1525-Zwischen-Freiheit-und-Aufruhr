# Figuren-Canon-Audit · Kapitel 1–5

Stand: 8. Oktober 2026. Alle 17 registrierten Identitäten wurden anhand von Portraits, Körpervarianten, aktuellen Raumkompositionen und Dialogfunktion verglichen. Kontaktbögen liegen lokal unter `artifacts/game-audit/canon-<id>.jpg`. Ein Portrait ist eine Gesprächsansicht, kein zusätzlicher Körper in der Szene. Originaldateien wurden nicht bearbeitet.

## Ergebnis

Die fünf Hauptfiguren behalten Gesicht, Haar/Bart, Alter, Kleidungspalette und Rollen. Sitzende Tavernenfiguren und stehende spätere Körper sind durch Haltung verschieden, keine neue Besetzung. Die bereits reparierten Anna-, Jakob- und Konrad-Körper bilden den Canon der späteren Kapitel. Keine neue konkurrierende Pose wurde erzeugt. Die neue Wagenkomposition behebt eine Rollenlücke, indem sie den vorhandenen Boten zeigt.

Vollständige aktive Canon-Körperbasis von Kapitel 4/5:

- `peter`: `assets/chapter2/characters/ch2_char_peter_neutral.png`; sichtbare Bounds `[0, 0, 284, 783]`; SHA-256 `ae216d280f7a23eaf3c41d802c43a288bed4c2729347047a735ac2cbe7ce1d95`.
- `anna`: `assets/chapter3/characters/ch3_char_anna_repaired.png`; sichtbare Bounds `[1, 0, 789, 1994]`; SHA-256 `ee4b759dd9763157bc4f1ab4613400dffc06f582f1f682ce3a44d5b158da24d4`.
- `jakob`: `assets/chapter3/characters/ch3_char_jakob_repaired.png`; sichtbare Bounds `[0, 0, 752, 2074]`; SHA-256 `dfa512a4975dc01e172d84c8b242f969dedd467e159b87f4613ffa1cd10e0d46`.
- `konrad`: `assets/chapter3/characters/ch3_char_konrad_repaired.png`; sichtbare Bounds `[0, 0, 803, 1892]`; SHA-256 `9c5f0993802e97234ee55a858cfa90ee2064b598ab1de56a84901767938bef55`.
- `matthes`: `assets/chapter3/characters/ch3_char_matthes_talking.png`; sichtbare Bounds `[94, 59, 452, 792]`; SHA-256 `276340c554f59b6d62d28959dc837a1c6d06dde38d66f789b4413cfdc2fd0604`.
- `preacher`: `assets/chapter4/characters/ch4_char_local_preacher_talking.png`; sichtbare Bounds `[43, 15, 469, 881]`; SHA-256 `8fc1510a141530e8adfb792c8a745f7608125a11a9f0e37725e75af069be4d91`.
- `envoy`: `assets/chapter4/characters/ch4_char_authority_envoy_talking.png`; sichtbare Bounds `[53, 15, 458, 881]`; SHA-256 `8aa1327cbe3e3ec425ef970aa5948cd48792ca6d14c316261be196989db6d0aa`.
- `band1`: `assets/chapter4/characters/ch4_char_peasant_band_member_1.png`; sichtbare Bounds `[27, 15, 485, 881]`; SHA-256 `c9c83364bff43919a42be96c34aaf24ef58dd0c80da54711dc51293460aa1353`.
- `band2`: `assets/chapter4/characters/ch4_char_peasant_band_member_2.png`; sichtbare Bounds `[73, 15, 439, 881]`; SHA-256 `17a563f604d4e31c8c8b5123303d573653bf348460302516db87b689b1221d56`.
- `overseer`: `assets/chapter2/characters/ch2_char_overseer_neutral.png`; sichtbare Bounds `[0, 0, 311, 864]`; SHA-256 `c3e7e03d5f2085c4d2f2b94e43260157aa1cad72aa201f7155c4f15bfbdf735a`.

## Figurenprüfung und registrierte Varianten

Die folgende Liste erfasst auch Kapitel-1-Portraits und registrierte Sitz-/Standvarianten. Zusätzliche alte Lieferdateien außerhalb des aktiven Mappings sind kein Auftrag zum Wiedereinbau.

### Peter (`peter`)

Bärtiger Mann mit braunem Haar, hellem Hemd und brauner Weste. Versorgung, Folgekosten und Vorsicht bleiben sein Maßstab; spätere Skepsis ist kein Wechsel zum theologischen Erklärer.

- states/neutral: `assets/characters/peter/portrait/peter_neutral.png`.
- states/concerned: `assets/characters/peter/portrait/peter_concerned.png`.
- states/skeptical: `assets/characters/peter/portrait/peter_skeptical.png`.
- states/determined: `assets/characters/peter/portrait/peter_determined.png`.
- states/angry: `assets/characters/peter/portrait/peter_angry.png`.
- sceneStates/neutral: `assets/characters/peter/scene/peter_scene_neutral.webp`.
- sceneStates/talking: `assets/characters/peter/scene/peter_scene_talking.webp`.

### Anna (`anna`)

Helle Haube, dunkelgrünes Kleid, ruhiger Blick und praktische Gesten. Gemeinschaft und konkrete Hilfe; neue Rückblicke greifen Vertrauen, Schutzfrage und Versorgung auf.

- states/neutral: `assets/characters/anna/portrait/anna_neutral.png`.
- states/concerned: `assets/characters/anna/portrait/anna_concerned.png`.
- states/sad: `assets/characters/anna/portrait/anna_sad.png`.
- states/thoughtful: `assets/characters/anna/portrait/anna_thoughtful.png`.
- states/engaged: `assets/characters/anna/portrait/anna_engaged.png`.
- sceneStates/neutral: `assets/characters/anna/scene/anna_scene_neutral.webp`.
- sceneStates/talking: `assets/characters/anna/scene/anna_scene_talking.webp`.

### Jakob (`jakob`)

Älterer Mann, zurückweichendes Haar, Bart, gedeckte Kleidung und Buchbezug. Unterscheidet Quellen, Wortlaut und Folgerung; keine plötzliche politische Musterlösung.

- states/neutral: `assets/characters/jakob/portrait/jakob_neutral.png`.
- states/reading: `assets/characters/jakob/portrait/jakob_reading.png`.
- states/thoughtful: `assets/characters/jakob/portrait/jakob_thoughtful.png`.
- states/skeptical: `assets/characters/jakob/portrait/jakob_skeptical.png`.
- states/explaining: `assets/characters/jakob/portrait/jakob_explaining.png`.
- sceneStates/neutral: `assets/characters/jakob/scene/jakob_scene_neutral.webp`.
- sceneStates/reading: `assets/characters/jakob/scene/jakob_scene_reading.webp`.
- sceneStates/talking: `assets/characters/jakob/scene/jakob_scene_talking.webp`.

### Der Verwalter (`overseer`)

Älterer Amtsmann mit dunkler Kopfbedeckung und schwarz-ockerner Amtskleidung. Zuständigkeit, Abgaben und Ordnung; kann auf Bedingungen reagieren, bleibt asymmetrischer Verhandlungspartner.

- states/neutral: `assets/chapter2/characters/ch2_char_overseer_neutral.png`.

### Margarethe (`margarethe`)

Grüne Kopfbedeckung und bäuerliche Alltagskleidung; bewährte reparierte Körperfassung. Haushaltsversorgung und Abgaben. Ähnliche gedeckte Palette wie Anna, aber eigenes Gesicht, Rolle und Name.

- states/neutral: `assets/chapter2/characters/ch2_char_margarethe_thinking.png`.

### Konrad (`konrad`)

Jüngerer Mann mit braunem Haar, kräftiger Gestik und erdiger Kleidung. Durchsetzung und Zeitdruck; Verletzung kann seine Risikowahrnehmung ändern, nicht rückwirkend seine Persönlichkeit.

- states/neutral: `assets/chapter2/characters/ch2_char_konrad_arguing.png`.

### Eine Reisende (`traveler`)

Ältere Reisende mit Kopfbedeckung; Beobachtung und fremder Erfahrungsraum. Keine neue Canon-Version eingeführt.

- states/neutral: `assets/chapter2/characters/ch2_char_older_peasant_woman_worried.png`.

### Sebastian Lotzer (`lotzer`)

Schreiber in bäuerlich-städtischer Kleidung, hellem Hemd und brauner Weste. Bündelt Forderungen und vermittelt; kein Ersatz für sämtliche Bauerninteressen.

- states/neutral: `assets/chapter3/portraits/ch3_portrait_lotzer_neutral.png`.
- states/talking: `assets/chapter3/portraits/ch3_portrait_lotzer_talking.png`.
- states/reading: `assets/chapter3/portraits/ch3_portrait_lotzer_reading.png`.
- sceneStates/neutral: `assets/chapter3/characters/ch3_char_lotzer_neutral.png`.
- sceneStates/talking: `assets/chapter3/characters/ch3_char_lotzer_talking.png`.
- sceneStates/reading: `assets/chapter3/characters/ch3_char_lotzer_reading.png`.

### Matthes (`matthes`)

Bärtiger Reisender, Kappe, ockerfarbener Mantel und Stab. Nachrichten, Druckverbreitung und äußere Öffentlichkeit; spricht über Beobachtung, nicht als allwissender Erzähler.

- states/neutral: `assets/chapter3/portraits/ch3_portrait_matthes_neutral.png`.
- states/talking: `assets/chapter3/portraits/ch3_portrait_matthes_talking.png`.
- states/reading: `assets/chapter3/portraits/ch3_portrait_matthes_reading.png`.
- sceneStates/neutral: `assets/chapter3/characters/ch3_char_matthes_neutral.png`.
- sceneStates/talking: `assets/chapter3/characters/ch3_char_matthes_talking.png`.
- sceneStates/reading: `assets/chapter3/characters/ch3_char_matthes_reading.png`.

### Georg (`georg`)

Älterer Mann mit Kappe, grauen Haarpartien und ockerner Weste. Eigene Gemeindeerfahrung, Portrait und Körper stimmen überein.

- states/neutral: `assets/chapter3/portraits/ch3_portrait_georg_neutral.png`.
- sceneStates/neutral: `assets/chapter3/characters/ch3_char_georg_neutral.png`.

### Katharina (`katharina`)

Helle Haube, rostrotes Kleid und grüne Schürze. Eigenständige Gemeindestimme; keine umbenannte Anna.

- states/neutral: `assets/chapter3/portraits/ch3_portrait_katharina_neutral.png`.
- sceneStates/neutral: `assets/chapter3/characters/ch3_char_katharina_neutral.png`.

### Hans (`hans`)

Jüngerer Mann mit dunkler Kappe und grüner Jacke. Eigene Position bei den Ankommenden; Portrait und Körper einheitlich.

- states/neutral: `assets/chapter3/portraits/ch3_portrait_hans_neutral.png`.
- sceneStates/neutral: `assets/chapter3/characters/ch3_char_hans_neutral.png`.

### Der Drucker (`printer`)

Kappe, dunkle Arbeitsschürze und helles Hemd. Handwerkliche und öffentliche Wirkung des Drucks; kein moderner Maschinenbediener.

- states/working: `assets/chapter3/portraits/ch3_portrait_printer_working.png`.
- states/neutral: `assets/chapter3/portraits/ch3_portrait_printer_working.png`.
- sceneStates/working: `assets/chapter3/characters/ch3_char_printer_working.png`.

### Der Prediger (`preacher`)

Prediger mit dunkler Kleidung und ruhiger Vortragsgestik. Ernsthafte Auslegung und Gemeindeverantwortung; nicht automatisch Müntzer oder bloßer Fanatiker.

- states/neutral: `assets/chapter4/portraits/ch4_portrait_local_preacher_neutral.png`.
- states/talking: `assets/chapter4/portraits/ch4_portrait_local_preacher_talking.png`.
- sceneStates/neutral: `assets/chapter4/characters/ch4_char_local_preacher_neutral.png`.
- sceneStates/talking: `assets/chapter4/characters/ch4_char_local_preacher_talking.png`.

### Der Bote (`envoy`)

Dunkel gekleideter Bote mit Amts-/Nachrichtenrolle. Am Wagen jetzt derselbe sichtbare Körper wie später; Gefangenenrolle verändert seine Lage, nicht seine Identität.

- states/neutral: `assets/chapter4/portraits/ch4_portrait_authority_envoy_neutral.png`.
- states/talking: `assets/chapter4/portraits/ch4_portrait_authority_envoy_talking.png`.
- sceneStates/neutral: `assets/chapter4/characters/ch4_char_authority_envoy_neutral.png`.
- sceneStates/talking: `assets/chapter4/characters/ch4_char_authority_envoy_talking.png`.

### Ein Bauer am Lager (`band1`)

Älterer bärtiger Mann, braune Kappe, rotes Obergewand und langes Werkzeug. Eigene Haufenstimme, konsistent in 4/5.

- states/neutral: `assets/chapter4/portraits/ch4_portrait_peasant_band_member_1.png`.
- sceneStates/neutral: `assets/chapter4/characters/ch4_char_peasant_band_member_1.png`.

### Ein anderer Bauer (`band2`)

Jüngerer Mann, rostfarbene Kappe, grünes Obergewand und Stangenwerkzeug. Vom ersten Haufenmitglied unterscheidbar; konsistent in 4/5.

- states/neutral: `assets/chapter4/portraits/ch4_portrait_peasant_band_member_2.png`.
- sceneStates/neutral: `assets/chapter4/characters/ch4_char_peasant_band_member_2.png`.

## Abweichungen, Altmaterial und verbleibende Grenzen

- Kapitel 2 verwendet für Anna und Konrad bereits die reparierten Kapitel-3-Körper; für Margarethe die reparierte Kapitel-2-Fassung. Diese Mappings bleiben erhalten. Spätere Kapitel verwenden Alpha-Bounds statt die leere Leinwandhöhe als Körpermaß.
- Im Lieferinventar vorhandene ältere Gesten, etwa die Verwalter-Zeigefassung mit auffälligem Randfragment, sind nicht automatisch der aktive Canon. Die aktuellen Kompositionen verwenden seine neutrale Amtsfassung. Alte Dateien bleiben zur Nachvollziehbarkeit gespeichert; kein Löschen oder neuer Bildauftrag ohne Runtime-Bedarf.
- Ähnliche soziale Kleidung ist historisch plausibel, aber kein Identitätsnachweis. Namen, eigenes Portrait, Ort und Gesprächsfunktion bleiben erforderlich; insbesondere Margarethe/Anna und Lotzer/Peter wurden separat verglichen.
- Körperüberlagerungen wurden in Raumaufnahmen geprüft. Einzelportraits im Dialog dürfen gegenüber Körpern größer sein, weil sie eine andere Darstellungsebene haben.
- A01 betrifft anonyme Verletzte und ihre Raumwirkung, keine geänderte Identität einer Canon-Figur. Dafür liegt ein Work-Auftrag vor; der Krisenmoment ist visuell nicht abschließend freigegeben.
- Wiedererkennbarkeit für neue Lernende ist redaktionell plausibel, noch nicht empirisch mit einer Lerngruppe geprüft.
