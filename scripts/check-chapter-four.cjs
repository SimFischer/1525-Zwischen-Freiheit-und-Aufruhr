const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
const url='http://127.0.0.1:4189/',KEY='1525.freedom.save.v1';fs.mkdirSync('artifacts/chapter4',{recursive:true});
const act=(p,id)=>p.locator(`[data-action="${id}"]:visible`).last().click();
const saved=p=>p.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
async function geometry(p,label){assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label+' horizontal');const bad=await p.locator('#overlay[open] button,.chapter-four-layout .panel-actions button,.chapter-four-layout .dialogue-footer button,.ch4-hotspot').evaluateAll(ns=>ns.filter(n=>n.offsetParent).map(n=>({text:n.textContent,r:n.getBoundingClientRect()})).filter(({r})=>r.height<43||r.x<0||r.right>innerWidth+1||r.bottom>innerHeight+1).map(x=>x.text));assert.deepEqual(bad,[],label+' controls');}
async function read(p,label){await geometry(p,label+' reader');while(true){await p.waitForFunction(()=>[...document.querySelectorAll('.ch4-reader img')].every(i=>i.complete&&i.naturalWidth>0));assert.ok(await p.locator('.ch4-source-text').count());const fonts=await p.locator('.ch4-source-text').evaluateAll(ns=>ns.map(n=>parseFloat(getComputedStyle(n).fontSize)));assert.ok(fonts.every(n=>n>=18));await p.screenshot({path:`artifacts/chapter4/${label.replace(/[^a-z0-9_-]/gi,'-')}-${await p.evaluate(()=>innerWidth)}-page${await p.locator('.ch4-source-canvas').getAttribute('data-page')}.png`});const next=p.locator('[data-ch4-source="next"]');if(!await next.isEnabled())break;await next.click();}await p.locator('.ch4-reader [data-action="close-overlay"]').first().click();await p.locator('#overlay[open]').waitFor({state:'detached'});}
const routes=[
 {name:'A',prior:{ch3Print:'full',ch3Resistance:'negotiate'},options:{ch4Authority:'legal',ch4Theology:'luther_order',ch4Condition:'services',ch4Weingarten:'support_negotiation',ch4Escalation:'protect',ch4Risk:'both',ch4HarshJudgment:'excessive'},end:'negotiation_open'},
 {name:'B',prior:{ch3Print:'summary',ch3Resistance:'collective_pressure'},options:{ch4Community:'withhold_dues',ch4Theology:'gospel_critique',ch4Weingarten:'conditional_negotiation',ch4Escalation:'warn',ch4Risk:'unjust_order',ch4HarshJudgment:'contradictory'},end:'mobilized_community'},
 {name:'C',prior:{ch3Print:'accusation',ch3Resistance:'open_resistance_possible'},options:{ch4Resistance:'block_storehouse',ch4Theology:'prophetic_resistance',ch4Band:'resistance_occupation',ch4Weingarten:'reject_retreat',ch4Escalation:'join',ch4Risk:'disorder',ch4HarshJudgment:'consistent'},end:'joining_peasant_band'},
 {name:'D',prior:{ch3Print:'religious',ch3Resistance:'theological_clarification'},options:{ch4Theology:'hermeneutical_caution',ch4Weingarten:'not_transferable',ch4Escalation:'verify',ch4Risk:'religious_certainty',ch4HarshJudgment:'defer_judgment'},end:'religious_polarization'},
 {name:'E',prior:{ch3Print:'summary',ch3Resistance:'open_resistance_possible'},options:{ch4Resistance:'demonstrate',ch4Theology:'hermeneutical_caution',ch4Weingarten:'not_transferable',ch4Escalation:'protect',ch4Risk:'both',ch4HarshJudgment:'defer_judgment'},end:'events_moved_without_you'}
];
(async()=>{server.listen(4189);const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[],requests=new Set(),transcripts=[];try{
 for(const [width,height] of [[1024,768],[820,640],[1440,900]])for(const route of routes){
  const ctx=await browser.newContext({viewport:{width,height},hasTouch:width===820});const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());if(r.url().includes('/assets/chapter4/'))requests.add(new URL(r.url()).pathname.replace('/assets/chapter4/',''));});
  await p.goto(url);await p.evaluate(async({KEY,prior})=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');const game=prepareAdminStateForScene('ch3_end',{decisions:prior,orientation:{},perceptions:{}});game.consequences.adminScenario=null;localStorage.setItem(KEY,JSON.stringify(game));},{KEY,prior:route.prior});await p.reload();await act(p,'resume');await p.locator('[data-action="ch3-go"][data-scene="chapter4"]').click();await act(p,'ch4-start');
  const reloads=new Set(),shots=new Set();let done=false;
  for(let n=0;n<350;n++){
   const game=await saved(p),c=game.chapter4,s=c.stage;await geometry(p,route.name+' '+s);
   if(!shots.has(s)&&width===1024){await p.waitForFunction(()=>[...document.querySelectorAll('.chapter-four img')].every(i=>i.complete&&i.naturalWidth>0));await p.screenshot({path:`artifacts/chapter4/route-${route.name}-${s}.png`});shots.add(s);}
   if(['opening','authority','community','resistance','preparation','lords','regiments','theology','branch_effect','weingarten_choice','escalation','comparison','judgment','world_end'].includes(s)&&!reloads.has(s)){
    const before=await saved(p);await p.reload();await act(p,'resume');assert.deepEqual(await saved(p),before,route.name+' reload '+s);reloads.add(s);
   }
   if(game.dialogue){transcripts.push({route:route.name,stage:s,text:game.dialogue.lines[game.dialogue.index].text});await act(p,'dialogue-next');continue;}
   if(s==='world_end')assert.equal(c.endWorldState,route.end);
   if(s==='chapter5'){assert.equal(c.completed,true);assert.equal(c.handoff.endWorldState,route.end);assert.equal(c.handoff.lutherHarshTextJudgment,route.options.ch4HarshJudgment);done=true;break;}
   if(c.feedback){await act(p,'ch4-feedback');continue;}
   if(game.interaction){const id=game.interaction.id,opt=route.options[id]||{ch4Peasants:'A',ch4Boundary:'A',ch4Comparison:'B',ch4Early:'tension'}[id];assert.ok(opt,'missing '+id);await p.locator(`[data-choice="${id}"][data-option="${opt}"]`).click();continue;}
   const reader=p.locator('[data-action="ch4-read"]:visible');if(await reader.count()&&['ermahnung','lords','peasants','muentzer','weingarten','harsh','comparison'].includes(s)&&!c.docRead[s]){await reader.first().click();await read(p,route.name+'-'+s);continue;}
   if(s==='preparation'){
    for(const id of ['c4_memory','c4_authority'])if(!c.docRead[id]){await p.locator(`[data-document="${id}"]`).click();await read(p,route.name+'-'+id);}
    if(!c.preparationPairs.length){await p.locator('[data-action="ch4-thought"][data-item="freedom"]').click();await p.locator('[data-action="ch4-thought"][data-item="order"]').click();await act(p,'ch4-pair');}await p.locator('[data-action="ch4-go"][data-scene="opening_effect"]').click();continue;
   }
   if(s==='memory'){if(!c.memoryRead){await act(p,'ch4-memory');assert.ok((await p.locator('.notebook-content').textContent()).includes(game.choiceTexts.initialFreedomInterpretation));await p.locator('#overlay [data-action="close-overlay"]').click();}await p.locator('[data-scene="early"]').click();continue;}
   if(s==='regiments'){
    for(const zone of ['boundary','worldly','both','boundary','both']){
     await p.locator(`[data-action="ch4-classify"][data-zone="${zone}"]`).click();await p.locator('[data-action="ch4-case-reason"][data-reason="sphere"]').click();await act(p,'ch4-case-next');
    }
    for(const id of ['A','B','D'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await act(p,'ch4-synthesis');await p.locator('[data-scene="boundary"]').click();continue;
   }
   if(s==='interpretations'){for(let i=0;i<5;i++)await p.locator(`[data-action="ch4-criterion"][data-index="${i}"]`).click();await p.locator('[data-scene="theology"]').click();continue;}
   if(s==='conditions'){for(const id of ['services','voice'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await act(p,'ch4-conditions-next');continue;}
   if(s==='hermeneutics'){for(const id of ['context','contradiction'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await act(p,'ch4-hermeneutics-next');continue;}
   if(['lords','peasants_complement','structure'].includes(s)){for(const id of {lords:['B','C'],peasants_complement:['B','D'],structure:['A','B','D','E']}[s])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await act(p,'ch4-check');continue;}
   if(s==='analysis'){await act(p,'ch4-analysis');continue;}
   const limit=p.locator('[data-action="ch4-limit"]');if(await limit.count()){await limit.click();continue;}
   if(await p.locator('[data-action="ch4-choice"]').count()){await act(p,'ch4-choice');continue;}
   if(await p.locator('[data-action="ch4-route-go"]').count()){await act(p,'ch4-route-go');continue;}
   const next=p.locator('[data-action="ch4-go"]:visible');assert.ok(await next.count(),'stuck '+s);await next.first().click();
  }
  assert.equal(done,true,'route incomplete '+route.name);console.log(`PASS route ${route.name}, ${width}×${height}, ${reloads.size} save checkpoints, ${route.end}`);await ctx.close();
 }
 assert.deepEqual(errors,[]);fs.writeFileSync('artifacts/chapter4/transcripts.json',JSON.stringify(transcripts,null,2));fs.writeFileSync('artifacts/chapter4/runtime-assets.json',JSON.stringify([...requests].sort(),null,2));
 require('./check-chapter-four-runtime-assets.cjs')(requests);
 }finally{await browser.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
