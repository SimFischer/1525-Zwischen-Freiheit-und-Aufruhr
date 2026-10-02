export const puzzles = { grace: {
  title: 'Warum Gutes tun?', instruction: 'Wähle zuerst den Grund, dann die Folge. Verbinde zwei Gedanken.',
  parts: [ { id: 'earn', text: 'damit Gott mich annimmt', role: 'reason' }, { id: 'grace', text: 'weil Gott mich angenommen hat', role: 'reason' }, { id: 'better', text: 'um besser zu sein als andere', role: 'result' }, { id: 'neighbor', text: 'weil ich mich dem Nächsten zuwenden kann', role: 'result' } ],
  solution: ['grace', 'neighbor'], sentence: 'Weil Gott mich angenommen hat, kann ich mich dem Nächsten zuwenden.', hint: 'Bei Luther folgen gute Werke aus der bereits geschenkten Gnade.', success: 'Gute Werke sind eine Folge der Gnade. Anna nickt: Freiheit macht Zuwendung möglich.'
} };
export const sortingGames = { freedomAxis: {
  title: 'Wo gehört das hin?', instruction: 'Ziehe die Karten auf die Achse. Oder tippe eine Karte und dann einen Bereich an.',
  zones: [{ id: 'god', label: 'Beziehung zu Gott', subtitle: 'Gnade · Glaube · Gewissen' }, { id: 'bridge', label: 'Übergangsbereich', subtitle: 'Freiheit wird zum Handeln' }, { id: 'world', label: 'Äußere Lebensverhältnisse', subtitle: 'Alltag · Pflichten · Ordnung' }],
  cards: [ { id: 'grace', text: 'Gnade Gottes', accepted: ['god'] }, { id: 'faith', text: 'Glaube', accepted: ['god'] }, { id: 'conscience', text: 'Gewissen', accepted: ['god', 'bridge'] }, { id: 'labor', text: 'Frondienst', accepted: ['world'] }, { id: 'dues', text: 'Abgaben', accepted: ['world'] }, { id: 'rule', text: 'Herrschaft', accepted: ['world'] }, { id: 'service', text: 'Dienst am Nächsten', accepted: ['bridge', 'world'], explanation: 'Der Dienst am Nächsten verbindet die geschenkte Freiheit mit dem Handeln in der Welt.' }, { id: 'order', text: 'Gesellschaftliche Ordnung', accepted: ['world'] } ],
  hint: 'Prüfe noch einmal: Gnade und Glaube betreffen zuerst das Verhältnis zu Gott. Frondienst, Abgaben und Herrschaft prägen den äußeren Alltag. Gewissen und Dienst am Nächsten berühren die Verbindung beider Bereiche.',
  success: 'Nicht alles lässt sich eindeutig trennen. Der Dienst am Nächsten verbindet beide Bereiche; auch das Gewissen wirkt in das Handeln hinein.'
} };
