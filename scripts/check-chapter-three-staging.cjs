const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),server=require('./serve.cjs');
const base='http://127.0.0.1:4186/';
(async()=>{server.listen(4186);const b=await chromium.launch({channel:'msedge',headless:true});try{
const p=await b.newPage();await p.goto(base);
const ids=await p.evaluate(async()=>{const {chapterThreeScenes}=await import('./data/chapter-three.js');return chapterThreeScenes.map(s=>s.id);});
for(const [width,height] of [[1024,768],[820,640],[1440,900]]){
await p.setViewportSize({width,height});let lines=0;
for(const id of ids){
 await p.evaluate(async id=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');localStorage.setItem('1525.freedom.save.v1',JSON.stringify(prepareAdminStateForScene(id)));},id);await p.goto(base);await p.locator('[data-action="resume"]').click();
 while(await p.locator('.dialogue-panel').count()){
 const faults=await p.locator('.ch3-person').evaluateAll(async ns=>{const {figureFrames}=await import('./data/chapter-three-figures.js');return ns.flatMap(n=>{const r=n.getBoundingClientRect(),room=n.closest('.room').getBoundingClientRect(),f=figureFrames[n.getAttribute('src')],mirror=n.dataset.facing==='mirrored',left=r.left+r.width*(mirror?f.width-f.bounds[2]:f.bounds[0])/f.width,right=r.left+r.width*(mirror?f.width-f.bounds[0]:f.bounds[2])/f.width,top=r.top+r.height*f.bounds[1]/f.height,foot=r.top+r.height*f.bounds[3]/f.height,panel=document.querySelector('.dialogue-panel').getBoundingClientRect(),shadow=n.previousElementSibling.getBoundingClientRect(),style=getComputedStyle(n);return left<room.left-1||right>room.right+1||top<room.top-1||foot>room.bottom+1||foot>panel.top-10||Math.abs(foot-shadow.bottom)>3||style.clipPath!=='none'?[{id:n.dataset.person,left,right,top,foot,room:room.toJSON(),panel:panel.toJSON()}]:[];});});
 assert.deepEqual(faults,[],`${id} ${width}`);lines++;
 if(['ch3_road','ch3_lotzer','ch3_return','ch3_printshop'].includes(id))await p.screenshot({path:`artifacts/ch3-revised-${id}-${width}.png`});
 await p.locator('[data-action="dialogue-next"]').click();
 }
}
console.log('Whole figures, no clipping, ground, mutual facing and safe dialogue frame:',width,lines,'dialogue lines');
}
await p.goto(base);
const migrated=await p.evaluate(async()=>{const {freshState}=await import('./js/state.js');const {load}=await import('./js/save-system.js');const results=[];for(const phase of ['form','ink','paper','press','remove','stack','done']){const s=freshState();s.scene='ch3_press';delete s.chapter3.printSequenceVersion;s.chapter3.printPhase=phase;s.chapter3.printed=phase==='done'?4:0;localStorage.setItem('1525.freedom.save.v1',JSON.stringify(s));const n=load();if(!n)throw Error('Legacy rejected '+phase);results.push([phase,n.chapter3.printPhase,n.chapter3.printed]);}return results;});
assert.deepEqual(migrated,[['form','ink',0],['ink','ink',0],['paper','paper',0],['press','press',0],['remove','remove',0],['stack','copying',1],['done','done',4]]);
console.log('Old print saves migrate without restarting completed work');
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
