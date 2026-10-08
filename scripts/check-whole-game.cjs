// Four genuine new-game routes through every implemented chapter. No admin fixtures, scene jumps or save injection.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
const base='http://127.0.0.1:4188/',KEY='1525.freedom.save.v1';
const read=p=>p.evaluate(k=>JSON.parse(localStorage.getItem(k)),KEY),saved=read;
const action=async(p,id)=>p.locator(`[data-action="${id}"]:visible`).first().click();
const click=async(p,id,extra='')=>p.locator(`[data-action="${id}"]${extra}:visible`).first().click();
let transcript=[];
async function dialogue(p){await p.waitForTimeout(120);for(let i=0;i<60&&await p.locator('[data-action="dialogue-next"]:visible').count();i++){transcript.push(await p.locator('.spoken').innerText());await action(p,'dialogue-next');}}
const drain=dialogue;
async function choose(p,id,opt){await p.locator(`[data-choice="${id}"][data-option="${opt}"]`).click();if(await p.locator('[data-action="feedback-next"]:visible').count())await action(p,'feedback-next');await dialogue(p);}
async function reload(p){const before=await read(p);await p.reload();await action(p,'resume');assert.deepEqual(await read(p),before,'reload changes canonical save');}
async function geometry(p,label){await p.waitForFunction(()=>[...document.images].every(i=>i.complete));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label+' overflow');assert.equal(await p.locator('img').evaluateAll(ns=>ns.filter(n=>!n.naturalWidth).length),0,label+' missing image');assert.equal(await p.locator('.test-toolbar').count(),0,'admin state leaked');}
async function photo(p,id){if(id.endsWith('-chapter3-end'))await p.waitForTimeout(6000);await geometry(p,id);await p.screenshot({path:'artifacts/whole-'+id+'.png'});}
async function chapterOne(p,r){
 await action(p,'new');await dialogue(p);await p.locator('[data-character="jakob"]').click();await dialogue(p);await action(p,'flyer');await photo(p,r.id+'-luther1');await click(p,'close-overlay');await dialogue(p);await choose(p,'initialFreedomInterpretation',r.first);await photo(p,r.id+'-luther2');await click(p,'close-overlay');await dialogue(p);
 await p.locator('[data-character="peter"]').click();await dialogue(p);await choose(p,'freedomSocialFirstThought',r.peter);
 await p.locator('[data-character="anna"]').click();await dialogue(p);for(const id of ['A','C','D','E'])await p.locator(`.puzzle-parts [data-part="${id}"]`).click();await action(p,'puzzle-check');await action(p,'feedback-next');await dialogue(p);
 await p.locator('[data-character="jakob"]').click();await dialogue(p);const before=await read(p);await choose(p,'freedomAndOuterLife','D');const after=await read(p);assert.deepEqual(after.orientation,before.orientation,'assessed answer affects orientation');assert.deepEqual(after.perceptions,before.perceptions,'assessed answer judges person');
 await action(p,'next-scene');await dialogue(p);for(const [id,zone]of Object.entries({grace:'god',faith:'god',conscience:'god',labor:'world',dues:'world',rule:'world',service:'world',obedience:'god'})){await p.locator(`[data-card="${id}"]`).click();await click(p,'sort-target',`[data-zone="${zone}"]`);}await action(p,'sort-check');await action(p,'feedback-next');
 for(const [id,opt]of [['serviceBoundary','B'],['obedienceBoundary','B'],['freedomComparison','D'],['innerConsolidation','A'],['politicalConsolidation','A']])await choose(p,id,opt);
 await action(p,'notebook');await photo(p,r.id+'-notebook1');await click(p,'close-overlay');await reload(p);await action(p,'next-scene');await dialogue(p);await photo(p,r.id+'-tavern-end');await action(p,'prop-door');await p.locator('[data-action="ch2-start"]').waitFor();await action(p,'ch2-start');await action(p,'ch2-morning');await dialogue(p);assert.equal((await read(p)).scene,'ch2_hub');
}
async function forest(p,response='community',clues=3){await p.locator('[data-scene="ch2_forest"]').click();for(const clue of ['oldUse','customaryRules','newClaim'].slice(0,clues)){await p.locator('[data-clue="'+clue+'"]').click();await dialogue(p);}await reload(p);await action(p,'ch2-encounter');await dialogue(p);await choose(p,'forestArgument','A');await choose(p,'forestConflict','B');await p.locator('[data-option="'+response+'"]').click();await dialogue(p);await p.locator('[data-item="rights"]').click();await action(p,'ch2-finish');}
async function corvee(p,response='go',sacrifice='grain',plan=['grain','fence','feed']){await p.locator('[data-scene="ch2_corvee"]').click();await dialogue(p);for(const id of plan)await p.locator('[data-task="'+id+'"]').click();await reload(p);await action(p,'ch2-plan-next');await dialogue(p);await p.locator('[data-option="'+sacrifice+'"]').click();await dialogue(p);await p.locator('[data-option="'+response+'"]').click();await dialogue(p);await choose(p,'corveeDefinition','B');await p.locator('[data-item="time"]').click();await action(p,'ch2-finish');}
async function dues(p,response='pay',extra='reserve'){await p.locator('[data-scene="ch2_dues"]').click();await dialogue(p);for(let i=0;i<10;i++){await p.locator('[data-card="sack-'+i+'"]').focus();await p.keyboard.press('Enter');await p.locator('[data-action="ch2-store"][data-store="'+(i<5?'food':i<8?'seed':'reserve')+'"]').click();if(i===4)await reload(p);}await action(p,'ch2-allocation-next');await dialogue(p);for(let i=0;i<3;i++)await p.locator('[data-action="ch2-sacrifice"][data-store="food"]').click();await dialogue(p);await p.locator('[data-option="'+response+'"]').click();await dialogue(p);await reload(p);assert.equal(Object.values((await saved(p)).chapter2.grain).filter(v=>v==='dues').length,response==='withhold'?2:3);await p.locator('[data-action="ch2-extra"][data-store="'+extra+'"]').click();await dialogue(p);assert.equal(Object.values((await saved(p)).chapter2.grain).filter(v=>v==='dues').length,(response==='withhold'?2:3)+(extra==='refuse'?0:1));await p.locator('[data-item="supply"]').click();await action(p,'ch2-finish');}
async function assembly(p){await reload(p);await p.locator('[data-scene="ch2_assembly"]').click();await dialogue(p);await choose(p,'assemblyConnection','B');for(const pair of [['forest','dues'],['corvee','dues'],['bondage','movement']]){for(const id of pair){await p.locator('[data-card="'+id+'"]').focus();await p.keyboard.press('Enter');}await p.locator('[data-reason="voice"]').click();}await reload(p);await action(p,'ch2-links-next');await p.locator('[data-item="'+current.priority+'"]').click();await action(p,'ch2-priorities-next');await dialogue(p);for(const [id,opt]of [['forestDemand','B'],['corveeDemand','A'],['duesDemand','A']])await choose(p,id,opt);await action(p,'ch2-source');assert.equal(await p.locator('.source-image img').count(),1);await p.locator('[data-source-action="next"]').click();assert.match(await p.locator('.source-image img').getAttribute('src'),/seite_2/);await p.locator('[data-source-action="read"]').click();assert.match(await p.locator('.source-readable').innerText(),/dienstbarer Knecht/);assert.equal(await p.locator('.editorial-info').count(),0);await p.locator('[data-action="close-overlay"]').first().click();await choose(p,'lutherPoliticalInference','B');for(const [key,value]of Object.entries(current.composer))await p.locator('[data-demand="'+key+'"]').selectOption(value);await reload(p);await action(p,'ch2-compose');await dialogue(p);assert.match(await p.locator('body').innerText(),/Kapitel 3/);assert.equal((await saved(p)).chapter2.assemblyComplete,true);await geometry(p,'chapter 2 ending');assert.ok((await saved(p)).choices.playerDemand.length>20);}

