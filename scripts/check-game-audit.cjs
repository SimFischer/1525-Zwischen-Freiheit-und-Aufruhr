// Every registered scene at the three requested viewports; separate fixtures supplement genuine whole-game routes.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
(async()=>{server.listen(4202,'127.0.0.1');const b=await chromium.launch({channel:'msedge',headless:true});fs.mkdirSync('artifacts/game-audit',{recursive:true});const rows=[],errors=[];try{
const p=await b.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:4202/');
const scenes=await p.evaluate(async()=>{return (await import('./data/scenes.js')).scenes;});
for(const [width,height]of [[1024,768],[820,640],[1440,900]]){await p.setViewportSize({width,height});for(const scene of scenes){
await p.evaluate(async id=>{const g=(await import('./js/admin-state.js')).prepareAdminStateForScene(id);g.consequences.adminScenario=null;localStorage.setItem('1525.freedom.save.v1',JSON.stringify(g));},scene.id);await p.reload();await p.locator('[data-action="resume"]').click();
await p.waitForFunction(()=>[...document.images].every(i=>i.complete));
const row=await p.evaluate(({scene,width,height})=>{const visible=n=>n.getBoundingClientRect().width>0&&n.getBoundingClientRect().height>0;return {scene:scene.id,width,height,actualScene:JSON.parse(localStorage.getItem('1525.freedom.save.v1')).scene,text:document.body.innerText,images:[...document.images].filter(visible).map(i=>({src:i.getAttribute('src'),alt:i.alt,loaded:i.naturalWidth>0})),buttons:[...document.querySelectorAll('button')].filter(visible).map(n=>({text:n.textContent.trim(),action:n.dataset.action,box:n.getBoundingClientRect().toJSON()})),horizontal:document.documentElement.scrollWidth>innerWidth};},{scene,width,height});
assert.equal(row.horizontal,false,scene.id+' '+width+' horizontal');assert.ok(row.images.every(i=>i.loaded),scene.id+' missing image');
await p.screenshot({animations:'disabled',path:`artifacts/game-audit/${scene.id}-${width}.png`});rows.push(row);
}console.log('PASS all '+scenes.length+' registered scenes '+width+'x'+height);}
assert.deepEqual(errors,[]);fs.writeFileSync('artifacts/game-audit/scenes.json',JSON.stringify(rows,null,2));
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
