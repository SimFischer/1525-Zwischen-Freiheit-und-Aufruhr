const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');const assert=require('node:assert/strict');const server=require('./serve.cjs');const base='http://127.0.0.1:4185/';
(async()=>{server.listen(4185);const b=await chromium.launch({channel:'msedge'});try{
for(const width of [1024,820,1440])for(const touch of [false,true]){
 const ctx=await b.newContext({viewport:{width,height:width===1440?900:width===1024?768:640},hasTouch:touch});const p=await ctx.newPage();await p.goto(base+'?start=ch3_press&debug=true');
 const card=p.locator('[data-card="form"]'),img=card.locator('img'),from=await card.boundingBox(),source=await img.boundingBox(),target=await p.locator('[data-drop-zone="bed"]').boundingBox();const x=from.x+from.width/2,y=from.y+from.height/2,tx=target.x+target.width/2,ty=target.y+target.height/2;let client;
 if(touch){client=await ctx.newCDPSession(p);await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tx,y:ty}]});}else{await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(tx,ty,{steps:6});}
 assert.equal(await p.locator('.drag-ghost').count(),1);const ghost=await p.locator('.print-drag-ghost img').boundingBox();assert.ok(Math.abs(ghost.width-source.width)<1&&Math.abs(ghost.height-source.height)<1,JSON.stringify({ghost,source}));assert.equal(await p.locator('.print-drag-ghost img').evaluate(n=>getComputedStyle(n).objectFit),'contain');await p.screenshot({path:`artifacts/ch3-print-drag-${width}-${touch?'touch':'mouse'}.png`});
 if(touch)await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});else await p.mouse.up();assert.equal(await p.locator('.drag-ghost').count(),0);
 assert.equal(await p.evaluate(()=>JSON.parse(sessionStorage.getItem('1525.freedom.test.v1')).chapter3.printPhase),'ink');
 const next=await p.locator('[data-card="ink"] img').boundingBox();assert.equal(next.width,source.width);assert.equal(next.height,source.height);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);console.log('Print mouse/touch fixed-size ghost passed',width,touch);await ctx.close();
}
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
