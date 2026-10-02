# Projektweiter Konsequenz-Layer – Kapitel 1 und 2

## Grundsatz für Kapitel 3–6

Bei jeder wichtigen Entscheidung dokumentieren: unmittelbare Reaktion, spätere konkrete Erinnerung, Orientierung und Figurenwahrnehmung sowie mögliche Bedeutung im Epilog. Diese Regel steht verbindlich auch am Kopf von `data/consequences.js`. Jede offene Entscheidung soll mindestens zwei Zeitebenen berühren. Fachliche Fehler sind Lernanlässe, keine moralischen Charakterurteile. Orientierungen bilden keine Charakterklasse und keine Rangliste.

## Kanonische Speicherung

Die vorhandenen `state.choices` bleiben die einzige Quelle konkreter Entscheidungen; es gibt keinen zweiten `decisions`-Spielstand. `priorityGrievances`, `playerDemand`, verschobene Arbeit und geopferte Vorräte bleiben unter ihren bisherigen Namen. Neue Felder: `orientation`, `perceptions` und `consequences`. Alte ungenutzte `dimensions` und numerische Beziehungen bleiben zur Kompatibilität erhalten; sie sind keine Grundlage dieses Layers.

`data/consequences.js` ordnet den tatsächlichen Option-IDs Wirkungen zu. Die bestehenden IDs heißen `grain`/`feed` statt harvest/fodder und `question_basis` statt question_basis mit anderem Namensschema. Die Wahrnehmung `ulrich` bezeichnet intern die herrschaftliche Rolle, die in der vorhandenen Oberfläche weiterhin „Der Verwalter“ heißt. Story und Figurennamen wurden dafür nicht geändert.

`syncConsequences(state)` berechnet Orientierungen, eindeutige Wahrnehmungs-Tags und Meldungs-/Verweigerungsmerker aus den vorhandenen Entscheidungen. Wiederholte Auswahl, Retry, Save und Reload addieren nichts doppelt. Eine geänderte Entscheidung ersetzt die alte Wirkung. Falsche Antworten auf die fachlichen Aufgaben haben keine Orientierungswirkung; nur die ausdrücklich differenzierte Antwort D bei `freedomAndOuterLife` trägt zur theologischen und rechtlichen Orientierung bei.

Speichern und Laden synchronisieren den Layer. Alte Spielstände ohne neue Felder erhalten aus ihren tatsächlich vorhandenen Entscheidungen rekonstruierte Werte; ohne Entscheidungen gelten leere Wahrnehmungen und Nullwerte. Das additive Schema bleibt Version 4 und benötigt keine destructive Migration. Bereits gespeicherte Dialogzeilen und deren Leseposition bleiben beim Reload erhalten.

## Sichtbare Rückgriffe

- Morgengespräch: eine kurze Erinnerung an die anfängliche Luther-Deutung.
- Peters Hof: eine kurze Erinnerung an seine offene Frage aus Kapitel 1.
- Luther-Rückgriff: die frühere differenzierte Unterscheidung wird aufgegriffen, falls sie tatsächlich gewählt wurde.
- Dorfversammlung: höchstens ein Beitrag pro Dorfstation. Anna erinnert die Waldentscheidung; Peter verbindet seine Antwort mit der konkret verschobenen Tätigkeit; Margarethe verbindet ihre Antwort mit Vorrat, Saatgut, Reserve oder Verweigerung.
- Konrad erinnert eine Frondienstverweigerung beziehungsweise eine Bitte um Aufschub, ohne daraus eine Belohnung zu machen.
- Der Verwalter erinnert Waldmissachtung beim Frondienst beziehungsweise die Frondienstverweigerung bei den Abgaben, sofern die Stationen in dieser Reihenfolge gespielt werden.

Die bereits vorhandenen direkten Reaktionen bleiben erhalten. Keine Szene zeigt Werte, Tags oder Moralpunkte. Keine Rückgriffe werden ohne die entsprechende gespeicherte Entscheidung erfunden. Dialoge verwenden Kopien der Quelldaten; das Datenmodul wird nicht verändert.

## Zentrale Schnittstellen

