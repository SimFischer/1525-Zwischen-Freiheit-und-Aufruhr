export const scenes = [
  { id: 'ch1_s1_intro', station: 1, title: 'Ein Blatt aus Wittenberg', kind: 'explore', intro: 'chapterIntro', instruction: 'Sprich mit Jakob.', flyerInstruction: 'Lies selbst.', hotspots: { jakob: { dialogue: 'introJakob', after: 'unlock-flyer' } }, next: 'ch1_s2_document', emotions: { jakob: 'reading', peter: 'neutral', anna: 'thoughtful' } },
  { id: 'ch1_s2_document', station: 2, title: 'Niemandem untertan', kind: 'document', document: 'freedom', passage: 0, next: 'ch1_s3_interpretation' },
  { id: 'ch1_s3_interpretation', station: 3, title: 'Eine erste Deutung', kind: 'dialogue', dialogue: 'interpretation', choice: 'initialFreedomInterpretation', next: 'ch1_s4_second_thesis', emotions: { peter: 'skeptical', anna: 'thoughtful', jakob: 'reading' } },
  { id: 'ch1_s4_second_thesis', station: 4, title: 'Jedermann untertan', kind: 'document-dialogue', beforeDocument: 'beforeSecondThesis', document: 'freedom', passage: 1, dialogue: 'secondThesis', next: 'ch1_s5_conversations' },
  { id: 'ch1_s5_conversations', station: 5, title: 'Drei Perspektiven', kind: 'conversations', instruction: 'Sprich mit Peter, Anna und Jakob.', emotions: { peter: 'concerned', anna: 'thoughtful', jakob: 'thoughtful' }, conversations: { peter: { dialogue: 'peter', choice: 'freedomSocialFirstThought' }, anna: { dialogue: 'anna', puzzle: 'justification', afterPuzzle: 'afterAnna' }, jakob: { dialogue: 'jakob', choice: 'freedomAndOuterLife' } }, next: 'ch1_s6_freedom_sorting' },
  { id: 'ch1_s6_freedom_sorting', station: 6, title: 'Freiheit vor Gott und äußeres Leben', kind: 'sorting', beforeGame: 'beforeSorting', game: 'freedomSorting', next: 'ch1_s6b_service' },
  { id: 'ch1_s6b_service', station: 6, title: 'Dienst am Nächsten', kind: 'task', choice: 'serviceBoundary', next: 'ch1_s6b_obedience' },
  { id: 'ch1_s6b_obedience', station: 6, title: 'Gehorsam', kind: 'task', choice: 'obedienceBoundary', next: 'ch1_s6c_compare' },
  { id: 'ch1_s6c_compare', station: 6, title: 'Abschlusssicherung', kind: 'task', choice: 'freedomComparison', next: 'ch1_s6c_inner' },
  { id: 'ch1_s6c_inner', station: 6, title: 'Abschlusssicherung', kind: 'task', choice: 'innerConsolidation', next: 'ch1_s6c_political' },
  { id: 'ch1_s6c_political', station: 6, title: 'Abschlusssicherung', kind: 'task', choice: 'politicalConsolidation', next: 'ch1_s7_notebook' },
  { id: 'ch1_s7_notebook', station: 7, title: 'Neu: Dein Notizbuch', kind: 'notebook', entry: 'freedom', instruction: 'Hier findest du wichtige Gedanken, Dokumente und später auch deine eigenen Entscheidungen wieder.', next: 'ch1_s8_conclusion' },
  { id: 'ch1_s8_conclusion', station: 8, title: 'Und morgen?', kind: 'dialogue', dialogue: 'conclusion', next: 'ch1_end' },
  { id: 'ch1_end', station: 8, title: 'Wie frei ist dein Leben?', kind: 'ending' }
];
export const sceneAliases = { ch1_s1_tavern_intro: 'ch1_s1_intro', ch1_s6_freedom_axis: 'ch1_s6_freedom_sorting' };
export const sceneById = Object.fromEntries(scenes.map(scene => [scene.id, scene]));
export function canonicalScene(id) { return sceneAliases[id] || id; }
