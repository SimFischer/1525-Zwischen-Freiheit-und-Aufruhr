import {chapterFiveStaging} from './chapter-five-staging.js';

export const chapterFiveEndings={
 violent_defeat:{title:'Der Aufstand endet in Gewalt',paragraphs:['Die Hoffnung auf Veränderung mündet in bewaffneten Widerstand. Religiöse und politische Überzeugungen werden zunehmend mit dem Kampf verbunden.','Wie viele andere Aufstände des Jahres 1525 wird auch dieser militärisch niedergeschlagen. Viele Menschen sterben oder werden verwundet. Eine grundlegende Veränderung der bestehenden Herrschaftsordnung bleibt aus.'],overlay:'after_defeat'},
 negotiation_collapsed:{title:'Der Versuch einer Einigung scheitert',paragraphs:['Lange bleibt eine Verständigung möglich. Forderungen werden verhandelt und Gewalt scheint vermeidbar.','Doch die zunehmende Eskalation lässt den Verhandlungsweg zusammenbrechen. Aus einem Konflikt um Rechte, Abgaben und Herrschaft wird ein bewaffneter Kampf, dessen Verlauf schließlich andere bestimmen.'],overlay:'after_negotiation_collapse'},
 civilians_protected:{title:'Mitten im Konflikt werden Grenzen gezogen',paragraphs:['Der Aufstand lässt sich nicht mehr aufhalten. Gewalt und Gegengewalt bestimmen vielerorts das Geschehen.','Dein Handeln kann den Verlauf des Bauernkriegs nicht entscheiden. Aber in deiner unmittelbaren Umgebung werden Menschen geschützt und Gewalt begrenzt. Verantwortung zeigt sich hier nicht im Sieg, sondern darin, was trotz der Eskalation noch verhindert werden kann.'],overlay:'after_protection'},
 community_fragmented:{title:'Die Gemeinschaft zerbricht',paragraphs:['Die Frage nach dem richtigen Handeln findet keine gemeinsame Antwort mehr. Einige setzen auf Widerstand, andere auf Ordnung, Verhandlung oder Rückzug.','Religiöse und politische Überzeugungen verschärfen die Gegensätze. Der Konflikt hinterlässt nicht nur Tote und Verwundete, sondern auch eine gespaltene Gemeinschaft.'],overlay:'after_fragmentation'},
 fragile_deescalation:{title:'Eine Eskalation wird vorerst verhindert',paragraphs:['Verhandlung, Zurückhaltung und gegenseitige Zugeständnisse schaffen einen begrenzten Ausweg aus der unmittelbaren Gewalt.','Die grundlegenden Konflikte um Herrschaft, Abgaben und Rechte sind damit jedoch nicht gelöst. Während andernorts weiter gekämpft wird, bleibt hier ein unsicherer Raum für Verständigung.'],overlay:'after_deescalation'}
};
const konrad={safe:'Konrad überlebt den unmittelbaren Konflikt.',injured:'Konrad wird im Verlauf der Auseinandersetzungen verletzt.',captured:'Konrad gerät im Verlauf der Kämpfe in Gefangenschaft.',missing:'Konrads Schicksal bleibt nach der Eskalation ungeklärt.'};
// Presentation only: use resolved consequences; never infer new outcomes here.
export function buildChapterFiveEnding(g){
 const c=g.chapter5||{},ending=chapterFiveEndings[c.endWorldState];
 if(!ending)return null;
 const personal=[konrad[c.konradOutcome]].filter(Boolean);
 if(c.endWorldState==='violent_defeat'&&g.chapter4?.theologicalPath==='prophetic_resistance')personal.push('Du hast dich einer Deutung angenähert, die Gottes Gerechtigkeit unmittelbar mit der Veränderung der bestehenden Ordnung verbindet.');
 else if(c.negotiationOutcome==='partial_agreement'&&c.endWorldState!=='negotiation_collapsed')personal.push('Eine begrenzte Teilvereinbarung bleibt bestehen; die grundlegenden Forderungen sind noch offen.');
 else if(c.civilianOutcome==='some_protected')personal.push('Einige Unbeteiligte finden Schutz, andere bleiben im Gefahrenbereich.');
 else if(c.civilianOutcome==='many_protected')personal.push('Viele Unbeteiligte verlassen den unmittelbaren Gefahrenbereich.');
 else if(c.civilianOutcome==='high_exposure')personal.push('Viele Unbeteiligte bleiben der Gefahr ausgesetzt.');
 const scene=chapterFiveStaging.scenes.village_after_crisis;
 return {title:ending.title,paragraphs:ending.paragraphs,personal:personal.slice(0,2).join(' '),background:scene.background,overlay:chapterFiveStaging.assets['overlay_'+ending.overlay].path,registration:scene.overlayRegistration[ending.overlay]};
}
