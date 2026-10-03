import { freshChapterFour } from './chapter-four-state.js';
import { chapterFourDocuments } from './chapter-four-documents.js';
import { regimentsCases,regimentsZones,caseReasons,chapterFourScenes } from './chapter-four.js';
// Merge old v1–v4 saves with Chapter 4 defaults and constrain nested browser data.
export function sanitizeChapterFour(game){
 const c=game.chapter4,base=freshChapterFour();
 for(const [key,value] of Object.entries(base)){
  if(Array.isArray(value))c[key]=Array.isArray(c[key])?c[key].filter(x=>typeof x==='string'||typeof x==='number').slice(0,50):[];
  else if(value&&typeof value==='object')c[key]=c[key]&&typeof c[key]==='object'&&!Array.isArray(c[key])?c[key]:{};
  else if(typeof value==='boolean')c[key]=c[key]===true;
 }
 c.comparisonIndex=Number.isInteger(c.comparisonIndex)&&c.comparisonIndex>=0&&c.comparisonIndex<5?c.comparisonIndex:0;
 const pages=new Set(Object.values(chapterFourDocuments).flatMap(d=>d.pages));
 c.seenDocuments=c.seenDocuments.filter(p=>pages.has(p));
 c.twoRegimentsCases=Object.fromEntries(Object.entries(c.twoRegimentsCases).filter(([id,zone])=>regimentsCases.some(x=>x.id===id)&&regimentsZones.some(x=>x[0]===zone)));
 c.caseReasons=Object.fromEntries(Object.entries(c.caseReasons).filter(([id,reason])=>regimentsCases.some(x=>x.id===id)&&caseReasons.some(x=>x[0]===reason)));
 c.selections=Object.fromEntries(Object.entries(c.selections).filter(([,v])=>Array.isArray(v)).map(([k,v])=>[k,v.filter(x=>typeof x==='string').slice(0,10)]));
 c.attempts=Object.fromEntries(Object.entries(c.attempts).filter(([,v])=>Number.isFinite(v)&&v>=0));
 c.docRead=Object.fromEntries(Object.entries(c.docRead).filter(([,v])=>v===true));
 c.resolved=Object.fromEntries(Object.entries(c.resolved).filter(([,v])=>v===true));
 for(const [id,doc] of Object.entries(chapterFourDocuments))if(game.notebook.passages[id])game.notebook.passages[id]=Array.isArray(game.notebook.passages[id])?game.notebook.passages[id].filter(x=>doc.pages.includes(x)):[];
 if(game.scene.startsWith('ch4_'))c.stage=chapterFourScenes.find(s=>s.id===game.scene)?.id.slice(4)||'opening';
 return game;
}
