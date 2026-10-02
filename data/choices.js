export const choices = {
  initialFreedomInterpretation: { prompt: 'Was meinst du?', reflective: true, options: [
    { id: 'A', text: 'Dann braucht ein Christ keinem Menschen mehr zu gehorchen.', effects: { dimensions: { resistance: 1, theologicalPoliticization: 1 }, relationships: { peter: 1 } }, reaction: [{ speaker: 'peter', text: 'Dann müsste sich hier einiges ändern.' }, { speaker: 'jakob', text: 'Vielleicht. Aber lies erst weiter.' }] },
    { id: 'B', text: 'Vielleicht spricht Luther von einer anderen Art von Freiheit.', effects: { dimensions: { negotiation: 1 }, relationships: { jakob: 1 } }, reaction: [{ speaker: 'jakob', text: 'Das frage ich mich auch.' }, { speaker: 'peter', text: 'Dann soll er gefälligst sagen, welche Freiheit er meint.' }] },
    { id: 'C', text: 'So wie es dort steht, widerspricht es unserer Lebenswirklichkeit.', effects: { dimensions: { resistance: 1 }, relationships: { anna: 1 } }, reaction: [{ speaker: 'anna', text: 'Vielleicht liegt genau darin das Problem.' }] },
    { id: 'D', text: 'Vielleicht bedeutet Freiheit nicht, keine Verantwortung mehr zu haben.', effects: { dimensions: { solidarity: 1 }, relationships: { anna: 1 } }, reaction: [{ speaker: 'anna', text: 'Frei sein – und trotzdem gebunden sein?' }] }
  ] },
  peterFreedom: { prompt: 'Was antwortest du Peter?', reflective: true, options: [
    { id: 'A', text: 'Vielleicht betrifft sie zuerst das Verhältnis zu Gott.' },
    { id: 'B', text: 'Vielleicht muss sie auch Folgen für das äußere Leben haben.' },
    { id: 'C', text: 'Das weiß ich noch nicht.' }
  ] },
  jakobFreedom: { prompt: 'Wie verstehst du diese Unterscheidung?', options: [
    { id: 'A', text: 'Ja. Christliche Freiheit hat keine Folgen für das äußere Leben.', feedback: 'Die Unterscheidung hilft, aber sie bedeutet keine Gleichgültigkeit: Die geschenkte Freiheit verändert das Handeln gegenüber dem Nächsten.' },
    { id: 'B', text: 'Nein. Sie verändert das Handeln, hebt aber äußere Ordnungen nicht automatisch auf.', feedback: 'Das ist die tragfähigste Rekonstruktion: Freiheit vor Gott ermöglicht den Dienst am Nächsten. Sie hebt äußere Ordnungen nicht automatisch auf.' },
    { id: 'C', text: 'Christliche Freiheit bedeutet, jede äußere Ordnung abzulehnen.', feedback: 'Du denkst die gesellschaftlichen Folgen mit. Luther leitet aus der Freiheit vor Gott jedoch keine pauschale Abschaffung jeder äußeren Ordnung ab.' }
  ] }
};