async function sourceFour(p,label){
 await geometry(p,label);while(true){await p.waitForFunction(()=>[...document.querySelectorAll('.ch4-reader img')].every(i=>i.complete&&i.naturalWidth>0));const next=p.locator('[data-ch4-source="next"]');if(!await next.isEnabled())break;await next.click();}
 await p.locator('.ch4-reader [data-action="close-overlay"]').first().click();await p.locator('#overlay[open]').waitFor({state:'detached'});
}
async function chapterFour(p,r){
 await p.locator('[data-action="ch3-go"][data-scene="chapter4"]').click();await action(p,'ch4-start');
  const {width}=r;const reloads=new Set(),shots=new Set();let done=false;
  for(let n=0;n<350;n++){
   const game=await read(p),c=game.chapter4,s=c.stage;await geometry(p,r.id+' '+s);
   if(!shots.has(s)&&width===1024){await p.waitForFunction(()=>[...document.querySelectorAll('.chapter-four img')].every(i=>i.complete&&i.naturalWidth>0));await p.screenshot({path:`artifacts/chapter4/route-${r.id}-${s}.png`});shots.add(s);}
   if(['opening','authority','community','resistance','preparation','lords','regiments','theology','branch_effect','weingarten_choice','escalation','comparison','judgment','world_end'].includes(s)&&!reloads.has(s)){
    const before=await read(p);await p.reload();await action(p,'resume');assert.deepEqual(await read(p),before,r.id+' reload '+s);reloads.add(s);
   }
   if(game.dialogue){transcript.push(game.dialogue.lines[game.dialogue.index].text);await action(p,'dialogue-next');continue;}
   if(s==='world_end')assert.equal(c.endWorldState,r.end);
   if(s==='chapter5'){assert.equal(c.completed,true);assert.equal(c.handoff.endWorldState,r.end);assert.equal(c.handoff.lutherHarshTextJudgment,r.chapter4.ch4HarshJudgment);done=true;break;}
   if(c.feedback){await action(p,'ch4-feedback');continue;}
   if(game.interaction){const id=game.interaction.id,opt=r.chapter4[id]||{ch4Peasants:'A',ch4Boundary:'A',ch4Comparison:'B',ch4Early:'tension'}[id];assert.ok(opt,'missing '+id);await p.locator(`[data-choice="${id}"][data-option="${opt}"]`).click();continue;}
   const reader=p.locator('[data-action="ch4-read"]:visible');if(await reader.count()&&['ermahnung','lords','peasants','muentzer','weingarten','harsh','comparison'].includes(s)&&!c.docRead[s]){await reader.first().click();await sourceFour(p,r.id+'-'+s);continue;}
   if(s==='preparation'){
    for(const id of ['c4_memory','c4_authority'])if(!c.docRead[id]){await p.locator(`[data-document="${id}"]`).click();await sourceFour(p,r.id+'-'+id);}
    if(!c.preparationPairs.length){await p.locator('[data-action="ch4-thought"][data-item="freedom"]').click();await p.locator('[data-action="ch4-thought"][data-item="order"]').click();await action(p,'ch4-pair');}await p.locator('[data-action="ch4-go"][data-scene="opening_effect"]').click();continue;
   }
   if(s==='memory'){if(!c.memoryRead){await action(p,'ch4-memory');assert.ok((await p.locator('.notebook-content').textContent()).includes(game.choiceTexts.initialFreedomInterpretation));await p.locator('#overlay [data-action="close-overlay"]').click();}await p.locator('[data-scene="early"]').click();continue;}
   if(s==='regiments'){
    for(const zone of ['boundary','worldly','both','boundary','both']){
     await p.locator(`[data-action="ch4-classify"][data-zone="${zone}"]`).click();await p.locator('[data-action="ch4-case-reason"][data-reason="sphere"]').click();await action(p,'ch4-case-next');
    }
    for(const id of ['A','B','D'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await action(p,'ch4-synthesis');await p.locator('[data-scene="boundary"]').click();continue;
   }
   if(s==='interpretations'){for(let i=0;i<5;i++)await p.locator(`[data-action="ch4-criterion"][data-index="${i}"]`).click();await p.locator('[data-scene="theology"]').click();continue;}
   if(s==='conditions'){for(const id of ['services','voice'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await action(p,'ch4-conditions-next');continue;}
   if(s==='hermeneutics'){for(const id of ['context','contradiction'])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await action(p,'ch4-hermeneutics-next');continue;}
   if(['lords','peasants_complement','structure'].includes(s)){for(const id of {lords:['B','C'],peasants_complement:['B','D'],structure:['A','B','D','E']}[s])await p.locator(`[data-action="ch4-multi"][data-item="${id}"]`).click();await action(p,'ch4-check');continue;}
   if(s==='analysis'){await action(p,'ch4-analysis');continue;}
   const limit=p.locator('[data-action="ch4-limit"]');if(await limit.count()){await limit.click();continue;}
   if(await p.locator('[data-action="ch4-choice"]').count()){await action(p,'ch4-choice');continue;}
   if(await p.locator('[data-action="ch4-route-go"]').count()){await action(p,'ch4-route-go');continue;}
   const next=p.locator('[data-action="ch4-go"]:visible');assert.ok(await next.count(),'stuck '+s);await next.first().click();
  }
 assert.equal(done,true,'whole route chapter 4 incomplete '+r.id);await reload(p);
 await photo(p,r.id+'-chapter4-end');
}

async function chapterFive(p,r){
 await action(p,'ch5-start');let done=false;const reloads=new Set(),shots=new Set();
 for(let n=0;n<300;n++){
  const g=await read(p),c=g.chapter5,s=c.stage;await geometry(p,r.id+' ch5 '+s);
  if(!shots.has(s)){await photo(p,r.id+'-chapter5-'+s);shots.add(s);}
  const key=s+':'+c.phase+':'+c.step;
  if(['intro','theological_arguments','three_reports','prisoner_scene','religion_functions','luther_balance','troops_approach','after_crisis','chapter6'].includes(s)&&!reloads.has(key)){await reload(p);reloads.add(key);}
  if(s==='chapter6'){assert.equal(c.completed,true);assert.ok(c.handoff.chapter5.endWorldState);assert.equal(c.handoff.initialFreedomInterpretation,r.first);done=true;break;}
  if(g.dialogue){transcript.push(g.dialogue.lines[g.dialogue.index].text);await action(p,'dialogue-next');continue;}
  if(c.feedback){await action(p,'ch5-feedback');continue;}
  const config={A:{ch5Condition:'community_representation',ch5Prisoner:'hand_to_council',ch5Freedom:'responsibility'},B:{ch5Counsel:'protect_people',ch5Prisoner:'protect_detention',ch5Freedom:'complex'},C:{ch5First:'stop_dues',ch5Dues:'block_only',ch5Prisoner:'release',ch5Freedom:'resistance'},D:{ch5Prisoner:'protect_detention',ch5Freedom:'theological_freedom'}}[r.id];
  if(await p.locator('[data-action="ch5-choose"]').count()){const map={peasant_camp:'ch5First',dues_cart:'ch5Dues',negotiation_room:'ch5Condition',community_counsel:'ch5Counsel',prisoner_scene:'ch5Prisoner',neighbor_love:'ch5Neighbor',freedom_after_action:'ch5Freedom'};await p.locator(`[data-action="ch5-choose"][data-option="${config[map[s]]||'B'}"]`).click();continue;}
  if(s==='theological_arguments'){if(await p.locator('[data-action="ch5-begin-arguments"]').count())await action(p,'ch5-begin-arguments');else if(c.step===4)await action(p,'ch5-task-next');else await p.locator(`[data-action="ch5-field"][data-item="${c.phase==='limit'?'limit':'help'}"]`).click();continue;}
  if(s==='polarization_analysis'){if(c.step===2)await action(p,'ch5-task-next');else await p.locator('[data-action="ch5-field"]').first().click();continue;}
  if(s==='three_reports'){if(!c.phase)await action(p,'ch5-reports-read');else if(c.step===5)await action(p,'ch5-task-next');else await p.locator(`[data-action="ch5-report"][data-item="${c.step<3?'certain':'uncertain'}"]`).click();continue;}
  if(s==='religion_functions'){if(!c.phase){for(const id of ['critique','limit'])await p.locator(`[data-action="ch5-function"][data-item="${id}"]`).click();}else await p.locator('[data-action="ch5-function"][data-item="legitimate"]').click();await action(p,'ch5-functions-next');continue;}
  if(s==='luther_balance'){await p.locator(`[data-action="ch5-luther"][data-item="${c.phase==='tension'?'revolt':'service'}"]`).click();await action(p,'ch5-luther-next');continue;}
  if(s==='internal_debate'){await p.locator(`[data-action="ch5-debate"][data-item="${c.phase==='danger'?'konrad':'peter'}"]`).click();await action(p,'ch5-debate-next');continue;}
  if(s==='troops_approach'){assert.equal(c.openingPath,{A:'negotiation',B:'theological_council',C:'peasant_band',D:'religious_conflict'}[r.id]);await p.locator(`[data-action="ch5-final"][data-item="${{A:'negotiate_village_protection',B:'protect_people',C:'stay_with_band',D:'reject_divine_certainty'}[r.id]}"]`).click();continue;}
  if(await p.locator('[data-action="ch5-next"]').count()){await action(p,'ch5-next');continue;}
  throw Error('No genuine-route continuation '+s);
 }
 assert.equal(done,true,'Chapter 5 full route '+r.id);await reload(p);
 await action(p,'notebook');await p.locator('[data-tab="action"]').click();await photo(p,r.id+'-notebook5');await click(p,'close-overlay');
}

let current;
(async()=>{server.listen(4188,'127.0.0.1');const b=await chromium.launch({channel:'msedge',headless:true});try{
 const routes=[
 {id:'A',width:1024,height:768,first:'freedom_different_kind',peter:'peter_god_first',forest:'legal_basis',corvee:'delay',dues:'question_basis',extra:'reserve',order:['forest','corvee','dues'],priority:'forest',composer:{subject:'0',rule:'0',voice:'1'},focus:'rights',demand:'B',religion:'hermeneutical_caution',print:'full',resistance:'negotiate'},
 {id:'B',width:820,height:640,first:'freedom_responsibility',peter:'peter_uncertain',forest:'community',corvee:'substitute',dues:'delay',extra:'food',order:['corvee','dues','forest'],priority:'dues',composer:{subject:'2',rule:'1',voice:'0'},focus:'church',demand:'A',religion:'critical_gospel',print:'summary',resistance:'collective_pressure'},
 {id:'C',width:1440,height:900,first:'freedom_no_obedience',peter:'peter_social_consequence',forest:'take',corvee:'refuse',dues:'withhold',extra:'refuse',order:['dues','forest','corvee'],priority:'corvee',composer:{subject:'1',rule:'2',voice:'0'},focus:'labor',demand:'D',religion:'worldly_transformation',print:'accusation',resistance:'open_resistance_possible'},
 {id:'D',width:1024,height:768,first:'freedom_different_kind',peter:'peter_god_first',forest:'leave',corvee:'go',dues:'pay',extra:'seed',order:['forest','dues','corvee'],priority:'forest',composer:{subject:'0',rule:'1',voice:'1'},focus:'church',demand:'C',religion:'hermeneutical_caution',print:'religious',resistance:'theological_clarification'}];
 const finals=[
 {options:{ch4Authority:'legal',ch4Theology:'luther_order',ch4Condition:'services',ch4Weingarten:'support_negotiation',ch4Escalation:'protect',ch4Risk:'both',ch4HarshJudgment:'excessive'},end:'negotiation_open'},
 {options:{ch4Community:'withhold_dues',ch4Theology:'gospel_critique',ch4Weingarten:'conditional_negotiation',ch4Escalation:'warn',ch4Risk:'unjust_order',ch4HarshJudgment:'contradictory'},end:'mobilized_community'},
 {options:{ch4Resistance:'block_storehouse',ch4Theology:'prophetic_resistance',ch4Band:'resistance_occupation',ch4Weingarten:'reject_retreat',ch4Escalation:'join',ch4Risk:'disorder',ch4HarshJudgment:'consistent'},end:'joining_peasant_band'},
 {options:{ch4Theology:'hermeneutical_caution',ch4Weingarten:'not_transferable',ch4Escalation:'verify',ch4Risk:'religious_certainty',ch4HarshJudgment:'defer_judgment'},end:'religious_polarization'}];
 routes.forEach((r,i)=>Object.assign(r,{chapter4:finals[i].options,end:finals[i].end}));
 const results=[];
 for(const r of routes){current=r;transcript=[];const context=await b.newContext({viewport:{width:r.width,height:r.height},hasTouch:r.id==='B'});const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',x=>{if(x.status()>=400)errors.push(x.url());});await p.goto(base);assert.equal(await p.locator('[data-action="resume"]').count(),0);await photo(p,r.id+'-start');await chapterOne(p,r);
 for(const station of r.order){if(station==='forest')await forest(p,r.forest);if(station==='corvee')await corvee(p,r.corvee,'grain');if(station==='dues')await dues(p,r.dues,r.extra);await photo(p,r.id+'-hub-after-'+station);assert.equal(await p.locator('.wood-trace').count(),(await read(p)).chapter2.forestComplete&&r.forest==='take'?1:0);}
 await assembly(p);await photo(p,r.id+'-chapter2-end');const {focus,demand,religion,print,resistance}=r;
await click(p,'ch3-start');await drain(p);await click(p,'ch3-go','[data-scene="hub"]');
  await click(p,'ch3-printer');assert.match(await p.locator('.spoken').innerText(),/Noch gibt es/);await drain(p);
  await click(p,'ch3-arrivals');await drain(p);await click(p,'ch3-memory');assert.match(await p.locator('#overlay').innerText(),/Was du aus deinem Dorf mitbringst/);assert.match(await p.locator('#overlay').innerText(),/Wir fordern/);await click(p,'close-overlay');await click(p,'ch3-go','[data-scene="entry"]');
  await choose(p,'ch3EntryFocus',focus);assert.equal((await read(p)).chapter3.entryFocus,focus);
  for(const pair of [['0','6'],['1','4','5']]){for(const id of pair)await click(p,'ch3-card',`[data-card="${id}"]`);await click(p,'ch3-cluster',`[data-reason="${pair[0]==='0'?'dependence':'rights'}"]`);}
  await click(p,'ch3-go','[data-scene="lotzer"]');await drain(p);await choose(p,'ch3Demand_'+focus,demand);await drain(p);await click(p,'ch3-document');
  const selected={labor:6,rights:5,church:1}[focus];for(const id of [selected,...(focus==='labor'?[7]:[]),3,12])await p.locator(`[data-article="${id}"]`).click();await p.screenshot({path:`artifacts/ch3-articles-${focus}.png`});await p.locator('[data-article-continue]').click();await p.locator('#overlay').waitFor({state:'hidden'});
  await click(p,'ch3-compare','[data-group="common"][data-index="0"]');await click(p,'ch3-compare','[data-group="differences"][data-index="0"]');await click(p,'ch3-comparison-next');await drain(p);
  for(const id of print==='accusation'?['A','D']:['B','C'])await click(p,'ch3-interpret',`[data-item="${id}"]`);await click(p,'ch3-workshop-next');await drain(p);
  await choose(p,'ch3Religion',religion);await drain(p);await choose(p,'ch3Print',print);assert.equal((await read(p)).chapter3.publicTone,{full:'nuanced',summary:'simplified',religious:'religious',accusation:'confrontational'}[print]);
  for(const card of ['ink','paper','form']){await click(p,'ch3-print-piece',`[data-card="${card}"]`);await click(p,'ch3-print-place','[data-zone="bed"]');}
  await click(p,'ch3-press');await p.waitForTimeout(800);await click(p,'ch3-print-piece','[data-card="finished"]');await click(p,'ch3-print-place','[data-zone="take"]');
  assert.equal((await read(p)).chapter3.printed,1);await reload(p);
  await p.waitForFunction(()=>JSON.parse(localStorage.getItem('1525.freedom.save.v1')).chapter3.printPhase==='done');
  assert.equal((await read(p)).chapter3.printed,4);await p.screenshot({path:`artifacts/ch3-press-${print}.png`});await click(p,'ch3-go','[data-scene="map"]');await click(p,'ch3-map-next');
  const expected={full:'Da steht mehr drin',summary:'Jetzt versteht jeder',religious:'Dann müssen wir auch',accusation:'Solche Worte'}[print];assert.match(await p.locator('.spoken').innerText(),new RegExp(expected));await drain(p);
  await choose(p,'ch3Resistance',resistance);await choose(p,'ch3Reason','burdens');await drain(p);const end=await read(p);assert.equal(end.chapter3.completed,true);assert.equal(end.chapter3.resistanceStrategy,resistance);await geometry(p,print);await reload(p);
 await photo(p,r.id+'-chapter3-end');await action(p,'notebook');await p.locator('[data-tab="path"]').click();assert.ok((await p.locator('.notebook-content').innerText()).includes((await read(p)).choiceTexts.initialFreedomInterpretation));await p.locator('[data-tab="village"]').click();assert.ok((await p.locator('.notebook-content').innerText()).includes((await read(p)).choices.playerDemand));await photo(p,r.id+'-notebook3');await click(p,'close-overlay');
 assert.equal((await read(p)).chapter3.completed,true);assert.ok((await read(p)).progress.completedScenes.includes('ch1_end'));
 await chapterFour(p,r);
 await chapterFive(p,r);
 const exportState=await p.evaluate(async()=>{const {state}=await import('./js/state.js');const {prepareConsequencesForEpilogue}=await import('./js/consequences.js');return prepareConsequencesForEpilogue(state);});assert.equal(exportState.decisions.forestResponse,r.forest);assert.equal(exportState.chapter3.resistanceStrategy,r.resistance);assert.equal(exportState.chapter4.endWorldState,r.end);assert.equal(exportState.chapter5Handoff.priorDemand,exportState.playerDemand);assert.equal(exportState.chapter4.lutherHarshTextJudgment,r.chapter4.ch4HarshJudgment);assert.equal(exportState.decisions.initialFreedomInterpretation,r.first);assert.equal(exportState.chapter6Handoff.chapter5.finalAction,exportState.chapter5.finalAction);assert.deepEqual(exportState.chapter6Handoff.chapter3,exportState.chapter3);assert.deepEqual(exportState.chapter6Handoff.chapter4,exportState.chapter4);assert.deepEqual(exportState.chapter6Handoff.perceptions,exportState.perceptions);assert.equal(exportState.chapter6Handoff.chapter5.freedomAfterAction,exportState.chapter5.freedomAfterAction);assert.deepEqual(errors,[]);results.push({route:r.id,viewport:{width:r.width,height:r.height},orientation:exportState.orientation,priorProfile:exportState.chapter3.priorProfile,decisions:exportState.decisions,chapter4:exportState.chapter4,chapter5Handoff:exportState.chapter5Handoff,chapter5:exportState.chapter5,chapter6Handoff:exportState.chapter6Handoff,perceptions:exportState.perceptions,transcript});console.log('PASS real new-game route '+r.id+' Chapters 1–5');await context.close();
 }
 assert.ok(results[0].orientation.legal>results[0].orientation.resistance);assert.ok(results[1].orientation.community>results[1].orientation.resistance);assert.ok(results[2].orientation.resistance>results[2].orientation.legal);assert.ok(results[0].transcript.some(x=>/Anspruch eigentlich beruht/.test(x)));assert.ok(results[1].transcript.some(x=>/Dorf gemeinsam/.test(x)));assert.ok(results[2].transcript.some(x=>/Holz trotzdem genommen/.test(x)));
 assert.equal(new Set(results.map(r=>r.chapter4.endWorldState)).size,4,'routes must have distinct visible endings');assert.equal(results[3].chapter4.theologicalPath,'hermeneutical_caution');
 assert.equal(new Set(results.map(r=>r.chapter5.openingPath)).size,4,'four distinct chapter 5 spaces from genuine prior decisions');
 fs.writeFileSync('artifacts/whole-game-routes.json',JSON.stringify(results,null,2));
 }finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
