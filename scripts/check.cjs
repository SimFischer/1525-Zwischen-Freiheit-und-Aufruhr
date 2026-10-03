// Integration checks for the supplied chapter-1 specification.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const server = require('./serve.cjs');
const artifacts = path.resolve(__dirname,'..','artifacts');
const KEY = '1525.freedom.save.v1';
const errors = [];
const action = async (page,name) => { if(name==='home' && !await page.locator('[data-action="home"]').count()) { await page.locator('[data-action="menu"]').click(); name='menu-home'; } return page.locator(`[data-action="${name}"]`).first().click(); };
const saved = page => page.evaluate(key => JSON.parse(sessionStorage.getItem('1525.freedom.test.active') ? sessionStorage.getItem('1525.freedom.test.v1') : localStorage.getItem(key)),KEY);
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
    const innerWidthForTest=await page.evaluate(()=>innerWidth);
    const controls=await page.locator('.header-actions button').evaluateAll(nodes=>nodes.map(node=>{const r=node.getBoundingClientRect();return {left:r.left,right:r.right,height:r.height};}));
    for(let i=0;i<controls.length;i++) {
      assert.ok(controls[i].height>=44 && controls[i].right<=innerWidthForTest,label+' header control clipped');
      if(i) assert.ok(controls[i].left>=controls[i-1].right,label+' overlapping header controls');
    }
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
  if (await page.locator('.notebook').count()) {
    assert.ok(close.height>=44,label+' small notebook close target');
    for (const tab of await page.locator('.notebook-tabs button').all()) {
      const box=await tab.boundingBox();
      assert.ok(box.height>=44 && box.y>=rect.y && box.y+box.height<=rect.y+rect.height,label+' clipped notebook register');
    }
    assert.equal(await page.locator('.notebook-content').evaluate(el=>getComputedStyle(el).overflowY),'auto');
    const content=page.locator('.notebook-content');
    if(viewport.width===1024 && viewport.height===768) assert.ok(await content.evaluate(el=>el.scrollHeight<=el.clientHeight+1),label+' needless notebook scrolling');
    await content.evaluate(el=>{el.scrollTop=el.scrollHeight;});
    assert.ok(await content.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<=1),label+' inaccessible notebook content');
    await content.evaluate(el=>{el.scrollTop=0;});
  }
}
async function doorGeometry(page,ending=false) {
  const door=page.locator('[data-action="prop-door"]');
  if(!ending) {
    assert.ok(await door.isHidden(),'exit visible before chapter completion');
    assert.equal(await door.getAttribute('hidden'),'');
    return;
  }
  const box=await door.boundingBox();
  assert.equal(await door.locator('strong').innerText(),'Die Taverne verlassen');
  assert.equal(await door.locator('small').innerText(),'Der Morgen beginnt.');
  assert.ok(box.height>=44 && box.x>=0 && box.x+box.width<=await page.evaluate(()=>innerWidth),'door touch target');
  for(const figure of await page.locator('.character').all()) {
    const f=await figure.boundingBox();
    assert.ok(box.x+box.width<=f.x || box.x>=f.x+f.width || box.y+box.height<=f.y || box.y>=f.y+f.height,'door covers character');
  }
}
async function choose(page,id) { await page.locator(`[data-action="choose"][data-option="${id}"]`).click(); }
async function noReplay(page,id) {
  const before=await saved(page);
  await page.locator(`[data-character="${id}"]`).tap();
  assert.equal(await page.locator('.dialogue-panel,.choice-panel,.puzzle-panel').count(),0,'completed conversation restarted');
  assert.match(await page.locator('#notice').innerText(),id==='anna' ? /Anna wartet/ : new RegExp((id==='peter'?'Peter':'Jakob')+' hat mir dazu schon'));
  assert.deepEqual(await saved(page),before,'repeat contact changed the save');
}
async function printedSource(page,index,label) {
  const image=page.locator('.source-image img');
  await image.waitFor({state:'visible'});
  await page.waitForFunction(()=>document.querySelector('.source-image img')?.naturalWidth>0);
  assert.match(await image.getAttribute('src'),new RegExp('flugblatt_luther_seite_'+(index+1)+'.png$'));
  assert.ok(await page.locator('.source-readable').isHidden(),'source text duplicated over image');
  assert.equal(await page.locator('.printed-leaf,.print-ornament').count(),0);
  const box=await image.boundingBox(), surface=await page.locator('.source-viewport').boundingBox();
  assert.ok(Math.abs(box.width/box.height-2/3)<.01,label+' distorted printed asset');
  assert.ok(box.x>=surface.x && box.x+box.width<=surface.x+surface.width+1 && box.y>=surface.y && box.y+box.height<=surface.y+surface.height+1,label+' cropped printed asset');
  const before=await saved(page);
  await page.locator('[data-source-action="zoom"]').tap();
  const viewport=page.locator('.source-viewport');
  await page.waitForFunction(()=>document.querySelector('.source-image img')?.naturalWidth>0);
  const enlarged=await image.boundingBox();
  assert.ok(enlarged.width>=box.width-1,label+' enlargement shrank image');
  if(enlarged.height>surface.height+1) assert.ok(await viewport.evaluate(el=>el.scrollHeight>el.clientHeight),'enlargement not scrollable');
  await viewport.evaluate(el=>{el.scrollTop=el.scrollHeight;});
  await overlayGeometry(page,label+' enlarged');
  for(const control of await page.locator('.document-controls button,.source-footer button').all()) {
    const r=await control.boundingBox(), height=await page.evaluate(()=>innerHeight);
    assert.ok(r.height>=44 && r.y>=0 && r.y+r.height<=height,label+' inaccessible document control');
  }
  assert.equal(await viewport.evaluate(el=>el.scrollWidth>el.clientWidth),false,label+' horizontal source scrolling');
  await page.locator('[data-source-action="zoom"]').tap();
  await page.locator('[data-source-action="read"]').tap();
  assert.ok(await page.locator('.source-image').isHidden());
  assert.ok(await page.locator('.source-readable').isVisible());
  assert.equal(await page.locator('.source-readable blockquote').innerText(),index===0 ? '„Ein Christenmensch ist ein freier Herr über alle Dinge und niemandem untertan.“' : '„Ein Christenmensch ist ein dienstbarer Knecht aller Dinge und jedermann untertan.“');
  await overlayGeometry(page,label+' readable text');
  await page.locator('[data-source-action="read"]').tap();
  assert.deepEqual(await saved(page),before,'source display controls changed save');
}
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
    assert.equal((await page.locator('[data-action="dialogue-next"]').innerText()).replace(/\s+/g,' ').trim(),'Weiter →');
    const beforeFullscreen=await saved(page);
    await page.locator('[data-action="fullscreen"]').tap();
    await page.waitForFunction(()=>Boolean(document.fullscreenElement));
    assert.equal(await page.locator('[data-action="fullscreen"]').getAttribute('aria-label'),'Vollbild verlassen');
    assert.deepEqual(await saved(page),beforeFullscreen);
    await page.locator('[data-action="fullscreen"]').tap();
    await page.waitForFunction(()=>!document.fullscreenElement);
    assert.equal(await page.locator('[data-action="fullscreen"]').getAttribute('aria-label'),'Vollbild');
    assert.deepEqual(await saved(page),beforeFullscreen);
    await dialogue(page); await geometry(page,'intro'); await doorGeometry(page);
    assert.ok(await page.locator('[data-action="flyer"]').isDisabled());
    await page.locator('[data-action="fullscreen"]').tap();
    await page.waitForFunction(()=>Boolean(document.fullscreenElement));
    await page.locator('[data-character="jakob"]').tap();
    assert.equal(await page.locator('[data-action="fullscreen"]').getAttribute('aria-label'),'Vollbild verlassen');
    await page.locator('[data-action="fullscreen"]').tap();
    await page.waitForFunction(()=>!document.fullscreenElement);
    assert.equal(await page.locator('.spoken').innerText(),'Mir ist ein Blatt aus Wittenberg in die Hände gekommen. Darin steht, was Luther schreibt.');
    assert.match(await page.locator('.room-image').getAttribute('src'),/k1_taverne_dialog_group.png/);
    assert.match(await page.locator('.portrait img').getAttribute('src'),/portrait\/jakob_reading.png/);
    assert.equal(await page.locator('.portrait span').count(),0,'technical emotion label in dialogue');
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
    await noReplay(page,'jakob');
    assert.equal(await page.locator('.exploration-tools').count(),0);
    assert.equal(await page.locator('.awaiting-flyer').count(),1);
    assert.match(await page.locator('.flyer-plaque').innerText(),/Das Blatt lesen/);
    assert.equal(await page.locator('.flyer-plaque').evaluate(el=>getComputedStyle(el).opacity),'1');
    assert.equal(await page.locator('.instruction-panel,.dialogue-panel').count(),0);
    const beforeAtmosphere=await saved(page);
    assert.match(await page.locator('.room-image').getAttribute('src'),/k1_taverne_exploration.png/);
    assert.equal(await page.locator('[data-action="prop-window"],[data-action="prop-candle"],[data-action="prop-mug"]').count(),0);
    await doorGeometry(page);
    await page.locator('[data-character="peter"]').tap();
    assert.deepEqual(await saved(page),beforeAtmosphere);
    await photograph(page,'ch1-tavern-1024');
    await page.locator('.flyer-plaque').tap();
    assert.match(await page.locator('blockquote').innerText(),/Ein Christenmensch ist ein freier Herr/);
    assert.equal(await page.locator('body').getAttribute('data-mode'),'document');
    assert.equal(await page.locator('.source-note,.editorial-info').count(),0,'editorial note in immersive document');
    assert.doesNotMatch(await page.locator('.document-table').innerText(),/modernisiert|erfunden|Quellenauszug/);
    assert.equal(await page.locator('#interaction').evaluate(el=>getComputedStyle(el).visibility),'hidden');
    await photograph(page,'ch1-document-1024');
    await page.locator('dialog [data-action="close-overlay"]').last().click(); await dialogue(page);
    assert.equal(await page.locator('.context-statement span').innerText(),'Ein Christenmensch ist ein freier Herr über alle Dinge und niemandem untertan.');
    assert.equal(await page.locator('.choice-heading h2').innerText(),'Wie verstehst du diese Aussage?');
    await geometry(page,'contextual first choice'); await photograph(page,'ch1-first-context-1024');
    await choose(page,'freedom_responsibility');
    assert.equal((await saved(page)).choices.initialFreedomInterpretation,'freedom_responsibility');
    assert.ok(Object.values((await saved(page)).dimensions).every(value => value===0));
    await dialogue(page);
    assert.match(await page.locator('blockquote').innerText(),/dienstbarer Knecht/);
    await printedSource(page,1,'second source in story');
    await photograph(page,'ch1-document-second-1024');
    await page.keyboard.press('Escape'); await dialogue(page);
    assert.equal(await page.locator('[data-action="next-scene"]').count(),0);

    await page.locator('[data-character="peter"]').tap(); await dialogue(page);
    await choose(page,'peter_god_first');
    assert.match(await page.locator('.spoken').innerText(),/Vor Gott frei. Aber vor dem Herrn/);
    await dialogue(page); assert.equal((await saved(page)).progress.peterConversation,true);
    await noReplay(page,'peter');
    await page.locator('[data-character="anna"]').tap(); await dialogue(page);
    assert.match(await page.locator('.puzzle-context').innerText(),/Warum sollte ich dann überhaupt noch etwas für andere tun/);
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
    await noReplay(page,'anna');

    const beforeFlyerReview=await saved(page);
    await page.locator('[data-action="flyer"]').tap();
    assert.equal(await page.locator('.source-footer [data-action="close-overlay"]').innerText(),'Zurück in die Taverne');
    await page.locator('.source-footer [data-action="close-overlay"]').click();
    assert.equal(await page.locator('.notebook').count(),0,'tavern source returned to locked notebook');
    assert.deepEqual(await saved(page),beforeFlyerReview,'source review changed story progress');

    await page.locator('[data-character="jakob"]').tap(); await dialogue(page);
    await photograph(page,'ch1-jakob-1024'); await geometry(page,'Jakob choice');
    await choose(page,'B'); assert.match(await page.locator('.feedback-text').innerText(),/Prüfe noch einen Schritt weiter/);
    await feedback(page); await choose(page,'A');
    assert.match(await page.locator('.feedback-text').innerText(),/vollständige Trennung/);
    await feedback(page); await choose(page,'D');
    assert.match(await page.locator('.feedback-text').innerText(),/Spannung besonders genau/);
    await page.reload(); await action(page,'resume'); await feedback(page);
    assert.equal((await saved(page)).progress.jakobConversation,true);
    for(const id of ['peter','anna','jakob']) await noReplay(page,id);

    await action(page,'next-scene'); await dialogue(page);
    assert.equal(await page.locator('.sort-card').count(),8);
    assert.equal(await page.locator('.sort-card .sort-example').count(),8,'sorting lacks application situations');
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
    assert.equal(await page.locator('.context-statement strong').innerText(),'Aussage 2:');
    assert.equal(await page.locator('.context-statement span').innerText(),'Die gleiche Freiheit der Christen vor Gott begründet, dass weltliche Pflichten nur mit ihrer persönlichen Zustimmung verbindlich sind.');
    assert.equal(await page.locator('.choice-heading h2').innerText(),'Warum greift diese Aussage zu kurz?');
    assert.deepEqual(await page.locator('.choices > button > span:nth-child(2)').allTextContents(),[
      '… die Leitsätze den Dienst aus Glauben begründen, aber persönliche Zustimmung nicht als politischen Geltungsgrund festlegen.',
      '… der Dienst am Nächsten an bestehende Pflichten bindet, deren Rechtmäßigkeit die Leitsätze bereits voraussetzen.',
      '… freiwilliger Dienst am Nächsten die Zustimmung zu weltlichen Pflichten bereits einschließt.'
    ]);
    await geometry(page,'second statement'); await photograph(page,'ch1-political-1024');
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
    await printedSource(page,0,'archive first page');
    assert.ok(await page.locator('[data-source-action="previous"]').isDisabled());
    await page.locator('[data-source-action="next"]').tap();
    await printedSource(page,1,'archive second page');
    assert.ok(await page.locator('[data-source-action="next"]').isDisabled());
    await photograph(page,'ch1-document-second-archive-1024');
    await page.locator('[data-source-action="previous"]').tap();
    assert.ok(await page.locator('.source-note').isHidden(),'editorial note exposed by default in archive');
    await page.locator('.editorial-info summary').tap();
    assert.match(await page.locator('.source-note').innerText(),/Schreibweise behutsam modernisiert/);
    await page.locator('.editorial-info summary').tap();
    await page.locator('dialog [data-action="close-overlay"]').last().click();
    await page.locator('.notebook').waitFor(); await page.keyboard.press('Escape');
    await action(page,'next-scene');
    const concluding=[];
    while(await page.locator('[data-action="dialogue-next"]').count()) { concluding.push(await page.locator('.spoken').innerText()); await action(page,'dialogue-next'); }
    assert.equal(concluding.length,6); assert.ok(concluding.some(text => text.includes('im Wald dürfen wir')));
    assert.equal(await page.locator('body').getAttribute('data-mode'),'exploration');
    assert.equal(await page.locator('.ending').count(),0);
    await doorGeometry(page,true);
    await photograph(page,'ch1-exit-1024');
    await page.locator('[data-action="prop-door"]').tap();
    assert.equal(await page.locator('body').getAttribute('data-mode'),'transition');
    await page.locator('.ending').waitFor();
    assert.equal(await page.locator('.next-chapter h1').innerText(),'Kapitel 2 – Wie frei ist dein Leben?');
    assert.doesNotMatch(await page.locator('.ending').innerText(),/Vertical Slice/);
    await page.waitForTimeout(4200);
    await photograph(page,'ch1-ending-1024');
    await action(page,'home'); await action(page,'resume'); assert.equal(await page.locator('.exit-ready').count(),1);
    await page.locator('[data-action="fullscreen"]').tap(); await page.waitForFunction(()=>Boolean(document.fullscreenElement));
    await page.locator('[data-action="prop-door"]').tap(); await page.locator('.ending').waitFor();
    assert.equal(await page.locator('[data-action="fullscreen"]').getAttribute('aria-label'),'Vollbild verlassen');
    await page.locator('[data-action="fullscreen"]').tap(); await page.waitForFunction(()=>!document.fullscreenElement);
    assert.ok(await page.locator('[data-action="fullscreen"]').isHidden());

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
      const solutionText=await page.locator(`[data-option="${solution}"] > span:nth-child(2)`).innerText();
      let firstHint='';
      for(let n=0;n<(id===solution?1:3);n++) {
        await choose(page,id);
        const response=await page.locator('.feedback-text').innerText();
        if(id!==solution && n===0) firstHint=response;
        if(id!==solution && n===1) {
          assert.equal(await page.locator('.solution-text').count(),0,'second attempt disclosed solution');
          assert.ok(!response.includes(solutionText),'second hint copied correct answer');
          assert.notEqual(response,firstHint,'second hint did not advance reasoning');
        }
        if(id===solution || n===2) assert.ok(response.length>80,'success feedback lacks explanation');
        await feedback(page);
      }
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
      await doorGeometry(page);
      await photograph(page,'ch1-exploration-'+viewport.width);
      const atmosphereBefore=await saved(page);
      assert.equal(await page.locator('[data-action="prop-window"],[data-action="prop-candle"],[data-action="prop-mug"]').count(),0);
      await page.locator('[data-character="peter"]').tap(); await page.locator('[data-character="anna"]').tap();
      assert.deepEqual(await saved(page),atmosphereBefore);
      await page.locator('[data-character="jakob"]').click(); await geometry(page,viewport.width+' dialogue');
      await photograph(page,'ch1-dialogue-'+viewport.width);
      await dialogue(page); await geometry(page,viewport.width+' flyer ready');
      const plaque=await page.locator('.awaiting-flyer .flyer-plaque').boundingBox(), room=await page.locator('.room').boundingBox();
      assert.ok(plaque.height>=44 && plaque.x>=room.x && plaque.x+plaque.width<=room.x+room.width && plaque.y+plaque.height<=room.y+room.height,'flyer label clipped');
      assert.equal(await page.locator('.exploration-tools').count(),0);
      await photograph(page,'ch1-flyer-'+viewport.width);
      await page.locator('.flyer-plaque').tap(); await overlayGeometry(page,viewport.width+' table document');
      if(viewport.width>=1024) {
        const foot=await page.locator('.source-footer button').boundingBox(), modal=await page.locator('dialog[open]').boundingBox();
        assert.ok(foot.y+foot.height<=modal.y+modal.height,'clipped source return button');
      }
      await printedSource(page,0,viewport.width+' first source');
      await photograph(page,'ch1-document-'+viewport.width);
      await page.evaluate(async()=>{const {openDocument}=await import('./js/document-viewer.js');openDocument('freedom',null,()=>{},true);});
      assert.equal(await page.locator('[data-source-action="next"]').count(),0,'archive revealed unread second page');
      assert.equal(await page.locator('img[src$="flugblatt_luther_seite_2.png"]').count(),0,'unread asset in archive');
      await page.keyboard.press('Escape');
      await page.goto(url+'?start=ch1_s4_second_thesis'); await dialogue(page);
      await printedSource(page,1,viewport.width+' second source');
      await photograph(page,'ch1-document-second-'+viewport.width);
      await page.evaluate(async()=>{const {openDocument}=await import('./js/document-viewer.js');openDocument('freedom',null,()=>{},true);});
      await printedSource(page,0,viewport.width+' archive first source');
      await page.locator('[data-source-action="next"]').tap();
      await printedSource(page,1,viewport.width+' archive second source');
      await page.keyboard.press('Escape');
      await scene('ch1_s3_interpretation'); await dialogue(page); await geometry(page,viewport.width+' first choice');
      await doorGeometry(page);
      assert.match(await page.locator('.choices > button').first().evaluate(el=>getComputedStyle(el).fontFamily),/Georgia/);
      await photograph(page,'ch1-choice-'+viewport.width);
      await scene('ch1_s5_conversations'); await page.locator('[data-character="anna"]').click(); await dialogue(page); await geometry(page,viewport.width+' puzzle');
      await photograph(page,'ch1-puzzle-'+viewport.width);
      await puzzleSequence(page,['B','F','A','C']); await action(page,'puzzle-check');
      await geometry(page,viewport.width+' feedback');
      await photograph(page,'ch1-feedback-'+viewport.width);
      await scene('ch1_s6_freedom_sorting'); await dialogue(page); await geometry(page,viewport.width+' sorting');
      await photograph(page,'ch1-sort-layout-'+viewport.width);
      await scene('ch1_s6b_service'); await geometry(page,viewport.width+' boundary');
      await scene('ch1_s6c_political'); await geometry(page,viewport.width+' second statement');
      await photograph(page,'ch1-political-'+viewport.width);
      await scene('ch1_s7_notebook'); await geometry(page,viewport.width+' notebook prompt'); await photograph(page,'ch1-layout-'+viewport.width);
      await action(page,'notebook'); await overlayGeometry(page,viewport.width+' notebook');
      await photograph(page,'ch1-notebook-'+viewport.width);
      for(const tab of ['documents','path','freedom']) { await page.locator(`[data-tab="${tab}"]`).tap(); assert.equal(await page.locator(`[data-tab="${tab}"]`).getAttribute('aria-current'),'page'); }
      await action(page,'close-overlay');
      await action(page,'menu'); await overlayGeometry(page,viewport.width+' menu');
      await photograph(page,'ch1-menu-'+viewport.width); await action(page,'close-overlay');
      await scene('ch1_s2_document'); await overlayGeometry(page,viewport.width+' source'); await page.keyboard.press('Escape');
      await scene('ch1_end'); await doorGeometry(page,true); await page.locator('[data-action="prop-door"]').tap(); await page.locator('.ending').waitFor();
      assert.equal(await page.locator('.ending [data-action="home"]').count(),1,'duplicate ending destination');
    }
    await page.setViewportSize({width:1024,height:768});
    await scene('ch1_s6_freedom_sorting'); await dialogue(page);
    await page.locator('[data-card="grace"]').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'sort-target-god');
    await page.keyboard.press('Enter'); assert.equal((await saved(page)).minigames.sorting.grace,'god');
    const beforeDebug=await page.evaluate(key=>localStorage.getItem(key),KEY);
    await page.goto(url+'?debug=true&start=ch1_s5_conversations');
    await page.locator('.debug summary').click(); await action(page,'debug-documents');
    await page.locator('#debug-scene').selectOption('ch1_s6b_service'); assert.equal(await page.locator('.choices').count(),1);
    await action(page,'debug-next'); assert.match(await page.locator('.stage-caption').innerText(),/Gehorsam/);
    await action(page,'debug-prev'); await action(page,'debug-clear');
    assert.equal(await page.evaluate(key=>localStorage.getItem(key),KEY),beforeDebug);
    assert.equal(await page.evaluate(()=>sessionStorage.getItem('1525.freedom.test.v1')),null);
    await action(page,'admin-exit');
    await scene('ch1_s1_intro'); await dialogue(page);
    await page.locator('[data-action="fullscreen"]').tap(); await page.waitForFunction(()=>Boolean(document.fullscreenElement));
    await action(page,'home');
    assert.equal(await page.locator('[data-action="fullscreen"]').getAttribute('aria-label'),'Vollbild verlassen');
    await page.locator('[data-action="fullscreen"]').tap(); await page.waitForFunction(()=>!document.fullscreenElement);
    assert.ok(await page.locator('[data-action="fullscreen"]').isHidden());
    await page.goto(url+'?start=ch1_s1_tavern_intro'); await dialogue(page);
    assert.equal((await saved(page)).scene,'ch1_s1_intro');
    await action(page,'menu'); await overlayGeometry(page,'menu'); await photograph(page,'ch1-menu-1024'); await action(page,'close-overlay'); await action(page,'menu'); await action(page,'menu-home');
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
      assert.equal(persisted.version,4); assert.equal(persisted.choices.initialFreedomInterpretation,legacy.choices.initialFreedomInterpretation);
      assert.equal(persisted.dimensions.solidarity,2); assert.deepEqual(persisted.notebook.documents,['freedom']);
      assert.equal(persisted.minigames.sorting.grace,'god'); assert.equal(persisted.minigames.sorting.labor,'world');
      assert.equal(persisted.minigames.axis,undefined); assert.equal(persisted.minigames.attempts.serviceBoundary,undefined);
      if(oldScene==='ch1_s6c_inner') { assert.equal(persisted.scene,'ch1_s6_freedom_sorting'); assert.equal(persisted.progress.freedomSortingComplete,false); }
      if(oldScene==='ch1_end') assert.equal(persisted.progress.freedomSortingComplete,true);
    }

    // Legacy saves preserve the actual wording of earlier decisions; new tasks must still be completed.
    await page.evaluate(key => localStorage.setItem(key,JSON.stringify({version:1,scene:'ch1_end',choices:{initialFreedomInterpretation:'D'},notebook:{documents:['freedom'],passages:{freedom:[0,1]}},progress:{flyerUnlocked:true}})),KEY);
    await page.goto(url); await action(page,'resume');
    assert.equal((await saved(page)).version,4); assert.equal((await saved(page)).scene,'ch1_s5_conversations');
    assert.equal((await saved(page)).progress.annaConversation,false);
    assert.equal((await saved(page)).choiceTexts.initialFreedomInterpretation,'Vielleicht bedeutet Freiheit nicht, keine Verantwortung mehr zu haben.');
    await page.evaluate(key=>localStorage.setItem(key,'{broken'),KEY); await page.goto(url);
    assert.equal(await page.locator('[data-action="resume"]').count(),0);
    await page.emulateMedia({reducedMotion:'reduce'});
    await scene('ch1_end'); await page.locator('[data-action="prop-door"]').tap();
    await page.locator('.ending').waitFor();
    assert.ok(await page.locator('.next-chapter').evaluate(el=>parseFloat(getComputedStyle(el).animationDuration)<=.01),'reduced-motion chapter transition');
    await page.emulateMedia({reducedMotion:'no-preference'});
    assert.deepEqual(errors,[]);
    console.log('PASS: full chapter; every interpretation, reaction and assessed option; staged hints and assisted solutions; 4-card reorder; two-field sorting with mouse/touch drag and tap, boundary cases and three-part consolidation; boundaries; consolidation; speaker assets; notebook; source HTML; save/reload and migration; debug; keyboard; five responsive viewports; no missing assets or console errors.');
  } catch(error) {
    if(page) { await photograph(page,'ch1-failure'); console.error(await page.locator('body').innerText()); }
    throw error;
  } finally { await browser.close(); server.close(); }
})().catch(error => {console.error(error); server.close(); process.exitCode=1;});
