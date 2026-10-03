const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
const base='http://127.0.0.1:4196/',KEY='1525.freedom.save.v1';
const act=(p,a)=>p.locator(`[data-action="${a}"]`).last().click();
const saved=p=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
async function fixture(p){await p.goto(base);await p.evaluate(async key=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');const s=prepareAdminStateForScene('ch4_regiments');s.dialogue=null;localStorage.setItem(key,JSON.stringify(s));},KEY);await reload(p);}
async function reload(p){await p.reload();await act(p,'resume');}
async function inspect(p,label){
 const result=await p.locator('.ch4-regiments').evaluate(n=>({
  horizontal:document.documentElement.scrollWidth>innerWidth,vertical:document.documentElement.scrollHeight>innerHeight,
  scroll:[n,...n.querySelectorAll('*')].filter(x=>x.scrollHeight>x.clientHeight+1&&['auto','scroll'].includes(getComputedStyle(x).overflowY)).map(x=>x.className),
  rect:n.getBoundingClientRect().toJSON(),
  buttons:[...n.querySelectorAll('button')].map(x=>({rect:x.getBoundingClientRect().toJSON(),font:parseFloat(getComputedStyle(x).fontSize)})),
  viewport:{width:innerWidth,height:innerHeight}
 }));
 assert.equal(result.horizontal,false,label+' horizontal overflow');assert.equal(result.vertical,false,label+' page scroll');assert.deepEqual(result.scroll,[],label+' nested scroll');
 assert.ok(result.rect.top>=55&&result.rect.bottom<=result.viewport.height,label+' panel outside screen');
 for(const {rect,font} of result.buttons){assert.ok(rect.height>=44&&font>=17,label+' small control');assert.ok(rect.left>=0&&rect.right<=result.viewport.width&&rect.top>=result.rect.top&&rect.bottom<=result.rect.bottom+1,label+' clipped control');}
 assert.equal(await p.locator('.ch4-regiments .sort-card,.ch4-regiments [data-drop-zone],.drag-ghost').count(),0);
}
(async()=>{
 await new Promise(r=>server.listen(4196,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});fs.mkdirSync('artifacts/ch4-regiments',{recursive:true});
 try{
  const errors=[];
  for(const [width,height] of [[1024,768],[820,640],[1440,900]]){
   const context=await browser.newContext({viewport:{width,height},hasTouch:width===820}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url());});await fixture(p);
   const before=await saved(p);
   for(const [index,[id,zone]] of [['preacher','boundary'],['tax','worldly'],['corvee','both'],['command','boundary'],['arrest','worldly']].entries()){
    assert.match(await p.locator('.ch4-regiments .eyebrow').innerText(),new RegExp(`Fall ${index+1} von 5`,'i'));assert.equal(await p.locator('.regiments-categories button').count(),4);assert.equal(await p.locator('[data-action="ch4-case-reason"],[data-action="ch4-case-next"]').count(),0);await inspect(p,id+' read');
    const category=p.locator(`[data-action="ch4-classify"][data-zone="${zone}"]`);if(width===820)await category.tap();else if(width===1440){await category.focus();await p.keyboard.press('Enter');}else await category.click();
    assert.equal(await p.locator('.regiments-reasons button').count(),3);await inspect(p,id+' why');assert.deepEqual((await saved(p)).chapter4.twoRegimentsCases[id],{classification:zone,reasoning:null});
    await p.screenshot({path:`artifacts/ch4-regiments/reason-${id}-${width}.png`});await reload(p);assert.equal(await p.locator('.regiments-reasons button').count(),3);assert.equal((await saved(p)).chapter4.regimentsIndex,index);
    await p.locator('[data-action="ch4-case-reason"][data-reason="limit"]').click();assert.equal(await p.locator('.regiments-reasons').count(),0);assert.equal(await p.locator('[data-action="ch4-case-next"]:disabled').count(),0);assert.equal(await p.evaluate(()=>document.activeElement?.dataset.action),'ch4-case-next');await inspect(p,id+' feedback');await p.screenshot({path:`artifacts/ch4-regiments/feedback-${id}-${width}.png`});
    await reload(p);assert.equal((await saved(p)).chapter4.twoRegimentsCases[id].reasoning,'limit');assert.equal(await p.locator('.regiments-feedback').count(),1);await act(p,'ch4-case-next');assert.equal(await p.evaluate(()=>document.activeElement?.id),'regiments-title');await reload(p);assert.equal((await saved(p)).chapter4.regimentsIndex,index+1);
   }
   assert.equal(await p.locator('.regiments-categories').count(),0);assert.equal(await p.locator('.regiments-synthesis button').count(),4);assert.equal(await p.locator('[data-scene="boundary"]').count(),0);assert.equal(await p.locator('[data-action="ch4-synthesis"]').count(),0,'empty synthesis must not advance by repeated checks');await inspect(p,'synthesis');
   for(const id of ['A','C'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await act(p,'ch4-synthesis');assert.equal(await p.locator('[data-scene="boundary"]').count(),0);await inspect(p,'synthesis retry');
   await p.locator('[data-item="C"]').click();for(const id of ['B','D'])await p.locator(`[data-item="${id}"]`).click();await act(p,'ch4-synthesis');await inspect(p,'synthesis resolved');await reload(p);assert.equal((await saved(p)).chapter4.resolved.regiments,true);assert.match(await p.locator('.regiments-feedback').innerText(),/keine einfache Schablone/);assert.deepEqual((await saved(p)).chapter4.selections.regiments_synthesis,['A','B','D']);await p.screenshot({path:`artifacts/ch4-regiments/synthesis-${width}.png`});
   const after=await saved(p);assert.deepEqual(after.orientation,before.orientation);assert.deepEqual(after.perceptions,before.perceptions);await p.locator('[data-scene="boundary"]').click();assert.equal((await saved(p)).scene,'ch4_boundary');assert.deepEqual((await saved(p)).chapter4.twoRegimentsCases,after.chapter4.twoRegimentsCases);
   // Every classification/reason pair gives bounded feedback; alternate aspects remain possible.
   await fixture(p);const combinations=await p.evaluate(async()=>{const {regimentsCases,regimentsZones,regimentsFeedback}=await import('./data/chapter-four-regiments.js');return regimentsCases.flatMap(cas=>regimentsZones.flatMap(([classification])=>cas.reasons.map(([reasoning])=>({text:regimentsFeedback(cas,{classification,reasoning}),id:cas.id,classification,reasoning}))));});assert.equal(combinations.length,60);for(const x of combinations){assert.ok(x.text.length&&x.text.split(/(?<=[.!?]) /).length<=3,JSON.stringify(x));}
   for(const x of combinations){await p.evaluate(async({key,x})=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js'),{regimentsCases}=await import('./data/chapter-four-regiments.js');const s=prepareAdminStateForScene('ch4_regiments');s.dialogue=null;const index=regimentsCases.findIndex(c=>c.id===x.id);for(const cas of regimentsCases.slice(0,index))s.chapter4.twoRegimentsCases[cas.id]={classification:cas.preferred[0],reasoning:'sphere'};s.chapter4.twoRegimentsCases[x.id]={classification:x.classification,reasoning:x.reasoning};s.chapter4.regimentsIndex=index;localStorage.setItem(key,JSON.stringify(s));},{key:KEY,x});await reload(p);await inspect(p,'feedback '+x.id+' '+x.classification+' '+x.reasoning);}
   const protectedNormal=await p.evaluate(key=>localStorage.getItem(key),KEY);await p.goto(base+'?debug=true&start=ch4_regiments');for(let i=0;i<6&&await p.locator('[data-action="dialogue-next"]').count();i++)await act(p,'dialogue-next');await p.locator('[data-zone="boundary"]').click();await inspect(p,'separate test mode');assert.equal(await p.evaluate(key=>localStorage.getItem(key),KEY),protectedNormal);
   await context.close();console.log(`PASS single-case tap/click/keyboard flow, no scroll, 15 reload checkpoints, synthesis and neutral consequences at ${width}×${height}`);
  }
  const p=await browser.newPage();await p.goto(base);
  const migration=await p.evaluate(async key=>{
   const {prepareAdminStateForScene}=await import('./js/admin-state.js'),{load}=await import('./js/save-system.js');
   const s=prepareAdminStateForScene('ch4_regiments');s.dialogue=null;delete s.chapter4.regimentsIndex;s.chapter4.twoRegimentsCases={preacher:'boundary',tax:'worldly',alien:'spiritual',corvee:'INVALID'};s.chapter4.caseReasons={preacher:'limit',tax:'sphere'};localStorage.setItem(key,JSON.stringify(s));const old=load();
   const modern=structuredClone(old);modern.chapter4.regimentsIndex=5;modern.chapter4.twoRegimentsCases.command={classification:'both',reasoning:'NOT_A_REASON'};modern.chapter4.twoRegimentsCases.arrest={classification:'boundary',reasoning:'limit',ignored:'x'};localStorage.setItem(key,JSON.stringify(modern));const cleaned=load();
   return {old:old.chapter4,cleaned:cleaned.chapter4};
  },KEY);
  assert.equal(migration.old.regimentsIndex,2);assert.deepEqual(migration.old.twoRegimentsCases.preacher,{classification:'boundary',reasoning:'limit'});assert.deepEqual(migration.old.twoRegimentsCases.tax,{classification:'worldly',reasoning:'sphere'});assert.equal(migration.cleaned.regimentsIndex,2);assert.equal(migration.cleaned.twoRegimentsCases.command.reasoning,null);assert.deepEqual(migration.cleaned.twoRegimentsCases.arrest,{classification:'boundary',reasoning:'limit'});assert.equal(migration.old.twoRegimentsCases.alien,undefined);
  assert.deepEqual(errors,[]);console.log('PASS legacy migration, invalid nested data, current case recovery and all 60 bounded feedback combinations');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
