export const puzzles = { justification: {
  title: 'Rechtfertigungskette',
  instruction: 'Bringe die Gedanken so in eine Reihenfolge, dass sie Luthers Verständnis möglichst genau wiedergeben.',
  parts: [
    { id: 'A', text: 'Der Mensch vertraut darauf, dass Gott ihn aus Gnade annimmt.' },
    { id: 'B', text: 'Der Mensch versucht durch gute Werke, vor Gott gerecht zu werden.' },
    { id: 'C', text: 'Der Mensch ist nicht mehr darauf angewiesen, sich Gottes Anerkennung zu verdienen.' },
    { id: 'D', text: 'Gute Werke können nun aus Freiheit und nicht aus Angst vor Gott geschehen.' },
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
export const sortingGames = { freedomAxis: {
  title: 'Freiheitsachse',
  instruction: 'Ordne die Begriffe danach ein, ob sie eher das Verhältnis zu Gott oder die äußeren Lebensverhältnisse betreffen.',
  left: 'Beziehung zu Gott', right: 'äußere Lebensverhältnisse',
  cards: [
    { id: 'grace', text: 'Gnade Gottes', range: [0, 25] },
    { id: 'faith', text: 'Glaube', range: [0, 30] },
    { id: 'conscience', text: 'Gewissen', range: [15, 50] },
    { id: 'service', text: 'Dienst am Nächsten', range: [35, 65] },
    { id: 'obedience', text: 'Gehorsam', range: [40, 75] },
    { id: 'help', text: 'Hilfe für Bedürftige', range: [40, 75] },
    { id: 'order', text: 'gesellschaftliche Ordnung', range: [60, 100] },
    { id: 'rule', text: 'Herrschaft', range: [65, 100] },
    { id: 'labor', text: 'Frondienst', range: [75, 100] },
    { id: 'dues', text: 'Abgaben', range: [75, 100] }
  ],
  success: 'Einige Zuordnungen sind eindeutig. Andere verbinden beide Bereiche.'
} };