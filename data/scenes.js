export const scenes = [
  { id: 'ch1_s1_tavern_intro', title: 'Ein Blatt aus Wittenberg', kind: 'explore', instruction: 'Sprich mit Jakob. Er hat etwas mitgebracht.', background: 'tavern_evening_calm', emotions: { jakob: 'reading', peter: 'neutral', anna: 'thoughtful' } },
  { id: 'ch1_s2_document', title: 'Niemandem untertan', kind: 'document', document: 'freedom', passage: 0, next: 'ch1_s3_interpretation' },
  { id: 'ch1_s3_interpretation', title: 'Eine erste Deutung', kind: 'dialogue', dialogue: 'interpretation', choice: 'initialFreedomInterpretation', next: 'ch1_s4_second_thesis', emotions: { peter: 'skeptical', anna: 'thoughtful', jakob: 'reading' } },
  { id: 'ch1_s4_second_thesis', title: 'Jedermann untertan', kind: 'document-dialogue', document: 'freedom', passage: 1, dialogue: 'secondThesis', next: 'ch1_s5_conversations' },
  { id: 'ch1_s5_conversations', title: 'Drei Perspektiven', kind: 'conversations', instruction: 'Sprich mit Peter, Anna und Jakob. Welche Fragen bleiben offen?', emotions: { peter: 'concerned', anna: 'thoughtful', jakob: 'thoughtful' }, conversations: { peter: { dialogue: 'peter', choice: 'peterFreedom' }, anna: { dialogue: 'anna', puzzle: 'grace' }, jakob: { dialogue: 'jakob', choice: 'jakobFreedom' } }, next: 'ch1_s6_freedom_axis' },
  { id: 'ch1_s6_freedom_axis', title: 'Wo gehört das hin?', kind: 'sorting', game: 'freedomAxis', next: 'ch1_s7_notebook' },
  { id: 'ch1_s7_notebook', title: 'Gedanken festhalten', kind: 'notebook', entry: 'freedom', next: 'ch1_s8_conclusion' },
  { id: 'ch1_s8_conclusion', title: 'Und morgen?', kind: 'dialogue', dialogue: 'conclusion', next: 'ch1_end' },
  { id: 'ch1_end', title: 'Wie frei ist dein Leben?', kind: 'ending' }
];
export const sceneById = Object.fromEntries(scenes.map(scene => [scene.id, scene]));
