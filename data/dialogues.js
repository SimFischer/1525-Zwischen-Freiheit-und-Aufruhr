import { chapters } from './chapters.js';
export const dialogues = {
  chapterIntro: [{ text: chapters[0].intro }],
  introJakob: [
    { speaker: 'jakob', emotion: 'reading', text: 'Ich habe wieder etwas von Luther bekommen.' },
    { speaker: 'peter', emotion: 'skeptical', text: 'Schon wieder Luther?' },
    { speaker: 'anna', emotion: 'engaged', text: 'Was schreibt er diesmal?' },
    { speaker: 'jakob', emotion: 'reading', text: 'Über die Freiheit eines Christenmenschen.' },
    { speaker: 'jakob', emotion: 'neutral', text: 'Lies selbst.' }
  ],
  interpretation: [
    { speaker: 'peter', emotion: 'determined', text: 'Na also. Dann ist die Sache doch klar.' },
    { speaker: 'anna', emotion: 'thoughtful', text: 'Was ist daran klar?' },
    { speaker: 'peter', emotion: 'skeptical', text: 'Wenn ein Christ niemandem untertan ist – warum sollen wir dann unserem Herrn untertan sein?' }
  ],
  beforeSecondThesis: [{ speaker: 'jakob', emotion: 'reading', text: 'Auf derselben Seite steht noch etwas.' }],
  secondThesis: [
    { speaker: 'anna', emotion: 'concerned', text: 'Jetzt verstehe ich gar nichts mehr.' },
    { speaker: 'peter', emotion: 'skeptical', text: 'Erst niemandem untertan. Jetzt jedermann untertan.' },
    { speaker: 'jakob', emotion: 'thoughtful', text: 'Vielleicht widersprechen sich die beiden Sätze gar nicht.' }
  ],
  peter: [{ speaker: 'peter', emotion: 'concerned', text: 'Wenn diese Freiheit nichts mit unserem Leben hier zu tun hat – was bringt sie uns dann?' }],
  anna: [
    { speaker: 'anna', emotion: 'thoughtful', text: 'Luther sagt doch auch, dass gute Werke einen Menschen vor Gott nicht gerecht machen.' },
    { speaker: 'anna', emotion: 'concerned', text: 'Warum sollte ich dann überhaupt noch etwas für andere tun?' }
  ],
  afterAnna: [
    { speaker: 'anna', emotion: 'engaged', text: 'Dann macht die Freiheit also nicht gleichgültig.' },
    { speaker: 'jakob', emotion: 'explaining', text: 'Im Gegenteil. Wer sich Gottes Anerkennung nicht verdienen muss, kann sich dem anderen zuwenden.' }
  ],
  jakob: [
    { speaker: 'jakob', emotion: 'explaining', text: 'Luther unterscheidet zwischen dem Menschen vor Gott und seinem Leben in der Welt.' },
    { speaker: 'jakob', emotion: 'thoughtful', text: 'Aber was folgt daraus eigentlich?' }
  ],
  beforeSorting: [{ speaker: 'jakob', emotion: 'thoughtful', text: 'Vielleicht hilft es, die verschiedenen Ebenen erst einmal auseinanderzuhalten.' }],
  conclusion: [
    { speaker: 'peter', emotion: 'neutral', text: 'Schön und gut.' },
    { speaker: 'peter', emotion: 'neutral', text: 'Vor Gott bin ich also frei.' },
    { speaker: 'peter', emotion: 'concerned', text: 'Morgen muss ich trotzdem wieder für den Herrn arbeiten.' },
    { speaker: 'anna', emotion: 'concerned', text: 'Und wir geben wieder einen Teil unserer Ernte ab.' },
    { speaker: 'peter', emotion: 'concerned', text: 'Und im Wald dürfen wir inzwischen kaum noch Holz holen.' },
    { speaker: 'jakob', emotion: 'thoughtful', text: 'Vielleicht ist genau das die nächste Frage.' }
  ]
};