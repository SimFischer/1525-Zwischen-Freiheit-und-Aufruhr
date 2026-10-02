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
    prompt: 'Warum lässt sich ‚Dienst am Nächsten‘ nicht einfach nur einer Seite zuordnen?', solution: 'C',
    options: [
      { id: 'A', text: 'Weil der Dienst am Nächsten nur das Verhältnis des Menschen zu Gott betrifft.', hints: ['Denkimpuls:\nWem gilt der ‚Dienst am Nächsten‘ konkret?'] },
      { id: 'B', text: 'Weil der Dienst am Nächsten ausschließlich eine gesellschaftliche Pflicht ist.', hints: ['Denkimpuls:\nWoher gewinnt der Mensch nach Luther überhaupt die Freiheit zu diesem Dienst?'] },
      { id: 'C', text: 'Weil die Freiheit vor Gott den Menschen zu einem neuen Handeln gegenüber anderen freisetzt.', feedback: 'Genau darin liegt die Verbindung:\nDie Freiheit entsteht im Verhältnis zu Gott, zeigt sich aber im Handeln gegenüber dem Mitmenschen. Der Dienst am Nächsten verbindet deshalb beide Ebenen.' },
      { id: 'D', text: 'Weil gute Werke für Luther notwendig sind, damit Gott den Menschen annimmt.', hints: ['Denkimpuls:\nPrüfe noch einmal die Rechtfertigungskette: Stehen die Werke vor oder nach der Annahme durch Gott?'] }
    ]
  },
  obedienceBoundary: {
    prompt: 'Warum ist ‚Gehorsam‘ schwieriger einzuordnen als ‚Frondienst‘ oder ‚Abgaben‘?', solution: 'B',
    options: [
      { id: 'A', text: 'Weil Gehorsam immer nur eine religiöse Frage ist.', hints: ['Denkimpuls:\nKann Gehorsam nur eine innere Haltung sein, wenn er sich gleichzeitig in konkretem Verhalten gegenüber anderen zeigt?'] },
      { id: 'B', text: 'Weil Gehorsam sowohl als äußeres Verhalten als auch als Frage von Gewissen und Verantwortung verstanden werden kann.', feedback: 'Das ist die entscheidende Schwierigkeit:\nGehorsam gehört zur äußeren Ordnung, kann aber zugleich Fragen von Gewissen, Verantwortung und christlichem Handeln berühren. Gerade solche Grenzfälle werden im weiteren Spiel wichtig.' },
      { id: 'C', text: 'Weil ein Christ nach Luther grundsätzlich keinem Menschen gehorchen muss.', hints: ['Denkimpuls:\nNimm beide Freiheitssätze gleichzeitig ernst. Was würde mit dem ‚dienstbaren Knecht‘ geschehen, wenn jede Form äußerer Bindung ausgeschlossen wäre?'] },
      { id: 'D', text: 'Weil jeder Gehorsam automatisch christlicher Dienst am Nächsten ist.', hints: ['Denkimpuls:\nIst jede bestehende Forderung an einen Menschen automatisch mit Nächstenliebe gleichzusetzen?'] }
    ]
  },
  innerConsolidation: {
    statement: 'Christliche Freiheit betrifft nur das Innere des Menschen.',
    instruction: 'Beide Aussagen greifen zu kurz. Ergänze jeweils die passendste Begründung.',
    prompt: 'Aussage 1', solution: 'A',
    wrongFeedback: 'Denkimpuls:\nErinnere dich an die zweite These vom ‚dienstbaren Knecht‘. Was geschieht mit der Freiheit, sobald andere Menschen ins Spiel kommen?',
    options: [
      { id: 'A', text: '… christliche Freiheit auch das Handeln gegenüber dem Nächsten verändert.', feedback: 'Luther versteht Freiheit zwar zunächst vom Verhältnis zu Gott her, aber sie bleibt nicht innerlich eingeschlossen. Sie verändert das Handeln gegenüber anderen.' },
      { id: 'B', text: '… Luther jede gesellschaftliche Ordnung beseitigen will.' },
      { id: 'C', text: '… Religion für Luther ausschließlich politisch ist.' }
    ]
  },
  politicalConsolidation: {
    statement: 'Christliche Freiheit führt automatisch zu politischer Freiheit.',
    instruction: 'Beide Aussagen greifen zu kurz. Ergänze jeweils die passendste Begründung.',
    prompt: 'Aussage 2', solution: 'A',
    wrongFeedback: 'Denkimpuls:\nWo setzt Luther mit seiner Freiheitsbestimmung zuerst an: bei politischen Verhältnissen oder bei der Beziehung des Menschen zu Gott?',
    options: [
      { id: 'A', text: '… Luther Freiheit zunächst vom Verhältnis des Menschen zu Gott her bestimmt.', feedback: 'Luthers Freiheitsbegriff ist zunächst theologisch bestimmt. Daraus folgt nicht automatisch ein bestimmtes politisches Programm. Ob und welche gesellschaftlichen Konsequenzen daraus entstehen, bleibt damit aber gerade erst zu klären.' },
      { id: 'B', text: '… Luther gesellschaftliche Fragen grundsätzlich für bedeutungslos hält.' },
      { id: 'C', text: '… politische Freiheit grundsätzlich gegen das Christentum verstößt.' }
    ]
  }
};