import { chapterFourChoices } from './chapter-four.js';
import { chapterFiveChoices } from './chapter-five.js';
import { chapterThreeChoices } from './chapter-three.js';
import { chapterTwoChoices } from './chapter-two.js';
import { documents } from './documents.js';
import { dialogues } from './dialogues.js';
export const choices = {
  ...chapterFiveChoices,
  ...chapterFourChoices,
  ...chapterThreeChoices,
  ...chapterTwoChoices,
  initialFreedomInterpretation: {
    contextLabel: 'Jakob zeigt ein Flugblatt, auf dem steht:',
    contextStatement: documents.freedom.passages[0],
    prompt: 'Wie verstehst du diese Aussage?', reflective: true,
    options: [
      { id: 'freedom_no_obedience', label: 'A', text: 'Dann sollten wir prüfen, ob unsere Herren solche Pflichten noch von uns verlangen dürfen.', reaction: [{ speaker: 'peter', emotion: 'determined', text: 'Genau. Dann müsste sich hier einiges ändern.' }, { speaker: 'jakob', emotion: 'thoughtful', text: 'Vielleicht. Aber lies erst weiter.' }] },
      { id: 'freedom_different_kind', label: 'B', text: 'Vielleicht spricht Luther von einer anderen Art von Freiheit.', reaction: [{ speaker: 'jakob', emotion: 'thoughtful', text: 'Das frage ich mich auch.' }, { speaker: 'peter', emotion: 'skeptical', text: 'Dann soll er gefälligst sagen, welche Freiheit er meint.' }] },
      { id: 'freedom_life_tension', label: 'C', text: 'So wie es dort steht, passt es nicht zu unserem Leben.', reaction: [{ speaker: 'anna', emotion: 'thoughtful', text: 'Vielleicht liegt genau darin das Problem.' }, { speaker: 'anna', emotion: 'concerned', text: 'Auf dem Papier frei – und morgen trotzdem Frondienst?' }] },
      { id: 'freedom_responsibility', label: 'D', text: 'Vielleicht kann man frei sein und trotzdem Verantwortung für andere übernehmen.', reaction: [{ speaker: 'anna', emotion: 'engaged', text: 'Frei sein und sich trotzdem freiwillig an andere binden?' }, { speaker: 'jakob', emotion: 'thoughtful', text: 'Dann müssten wir fragen, welche Bindungen wir selbst eingehen und welche uns auferlegt werden.' }] }
    ]
  },
  freedomSocialFirstThought: {
    contextLabel: 'Peter fragt:',
    contextStatement: dialogues.peter[0].text,
    prompt: 'Was antwortest du Peter?', reflective: true,
    options: [
      { id: 'peter_god_first', label: '1', text: 'Vielleicht betrifft sie zuerst das Verhältnis des Menschen zu Gott.', reaction: [{ speaker: 'peter', emotion: 'concerned', text: 'Vor Gott frei. Aber vor dem Herrn weiter abhängig.' }, { speaker: 'peter', emotion: 'skeptical', text: 'Ich weiß noch nicht, ob mich das überzeugt.' }] },
      { id: 'peter_social_consequence', label: '2', text: 'Vielleicht muss diese Freiheit auch Folgen für das äußere Leben haben.', reaction: [{ speaker: 'peter', emotion: 'neutral', text: 'Das würde ich verstehen.' }, { speaker: 'peter', emotion: 'neutral', text: 'Die Frage ist nur: Welche Folgen?' }] },
      { id: 'peter_uncertain', label: '3', text: 'Das weiß ich noch nicht.', reaction: [{ speaker: 'peter', emotion: 'neutral', text: 'Wenigstens sind wir uns darin einig.' }, { speaker: 'peter', emotion: 'concerned', text: 'Ich weiß es nämlich auch nicht.' }] }
    ]
  },
  freedomAndOuterLife: {
    contextLabel: 'Jakob sagt:',
    contextStatement: dialogues.jakob.map(line => line.text).join(' '),
    prompt: 'Welche Deutung erklärt sowohl die Freiheit vor Gott als auch ihr Verhältnis zur äußeren Ordnung am genauesten?', solution: 'D',
    options: [
      { id: 'A', text: 'Christliche Freiheit sichert die Annahme vor Gott; welche Pflichten gegenüber anderen bestehen, ergibt sich dagegen aus der geltenden Ordnung.', hints: ['Denkimpuls:\nNimm Luthers zweite Aussage ernst: Warum bezeichnet er den freien Christen zugleich als ‚dienstbaren Knecht‘?', 'Hinweis:\nPrüfe, ob Luther zwischen Freiheit vor Gott und Folgen für das Handeln wirklich eine vollständige Trennung zieht.'] },
      { id: 'B', text: 'Christliche Freiheit beginnt im Verhältnis zu Gott. Weil der Mensch sich Gottes Anerkennung nicht mehr verdienen muss, verändert sie zugleich sein Handeln gegenüber anderen.', partial: true, feedback: 'Das erfasst einen wichtigen Zusammenhang:\nDie Freiheit vor Gott verändert das Verhältnis des Menschen zu seinen Werken und damit auch sein Handeln gegenüber anderen.', followup: 'Prüfe noch einen Schritt weiter:\nFolgt daraus bei Luther bereits, dass bestimmte gesellschaftliche Ordnungen verändert werden müssen?' },
      { id: 'C', text: 'Weil alle Christen vor Gott gleichermaßen frei sind, müssen ihre äußeren Pflichten auf ihrer persönlichen Zustimmung beruhen.', hints: ['Denkimpuls:\nBegründet die gleiche Freiheit vor Gott bereits ein Verfahren, nach dem weltliche Pflichten nur durch Zustimmung gelten?', 'Die Leitsätze bestimmen Freiheit im Glauben und Dienst aus Liebe. Eine politische Zustimmungsordnung wird darin nicht festgelegt.'] },
      { id: 'D', text: 'Christliche Freiheit und äußere Ordnung sind voneinander zu unterscheiden. Trotzdem kann gefragt werden, welche Folgen die Freiheit für das Handeln innerhalb dieser Ordnung hat.', feedback: 'Das trifft die Spannung besonders genau:\nLuther unterscheidet die Freiheit des Menschen vor Gott von seiner Stellung in der äußeren Welt. Diese Freiheit bleibt dennoch nicht folgenlos, weil sie zum Dienst am Nächsten freisetzt. Noch offen ist damit allerdings, wie weit daraus gesellschaftliche Veränderungen folgen können. B beschreibt den veränderten Beweggrund zutreffend, klärt aber die äußere Ordnung nicht. A überlässt diese allein den geltenden Pflichten; C macht aus der Glaubensfreiheit bereits ein politisches Zustimmungsprinzip.' }
    ]
  },
  serviceBoundary: {
    prompt: 'Warum verbindet der ‚Dienst am Nächsten‘ beide Bereiche?', solution: 'B',
    hints: ['Denkimpuls:\nWoher kommt die Freiheit zum Dienst, und wem kommt dieser Dienst zugute?', 'Hinweis:\nUnterscheide den Grund des Handelns von seinem Ziel: Muss Hilfe Gottes Annahme erst verdienen? Und bleibt sie ohne Folgen für den Mitmenschen?'],
    options: [
      { id: 'A', text: 'Weil der Dienst am Nächsten durch sichtbare Werke bestätigt, dass der Mensch Gottes Annahme verdient.', hints: ['Denkimpuls:\nWem gilt der Dienst: dem Nächsten oder der eigenen Anerkennung vor Gott?', 'Hinweis:\nDie Hilfe wird nicht zum Beweis eigenen Verdienstes. Sie folgt aus der im Glauben angenommenen Gnade und gilt dem anderen.'] },
      { id: 'B', text: 'Weil die Freiheit vor Gott den Menschen zu einem neuen Handeln gegenüber anderen freisetzt.', feedback: 'Der Zusammenhang liegt im Beweggrund:\nDie Freiheit entsteht im Verhältnis zu Gott. Sie bleibt aber nicht innerlich eingeschlossen, sondern verändert das Handeln gegenüber dem Mitmenschen. Deshalb verbindet der ‚Dienst am Nächsten‘ beide Ebenen. A und C machen die Werke wieder zum Verdienst oder zur Ergänzung der Annahme. D leitet aus dieser theologischen Beziehung bereits gleiche politische Rechte ab; das geht über die beiden Leitsätze hinaus.' },
      { id: 'C', text: 'Weil die Annahme durch Gott den Anfang macht und der Mensch sie durch gute Werke vervollständigen muss.', hints: ['Denkimpuls:\nErinnere dich an die Rechtfertigungskette: Sind gute Werke die Voraussetzung oder die Folge der Annahme durch Gott?', 'Hinweis:\nAuch als Ergänzung würden Werke zur Bedingung vollständiger Annahme. Bei Luther sind sie deren Folge.'] },
      { id: 'D', text: 'Weil die gleiche Freiheit vor Gott den Dienst an anderen zu einer Forderung nach gleichen politischen Rechten macht.', hints: ['Denkimpuls:\nGleiche Freiheit vor Gott ist nicht schon ein ausgearbeitetes Programm gleicher politischer Rechte. Was begründet der zweite Leitsatz unmittelbar?'] }
    ]
  },
  obedienceBoundary: {
    prompt: 'Warum ist ‚Gehorsam‘ schwieriger einzuordnen als ‚Frondienst‘ oder ‚Abgaben‘?', solution: 'B',
    hints: ['Denkimpuls:\nWas wäre, wenn eine Anordnung deinem Gewissen widerspricht?', 'Hinweis:\nVergleiche eine Abgabe mit einer Anordnung, durch die ein anderer zu Schaden käme. Reicht bei beiden die Frage, wer etwas befohlen hat?'],
    options: [
      { id: 'A', text: 'Weil die innere Glaubenshaltung entscheidet, ob das Befolgen einer Anordnung christlicher Gehorsam ist.', hints: ['Denkimpuls:\nReicht die innere Haltung aus, wenn das befohlene Verhalten einen anderen Menschen schädigt?'] },
      { id: 'B', text: 'Weil Gehorsam äußeres Verhalten betrifft, aber zugleich Gewissen und Verantwortung berühren kann.', feedback: 'Das trifft die Schwierigkeit:\nGehorsam gehört zur äußeren Ordnung, kann aber zugleich Fragen von Gewissen und Verantwortung aufwerfen. Gerade deshalb lässt sich das innere und äußere Leben nicht vollständig voneinander trennen. Die innere Haltung allein genügt nicht (A); persönliche Zustimmung ist hier kein allgemeiner Geltungsgrund weltlicher Pflichten (C). Auch eine rechtmäßige Anordnung enthebt den Menschen nicht der Verantwortung für ihre Folgen (D).' },
      { id: 'C', text: 'Weil Gehorsam erst durch die freiwillige Zustimmung des Christen zu einer weltlichen Anordnung verbindlich wird.', hints: ['Denkimpuls:\nUnterscheide freiwilligen Dienst aus Liebe von der Behauptung, jede weltliche Pflicht gelte nur nach persönlicher Zustimmung.', 'Hinweis:\nDie Frage verbindet äußeres Handeln mit Gewissen und Verantwortung. Ein allgemeines Zustimmungsprinzip folgt daraus noch nicht.'] },
      { id: 'D', text: 'Weil das Befolgen einer rechtmäßigen Anordnung bereits ausreicht, um Gewissen und Verantwortung zu wahren.', hints: ['Denkimpuls:\nKann eine Anordnung rechtmäßig sein und dennoch Fragen nach ihren Folgen für andere aufwerfen?'] }
    ]
  },
  freedomComparison: {
    statements: ['Die Freiheit vor Gott entlastet den Menschen vom Verdienst guter Werke; seine äußeren Pflichten sind daher allein nach der geltenden Ordnung zu beurteilen.', 'Die gleiche Freiheit der Christen vor Gott begründet, dass weltliche Pflichten nur mit ihrer persönlichen Zustimmung verbindlich sind.'],
    prompt: 'Wie sind diese beiden Folgerungen aus Luthers Leitsätzen zu beurteilen?', solution: 'D',
    hints: ['Denkimpuls:\nWelche Bedeutung hat der Dienst am Nächsten für bestehende Pflichten? Und folgt aus gleicher Freiheit vor Gott schon ein politisches Zustimmungsprinzip?', 'Hinweis:\nPrüfe beide Ableitungen: Achte auf den Dienst aus Liebe und auf die Unterscheidung von Freiheit vor Gott und äußerer Rechtsordnung.'],
    wrongFeedback: 'Denkimpuls:\nDie erste Aussage greift zu kurz, weil …\n… die Freiheit vor Gott auch das Handeln gegenüber dem Nächsten verändert.',
    options: [
      { id: 'A', text: 'Beide Aussagen treffen zu.' },
      { id: 'B', text: 'Nur die erste trifft zu.' },
      { id: 'C', text: 'Nur die zweite trifft zu.' },
      { id: 'D', text: 'Beide Aussagen greifen zu kurz.', feedback: 'Beide Aussagen greifen zu kurz:\nDie Freiheit im Glauben führt zum Dienst am Nächsten und bleibt deshalb nicht auf ein inneres Erleben beschränkt. Sie ist aber auch kein Versprechen automatischer politischer Befreiung. Wir müssen weiter fragen, welche gesellschaftlichen Folgen sie haben kann.' }
    ]
  },
  innerConsolidation: {
    contextLabel: 'Aussage 1:',
    contextStatement: 'Die Freiheit vor Gott entlastet den Menschen vom Verdienst guter Werke; seine äußeren Pflichten sind daher allein nach der geltenden Ordnung zu beurteilen.',
    prompt: 'Die erste Aussage greift zu kurz, weil …', solution: 'A',
    hints: ['Denkimpuls:\nWarum nennt Luther den freien Menschen zugleich einen „dienstbaren Knecht“?', 'Hinweis:\nDenke an Annas Frage: Wer hilft, um Gottes Annahme zu verdienen, handelt aus einem anderen Grund als jemand, der sich bereits angenommen weiß. Betrifft dieser Unterschied nur sein Inneres?'],
    wrongFeedback: 'Denkimpuls:\nWarum verbindet der ‚Dienst am Nächsten‘ beide Bereiche?',
    options: [
      { id: 'A', text: '… die Freiheit vor Gott auch das Handeln gegenüber dem Nächsten verändert.', feedback: 'Die erste Aussage greift zu kurz, weil …\n… die Freiheit vor Gott auch das Handeln gegenüber dem Nächsten verändert. Gute Werke müssen Gottes Annahme nicht erst bewirken. Wer aus der geschenkten Freiheit handelt, kann damit dem anderen helfen.' },
      { id: 'B', text: '… der Dienst am Nächsten Gottes Annahme erst im äußeren Leben vollendet.', hints: ['Ist Gottes Annahme noch unvollständig, bevor der Mensch hilft?', 'Unterscheide Folge und Voraussetzung: Gute Werke dienen dem Nächsten; sie ergänzen nicht Gottes Annahme.'] },
      { id: 'C', text: '… die gemeinsamen Pflichten den Menschen erst dazu befähigen, auf Gottes Gnade zu vertrauen.', hints: ['Was steht in der Rechtfertigungskette am Anfang: Gnade oder Pflichterfüllung?', 'Die Aussage kehrt die Richtung um: Gottes Zusage wird im Glauben angenommen und setzt zum Handeln frei.'] }
    ]
  },
  politicalConsolidation: {
    contextLabel: 'Aussage 2:',
    contextStatement: 'Die gleiche Freiheit der Christen vor Gott begründet, dass weltliche Pflichten nur mit ihrer persönlichen Zustimmung verbindlich sind.',
    prompt: 'Warum greift diese Aussage zu kurz?', solution: 'A',
    hints: ['Denkimpuls:\nUnterscheide die gleiche Freiheit im Glauben von einem politischen Verfahren: Begründen die beiden Leitsätze bereits die persönliche Zustimmung als Geltungsgrund weltlicher Pflichten?', 'Hinweis:\nDer Dienst am Nächsten betrifft das Leben mit anderen. Welche konkrete politische Ordnung daraus folgen soll, legen die beiden Sätze aber nicht fest. Prüfe deshalb, ob persönliche Zustimmung hier als politisches Geltungsprinzip begründet wird.'],
    wrongFeedback: 'Denkimpuls:\nGlaube, Gewissen und die Beziehung des Menschen zu Gott',
    securing: 'Welche gesellschaftlichen Folgen diese Freiheit haben kann, bleibt damit offen.',
    options: [
      { id: 'A', text: '… die Leitsätze den Dienst aus Glauben begründen, aber persönliche Zustimmung nicht als politischen Geltungsgrund festlegen.', feedback: 'Damit wird die Spannung deutlich:\nLuthers Freiheit beginnt im Verhältnis des Menschen zu Gott. Sie verändert aber auch sein Handeln gegenüber anderen. Daraus folgt noch nicht automatisch ein bestimmtes politisches Programm.' },
      { id: 'B', text: '… der Dienst am Nächsten an bestehende Pflichten bindet, deren Rechtmäßigkeit die Leitsätze bereits voraussetzen.', hints: ['Ist jede bestehende Pflicht schon deshalb gerecht, weil Christen anderen dienen?', 'Der Dienst nennt eine Orientierung für das Handeln. Er begründet weder automatisch Befreiung noch die Gerechtigkeit jeder bestehenden Ordnung.'] },
      { id: 'C', text: '… freiwilliger Dienst am Nächsten die Zustimmung zu weltlichen Pflichten bereits einschließt.', hints: ['Ist freiwilliger Dienst dasselbe wie Zustimmung zu einer rechtlich auferlegten Pflicht?', 'Freiwilliger Dienst beschreibt die Haltung des Glaubenden; daraus folgt noch kein politisches Zustimmungsverfahren.'] }
    ]
  }
};
