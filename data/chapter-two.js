export const chapterTwoScenes = [
  {id:'ch2_intro',chapter:2,title:'Wie frei ist dein Leben?',kind:'chapter-card'},
  {id:'ch2_hub',chapter:2,title:'Unser Dorf',kind:'hub'},
  {id:'ch2_forest',chapter:2,title:'Am Waldrand',kind:'forest'},
  {id:'ch2_corvee',chapter:2,title:'Peters Hof',kind:'corvee'},
  {id:'ch2_dues',chapter:2,title:'Was bleibt uns?',kind:'dues'},
  {id:'ch2_assembly',chapter:2,title:'Am Beschwerdetisch',kind:'assembly'},
  {id:'ch2_end',chapter:2,title:'Aus Beschwerden werden Forderungen',kind:'chapter-ending'}
];
export const chapterTwoBackgrounds = {
  hub:'assets/chapter2/backgrounds/ch2_bg_village_hub_morning.png',
  forest:'assets/chapter2/backgrounds/ch2_bg_forest_edge_path.png',
  corvee:'assets/chapter2/backgrounds/ch2_bg_manor_yard_forced_labor.png',
  dues:'assets/chapter2/backgrounds/ch2_bg_peasant_cottage_dues.png',
  assembly:'assets/chapter1/k1_taverne_exploration.png'
};
const lines = (speaker,texts) => texts.map(text=>({speaker,text}));
const talk = (...pairs) => pairs.map(([speaker,text])=>({speaker,text}));
export const chapterTwoDialogues = {
  ch2Morning:[{text:'Frühjahr 1525. Am nächsten Morgen.'}],
  forestEncounter:talk(['overseer','Was macht ihr da?'],['anna','Reisig sammeln.'],['overseer','Dann legt es wieder hin.'],['anna','Warum?'],['overseer','Der Wald steht unter der Herrschaft des Grundherrn. Ohne Erlaubnis nehmt ihr hier nichts.'],['anna','Wir sammeln hier seit Jahren.'],['overseer','Das ändert nichts daran, wem der Wald untersteht.']),
  forestReply:talk(['overseer','Nur weil etwas lange gemacht wurde, ist es noch lange kein Recht.'],['anna','Und nur weil heute ein neuer Pfahl steht, ist unser altes Recht verschwunden?']),
  forestOrder:lines('overseer',['Also? Das Holz bleibt hier.']),
  corveeIntro:lines('peter',['Gut, dass du da bist. Das Getreide muss herein, der Zaun ist beschädigt und die Tiere brauchen Futter. Wie fangen wir an?']),
  corveeInterrupt:talk(['overseer','Peter. Am Herrenhof werden heute die Zäune ausgebessert. Von deinem Hof wird jemand erwartet.'],['peter','Heute?'],['overseer','Heute.'],['peter','Ich habe hier selbst genug zu tun.'],['overseer','Das ändert nichts an der Pflicht.']),
  corveeAnswer:lines('overseer',['Ich brauche eine Antwort.']),
  duesIntro:lines('margarethe',['Gut, dass du kommst.','Das ist fast alles, was wir von dieser Ernte haben.','Davon müssen wir essen, wieder aussäen – und unsere Abgaben leisten.']),
  duesFirst:talk(['overseer','Für den Herrenhof werden drei Säcke erwartet.'],['margarethe','Drei?'],['overseer','So ist es festgesetzt.']),
  duesQuestion:lines('margarethe',['Und wenn ich sage, dass wir das selbst brauchen?']),
  duesExtra:talk(['overseer','Außerdem gibt es in diesem Jahr eine zusätzliche Forderung.'],['margarethe','Zusätzlich?'],['overseer','Noch einen Sack.']),
  duesRealization:lines('margarethe',['Vorhin konnten wir noch überlegen, was wir für die nächsten Monate brauchen.','Jetzt entscheidet jemand anders mit darüber, was uns von unserer Ernte bleibt.']),
  assemblyIntro:talk(['peter','Heute ging es ständig um etwas anderes.'],['anna','Im Wald ums Holz.'],['margarethe','Bei mir um die Ernte.'],['peter','Und bei mir um die Arbeit für den Herrenhof.'],['jakob','Vielleicht ist es trotzdem nicht dreimal dasselbe Problem.']),
  demandIntro:talk(['jakob','Wir wissen jetzt, was uns stört.'],['konrad','Dann schreiben wir es auf.'],['peter','Eine Beschwerde sagt noch nicht, was sich ändern soll.'],['jakob','Genau. Eine Forderung muss konkreter sein.']),
  lutherRecall:talk(['konrad','Wenn Luther schreibt, der Christ sei niemandem untertan – dann ist doch klar, dass auch diese Abhängigkeiten falsch sind.'],['jakob','Ist es wirklich so einfach?']),
  assemblyPressure:talk(['konrad','Und was, wenn der Herr einfach Nein sagt?'],['peter','Dann müssen wir wissen, wie weit wir gehen wollen.'],['anna','Und ob andere dieselben Forderungen haben.'],['jakob','Allein bleiben es unsere Beschwerden. Gemeinsam kann daraus mehr werden.']),
  memmingenNews:talk(['traveler','Ihr seid nicht die Einzigen.'],['jakob','Was meinst du?'],['traveler','In Memmingen kommen Beschwerden aus verschiedenen Gegenden zusammen.'],['peter','Dieselben Beschwerden?'],['traveler','Nicht dieselben. Aber viele ähneln sich.'],['traveler','Ein Schreiber namens Sebastian Lotzer hilft dabei, daraus gemeinsame Forderungen zu machen.'],['konrad','Dann sollten wir sehen, was daraus wird.'])
};
const open = (context,prompt,options) => ({contextLabel:'Im Gespräch:',contextStatement:context,prompt,reflective:true,options:options.map(([id,label,text,reaction])=>({id,label,text,reaction}))});
export const chapterTwoChoices = {
  forestArgument:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Anna: „Wir sammeln hier seit Jahren.“ Der Verwalter beruft sich auf die Herrschaft des Grundherrn.",
  "prompt": "Welche Beobachtung stützt Annas Anspruch auf geregelte Nutzung am stärksten?",
  "solution": "A",
  "options": [
    {
      "id": "A",
      "text": "Die langjährige Nutzung lässt zusammen mit älteren Nutzungszeichen auf überlieferte Rechte schließen.",
      "feedback": "Lange Nutzung und ältere Regeln stützen den Anspruch auf überlieferte Nutzungsrechte. Sie sind ein Argument für bereits geregelte Nutzung, aber noch kein abschließender Rechtsbeweis.\n\nDer Versorgungsbedarf ist ein wichtiges Argument für den Zugang. Er belegt aber noch nicht, auf welcher überlieferten Regelung Annas Anspruch beruht. Eine Abgabe könnte Teil einer neuen Vereinbarung sein. Eine mögliche künftige Regelung belegt jedoch nicht die bisherigen Nutzungsrechte. Ein Grenzpfahl zeigt einen Herrschaftsanspruch und kann Orientierung geben. Er beweist nicht, dass ältere Nutzungsrechte dadurch erloschen sind."
    },
    {
      "id": "B",
      "text": "Das Holz wird für die Versorgung der Haushalte gebraucht; dieser Bedarf spricht für den Zugang zum Wald.",
      "hints": [
        "Der Versorgungsbedarf ist ein wichtiges Argument für den Zugang. Er belegt aber noch nicht, auf welcher überlieferten Regelung Annas Anspruch beruht.",
        "Der Versorgungsbedarf ist ein wichtiges Argument für den Zugang. Er belegt aber noch nicht, auf welcher überlieferten Regelung Annas Anspruch beruht.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Beobachtung stützt Annas Anspruch auf geregelte Nutzung am stärksten?"
      ]
    },
    {
      "id": "C",
      "text": "Eine festgelegte Abgabe für das Sammeln könnte die Nutzung für Gemeinde und Herrschaft verlässlich machen.",
      "hints": [
        "Eine Abgabe könnte Teil einer neuen Vereinbarung sein. Eine mögliche künftige Regelung belegt jedoch nicht die bisherigen Nutzungsrechte.",
        "Eine Abgabe könnte Teil einer neuen Vereinbarung sein. Eine mögliche künftige Regelung belegt jedoch nicht die bisherigen Nutzungsrechte.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Beobachtung stützt Annas Anspruch auf geregelte Nutzung am stärksten?"
      ]
    },
    {
      "id": "D",
      "text": "Der neue Grenzpfahl macht erkennbar, wer die Nutzung ordnen und dafür Verantwortung übernehmen soll.",
      "hints": [
        "Ein Grenzpfahl zeigt einen Herrschaftsanspruch und kann Orientierung geben. Er beweist nicht, dass ältere Nutzungsrechte dadurch erloschen sind.",
        "Ein Grenzpfahl zeigt einen Herrschaftsanspruch und kann Orientierung geben. Er beweist nicht, dass ältere Nutzungsrechte dadurch erloschen sind.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Beobachtung stützt Annas Anspruch auf geregelte Nutzung am stärksten?"
      ]
    }
  ]
},
  forestConflict:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Anna beruft sich auf ältere Nutzung; der Verwalter auf die Anweisungen des Grundherrn.",
  "prompt": "Welche Deutung berücksichtigt die Begründungen beider Seiten am vollständigsten?",
  "solution": "B",
  "options": [
    {
      "id": "A",
      "text": "Die Gemeinde braucht Holz; die Herrschaft muss zwischen Versorgung und Schonung des Waldes abwägen.",
      "hints": [
        "Versorgung und Schonung können bei Waldnutzung wichtig sein. In diesem Gespräch begründet der Verwalter das Verbot jedoch nicht mit Waldschäden, sondern mit Herrschaft.",
        "Versorgung und Schonung können bei Waldnutzung wichtig sein. In diesem Gespräch begründet der Verwalter das Verbot jedoch nicht mit Waldschäden, sondern mit Herrschaft.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Deutung berücksichtigt die Begründungen beider Seiten am vollständigsten?"
      ]
    },
    {
      "id": "B",
      "text": "Überlieferte Nutzungsrechte der Gemeinde geraten mit dem Anspruch der Herrschaft in Konflikt, die Nutzung festzulegen.",
      "feedback": "Anna begründet ihre Nutzung mit älteren Rechten, der Verwalter mit dem Herrschaftsanspruch. Die Frage ist, ob und auf welcher Grundlage bestehende Nutzung eingeschränkt werden darf.\n\nVersorgung und Schonung können bei Waldnutzung wichtig sein. In diesem Gespräch begründet der Verwalter das Verbot jedoch nicht mit Waldschäden, sondern mit Herrschaft. Mitsprache wäre ein möglicher Weg zu einer neuen Regelung. Annas Einwand beansprucht aber zunächst bereits bestehende Rechte, nicht erst eine neue Beteiligung. Die Beschreibung trifft die unmittelbare Handlung. Sie lässt offen, warum Anna und der Verwalter ihre Position jeweils für berechtigt halten."
    },
    {
      "id": "C",
      "text": "Die Gemeinde möchte die künftige Waldnutzung mitbestimmen; die Herrschaft beansprucht die Verantwortung für neue Regeln.",
      "hints": [
        "Mitsprache wäre ein möglicher Weg zu einer neuen Regelung. Annas Einwand beansprucht aber zunächst bereits bestehende Rechte, nicht erst eine neue Beteiligung.",
        "Mitsprache wäre ein möglicher Weg zu einer neuen Regelung. Annas Einwand beansprucht aber zunächst bereits bestehende Rechte, nicht erst eine neue Beteiligung.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Deutung berücksichtigt die Begründungen beider Seiten am vollständigsten?"
      ]
    },
    {
      "id": "D",
      "text": "Anna will ihre gewohnte Arbeit fortsetzen; der Verwalter verlangt, dass seine Anweisung zunächst befolgt wird.",
      "hints": [
        "Die Beschreibung trifft die unmittelbare Handlung. Sie lässt offen, warum Anna und der Verwalter ihre Position jeweils für berechtigt halten.",
        "Die Beschreibung trifft die unmittelbare Handlung. Sie lässt offen, warum Anna und der Verwalter ihre Position jeweils für berechtigt halten.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Deutung berücksichtigt die Begründungen beider Seiten am vollständigsten?"
      ]
    }
  ]
},
  forestResponse:open('Der Verwalter verlangt: „Also? Das Holz bleibt hier.“','Wie antwortest du?',[
    ['take','A','Wir nehmen das Holz trotzdem mit.',lines('overseer',['Ich werde das melden.'])],['leave','B','Wir lassen es für heute hier, um den Streit nicht weiter zu verschärfen.',lines('anna',['Dann nehmen wir heute kein Holz mit. Aber wir können das Verbot später noch ansprechen.'])],['legal_basis','C','Dann möchte ich wissen, worauf sich dieses Verbot stützt.',talk(['overseer','Ich setze die Anweisungen des Herrn durch.'],['player','Das war nicht meine Frage.'],['overseer','Dann müsst ihr sie dem Herrn stellen.'])],['community','D','Das sollte nicht hier zwischen uns entschieden werden. Das Dorf muss darüber sprechen.',lines('anna',['Das betrifft schließlich nicht nur uns.'])]
  ]),
  corveeSacrifice:open('Die Arbeit am Herrenhof unterbricht Peters geplanten Tag.','Welche eigene Arbeit verschiebst du?',[
    ['grain','A','Getreide / eigene Feldarbeit',lines('peter',['Wenn der Regen kommt, verlieren wir vielleicht einen Teil davon.'])],['fence','B','Den beschädigten Zaun',lines('peter',['Dann bleibt der Zaun offen. Hoffentlich geht nichts aufs Feld.'])],['feed','C','Futter / Versorgung der Tiere',lines('peter',['Dann mache ich das heute Abend noch. Irgendwann.'])]
  ]),
  corveeResponse:open('Der Bote sagt: „Ich brauche eine Antwort.“','Wie antwortest du?',[
    ['go','A','Ich gehe selbst zum Herrenhof.',lines('peter',['Dann erfülle ich den verlangten Dienst. Meine eigene Arbeit muss warten.'])],['substitute','B','Ich versuche, jemanden an meiner Stelle zu schicken.',lines('peter',['Dann schulde ich ihm etwas.'])],['delay','C','Ich bitte um Aufschub.',lines('overseer',['Ob du Aufschub bekommst, entscheidet nicht du.'])],['refuse','D','Ich weigere mich.',lines('overseer',['Dann melde ich, dass du deine Pflicht verweigerst.'])]
  ]),
  corveeDefinition:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Peter hatte seinen Arbeitstag geplant. Dann wurde von ihm verlangt, am Herrenhof zu arbeiten.",
  "prompt": "Welche Erklärung trifft den Verpflichtungsgrund des Frondienstes am genauesten?",
  "solution": "B",
  "options": [
    {
      "id": "A",
      "text": "Peter übernimmt eine Arbeit, mit der die Höfe gemeinsam Einrichtungen der Gemeinde erhalten.",
      "hints": [
        "Gemeinschaftliche Arbeiten können ebenfalls verbindlich sein. Hier fordert aber der Grundherr einen ihm geschuldeten Dienst, keine gemeinsam bestimmte Arbeit der Gemeinde.",
        "Gemeinschaftliche Arbeiten können ebenfalls verbindlich sein. Hier fordert aber der Grundherr einen ihm geschuldeten Dienst, keine gemeinsam bestimmte Arbeit der Gemeinde.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Erklärung trifft den Verpflichtungsgrund des Frondienstes am genauesten?"
      ]
    },
    {
      "id": "B",
      "text": "Peter schuldet dem Grundherrn Arbeitsdienste aufgrund seines Herrschafts- bzw. Abhängigkeitsverhältnisses.",
      "feedback": "Frondienst bezeichnet verpflichtende Arbeitsleistungen aus einem Herrschafts- bzw. Abhängigkeitsverhältnis. Entscheidend ist nicht der Arbeitsort oder die Schwere, sondern der Grund der Verpflichtung.\n\nGemeinschaftliche Arbeiten können ebenfalls verbindlich sein. Hier fordert aber der Grundherr einen ihm geschuldeten Dienst, keine gemeinsam bestimmte Arbeit der Gemeinde. Ein vereinbarter Tausch von Arbeit und Gegenleistung wäre ein anderes Verpflichtungsverhältnis. Peter wird in der Szene nicht zu einer solchen Vereinbarung gefragt. Gegenseitige Hilfe erklärt ebenfalls Arbeit auf einem anderen Hof. Peters Dienst beruht hier jedoch auf seiner Bindung an den Grundherrn, nicht auf freiwilliger Nachbarschaftshilfe."
    },
    {
      "id": "C",
      "text": "Peter tauscht eigene Arbeitszeit gegen eine Gegenleistung, deren Umfang er mit dem Herrenhof vereinbart.",
      "hints": [
        "Ein vereinbarter Tausch von Arbeit und Gegenleistung wäre ein anderes Verpflichtungsverhältnis. Peter wird in der Szene nicht zu einer solchen Vereinbarung gefragt.",
        "Ein vereinbarter Tausch von Arbeit und Gegenleistung wäre ein anderes Verpflichtungsverhältnis. Peter wird in der Szene nicht zu einer solchen Vereinbarung gefragt.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Erklärung trifft den Verpflichtungsgrund des Frondienstes am genauesten?"
      ]
    },
    {
      "id": "D",
      "text": "Peter unterstützt einen anderen Hof und erwartet, dass ihm bei eigener Arbeitsnot ebenfalls geholfen wird.",
      "hints": [
        "Gegenseitige Hilfe erklärt ebenfalls Arbeit auf einem anderen Hof. Peters Dienst beruht hier jedoch auf seiner Bindung an den Grundherrn, nicht auf freiwilliger Nachbarschaftshilfe.",
        "Gegenseitige Hilfe erklärt ebenfalls Arbeit auf einem anderen Hof. Peters Dienst beruht hier jedoch auf seiner Bindung an den Grundherrn, nicht auf freiwilliger Nachbarschaftshilfe.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Erklärung trifft den Verpflichtungsgrund des Frondienstes am genauesten?"
      ]
    }
  ]
},
  duesResponse:open('Margarethe fragt: „Und wenn ich sage, dass wir das selbst brauchen?“','Wie reagierst du auf die Forderung?',[
    ['pay','A','Wir geben die geforderte Menge ab.',lines('margarethe',['Dann ist diese Forderung erfüllt. Aber der Sack fehlt uns im eigenen Vorrat.'])],['delay','B','Wir bitten darum, einen Teil später zu leisten.',lines('overseer',['Das kann ich nicht entscheiden.'])],['withhold','C','Wir behalten einen Sack zurück.',lines('overseer',['Wenn die Menge fehlt, wird man nachfragen.'])],['question_basis','D','Wir verlangen zu wissen, wie die Forderung begründet wird.',talk(['overseer','Ich überbringe sie nur.'],['margarethe','Das ist keine Antwort.'])]
  ]),
  assemblyConnection:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Im Wald ging es um Nutzung, bei Peter um Arbeitszeit und bei Margarethe um die Ernte.",
  "prompt": "Welche Aussage erklärt den gemeinsamen Zusammenhang am vollständigsten?",
  "solution": "B",
  "options": [
    {
      "id": "A",
      "text": "Die Haushalte geraten unter Versorgungsdruck, weil ihnen Holz, Arbeitszeit oder Vorräte fehlen.",
      "hints": [
        "Versorgungsdruck verbindet wichtige Folgen der Konflikte. Die Aussage erklärt aber noch nicht, wer in die jeweiligen Entscheidungen eingreift und auf welcher Grundlage.",
        "Versorgungsdruck verbindet wichtige Folgen der Konflikte. Die Aussage erklärt aber noch nicht, wer in die jeweiligen Entscheidungen eingreift und auf welcher Grundlage.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Aussage erklärt den gemeinsamen Zusammenhang am vollständigsten?"
      ]
    },
    {
      "id": "B",
      "text": "Herrschaftliche Ansprüche greifen in Entscheidungen über Nutzung, Zeit und Ertrag ein und verändern die Versorgung.",
      "feedback": "Der Zusammenhang umfasst Entscheidungsbefugnisse und materielle Folgen: Andere bestimmen über Waldnutzung, Arbeitszeit oder Ertrag und verändern damit die Lebensbedingungen.\n\nVersorgungsdruck verbindet wichtige Folgen der Konflikte. Die Aussage erklärt aber noch nicht, wer in die jeweiligen Entscheidungen eingreift und auf welcher Grundlage. Verlässliche Absprachen könnten die Planung verbessern. In den Szenen geht es jedoch auch um ein ungleiches Verhältnis zwischen Herrschaft und Betroffenen. Mitsprache wäre ein gemeinsamer Reformansatz. Die drei Situationen beruhen aber nicht einfach auf neu vereinbarten Verpflichtungen: ältere Rechte und bestehende Dienste sind ebenfalls betroffen."
    },
    {
      "id": "C",
      "text": "Die Gemeinde braucht verlässliche Absprachen, damit ihre Mitglieder den Alltag gemeinsam planen können.",
      "hints": [
        "Verlässliche Absprachen könnten die Planung verbessern. In den Szenen geht es jedoch auch um ein ungleiches Verhältnis zwischen Herrschaft und Betroffenen.",
        "Verlässliche Absprachen könnten die Planung verbessern. In den Szenen geht es jedoch auch um ein ungleiches Verhältnis zwischen Herrschaft und Betroffenen.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Aussage erklärt den gemeinsamen Zusammenhang am vollständigsten?"
      ]
    },
    {
      "id": "D",
      "text": "Anna, Peter und Margarethe verlangen mehr Beteiligung, bevor neue Verpflichtungen vereinbart werden.",
      "hints": [
        "Mitsprache wäre ein gemeinsamer Reformansatz. Die drei Situationen beruhen aber nicht einfach auf neu vereinbarten Verpflichtungen: ältere Rechte und bestehende Dienste sind ebenfalls betroffen.",
        "Mitsprache wäre ein gemeinsamer Reformansatz. Die drei Situationen beruhen aber nicht einfach auf neu vereinbarten Verpflichtungen: ältere Rechte und bestehende Dienste sind ebenfalls betroffen.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Aussage erklärt den gemeinsamen Zusammenhang am vollständigsten?"
      ]
    }
  ]
},
  forestDemand:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Beschwerde: „Unsere bisherigen Nutzungsrechte werden eingeschränkt.“",
  "prompt": "Welche Forderung folgt am unmittelbarsten aus dieser Beschwerde?",
  "solution": "B",
  "options": [
    {
      "id": "A",
      "text": "Herrschaft und Gemeinde sollen die Nutzung des Waldes neu und verbindlich miteinander vereinbaren.",
      "hints": [
        "Eine neue Vereinbarung kann den Konflikt lösen. Sie öffnet aber auch die bisherigen Rechte für Neuverhandlungen, statt zuerst ihre Anerkennung zu verlangen.",
        "Eine neue Vereinbarung kann den Konflikt lösen. Sie öffnet aber auch die bisherigen Rechte für Neuverhandlungen, statt zuerst ihre Anerkennung zu verlangen.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung folgt am unmittelbarsten aus dieser Beschwerde?"
      ]
    },
    {
      "id": "B",
      "text": "Die bisherigen geregelten Nutzungsrechte der Gemeinde sollen wieder anerkannt werden.",
      "feedback": "Wer die Einschränkung bisheriger Nutzungsrechte beklagt, verlangt am unmittelbarsten deren Anerkennung. Damit ist weder Eigentum am ganzen Wald noch ungeregelte Nutzung gefordert.\n\nEine neue Vereinbarung kann den Konflikt lösen. Sie öffnet aber auch die bisherigen Rechte für Neuverhandlungen, statt zuerst ihre Anerkennung zu verlangen. Eine feste Abgabe könnte Nutzung planbar machen. Sie führt jedoch eine neue Bedingung ein und beantwortet nicht unmittelbar den Anspruch auf bisherige Rechte. Selbstregelung der Gemeinde ist eine weitergehende Forderung. Sie verändert die Zuständigkeit grundsätzlich, während die Beschwerde zunächst bestimmte bisherige Nutzungsrechte betrifft."
    },
    {
      "id": "C",
      "text": "Das Sammeln von Reisig soll gegen eine vorher festgelegte Abgabe verlässlich erlaubt werden.",
      "hints": [
        "Eine feste Abgabe könnte Nutzung planbar machen. Sie führt jedoch eine neue Bedingung ein und beantwortet nicht unmittelbar den Anspruch auf bisherige Rechte.",
        "Eine feste Abgabe könnte Nutzung planbar machen. Sie führt jedoch eine neue Bedingung ein und beantwortet nicht unmittelbar den Anspruch auf bisherige Rechte.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung folgt am unmittelbarsten aus dieser Beschwerde?"
      ]
    },
    {
      "id": "D",
      "text": "Die Gemeinde soll die Waldnutzung selbst regeln; der Herrschaftsanspruch darauf soll entfallen.",
      "hints": [
        "Selbstregelung der Gemeinde ist eine weitergehende Forderung. Sie verändert die Zuständigkeit grundsätzlich, während die Beschwerde zunächst bestimmte bisherige Nutzungsrechte betrifft.",
        "Selbstregelung der Gemeinde ist eine weitergehende Forderung. Sie verändert die Zuständigkeit grundsätzlich, während die Beschwerde zunächst bestimmte bisherige Nutzungsrechte betrifft.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung folgt am unmittelbarsten aus dieser Beschwerde?"
      ]
    }
  ]
},
  corveeDemand:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Beschwerde: „Unsere eigene Arbeit bleibt liegen.“",
  "prompt": "Welche Forderung greift das erlebte Problem am präzisesten auf?",
  "solution": "A",
  "options": [
    {
      "id": "A",
      "text": "Frondienste sollen begrenzt und so geregelt werden, dass die Arbeit auf dem eigenen Hof nicht dauerhaft gefährdet wird.",
      "feedback": "Begrenzung und verlässliche Regelung greifen Peters konkreten Zeitkonflikt auf, ohne bereits jede Dienstpflicht oder eine feste Rangordnung zwischen allen Arbeiten festzulegen.\n\nEntschädigung vermindert die wirtschaftliche Belastung. Sie löst aber nicht vollständig, dass Peter Arbeitszeit für seinen eigenen Hof verliert und darüber nicht selbst verfügt. Der Vorrang der eigenen Arbeit nimmt den Zeitkonflikt direkt auf. Er verlangt aber bereits eine feste Rangordnung für alle Dienste, die über eine Begrenzung im Hinblick auf die eigene Versorgung hinausgeht. Vollständige Abschaffung würde die Dienstpflicht beenden und kann als weitreichende Forderung diskutiert werden. Sie geht über die unmittelbar geschilderte Beschwerde zur liegen gebliebenen Hofarbeit hinaus."
    },
    {
      "id": "B",
      "text": "Wer Frondienst leisten muss, soll für die geleistete Arbeit angemessen entschädigt werden.",
      "hints": [
        "Entschädigung vermindert die wirtschaftliche Belastung. Sie löst aber nicht vollständig, dass Peter Arbeitszeit für seinen eigenen Hof verliert und darüber nicht selbst verfügt.",
        "Entschädigung vermindert die wirtschaftliche Belastung. Sie löst aber nicht vollständig, dass Peter Arbeitszeit für seinen eigenen Hof verliert und darüber nicht selbst verfügt.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung greift das erlebte Problem am präzisesten auf?"
      ]
    },
    {
      "id": "C",
      "text": "Die Arbeit auf dem eigenen Hof soll Vorrang haben; erst danach sollen Dienste für den Grundherrn verlangt werden.",
      "hints": [
        "Der Vorrang der eigenen Arbeit nimmt den Zeitkonflikt direkt auf. Er verlangt aber bereits eine feste Rangordnung für alle Dienste, die über eine Begrenzung im Hinblick auf die eigene Versorgung hinausgeht.",
        "Der Vorrang der eigenen Arbeit nimmt den Zeitkonflikt direkt auf. Er verlangt aber bereits eine feste Rangordnung für alle Dienste, die über eine Begrenzung im Hinblick auf die eigene Versorgung hinausgeht.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung greift das erlebte Problem am präzisesten auf?"
      ]
    },
    {
      "id": "D",
      "text": "Frondienste sollen vollständig abgeschafft werden.",
      "hints": [
        "Vollständige Abschaffung würde die Dienstpflicht beenden und kann als weitreichende Forderung diskutiert werden. Sie geht über die unmittelbar geschilderte Beschwerde zur liegen gebliebenen Hofarbeit hinaus.",
        "Vollständige Abschaffung würde die Dienstpflicht beenden und kann als weitreichende Forderung diskutiert werden. Sie geht über die unmittelbar geschilderte Beschwerde zur liegen gebliebenen Hofarbeit hinaus.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung greift das erlebte Problem am präzisesten auf?"
      ]
    }
  ]
},
  duesDemand:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Beschwerde: „Zusätzliche, vorher nicht absehbare Forderungen machen unsere Versorgung unsicher.“",
  "prompt": "Welche Forderung setzt am unmittelbarsten an der fehlenden Vorhersehbarkeit an?",
  "solution": "A",
  "options": [
    {
      "id": "A",
      "text": "Zusätzliche Abgaben sollen nur nach vorher bekannten Regeln verlangt und nachvollziehbar begründet werden.",
      "feedback": "Vorher bekannte Regeln und begründete Änderungen treffen die fehlende Vorhersehbarkeit am direktesten. Die anderen Vorschläge sind ebenfalls nachvollziehbare Reformansätze, setzen aber an anderen Kriterien an.\n\nEine Begrenzung schützt Versorgung und Aussaat. Sie beantwortet zunächst die Höhe der Belastung, nicht die Frage, wann eine zusätzliche Forderung vorhersehbar und begründet ist. Mitsprache kann Änderungen kontrollieren und gehört zu einer plausiblen Reform. Beteiligung allein legt aber noch nicht fest, nach welchen vorher bekannten Regeln zusätzliche Ansprüche entstehen. Eine Anpassung an den Ertrag berücksichtigt die Leistungsfähigkeit. Sie klärt noch nicht, auf welcher bekannten Grundlage eine zusätzliche Forderung erhoben wird."
    },
    {
      "id": "B",
      "text": "Die Höhe der Abgaben soll begrenzt werden, damit genügend Nahrung und Saatgut auf dem Hof bleiben.",
      "hints": [
        "Eine Begrenzung schützt Versorgung und Aussaat. Sie beantwortet zunächst die Höhe der Belastung, nicht die Frage, wann eine zusätzliche Forderung vorhersehbar und begründet ist.",
        "Eine Begrenzung schützt Versorgung und Aussaat. Sie beantwortet zunächst die Höhe der Belastung, nicht die Frage, wann eine zusätzliche Forderung vorhersehbar und begründet ist.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung setzt am unmittelbarsten an der fehlenden Vorhersehbarkeit an?"
      ]
    },
    {
      "id": "C",
      "text": "Die Gemeinde soll bei Änderungen der Abgaben mitentscheiden, bevor neue Forderungen gestellt werden.",
      "hints": [
        "Mitsprache kann Änderungen kontrollieren und gehört zu einer plausiblen Reform. Beteiligung allein legt aber noch nicht fest, nach welchen vorher bekannten Regeln zusätzliche Ansprüche entstehen.",
        "Mitsprache kann Änderungen kontrollieren und gehört zu einer plausiblen Reform. Beteiligung allein legt aber noch nicht fest, nach welchen vorher bekannten Regeln zusätzliche Ansprüche entstehen.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung setzt am unmittelbarsten an der fehlenden Vorhersehbarkeit an?"
      ]
    },
    {
      "id": "D",
      "text": "Die Abgaben sollen an den tatsächlichen Ertrag und die Leistungsfähigkeit des jeweiligen Hofes angepasst werden.",
      "hints": [
        "Eine Anpassung an den Ertrag berücksichtigt die Leistungsfähigkeit. Sie klärt noch nicht, auf welcher bekannten Grundlage eine zusätzliche Forderung erhoben wird.",
        "Eine Anpassung an den Ertrag berücksichtigt die Leistungsfähigkeit. Sie klärt noch nicht, auf welcher bekannten Grundlage eine zusätzliche Forderung erhoben wird.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Forderung setzt am unmittelbarsten an der fehlenden Vorhersehbarkeit an?"
      ]
    }
  ]
},
  lutherPoliticalInference:{
  "contextLabel": "Am heutigen Tag:",
  "contextStatement": "Konrad beruft sich auf „niemandem untertan“ und meint, damit seien die heutigen Abhängigkeiten bereits eindeutig abgelehnt. Bedenke auch Luthers Leitsatz vom Dienst am Nächsten.",
  "prompt": "Welche Deutung berücksichtigt beide Leitsätze und ihre politische Reichweite am genauesten?",
  "solution": "B",
  "options": [
    {
      "id": "A",
      "text": "Freiheit vor Gott verändert das Handeln; deshalb lässt sich die Aufhebung der erlebten Abhängigkeiten aus den Leitsätzen begründen.",
      "hints": [
        "Du nimmst die Folgen der Freiheit für das Handeln ernst. Der Schritt zur Aufhebung bestimmter Abhängigkeiten verlangt aber eine weitere Begründung, die die Leitsätze noch nicht selbst liefern.",
        "Du nimmst die Folgen der Freiheit für das Handeln ernst. Der Schritt zur Aufhebung bestimmter Abhängigkeiten verlangt aber eine weitere Begründung, die die Leitsätze noch nicht selbst liefern.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Deutung berücksichtigt beide Leitsätze und ihre politische Reichweite am genauesten?"
      ]
    },
    {
      "id": "B",
      "text": "Freiheit vor Gott verändert den Dienst am Nächsten und kann gesellschaftliche Fragen auslösen, legt aber noch kein politisches Programm fest.",
      "feedback": "Beide Leitsätze verbinden Freiheit vor Gott und Handeln für andere. Das kann gesellschaftliche Fragen aufwerfen; welche konkrete politische Ordnung daraus folgen soll, ist damit noch nicht entschieden.\n\nDu nimmst die Folgen der Freiheit für das Handeln ernst. Der Schritt zur Aufhebung bestimmter Abhängigkeiten verlangt aber eine weitere Begründung, die die Leitsätze noch nicht selbst liefern. Das Gewissen ist für die Frage nach Freiheit wichtig. Daraus folgt aber nicht unmittelbar, dass jede äußere Dienstpflicht nur durch individuelle Zustimmung bindet. Der Dienst am Nächsten ist ein wesentlicher Teil christlicher Freiheit. Er lässt sich jedoch nicht ohne weitere Prüfung mit bestehenden herrschaftlichen Dienstpflichten gleichsetzen."
    },
    {
      "id": "C",
      "text": "Freiheit betrifft das Gewissen; deshalb hängt jede äußere Dienstpflicht unmittelbar davon ab, ob der Einzelne ihr zustimmt.",
      "hints": [
        "Das Gewissen ist für die Frage nach Freiheit wichtig. Daraus folgt aber nicht unmittelbar, dass jede äußere Dienstpflicht nur durch individuelle Zustimmung bindet.",
        "Das Gewissen ist für die Frage nach Freiheit wichtig. Daraus folgt aber nicht unmittelbar, dass jede äußere Dienstpflicht nur durch individuelle Zustimmung bindet.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Deutung berücksichtigt beide Leitsätze und ihre politische Reichweite am genauesten?"
      ]
    },
    {
      "id": "D",
      "text": "Der Dienst am Nächsten gibt der Freiheit ihre Richtung; deshalb bestätigt er zunächst die bestehenden herrschaftlichen Dienstpflichten.",
      "hints": [
        "Der Dienst am Nächsten ist ein wesentlicher Teil christlicher Freiheit. Er lässt sich jedoch nicht ohne weitere Prüfung mit bestehenden herrschaftlichen Dienstpflichten gleichsetzen.",
        "Der Dienst am Nächsten ist ein wesentlicher Teil christlicher Freiheit. Er lässt sich jedoch nicht ohne weitere Prüfung mit bestehenden herrschaftlichen Dienstpflichten gleichsetzen.\n\nPrüfe noch einmal das Kriterium der Frage: Welche Deutung berücksichtigt beide Leitsätze und ihre politische Reichweite am genauesten?"
      ]
    }
  ]
}
};
export const forestClues = {
  oldUse:{label:'Alter Sammelplatz',x:17,y:56,text:'Hier sammeln die Leute aus dem Dorf offenbar schon lange Holz.',speech:'Hier sammeln die Leute aus dem Dorf schon lange.'},
  customaryRules:{label:'Älteres Nutzungszeichen',x:80,y:51,speech:'Mein Vater kannte solche Zeichen schon. Auch früher gab es Regeln dafür, wo gesammelt und wo nicht geschlagen wurde.'},
  newClaim:{label:'Neuer Grenzpfahl',x:29,y:25,speech:'Die stehen noch nicht lange hier.'}
};
export const dayTasks = {grain:'Getreide / eigene Feldarbeit',fence:'Beschädigter Zaun',feed:'Futter / Versorgung der Tiere'};
export const dayReactions = {grain:'Dann holen wir wenigstens das Getreide rein, bevor das Wetter kippt.',fence:'Wenn der Zaun hält, habe ich später weniger Ärger.',feed:'Die Tiere können schließlich nicht warten.'};
export const stores = {food:'Vorrat / Nahrung',seed:'Saatgut',reserve:'Reserve'};
export const storeConsequences = {food:'Dann müssen wir beim Essen sparen.',seed:'Dann fehlt uns im Frühjahr Getreide für die Aussaat.',reserve:'Dann bleibt weniger, falls etwas Unvorhergesehenes passiert.'};
export const reflections = {
  forest:{prompt:'Was erscheint dir an der Situation besonders problematisch?',items:[['rights','bisherige Nutzungsrechte werden eingeschränkt'],['voice','die Gemeinde kann kaum mitentscheiden'],['clarity','die Regeln sind nicht klar'],['power','der Grundherr beansprucht weitreichende Verfügung'],['wood','Anna bekommt heute kein Holz']]},
  corvee:{prompt:'Was macht den Frondienst für Peter besonders belastend?',items:[['work','zusätzliche Arbeit'],['planning','schlechtere Planung der eigenen Arbeit'],['time','ein anderer verfügt über einen Teil seiner Zeit'],['absolute','Arbeit für andere sollte nur auf freiwilliger Zustimmung beruhen'],['supply','die eigene Versorgung kann gefährdet werden']],warning:'Arbeit für andere kann freiwillige Hilfe oder eine bindende Dienstpflicht sein. Die Forderung nach freiwilliger Zustimmung verändert den Verpflichtungsgrund. Peters konkreter Zeitkonflikt lässt sich auch durch Begrenzung und verlässliche Planung angehen.'},
  dues:{prompt:'Was macht die Situation besonders belastend?',items:[['amount','Höhe der Abgaben'],['voice','fehlende Mitsprache'],['uncertainty','Unsicherheit durch zusätzliche Forderungen'],['supply','Gefahr für Versorgung und Aussaat'],['absolute','Abgaben sollten nur mit Zustimmung der Betroffenen verlangt werden']],warning:'Zustimmung der Betroffenen wäre eine weitreichende Forderung nach Mitsprache. Davon zu unterscheiden sind verlässliche Regeln, eine Begrenzung der Höhe und die Berücksichtigung der Versorgung; diese Ansätze können auch miteinander verbunden werden.'}
};
export const grievances = [
  {id:'corvee',title:'Frondienst',text:'Pflichtdienste lassen die eigene Arbeit liegen.',tags:['economic','dependence','voice']},
  {id:'dues',title:'Abgaben',text:'Forderungen gefährden Versorgung und Aussaat.',tags:['economic','voice']},
  {id:'forest',title:'Eingeschränkte Waldnutzung',text:'Ältere Nutzungsrechte werden bestritten.',tags:['community','economic','voice']},
  {id:'bondage',title:'Leibeigenschaft',text:'Persönliche Abhängigkeit schränkt den Lebensweg ein. Christliche Freiheit wird zur Begründung von Befreiung herangezogen.',tags:['dependence','religion','voice']},
  {id:'hunting',title:'Jagd- und Fischereirechte',text:'Wer darf Wild und Fische nutzen?',tags:['community','economic','voice']},
  {id:'pastor',title:'Pfarrerwahl',text:'Wer entscheidet, wer das Evangelium predigt?',tags:['religion','community','voice']},
  {id:'movement',title:'Freizügigkeit',text:'Darf man den Ort verlassen und anderswo leben?',tags:['dependence','voice']},
  {id:'penalties',title:'Strafen und Bußen',text:'Nach welchen Regeln wird eine Strafe verhängt?',tags:['voice','economic','dependence']}
];
export const linkReasons = {economic:'wirtschaftliche Belastung',dependence:'persönliche Abhängigkeit',community:'Rechte der Gemeinde',religion:'religiöse Selbstbestimmung',voice:'Herrschaft / Mitsprache'};
export const linkPrompts = {economic:'Geht es in beiden Beschwerden um Versorgung, Arbeitsertrag oder finanzielle Belastungen?',dependence:'Wird in beiden Beschwerden die persönliche Bindung an eine Herrschaft erkennbar?',community:'Beansprucht die Gemeinde in beiden Fällen gemeinsame Rechte?',religion:'Geht es in beiden Fällen um Glauben, christliche Begründungen oder die Gestaltung des religiösen Lebens?',voice:'Wer darf in beiden Situationen entscheiden, und welche Mitsprache fehlt?'};
export const prioritySubjects = {forest:0,corvee:1,dues:2,bondage:4,hunting:5,pastor:6,movement:7,penalties:8};
export const demandParts = {
  subject:['die Regeln für bisherige Nutzungsrechte der Gemeinde','die Regeln für Umfang und Zeitpunkt der Frondienste','die Regeln für Höhe und Änderungen der Abgaben','die Regeln für Entscheidungen über unser Dorf','die Regeln für persönliche Bindungen und Dienstpflichten','die Regeln für Jagd- und Fischereirechte','die Regeln für die Pfarrerwahl','die Regeln für Wohnort und Fortzug','die Regeln für Strafen und Bußen'],
  rule:['verbindlich festgelegt und vor Änderungen begründet werden','an den Bedürfnissen und Rechten der Betroffenen gemessen werden','nur nach einem nachvollziehbaren Verfahren verändert werden'],
  voice:['und die Gemeinde dabei mitentscheiden kann','und Änderungen vor der Gemeinde begründet werden müssen']
};
export const chapterTwoNotebook = {
  forest:['Die Bewohner nutzen den Wald nicht einfach regellos. Sie berufen sich auf überlieferte Nutzungsrechte. Diese geraten mit stärkeren Herrschaftsansprüchen in Konflikt.'],
  corvee:['Frondienst bezeichnet verpflichtende Arbeitsleistungen, die aus einem Herrschafts- bzw. Abhängigkeitsverhältnis entstehen.','Für Peter bedeutet das: Ein anderer kann über einen Teil seiner Arbeitszeit verfügen – auch wenn dadurch die Arbeit auf seinem eigenen Hof liegen bleibt.'],
  dues:['Abgaben konnten bäuerliche Haushalte stark belasten. Entscheidend war nicht nur ihre Höhe, sondern auch, wie vorhersehbar sie waren und wie wenig Einfluss die Betroffenen auf ihre Festlegung hatten.','Art und Höhe von Abgaben unterschieden sich je nach Region, Herrschaft und Rechtsverhältnis. Aus der Planung mit zehn Säcken lässt sich weder eine allgemeine Erntemenge noch eine überall geltende Abgabenquote ableiten.']
};

export const villageDemandNote = 'Die Forderung dieses Dorfes ist ein fiktiver, für die Spielhandlung formulierter Entwurf. Sie veranschaulicht plausible Anliegen und Reformansätze, ist aber kein Zitat einer historisch belegten Dorfforderung. Historische Forderungstexte müssen anhand ihrer eigenen Quellen geprüft werden.';
