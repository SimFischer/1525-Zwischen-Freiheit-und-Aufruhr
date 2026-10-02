const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const server=require('./serve.cjs');
const base='http://127.0.0.1:4180/';
async function fixture(page,id){
  await page.evaluate(async id=>{
    const {prepareAdminStateForScene}=await import('./js/admin-state.js');
    const s=prepareAdminStateForScene(id==='completed_conversations'?'ch1_end':id);
    if(id==='completed_conversations')s.scene='ch1_s5_conversations';
    s.dialogue=null;s.interaction=null;
    // Include the unlocked reading marker in the crowded tavern audit.
    if(id.startsWith('ch1_')||id==='completed_conversations')s.progress.flyerUnlocked=true;
    localStorage.setItem('1525.freedom.save.v1',JSON.stringify(s));
  },id);
  await page.goto(base);await page.locator('[data-action="resume"]').click();
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete));
}
async function labels(page,width,id){
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const room=await page.locator('.room').boundingBox();
  const materials=await page.locator('.scene-hotspot:not(:disabled):not([hidden])').evaluateAll(nodes=>nodes.map(n=>{
    const label=n.querySelector('.hotspot-label'),paint=getComputedStyle(label,'::before');
    return {source:paint.borderImageSource,mirror:paint.transform,textTransform:getComputedStyle(label).transform,
      left:n.classList.contains('hotspot-path-left'),type:n.classList.contains('hotspot-path')?'path-right':n.classList.contains('hotspot-action')?'action':'object'};
  }));
  for(const m of materials){
    assert.ok(m.source.includes('assets/ui/hotspots/v2/hotspot-'+m.type+'.png'),'missing original material asset');
    assert.equal(m.mirror,m.left?'matrix(-1, 0, 0, 1, 0, 0)':'none','wrong arrow direction');
    assert.ok(!m.textTransform.startsWith('matrix(-1'),'mirrored writing');
  }
  const items=await page.locator('.scene-hotspot:not(:disabled):not([hidden])>.hotspot-label').evaluateAll(nodes=>nodes.map(n=>({
    text:n.textContent,box:n.getBoundingClientRect().toJSON(),opacity:getComputedStyle(n).opacity,
    path:n.parentElement.classList.contains('door-hotspot')
  })));
  for(let i=0;i<items.length;i++){
    const {box:a,text,opacity,path}=items[i];
    assert.equal(opacity,'1',text+' hidden until hover');
    assert.ok(a.width>=44&&a.height>=44,text+' small touch target');
    assert.ok(a.x>=room.x-1&&a.right<=room.x+room.width+1,text+' clipped horizontally');
    // The phone exit uses the existing letterbox above the doorway.
    if(!(path&&width<=560))assert.ok(a.y>=room.y-1&&a.bottom<=room.y+room.height+1,text+' outside image');
    for(const {box:b,text:other} of items.slice(i+1))assert.ok(a.right<=b.x||b.right<=a.x||a.bottom<=b.y||b.bottom<=a.y,`${id}: ${text} overlaps ${other}`);
  }
}
(async()=>{
  server.listen(4180,'127.0.0.1');
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try{
    const page=await browser.newPage({hasTouch:true});await page.goto(base);
    const images=await page.evaluate(async()=>Promise.all(['object','action','path-right'].map(type=>new Promise(resolve=>{
      const image=new Image();image.onload=()=>resolve(image.naturalWidth>0);image.onerror=()=>resolve(false);
      image.src='assets/ui/hotspots/v2/hotspot-'+type+'.png';
    }))));
    assert.ok(images.every(Boolean),'material PNG failed to load');
    for(const width of [1024,820,390]){
      await page.setViewportSize({width,height:width===1024?768:width===820?640:844});
      for(const id of ['ch1_s5_conversations','completed_conversations','ch1_end','ch2_hub','ch2_forest']){
        await fixture(page,id);await labels(page,width,id);
        await page.screenshot({path:`artifacts/world-hotspots-${id}-${width}.png`});
        if(id==='ch1_s5_conversations'){
          assert.ok(await page.locator('[data-action="prop-door"]').isHidden());
          const flyer=page.locator('[data-action="flyer"]');await page.keyboard.press('Tab');await flyer.focus();
          assert.match(await flyer.locator('.hotspot-label').evaluate(n=>getComputedStyle(n).textDecorationLine),/underline/);
          await flyer.locator('.hotspot-label').tap();
          assert.equal(await page.locator('#overlay[open] .source-image').count(),1,'visible label does not open source');
        }
      }
    }
    console.log('PASS: shared world markers visible at rest; 44px targets; no overlapping labels or horizontal overflow; keyboard focus and touch reading; hidden early exit at 1024, 820 and 390px');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;server.close();});
