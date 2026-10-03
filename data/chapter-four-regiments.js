export const regimentsZones=[['spiritual','Glaube und Gewissen'],['worldly','Äußere Ordnung'],['both','Beide Bereiche sind berührt'],['boundary','Grenzfall / mögliche Überschreitung']];
export const regimentsCases=[
 {id:'preacher',text:'Der Herr verbietet einen evangelischen Prediger.',preferred:['spiritual','both','boundary'],reasons:[
  ['sphere','Die Anordnung betrifft die Predigt und damit Glaube und Gewissen.'],
  ['limit','Der Herr setzt weltliche Macht ein, um über Glaubensfragen zu bestimmen.'],
  ['exclusive','Weil der Herr die Anordnung erlässt, ist nur ihre weltliche Zuständigkeit zu prüfen.']
 ],feedback:'Der Herr handelt mit weltlicher Macht, greift damit aber in die Verkündigung ein. Für Luther kann die Obrigkeit den Glauben nicht erzwingen. Hier wird die Grenze zwischen äußerer Herrschaft und Glauben besonders deutlich.',correction:'Wer die Anordnung erlässt, entscheidet noch nicht, ob sie in dessen Zuständigkeit fällt.'},
 {id:'tax',text:'Eine zusätzliche Abgabe wird erhoben.',preferred:['worldly','both'],reasons:[
  ['sphere','Die Abgabe regelt äußere Pflichten und betrifft zunächst die weltliche Ordnung.'],
  ['limit','Auch eine weltliche Abgabe ist auf ihre Rechtsgrundlage und Belastung zu prüfen.'],
  ['exclusive','Mit der Zuordnung zur weltlichen Ordnung ist die Berechtigung der Abgabe geklärt.']
 ],feedback:'Die Abgabe betrifft zunächst die äußere Ordnung. Damit ist noch nicht entschieden, ob sie rechtmäßig und zumutbar ist. Christliche Kritik kann nach ihren Folgen für den Nächsten fragen.',correction:'Die weltliche Zuständigkeit allein macht eine zusätzliche Abgabe noch nicht berechtigt.'},
 {id:'corvee',text:'Bauern verweigern Frondienst.',preferred:['worldly','both','boundary'],reasons:[
  ['sphere','Die Verweigerung betrifft eine äußere Dienstpflicht gegenüber dem Grundherrn.'],
  ['limit','Zu prüfen sind die Grundlage der Pflicht und die Grenzen der verlangten Dienste.'],
  ['exclusive','Die Freiheit vor Gott genügt als Begründung, um die Dienstpflicht aufzuheben.']
 ],feedback:'Frondienst gehört zunächst zur äußeren Ordnung. Trotzdem müssen Recht, Umfang und Grenzen der Pflicht geprüft werden. Die Freiheit vor Gott hebt diese Pflicht nicht automatisch auf.',correction:'Die Freiheit vor Gott begründet allein noch keine Aufhebung der Dienstpflicht.'},
 {id:'command',text:'Ein Prediger erklärt gewaltsamen Widerstand zum unmittelbaren Willen Gottes.',preferred:['both','boundary'],reasons:[
  ['sphere','Ein geistlicher Anspruch soll eine politische Handlung mit Gewalt begründen.'],
  ['limit','Der Anspruch, Gottes Willen zu kennen, und die eingesetzten Mittel sind zu prüfen.'],
  ['exclusive','Ein biblisch begründetes Ziel genügt, um den gewaltsamen Widerstand zu rechtfertigen.']
 ],feedback:'Der Prediger verbindet einen geistlichen Anspruch mit äußerer Gewalt. Für Luther folgt aus dem Evangelium kein unmittelbarer politischer Gewaltauftrag. Die religiöse Begründung und die Mittel müssen getrennt geprüft werden.',correction:'Ein religiös begründetes Ziel rechtfertigt noch nicht die Gewalt zu seiner Durchsetzung.'},
 {id:'arrest',text:'Der Verwalter lässt friedlich Protestierende festnehmen.',preferred:['worldly','both','boundary'],reasons:[
  ['sphere','Die Festnahme betrifft zunächst die äußere Ordnung und weltliche Gewalt.'],
  ['limit','Entscheidend ist, ob die Obrigkeit damit ihre legitime Aufgabe überschreitet.'],
  ['exclusive','Die Verantwortung für den Frieden rechtfertigt die Festnahme bereits hinreichend.']
 ],feedback:'Die Festnahme gehört zunächst zur äußeren Ordnung. Weil der Protest friedlich ist, stellt sich aber die Frage nach den Grenzen legitimer Gewalt. Luthers Unterscheidung entscheidet den Fall nicht automatisch.',correction:'Die Aufgabe, Frieden zu sichern, rechtfertigt noch nicht jede Festnahme.'}
];
export const regimentsSynthesis=[
 ['A','Luthers Unterscheidung trennt Glaube und äußere Ordnung grundsätzlich voneinander.'],
 ['B','In konkreten Konflikten können beide Bereiche gleichzeitig berührt sein.'],
 ['C','Bei einer weltlichen Streitfrage genügt es, den Schutzauftrag der Obrigkeit festzustellen.'],
 ['D','Besonders schwierig wird es, wenn Obrigkeit Glauben und Gewissen bestimmen will oder Religion unmittelbar politische Gewalt legitimiert.']
];
export const regimentsSummary='Luthers Unterscheidung schafft keine einfache Schablone für jeden Konflikt. Sie fragt danach, mit welchen Mitteln geistliche und weltliche Ordnung wirken – und wo ihre Grenzen liegen.';
export const caseComplete=(cas,entry)=>!!entry&&regimentsZones.some(([id])=>id===entry.classification)&&cas.reasons.some(([id])=>id===entry.reasoning);
export const regimentsComplete=c=>regimentsCases.every(cas=>caseComplete(cas,c.twoRegimentsCases[cas.id]));
export function regimentsFeedback(cas,entry){
 if(entry.reasoning==='exclusive')return cas.correction+' '+cas.feedback.split(/(?<=[.!?]) /).slice(-2).join(' ');
 if(!cas.preferred.includes(entry.classification))return cas.id==='tax'?'Die Abgabe betrifft zunächst die äußere Ordnung, nicht unmittelbar den Glauben. Ob die Obrigkeit ihre Befugnisse überschreitet, muss gesondert geprüft werden. Ihre Zuständigkeit allein entscheidet nicht über die Gerechtigkeit der Abgabe.':cas.id==='corvee'?'Frondienst betrifft zunächst äußere Rechte und Pflichten. Eine religiöse Begründung kann hinzukommen, ersetzt aber nicht die Prüfung der konkreten Pflicht und ihrer Grenzen.':cas.id==='preacher'?'Die Anordnung wird mit weltlicher Macht durchgesetzt, betrifft aber den Glauben. Deshalb genügt die Einordnung als äußere Ordnung nicht. Hier stellt sich die Frage nach den Grenzen der Obrigkeit.':cas.id==='command'?'Hier sind beide Bereiche berührt: Ein geistlicher Anspruch soll politische Gewalt legitimieren. Keiner der Bereiche erklärt den Fall allein. Begründung und Mittel müssen getrennt geprüft werden.':'Die Festnahme betrifft zunächst weltliche Gewalt. Gerade bei friedlichem Protest stellt sich die Frage nach deren legitimen Grenzen.';
 return cas.feedback;
}
