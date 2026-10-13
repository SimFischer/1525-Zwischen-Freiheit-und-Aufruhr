# Fortsetzungscodes für 1525

## Architektur

Das lokale Autosave bleibt unter `1525.freedom.save.v1` in localStorage erhalten. Es gibt keinen automatischen Upload. Nur „Fortsetzungscode erzeugen“ sendet einen vorher validierten, ausschließlich im Browser verschlüsselten Snapshot.

`state → normalizeSavedState → Snapshot → PBKDF2/AES-GCM → POST /api/continuation → privater Vercel Blob`.

Beim Laden: Code normalisieren, Lookup-ID ableiten, verschlüsseltes Paket herunterladen, im Browser entschlüsseln, Snapshot und State validieren/migrieren, ggf. Ersetzen des lokalen Spielstands bestätigen, lokal speichern und direkt die gespeicherte Szene anzeigen. Der Code ist ein unveränderlicher Stand zu einem Zeitpunkt; erneut sichern erzeugt einen neuen Code.

- `js/save-system.js`: `normalizeSavedState` als gemeinsame, storage-unabhängige lokale und Online-Validierung; bestehende Migrationen und Sanitizer für Kapitel 4/5/6, danach `syncConsequences`. `load()` liest weiterhin nur lokale/sessionbezogene Daten und ruft diese gemeinsame Funktion auf.
- `js/continuation.js`: ES-Modul, zentrale Domain, Codeformat/KDF, Snapshotprüfung, Verschlüsselung, Netzwerk/Fehler. Kein globales Window-Objekt.
- `js/continuation-ui.js`: historische Speicheransicht, Eingabe, Kopieren mit Fallback, Ersatzbestätigung und dezente lokale Speicheranzeige.
- `api/continuation.js`: ausschließlich verschlüsselte Daten; private, unveränderliche Blob-Dateien und Ablaufprüfung.

## Domain und Deployment

Verwendete zentrale Production-Basis: `https://luther-und-die-bauernkriege.vercel.app`.

API: `https://luther-und-die-bauernkriege.vercel.app/api/continuation`.

Die Vercel-Projektübersicht bestätigt die stabile Production-Domain, das Repository `SimFischer/1525-Zwischen-Freiheit-und-Aufruhr` und Production-Branch `main`. Die angegebene URL `https://luther-und-die-bauernkriege-d0mc17qws-herr-fischer.vercel.app` ist eine einzelne Deployment-Adresse und bleibt nicht die dauerhafte Client-Basis. Sie ist für den vorgegebenen aktuellen Ursprung in CORS berücksichtigt.

Die Haupt-App bleibt auf GitHub Pages. Vercel dient für die Fortsetzung ausschließlich als API. Das neue minimale `package.json` nutzt Node 22.x, ES-Module und `@vercel/blob` 2.8.1 mit Lockdatei. `vercel.json` verwendet Frankfurt (`fra1`), 30 Sekunden Funktionsdauer und den kryptografischen/State-/API-Unit-Test als Buildprüfung. Keine Frontend-Buildpipeline.

Notwendig: im **neuen** Vercel-Projekt ein **privater eigener Blob-Store** und `BLOB_READ_WRITE_TOKEN` für Production (Preview bei gewünschten Preview-Tests zusätzlich). Keine Token im Repository, Browser, Testausgaben oder Abschlussbericht. Der Browser erhält niemals den Token. Der alte Dienst `im-zeichen-der-wende` und dessen Store werden nicht verändert.

Das Lesen der Vercel-Umgebungsvariablen wurde durch die automatische Freigabeprüfung wegen möglicher Geheimnisexposition abgelehnt. Daher keine Variablenwerte ausgelesen; die tatsächliche Verfügbarkeit wird mit Save/Load an der API geprüft. Bei fehlendem Token liefert POST 503 `Storage not configured`; dies ist `BLOCKED_BY_VERCEL_CONFIG`, nicht ein Anlass für einen anderen Speicherdienst.

## Codes und Verschlüsselung

