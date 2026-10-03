// Asset-only review fixture. This does not implement chapter-four gameplay.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');
const server=require('./serve.cjs');
const m=JSON.parse(fs.readFileSync('exports/chapter4_assets_final/manifest.json','utf8'));
const prefix='exports/chapter4_assets_final/';
fs.mkdirSync('artifacts/ch4-qa',{recursive:true});
const sprite=n=>m.assets.find(a=>a.filename===n);
const actors=[sprite('ch4_char_local_preacher_talking.png'),sprite('ch4_char_authority_envoy_talking.png')];
const fig=(a,x)=>{const [w,h]=a.expected_dimensions,b=a.alpha_bbox,k=43/(b[3]-b[1]);return `<div class="actor" style="left:${x-(b[0]+b[2])/2*k*.75}%;top:${72-b[3]*k}%;width:${w*k*.75}%;height:${h*k}%"><span class="shadow" style="left:${b[0]/w*100}%;width:${(b[2]-b[0])/w*100}%;top:${b[3]/h*100}%"></span><img src="${prefix+a.relative_path}"></div>`;};
const styles=`body{margin:0;background:#302116;display:grid;place-items:center;min-height:100vh}.stage{width:min(100vw,calc(100vh * 4 / 3));aspect-ratio:4/3;position:relative;overflow:hidden}.bg,.overlay{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.actor{position:absolute}.actor img{position:relative;width:100%;height:100%;object-fit:fill}.shadow{position:absolute;height:2%;background:#28170d66;border-radius:50%;filter:blur(3px);transform:translateY(-50%)}.panel{position:absolute;bottom:1.5%;left:2%;width:96%;height:24.5%;overflow:auto;box-sizing:border-box;display:flex;flex-direction:column;padding:44px 20px 8px}.panel>.speaker-plaque{position:absolute;top:8px;left:20px;margin:0}.panel .dialogue-content{min-height:0;flex:1;height:auto}.panel .dialogue-footer{flex-shrink:0;height:48px;margin:0;padding-top:4px}.panel .portrait{height:100%;max-height:96px}.panel .portrait img{object-fit:contain}.panel .spoken{font-size:clamp(16px,2vw,22px)}button{min-width:44px;min-height:44px}.marker{position:absolute;top:5%}.marker:nth-child(1){left:7%}.marker:nth-child(2){left:43%}.marker:nth-child(3){right:7%}`;
const html=(body)=>`<base href="http://127.0.0.1:4188/"><link rel="stylesheet" href="css/base.css"><link rel="stylesheet" href="css/dialogue.css"><link rel="stylesheet" href="css/art-direction.css"><style>${styles}</style>${body}`;
const testText='Prüftext für Schriftgröße, Zeilenumbruch und internes Scrollen. Dies ist kein Kapitelinhalt. '.repeat(90);
(async()=>{
await new Promise(r=>server.listen(4188,'127.0.0.1',r));const b=await chromium.launch({channel:'msedge',headless:true});const p=await b.newPage();const errors=[],results=[];
p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
await p.goto('http://127.0.0.1:4188/');
const scenes=m.assets.filter(a=>a.relative_path.startsWith('backgrounds/')).map(a=>({id:a.filename,bg:prefix+a.relative_path}));
for(const a of m.assets.filter(a=>a.relative_path.startsWith('overlays/')))scenes.push({id:a.filename,bg:a.revision==='consequence_hub_v2'?m.overlay_anchor.source:m.previous_overlay_anchor.source,overlay:prefix+a.relative_path});
for(const [id,paths] of Object.entries(m.end_states))scenes.push({id,bg:paths[0].startsWith('assets/')?paths[0]:prefix+paths[0],overlay:paths[1].startsWith('overlays/')?prefix+paths[1]:null});
for(const viewport of [{width:1024,height:768},{width:820,height:640}]){
await p.setViewportSize(viewport);
for(const s of scenes){
const study=s.id.includes('jakob_study');const positions=study?[42,65]:s.overlay?[41,61]:[28,72];
await p.setContent(html(`<main class="room stage"><img class="bg" src="${s.bg}">${s.overlay?`<img class="overlay" src="${s.overlay}">`:''}${actors.map((a,i)=>fig(a,positions[i])).join('')}<nav id="markers"></nav><section class="dialogue-panel panel"><p class="speaker-plaque">Lokaler Prediger</p><div class="dialogue-content"><div class="portrait"><img src="${prefix}portraits/ch4_portrait_local_preacher_talking.png"></div><div class="speech"><p class="spoken">Prüfansicht für Gesprächsachse, Bodenkontakt und Bedienflächen.</p></div></div><div class="dialogue-footer"><span></span><button class="primary">Weiter</button></div></section></main>`));
await p.evaluate(async()=>{const {hotspot}=await import('/js/hotspots.js');document.querySelector('#markers').innerHTML=hotspot('Weg','qa',{kind:'path',classes:'marker'})+hotspot('Gespräch','qa',{kind:'action',classes:'marker'})+hotspot('Dokument','qa',{kind:'object',classes:'marker'});});
await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
const r=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,buttons:[...document.querySelectorAll('button')].map(n=>n.getBoundingClientRect().toJSON()),stage:document.querySelector('.stage').getBoundingClientRect().toJSON(),panel:document.querySelector('.panel').getBoundingClientRect().toJSON()}));
assert.equal(r.overflow,false);assert.ok(r.panel.y>=r.stage.y+r.stage.height*.73);
for(const q of r.buttons)assert.ok(q.height>=44&&q.width>=44&&q.left>=0&&q.right<=viewport.width&&q.bottom<=viewport.height);
await p.screenshot({path:`artifacts/ch4-qa/scene-${s.id}-${viewport.width}.png`});results.push({type:'scene',id:s.id,viewport,pass:true});
}
for(const a of m.assets.filter(a=>['document','ui'].includes(a.type))){
const regions=[...(a.html_text_regions_percent||[]),...(a.html_summary_regions_percent||[]),...(a.html_title_regions_percent||[])];
await p.setContent(html(`<style>.modal{width:96vw;height:94vh;overflow:auto;box-sizing:border-box}.paper{position:relative;width:92%;margin:0 auto}.paper img{width:100%;display:block}.text-region{position:absolute;font:18px/1.5 Georgia;color:#352318;overflow:auto;box-sizing:border-box}.secondary{display:flex;justify-content:center;gap:16px;margin:12px}.text-region p{margin:0}.secondary button{min-height:44px}</style><section class="modal"><div class="paper"><img src="${prefix+a.relative_path}">${regions.map(([l,t,r,b])=>`<div class="text-region" style="left:${l}%;top:${t}%;width:${r-l}%;height:${b-t}%"><p>${a.type==='ui'?'Fall / Auslegung':testText}</p></div>`).join('')}</div><nav class="secondary"><button>Zurück</button><button>Schließen</button></nav></section>`));
await p.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
const r=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,ratio:document.querySelector('.paper').offsetWidth/document.querySelector('.modal').clientWidth,regions:[...document.querySelectorAll('.text-region')].map(n=>({font:parseFloat(getComputedStyle(n).fontSize),width:n.clientWidth,height:n.clientHeight,scroll:n.scrollHeight,overflow:getComputedStyle(n).overflowY}))}));
assert.equal(r.overflow,false);assert.ok(r.ratio>=.88&&r.ratio<=.94);for(const q of r.regions){assert.ok(q.font>=18&&q.width>=44&&q.height>=35);if(a.type==='document')assert.ok(q.scroll>q.height&&q.overflow==='auto');}
await p.screenshot({path:`artifacts/ch4-qa/reading-${a.filename}-${viewport.width}.png`});results.push({type:'reading',id:a.filename,viewport,pass:true});
}
}
assert.deepEqual(errors,[]);fs.writeFileSync('artifacts/ch4-qa/results.json',JSON.stringify(results,null,2));await b.close();server.close();console.log(`PASS: ${results.length} composition/reading views; original dialogue + portrait + hotspots, 1024x768 and 820x640; 18px HTML text, 92% reading width, internal scrolling, no overflow or missing images.`);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
