// Integration checks for the supplied chapter-1 specification.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const server = require('./serve.cjs');
const artifacts = path.resolve(__dirname,'..','artifacts');
const KEY = '1525.freedom.save.v1';
const errors = [];
const action = (page,name) => page.locator(`[data-action="${name}"]`).first().click();
const saved = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)),KEY);
async function dialogue(page) {
  await page.locator('[data-action="dialogue-next"]').waitFor({state:'visible'});
  for (let i=0; i<30 && await page.locator('[data-action="dialogue-next"]').count(); i++) await action(page,'dialogue-next');
}
async function geometry(page,label) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false,label+' horizontal overflow');
  const rectangles = await page.locator('.stage,.character').evaluateAll(nodes => nodes.map(node => { const r=node.getBoundingClientRect(); return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}; }));
  if (rectangles.length) for (const r of rectangles.slice(1)) { const s=rectangles[0]; assert.ok(r.x>=s.x && r.right<=s.right && r.y>=s.y && r.bottom<=s.bottom,label+' clipped figure'); }
  const stage=await page.locator('.stage').boundingBox();
  if (stage) assert.ok((await page.locator('#interaction').boundingBox()).y>=stage.y+stage.height,label+' panel overlaps scene');
  if (await page.locator('.task-panel').count()) assert.ok((await page.locator('.task-panel').boundingBox()).height <= (await page.evaluate(() => innerHeight))* (await page.locator('.axis-panel,.puzzle-panel').count() ? .59 : await page.evaluate(() => innerWidth) <=560 ? .51 : .46),label+' oversized task panel');
  if (await page.locator('.axis-panel').count()) {
    const rail = await page.locator('.axis-rail').boundingBox(), cards = await page.locator('.axis-panel .task-scroll').boundingBox();
    assert.ok(cards.y >= rail.y + rail.height,label+' rail overlays cards');
  }
  assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || i.naturalWidth===0).length),0,label+' image missing');
}
async function photograph(page,name) { await page.screenshot({path:path.join(artifacts,name+'.png')}); }
async function choose(page,id) { await page.locator(`[data-action="choose"][data-option="${id}"]`).click(); }
async function feedback(page) { await page.locator('[data-action="feedback-next"]').waitFor(); await action(page,'feedback-next'); }
async function puzzleSequence(page,sequence) { await action(page,'puzzle-reset'); for(const id of sequence) await page.locator(`.puzzle-parts [data-part="${id}"]`).tap(); }
async function axisSet(page,id,value) {
  const card=page.locator(`[data-card="${id}"]`);
  if (await card.getAttribute('aria-pressed') !== 'true') await card.tap();
  await page.locator('#axis-range').evaluate((input,value) => { input.value=value; input.dispatchEvent(new Event('input',{bubbles:true})); input.dispatchEvent(new Event('change',{bubbles:true})); },value);
}
async function drag(page,id,value,touch,context) {
  const card=page.locator(`[data-card="${id}"]`);
  await card.evaluate(el => el.scrollIntoView({block:'center'}));
  const source=await card.boundingBox(), rail=await page.locator('.axis-rail').boundingBox();
  const x1=source.x+source.width/2,y1=source.y+source.height/2,x2=rail.x+rail.width*value/100,y2=rail.y+rail.height/2;
  if (touch) {
    const client=await context.newCDPSession(page);
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y:y1}]});
    for(let i=1;i<=8;i++) await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/8,y:y1+(y2-y1)*i/8}]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await client.detach();
  } else {
    await page.mouse.move(x1,y1); await page.mouse.down(); await page.mouse.move(x2,y2,{steps:8}); await page.mouse.up();
  }
  assert.ok(Math.abs((await saved(page)).minigames.axis[id]-value)<=1,`drag ${id} ${touch?'touch':'mouse'}`);
  await page.waitForTimeout(120);
}
(async () => {
  fs.mkdirSync(artifacts,{recursive:true});
  await new Promise(resolve => server.listen(4174,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'msedge',headless:true});
  let page;
  try {
    const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true});
    page=await context.newPage();
    page.on('pageerror',error => errors.push(error.message));
    page.on('console',message => { if(message.type()==='error') errors.push(message.text()); });
    page.on('response',response => { if(response.status()>=400) errors.push(response.status()+' '+response.url()); });
    const url=process.env.CHECK_URL || 'http://127.0.0.1:4174/';
    const scene=async id => { await page.evaluate(() => localStorage.clear()); await page.goto(url+'?start='+id); };
    await page.goto(url); await photograph(page,'ch1-start-1024');
    assert.equal(await page.locator('[data-action="resume"]').count(),0);
    await action(page,'new');
    assert.match(await page.locator('.spoken').innerText(),/Seit einigen Jahren verbreiten sich/);
    await dialogue(page); await geometry(page,'intro');
    assert.ok(await page.locator('[data-action="flyer"]').isDisabled());
    await page.locator('[data-character="jakob"]').tap();
    assert.match(await page.locator('.spoken').innerText(),/Ich habe wieder etwas von Luther bekommen/);
    assert.match(await page.locator('.speaking img').getAttribute('src'),/jakob_reading.png/);
    await action(page,'dialogue-next');
    assert.equal(await page.locator('.speaking').getAttribute('data-character'),'peter');
    assert.match(await page.locator('.speaking img').getAttribute('src'),/peter_skeptical.png/);
    await page.waitForTimeout(260);
    assert.equal(await page.locator('[data-character="anna"]').evaluate(el => Number(getComputedStyle(el).opacity)),.75);
    await photograph(page,'ch1-speaker-1024');
    await page.reload(); await action(page,'resume');
    assert.match(await page.locator('.spoken').innerText(),/Schon wieder Luther/);
    await dialogue(page); assert.ok(await page.locator('[data-action="flyer"]').isEnabled());
    await photograph(page,'ch1-tavern-1024');
    await page.locator('[data-action="flyer"]').tap();
    assert.match(await page.locator('blockquote').innerText(),/Ein Christenmensch ist ein freier Herr/);
    assert.equal(await page.locator('body').getAttribute('data-mode'),'document');
    await photograph(page,'ch1-document-1024');
    await page.locator('dialog [data-action="close-overlay"]').last().click(); await dialogue(page);
    await choose(page,'freedom_responsibility');
    assert.equal((await saved(page)).choices.initialFreedomInterpretation,'freedom_responsibility');
    assert.ok(Object.values((await saved(page)).dimensions).every(value => value===0));
    await dialogue(page);
    assert.match(await page.locator('blockquote').innerText(),/dienstbarer Knecht/);
    await page.keyboard.press('Escape'); await dialogue(page);
    assert.equal(await page.locator('[data-action="next-scene"]').count(),0);

    await page.locator('[data-character="peter"]').tap(); await dialogue(page);
    await choose(page,'peter_god_first');
    assert.match(await page.locator('.spoken').innerText(),/Vor Gott frei. Aber vor dem Herrn/);
    await dialogue(page); assert.equal((await saved(page)).progress.peterConversation,true);
    await page.locator('[data-character="anna"]').tap(); await dialogue(page);
    await puzzleSequence(page,['B','F','A','C']); await action(page,'puzzle-check');
    assert.match(await page.locator('.feedback-text').innerText(),/Denkimpuls/);
    await feedback(page); await action(page,'puzzle-check');
    assert.match(await page.locator('.feedback-text').innerText(),/Ursache und was Folge/);
    await feedback(page); await puzzleSequence(page,['A','D','C','E']);
    await page.locator('[data-action="puzzle-move"][data-index="2"][data-direction="-1"]').click();
    assert.deepEqual((await saved(page)).minigames.puzzle,['A','C','D','E']);
    await photograph(page,'ch1-puzzle-1024');
    await action(page,'puzzle-check'); assert.match(await page.locator('.feedback-text').innerText(),/Folge der geschenkten Gnade/);
    await feedback(page); assert.match(await page.locator('.spoken').innerText(),/Dann macht die Freiheit also nicht gleichgültig/);
    await dialogue(page); assert.equal((await saved(page)).progress.annaConversation,true);

    await page.locator('[data-character="jakob"]').tap(); await dialogue(page);
    await photograph(page,'ch1-jakob-1024'); await geometry(page,'Jakob choice');
    await choose(page,'B'); assert.match(await page.locator('.feedback-text').innerText(),/Prüfe noch einen Schritt weiter/);
    await feedback(page); await choose(page,'A');
    assert.match(await page.locator('.feedback-text').innerText(),/vollständige Trennung/);
    await feedback(page); await choose(page,'D');
    assert.match(await page.locator('.feedback-text').innerText(),/Spannung besonders genau/);
    await page.reload(); await action(page,'resume'); await feedback(page);
    assert.equal((await saved(page)).progress.jakobConversation,true);

    await action(page,'next-scene'); await dialogue(page);
    await drag(page,'grace',20,true,context); await drag(page,'faith',30,false,context);
    const positions={conscience:15,service:35,obedience:40,help:75,order:60,rule:65,labor:40,dues:100};
    for(const [id,value] of Object.entries(positions)) await axisSet(page,id,value);
    await action(page,'axis-check'); assert.match(await page.locator('.feedback-text').innerText(),/Denkimpuls/);
    await feedback(page); await axisSet(page,'labor',75);
    await photograph(page,'ch1-axis-1024');
    await page.reload(); await action(page,'resume');
    assert.equal((await saved(page)).minigames.axis.dues,100);
    await action(page,'axis-check'); assert.match(await page.locator('.feedback-text').innerText(),/Andere verbinden beide Bereiche/);
    assert.equal((await saved(page)).progress.freedomAxisComplete,true); await feedback(page);

    await choose(page,'A'); assert.match(await page.locator('.feedback-text').innerText(),/Wem gilt/); await feedback(page);
    await choose(page,'C'); await feedback(page);
    await choose(page,'B'); await feedback(page);
    await choose(page,'A'); await feedback(page);
    await choose(page,'A'); await feedback(page);
    await page.locator('[data-action="notebook"]:not([disabled])').first().waitFor();
    await action(page,'notebook');
    assert.match(await page.locator('.notebook').innerText(),/Frei vor Gott – frei zum Dienst/);
    await photograph(page,'ch1-notebook-1024');
    await page.locator('[data-tab="path"]').click();
    assert.match(await page.locator('.notebook').innerText(),/Vielleicht kann man frei sein und trotzdem Verantwortung/);
    await page.locator('[data-tab="documents"]').click(); await action(page,'archive-document');
    assert.equal(await page.locator('blockquote').count(),2);
    await page.locator('dialog [data-action="close-overlay"]').last().click();
    await page.locator('.notebook').waitFor(); await page.keyboard.press('Escape');
    await action(page,'next-scene');
    const concluding=[];
    while(await page.locator('[data-action="dialogue-next"]').count()) { concluding.push(await page.locator('.spoken').innerText()); await action(page,'dialogue-next'); }
    assert.equal(concluding.length,6); assert.ok(concluding.some(text => text.includes('im Wald dürfen wir')));
    assert.equal(await page.locator('body').getAttribute('data-mode'),'transition');
    await photograph(page,'ch1-ending-1024');
    await action(page,'home'); await action(page,'resume'); assert.equal(await page.locator('.ending').count(),1);

    // Every initial response and all of Peter's reactions remain ungraded and score-neutral.
    const firsts=['freedom_no_obedience','freedom_different_kind','freedom_life_tension','freedom_responsibility'];
    for(const id of firsts) {
      await scene('ch1_s3_interpretation'); await dialogue(page); await choose(page,id); await dialogue(page);
      assert.equal((await saved(page)).choices.initialFreedomInterpretation,id);
      assert.ok(Object.values((await saved(page)).dimensions).every(value => value===0));
      assert.equal(await page.locator('dialog[open]').count(),1); await page.keyboard.press('Escape'); await dialogue(page);
    }
    for(const id of ['peter_god_first','peter_social_consequence','peter_uncertain']) {
      await scene('ch1_s5_conversations'); await page.locator('[data-character="peter"]').click(); await dialogue(page); await choose(page,id);
      assert.equal((await saved(page)).choices.freedomSocialFirstThought,id); await dialogue(page);
      assert.equal((await saved(page)).progress.peterConversation,true);
    }
    for(const id of ['A','B','C','D']) {
      await scene('ch1_s5_conversations'); await page.locator('[data-character="jakob"]').click(); await dialogue(page);
      for(let n=0;n<(id==='D'?1:3);n++) { await choose(page,id); if(n===0 && id==='B') assert.match(await page.locator('.feedback-text').innerText(),/wichtigen Zusammenhang/); await feedback(page); }
      assert.equal((await saved(page)).choices.freedomAndOuterLife,id);
      assert.equal((await saved(page)).progress.jakobConversation,true);
      assert.equal(Boolean((await saved(page)).minigames.assisted.freedomAndOuterLife),id!=='D');
    }
    // Anna's assisted path secures the content and allows continuation after three attempts.
    await scene('ch1_s5_conversations'); await page.locator('[data-character="anna"]').click(); await dialogue(page);
    for(let n=0;n<3;n++) {
      if(n===0) await puzzleSequence(page,['B','F','A','C']);
      await action(page,'puzzle-check');
      if(n===2) { assert.match(await page.locator('.securing').innerText(),/Gnade → Freiheit vom Rechtfertigungsdruck/); assert.deepEqual((await saved(page)).minigames.puzzle,['A','C','D','E']); }
      await feedback(page);
    }
    await dialogue(page); assert.equal((await saved(page)).progress.annaConversation,true);
    for(const [sceneId,solution,ids] of [
      ['ch1_s6b_service','C',['A','B','C','D']], ['ch1_s6b_obedience','B',['A','B','C','D']],
      ['ch1_s6c_inner','A',['A','B','C']], ['ch1_s6c_political','A',['A','B','C']]
    ]) for(const id of ids) {
      await scene(sceneId);
      for(let n=0;n<(id===solution?1:3);n++) { await choose(page,id); await feedback(page); }
      assert.notEqual((await saved(page)).scene,sceneId);
    }
    // Three problematic axis submissions reveal ranges without trapping the learner.
    await scene('ch1_s6_freedom_axis'); await dialogue(page);
    for(const id of ['grace','faith','conscience','service','obedience','help','order','rule','labor','dues']) await axisSet(page,id,0);
    for(let n=0;n<3;n++) { await action(page,'axis-check'); await feedback(page); }
    assert.equal((await saved(page)).progress.freedomAxisComplete,true);
    assert.equal((await saved(page)).minigames.assisted.freedomAxis,true);

    // Representative UI modes at desktop, iPad and smaller dimensions.
    for(const viewport of [{width:1440,height:900},{width:1024,height:768},{width:820,height:620},{width:768,height:1024},{width:390,height:844}]) {
      await page.setViewportSize(viewport);
      await scene('ch1_s1_intro'); await dialogue(page); await geometry(page,viewport.width+' exploration');
      await page.locator('[data-character="jakob"]').click(); await geometry(page,viewport.width+' dialogue');
      await scene('ch1_s3_interpretation'); await dialogue(page); await geometry(page,viewport.width+' first choice');
      await scene('ch1_s5_conversations'); await page.locator('[data-character="anna"]').click(); await dialogue(page); await geometry(page,viewport.width+' puzzle');
      await photograph(page,'ch1-puzzle-'+viewport.width);
      await scene('ch1_s6_freedom_axis'); await dialogue(page); await geometry(page,viewport.width+' axis');
      await scene('ch1_s6b_service'); await geometry(page,viewport.width+' boundary');
      await scene('ch1_s7_notebook'); await geometry(page,viewport.width+' notebook prompt'); await photograph(page,'ch1-layout-'+viewport.width);
    }
    await page.setViewportSize({width:1024,height:768});
    await scene('ch1_s6_freedom_axis'); await dialogue(page);
    await page.locator('[data-card="grace"]').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id),'axis-range');
    await page.locator('#axis-range').press('Home'); await page.locator('#axis-range').press('ArrowRight');
    assert.equal((await saved(page)).minigames.axis.grace,1);
    await page.goto(url+'?debug=true&start=ch1_s5_conversations');
    await page.locator('.debug summary').click(); await action(page,'debug-documents');
    await page.locator('#debug-scene').selectOption('ch1_s6b_service'); assert.equal(await page.locator('.choices').count(),1);
    await action(page,'debug-next'); assert.match(await page.locator('.stage-caption').innerText(),/Gehorsam/);
    await action(page,'debug-prev'); await action(page,'debug-clear');
    assert.equal(await page.evaluate(key=>localStorage.getItem(key),KEY),null);
    await page.goto(url+'?start=ch1_s1_tavern_intro'); await dialogue(page);
    assert.equal((await saved(page)).scene,'ch1_s1_intro');
    await action(page,'menu'); await action(page,'close-overlay'); await action(page,'menu'); await action(page,'menu-home');
    await action(page,'confirm-new'); await action(page,'close-overlay'); await action(page,'confirm-reset'); await action(page,'reset');
    assert.equal(await page.locator('[data-action="resume"]').count(),0);

    // Legacy saves preserve the actual wording of earlier decisions; new tasks must still be completed.
    await page.evaluate(key => localStorage.setItem(key,JSON.stringify({version:1,scene:'ch1_end',choices:{initialFreedomInterpretation:'D'},notebook:{documents:['freedom'],passages:{freedom:[0,1]}},progress:{flyerUnlocked:true}})),KEY);
    await page.goto(url); await action(page,'resume');
    assert.equal((await saved(page)).version,2); assert.equal((await saved(page)).scene,'ch1_s5_conversations');
    assert.equal((await saved(page)).progress.annaConversation,false);
    assert.equal((await saved(page)).choiceTexts.initialFreedomInterpretation,'Vielleicht bedeutet Freiheit nicht, keine Verantwortung mehr zu haben.');
    await page.evaluate(key=>localStorage.setItem(key,'{broken'),KEY); await page.goto(url);
    assert.equal(await page.locator('[data-action="resume"]').count(),0);
    assert.deepEqual(errors,[]);
    console.log('PASS: full chapter; every interpretation, reaction and assessed option; staged hints and assisted solutions; 4-card reorder; continuous ranges with mouse/touch drag; boundaries; consolidation; speaker assets; notebook; source HTML; save/reload and migration; debug; keyboard; five responsive viewports; no missing assets or console errors.');
  } catch(error) {
    if(page) { await photograph(page,'ch1-failure'); console.error(await page.locator('body').innerText()); }
    throw error;
  } finally { await browser.close(); server.close(); }
})().catch(error => {console.error(error); server.close(); process.exitCode=1;});
