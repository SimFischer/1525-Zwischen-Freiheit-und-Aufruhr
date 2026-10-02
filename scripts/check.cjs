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
  await page.waitForFunction(() => [...document.images].every(image => image.complete));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false,label+' horizontal overflow');
  const rectangles = await page.locator('.stage,.character').evaluateAll(nodes => nodes.map(node => { const r=node.getBoundingClientRect(); return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}; }));
  if (rectangles.length) for (const r of rectangles.slice(1)) { const s=rectangles[0]; assert.ok(r.x>=s.x && r.right<=s.right && r.y>=s.y && r.bottom<=s.bottom,label+' clipped figure'); }
  const stage=await page.locator('.stage').boundingBox();
  if (stage) {
    assert.equal(await page.locator('.room .character-art,.room .table-art,.room .prop img').count(),0,label+' separate asset in room');
    assert.equal(await page.locator('.room-image').count(),1,label+' missing integrated scene');
    const room=await page.locator('.room').boundingBox();
    assert.ok(Math.abs(room.width / room.height - 1672 / 941) < .02,label+' room perspective distorted');
    const figures=await page.locator('.character').evaluateAll(nodes => nodes.map(node => {const r=node.getBoundingClientRect();return {left:r.left,right:r.right};}));
    for (let i=1;i<figures.length;i++) assert.ok(figures[i].left >= figures[i-1].right,label+' overlapping figures');
  }
  if (await page.locator('.dialogue-panel').count()) assert.ok((await page.locator('.dialogue-panel').boundingBox()).height <= (await page.evaluate(() => innerHeight))*.41,label+' oversized dialogue');
  if (await page.evaluate(() => innerWidth===1024 && innerHeight===768) && await page.locator('.choices').count()) {
    for (const card of await page.locator('.choices > button').all()) {
      const rect=await card.boundingBox(), bank=await page.locator('.choices').evaluate(el=>{const r=el.parentElement.getBoundingClientRect();return {top:r.top,bottom:r.bottom};});
      assert.ok(rect.y>=bank.top && rect.y+rect.height<=bank.bottom+.5,label+' clipped answer card');
    }
  }
  if (stage && await page.locator('.dialogue-panel').count()) {
    const room=await page.locator('.room').boundingBox(), panel=await page.locator('.dialogue-panel').boundingBox();
    assert.ok(panel.y>=room.y+room.height*.5,label+' dialogue covers faces');
    assert.ok(panel.y+panel.height<=await page.evaluate(()=>innerHeight),label+' clipped dialogue buttons');
  }
  if (stage && await page.evaluate(() => innerWidth===1024 && innerHeight===768)) {
    const room=await page.locator('.room').boundingBox();
    assert.ok(room.width>=1000 && room.height>=570,label+' undersized world');
  }
  if (await page.locator('.task-panel').count()) {
    const panel=await page.locator('.task-panel').boundingBox();
    assert.ok(panel.height<=await page.evaluate(()=>innerHeight-103),label+' oversized task panel');
    assert.ok(panel.y>=56 && panel.y+panel.height<=await page.evaluate(()=>innerHeight),label+' clipped task overlay');
  }
  if (await page.locator('.sorting-panel').count()) { assert.equal(await page.locator('input[type=range],.axis-rail').count(),0); assert.doesNotMatch(await page.locator('.sorting-panel').innerText(),/%/); }
  assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || i.naturalWidth===0).length),0,label+' image missing');
}
async function photograph(page,name) { await page.screenshot({path:path.join(artifacts,name+'.png')}); }
async function overlayGeometry(page,label) {
  const rect=await page.locator('dialog[open]').boundingBox(), viewport=await page.evaluate(()=>({width:innerWidth,height:innerHeight}));
  assert.ok(rect.x>=0 && rect.y>=0 && rect.x+rect.width<=viewport.width && rect.y+rect.height<=viewport.height,label+' clipped overlay');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label+' horizontal overlay overflow');
  const close=await page.locator('dialog [data-action="close-overlay"]').first().boundingBox();
  assert.ok(close.y>=rect.y && close.y+close.height<=viewport.height,label+' inaccessible close button');
}
async function choose(page,id) { await page.locator(`[data-action="choose"][data-option="${id}"]`).click(); }
async function feedback(page) { await page.locator('[data-action="feedback-next"]').waitFor(); await action(page,'feedback-next'); }
async function puzzleSequence(page,sequence) { await action(page,'puzzle-reset'); for(const id of sequence) await page.locator(`.puzzle-parts [data-part="${id}"]`).tap(); }
async function sortingSet(page,id,zone) {
  const card=page.locator(`[data-card="${id}"]`);
  if (await card.getAttribute('aria-pressed')!=='true') await card.tap();
  await page.locator(`[data-action="sort-target"][data-zone="${zone}"]`).tap();
  assert.equal((await saved(page)).minigames.sorting[id],zone);
}
async function drag(page,id,zone,touch,context) {
  const card=page.locator(`[data-card="${id}"]`);
  await card.evaluate(el=>el.scrollIntoView({block:'center'}));
  const source=await card.boundingBox(), target=await page.locator(`[data-action="sort-target"][data-zone="${zone}"]`).boundingBox();
  const x1=source.x+source.width/2,y1=source.y+source.height/2,x2=target.x+target.width/2,y2=target.y+target.height/2;
  if(touch) {
    const client=await context.newCDPSession(page);
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y:y1}]});
    for(let i=1;i<=8;i++) await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/8,y:y1+(y2-y1)*i/8}]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]}); await client.detach();
  } else { await page.mouse.move(x1,y1); await page.mouse.down(); await page.mouse.move(x2,y2,{steps:8}); await page.mouse.up(); }
  assert.equal((await saved(page)).minigames.sorting[id],zone,`drag ${id} ${touch?'touch':'mouse'}`);
  assert.equal(await page.locator('.drag-ghost').count(),0);
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
    assert.doesNotMatch(await page.locator('.start-screen').innerText(),/Q1|Evangelische Religion|historisch-theologisches|Lesen\. Fragen/);
    assert.match(await page.locator('.start-description').innerText(),/Ein Blatt aus Wittenberg erreicht das Dorf/);
    assert.equal(await page.locator('[data-action="resume"]').count(),0);
    await action(page,'new');
    assert.match(await page.locator('.spoken').innerText(),/Seit einigen Jahren verbreiten sich/);
    await dialogue(page); await geometry(page,'intro');
    assert.ok(await page.locator('[data-action="flyer"]').isDisabled());
    await page.locator('[data-character="jakob"]').tap();
    assert.match(await page.locator('.spoken').innerText(),/Ich habe wieder etwas von Luther bekommen/);
    assert.match(await page.locator('.room-image').getAttribute('src'),/k1_taverne_dialog_group.png/);
    assert.match(await page.locator('.portrait img').getAttribute('src'),/portrait\/jakob_reading.png/);
    await action(page,'dialogue-next');
    assert.equal(await page.locator('.speaking').getAttribute('data-character'),'peter');
    assert.equal(await page.locator('.stage').getAttribute('data-speaker'),'peter');
    assert.match(await page.locator('.portrait img').getAttribute('src'),/portrait\/peter_skeptical.png/);
    await page.waitForTimeout(260);
    assert.equal(await page.locator('.speaker-shade').evaluate(el => Number(getComputedStyle(el).opacity)),1);
    await photograph(page,'ch1-speaker-1024');
    await page.reload(); await action(page,'resume');
    assert.match(await page.locator('.spoken').innerText(),/Schon wieder Luther/);
    await dialogue(page); assert.ok(await page.locator('[data-action="flyer"]').isEnabled());
    assert.equal(await page.locator('.instruction-panel,.dialogue-panel').count(),0);
    const beforeAtmosphere=await saved(page);
    assert.match(await page.locator('.room-image').getAttribute('src'),/k1_taverne_exploration.png/);
    await page.locator('[data-action="prop-window"]').tap();
    assert.match(await page.locator('#notice').innerText(),/Draußen liegt das Dorf bereits im Dunkeln/);
    await page.locator('[data-action="prop-door"]').tap();
    assert.match(await page.locator('#notice').innerText(),/Für heute bleibst du noch hier/);
    await page.locator('[data-action="prop-candle"]').tap();
    assert.equal(await page.locator('#notice').innerText(),'Die Kerze ist fast heruntergebrannt.');
    await page.locator('[data-action="prop-mug"]').tap();
    assert.equal(await page.locator('#notice').innerText(),'Ein schwerer Holzkrug steht auf dem Tisch.');
    await page.locator('[data-character="peter"]').tap();
    assert.deepEqual(await saved(page),beforeAtmosphere);
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
    assert.equal(await page.locator('.sort-card').count(),8);
    assert.equal(await page.locator('input[type="range"]').count(),0);
    await drag(page,'grace','god',true,context); await drag(page,'faith','god',false,context);
    const assignments={conscience:'god',service:'god',obedience:'world',rule:'world',labor:'god',dues:'world'};
    for(const [id,zone] of Object.entries(assignments)) await sortingSet(page,id,zone);
    await action(page,'sort-check'); assert.match(await page.locator('.feedback-text').innerText(),/Denkimpuls/);
    await feedback(page); await action(page,'sort-check'); assert.match(await page.locator('.feedback-text').innerText(),/Nutze diese Beispiele als Orientierung/);
    await feedback(page); await sortingSet(page,'labor','world');
    await photograph(page,'ch1-sorting-1024');
    await drag(page,'service','world',true,context); await drag(page,'obedience','god',false,context);
    assert.equal(await page.locator('.sort-card').count(),8);
    await photograph(page,'ch1-sorting-boundary-1024');
    await page.reload(); await action(page,'resume');
    assert.equal((await saved(page)).minigames.sorting.dues,'world');
    await action(page,'sort-check'); assert.match(await page.locator('.feedback-text').innerText(),/tragfähige Unterscheidung/);
    assert.equal(await page.locator('.boundary-cards span').count(),2);
    assert.equal((await saved(page)).progress.freedomSortingComplete,true); await feedback(page);
    await choose(page,'A'); assert.match(await page.locator('.feedback-text').innerText(),/Wem gilt/); await feedback(page);
    await choose(page,'B'); assert.match(await page.locator('.feedback-text').innerText(),/nicht innerlich eingeschlossen/); await feedback(page);
    await choose(page,'B'); assert.match(await page.locator('.feedback-text').innerText(),/Gewissen und Verantwortung/); await feedback(page);
    assert.equal(await page.locator('.task-statement').count(),2);
    await choose(page,'D'); await feedback(page);
    await choose(page,'A'); await feedback(page);
    await choose(page,'A'); assert.match(await page.locator('.feedback-text').innerText(),/Daraus folgt noch nicht automatisch/);
    assert.equal(await page.locator('.securing').innerText(),'Welche gesellschaftlichen Folgen diese Freiheit haben kann, bleibt damit offen.');
    await feedback(page);
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
    assert.equal(await page.locator('body').getAttribute('data-mode'),'exploration');
    assert.equal(await page.locator('.ending').count(),0);
    await photograph(page,'ch1-exit-1024');
    await page.locator('[data-action="prop-door"]').tap();
    assert.equal(await page.locator('body').getAttribute('data-mode'),'transition');
    await page.locator('.ending').waitFor();
    await page.waitForTimeout(4200);
    await photograph(page,'ch1-ending-1024');
    await action(page,'home'); await action(page,'resume'); assert.equal(await page.locator('.exit-ready').count(),1);
    await page.locator('[data-action="prop-door"]').tap(); await page.locator('.ending').waitFor();

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
      ['ch1_s6b_service','B',['A','B','C','D']], ['ch1_s6b_obedience','B',['A','B','C','D']],
      ['ch1_s6c_compare','D',['A','B','C','D']], ['ch1_s6c_inner','A',['A','B','C']], ['ch1_s6c_political','A',['A','B','C']]
    ]) for(const id of ids) {
      await scene(sceneId);
      for(let n=0;n<(id===solution?1:3);n++) { await choose(page,id); await feedback(page); }
      assert.notEqual((await saved(page)).scene,sceneId);
    }
    // Both boundary cards can bridge the fields; the six clear cards must fit.
    for(const service of ['god','world']) for(const obedience of ['god','world']) {
      await scene('ch1_s6_freedom_sorting'); await dialogue(page);
      for(const [id,zone] of Object.entries({grace:'god',faith:'god',conscience:'god',labor:'world',dues:'world',rule:'world',service,obedience})) await sortingSet(page,id,zone);
      await action(page,'sort-check'); assert.match(await page.locator('.feedback-text').innerText(),/tragfähige Unterscheidung/);
    }
    await scene('ch1_s6_freedom_sorting'); await dialogue(page);
    for(const id of ['grace','faith','conscience','labor','dues','rule','service','obedience']) await sortingSet(page,id,'world');
    for(let n=0;n<3;n++) { await action(page,'sort-check'); if(n===2) assert.doesNotMatch(await page.locator('.solution-text').innerText(),/%/); await feedback(page); }
    assert.equal((await saved(page)).progress.freedomSortingComplete,true);
    assert.equal((await saved(page)).minigames.assisted.freedomSorting,true);

    // Representative UI modes at desktop, iPad and smaller dimensions.
    for(const viewport of [{width:1440,height:900},{width:1024,height:768},{width:820,height:620},{width:768,height:1024},{width:390,height:844}]) {
      await page.setViewportSize(viewport);
      await scene('ch1_s1_intro'); await dialogue(page); await geometry(page,viewport.width+' exploration');
      await photograph(page,'ch1-exploration-'+viewport.width);
      const atmosphereBefore=await saved(page);
      for (const hotspot of ['prop-window','prop-door','prop-candle','prop-mug']) await page.locator(`[data-action="${hotspot}"]`).tap();
      await page.locator('[data-character="peter"]').tap(); await page.locator('[data-character="anna"]').tap();
      assert.deepEqual(await saved(page),atmosphereBefore);
      await page.locator('[data-character="jakob"]').click(); await geometry(page,viewport.width+' dialogue');
      await photograph(page,'ch1-dialogue-'+viewport.width);
      await scene('ch1_s3_interpretation'); await dialogue(page); await geometry(page,viewport.width+' first choice');
      await scene('ch1_s5_conversations'); await page.locator('[data-character="anna"]').click(); await dialogue(page); await geometry(page,viewport.width+' puzzle');
      await photograph(page,'ch1-puzzle-'+viewport.width);
      await scene('ch1_s6_freedom_sorting'); await dialogue(page); await geometry(page,viewport.width+' sorting');
      await scene('ch1_s6b_service'); await geometry(page,viewport.width+' boundary');
      await scene('ch1_s7_notebook'); await geometry(page,viewport.width+' notebook prompt'); await photograph(page,'ch1-layout-'+viewport.width);
      await action(page,'notebook'); await overlayGeometry(page,viewport.width+' notebook'); await page.keyboard.press('Escape');
      await scene('ch1_s2_document'); await overlayGeometry(page,viewport.width+' source'); await page.keyboard.press('Escape');
      await scene('ch1_end'); await page.locator('[data-action="prop-door"]').tap(); await page.locator('.ending').waitFor();
    }
    await page.setViewportSize({width:1024,height:768});
    await scene('ch1_s6_freedom_sorting'); await dialogue(page);
    await page.locator('[data-card="grace"]').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'sort-target-god');
    await page.keyboard.press('Enter'); assert.equal((await saved(page)).minigames.sorting.grace,'god');
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

    // Version-2 numeric saves preserve earlier decisions and restart only the replaced task block.
    await scene('ch1_s6_freedom_sorting'); await dialogue(page);
    const migrationSeed=await saved(page);
    for(const oldScene of ['ch1_s1_intro','ch1_s6c_inner','ch1_end']) {
      const legacy=JSON.parse(JSON.stringify(migrationSeed));
      legacy.version=2; legacy.scene=oldScene; legacy.dialogue=null; legacy.interaction=null;
      delete legacy.minigames.sorting; delete legacy.progress.freedomSortingComplete;
      legacy.minigames.axis={grace:20,faith:30,conscience:40,labor:90,dues:100,rule:80,service:40,obedience:70,help:75,order:90};
      legacy.minigames.completed=['freedomAxis']; legacy.minigames.attempts={freedomAxis:3,serviceBoundary:2};
      legacy.progress.freedomAxisComplete=true; legacy.progress.completedScenes=['ch1_s6_freedom_axis','ch1_s6b_service'];
      legacy.choices.initialFreedomInterpretation='freedom_responsibility';
      legacy.choiceTexts.initialFreedomInterpretation='Vielleicht kann man frei sein und trotzdem Verantwortung für andere übernehmen.';
      legacy.notebook.documents=['freedom']; legacy.dimensions.solidarity=2;
      await page.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key:KEY,value:legacy});
      await page.goto(url); await action(page,'resume');
      const migrated=await saved(page);
      // A resumed save is persisted by the next normal game action.
      if(oldScene==='ch1_s6c_inner') await dialogue(page); else if(oldScene==='ch1_end') { await page.locator('[data-action="prop-door"]').tap(); await page.locator('.ending').waitFor(); await action(page,'home'); }
      else { await action(page,'menu'); await action(page,'menu-home'); }
      const persisted=await saved(page);
      assert.equal(persisted.version,3); assert.equal(persisted.choices.initialFreedomInterpretation,legacy.choices.initialFreedomInterpretation);
      assert.equal(persisted.dimensions.solidarity,2); assert.deepEqual(persisted.notebook.documents,['freedom']);
      assert.equal(persisted.minigames.sorting.grace,'god'); assert.equal(persisted.minigames.sorting.labor,'world');
      assert.equal(persisted.minigames.axis,undefined); assert.equal(persisted.minigames.attempts.serviceBoundary,undefined);
      if(oldScene==='ch1_s6c_inner') { assert.equal(persisted.scene,'ch1_s6_freedom_sorting'); assert.equal(persisted.progress.freedomSortingComplete,false); }
      if(oldScene==='ch1_end') assert.equal(persisted.progress.freedomSortingComplete,true);
    }

    // Legacy saves preserve the actual wording of earlier decisions; new tasks must still be completed.
    await page.evaluate(key => localStorage.setItem(key,JSON.stringify({version:1,scene:'ch1_end',choices:{initialFreedomInterpretation:'D'},notebook:{documents:['freedom'],passages:{freedom:[0,1]}},progress:{flyerUnlocked:true}})),KEY);
    await page.goto(url); await action(page,'resume');
    assert.equal((await saved(page)).version,3); assert.equal((await saved(page)).scene,'ch1_s5_conversations');
    assert.equal((await saved(page)).progress.annaConversation,false);
    assert.equal((await saved(page)).choiceTexts.initialFreedomInterpretation,'Vielleicht bedeutet Freiheit nicht, keine Verantwortung mehr zu haben.');
    await page.evaluate(key=>localStorage.setItem(key,'{broken'),KEY); await page.goto(url);
    assert.equal(await page.locator('[data-action="resume"]').count(),0);
    assert.deepEqual(errors,[]);
    console.log('PASS: full chapter; every interpretation, reaction and assessed option; staged hints and assisted solutions; 4-card reorder; two-field sorting with mouse/touch drag and tap, boundary cases and three-part consolidation; boundaries; consolidation; speaker assets; notebook; source HTML; save/reload and migration; debug; keyboard; five responsive viewports; no missing assets or console errors.');
  } catch(error) {
    if(page) { await photograph(page,'ch1-failure'); console.error(await page.locator('body').innerText()); }
    throw error;
  } finally { await browser.close(); server.close(); }
})().catch(error => {console.error(error); server.close(); process.exitCode=1;});
