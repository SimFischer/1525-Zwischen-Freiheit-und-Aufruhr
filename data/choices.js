export const choices = {
  initialFreedomInterpretation: {
    prompt: 'Was meinst du?', reflective: true,
    options: [
      { id: 'freedom_no_obedience', label: 'A', text: 'Dann braucht ein Christ keinem Menschen mehr zu gehorchen.', reaction: [{ speaker: 'peter', emotion: 'determined', text: 'Genau. Dann müsste sich hier einiges ändern.' }, { speaker: 'jakob', emotion: 'thoughtful', text: 'Vielleicht. Aber lies erst weiter.' }] },
      { id: 'freedom_different_kind', label: 'B', text: 'Vielleicht spricht Luther von einer anderen Art von Freiheit.', reaction: [{ speaker: 'jakob', emotion: 'thoughtful', text: 'Das frage ich mich auch.' }, { speaker: 'peter', emotion: 'skeptical', text: 'Dann soll er gefälligst sagen, welche Freiheit er meint.' }] },
      { id: 'freedom_life_tension', label: 'C', text: 'So wie es dort steht, passt es nicht zu unserem Leben.', reaction: [{ speaker: 'anna', emotion: 'thoughtful', text: 'Vielleicht liegt genau darin das Problem.' }, { speaker: 'anna', emotion: 'concerned', text: 'Auf dem Papier frei – und morgen trotzdem Frondienst?' }] },
      { id: 'freedom_responsibility', label: 'D', text: 'Vielleicht kann man frei sein und trotzdem Verantwortung für andere übernehmen.', reaction: [{ speaker: 'anna', emotion: 'engaged', text: 'Frei sein und sich trotzdem freiwillig an andere binden?' }, { speaker: 'jakob', emotion: 'thoughtful', text: 'Vielleicht kommen wir damit seinem Gedanken näher.' }] }
    ]
  },
  freedomSocialFirstThought: {
    prompt: 'Was antwortest du Peter?', reflective: true,
    options: [
      { id: 'peter_god_first', label: '1', text: 'Vielleicht betrifft sie zuerst das Verhältnis des Menschen zu Gott.', reaction: [{ speaker: 'peter', emotion: 'concerned', text: 'Vor Gott frei. Aber vor dem Herrn weiter abhängig.' }, { speaker: 'peter', emotion: 'skeptical', text: 'Ich weiß noch nicht, ob mich das überzeugt.' }] },
      { id: 'peter_social_consequence', label: '2', text: 'Vielleicht muss diese Freiheit auch Folgen für das äußere Leben haben.', reaction: [{ speaker: 'peter', emotion: 'neutral', text: 'Das würde ich verstehen.' }, { speaker: 'peter', emotion: 'neutral', text: 'Die Frage ist nur: Welche Folgen?' }] },
      { id: 'peter_uncertain', label: '3', text: 'Das weiß ich noch nicht.', reaction: [{ speaker: 'peter', emotion: 'neutral', text: 'Wenigstens sind wir uns darin einig.' }, { speaker: 'peter', emotion: 'concerned', text: 'Ich weiß es nämlich auch nicht.' }] }
    ]
  },
  freedomAndOuterLife: {
    prompt: 'Prüfe die Aussagen. Welche erfasst Luthers Freiheitsverständnis am genauesten?', solution: 'D',
    options: [
      { id: 'A', text: 'Weil christliche Freiheit das Verhältnis zu Gott betrifft, hat sie mit dem Verhalten gegenüber anderen Menschen nichts zu tun.', hints: ['Denkimpuls:\nNimm Luthers zweite Aussage ernst: Warum bezeichnet er den freien Christen zugleich als ‚dienstbaren Knecht‘?', 'Hinweis:\nPrüfe, ob Luther zwischen Freiheit vor Gott und Folgen für das Handeln wirklich eine vollständige Trennung zieht.'] },
      { id: 'B', text: 'Christliche Freiheit beginnt im Verhältnis zu Gott. Weil der Mensch sich Gottes Anerkennung nicht mehr verdienen muss, verändert sie zugleich sein Handeln gegenüber anderen.', partial: true, feedback: 'Das erfasst einen wichtigen Zusammenhang:\nDie Freiheit vor Gott verändert das Verhältnis des Menschen zu seinen Werken und damit auch sein Handeln gegenüber anderen.', followup: 'Prüfe noch einen Schritt weiter:\nFolgt daraus bei Luther bereits, dass bestimmte gesellschaftliche Ordnungen verändert werden müssen?' },
      { id: 'C', text: 'Wer vor Gott frei ist, kann sich grundsätzlich keiner weltlichen Ordnung mehr unterordnen.', hints: ['Denkimpuls:\nBedeutet ‚niemandem untertan‘ bei Luther automatisch politische Unabhängigkeit?', 'Vergleiche die Aussage mit dem ‚dienstbaren Knecht‘. Können beide Sätze gleichzeitig gelten, wenn Luther jede äußere Ordnung grundsätzlich ablehnen würde?'] },
      { id: 'D', text: 'Christliche Freiheit und äußere Ordnung sind voneinander zu unterscheiden. Trotzdem kann gefragt werden, welche Folgen die Freiheit für das Handeln innerhalb dieser Ordnung hat.', feedback: 'Das trifft die Spannung besonders genau:\nLuther unterscheidet die Freiheit des Menschen vor Gott von seiner Stellung in der äußeren Welt. Diese Freiheit bleibt dennoch nicht folgenlos, weil sie zum Dienst am Nächsten freisetzt. Noch offen ist damit allerdings, wie weit daraus gesellschaftliche Veränderungen folgen können.' }
    ]
  },
  serviceBoundary: {
    prompt: 'Warum verbindet der ‚Dienst am Nächsten‘ beide Bereiche?', solution: 'B',
    options: [
      { id: 'A', text: 'Weil der Dienst am Nächsten nur eine religiöse Pflicht gegenüber Gott ist.', hints: ['Denkimpuls:\nWem gilt dieser Dienst konkret – Gott allein oder einem anderen Menschen?'] },
      { id: 'B', text: 'Weil die Freiheit vor Gott den Menschen zu einem neuen Handeln gegenüber anderen freisetzt.', feedback: 'Genau:\nDie Freiheit entsteht im Verhältnis zu Gott. Sie bleibt aber nicht innerlich eingeschlossen, sondern verändert das Handeln gegenüber dem Mitmenschen. Deshalb verbindet der ‚Dienst am Nächsten‘ beide Ebenen.' },
      { id: 'C', text: 'Weil gute Werke notwendig sind, damit Gott den Menschen annimmt.', hints: ['Denkimpuls:\nErinnere dich an die Rechtfertigungskette: Sind gute Werke die Voraussetzung oder die Folge der Annahme durch Gott?'] },
      { id: 'D', text: 'Weil Luther damit politische Gleichheit aller Menschen fordert.', hints: ['Denkimpuls:\nUnterscheide zwischen einer theologischen Aussage über Freiheit und einer konkreten politischen Forderung.'] }
    ]
  },
  obedienceBoundary: {
    prompt: 'Warum ist ‚Gehorsam‘ schwieriger einzuordnen als ‚Frondienst‘ oder ‚Abgaben‘?', solution: 'B',
    options: [
      { id: 'A', text: 'Weil Gehorsam immer nur eine Frage des Glaubens ist.', hints: ['Denkimpuls:\nGehorsam zeigt sich in konkretem Verhalten. Kann er deshalb wirklich nur eine innere Glaubensfrage sein?'] },
      { id: 'B', text: 'Weil Gehorsam äußeres Verhalten betrifft, aber zugleich Gewissen und Verantwortung berühren kann.', feedback: 'Das trifft die Schwierigkeit:\nGehorsam gehört zur äußeren Ordnung, kann aber zugleich Fragen von Gewissen und Verantwortung aufwerfen. Gerade deshalb lässt sich das innere und äußere Leben nicht vollständig voneinander trennen.' },
      { id: 'C', text: 'Weil ein Christ nach Luther grundsätzlich keinem Menschen gehorchen muss.', hints: ['Denkimpuls:\nNimm beide Freiheitssätze gleichzeitig ernst: Wie könnte Luther vom ‚dienstbaren Knecht‘ sprechen, wenn jede äußere Bindung ausgeschlossen wäre?'] },
      { id: 'D', text: 'Weil jede Form von Gehorsam automatisch christlicher Dienst ist.', hints: ['Denkimpuls:\nIst jede Forderung einer Obrigkeit automatisch identisch mit Nächstenliebe und christlichem Dienst?'] }
    ]
  },
  freedomComparison: {
    statements: ['Christliche Freiheit betrifft nur das Innere des Menschen.', 'Christliche Freiheit führt automatisch zu politischer Freiheit.'],
    prompt: 'Welche Aussage trifft zu?', solution: 'D',
    wrongFeedback: 'Denkimpuls:\nDie erste Aussage greift zu kurz, weil …\n… die Freiheit vor Gott auch das Handeln gegenüber dem Nächsten verändert.',
    options: [
      { id: 'A', text: 'Beide Aussagen treffen zu.' },
      { id: 'B', text: 'Nur die erste trifft zu.' },
      { id: 'C', text: 'Nur die zweite trifft zu.' },
      { id: 'D', text: 'Beide Aussagen greifen zu kurz.', feedback: 'Beide Aussagen greifen zu kurz.' }
    ]
  },
  innerConsolidation: {
    prompt: 'Die erste Aussage greift zu kurz, weil …', solution: 'A',
    wrongFeedback: 'Denkimpuls:\nWarum verbindet der ‚Dienst am Nächsten‘ beide Bereiche?',
    options: [
      { id: 'A', text: '… die Freiheit vor Gott auch das Handeln gegenüber dem Nächsten verändert.', feedback: 'Die erste Aussage greift zu kurz, weil …\n… die Freiheit vor Gott auch das Handeln gegenüber dem Nächsten verändert.' },
      { id: 'B', text: '… Luther jede politische Ordnung abschaffen will.' },
      { id: 'C', text: '… Religion für Luther nur gesellschaftliche Bedeutung hat.' }
    ]
  },
  politicalConsolidation: {
    prompt: 'Die zweite Aussage greift zu kurz, weil …', solution: 'A',
    wrongFeedback: 'Denkimpuls:\nGlaube, Gewissen und die Beziehung des Menschen zu Gott',
    securing: 'Welche gesellschaftlichen Folgen diese Freiheit haben kann, bleibt damit offen.',
    options: [
      { id: 'A', text: '… Luther Freiheit zunächst vom Verhältnis des Menschen zu Gott her bestimmt.', feedback: 'Damit wird die Spannung deutlich:\nLuthers Freiheit beginnt im Verhältnis des Menschen zu Gott. Sie verändert aber auch sein Handeln gegenüber anderen. Daraus folgt noch nicht automatisch ein bestimmtes politisches Programm.' },
      { id: 'B', text: '… gesellschaftliche Fragen für Luther grundsätzlich bedeutungslos sind.' },
      { id: 'C', text: '… politische Freiheit grundsätzlich unchristlich ist.' }
    ]
  }
};