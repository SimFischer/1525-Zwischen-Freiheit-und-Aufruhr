import { chapterFiveChoices,religionFunctions,lutherThoughts,debateArguments } from '../data/chapter-five.js';
import { pathReflection,outcomeTexts } from './chapter-five.js';
import { chapterFourChoices,communityConditions,hermeneuticalCriteria } from '../data/chapter-four.js';
import { chapterFourFields } from '../data/chapter-four-state.js';
import { memoryText } from './chapter-three-view.js';
import { chapterThreeChoices } from '../data/chapter-three.js';
import { chapterTwoNotebook, reflections, dayTasks, stores, villageDemandNote } from '../data/chapter-two.js';
import { state } from './state.js';
import { choices } from '../data/choices.js';
import { documents } from '../data/documents.js';
import { notebookEntries } from '../data/notebook-entries.js';
import { openOverlay, esc, button } from './ui.js';
export function chosenText(id) { return state.choiceTexts[id] || choices[id]?.options.find(item => item.id === state.choices[id])?.text || 'Noch keine Deutung festgehalten.'; }
function villageNotes() {
  return Object.entries(chapterTwoNotebook).filter(([id])=>state.chapter2[id+'Complete']).map(([id,texts])=>{
    const decisions=id==='forest' ? chosenText('forestResponse') : id==='corvee' ? 'Mein Tagesplan: '+state.choices.peterDayPlan.map(key=>dayTasks[key]).join(' → ')+'. Verschoben: '+dayTasks[state.choices.corveeSacrifice]+'. '+chosenText('corveeResponse') : 'Meine ursprüngliche Planung: '+Object.entries(state.choices.initialFarmPlan).map(([key,value])=>stores[key]+': '+value+' Säcke').join(', ')+'. '+chosenText('duesResponse')+' Zusätzliche Forderung: '+(state.choices.duesSecondSacrifice==='refuse'?'verweigert':stores[state.choices.duesSecondSacrifice])+'.';
    const observations=state.grievances[id].map(key=>reflections[id].items.find(item=>item[0]===key)?.[1]).join('; ');
    return '<h2>'+({forest:'Wald und Nutzungsrechte',corvee:'Frondienst',dues:'Abgaben'})[id]+'</h2>'+texts.map(text=>'<p>'+esc(text)+'</p>').join('')+'<div class="personal-note"><p>Meine Entscheidung: '+esc(decisions)+'</p><p>Meine Beobachtung: '+esc(observations)+'</p></div>'+(state.grievances[id].includes('absolute')?'<p>'+esc(reflections[id].warning)+'</p>':'');
  }).join('')+(state.choices.playerDemand?'<h2>Unsere Forderung</h2><p>'+esc(state.choices.playerDemand)+'</p><details class="editorial-info"><summary>Zur historischen Einordnung</summary><p>'+esc(villageDemandNote)+'</p></details>':'');
}
export function openNotebook(tab = 'freedom') {
  let content = '';
  if (tab === 'freedom') content = state.notebook.entries.map(id => {
    const entry = notebookEntries[id];
    return entry ? `<h2>${esc(entry.title)}</h2>${entry.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}<p class="securing">${esc(entry.motto)}</p>${entry.additional.map(p => `<p>${esc(p)}</p>`).join('')}` : '';
  }).join('');
  if(tab==='memmingen')content=memoryText()+(state.chapter3.printed?'<details class="editorial-info"><summary>Zur Verbreitungskarte</summary><p>Die Verbreitungskarte ist eine atmosphärische Darstellung. Ihre Wege stehen für die Weitergabe von Druckschriften und behaupten keine belegten Einzelrouten.</p></details>':'');
  if(tab==='freedom'&&state.chapter3.religiousInterpretation)content+='<h2>Evangelium und Forderungen</h2><div class="personal-note"><p>'+esc(chosenText('ch3Religion'))+'</p></div>';
  if(tab==='freedom'&&(state.chapter===4||state.chapter4.lutherFreedomJudgmentEarly)){content+='<h2>Mein Gedanke aus der Taverne · 1520</h2><div class="personal-note"><p>'+esc(chosenText('initialFreedomInterpretation'))+'</p></div><h2>Die Ermahnung · April 1525</h2><p>Luther unterscheidet zwischen einer berechtigten Forderung und den Mitteln zu ihrer Durchsetzung. Seine Kritik an den Herren hebt die Frage nach äußeren Pflichten nicht auf.</p>'+['ch4Early','ch4HarshJudgment'].filter(id=>state.choices[id]).map(id=>'<h2>'+esc(chapterFourChoices[id].prompt)+'</h2><p>'+esc(chosenText(id))+'</p>').join('');}

  if (tab === 'documents') content = state.notebook.documents.map(id => `<button class="document-card" data-action="archive-document" data-document="${id}"><span>${documents[id].author}</span><strong>${esc(documents[id].title)} (${documents[id].year})</strong><span>Quelle öffnen ↗</span></button>`).join('');
  if(tab==='village') content=villageNotes();
  if (tab === 'path') content = `<h2>Meine erste Deutung von Freiheit</h2><div class="personal-note"><p>„${esc(chosenText('initialFreedomInterpretation'))}“</p></div>${['freedomSocialFirstThought','freedomAndOuterLife'].filter(id => state.choices[id]).map(id => `<div class="path-entry"><p class="eyebrow">${esc(choices[id].prompt)}</p><p>${esc(chosenText(id))}</p></div>`).join('')}`;
  if(tab==='path') content+=['ch3EntryFocus','ch3Demand_'+state.chapter3.entryFocus,'ch3Religion','ch3Print','ch3Resistance','ch3Reason'].filter(id=>state.choices[id]&&chapterThreeChoices[id]).map(id=>'<div class="path-entry"><h2>'+esc(chapterThreeChoices[id].prompt)+'</h2><p>'+esc(chosenText(id))+'</p></div>').join('');
  if(tab==='path'&&state.chapter4.openingRoute)content+='<h2>Ordnung oder Widerstand?</h2><p>Mein vorbereiteter Weg: '+esc({A:'Verhandlung',B:'Gemeinsamer Druck',C:'Offener Widerstand möglich',D:'Theologische Klärung'}[state.chapter4.openingRoute])+'</p>'+Object.values(chapterFourFields).filter(id=>state.choices[id]).map(id=>'<div class="path-entry"><h2>'+esc(chapterFourChoices[id].prompt)+'</h2><p>'+esc(chosenText(id))+'</p></div>').join('');
  if(tab==='path'){const labels=(ids,items)=>ids.map(id=>items.find(x=>x[0]===id)?.[1]).filter(Boolean).join('; ');if(state.chapter4.communityConditions.length)content+='<h2>Unser gemeinsames Mandat</h2><p>'+esc(labels(state.chapter4.communityConditions,communityConditions))+'</p>';if(state.chapter4.hermeneuticalCriteria.length)content+='<h2>Maßstäbe meiner Auslegung</h2><p>'+esc(labels(state.chapter4.hermeneuticalCriteria,hermeneuticalCriteria))+'</p>';}
  if(tab==='action'){
    const c=state.chapter5,label=(items,id)=>items.find(x=>x[0]===id)?.[1]||'Noch offen';
    content='<h2>Du musst handeln</h2>'+pathReflection(state).map(text=>'<p>'+esc(text)+'</p>').join('');
    for(const [id,def] of Object.entries(chapterFiveChoices))if(state.choices[id])content+='<h2>'+esc(def.prompt)+'</h2><p>'+esc(chosenText(id))+'</p>';
    if(c.religionFunctions.strongest.length)content+='<h2>Religion als Handlungskraft</h2><p>'+esc(c.religionFunctions.strongest.map(id=>label(religionFunctions,id)).join('; '))+'</p><p>Gefährlich bei absoluter Geltung: '+esc(label(religionFunctions,c.religionFunctions.dangerousWhenAbsolute))+'</p>';
    if(c.lutherTension.helpful)content+='<h2>Meine Luther-Spannung</h2><p>Hilfreich: '+esc(label(lutherThoughts,c.lutherTension.helpful))+'</p><p>Spannung: '+esc(label(lutherThoughts,c.lutherTension.tension))+'</p>';
    if(c.internalDebate.strongestArgument)content+='<h2>Unser Streit</h2><p>'+esc(label(debateArguments,c.internalDebate.strongestArgument))+'</p><p>Grenze: '+esc(debateArguments.find(a=>a[0]===c.internalDebate.mostDangerousAbsolute)?.[2])+'</p>';
    for(const [key,field] of [['konrad','konradOutcome'],['negotiation','negotiationOutcome'],['civilian','civilianOutcome']])if(c[field])content+='<h2>'+esc({konrad:'Konrad',negotiation:'Verhandlung',civilian:'Unbeteiligte'}[key])+'</h2><p>'+esc(outcomeTexts[key][c[field]])+'</p>';

  }
  if(tab==='documents'&&state.chapter5.openingPath)content+='<details class="editorial-info"><summary>Zur Einordnung</summary><p>Die Dorfszenen und Berichte sind erfunden. Die Luther-Gedanken sind in heutiger Sprache zusammengefasst. Sie greifen Freiheit und Dienst am Nächsten (1520), weltliche Obrigkeit (1523), Friedensermahnung und Aufruhrkritik (1525) auf. Die Originalauszüge liegen in den freigeschalteten Quellen des Archivs.</p></details>';
  openOverlay(`<article class="notebook"><div class="overlay-top"><span class="eyebrow">Dein Notizbuch</span>${button('Schließen ×','close-overlay','class="quiet"')}</div><h1 id="overlay-title">Notizbuch</h1><nav class="notebook-tabs" aria-label="Notizbuch">${[['freedom','Freiheit'],['documents','Dokumente'],['path','Mein Weg'],...(state.chapter5.openingPath?[['action','Mein Handeln']]:[]),...(state.chapter===3||state.chapter3.entryFocus?[['memmingen','Memmingen']]:[]),...((state.chapter===2||state.chapter2.forestComplete||state.chapter2.corveeComplete||state.chapter2.duesComplete)?[['village','Unser Dorf']]:[])].map(([id,label]) => `<button data-action="notebook-tab" data-tab="${id}" aria-current="${tab === id ? 'page' : 'false'}">${label}</button>`).join('')}</nav><div class="notebook-content">${content}</div></article>`, () => {}, 'notebook');
}
