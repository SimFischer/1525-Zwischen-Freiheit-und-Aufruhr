import {religionFunctions,lutherThoughts,debateArguments} from './chapter-five.js';
import { choices } from './choices.js';
import { openTheologicalQuestions,buildStoryRecap } from './story-recap.js';
export { openTheologicalQuestions };
export const concepts=['Christliche Freiheit','Rechtfertigung','Nächstenliebe','Gewissen','Obrigkeit','Widerstand','Gewalt','Verantwortung'];
export const interpretations=[['continuity','Kontinuität','Freiheit vor Gott hebt äußere Pflichten nicht auf.'],['tension','Spannung','Ordnung und Nächstenliebe geraten in Spannung.'],['contradiction','Widerspruch','Gewalt widerspricht dem Dienst am Nächsten.'],['other','Keine der drei Deutungen reicht mir aus.','Eine eigene Deutung bleibt möglich.']];
export const finalPositions=[['consistent','Weitgehend konsequent'],['explainable_problematic','Theologisch nachvollziehbar, aber ethisch problematisch'],['tension','In deutlicher Spannung zu seiner eigenen Theologie'],['contradictory','In wesentlichen Punkten widersprüchlich'],['other','Keine dieser Einordnungen reicht für mein Urteil aus.']];
export const risks=[['order','Zerstörung gesellschaftlicher Ordnung'],['injustice','Stabilisierung ungerechter Ordnung'],['certainty','Religiöse Selbstlegitimation'],['passivity','Politische Passivität'],['both','Beide Positionen bergen unterschiedliche Gefahren']];
export const freedomFields=[['godRelation','Freiheit vor Gott bedeutet …','Rechtfertigung, Glaube, Gnade'],['neighborRelation','Für den Umgang mit anderen folgt daraus …','Nächstenliebe, Dienst, Gegner'],['unjustOrder','Gegenüber ungerechter Ordnung bedeutet das …','Gewissen, Obrigkeit, Widerstand'],['limitsOfAction','Die Grenze eigenen Handelns liegt dort, wo …','Gewalt, Mittel, Verantwortung']];
export const dimensions=[['theologicalConsistency','Theologische Folgerichtigkeit','Wie gut lässt sich Luthers Haltung aus seiner eigenen Theologie erklären?'],['historicalContext','Historische Einordnung','Wie verändert die eskalierte Situation von 1525 die Beurteilung seiner Reaktion?'],['ethicalResponsibility','Ethische Verantwortbarkeit','Wie beurteilst du seine Legitimation harter Gewalt gegen die Aufständischen?']];
export const qualitative=[['convincing','Überzeugend'],['partly','Teilweise überzeugend'],['problematic','Problematisch'],['incompatible','Schwer vereinbar']];
export const evidence=[
 ['freedom','Freiheitsschrift · 1520','Historische Quelle','c4_memory','Freiheit vor Gott und Dienst am Nächsten gehören zusammen.'],
 ['justification','Rechtfertigung','Theologischer Begriff',null,'Gottes Annahme ist keine durch Leistung verdiente Belohnung.'],
 ['service','Dienst am Nächsten','Theologischer Zusammenhang',null,'Freiheit ermöglicht Verantwortung auch für Menschen, die andere Ziele verfolgen.'],
 ['authority','Von weltlicher Obrigkeit · 1523','Historische Quelle','c4_authority','Die Obrigkeit regelt äußeres Zusammenleben; Glauben kann sie nicht erzwingen.'],
 ['peace','Ermahnung zum Frieden · April 1525','Historische Quelle','c4_ermahnung','Luther kritisiert Herren und Bauern und fordert einen friedlichen Ausgleich.'],
 ['harsh','Schärfere Bauernkriegsschrift · Mai 1525','Historische Quelle','c4_harsh','Luther fordert hartes obrigkeitliches Eingreifen gegen den Aufruhr.'],
 ['muentzer','Müntzervergleich','Historische Einordnung','c4_muentzer','Religiöse Erneuerung und Veränderung gottwidriger Herrschaft werden enger verbunden.'],
 ['experience','Mein Spielweg','Erfahrung aus dem Spielweg',null,'Eine eigene Erfahrung regt zur Prüfung an; sie beweist keine historische Aussage über Luther.']
];
export const comparison=[
 ['Wie wirkt Gott?','Gottes Heil ist nicht auf politische Revolution zu reduzieren. Geistliches und weltliches Regieren sind zu unterscheiden.','Gottes Gerechtigkeit wird stärker unmittelbar auf Geschichte bezogen. Die Erfahrung des Glaubens kann Veränderung verlangen.'],
 ['Grenzen der Obrigkeit','Obrigkeit soll schützen; ihre äußere Gewalt darf Glauben und Gewissen nicht erzwingen.','Gottwidrige Herrschaft kann ihren Anspruch auf Gehorsam verlieren. Entscheidend wird die Prüfung ihres Handelns.'],
 ['Die Rolle der Bibel','Das Evangelium begründet Glauben. Die Berufung auf die Bibel allein erlaubt noch kein politisches Mittel.','Prophetische Texte deuten die Gegenwart. Glaube verlangt lebendige Erfahrung des Geistes.'],
 ['Legitimer Widerstand?','Die Grenze obrigkeitlicher Macht erlaubt keine pauschale Gleichsetzung christlicher Freiheit mit gewaltsamem Aufruhr.','Widerstand gegen gottwidrige Ordnung kann als religiöse Pflicht erscheinen. Wer Gottes Willen beansprucht, muss sich prüfen lassen.'],
 ['Die besondere Gefahr','Luther warnt vor dem Zerfall schützender Ordnung und religiös legitimierter Gewalt. Seine Position kann ungerechte Ordnung stabilisieren.','Müntzer macht gottwidrige Herrschaft sichtbar. Prophetische Gewissheit kann politische Ziele sakralisieren und Kritik verdrängen.']
];
export const phases=[
 ['reflection_entry','Die Ereignisse liegen hinter dir'],['reflection_room','Dein Weg liegt vor dir'],
 ...freedomFields.map(([id])=>['freedom_'+id,'Zu Beginn und heute']),
 ['theological_network','Christliche Freiheit in Beziehungen'],['network_reasoning','Zwei Verbindungen begründen'],
 ['luther_1520_1525','Luther · 1520 und 1525'],['luther_originals','Zwei Originalausschnitte'],['interpretation','Kontinuität, Spannung oder Widerspruch?'],['continuity_reasoning','Meine Deutung begründen'],['continuity_counterargument','Ein Einwand gegen meine Deutung'],
 ['memory','Erinnerungen aus deinem Spielweg'],['memory_support','Was stützt meine Deutung?'],['memory_challenge','Was stellt sie infrage?'],
 ...comparison.map((_,i)=>['comparison_'+i,'Luther und Müntzer']),
 ['risk_luther','Welche Gefahr erkennt Luther?'],['risk_muentzer','Welche Gefahr erkennt Müntzer?'],['risk_weight','Welche Gefahr wiegt für dich schwerer?'],
 ['judgment_table','Quellen und Urteil'],['dimensions','Drei Prüfdimensionen'],
 ...dimensions.map(([id,title])=>['dimension_'+id,title]),
 ['final_position','Wie beurteilst du Luthers Haltung insgesamt?'],['evidence_sources','Historische Quellen auswählen'],['evidence','Welche Belege tragen dein Urteil?'],['counterargument','Welchen Einwand berücksichtigst du?'],['final_judgment','Mein Urteil'],['judgment_review','Das Urteil prüfen'],['personal','Mein Urteil über Luther und christliche Freiheit'],['final_question','Was heißt frei?'],['ending','Die Frage bleibt']
];
export const chapterSixScenes=phases.map(([id,title],i)=>({id:'ch6_'+id,title,chapter:6,station:i+1,kind:'reflection',next:i<phases.length-1?'ch6_'+phases[i+1][0]:null}));
const selected=(g,id,v=g.choices?.[id])=>choices[id]?.options.find(o=>o.id===v)?.text;
export function earlyFreedom(g){return selected(g,'initialFreedomInterpretation')||null;}
export function memories(g){const r=buildStoryRecap(g);return [
 ['village',g.choices?.forestResponse||g.choices?.duesResponse,1,3,'Wald und Arbeit'],
 ['print',g.chapter3?.printStrategy||g.chapter3?.religiousInterpretation,2,7,'Öffentlichkeit'],
 ['resistance',g.chapter4?.centralRisk||g.chapter4?.openingRoute,3,9,'Widerstand'],
 ['action',g.chapter5?.finalAction||g.chapter5?.prisonerDecision,4,11,'Handeln und Folgen']
 ].map(([id,present,e,b,title])=>({id,title,personal:Boolean(present),text:r.entries[e].decision,consequence:r.entries[e].consequence,visual:r.beats[b].visual}));}
export function previousNotes(g){return {
 theology:selected(g,'ch4Theology',g.chapter4?.theologicalPath),
 network:g.choices?.playerDemand?'Eure Forderung: '+g.choices.playerDemand:null,
 comparison:g.chapter3?.religiousInterpretation?selected(g,'ch3Religion',g.chapter3.religiousInterpretation):null,
 continuity:[selected(g,'ch4Early',g.chapter4?.lutherFreedomJudgmentEarly),selected(g,'ch4HarshJudgment',g.chapter4?.lutherHarshTextJudgment)].filter(Boolean),
 risk:selected(g,'ch4Risk',g.chapter4?.centralRisk),
 freedom:[selected(g,'ch3Resistance',g.chapter3?.resistanceStrategy),selected(g,'ch4Weingarten',g.chapter4?.weingartenResponse)].filter(Boolean),
 action:religionFunctions.find(x=>x[0]===g.chapter5?.religionFunctions?.dangerousWhenAbsolute)?.[1],
 tension:lutherThoughts.find(x=>x[0]===g.chapter5?.lutherTension?.tension)?.[1],
 debate:debateArguments.find(x=>x[0]===g.chapter5?.internalDebate?.strongestArgument)?.[1]
 };}
