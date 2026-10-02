import { documents } from './documents.js';
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
const assessed = (context,prompt,solution,options,success,hints) => ({contextLabel:'Am heutigen Tag:',contextStatement:context,prompt,solution,hints,options:options.map(([id,text])=>({id,text,...(id===solution ? {feedback:success} : {})}))});
const open = (context,prompt,options) => ({contextLabel:'Im Gespräch:',contextStatement:context,prompt,reflective:true,options:options.map(([id,label,text,reaction])=>({id,label,text,reaction}))});
export const chapterTwoChoices = {
  forestArgument:assessed('Anna: „Wir sammeln hier seit Jahren.“ Der Verwalter beruft sich auf die Herrschaft des Grundherrn.','Worauf würdest du Annas Einwand am stärksten stützen?','A',[
    ['A','Die Gemeinde nutzt diesen Ort offenbar schon seit langer Zeit.'],['B','Im Wald sollte grundsätzlich jeder machen dürfen, was er möchte.'],['C','Der neue Grenzpfahl zeigt, dass der Grundherr über jedes Recht im Wald entscheiden darf.'],['D','Alte Regeln sind immer gerechter als neue.']
  ],'Das ist ein tragfähiges Argument: Die lange Nutzung und ältere Regeln können darauf hindeuten, dass die Gemeinde gewachsene Nutzungsrechte beanspruchte. Genau solche Rechte konnten mit stärkeren herrschaftlichen Ansprüchen in Konflikt geraten.',['Denkimpuls:\nWelche deiner Beobachtungen spricht für bereits geregelte Nutzung – statt für einen regellosen Wald?','Hinweis:\nEin neuer Pfahl zeigt einen Anspruch, aber beweist nicht, dass ältere Rechte erloschen sind. Lange Nutzung ist ein Argument, noch kein abschließender Rechtsbeweis.']),
  forestConflict:assessed('Anna beruft sich auf ältere Nutzung; der Verwalter auf die Anweisungen des Grundherrn.','Worum geht es in diesem Streit vor allem?','B',[
    ['A','darum, ob Menschen überhaupt Holz zum Heizen brauchen'],['B','darum, ob überlieferte Nutzungsrechte der Gemeinde durch den Herrschaftsanspruch des Grundherrn eingeschränkt werden dürfen'],['C','darum, ob der Wald vollständig der Dorfgemeinschaft gehören sollte'],['D','darum, ob Anna den Verwalter persönlich respektiert']
  ],'Es geht nicht nur um Holz. Im Hintergrund steht die Frage, wer über die Nutzung des Waldes bestimmen darf und wie verbindlich ältere Rechte der Gemeinde sind.',['Denkimpuls:\nWelche Begründungen führen beide Seiten an? Geht es um Bedarf, um Eigentum am ganzen Wald oder um bestimmte Nutzungen?','Hinweis:\nDie Gemeinde kann Nutzungsrechte beanspruchen, ohne damit das gesamte Eigentum am Wald zu beanspruchen.']),
  forestResponse:open('Der Verwalter verlangt: „Also? Das Holz bleibt hier.“','Wie antwortest du?',[
    ['take','A','Wir nehmen das Holz trotzdem mit.',lines('overseer',['Ich werde das melden.'])],['leave','B','Wir lassen es hier.',lines('anna',['Für heute. Aber damit ist die Frage nicht beantwortet.'])],['legal_basis','C','Dann möchte ich wissen, worauf sich dieses Verbot stützt.',talk(['overseer','Ich setze die Anweisungen des Herrn durch.'],['player','Das war nicht meine Frage.'],['overseer','Dann müsst ihr sie dem Herrn stellen.'])],['community','D','Das sollte nicht hier zwischen uns entschieden werden. Das Dorf muss darüber sprechen.',lines('anna',['Das betrifft schließlich nicht nur uns.'])]
  ]),
  corveeSacrifice:open('Die Arbeit am Herrenhof unterbricht Peters geplanten Tag.','Welche eigene Arbeit verschiebst du?',[
    ['grain','A','Getreide / eigene Feldarbeit',lines('peter',['Wenn der Regen kommt, verlieren wir vielleicht einen Teil davon.'])],['fence','B','Den beschädigten Zaun',lines('peter',['Dann bleibt der Zaun offen. Hoffentlich geht nichts aufs Feld.'])],['feed','C','Futter / Versorgung der Tiere',lines('peter',['Dann mache ich das heute Abend noch. Irgendwann.'])]
  ]),
  corveeResponse:open('Der Bote sagt: „Ich brauche eine Antwort.“','Wie antwortest du?',[
    ['go','A','Ich gehe selbst zum Herrenhof.',lines('peter',['Und meine Arbeit wartet.'])],['substitute','B','Ich versuche, jemanden an meiner Stelle zu schicken.',lines('peter',['Dann schulde ich ihm etwas.'])],['delay','C','Ich bitte um Aufschub.',lines('overseer',['Ob du Aufschub bekommst, entscheidet nicht du.'])],['refuse','D','Ich weigere mich.',lines('overseer',['Dann melde ich, dass du deine Pflicht verweigerst.'])]
  ]),
  corveeDefinition:assessed('Peter hatte seinen Arbeitstag geplant. Dann wurde von ihm verlangt, am Herrenhof zu arbeiten.','Was unterscheidet diese Arbeit von Peters Arbeit auf dem eigenen Hof?','B',[
    ['A','Die Arbeit am Herrenhof ist immer körperlich schwerer.'],['B','Peter muss sie aufgrund seines Herrschafts- bzw. Abhängigkeitsverhältnisses leisten.'],['C','Jede Arbeit außerhalb des eigenen Hofes ist Frondienst.'],['D','Peter erhält für Arbeit am Herrenhof grundsätzlich überhaupt nichts zurück.']
  ],'Frondienst ist eine verpflichtende Arbeitsleistung, die aus einem Herrschafts- bzw. Abhängigkeitsverhältnis entsteht. Peter kann über diesen Teil seiner Arbeitszeit nicht frei verfügen.\n\nDas Problem ist also nicht nur zusätzliche Arbeit. Es geht auch darum, wer über Peters Zeit entscheidet.',['Denkimpuls:\nAuch Peters eigene Arbeit kann schwer sein. Und freiwillige Hilfe beim Nachbarn findet ebenfalls außerhalb des Hofes statt. Was unterscheidet die Forderung des Herrenhofs?','Hinweis:\nAchte auf den Grund der Verpflichtung: Peter wird nicht gefragt, ob er heute helfen möchte.']),
  duesResponse:open('Margarethe fragt: „Und wenn ich sage, dass wir das selbst brauchen?“','Wie reagierst du auf die Forderung?',[
    ['pay','A','Wir geben die geforderte Menge ab.',lines('margarethe',['Für ihn vielleicht. Für uns fehlt es nun.'])],['delay','B','Wir bitten darum, einen Teil später zu leisten.',lines('overseer',['Das kann ich nicht entscheiden.'])],['withhold','C','Wir behalten einen Sack zurück.',lines('overseer',['Wenn die Menge fehlt, wird man nachfragen.'])],['question_basis','D','Wir verlangen zu wissen, wie die Forderung begründet wird.',talk(['overseer','Ich überbringe sie nur.'],['margarethe','Das ist keine Antwort.'])]
  ]),
  assemblyConnection:assessed('Im Wald ging es um Nutzung, bei Peter um Arbeitszeit und bei Margarethe um die Ernte.','Was verbindet diese drei Situationen am stärksten?','B',[
    ['A','Es geht überall nur darum, dass Menschen zu wenig besitzen.'],['B','In allen drei Situationen greifen andere in Entscheidungen über Nutzung, Zeit oder Ertrag ein.'],['C','Alle drei Situationen zeigen, dass die Dorfbewohner grundsätzlich keine Regeln akzeptieren wollen.'],['D','In allen drei Fällen ist ausschließlich Geld das Problem.']
  ],'Die Konflikte unterscheiden sich – aber jedes Mal geht es auch darum, wer über Lebensbedingungen entscheiden darf. Die Entscheidungen anderer verändern Nutzung, Planung oder Versorgung.',['Denkimpuls:\nVergleiche, was Anna, Peter und Margarethe jeweils entscheiden wollten und wer eingriff.','Hinweis:\nHolz, Zeit und Ernte sind verschiedene Dinge. Welche Frage nach Entscheidungsbefugnissen kehrt dennoch wieder?']),
  forestDemand:assessed('Beschwerde: „Wir dürfen den Wald kaum noch nutzen.“','Welche Forderung macht die Beschwerde konkret?','B',[
    ['A','Der Wald soll niemandem mehr gehören.'],['B','Die bisherigen Nutzungsrechte der Gemeinde sollen wieder gelten.'],['C','Jeder darf im Wald tun, was er möchte.']
  ],'Die Forderung benennt, welche Rechte wieder anerkannt werden sollen. Sie verlangt geregelte Nutzung der Gemeinde statt regelloser Verfügung über den ganzen Wald.',['Denkimpuls:\nWelche Regelung würde Annas Einwand aufnehmen, ohne jede Ordnung abzuschaffen?','Hinweis:\nDenke an die älteren Markierungen: Sie sprechen gerade für Regeln bestimmter Nutzungen.']),
  corveeDemand:assessed('Beschwerde: „Unsere eigene Arbeit bleibt liegen.“','Welche Forderung setzt am erlebten Problem an?','A',[
    ['A','Frondienste sollen begrenzt und nach klaren Regeln festgelegt werden.'],['B','Niemand darf mehr für jemand anderen arbeiten.'],['C','Jeder Grundherr soll selbst alle Arbeiten erledigen.']
  ],'Begrenzte und klar geregelte Dienste machen die eigene Arbeit planbarer. Das ist präziser als die Ablehnung jeder Arbeit für andere, zu der auch freiwillige Hilfe gehören würde.',['Denkimpuls:\nPeter wollte seinen Hof versorgen. Welche Veränderung würde ihm dabei helfen?','Hinweis:\nUnterscheide eine bindende Dienstpflicht von freiwilliger Zusammenarbeit.']),
  duesDemand:assessed('Beschwerde: „Neue Forderungen machen unsere Versorgung unsicher.“','Welche Forderung beschreibt eine nachvollziehbare Veränderung?','A',[
    ['A','Abgaben sollen verbindlich und nachvollziehbar geregelt und nicht beliebig ausgeweitet werden.'],['B','Alle Abgaben müssen sofort verschwinden.'],['C','Jeder entscheidet selbst, ob er überhaupt etwas abgibt.']
  ],'Die Forderung benennt Regeln, an denen weitere Ansprüche gemessen werden können. Sie greift Unsicherheit und fehlende Mitsprache auf, statt jede gemeinsame Verpflichtung pauschal zu verwerfen.',['Denkimpuls:\nWas brachte Margarethes ursprüngliche Planung zusätzlich durcheinander?','Hinweis:\nEine konkrete Forderung erklärt, wie Ansprüche festgelegt und Veränderungen begründet werden sollen.']),
  lutherPoliticalInference:assessed(documents.freedom.passages[0]+' Konrad meint, damit seien auch die heutigen Abhängigkeiten eindeutig abgelehnt.','Lässt sich aus Luthers Freiheitsgedanken unmittelbar eine politische Forderung ableiten?','B',[
    ['A','Ja, weil „niemandem untertan“ jede Form weltlicher Herrschaft ablehnt.'],['B','Nein, weil Luther zunächst die Freiheit des Menschen vor Gott meint; die politischen Folgen sind damit noch nicht entschieden.'],['C','Nein, weil christliche Freiheit grundsätzlich keinerlei Auswirkungen auf gesellschaftliches Handeln hat.'],['D','Ja, weil jeder Gehorsam mit christlicher Freiheit unvereinbar ist.']
  ],'Luthers Freiheitsgedanke kann gesellschaftliche Fragen aufwerfen, ist aber noch kein fertiges politisches Programm. Der Dienst am Nächsten verhindert zugleich, Freiheit als folgenlose Innerlichkeit zu verstehen.',['Denkimpuls:\nPrüfe, ob Luther mit „niemandem untertan“ bereits eine konkrete politische Ordnung beschreibt. Nimm auch den zweiten Leitsatz ernst.','Hinweis:\nFreiheit vor Gott und Dienst am Nächsten gehören zusammen. Damit ist das Handeln angesprochen, aber noch keine einzelne politische Forderung begründet.'])
};
chapterTwoChoices.forestArgument.options[1].hints=['Anna behauptet nicht, dass im Wald keinerlei Regeln gelten sollen. Welche Hinweise sprechen dafür, dass bereits vorher geregelte Nutzungsformen bestanden?',chapterTwoChoices.forestArgument.hints[1]];
chapterTwoChoices.forestArgument.options[2].hints=['Ein Herrschaftszeichen zeigt einen Anspruch. Beweist es automatisch, dass ältere Rechte nicht mehr bestehen?',chapterTwoChoices.forestArgument.hints[1]];
chapterTwoChoices.forestArgument.options[3].hints=['Dass etwas alt ist, macht es nicht automatisch gerecht. Entscheidend ist, ob eine bisher anerkannte Nutzung einfach eingeschränkt werden kann.',chapterTwoChoices.forestArgument.hints[1]];
chapterTwoChoices.corveeDefinition.options[0].hints=['Auch die Arbeit auf Peters eigenem Feld kann sehr anstrengend sein. Entscheidend ist also nicht die körperliche Belastung.',chapterTwoChoices.corveeDefinition.hints[1]];
chapterTwoChoices.corveeDefinition.options[2].hints=['Freiwillige Hilfe beim Nachbarn wäre ebenfalls Arbeit außerhalb des eigenen Hofes. Was unterscheidet sie von der Forderung des Herrenhofs?',chapterTwoChoices.corveeDefinition.hints[1]];
chapterTwoChoices.corveeDefinition.options[3].hints=['Entscheidend ist nicht zuerst die Frage nach einer unmittelbaren Gegenleistung. Achte darauf, warum Peter überhaupt arbeiten muss.',chapterTwoChoices.corveeDefinition.hints[1]];
chapterTwoChoices.lutherPoliticalInference.options[2].hints=['Erinnere dich an den Dienst am Nächsten: Luthers Freiheit bleibt nicht ohne Folgen für das Handeln. Offen ist aber, welche gesellschaftlichen Konsequenzen daraus folgen.',chapterTwoChoices.lutherPoliticalInference.hints[1]];
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
  forest:{prompt:'Was erscheint dir an der Situation besonders problematisch?',items:[['rights','bisherige Nutzungsrechte werden eingeschränkt'],['voice','die Gemeinde kann kaum mitentscheiden'],['clarity','die Regeln sind nicht transparent'],['power','der Grundherr beansprucht weitreichende Verfügung'],['wood','Anna bekommt heute kein Holz']]},
  corvee:{prompt:'Was macht den Frondienst für Peter besonders belastend?',items:[['work','zusätzliche Arbeit'],['planning','schlechtere Planung der eigenen Arbeit'],['time','ein anderer verfügt über einen Teil seiner Zeit'],['absolute','jede Arbeit für andere ist grundsätzlich ungerecht'],['supply','die eigene Versorgung kann gefährdet werden']],warning:'Arbeit für andere kann auch freiwillige Hilfe sein. An Peters Lage belastet besonders, dass ihm die Entscheidung über seine Zeit genommen wird.'},
  dues:{prompt:'Was macht die Situation besonders belastend?',items:[['amount','Höhe der Abgaben'],['voice','fehlende Mitsprache'],['uncertainty','Unsicherheit durch zusätzliche Forderungen'],['supply','Gefahr für Versorgung und Aussaat'],['absolute','grundsätzlich jede Abgabe ist ungerecht']],warning:'Eine Abgabe ist nicht allein deshalb ungerecht, weil es sie gibt. In Margarethes Lage stehen Versorgung, Mitsprache und die Begründung neuer Forderungen zur Frage.'}
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
  subject:['bisherige Rechte der Gemeinde','Frondienste','Abgaben','Entscheidungen über unser Dorf','persönliche Bindungen und Dienstpflichten','Jagd- und Fischereirechte','Entscheidungen über die Pfarrerwahl','Regeln über Wohnort und Fortzug','Strafen und Bußen'],
  rule:['verbindlich und nachvollziehbar geregelt werden','begrenzt werden und die Versorgung sichern','nicht ohne nachvollziehbaren Grund verändert werden'],
  voice:['und die Gemeinde dabei mitentscheiden kann','und Änderungen vor der Gemeinde begründet werden müssen']
};
export const chapterTwoNotebook = {
  forest:['Die Bewohner nutzen den Wald nicht einfach regellos. Sie berufen sich auf überlieferte Nutzungsrechte. Diese geraten mit stärkeren Herrschaftsansprüchen in Konflikt.'],
  corvee:['Frondienst bezeichnet verpflichtende Arbeitsleistungen, die aus einem Herrschafts- bzw. Abhängigkeitsverhältnis entstehen.','Für Peter bedeutet das: Ein anderer kann über einen Teil seiner Arbeitszeit verfügen – auch wenn dadurch die Arbeit auf seinem eigenen Hof liegen bleibt.'],
  dues:['Abgaben konnten bäuerliche Haushalte stark belasten. Entscheidend war nicht nur ihre Höhe, sondern auch, wie vorhersehbar sie waren und wie wenig Einfluss die Betroffenen auf ihre Festlegung hatten.','Art und Höhe von Abgaben unterschieden sich je nach Region, Herrschaft und Rechtsverhältnis. Die zehn Säcke im Spiel veranschaulichen eine Planung; sie geben keine historische Erntemenge oder allgemeine Abgabenquote an.']
};