- Acht kryptografisch zufällige Crockford-Base32-Zeichen, 40 Bit; Alphabet `0123456789ABCDEFGHJKMNPQRSTVWXYZ`.
- Anzeige `XXXX-XXXX`; Eingabe akzeptiert Kleinbuchstaben, Leerzeichen und Bindestriche. Wie in der Vorlage werden O zu 0 und I/L zu 1 normalisiert. U ist ungültig.
- PBKDF2 mit SHA-256, **200000 Iterationen**, eigener Salt **`1525-short-v1`**, 512 abgeleitete Bits. Die erste 256-Bit-Hälfte ist die hexadezimale Lookup-ID, die zweite der AES-256-GCM-Schlüssel.
- Je Snapshot zufällige 12-Byte-IV. AES-GCM authentifiziert zusätzlich die App-/Formatkennung `1525-zwischen-freiheit-und-aufruhr:1`.
- Die API bekommt ausschließlich `p_id`, `p_payload.v`, `iv`, `data` (Base64-Ciphertext). Weder Code noch Klartext-State werden übertragen oder serverseitig geloggt. Fetch ohne Credentials und ohne Referrer.
- Client wiederholt 409-Kollisionen mit neuen Zufallscodes, höchstens fünf Versuche. Server schreibt atomar mit `allowOverwrite:false`, `addRandomSuffix:false`, `access:'private'`.
- Eigener Blob-Namespace **`1525-v1/<64-stellige-id>.json`**. Keine alten wende-Pfade/Saltwerte.

Der Code ist der Zugriffsschlüssel und muss aufbewahrt werden. 40 Bit sind keine allgemeine Hochsicherheitslösung für besonders schutzbedürftige Daten; dies ist das ausdrücklich gewünschte kurzlebige Schulkonzept mit verlangsamter Ableitung, Beschränkungen und ohne Namens-/Kontenerfassung. Der Server implementiert keine Entschlüsselung.

## Snapshot und State-Mapping

```json
{"app":"1525-zwischen-freiheit-und-aufruhr","format":1,"savedAt":"ISO-Zeitpunkt","state":{}}
```

Snapshotformat 1 und State-Version 4 sind getrennt. Gültige ältere State-Versionen 1–3 nutzen dieselben Migrationen wie lokale Saves. Fremde App-IDs, fremde Snapshotformate und unbekannte zukünftige Stateversionen werden abgelehnt.

Enthalten sind die kanonischen Save-Felder: Szene/Kapitel/Phase, Fortschritt, Entscheidungen und choiceTexts, world, dimensions/relationships, Notebook/Quellen, Minigamefortschritt, Chapter-2/3/4/5/6-Felder sowie notwendiger Dialogindex/Antwortzustand. Orientierung und Wahrnehmungen werden wie bei lokalem Load aus Entscheidungen und den vorhandenen Konsequenzdaten deterministisch wiederhergestellt.

Kapitel 6 bleibt vollständig erhalten: openingQuestion, freedomThen/freedomNow, Netzwerklinks und ausgewählte Begründungen samt eigenen `networkExplanations`, Lutherdeutung/Begründung/Gegenargument, memoryEvidence, Luther/Müntzer-Gewichtung, judgmentDimensions mit `dimensionReasoning`, finale Position und Belege, counterArgument, finalJudgmentText, finalFreedomDefinition, completed, epilogue und epilogueSeen.

`uiMode` und geöffnete DOM-Overlays gehören nicht zum Snapshot. Die für die tatsächliche Spielstelle notwendigen Dialoge, Aufgaben und Arbeitszustände werden erhalten. Kein Testzustand: `isTestMode()` blockiert Save und Load, ebenso ein gespeichertes `consequences.adminScenario`.

Gemeinsame strukturelle Prüfung: bekannte Version/Szene, Record-/Listenstrukturen, endliche Zahlen, sichere JSON-Datentypen, max. 24 Ebenen/100000 Knoten, begrenzte Arrays/Texte; keine gefährlichen Objektkeys (`__proto__`, `constructor`, `prototype`, `toString`, `valueOf`). Kein Prototyp-Merging ungeprüfter Downloadobjekte. Kapitel-Sanitizer begrenzen/ergänzen die vorhandenen fachlichen Felder. Validierung und Verschlüsselung bearbeiten eine Kopie, nicht den laufenden Stand.

## API, CORS und TTL

POST JSON:

- `{"action":"save","p_id":"…","p_payload":{"v":1,"iv":"…","data":"…"}}`: 201 mit `expires_at`; Kollision 409.
- `{"action":"load","p_id":"…"}`: 200 mit verschlüsseltem Payload; fehlend/abgelaufen 200 `null`.

