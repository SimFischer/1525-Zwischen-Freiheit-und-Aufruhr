import { chapterThreeDecisionRules } from './chapter-three-consequences.js';
// For every important decision from chapter 3 onward document: immediate response,
// later callback, orientation/perception effect, and potential chapter 5/6 recall.
// Open responses describe approaches, never moral quality. Incorrect task answers
// have no negative character effects. IDs reuse the existing choices save fields.
export const orientationKeys=['community','legal','resistance','prudence','theological'];
export const perceptionCharacters=['lotzer','matthes','georg','katharina','hans','printer','peter','anna','jakob','margarethe','konrad','ulrich'];
export const perceptionTags=['community_minded','cautious','legally_argumentative','willing_to_resist','theologically_reflective','reliable','questioned_authority','avoids_conflict','seeks_negotiation','social_tension'];
const effect=(orientation={},perceptions={})=>({orientation,perceptions});
export const decisionRules={
 ...chapterThreeDecisionRules,
 initialFreedomInterpretation:{chapter:1,immediate:'Existing interpretation reactions',later:'ch2Morning',options:{
  freedom_no_obedience:effect({resistance:1},{jakob:['willing_to_resist']}),
  freedom_different_kind:effect({theological:1},{jakob:['theologically_reflective']}),
  freedom_life_tension:effect({theological:1,resistance:.5},{anna:['social_tension']}),
  freedom_responsibility:effect({community:1,theological:1},{anna:['community_minded']})}},
 freedomSocialFirstThought:{chapter:1,immediate:'Existing Peter reaction',later:'corveeIntro',options:{
  peter_god_first:effect({theological:1},{peter:['theologically_reflective']}),
  peter_social_consequence:effect({resistance:.5,theological:.5},{peter:['social_tension']}),
  peter_uncertain:effect({prudence:.5},{peter:['cautious']})}},
 freedomAndOuterLife:{chapter:1,immediate:'Existing differentiated feedback',later:'lutherRecall',options:{D:effect({theological:1,legal:.5},{jakob:['theologically_reflective']})}},
 forestResponse:{chapter:2,immediate:'Existing Anna/administrator reactions',later:'assemblyIntro',options:{
  take:effect({resistance:1},{ulrich:['questioned_authority'],anna:['willing_to_resist']}),
  leave:effect({prudence:1},{anna:['cautious','avoids_conflict']}),
  legal_basis:effect({legal:1},{ulrich:['legally_argumentative']}),
  community:effect({community:1},{anna:['community_minded']})}},
 corveeSacrifice:{chapter:2,immediate:'The chosen farm work remains undone',later:'assemblyIntro',options:{grain:effect(),fence:effect(),feed:effect()}},
 corveeResponse:{chapter:2,immediate:'Existing compulsory-service reactions',later:'assemblyIntro / assemblyPressure',options:{
  go:effect({prudence:1},{peter:['reliable']}),
  substitute:effect({community:.5,prudence:.5},{peter:['community_minded']}),
  delay:effect({legal:.5,prudence:.5},{peter:['seeks_negotiation'],ulrich:['seeks_negotiation']}),
  refuse:effect({resistance:1},{ulrich:['willing_to_resist'],konrad:['willing_to_resist']})}},
 duesResponse:{chapter:2,immediate:'Existing dues reactions',later:'assemblyIntro / assemblyPressure',options:{
  pay:effect({prudence:1},{margarethe:['cautious']}),
  delay:effect({legal:.5,prudence:.5},{margarethe:['seeks_negotiation']}),
  withhold:effect({resistance:1},{ulrich:['questioned_authority']}),
  question_basis:effect({legal:1},{margarethe:['legally_argumentative'],ulrich:['legally_argumentative']})}},
 duesSecondSacrifice:{chapter:2,immediate:'Existing supply consequence or refusal report',later:'assemblyIntro',options:{food:effect(),seed:effect(),reserve:effect(),refuse:effect({resistance:1},{ulrich:['questioned_authority']})}},
 priorityGrievances:{chapter:2,immediate:'Demand subject selection',later:'assemblyPressure / chapter 3 historical articles'},
 playerDemand:{chapter:2,immediate:'Existing Konrad pressure',later:'chapter 3 historical articles / epilogue'}
};
export const recallLines={
 morning:{
  freedom_no_obedience:{speaker:'jakob',text:'Gestern hast du Luthers Satz schon ziemlich direkt auf unser Leben hier bezogen.'},
  freedom_life_tension:{speaker:'jakob',text:'Gestern hast du gefragt, wie Luthers Satz zu unserem Leben passt. Heute sehen wir, wo es schwierig wird.'},
  freedom_different_kind:{speaker:'jakob',text:'Gestern warst du vorsichtig damit, Luthers Freiheit einfach auf unsere Ordnung zu übertragen.'},
  freedom_responsibility:{speaker:'anna',text:'Gestern hast du gesagt, Freiheit könne mit Verantwortung zusammengehören. Vielleicht ist genau das hier die schwierige Frage.'},
  peter_god_first:{speaker:'jakob',text:'Gestern hast du zuerst nach der Freiheit vor Gott gefragt. Wie wir hier miteinander leben, ist damit noch nicht geklärt.'},
  peter_social_consequence:{speaker:'jakob',text:'Gestern hast du nach den Folgen der Freiheit für unser Leben gefragt. Heute stehen wir mitten darin.'},
  peter_uncertain:{speaker:'peter',text:'Gestern wussten wir noch nicht, was diese Freiheit für unser Leben bedeutet. Vielleicht kommen wir heute weiter.'},
  D:{speaker:'jakob',text:'Gestern hast du Freiheit vor Gott und äußere Ordnung unterschieden. Heute müssen wir fragen, was daraus für unser Handeln folgt.'}},
 forest:{
  take:{speaker:'anna',text:'Im Wald haben wir das Holz trotzdem genommen. Der Verwalter wollte den Vorfall melden.'},
  leave:{speaker:'anna',text:'Im Wald haben wir das Holz liegen lassen, um den Streit nicht weiter zu verschärfen. Feuerholz brauchen wir trotzdem.'},
  legal_basis:{speaker:'anna',text:'Du wolltest damals wissen, auf welchem Recht das Verbot eigentlich beruht.'},
  community:{speaker:'anna',text:'Du wolltest schon im Wald, dass das Dorf gemeinsam darüber spricht.'}},
 corvee:{
  go:'Ich bin gegangen und habe den verlangten Dienst geleistet. Meine eigene Arbeit blieb liegen.',
  substitute:'Wir wollten jemanden an meiner Stelle schicken. Dafür brauchen wir Hilfe, die wir später auch zurückgeben können.',
  delay:'Wir haben um Aufschub gebeten. Ob wir ihn bekommen, entscheiden wir nicht allein.',
  refuse:'Wir haben den Dienst verweigert. Der Verwalter wollte die Weigerung melden.'},
 sacrifice:{grain:'Mein Getreide stand noch draußen.',fence:'Der Zaun blieb offen.',feed:'Die Tiere brauchten noch Futter. Ich musste die Arbeit am Abend nachholen.'},
 dues:{pay:'Wir haben die erste Forderung erfüllt, statt über einen fehlenden Sack zu streiten. Dann wurde noch mehr verlangt.',delay:'Wir haben um Aufschub gebeten. Die zusätzliche Forderung kam trotzdem.',withhold:'Wir haben einen Sack zurückbehalten. Der Verwalter hat die fehlende Menge bemerkt.',question_basis:'Wir haben gefragt, wie die Forderung begründet wird. Der Verwalter hatte darauf keine Antwort.'},
 supply:{food:'Beim Vorrat mussten wir sparen.',seed:'Für die nächste Aussaat wird uns Saatgut fehlen.',reserve:'Jetzt darf nichts mehr schiefgehen.',refuse:'Den zusätzlichen Sack haben wir verweigert. Der Verwalter wollte auch das melden.'}
};
