const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const server=require('./serve.cjs');
const base='http://127.0.0.1:4179/';
async function finishDialogue(p){while(await p.locator('[data-action="dialogue-next"]').count()) await p.locator('[data-action="dialogue-next"]').click();}
async function targets(p){
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const boxes=await p.locator('.ch2-clue,.forest-conversation').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().toJSON()));
  const room=await p.locator('.room').boundingBox();
  const figures=await p.locator('.ch2-person').evaluateAll(nodes=>nodes.map(n=>({box:n.getBoundingClientRect().toJSON(),shadow:n.previousElementSibling.getBoundingClientRect().toJSON(),ratio:n.naturalWidth/n.naturalHeight})));
  for(const {box,shadow,ratio} of figures){
    assert.ok(Math.abs(box.width/box.height-ratio)<.02,'distorted figure');
    assert.ok(box.x>=room.x-1&&box.right<=room.x+room.width+1&&box.y>=room.y-1&&box.bottom<=room.y+room.height+1,'figure outside scene');
    assert.ok(Math.abs(box.bottom-(shadow.y+shadow.height/2))<room.height*.025,'shadow detached from feet');
  }
  for(const b of boxes){assert.ok(b.width>=44&&b.height>=44,'touch target');assert.ok(b.x>=room.x-1&&b.right<=room.x+room.width+1,'sign outside room');}
  for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];assert.ok(a.right<=b.x||b.right<=a.x||a.bottom<=b.y||b.bottom<=a.y,'overlapping hotspots');}
  const villageDetails=await p.locator('.scene-hub .village-prop,.scene-hub .village-overseer').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().toJSON()));
  for(const a of boxes)for(const b of villageDetails)assert.ok(a.right<=b.x||b.right<=a.x||a.bottom<=b.y||b.bottom<=a.y,'village marker covers a figure or progress prop');
  if(await p.locator('.forest-conversation').count()){
    const label=await p.locator('.forest-conversation span').boundingBox();
    const actor=await p.locator('.scene-forest .ch2-person.overseer').boundingBox();
    assert.ok(label.y>=actor.y+actor.height,'conversation label covers figure');
    assert.ok(label.y+label.height<=room.y+room.height+1,'conversation label outside room');
    for(const b of await p.locator('.ch2-clue').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().toJSON())))assert.ok(label.x+label.width<=b.x||b.right<=label.x||label.y+label.height<=b.y||b.bottom<=label.y,'conversation label overlaps another target');
  }
}
(async()=>{
  server.listen(4179,'127.0.0.1');
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    for(const viewport of [{width:1024,height:768},{width:820,height:640},{width:390,height:844}]){
      const context=await browser.newContext({viewport,hasTouch:true});const p=await context.newPage();
      await p.goto(base+'?start=ch2_hub');await targets(p);
      await p.screenshot({path:`artifacts/staging-village-${viewport.width}.png`});
      await p.locator('[data-scene="ch2_forest"]').tap();await targets(p);
      assert.equal(await p.locator('.scene-forest .ch2-person.overseer').count(),0);
      for(const clue of ['oldUse','newClaim']){await p.locator(`[data-clue="${clue}"]`).tap();await finishDialogue(p);}
      await targets(p);
      assert.equal(await p.locator('.scene-forest .ch2-person.overseer.arriving').count(),1);
      for(const actor of ['anna','overseer'])assert.equal(await p.locator('.scene-forest .ch2-person.'+actor).evaluate(n=>getComputedStyle(n).transform),'matrix(-1, 0, 0, 1, 0, 0)');
      await p.waitForTimeout(1000);await p.screenshot({path:`artifacts/staging-conflict-${viewport.width}.png`});
      await p.locator('[data-clue="customaryRules"]').tap();await finishDialogue(p);
      assert.equal(await p.locator('.scene-forest .ch2-person.overseer.arriving').count(),0,'entrance replayed while investigating');
      await p.locator('.forest-conversation').tap();
      assert.equal(await p.locator('.dialogue-panel').count(),1);
      await p.screenshot({path:`artifacts/staging-dialogue-${viewport.width}.png`});
      await p.goto(base);await p.locator('[data-action="resume"]').click();
      assert.equal(await p.locator('.scene-forest .ch2-person.overseer').count(),1,'administrator missing after dialogue reload');
      await p.evaluate(async()=>{
        const {freshState}=await import('./js/state.js');const s=freshState();
        s.chapter=2;s.scene='ch2_hub';s.chapter2.stage='hub';s.chapter2.assemblyUnlocked=true;
        localStorage.setItem('1525.freedom.save.v1',JSON.stringify(s));
      });
      await p.goto(base);await p.locator('[data-action="resume"]').click();await targets(p);
      await context.close();
    }
    // Audit every registered chapter-2 dramatic checkpoint, including task,
    // dialogue and ending states, using the existing prerequisite fixtures.
    const p=await browser.newPage();await p.goto(base);
    const ids=await p.evaluate(async()=>{const {adminChapterTargets}=await import('./data/admin-targets.js');return [...adminChapterTargets[2].map(t=>t.id),...['hub','forest','corvee','dues'].map(kind=>'completed_'+kind)];});
    const inventory=[];
    for(const width of [1440,1024,820]){
      await p.setViewportSize({width,height:width===1440?900:width===1024?768:640});
      for(const id of ids){
        await p.evaluate(async(id)=>{
          const {prepareAdminStateForScene}=await import('./js/admin-state.js');
          const s=prepareAdminStateForScene(id.startsWith('completed_')?'ch2_assembly':id);
          if(id.startsWith('completed_')){const kind=id.slice(10);s.scene='ch2_'+kind;s.chapter2.stage=kind==='hub'?'hub':'complete';s.dialogue=null;s.interaction=null;}
          localStorage.setItem('1525.freedom.save.v1',JSON.stringify(s));
        },id);
        await p.goto(base);await p.locator('[data-action="resume"]').click();
        await p.waitForFunction(()=>[...document.images].every(i=>i.complete));
        await p.waitForFunction(()=>[...document.querySelectorAll('.arriving')].every(n=>Number(getComputedStyle(n).opacity)>.99));await targets(p);
        inventory.push({id,width,worldTargets:await p.locator('.room button').allTextContents(),panelControls:await p.locator('#interaction button').allTextContents()});
        await p.screenshot({path:`artifacts/hotspot-audit-${id}-${width}.png`});
      }
      await p.evaluate(async()=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');localStorage.setItem('1525.freedom.save.v1',JSON.stringify(prepareAdminStateForScene('ch2_forest_argument')));});
      await p.goto(base);await p.locator('[data-action="resume"]').click();
      await p.locator('[data-choice="forestArgument"][data-option="B"]').click();await targets(p);
      await p.screenshot({path:`artifacts/quality-forest-feedback-${width}.png`});
      await p.evaluate(async()=>{
        const {prepareAdminStateForScene}=await import('./js/admin-state.js');const s=prepareAdminStateForScene('ch2_luther');
        s.dialogue=null;s.interaction=null;s.chapter2.stage='source';localStorage.setItem('1525.freedom.save.v1',JSON.stringify(s));
      });
      await p.goto(base);await p.locator('[data-action="resume"]').click();await p.locator('[data-action="ch2-source"]').click();
      for(const page of [1,2]){
        await p.waitForFunction(()=>[...document.images].every(i=>i.complete));
        assert.match(await p.locator('.source-image img').getAttribute('src'),new RegExp('seite_'+page));
        assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
        await p.screenshot({path:`artifacts/quality-luther-page-${page}-${width}.png`});
        if(page===1)await p.locator('[data-source-action="next"]').click();
      }
    }
    require('node:fs').writeFileSync('artifacts/chapter-two-hotspot-inventory.json',JSON.stringify(inventory,null,2));
    await p.close();
    console.log('Spatial targets, touch, facing, entrance and dialogue passed at 1024, 820 and 390px');
    console.log('Every chapter-2 checkpoint audited at 1440x900, 1024x768 and 820x640; figure proportions, bounds and ground contact passed');
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