TTL **90 Tage ab Erstellung**, gespeichert als `expires_at`, genaues Datum in der Speicheransicht. Abgelaufene Dateien werden beim Load gelöscht. Es gibt keine periodische Vollbereinigung des Stores; nie erneut abgefragte abgelaufene Blobs benötigen ggf. eine getrennte spätere Verwaltungsbereinigung, bleiben aber nicht abrufbar.

CORS erlaubt nur `https://simfischer.github.io` (ohne Repositorypfad), die überprüfte Production-Domain, die vorgegebene Deployment-Domain und echte localhost/127.0.0.1/IPv6-Loopback-Origins. Kein `*`, keine Credentials. OPTIONS 204, andere Methoden außer POST 405, No-Store und Vary: Origin. Requests ohne Origin sind für Server-/CLI-Prüfungen möglich.

Best-effort pro Funktionsinstanz/IP: 600 Requests/Minute, um Klassen hinter einer Schul-IP nicht auszuschließen. Ablaufende Einträge werden bereinigt, max. ca. 10000 IP-Einträge. Kein global verteilter Rate-Limiter; Vercel Firewall kann zusätzlich begrenzen. SDK-/Storagefehler geben ausschließlich neutrale Fehler, keine Token/Stacktraces zurück.

## Größenmessung

Gemessener repräsentativer Kapitel-6-Snapshot: **9195 UTF-8-Bytes** (ca. 9 KB). Worst Case: alle 28 Netzwerkbegründungen und alle übrigen eigenen Kapitel-6-Felder mit jeweils 12000 dreibytegroßen Zeichen:

- Klartextsnapshot: **1446032 Bytes**.
- Base64-Ciphertext: **1928064 Zeichen**.
- kompletter API-Save-Request: **1928209 Bytes**.
- Client-Snapshotlimit: **2097152 Bytes (2 MiB)**.
- maximaler Ciphertext: aus 2 MiB plus 16-Byte-GCM-Tag abgeleitet.
- Server-Requestlimit: **3145728 Bytes (3 MiB)**, unter dem Vercel-Funktionslimit.

Limits werden vor Upload und nach Download geprüft; serverseitig sowohl Content-Length als auch tatsächliche UTF-8-Länge. Kein willkürliches Übernehmen des 180-KB-Limits der Vorlage.

## Bedienung und Fehler

Start mit lokalem Save: „Auf diesem Gerät fortsetzen“, „Neues Spiel“, „Mit Code fortsetzen“. Ohne Save: „Neues Spiel“, „Mit Code fortsetzen“. Während des Spiels: Spielmenü → „Spielstand sichern“, im Epilog direkter Speicherzugang. Lokale Speicheranzeige kurz und dezent; Fehler sichtbar. Keine Speicherung von Namen oder PDF-Formulareingaben im Fortsetzungscode.

Vor dem Ersetzen eines vorhandenen lokalen Saves erscheint zwingend die Bestätigung; Abbrechen erhält den ursprünglichen Stand unverändert. Erst nach erfolgreicher Entschlüsselung/Validierung und ggf. Bestätigung wird übernommen. Danach direkter Wiedereinstieg, lokale Sicherung und „Spielstand geladen.“.

Ungültiger, fehlender/abgelaufener, manipulierter und netzwerkbedingt nicht abrufbarer Code haben unterschiedliche Meldungen. Kein Internetausfall blockiert das lokale Spiel. Timeout nach 20 Sekunden. Kopieren über Clipboard API, ersatzweise Auswahl/Kopierfunktion; ein manuelles Kopiermenü bleibt möglich. Beschriftete Inputs, Fokusführung, aria-live und mindestens 44-px-Touchziele; interne Modal-Scrollbereiche bei kleineren Ansichten.

## Prüfungen

`npm run build` / `node scripts/check-continuation.cjs`: Formate/Normalisierung/Zufall, deterministische PBKDF2, verschiedene IDs, AES-Roundtrip/falscher Code/manipulierter Ciphertext/IV, Kapitel 1/3/5/6/kompletter Abschluss, Absätze/ß/Umlaute/typografische Zeichen/1500+ Zeichen, alte Save-Versionen, PDF-Reportgleichheit, sichere Strukturprüfung/Prototypangriffe, private/immutable Blob-Optionen, Kollisionen/Wiederholung, Ablauf/Löschen, CORS, Größenlimits, großzügiger NAT-Rate-Limiter und Erholung, nicht konfigurierte Storage-API, offline und Testmodussperre.

