export const chapterThreeChoices = {
  "ch3EntryFocus": {
    "reflective": true,
    "prompt": "Mit welcher Gruppe willst du zuerst weiterreden?",
    "contextLabel": "Auf dem Platz in Memmingen",
    "contextStatement": "Drei Gemeinden bringen unterschiedliche Beschwerden mit.",
    "options": [
      {
        "id": "labor",
        "label": "A",
        "text": "Frondienst",
        "reaction": "ch3EntryFocus_labor"
      },
      {
        "id": "rights",
        "label": "B",
        "text": "Nutzungsrechte",
        "reaction": "ch3EntryFocus_rights"
      },
      {
        "id": "church",
        "label": "C",
        "text": "Gemeinde und Predigt",
        "reaction": "ch3EntryFocus_church"
      }
    ]
  },
  "ch3Demand_labor": {
    "reflective": true,
    "prompt": "Welche Forderung würdest du vertreten?",
    "contextLabel": "Am Tisch in Memmingen",
    "contextStatement": "Über unsere Zeit wird verfügt.",
    "options": [
      {
        "id": "A",
        "label": "A",
        "text": "Frondienste sollen begrenzt und nach vorher bekannten Regeln verlangt werden.",
        "reaction": "ch3Demand_labor_A"
      },
      {
        "id": "B",
        "label": "B",
        "text": "Die Arbeit auf dem eigenen Hof soll Vorrang haben; zusätzliche Dienste dürfen die eigene Versorgung nicht gefährden.",
        "reaction": "ch3Demand_labor_B"
      },
      {
        "id": "C",
        "label": "C",
        "text": "Wer verpflichtende Dienste leisten muss, soll dafür angemessen entschädigt werden.",
        "reaction": "ch3Demand_labor_C"
      },
      {
        "id": "D",
        "label": "D",
        "text": "Verpflichtende Frondienste sollen vollständig aufgehoben werden.",
        "reaction": "ch3Demand_labor_D"
      }
    ]
  },
  "ch3Demand_rights": {
    "reflective": true,
    "prompt": "Welche Forderung würdest du vertreten?",
    "contextLabel": "Am Tisch in Memmingen",
    "contextStatement": "Überlieferte Nutzungsrechte werden eingeschränkt.",
    "options": [
      {
        "id": "A",
        "label": "A",
        "text": "Frühere Nutzungsrechte der Gemeinden sollen wieder gelten.",
        "reaction": "ch3Demand_rights_A"
      },
      {
        "id": "B",
        "label": "B",
        "text": "Herrschaft und Gemeinde sollen verbindlich festlegen, welche Nutzung beiden Seiten zusteht.",
        "reaction": "ch3Demand_rights_B"
      },
      {
        "id": "C",
        "label": "C",
        "text": "Bestimmte Nutzungen sollen gegen eine festgelegte Abgabe wieder möglich sein.",
        "reaction": "ch3Demand_rights_C"
      },
      {
        "id": "D",
        "label": "D",
        "text": "Wald, Gewässer und Weiden sollen grundsätzlich der Verfügung der Gemeinden unterstehen.",
        "reaction": "ch3Demand_rights_D"
      }
    ]
  },
  "ch3Demand_church": {
    "reflective": true,
    "prompt": "Welche Forderung würdest du vertreten?",
    "contextLabel": "Am Tisch in Memmingen",
    "contextStatement": "Wer entscheidet, wer das Evangelium predigt?",
    "options": [
      {
        "id": "A",
        "label": "A",
        "text": "Die Gemeinde soll ihren Pfarrer selbst wählen und auch absetzen können.",
        "reaction": "ch3Demand_church_A"
      },
      {
        "id": "B",
        "label": "B",
        "text": "Die Herrschaft soll weiterhin einsetzen dürfen, aber die Gemeinde muss zustimmen.",
        "reaction": "ch3Demand_church_B"
      },
      {
        "id": "C",
        "label": "C",
        "text": "Für die Auswahl sollen verbindliche Kriterien gelten: Predigt des Evangeliums und Akzeptanz der Gemeinde.",
        "reaction": "ch3Demand_church_C"
      },
      {
        "id": "D",
        "label": "D",
        "text": "Die Herrschaft soll über geistliche Ämter überhaupt nicht mehr entscheiden.",
        "reaction": "ch3Demand_church_D"
      }
    ]
  },
  "ch3Religion": {
    "reflective": true,
    "prompt": "Welcher Gedanke überzeugt dich im Moment am meisten?",
    "contextLabel": "Am Tisch in Memmingen",
    "contextStatement": "Wie hängen Erlösung, Freiheit und die Ordnung unseres Zusammenlebens zusammen?",
    "options": [
      {
        "id": "distinction",
        "label": "A",
        "text": "Christliche Freiheit muss zunächst von politischer Freiheit unterschieden werden.",
        "reaction": "ch3Religion_distinction"
      },
      {
        "id": "critical_gospel",
        "label": "B",
        "text": "Gesellschaftliche Verhältnisse dürfen am Evangelium kritisch geprüft werden.",
        "reaction": "ch3Religion_critical_gospel"
      },
      {
        "id": "worldly_transformation",
        "label": "C",
        "text": "Gottes Wille muss sich auch in konkreten gesellschaftlichen Veränderungen zeigen.",
        "reaction": "ch3Religion_worldly_transformation"
      },
      {
        "id": "hermeneutical_caution",
        "label": "D",
        "text": "Entscheidend ist, wie religiöse Begründungen geprüft werden und wer sie auslegen darf.",
        "reaction": "ch3Religion_hermeneutical_caution"
      }
    ]
  },
  "ch3Print": {
    "reflective": true,
    "prompt": "Was soll zuerst unter die Leute kommen?",
    "contextLabel": "In der Druckerei",
    "contextStatement": "Ein Text kann jetzt weiter reisen als die Männer, die ihn beschlossen haben.",
    "options": [
      {
        "id": "full",
        "label": "A",
        "text": "Die vollständigen Artikel – Wer liest, soll selbst sehen, was wirklich gefordert wird.",
        "reaction": "ch3Print_full"
      },
      {
        "id": "summary",
        "label": "B",
        "text": "Eine kurze Zusammenfassung – Die wichtigsten Forderungen müssen schnell verstanden werden.",
        "reaction": "ch3Print_summary"
      },
      {
        "id": "religious",
        "label": "C",
        "text": "Die religiöse Begründung – Die Menschen sollen zuerst sehen, warum wir uns auf das Evangelium berufen.",
        "reaction": "ch3Print_religious"
      },
      {
        "id": "accusation",
        "label": "D",
        "text": "Eine zugespitzte Anklage – Wenn niemand aufhorcht, ändert sich auch nichts.",
        "reaction": "ch3Print_accusation"
      }
    ]
  },
  "ch3Resistance": {
    "reflective": true,
    "prompt": "Was würdest du jetzt tun?",
    "contextLabel": "Konrad fragt im Dorf",
    "contextStatement": "Und wenn der Herr einfach Nein sagt?",
    "options": [
      {
        "id": "negotiate",
        "label": "A",
        "text": "Weiter verhandeln und auf eine verbindliche Regelung drängen.",
        "reaction": "ch3Resistance_negotiate"
      },
      {
        "id": "collective_pressure",
        "label": "B",
        "text": "Gemeinsam öffentlichen Druck aufbauen, aber Gewalt vermeiden.",
        "reaction": "ch3Resistance_collective_pressure"
      },
      {
        "id": "open_resistance_possible",
        "label": "C",
        "text": "Wenn Verhandlung und Druck scheitern, offenen Widerstand nicht ausschließen.",
        "reaction": "ch3Resistance_open_resistance_possible"
      },
      {
        "id": "theological_clarification",
        "label": "D",
        "text": "Vor weiterem Handeln klären, was religiös überhaupt gerechtfertigt werden kann.",
        "reaction": "ch3Resistance_theological_clarification"
      }
    ]
  },
  "ch3Reason": {
    "reflective": true,
    "prompt": "Was macht die Forderungen für dich bisher besonders stark?",
    "contextLabel": "Zurück im Dorf",
    "contextStatement": "Die Forderungen stehen. Was trägt sie für dich?",
    "options": [
      {
        "id": "burdens",
        "label": "A",
        "text": "Sie greifen konkrete Belastungen auf.",
        "reaction": "ch3Reason_burdens"
      },
      {
        "id": "communities",
        "label": "B",
        "text": "Viele Gemeinden können sich gemeinsam auf sie beziehen.",
        "reaction": "ch3Reason_communities"
      },
      {
        "id": "religion",
        "label": "C",
        "text": "Sie versuchen, gesellschaftliche Forderungen religiös zu begründen.",
        "reaction": "ch3Reason_religion"
      },
      {
        "id": "limits",
        "label": "D",
        "text": "Sie verlangen, dass Herrschaft begründet und begrenzt werden muss.",
        "reaction": "ch3Reason_limits"
      },
      {
        "id": "action",
        "label": "E",
        "text": "Sie zeigen, dass aus Beschwerden gemeinsames Handeln entstehen kann.",
        "reaction": "ch3Reason_action"
      }
    ]
  }
};
export const chapterThreeDialogues = {
  "ch3Road": [
    {
      "speaker": "matthes",
      "text": "Aus immer mehr Orten kommen Leute hierher."
    },
    {
      "speaker": "konrad",
      "text": "Mit denselben Beschwerden wie wir?"
    },
    {
      "speaker": "matthes",
      "text": "Manche. Andere bringen ganz andere mit."
    },
    {
      "speaker": "jakob",
      "text": "Dann wird es schwierig."
    },
    {
      "speaker": "konrad",
      "text": "Warum?"
    },
    {
      "speaker": "jakob",
      "text": "Weil aus hundert Beschwerden noch keine gemeinsame Forderung wird."
    }
  ],
  "ch3Arrivals": [
    {
      "speaker": "georg",
      "text": "Bei uns verlangt der Herr immer mehr Tage auf seinem Hof."
    },
    {
      "speaker": "georg",
      "text": "Wenn wir dort arbeiten, bleibt unser eigenes Feld liegen."
    },
    {
      "speaker": "georg",
      "text": "Und wenn die Ernte schlecht wird, trägt nicht er den Schaden."
    },
    {
      "speaker": "katharina",
      "text": "Unser Wald war nie einfach herrenlos."
    },
    {
      "speaker": "katharina",
      "text": "Aber wir konnten dort Holz sammeln und unser Vieh treiben."
    },
    {
      "speaker": "katharina",
      "text": "Jetzt heißt es immer öfter: verboten."
    },
    {
      "speaker": "hans",
      "text": "Bei uns streitet die Gemeinde um den Pfarrer."
    },
    {
      "speaker": "hans",
      "text": "Wir sollen hören, was man uns vorsetzt."
    },
    {
      "speaker": "hans",
      "text": "Dabei wird überall davon gesprochen, das Evangelium müsse frei gepredigt werden."
    }
  ],
  "ch3Hinge": [
    {
      "speaker": "jakob",
      "text": "Warte."
    },
    {
      "speaker": "konrad",
      "text": "Was?"
    },
    {
      "speaker": "jakob",
      "text": "Sie begründen das nicht nur mit alten Rechten."
    },
    {
      "speaker": "jakob",
      "text": "Sie wollen zeigen, dass ihre Forderungen mit dem Evangelium übereinstimmen."
    },
    {
      "speaker": "konrad",
      "text": "Dann sind wir also wieder bei Luther."
    },
    {
      "speaker": "jakob",
      "text": "Vielleicht."
    },
    {
      "speaker": "jakob",
      "text": "Oder bei der Frage, was man aus dem Evangelium überhaupt ableiten darf."
    }
  ],
  "ch3Voices": [
    {
      "speaker": "jakob",
      "text": "Luther würde wohl zuerst fragen, wovon ein Christ frei ist."
    },
    {
      "speaker": "jakob",
      "text": "Vor Gott muss er sich nichts verdienen."
    },
    {
      "speaker": "jakob",
      "text": "Aber daraus folgt noch nicht automatisch, wie Waldrechte, Dienste oder Herrschaft aussehen müssen."
    },
    {
      "speaker": "georg",
      "text": "Aber wenn das Evangelium für unser Leben nichts bedeutet – warum berufen wir uns dann überhaupt darauf?"
    },
    {
      "speaker": "georg",
      "text": "Wenn eine Ordnung Menschen bedrückt, muss doch gefragt werden dürfen, ob sie christlich zu rechtfertigen ist."
    },
    {
      "speaker": "matthes",
      "text": "Aus Thüringen hört man von Predigern, die noch weiter gehen.",
      "emotion": "talking"
    },
    {
      "speaker": "matthes",
      "text": "Sie sagen: Gottes Wille darf nicht nur im Inneren des Menschen bleiben.",
      "emotion": "talking"
    },
    {
      "speaker": "matthes",
      "text": "Er muss auch sichtbar werden, wenn Unrecht geschieht.",
      "emotion": "talking"
    },
    {
      "speaker": "konrad",
      "text": "Das klingt wenigstens nach Veränderung."
    },
    {
      "speaker": "jakob",
      "text": "Und wer entscheidet dann sicher, was Gottes Wille ist?"
    }
  ],
  "ch3News": [
    {
      "speaker": "matthes",
      "text": "Die Artikel werden weitergedruckt.",
      "emotion": "reading"
    },
    {
      "speaker": "matthes",
      "text": "Und längst nicht nur hier gelesen.",
      "emotion": "reading"
    },
    {
      "speaker": "konrad",
      "text": "Dann wird Luther sie auch lesen."
    },
    {
      "speaker": "jakob",
      "text": "Davon kannst du ausgehen."
    },
    {
      "speaker": "konrad",
      "text": "Gut."
    },
    {
      "speaker": "konrad",
      "text": "Dann wird sich zeigen, was seine Freiheit wert ist."
    },
    {
      "speaker": "jakob",
      "text": "Oder ob wir etwas anderes daraus gemacht haben als er."
    }
  ],
  "ch3Printer": [
    {
      "speaker": "printer",
      "text": "Ein Text kann jetzt weiter reisen als die Männer, die ihn beschlossen haben."
    },
    {
      "speaker": "printer",
      "text": "Aber nicht alles wirkt gleich."
    }
  ],
  "ch3Articles": [
    {
      "speaker": "jakob",
      "text": "Zwölf Artikel."
    },
    {
      "speaker": "konrad",
      "text": "Zwölf? Wir hatten schon mit unseren wenigen Beschwerden genug zu tun."
    },
    {
      "speaker": "lotzer",
      "text": "Darum muss man genau hinschauen."
    }
  ],
  "ch3Depth_labor": [
    {
      "speaker": "georg",
      "text": "Es geht nicht darum, nie für jemand anderen zu arbeiten."
    },
    {
      "speaker": "georg",
      "text": "Aber wenn über meine Zeit verfügt wird, bis meine eigene Arbeit liegen bleibt – wie frei bin ich dann?"
    }
  ],
  "ch3Depth_rights": [
    {
      "speaker": "katharina",
      "text": "Es geht nicht darum, dass jeder im Wald machen darf, was er will."
    },
    {
      "speaker": "katharina",
      "text": "Die Frage ist, ob Rechte, die eine Gemeinde lange genutzt hat, einfach entzogen werden können."
    }
  ],
  "ch3Depth_church": [
    {
      "speaker": "hans",
      "text": "Wenn das Evangelium frei gepredigt werden soll – wer entscheidet dann, wer predigt?"
    },
    {
      "speaker": "hans",
      "text": "Der Herr? Oder die Gemeinde, die ihn hören soll?"
    }
  ],
  "ch3EntryFocus_labor": [
    {
      "speaker": "georg",
      "text": "Es geht nicht darum, nie für jemand anderen zu arbeiten."
    },
    {
      "speaker": "georg",
      "text": "Aber wenn über meine Zeit verfügt wird, bis meine eigene Arbeit liegen bleibt – wie frei bin ich dann?"
    }
  ],
  "ch3EntryFocus_rights": [
    {
      "speaker": "katharina",
      "text": "Es geht nicht darum, dass jeder im Wald machen darf, was er will."
    },
    {
      "speaker": "katharina",
      "text": "Die Frage ist, ob Rechte, die eine Gemeinde lange genutzt hat, einfach entzogen werden können."
    }
  ],
  "ch3EntryFocus_church": [
    {
      "speaker": "hans",
      "text": "Wenn das Evangelium frei gepredigt werden soll – wer entscheidet dann, wer predigt?"
    },
    {
      "speaker": "hans",
      "text": "Der Herr? Oder die Gemeinde, die ihn hören soll?"
    }
  ],
  "ch3Demand_labor_A": [
    {
      "speaker": "lotzer",
      "text": "Dann bleibt die Pflicht bestehen, aber sie wäre begrenzt und berechenbarer."
    }
  ],
  "ch3Demand_labor_B": [
    {
      "speaker": "georg",
      "text": "Das würde wenigstens verhindern, dass unser eigener Hof zuerst verliert."
    }
  ],
  "ch3Demand_labor_C": [
    {
      "speaker": "katharina",
      "text": "Das verändert die Belastung – aber noch nicht, wer über deine Zeit entscheidet."
    }
  ],
  "ch3Demand_labor_D": [
    {
      "speaker": "lotzer",
      "text": "Das geht am weitesten. Dann müsst ihr begründen, warum diese Pflicht grundsätzlich nicht bestehen soll."
    }
  ],
  "ch3Demand_rights_A": [
    {
      "speaker": "lotzer",
      "text": "Damit beruft ihr euch auf überlieferte Rechte. Umstritten bleibt, welche Nutzung früher wirklich der Gemeinde zustand."
    }
  ],
  "ch3Demand_rights_B": [
    {
      "speaker": "katharina",
      "text": "Dann sollen beide Seiten gebunden sein. Die Gemeinde müsste auch bei der Vereinbarung eine Stimme haben."
    }
  ],
  "ch3Demand_rights_C": [
    {
      "speaker": "hans",
      "text": "Eine feste Abgabe schafft Zugang und Berechenbarkeit. Aber wer wenig hat, kann weiterhin ausgeschlossen bleiben."
    }
  ],
  "ch3Demand_rights_D": [
    {
      "speaker": "lotzer",
      "text": "Damit beansprucht die Gemeinde die Verfügung selbst. Bestehende Ansprüche der Herrschaft müsstet ihr grundlegend prüfen."
    }
  ],
  "ch3Demand_church_A": [
    {
      "speaker": "hans",
      "text": "Damit entscheidet die Gemeinde über ihren Pfarrer. Das Evangelium soll auch Maßstab seiner Predigt bleiben."
    }
  ],
  "ch3Demand_church_B": [
    {
      "speaker": "lotzer",
      "text": "Die Herrschaft bleibt beteiligt. Was geschieht, wenn die Gemeinde ihre Zustimmung verweigert?"
    }
  ],
  "ch3Demand_church_C": [
    {
      "speaker": "jakob",
      "text": "Dann müsst ihr klären, wer diese Kriterien auslegt und wann die Gemeinde einen Pfarrer akzeptiert."
    }
  ],
  "ch3Demand_church_D": [
    {
      "speaker": "lotzer",
      "text": "Damit entzieht ihr der Herrschaft die geistlichen Ämter. Aber wie werden innerhalb der Gemeinde die Entscheidungen begründet?"
    }
  ],
  "ch3Religion_distinction": [
    {
      "speaker": "jakob",
      "text": "Dann willst du die Ebenen zunächst auseinanderhalten."
    },
    {
      "speaker": "konrad",
      "text": "Aber die Frage bleibt, was diese Freiheit dann für unser Leben bedeutet."
    }
  ],
  "ch3Religion_critical_gospel": [
    {
      "speaker": "anna",
      "text": "Dann wird das Evangelium zum Maßstab – aber noch nicht zur fertigen politischen Antwort."
    }
  ],
  "ch3Religion_worldly_transformation": [
    {
      "speaker": "konrad",
      "text": "Dann kann Glauben nicht beim Reden bleiben."
    },
    {
      "speaker": "jakob",
      "text": "Dann wird umso wichtiger, wie sicher wir behaupten können, Gottes Willen zu kennen."
    }
  ],
  "ch3Religion_hermeneutical_caution": [
    {
      "speaker": "lotzer",
      "text": "Dann interessiert dich nicht nur die Forderung, sondern auch, wie sie begründet wird."
    }
  ],
  "ch3Print_full": [
    {
      "speaker": "printer",
      "text": "Dann geben wir ihnen den ganzen Text. Wer ihn liest, muss auch seine Einschränkungen und Begründungen mitlesen."
    }
  ],
  "ch3Print_summary": [
    {
      "speaker": "printer",
      "text": "Dann kommen die Forderungen schnell an. Was du weglässt, werden manche nicht mehr erfahren."
    }
  ],
  "ch3Print_religious": [
    {
      "speaker": "printer",
      "text": "Dann tritt die Begründung hervor. Die Leser werden fragen, welche Veränderungen ihr daraus ableitet."
    }
  ],
  "ch3Print_accusation": [
    {
      "speaker": "printer",
      "text": "Dann werden sie aufhorchen. Aber die Worte könnten auch Menschen gegen euch aufbringen."
    }
  ],
  "ch3Resistance_negotiate": [
    {
      "speaker": "peter",
      "text": "Dann bleibt wenigstens die Möglichkeit einer Einigung."
    },
    {
      "speaker": "konrad",
      "text": "Wenn die andere Seite überhaupt reden will."
    }
  ],
  "ch3Resistance_collective_pressure": [
    {
      "speaker": "anna",
      "text": "Dann handeln wir gemeinsam, ohne gleich alles aufs Spiel zu setzen."
    },
    {
      "speaker": "konrad",
      "text": "Druck ist nur Druck, wenn er auch etwas kostet."
    }
  ],
  "ch3Resistance_open_resistance_possible": [
    {
      "speaker": "konrad",
      "text": "Dann ziehst du irgendwo eine Grenze."
    },
    {
      "speaker": "peter",
      "text": "Und hinter dieser Grenze könnte es schwer werden, zurückzugehen."
    }
  ],
  "ch3Resistance_theological_clarification": [
    {
      "speaker": "jakob",
      "text": "Dann willst du erst wissen, wofür du Verantwortung übernehmen kannst."
    },
    {
      "speaker": "konrad",
      "text": "Während wir prüfen, entscheiden andere vielleicht für uns."
    }
  ],
  "ch3Reason_burdens": [
    {
      "speaker": "peter",
      "text": "Dann bleiben die Höfe und Menschen der Ausgangspunkt. Daran werden wir jede Regelung messen müssen."
    }
  ],
  "ch3Reason_communities": [
    {
      "speaker": "anna",
      "text": "Gemeinsam können wir gehört werden. Aber die Gemeinden bringen nicht alle dieselben Interessen mit."
    }
  ],
  "ch3Reason_religion": [
    {
      "speaker": "jakob",
      "text": "Dann müssen wir uns auch der Prüfung unserer Auslegung stellen."
    }
  ],
  "ch3Reason_limits": [
    {
      "speaker": "lotzer",
      "text": "Begründungen begrenzen Macht nur, wenn man sich auf sie berufen kann."
    }
  ],
  "ch3Reason_action": [
    {
      "speaker": "konrad",
      "text": "Aus gemeinsamen Worten kann gemeinsames Handeln werden. Wie weit es geht, bleibt unsere Verantwortung."
    }
  ]
};
export const chapterThreeScenes = [
  {
    "id": "ch3_road",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Straße nach Memmingen",
    "background": "road_to_memmingen"
  },
  {
    "id": "ch3_hub",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Memmingen",
    "background": "memmingen_square"
  },
  {
    "id": "ch3_arrivals",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Drei Gemeinden",
    "background": "memmingen_square"
  },
  {
    "id": "ch3_memory",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Was du aus deinem Dorf mitbringst",
    "background": "memmingen_square"
  },
  {
    "id": "ch3_entry",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Ein erster Schwerpunkt",
    "background": "memmingen_square"
  },
  {
    "id": "ch3_clusters",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Der Beschwerdetisch",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_lotzer",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Eine gemeinsame Forderung",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_demand",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Welche Forderung?",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_articles",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Die Zwölf Artikel",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_compare",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Deine Forderung und die Artikel",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_hinge",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Freiheit und Evangelium",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_workshop",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Die Auslegungswerkstatt",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_voices",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Drei Deutungsstimmen",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_religion",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Deine religiöse Position",
    "background": "memmingen_assembly"
  },
  {
    "id": "ch3_printshop",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "In der Druckerei",
    "background": "memmingen_printshop"
  },
  {
    "id": "ch3_print",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Was soll gedruckt werden?",
    "background": "memmingen_printshop"
  },
  {
    "id": "ch3_press",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "An der Presse",
    "background": "memmingen_printshop"
  },
  {
    "id": "ch3_map",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Die Bögen reisen weiter",
    "background": "memmingen_printshop"
  },
  {
    "id": "ch3_return",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Zurück im Dorf",
    "background": "village"
  },
  {
    "id": "ch3_resistance",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Und wenn der Herr Nein sagt?",
    "background": "village"
  },
  {
    "id": "ch3_reason",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Was trägt die Forderungen?",
    "background": "village"
  },
  {
    "id": "ch3_news",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Neue Nachrichten",
    "background": "village"
  },
  {
    "id": "ch3_end",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Die Forderungen stehen",
    "background": "village"
  },
  {
    "id": "ch3_chapter4",
    "chapter": 3,
    "kind": "chapter-three",
    "title": "Ordnung oder Widerstand?",
    "background": "village"
  }
];
export const complaints = [
  "Unsere eigene Arbeit bleibt liegen.",
  "Wir dürfen kaum noch Holz sammeln.",
  "Die Gemeinde darf ihren Pfarrer nicht selbst wählen.",
  "Es werden zusätzliche Abgaben verlangt.",
  "Das Fischen wird eingeschränkt.",
  "Alte Weiderechte gelten plötzlich nicht mehr.",
  "Ein Herr kann über Menschen verfügen, als gehörten sie ihm.",
  "Wir wissen oft nicht, worauf neue Forderungen überhaupt beruhen."
];
export const interpretationTexts = [
  "Wenn alle Menschen durch Christus erlöst sind, kann daraus Kritik an Verhältnissen entstehen, in denen Menschen wie Eigentum behandelt werden.",
  "Christliche Freiheit betrifft zuerst die Beziehung zu Gott; eine konkrete politische Ordnung folgt daraus nicht automatisch.",
  "Weil christliche Freiheit auch das Verhältnis zum Nächsten verändert, können gesellschaftliche Verhältnisse daran geprüft werden.",
  "Wer durch Christus frei ist, darf keiner weltlichen Autorität mehr unterstehen."
];
export const clusterReasons = {rights:'Überlieferte Nutzungsrechte',dependence:'Verfügung über Menschen und ihre Zeit',voice:'Mitsprache und Legitimation',basis:'Berechenbarkeit und Rechtsgrundlage'};
export const tones = {full:'nuanced',summary:'simplified',religious:'religious',accusation:'confrontational'};
