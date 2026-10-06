const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
const KEY='1525.freedom.save.v1',url='http://127.0.0.1:4198/',act=(p,a)=>p.locator(`[data-action="${a}"]:visible`).last().click(),saved=p=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY);
const routes=[
 {id:'band',world:'joining_peasant_band',path:'peasant_band',options:{ch5First:'stop_dues',ch5Dues:'block_only',ch5Prisoner:'release',ch5Freedom:'resistance'},final:'stay_with_band',end:'violent_defeat'},
 {id:'negotiation',world:'negotiation_open',path:'negotiation',options:{ch5Condition:'community_representation',ch5Prisoner:'hand_to_council',ch5Freedom:'responsibility'},final:'negotiate_village_protection',end:'civilians_protected'},
 {id:'council',world:'events_moved_without_you',path:'theological_council',options:{ch5Counsel:'reject_sacralized_violence',ch5Prisoner:'protect_detention',ch5Freedom:'theological_freedom'},final:'public_religious_warning',end:'fragile_deescalation'},
 {id:'religious',world:'religious_polarization',path:'religious_conflict',options:{ch5Prisoner:'protect_detention',ch5Freedom:'complex'},final:'joint_protection',end:'civilians_protected'}
];
async function geometry(p,label){
 const bad=await p.evaluate(()=>{const out=[];if(document.documentElement.scrollWidth>innerWidth)out.push('horizontal page');for(const n of document.querySelectorAll('.chapter-five-layout button,.ch5-write-field,.ch5-work-title,.ch5-work-controls,.ch5-task,.dialogue-footer button')){if(!n.offsetParent)continue;const r=n.getBoundingClientRect();if(r.left<-.5||r.right>innerWidth+1||r.top<-.5||r.bottom>innerHeight+1)out.push(n.textContent.trim().slice(0,65)+' outside '+JSON.stringify({x:r.x,y:r.y,b:r.bottom}));if(n.matches('button')&&r.height<43)out.push('small button '+n.textContent);if(n.matches('.ch5-write-field')&&n.scrollHeight>n.clientHeight+2)out.push('writing overflow '+n.textContent.slice(0,60));}for(const n of document.querySelectorAll('.chapter-five-layout .task-scroll,.ch5-workspace'))if(n.scrollHeight>n.clientHeight+2)out.push('internal scroll '+n.className);return out;});assert.deepEqual(bad,[],label);
}
async function reload(p){const before=await saved(p);await p.reload();await act(p,'resume');assert.deepEqual(await saved(p),before,'reload preserves full state');}
(async()=>{server.listen(4198);const b=await chromium.launch({channel:'msedge',headless:true});fs.mkdirSync('artifacts/chapter5',{recursive:true});const results=[];try{
 for(const [width,height]of [[1024,768],[820,640],[1440,900]])for(const r of routes){
  const context=await b.newContext({viewport:{width,height},hasTouch:width<1100}),p=await context.newPage(),errors=[],transcript=[],shots=new Set(),reloads=new Set();p.on('pageerror',e=>errors.push(e.message));p.on('response',res=>{if(res.status()>=400)errors.push(res.url());});await p.goto(url);
  await p.evaluate(async({KEY,r})=>{const {prepareAdminStateForScene}=await import('./js/admin-state.js');const g=prepareAdminStateForScene('ch4_chapter5');g.consequences.adminScenario=null;g.chapter4.endWorldState=r.world;g.chapter4.theologicalPath=r.path==='theological_council'?'hermeneutical_caution':r.path==='peasant_band'?'prophetic_resistance':'luther_order';g.choices.ch4Theology=g.chapter4.theologicalPath;g.choices.ch4Weingarten=r.path==='negotiation'?'support_negotiation':'not_transferable';g.chapter4.weingartenResponse=g.choices.ch4Weingarten;localStorage.setItem(KEY,JSON.stringify(g));},{KEY,r});await p.reload();await act(p,'resume');await act(p,'ch5-start');let done=false;
  for(let n=0;n<300;n++){
   const g=await saved(p),c=g.chapter5,s=c.stage;await geometry(p,`${r.id} ${width} ${s} ${c.phase} ${c.step}`);assert.equal(c.openingPath,r.path);
   if(width===1024&&!shots.has(s)){await p.waitForFunction(()=>[...document.querySelectorAll('.chapter-five-layout img')].every(i=>i.complete&&i.naturalWidth));await p.screenshot({path:`artifacts/chapter5/${r.id}-${s}.png`});shots.add(s);}
   const rk=s+':'+c.phase;if(['intro','negotiation_effect','prisoner_scene','three_reports','theological_arguments','religion_functions','luther_balance','troops_approach','action_effect','after_crisis','chapter6'].includes(s)&&!reloads.has(rk)){await reload(p);reloads.add(rk);}
   if(s==='chapter6'){assert.equal(c.completed,true);assert.equal(c.endWorldState,r.end);assert.equal(c.handoff.chapter5.endWorldState,r.end);assert.ok(c.handoff.initialFreedomInterpretation);done=true;break;}
   if(g.dialogue){transcript.push(g.dialogue.lines[g.dialogue.index].text);await act(p,'dialogue-next');continue;}
   if(c.feedback){await act(p,'ch5-feedback');continue;}
   if(await p.locator('[data-action="ch5-choose"]').count()){const map={peasant_camp:'ch5First',dues_cart:'ch5Dues',negotiation_room:'ch5Condition',community_counsel:'ch5Counsel',prisoner_scene:'ch5Prisoner',neighbor_love:'ch5Neighbor',freedom_after_action:'ch5Freedom'};await p.locator(`[data-action="ch5-choose"][data-option="${r.options[map[s]]||'B'}"]`).click();continue;}
   if(s==='theological_arguments'){if(await p.locator('[data-action="ch5-begin-arguments"]').count())await act(p,'ch5-begin-arguments');else if(c.step===4)await act(p,'ch5-task-next');else await p.locator(`[data-action="ch5-field"][data-item="${c.phase==='limit'?'limit':'help'}"]`).click();continue;}
   if(s==='polarization_analysis'){if(c.step===2)await act(p,'ch5-task-next');else await p.locator('[data-action="ch5-field"]').first().click();continue;}
   if(s==='three_reports'){if(!c.phase)await act(p,'ch5-reports-read');else if(c.step===5)await act(p,'ch5-task-next');else await p.locator(`[data-action="ch5-report"][data-item="${c.step<3?'certain':'uncertain'}"]`).click();continue;}
   if(s==='religion_functions'){if(!c.phase){for(const id of ['critique','limit'])await p.locator(`[data-action="ch5-function"][data-item="${id}"]`).click();}else await p.locator('[data-action="ch5-function"][data-item="legitimate"]').click();await act(p,'ch5-functions-next');continue;}
   if(s==='luther_balance'){await p.locator(`[data-action="ch5-luther"][data-item="${c.phase==='tension'?'revolt':'service'}"]`).click();await act(p,'ch5-luther-next');continue;}
   if(s==='internal_debate'){await p.locator(`[data-action="ch5-debate"][data-item="${c.phase==='danger'?'konrad':'peter'}"]`).click();await act(p,'ch5-debate-next');continue;}
   if(s==='troops_approach'){await p.locator(`[data-action="ch5-final"][data-item="${r.final}"]`).click();continue;}
   if(await p.locator('[data-action="ch5-next"]').count()){await act(p,'ch5-next');continue;}
   throw Error('No continuation '+s);
  }
  assert.equal(done,true,'route completed');assert.deepEqual(errors,[]);if(r.id==='council')assert.ok(transcript.filter(t=>t.includes('Gottes Auftrag')).length>=1,'counsel recalled');
  await act(p,'notebook');await p.locator('[data-action="notebook-tab"][data-tab="action"]').click();assert.ok((await p.locator('.notebook-content').innerText()).includes('Meine Luther-Spannung'));await p.locator('#overlay [data-action="close-overlay"]').click();
  results.push({route:r.id,width,height,outcomes:(await saved(p)).chapter5,transcript});console.log('PASS Chapter 5 route',r.id,width,height);await context.close();
 }
 fs.writeFileSync('artifacts/chapter5/routes.json',JSON.stringify(results,null,2));
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
