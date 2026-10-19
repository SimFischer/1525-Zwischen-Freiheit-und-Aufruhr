export function learningFeedback({count,correct,solution,explanation,hints=[],response=''}){
 const done=correct||count>=3;
 if(correct)return {done,text:explanation};
 if(count>=3)return {done,text:`Die fachlich tragfähige Lösung lautet: ${solution} ${explanation}`};
 const hint=count===1?hints[0]:hints[1]||`Prüfe diesen fachlichen Maßstab: ${explanation.split(/(?<=[.!?]) /)[0]} Vergleiche damit die Begründungen der Antworten.`;
 return {done,text:[response,hint||(count===1&&response?'':explanation)].filter(Boolean).join(' ')};
}
