// Regression checks for the whole-game learning audit, not admin route substitutes.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
const KEY='1525.freedom.save.v1',base='http://127.0.0.1:4197/';
const act=(p,id)=>p.locator(`[data-action="${id}"]:visible`).first().click();
async function fixture(p,id){await p.evaluate(async({id,KEY})=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');const s=prepareAdminStateForScene(id);s.dialogue=null;s.interaction=null;localStorage.setItem(KEY,JSON.stringify(s));},{id,KEY});await p.reload();await act(p,'resume');}
(async()=>{server.listen(4197,'127.0.0.1');const b=await chromium.launch({channel:'msedge',headless:true});try{
 const p=await b.newPage({viewport:{width:1024,height:768}});await p.goto(base);
 const catalog=await p.evaluate(async()=>{
  const {choices}=await import('./data/choices.js'),{scenes}=await import('./data/scenes.js'),{freshState,replaceState,state}=await import('./js/state.js'),{choiceFeedback}=await import('./js/feedback.js');
  let checks=0;
  for(const [id,c]of Object.entries(choices).filter(([id,c])=>!id.startsWith('ch4')&&!c.reflective))for(const opt of c.options.filter(o=>o.id!==c.solution)){
   replaceState(freshState());const first=choiceFeedback(id,opt),second=choiceFeedback(id,opt);
   if(first.after!=='retry-choice'||second.after==='retry-choice'||!second.assisted||first.submitted!==opt.text||!second.text.length)throw Error('unbounded or ungrounded feedback '+id);
   if(Object.values(state.orientation).some(v=>v!==0))throw Error('assessed answer changes profile '+id);checks++;
  }
  return {checks,scenes,choices};
 });
 fs.writeFileSync('artifacts/learning-audit-catalog.json',JSON.stringify(catalog,null,2));
 const stages={ch4Peasants:'peasants',ch4Boundary:'boundary',ch4Comparison:'comparison'};
 for(const [id,stage]of Object.entries(stages)){
  await fixture(p,'ch4_'+stage);await p.evaluate(async({KEY,stage})=>{const s=JSON.parse(localStorage.getItem(KEY));s.chapter4.docRead[stage]=true;localStorage.setItem(KEY,JSON.stringify(s));},{KEY,stage});await p.reload();await act(p,'resume');await act(p,'ch4-choice');
  const wrong=catalog.choices[id].options.find(o=>o.id!==catalog.choices[id].solution);
  await p.locator(`[data-option="${wrong.id}"]`).click();assert.match(await p.locator('.personal-note').innerText(),new RegExp(wrong.text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));assert.match(await p.locator('[data-action="ch4-feedback"]').innerText(),/Hinweis/);await act(p,'ch4-feedback');await p.locator(`[data-option="${wrong.id}"]`).click();assert.match(await p.locator('.ch4-task').innerText(),/Gemeinsam sichern/);await act(p,'ch4-feedback');assert.notEqual(await p.evaluate(key=>JSON.parse(localStorage.getItem(key)).scene,KEY),'ch4_'+stage);
 }
 for(const stage of ['lords','peasants_complement','structure']){
  await fixture(p,'ch4_'+stage);await p.evaluate(({KEY,stage})=>{const s=JSON.parse(localStorage.getItem(KEY));s.chapter4.docRead[stage]=true;s.chapter4.attempts[stage]=0;s.chapter4.selections[stage]=[];delete s.chapter4.resolved[stage];localStorage.setItem(KEY,JSON.stringify(s));},{KEY,stage});await p.reload();await act(p,'resume');
  const wrong={lords:'A',peasants_complement:'C',structure:'C'}[stage];await p.locator(`[data-item="${wrong}"]`).click();await act(p,'ch4-check');assert.ok((await p.locator('.ch4-task').innerText()).length>180);await act(p,'ch4-feedback');await act(p,'ch4-check');assert.match(await p.locator('.ch4-task').innerText(),/Gemeinsam halten/);await act(p,'ch4-feedback');
 }
 await fixture(p,'ch1_s2_document');await p.locator('[data-action="scene-document"]').count();
 await p.evaluate(async()=>{const {openDocument}=await import('./js/document-viewer.js');openDocument('freedom',0);});assert.match(await p.locator('.source-page-number').innerText(),/Heutige Wiedergabe/);await p.locator('[data-source-action="read"]').click();assert.match(await p.locator('.source-kind').innerText(),/In heutiger Sprache zusammengefasst/);await p.keyboard.press('Escape');
 await fixture(p,'ch4_preparation');assert.match(await p.locator('.ch4-task').innerText(),/Lies noch/);
 const memory=await p.evaluate(async()=>{const {sourceCanvas}=await import('./js/chapter-four-documents.js');return sourceCanvas('luther_freedom_small');});assert.match(memory,/In heutiger Sprache zusammengefasst/);assert.doesNotMatch(memory,/Behutsam modernisierte/);
 console.log(`PASS ${catalog.checks} closed alternatives: one guided second chance, shared explanation, neutral profile; chapter-4 retries, source labels and prerequisites`);
 }finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
