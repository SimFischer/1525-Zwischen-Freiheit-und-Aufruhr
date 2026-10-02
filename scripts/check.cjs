// Run with PLAYWRIGHT_MODULE pointing at an installed Playwright module.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const server = require('./serve.cjs');
const artifacts = path.resolve(__dirname, '..', 'artifacts');
const errors = [];
const click = async (page, action) => page.locator(`[data-action="${action}"]`).first().click();
async function dialogue(page) {
  await page.locator('[data-action="dialogue-next"]').waitFor({ state: 'visible' });
  for (let i = 0; i < 20 && await page.locator('[data-action="dialogue-next"]').count(); i++) await click(page, 'dialogue-next');
}
async function geometry(page, label) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${label}: horizontal overflow`);
  const rectangles = await page.locator('.stage,.character').evaluateAll(elements => elements.map(el => { const r = el.getBoundingClientRect(); return { x:r.x,y:r.y,right:r.right,bottom:r.bottom }; }));
  if (rectangles.length) for (const r of rectangles.slice(1)) { const stage = rectangles[0]; assert.ok(r.x >= stage.x && r.right <= stage.right && r.y >= stage.y && r.bottom <= stage.bottom, `${label}: character clipped`); }
  const stageBottom = await page.locator('.stage').count() ? (await page.locator('.stage').boundingBox()).y + (await page.locator('.stage').boundingBox()).height : 0;
  if (await page.locator('#interaction').count()) assert.ok((await page.locator('#interaction').boundingBox()).y >= stageBottom, `${label}: panel overlaps scene`);
}
(async () => {
  fs.mkdirSync(artifacts, { recursive: true });
  await new Promise(resolve => server.listen(4174, '127.0.0.1', resolve));
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, hasTouch: true });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const url = 'http://127.0.0.1:4174/';
    await page.goto(url);
    await page.screenshot({ path: path.join(artifacts, 'start-1024.png') });
    assert.equal(await page.locator('[data-action="resume"]').count(), 0);
    await click(page, 'new'); await geometry(page, 'intro');
    assert.ok(await page.locator('[data-action="flyer"]').isDisabled());
    await page.locator('[data-character="peter"]').click(); await dialogue(page);
    await page.locator('[data-character="anna"]').click(); await dialogue(page);
    await click(page, 'prop-candle'); await dialogue(page); await click(page, 'prop-mug'); await dialogue(page);
    await page.locator('[data-character="jakob"]').click(); await dialogue(page);
    assert.ok(await page.locator('[data-action="flyer"]').isEnabled());
    await page.screenshot({ path: path.join(artifacts, 'tavern-1024.png') });
    await page.locator('[data-action="flyer"]').tap();
    assert.match(await page.locator('dialog').innerText(), /freier Herr/);
    await page.screenshot({ path: path.join(artifacts, 'document-1024.png') });
    await page.locator('dialog [data-action="close-overlay"]').last().click();
    await click(page, 'dialogue-next');
    await page.reload(); await click(page, 'resume');
    assert.match(await page.locator('.spoken').innerText(), /Was ist daran klar/);
    await dialogue(page);
    await page.locator('[data-option="D"]').click(); await dialogue(page);
    assert.match(await page.locator('dialog').innerText(), /dienstbarer Knecht/);
    await page.keyboard.press('Escape'); await dialogue(page);
    await page.locator('[data-character="peter"]').click(); await dialogue(page); await page.locator('[data-option="C"]').click();
    await page.locator('[data-character="anna"]').click(); await dialogue(page);
    await page.locator('[data-part="earn"]').click(); await page.locator('[data-part="better"]').click(); await click(page, 'puzzle-check');
    assert.match(await page.locator('.feedback').innerText(), /bereits geschenkten Gnade/);
    await click(page, 'puzzle-reset'); await page.locator('[data-part="grace"]').tap(); await page.locator('[data-part="neighbor"]').tap(); await click(page, 'puzzle-check'); await click(page, 'conversation-complete');
    await page.locator('[data-character="jakob"]').click(); await dialogue(page); await page.locator('[data-option="B"]').click(); await click(page, 'conversation-complete');
    assert.match(await page.locator('.stage-bottom').innerText(), /3 \/ 3/);
    await click(page, 'next-scene'); await geometry(page, 'axis');
    // Real touch Pointer Events drag via Chromium's input protocol.
    const client = await context.newCDPSession(page);
    const source = await page.locator('[data-card="grace"]').boundingBox(), destination = await page.locator('.axis-zone[data-zone="god"]').boundingBox();
    const x1 = source.x + source.width / 2, y1 = source.y + source.height / 2, x2 = destination.x + destination.width / 2, y2 = destination.y + destination.height / 2;
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x:x1, y:y1 }] });
    for (let i = 1; i <= 5; i++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x:x1+(x2-x1)*i/5, y:y1+(y2-y1)*i/5 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert.equal(await page.locator('.axis-zone[data-zone="god"] [data-card="grace"]').count(), 1);
    await page.waitForTimeout(150);
    const assignments = { faith:'god', conscience:'bridge', labor:'world', dues:'world', rule:'world', service:'bridge', order:'world' };
    for (const [id, zone] of Object.entries(assignments)) { await page.locator(`[data-card="${id}"]`).tap(); await page.locator(`.zone-target[data-zone="${zone}"]`).tap(); }
    await page.screenshot({ path: path.join(artifacts, 'axis-1024.png') });
    await page.reload(); await click(page, 'resume');
    assert.equal(await page.locator('.card-bank .axis-card').count(), 0);
    await click(page, 'axis-check'); assert.match(await page.locator('dialog').innerText(), /Nicht alles/); await click(page, 'axis-done');
    await page.locator('[data-action="notebook"]:not([disabled])').first().waitFor();
    assert.ok(await page.locator('[data-action="notebook"]').first().isEnabled());
    await click(page, 'notebook'); assert.match(await page.locator('dialog').innerText(), /Vielleicht bedeutet Freiheit nicht/);
    await page.screenshot({ path: path.join(artifacts, 'notebook-1024.png') });
    await page.locator('[data-tab="documents"]').click(); await click(page, 'archive-document');
    assert.equal(await page.locator('blockquote').count(), 2); await page.locator('dialog [data-action="close-overlay"]').last().click();
    await page.locator('.notebook').waitFor({state:'visible'}); assert.equal(await page.locator('.notebook').count(), 1); await page.locator('[data-tab="path"]').click(); await page.keyboard.press('Escape');
    await click(page, 'next-scene'); await dialogue(page); assert.match(await page.locator('.ending').innerText(), /noch nicht spielbar/);
    await page.screenshot({ path: path.join(artifacts, 'ending-1024.png') });
    await click(page, 'home'); await click(page, 'resume'); assert.equal(await page.locator('.ending').count(), 1);
    // Every initial interpretation and its reaction; all Peter and Jakob choices.
    for (const option of ['A','B','C','D']) {
      await page.goto(url + '?start=ch1_s3_interpretation&debug=true'); await dialogue(page); await page.locator(`[data-option="${option}"]`).click();
      assert.ok(await page.locator('.spoken').count()); await dialogue(page); assert.match(await page.locator('dialog').innerText(), /dienstbarer Knecht/); await page.keyboard.press('Escape');
    }
    for (const person of ['peter','jakob']) for (const option of ['A','B','C']) {
      await page.goto(url + '?start=ch1_s5_conversations'); await page.locator(`[data-character="${person}"]`).click(); await dialogue(page); await page.locator(`[data-option="${option}"]`).click();
      if (person === 'jakob') { assert.ok(await page.locator('[data-action="conversation-complete"]').count()); await page.goto(url); await click(page, 'resume'); await click(page, 'conversation-complete'); }
    }
    for (const viewport of [{width:1440,height:900},{width:1024,height:768},{width:820,height:620},{width:768,height:1024},{width:390,height:844}]) {
      await page.setViewportSize(viewport);
      for (const scene of ['ch1_s1_tavern_intro','ch1_s3_interpretation','ch1_s5_conversations','ch1_s6_freedom_axis','ch1_s7_notebook']) {
        await page.goto(url + '?start=' + scene); if (scene === 'ch1_s3_interpretation') await dialogue(page);
        await geometry(page, `${viewport.width}x${viewport.height} ${scene}`);
      }
      await page.screenshot({ path: path.join(artifacts, `layout-${viewport.width}.png`) });
    }
    await page.setViewportSize({width:1024,height:768}); await page.goto(url + '?debug=true&start=ch1_s5_conversations');
    await page.locator('.debug summary').click(); await click(page, 'debug-documents');
    assert.ok(await page.locator('[data-action="notebook"]').isEnabled());
    await page.locator('#debug-scene').selectOption('ch1_s6_freedom_axis'); assert.equal(await page.locator('.axis-panel').count(), 1);
    await click(page, 'debug-prev'); assert.match(await page.locator('.stage-caption h1').innerText(), /Drei Perspektiven/);
    await click(page, 'debug-clear'); assert.equal(await page.evaluate(() => localStorage.getItem('1525.freedom.save.v1')), null);
    await page.goto(url + '?start=ch1_s6_freedom_axis'); await click(page, 'axis-reset');
    for (const id of ['grace','faith','conscience','labor','dues','rule','service','order']) { await page.locator(`[data-card="${id}"]`).tap(); await page.locator('.zone-target[data-zone="god"]').tap(); }
    await click(page, 'axis-check'); assert.match(await page.locator('.feedback').innerText(), /Prüfe noch einmal/);
    await click(page, 'axis-reset');
    await page.locator('[data-card="grace"]').focus(); await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.dataset.zone), 'god'); await page.keyboard.press('Enter');
    assert.equal(await page.locator('.axis-zone[data-zone="god"] [data-card="grace"]').count(), 1);
    await click(page, 'menu'); await click(page, 'close-overlay'); await click(page, 'menu'); await click(page, 'menu-home');
    await click(page, 'confirm-new'); await click(page, 'close-overlay'); assert.equal(await page.locator('.start-screen').count(), 1);
    await click(page, 'confirm-reset'); await click(page, 'reset'); assert.equal(await page.locator('[data-action="resume"]').count(), 0);
    await page.goto(url + '?start=invalid'); assert.equal(await page.locator('.start-screen').count(), 1);
    await page.evaluate(() => localStorage.setItem('1525.freedom.save.v1', '{broken'));
    await page.goto(url); assert.equal(await page.locator('[data-action="resume"]').count(), 0);
    assert.deepEqual(errors, []);
    console.log('PASS: full chapter, all dialogue choices, both minigames, real touch drag and tap, save/reload, notebook, documents, debug, five viewports, no console errors.');
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
