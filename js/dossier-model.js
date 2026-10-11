import {dialogues} from '../data/dialogues.js';
import {choices} from '../data/choices.js';
import {concepts,interpretations,finalPositions,risks,dimensions,qualitative,evidence,comparison,earlyFreedom,openTheologicalQuestions} from '../data/chapter-six.js';
import {availableFinalActions} from '../data/chapter-five.js';
import {recapOutcomes} from '../data/story-recap.js';
import {chapterFourDocuments} from '../data/chapter-four-documents.js';
import {epilogueSources} from '../data/epilogue.js';
const label=(list,id)=>list.find(row=>row[0]===id)?.[1]||null;
const text=value=>typeof value==='string'&&value.trim()?value:null;
export const guidingQuestion='Hat Luther seine eigenen theologischen Grundgedanken im Bauernkrieg preisgegeben – oder lässt sich seine Haltung aus seiner Theologie heraus erklären?';
export const foundations=[
 ['Rechtfertigung und christliche Freiheit','Rechtfertigung geschieht aus Gnade und im Glauben, nicht aufgrund verdienstlicher Werke. Christliche Freiheit bezeichnet bei Luther zunächst die Freiheit des Menschen vor Gott. Sie führt zum Dienst am Nächsten, nicht zur Beliebigkeit.'],
 ['Nächstenliebe und Verantwortung','Der Dienst am Nächsten begrenzt die eigenen Mittel. Auch Gegner und Unbeteiligte bleiben Menschen, für deren Schutz Verantwortung besteht. Berechtigte Forderungen und die Verantwortung für ihre Folgen müssen gemeinsam geprüft werden.'],
 ['Obrigkeit und weltliche Ordnung','Luther unterscheidet geistliches und weltliches Regieren als unterschiedliche Weisen göttlichen Handelns. Weltliche Herrschaft hat eine Ordnungs- und Schutzfunktion. Sie ist nicht mit dem Evangelium oder Gottes Heilswillen gleichzusetzen.'],
 ['Gewissen und Grenze äußerer Herrschaft','Äußere Zwangsgewalt kann den Glauben nicht erzwingen und darf das Gewissen nicht beherrschen. Diese Grenze hebt nicht sämtliche äußeren Pflichten auf. Gehorsam und Gewissensverantwortung bleiben zu unterscheiden.'],
 ['Widerstand und Gewalt','Berechtigte Beschwerden rechtfertigen für Luther nicht automatisch jedes Mittel ihrer Durchsetzung. Er lehnt gewaltsamen Aufruhr grundsätzlich ab. Mit der Eskalation des Bauernkriegs verschärft sich seine Haltung erheblich. Daraus entsteht eine Spannung zwischen Freiheit, Nächstenliebe, Ordnung und Gewalt.']
];
export const insights=[
 'Christliche Freiheit ist bei Luther zunächst theologische Freiheit vor Gott, kein unmittelbares Programm politischer Befreiung.',
 'Rechtfertigung gründet in Gnade und Glauben, nicht in verdienstlicher Leistung.',
 'Freiheit und Dienst am Nächsten gehören zusammen.',
 'Die Bauernbewegung war keine einheitliche Gruppe mit einem einzigen Ziel.',
 'Die Zwölf Artikel verbinden soziale Forderungen mit religiösen Begründungen.',
 'Berechtigte Beschwerden und erlaubte Mittel ihrer Durchsetzung sind zu unterscheiden.',
 'Die Eskalation von 1525 prägt Luthers verschärfte Reaktion.',
 'Die Legitimation von Gewalt wirft theologische und ethische Fragen auf.',
 'Müntzer verbindet religiöse Erneuerung und gesellschaftliche Veränderung anders als Luther.',
 'Eine Haltung historisch oder theologisch zu erklären bedeutet noch nicht, sie zu rechtfertigen.',
 'Zwischen Freiheit, Gewissen, Ordnung, Widerstand und Verantwortung bestehen Spannungen.'
];
export const lutherComparison=[
 ['Rechtfertigung aus Glauben','Kritik an sozialen Missständen'],
 ['Freiheit vor Gott','Ablehnung gewaltsamen Aufruhrs'],
 ['Dienst am Nächsten','Schutz weltlicher Ordnung'],
 ['Freiheit und Bindung','Spätere Legitimation harter Gewalt']
];
const significance={
 freedom:'Prüfmaßstab für das Verhältnis von Freiheit, Bindung und Nächstenliebe.',
 justification:'Unterscheidet Freiheit vor Gott von politischer Selbstrechtfertigung.',
 service:'Prüft, ob die Verantwortung für Gegner und Unbeteiligte gewahrt bleibt.',
 authority:'Ermöglicht die Prüfung von Ordnungsfunktion und Grenzen äußerer Gewalt.',
 peace:'Zeigt Luthers Kritik an beiden Seiten und seinen Aufruf zum Ausgleich.',
 harsh:'Macht die Verschärfung sichtbar und stellt die Frage nach der Rechtfertigung harter Gewalt.',
 muentzer:'Eröffnet eine andere Deutung religiös begründeter Veränderung und ihrer Gefahren.',
 experience:'Dient der ethischen Prüfung möglicher Handlungen, nicht dem historischen Nachweis über Luther.'
};
function cases(g){
 const rows=[],c=g.choices||{},c3=g.chapter3||{},c4=g.chapter4||{},c5=g.chapter5||{};
 const add=(situation,choiceId,value,effect)=>{const option=choices[choiceId]?.options.find(o=>o.id===value);if(option)rows.push({situation,position:option.text,consequence:text(effect)||'Die Entscheidung eröffnet eine Position im Konflikt; eine eigenständige Folge ist hier nicht ausgewiesen.'});};
 // Consequences are existing reactions, not predictions or reconstructed causality.
 const reaction=(id,value)=>{let r=choices[id]?.options.find(o=>o.id===value)?.reaction;if(typeof r==='string'&&dialogues[r])r=dialogues[r];if(Array.isArray(r)){const replies=r.map(x=>typeof x==='string'?x:typeof x?.text==='string'?x.text:null).filter(Boolean);return replies.length?'Rückmeldung in der Simulation: '+replies.map(t=>'„'+t+'“').join(' '):null;}return typeof r==='string'&&!/^ch[0-9]/.test(r)?r:null;};
 add('Nutzungsrechte am Wald','forestResponse',c.forestResponse,reaction('forestResponse',c.forestResponse));
 add('Abgaben und Lebensunterhalt','duesResponse',c.duesResponse,reaction('duesResponse',c.duesResponse));
 if(!c3.printStrategy)add('Religiöse Begründung gemeinsamer Forderungen','ch3Religion',c3.religiousInterpretation,reaction('ch3Religion',c3.religiousInterpretation));
 add('Veröffentlichung der Zwölf Artikel','ch3Print',c3.printStrategy,{full:'Die vollständigen Artikel konnten im Dorf genauer gelesen werden.',summary:'Im Dorf traf eine kurze Fassung auf unterschiedliche Deutungen.',religious:'Die religiöse Begründung prägte den Streit im Dorf.',accusation:'Das anklagende Blatt verschärfte den Ton gegenüber der Herrschaft.'}[c3.printStrategy]);
 add('Widerstandsstrategie','ch3Resistance',c3.resistanceStrategy,reaction('ch3Resistance',c3.resistanceStrategy));
 add('Verhandlung in Weingarten','ch4Weingarten',c4.weingartenResponse,reaction('ch4Weingarten',c4.weingartenResponse));
 add('Umgang mit dem Gefangenen','ch5Prisoner',c5.prisonerDecision,c5.prisonerDecision==='bargaining_leverage'?'Die Herrschaft verlangte die Freilassung vor weiteren Gesprächen. Das Druckmittel verschärfte ihre Reaktion.':reaction('ch5Prisoner',c5.prisonerDecision));
 const action=availableFinalActions(c5).find(x=>x[0]===c5.finalAction);
 if(action){const out=[recapOutcomes.konrad[c5.konradOutcome],recapOutcomes.negotiation[c5.negotiationOutcome],recapOutcomes.civilian[c5.civilianOutcome],recapOutcomes.world[c5.endWorldState]].filter(Boolean);rows.push({situation:'Handeln angesichts der herannahenden Truppen',position:action[1],consequence:out.length?'Dokumentierter Verlauf der Simulation (nicht allein durch diese Handlung verursacht): '+out.join(' '):'Eine eigenständige Folge dieser Handlung ist im gespeicherten Stand nicht ausgewiesen.'});}
 return rows;
}
export function buildTheologicalDossier(g={},options={}){
 const c=g.chapter6||{},network=c.theologicalNetwork||{},links=[];
 for(const id of Array.isArray(network.links)?network.links:[]){const m=/^([0-7])-([0-7])$/.exec(id);if(!m||m[1]===m[2])continue;const [a,b]=m.slice(1).map(Number).sort((a,b)=>a-b),key=a+'-'+b;if(!links.some(x=>x.id===key))links.push({id:key,a,b,label:concepts[a]+' – '+concepts[b]});}
 const selected=Array.isArray(c.selectedEvidence)?c.selectedEvidence:[];
 const selectedEvidence=evidence.filter(e=>selected.includes(e[0])).map(([id,title,type,documentId,statement])=>({id,title:id==='experience'?'Handlungsentscheidung als Fallmaterial':title,type:id==='experience'?'Fallmaterial aus der Simulation':id==='muentzer'?'Historische Position in heutiger Zusammenfassung':documentId?'Historische Quelle; Kernaussage in heutiger Zusammenfassung':'Theologische Position',statement,significance:significance[id]}));
 const sources=['c4_memory','c4_authority'].map(id=>{const s=chapterFourDocuments[id];return {title:s.title,creator:s.author,year:s.year,institution:'Textnachweis im Quellenarchiv',url:s.sourceUrl};}).concat(epilogueSources.filter(s=>['articles','peace','harsh','muentzer'].includes(s.id)).map(({title,creator,year,institution,signature,url})=>({title,creator,year,institution,signature,url})));
 return {
 meta:{title:'Luther, Freiheit und Bauernkrieg 1525',subtitle:'Theologisches Dossier',subject:'Christliche Freiheit, Obrigkeit, Widerstand und Verantwortung',date:options.date||new Date().toLocaleDateString('de-DE'),name:text(options.name),course:text(options.course)},
 guidingQuestion:{question:guidingQuestion,focus:label(openTheologicalQuestions,g.chapter5?.openTheologicalQuestion)||label(openTheologicalQuestions,c.openingQuestion)},
 theologicalFoundations:foundations.map(([title,body])=>({title,body})),decisionsAsCases:cases(g),
 theologicalNetwork:{concepts:[...new Set([0,...links.flatMap(l=>[l.a,l.b])])].map(id=>({id,label:concepts[id]})),links,explanations:links.filter(l=>Array.isArray(network.selectedExplanations)&&network.selectedExplanations.includes(l.id)&&text(c.networkExplanations?.[l.id])).map(l=>({label:l.label,text:c.networkExplanations[l.id]}))},
 lutherComparison:{rows:lutherComparison,position:label(interpretations,c.lutherContinuityJudgment),reasoning:text(c.lutherContinuityReasoning),counterArgument:text(c.lutherCounterArgument)},
 lutherMuentzer:{rows:comparison,weight:label(risks,c.lutherMuentzerJudgment?.moreWeightyRisk)},
 evidence:selectedEvidence,
 judgment:{position:label(finalPositions,c.finalPosition),dimensions:dimensions.map(([id,title])=>({id,title,result:label(qualitative,c.judgmentDimensions?.[id]),reasoning:text(c.dimensionReasoning?.[id])})).filter(d=>d.result||d.reasoning),evidence:selectedEvidence.map(e=>e.title),counterArgument:text(c.counterArgument),text:text(c.finalJudgmentText)},
 freedomDefinition:{initial:earlyFreedom(g)||text(c.freedomThen),text:text(c.finalFreedomDefinition)},keyInsights:[...insights],sources
 };
}
