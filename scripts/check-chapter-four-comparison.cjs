const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
const base='http://127.0.0.1:4195/',KEY='1525.freedom.save.v1';
(async()=>{
 await new Promise(r=>server.listen(4195,'127.0.0.1',r));
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
  fs.mkdirSync('artifacts/ch4-comparison',{recursive:true});
  for(const [width,height] of [[1024,768],[820,640],[1440,900]]){
   await page.setViewportSize({width,height});await page.goto(base);
   await page.evaluate(async key=>{const {prepareAdminStateForScene}=await import('/js/admin-state.js');localStorage.setItem(key,JSON.stringify(prepareAdminStateForScene('ch4_comparison')));},KEY);
   await page.reload();await page.locator('[data-action="resume"]').click();
   await page.locator('[data-action="ch4-read"]').click();
   async function inspect(mode){
    await page.waitForFunction(()=>[...document.querySelectorAll('.ch4-reader img')].every(n=>n.complete&&n.naturalWidth));
    assert.equal(await page.locator('.ch4-source-kind').count(),2);
    assert.equal(await page.locator('.ch4-comparison-key').count(),2);
    for(const leaf of await page.locator('.ch4-comparison-leaf').all())assert.equal(await leaf.locator(':scope > p:not(.ch4-source-date):not(.ch4-source-kind):not(.ch4-comparison-key)').count(),4);
    const geometry=await page.evaluate(()=>{
     const reader=document.querySelector('.ch4-reader-scroll'),r=reader.getBoundingClientRect();
     return {horizontal:document.documentElement.scrollWidth>innerWidth,outerScroll:reader.scrollHeight-reader.clientHeight,
      leaves:[...document.querySelectorAll('.ch4-comparison-leaf')].map(n=>{const b=n.getBoundingClientRect(),last=n.lastElementChild.getBoundingClientRect();return {scroll:n.scrollHeight-n.clientHeight,font:parseFloat(getComputedStyle(n).fontSize),bottom:last.bottom,limit:b.bottom,visible:last.bottom<=r.bottom};}),
      controls:[...document.querySelectorAll('.ch4-reader button')].map(n=>n.getBoundingClientRect().toJSON())};
    });
    assert.equal(geometry.horizontal,false);
    for(const c of geometry.controls)assert.ok(c.height>=44&&c.left>=0&&c.right<=width&&c.bottom<=height);
    for(const leaf of geometry.leaves)assert.ok(leaf.font>=18);
    if(width===1024||width===1440){assert.ok(geometry.outerScroll<=1,mode+' outer scroll '+JSON.stringify(geometry));for(const leaf of geometry.leaves)assert.ok(leaf.scroll<=1&&leaf.bottom<=leaf.limit+1&&leaf.visible,mode+' complete leaf '+JSON.stringify(geometry));}
    await page.screenshot({path:`artifacts/ch4-comparison/${mode}-${width}.png`});
   }
   await inspect('story');await page.locator('.ch4-reader [data-action="close-overlay"]').first().click();
   assert.ok((await page.locator('.task-scroll').textContent()).includes('Was hat sich zwischen den beiden Texten verändert?'));
   await page.locator('[data-action="notebook"]').click();await page.locator('[data-tab="documents"]').click();
   await page.locator('[data-action="archive-document"][data-document="c4_harsh"]').click();
   while(await page.locator('.ch4-source-canvas').getAttribute('data-page')!=='luther_comparison_frame')await page.locator('[data-ch4-source="next"]').click();
   await inspect('archive');await page.locator('.ch4-reader [data-action="close-overlay"]').first().click();
   // Return from the archive and answer the actual assessed question.
   await page.locator('#overlay[open] .notebook').waitFor();
   await page.locator('#overlay[open] .notebook [data-action="close-overlay"]').first().click();
   await page.locator('#overlay[open]').waitFor({state:'detached'});
   await page.locator('[data-action="ch4-choice"]').click();
   assert.ok((await page.locator('#interaction').textContent()).includes('Was hat sich zwischen den beiden Texten verändert?'));
   const before=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
   await page.locator('[data-choice="ch4Comparison"][data-option="B"]').click();
   const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
   assert.equal(after.choices.ch4Comparison,'B');assert.deepEqual(after.orientation,before.orientation);assert.deepEqual(after.perceptions,before.perceptions);
   assert.ok(after.chapter4.feedback.text.startsWith('Genau. Luther verändert nicht einfach seine gesamte Theologie.'));
   await page.locator('[data-action="ch4-feedback"]').click();
   assert.equal(await page.evaluate(k=>JSON.parse(localStorage.getItem(k)).chapter4.stage,KEY),'structure');
   console.log(`PASS complete comparison in story/archive, modern text, answer B and subsequent reasoning at ${width}×${height}`);
  }
  assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