`applyDecisionConsequences(decisionId, optionId, state)`, `getOrientationProfile(state)`, `hasDecision(id, option, state)`, `getCharacterPerceptions(character, state)`, `getSavedDecisions(state)`, `getContextualDialogue(dialogueId, state, baseLines)` und `prepareConsequencesForEpilogue(state)` bündeln den Zugriff. Die bestehende Choice-Engine und der Save-Layer synchronisieren automatisch; spezielle Entscheidungen außerhalb der Choice-Engine werden beim Speichern erfasst.

`getAvailableChoiceOptions(choiceId, state, definition)` unterstützt optionale zusätzliche Antworten mit `optional: true` und `requires`. Bedingungen können `orientation`, konkrete `decision`, `perception`, `all`, `any` und `not` kombinieren. `contextTexts` erlaubt bedingte alternative Formulierungen. Kernantworten bleiben immer verfügbar, selbst wenn sie eine Bedingung tragen. Kapitel 1/2 erhalten dadurch keine neuen Antwortoptionen.

Beispiel für eine spätere Zusatzoption: `{id:'negotiate', text:'Nach der Rechtsgrundlage fragen', optional:true, requires:{orientation:{legal:2}}}`. Andere Ansätze müssen eigenständig spielbar bleiben; rechtliche Verfahrensorientierung kann etwa Zeit kosten, Widerstand Vertrauen herrschaftlicher Figuren kosten, gemeinschaftliche Lösungen Einigung voraussetzen, Vorsicht als Zögern erscheinen und theologische Unterscheidung praktische Fragen offenlassen. Diese Konflikte werden erst in den späteren Kapiteln gestaltet.

Der Epilog-Zugriff liefert die vollständigen Entscheidungen, gleichauf dominante Orientierungen, Wahrnehmungen, Merker, Beschwerden, Prioritäten und eigene Forderung. Er erzeugt jetzt keine Kapitel-5-/6-Inhalte und zeigt keinen Epilog an.

## Admin / Test

„Konsequenzen anzeigen / Testwerte ändern“ öffnet im bestehenden Admin-Modus Orientierungen, Entscheidungen, Wahrnehmungen, Beschwerden und eigene Forderung. Zahlen, offene Antworten, zusätzliche Wahrnehmungs-Tags, Prioritäten und Forderung lassen sich im getrennten Test-Spielstand ändern. Änderungen müssen mit „Testwerte übernehmen“ bestätigt werden. Werte werden bei weiteren Sprüngen übernommen und überstehen Reloads. Die entsprechende Dialogpersonalisierung entsteht beim nächsten Szenensprung.

„Zusätzliche Testwerte entfernen“ entfernt Orientierungskorrekturen, manuelle Tags und die Übernahme bei Sprüngen; die aktuell gewählten Entscheidungen bleiben bestehen. Ein ganzer Kapitelstart oder das Zurücksetzen des ganzen Tests beginnt mit frischen Voraussetzungen. Der normale Schüler-Spielstand wird bei allen Admin-Aktionen geschützt. Die vollständige JSON-Anzeige enthält ebenfalls die neuen Felder.

## Prüfung

`check-consequences.cjs` prüft Orientierungen, Idempotenz, falsche Aufgabenantworten, alle registrierten Optionswirkungen, spätere optionale Antworten, Epilogdaten, alte Saves und Reload nach Kapitel-1-Deutung, Wald, Frondienst, Abgaben sowie in der Dorfversammlung. Hinzu kommen konkrete Dialogvarianten, fehlende generische Rückgriffe, unsichtbare Profile im normalen Spiel, Admin-Änderungen einschließlich Szenensprung/Reload, unveränderter normaler Spielstand und Editoransichten bei 1024Ã—768 und 820Ã—640.

Die bestehenden Tests `check.cjs`, `check-chapter-two.cjs` und `check-admin.cjs` prüfen weiterhin die vollständigen Kapitel, Aufgaben, alle sechs Dorfstationsreihenfolgen, Save-Migration, Pointer-Aktivierung, sämtliche Admin-Sprungziele, Navigation und Responsive-Ansichten.

Abschluss: alle vier Pruefskripte erfolgreich ausgefuehrt; Editor und Dialogrueckgriff visuell kontrolliert. Die Umsetzung ist lokal und noch nicht veroeffentlicht.
