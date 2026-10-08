// Actual arrival moment in both paths, including reload and continuation.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
(async()=>{await new Promise(r=>server.listen(4213,'127.0.0.1',r));const b=await chromium.launch({channel:'msedge',headless:true});try{
 const p=await b.newPage({hasTouch:true}),errors=[],KEY='1525.freedom.save.v1',rows=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url());});fs.mkdirSync('artifacts/chapter5/wounded',{recursive:true});
 await p.goto('http://127.0.0.1:4213/');
 for(const [width,height]of [[1024,768],[820,640],[1440,900]])for(const openingPath of ['peasant_band','theological_council']){
  await p.setViewportSize({width,height});await p.evaluate(async({openingPath,KEY})=>{const g=(await import('./js/admin-state.js')).prepareAdminStateForScene('ch5_escalation_message',{chapter5:{openingPath}});g.consequences.adminScenario=null;localStorage.setItem(KEY,JSON.stringify(g));}, {openingPath,KEY});await p.reload();await p.locator('[data-action="resume"]').click();
  await p.waitForFunction(()=>[...document.querySelectorAll('.chapter-five-layout img')].every(i=>i.complete&&i.naturalWidth));
  const addition=JSON.parse(fs.readFileSync('chapter5_assets_additions.json')).assets[0];
  const runtime=await p.evaluate(async()=>{const {chapterFiveStaging:s}=await import('./data/chapter-five-staging.js');return s.assets.overlay_wounded_return_council;});assert.deepEqual(runtime,addition,'runtime and supplementary manifest match');
  const layer=p.locator('[data-overlay="wounded_return_council"]');assert.equal(await layer.count(),1);assert.equal(await p.locator('[data-overlay="wounded_return"]').count(),0);assert.equal(await p.locator('.ch4-figures img').count(),0,'no stacked Canon bodies');assert.match(await layer.getAttribute('src'),/wounded_return_council\.png$/);
  const geometry=await p.evaluate(()=>{const room=document.querySelector('.room-image').getBoundingClientRect(),layer=document.querySelector('[data-overlay="wounded_return_council"]').getBoundingClientRect(),dialog=document.querySelector('.dialogue-panel')?.getBoundingClientRect();return{room:room.toJSON(),layer:layer.toJSON(),dialog:dialog?.toJSON(),horizontal:document.documentElement.scrollWidth>innerWidth};});
  assert.equal(geometry.horizontal,false);for(const key of ['x','y','width','height'])assert.ok(Math.abs(geometry.room[key]-geometry.layer[key])<1,'identity registration '+key);
  const [l,t,r,bot]=addition.preferredStaging.visibleAlphaBounds,bodyBottom=geometry.layer.y+bot/768*geometry.layer.height;assert.ok(bodyBottom<geometry.layer.y+geometry.layer.height*.74,'visible body above safe area');
  for(const button of await p.locator('.dialogue-panel button:visible').all()){const box=await button.boundingBox();assert.ok(box.height>=44&&box.x>=0&&box.x+box.width<=width+1&&box.y+box.height<=height+1);}
  const before=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);await p.screenshot({animations:'disabled',path:`artifacts/chapter5/wounded/${openingPath}-${width}-dialogue.png`});await p.reload();await p.locator('[data-action="resume"]').click();assert.deepEqual(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),before,'reload preserves save');
  for(let i=0;i<30&&await p.locator('[data-action="dialogue-next"]').count();i++)await p.locator('[data-action="dialogue-next"]').click();
  assert.equal(await layer.count(),1);await p.screenshot({animations:'disabled',path:`artifacts/chapter5/wounded/${openingPath}-${width}-ready.png`});await p.locator('[data-action="ch5-next"]').tap();
  const after=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);assert.equal(after.scene,'ch5_three_reports');assert.equal(after.chapter5.openingPath,openingPath);assert.deepEqual(after.choices,before.choices);assert.deepEqual(after.orientation,before.orientation);rows.push({openingPath,width,height,pass:true});console.log('PASS wounded arrival '+openingPath+' '+width+'x'+height);
 }
 assert.deepEqual(errors,[]);fs.writeFileSync('artifacts/chapter5/wounded/results.json',JSON.stringify(rows,null,2));
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
