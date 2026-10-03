const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const server=require('./serve.cjs');
const base='http://127.0.0.1:4182/';
async function fixture(p,id,speaker=null,emotion='neutral'){
  await p.evaluate(async({id,speaker,emotion})=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');const s=prepareAdminStateForScene(id);if(speaker){s.dialogue={lines:[{speaker,emotion,text:'Wir sprechen darüber, was morgen im Dorf geschehen soll.'}],index:0,after:'idle',context:null};s.interaction=null;}localStorage.setItem('1525.freedom.save.v1',JSON.stringify(s));},{id,speaker,emotion});
  await p.goto(base);await p.locator('[data-action="resume"]').click();
}
(async()=>{server.listen(4182,'127.0.0.1');const b=await chromium.launch({channel:'msedge',headless:true});try{
 const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base);
 const speakers=await p.evaluate(async()=>{const {characters}=await import('./data/characters.js');return Object.entries(characters).flatMap(([id,c])=>Object.keys(c.states).map(emotion=>({id,emotion})));});
 for(const width of [1440,1024,820]){
  await p.setViewportSize({width,height:width===1440?900:width===1024?768:640});
  for(const {id,emotion} of speakers){
   await fixture(p,['peter','anna','jakob'].includes(id)?'ch1_s5_conversations':'ch2_assembly',id,emotion);
   const slot=await p.locator('.portrait').boundingBox();assert.equal(slot.width,84);assert.equal(slot.height,104);
   const graphic=p.locator('.portrait img,.portrait svg');const r=await graphic.boundingBox();assert.ok(r.x>slot.x&&r.y>slot.y&&r.x+r.width<slot.x+slot.width&&r.y+r.height<slot.y+slot.height,'missing safety inset');
   if(await p.locator('.portrait img').count()){await p.waitForFunction(()=>document.querySelector('.portrait img').complete);assert.equal(await p.locator('.portrait img').evaluate(n=>getComputedStyle(n).objectFit),'contain');assert.ok(await p.locator('.portrait img').evaluate(n=>n.naturalWidth>0));}
   else {assert.equal(await graphic.getAttribute('preserveAspectRatio'),'xMidYMid meet');}
   const name=await p.locator('.speaker-plaque').boundingBox();assert.ok(name.y+name.height<=slot.y||name.x>=slot.x+slot.width||name.x+name.width<=slot.x,'name overlaps portrait');
   const next=await p.locator('[data-action="dialogue-next"]').boundingBox();assert.ok(next.y+next.height<=await p.evaluate(()=>innerHeight));
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   if(emotion==='neutral')await p.screenshot({path:`artifacts/ui-portrait-${id}-${width}.png`});
  }
  await fixture(p,'ch1_end');await p.locator('[data-action="prop-door"]').click();await p.locator('.chapter-continue').waitFor({state:'visible'});await p.waitForTimeout(4000);
  const primary=await p.locator('.chapter-continue').boundingBox();assert.ok(primary.height>=64&&primary.y+primary.height<=await p.evaluate(()=>innerHeight));assert.equal(await p.locator('.ending-actions button').count(),3);
  for(const btn of await p.locator('.ending-actions button').all()){const r=await btn.boundingBox();assert.ok(r.height>=43.9&&r.y>primary.y+primary.height&&r.x>=0&&r.x+r.width<=width,JSON.stringify({r,primary,width}));assert.ok(r.height<primary.height);}
  await p.screenshot({path:`artifacts/ui-transition-${width}.png`});
  for(const touch of [false,true]){
   const ctx=await b.newContext({viewport:{width,height:width===1440?900:width===1024?768:640},hasTouch:touch});const q=await ctx.newPage();await q.goto(base);await fixture(q,'ch2_dues');
   const card=await q.locator('[data-card="sack-0"]').boundingBox(), source=await q.locator('[data-card="sack-0"] img').boundingBox(),zone=await q.locator('[data-drop-zone="food"]').boundingBox();
   const x=card.x+card.width/2,y=card.y+card.height/2,tx=zone.x+zone.width/2,ty=zone.y+zone.height/2;let c;
   if(touch){c=await ctx.newCDPSession(q);await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tx,y:ty}]});}else{await q.mouse.move(x,y);await q.mouse.down();await q.mouse.move(tx,ty,{steps:6});}
   assert.equal(await q.locator('.drag-ghost').count(),1);const ghost=await q.locator('.grain-drag-ghost img').boundingBox();assert.ok(Math.abs(ghost.width-source.width)<1&&Math.abs(ghost.height-source.height)<1,'sack grows while dragging');
   await q.screenshot({path:`artifacts/ui-sack-drag-${touch?'touch':'mouse'}-${width}.png`});
   if(touch)await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await q.mouse.up();assert.equal(await q.locator('.drag-ghost').count(),0);
   assert.equal(await q.evaluate(()=>JSON.parse(localStorage.getItem('1525.freedom.save.v1')).chapter2.grain['sack-0']),'food');
   const dropped=await q.locator('[data-card="sack-0"] img').boundingBox();assert.equal(dropped.width,source.width);assert.equal(dropped.height,source.height);await ctx.close();
  }
  console.log('All portrait states, transition hierarchy and mouse/touch ghost sizes passed '+width);
 }
 assert.deepEqual(errors,[]);
 }finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