`node scripts/check-continuation-browser.cjs`: zwei vollständig getrennte Browsersitzungen mit echtem Browser-Krypto und lokal simulierter API, in Edge und WebKit mit Touchkontext. Vollständiges Kapitel 6 und Notebook, Freitextänderung/Autosave/Reload, Bestätigung/Abbrechen/Überschreiben, unterschiedliche Fehlermeldungen, Clipboard/Fallback, komplette Schlussseite nach Gerätewechsel und tatsächlicher PDF-Download mit gleichem fachlichem Report. 1024×768 und 820×640, keine horizontale Scrollbar, erreichbare Buttons, kein Testupload.

Bestehende Admin-/Save-, Kapitel-6-, Kapitel-5-State-, Story-Recap- und Epilog-Tests verwenden weiterhin die gemeinsame lokale Save-Architektur. Prüfartefakte und Referenzdateien liegen ausschließlich unter dem ignorierten `artifacts/continuation/`.

Production-End-to-End-Abnahme erfolgt nach Push: GitHub Pages → neue API → neue isolierte Browsersitzung mit leerem localStorage → exakt derselbe normalisierte Save und derselbe Dossier-Report; anschließend Autosave/Reload/PDF. Deploymentstatus und konkrete etwaige Vercel-Blockaden im Abschlussbericht nennen. Physisches iPad nicht automatisiert verfügbar; WebKit/Touch ist eine Engine-/Layoutprüfung.


## Production-Konfiguration und bestandene Live-Abnahme

Die anfängliche Production-Blockade ist **aufgehoben**. Die erste Bereitstellung antwortete mit 503 „Storage not configured“, weil Vercels neue OIDC-Verbindung allein nur `BLOB_STORE_ID` und `BLOB_WEBHOOK_PUBLIC_KEY` gesetzt hatte, nicht die von der API erwartete Variable `BLOB_READ_WRITE_TOKEN`.

Am 13. Oktober 2026 wurde nach ausdrücklicher Freigabe des Nutzers der vorhandene eigene **private** Store `luther-und-die-bauernkriege-save` für **Production** mit „Add a read-write token env var to this connection“ verbunden. Vercel setzte den Token automatisch, „Sensitive“ blieb aktiviert. Tokenwerte wurden weder ausgelesen noch kopiert oder angezeigt. Die Verbindung ist auf die freigegebene Production-Umgebung beschränkt; das alte Spiel und sein Store blieben unverändert. Die neue Production-Bereitstellung übernahm die Variable.

Die reale Abnahme wurde danach in **Edge und WebKit** bestanden:

- GitHub Pages als einzige sichtbare Spielseite, echte Vercel-API und eigener privater Blob-Store; keine simulierte API in dieser Abnahme.
- Normales neues Spiel: Code erzeugt und in einer zweiten, vollständig leeren Browsersitzung geladen; derselbe normalisierte State.
- Absichtlich synthetischer Kapitel-6-QA-Stand in einer normalen Sitzung, ohne Admin-/Debugmodus: lange Texte mit Absätzen, Netzwerk und Begründungen, alle Urteilsfelder, Notebook/Quellen, Abschluss und epilogueSeen unverändert übertragen.
- Lokales Speichern und erneutes Reload/Fortsetzen nach dem Gerätewechsel erhalten den Stand.
- Dossier-Report vor und nach dem Transfer identisch; tatsächlicher PDF-Download nach dem Transfer erfolgreich. Die Prüfung bezieht sich auf Inhalte, nicht zufällige PDF-Metadaten/Datei-IDs.
- Production-CORS: GitHub-Pages-Origin erlaubt, OPTIONS 204; fremde Origin 403. Regulärer Load eines unbekannten Codes 200/null. Erfolgreiches Save/Load bestätigt die verfügbare Production-Speicheranbindung, ohne Geheimnisse zu lesen.
- Touchansichten 1024×768 und 820×640; kein physisches iPad. Automatische lokale Browser-/API-/Krypto-/Fehlerfall-Tests und bestehende Kapitel-/Save-/Epilog-Prüfungen weiterhin bestanden.

Es besteht keine verbleibende `BLOCKED_BY_VERCEL_CONFIG`-Blockade. Prüfartefakte liegen unter dem ignorierten `artifacts/continuation/` (Screenshots der Production-Verbindung, Live-Ladeansicht und erzeugtes Dossier). Synthetische QA-Snapshots enthalten keine tatsächlichen Schülerdaten und unterliegen derselben 90-Tage-Frist.
