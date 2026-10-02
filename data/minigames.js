import { dialogues } from './dialogues.js';
export const puzzles = { justification: {
  title: 'Warum noch Gutes tun?',
  contextStatement: dialogues.anna[1].text,
  instruction: 'Wähle vier passende Gedanken. Ordne sie von Gottes Annahme über den veränderten Beweggrund bis zum Dienst am Nächsten.',
  parts: [
    { id: 'A', text: 'Der Mensch vertraut darauf, dass Gott ihn in Christus aus Gnade annimmt.' },
    { id: 'B', text: 'Der Mensch versucht durch gute Werke, vor Gott gerecht zu werden.' },
    { id: 'C', text: 'Der Mensch ist nicht mehr darauf angewiesen, sich Gottes Anerkennung zu verdienen.' },
    { id: 'D', text: 'Gute Werke können nun aus Freiheit geschehen, statt Gottes Annahme verdienen zu müssen.' },
    { id: 'E', text: 'Der Mensch wendet sich dem Nächsten zu.' },
    { id: 'F', text: 'Gute Werke machen den Menschen vor Gott gerecht.' }
  ],
  solution: ['A', 'C', 'D', 'E'],
  hints: [
    'Denkimpuls:\nÜberlege, was bei Luther zuerst kommt: Muss der Mensch handeln, damit Gott ihn annimmt – oder kann er handeln, weil er sich bereits von Gott angenommen weiß?',
    'Hinweis:\nAchte besonders darauf, was in Luthers Rechtfertigungsverständnis Ursache und was Folge ist.'
  ],
  success: 'Das entspricht Luthers Gedankengang:\nGottes Annahme steht am Anfang. Der Mensch muss sie nicht durch gute Werke verdienen. Gerade dadurch wird er frei, dem Nächsten zu dienen. Gute Werke sind also Folge der geschenkten Gnade, nicht deren Voraussetzung.',
  securing: 'Gnade → Freiheit vom Rechtfertigungsdruck → freies Handeln → Dienst am Nächsten.'
} };
export const sortingGames = { freedomSorting: {
  title: 'Freiheit vor Gott und äußeres Leben',
  instruction: 'Ordne die Karten nach ihrem Schwerpunkt. Prüfe auch die Situationen: Bei zwei Karten lässt sich die andere Seite begründen.',
  zones: [
    { id: 'god', title: 'Freiheit vor Gott', subtitle: 'Glaube, Gewissen und die Beziehung des Menschen zu Gott' },
    { id: 'world', title: 'Äußeres Leben', subtitle: 'Alltag, Herrschaft, Pflichten und gesellschaftliche Verhältnisse' }
  ],
  cards: [
    { id: 'grace', text: 'Gnade Gottes', example: 'Angenommen sein, ohne es sich durch Leistung zu verdienen.', preferred: 'god' },
    { id: 'faith', text: 'Glaube', example: 'Auf Gottes Zusage in Christus vertrauen.', preferred: 'god' },
    { id: 'conscience', text: 'Gewissen', example: 'Vor Gott Halt in seiner Zusage finden statt im eigenen Verdienst.', preferred: 'god' },
    { id: 'labor', text: 'Frondienst', example: 'Morgen auf dem Feld des Herrn arbeiten müssen.', preferred: 'world' },
    { id: 'dues', text: 'Abgaben', example: 'Einen Teil der eigenen Ernte abgeben müssen.', preferred: 'world' },
    { id: 'rule', text: 'Herrschaft', example: 'Der Herr bestimmt, wer im Wald Holz holen darf.', preferred: 'world' },
    { id: 'service', text: 'Dienst am Nächsten', example: 'Einem Bedürftigen helfen, ohne damit Gottes Gnade zu verdienen.', preferred: 'god', boundary: true },
    { id: 'obedience', text: 'Gehorsam', example: 'Eine Anordnung befolgen – auch wenn sie das Gewissen beunruhigt?', preferred: 'world', boundary: true }
  ],
  hints: [
    'Denkimpuls:\nFrage dich bei jeder Karte: Geht es hier zuerst darum, wie der Mensch vor Gott dasteht – oder um seine konkrete Stellung und seine Pflichten in der Welt?',
    'Hinweis:\nBei Begriffen wie ‚Gnade‘ oder ‚Glaube‘ geht es um die Beziehung zu Gott. Bei ‚Frondienst‘ oder ‚Abgaben‘ geht es um konkrete äußere Lebensbedingungen. Nutze diese Beispiele als Orientierung.'
  ],
  success: 'Das ist eine tragfähige Unterscheidung:\nLuther bestimmt die Freiheit des Christen zunächst vom Verhältnis zu Gott her. Frondienst, Abgaben und Herrschaft beschreiben dagegen äußere Lebensverhältnisse.',
  securing: 'Aber zwei Karten passen nicht ganz sauber in nur ein Feld.'
} };
