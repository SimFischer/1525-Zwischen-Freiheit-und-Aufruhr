const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),server=require('./serve.cjs');
(async()=>{await new Promise(r=>server.listen(4193,'127.0.0.1',r));const b=await chromium.launch({channel:'msedge',headless:true});try{
 const p=await b.newPage();fs.mkdirSync('artifacts/ch4-source-scroll',{recursive:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:4193/');const docs=await p.evaluate(async()=>{const {chapterFourDocuments}=await import('/data/chapter-four-documents.js');return chapterFourDocuments;});let count=0;
 for(const [width,height] of JSON.parse(process.env.CH4_QA_VIEWPORTS||'[[1024,768],[820,640],[1440,900],[768,1024],[1024,1366]]')){await p.setViewportSize({width,height});for(const [id,doc] of Object.entries(docs))for(const page of doc.pages){
  await p.evaluate(async({id,page})=>{const {openChapterFourDocument}=await import('/js/chapter-four-documents.js');openChapterFourDocument(id,[page]);},{id,page});await p.waitForFunction(()=>[...document.querySelectorAll('.ch4-reader img')].every(n=>n.complete&&n.naturalWidth));
  const typography=await p.evaluate(async page=>{
   const {chapterFourPageText}=await import('/data/chapter-four-documents.js');
   const fields=[...document.querySelectorAll('.ch4-source-canvas section.ch4-source-text')];
   const unchanged=chapterFourPageText[page].every((group,i)=>group.every(text=>fields[i].textContent.includes(text)));
   const markers=[...document.querySelectorAll('.ch4-source-kind')].map(n=>({text:n.textContent,size:parseFloat(getComputedStyle(n).fontSize)}));
   const rgb=color=>color.match(/[\d.]+/g).slice(0,3).map(Number);
   const lum=rgb=>rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
   // Even a black blemish below the least-opaque paper wash remains light.
   const darkestPaper=[243,228,201].map(x=>x*(250/255));
   return {unchanged,markers,quotes:[...document.querySelectorAll('.ch4-source-quotation')].map(n=>getComputedStyle(n).fontStyle),fields:fields.map(n=>{const st=getComputedStyle(n);return {background:st.backgroundImage,contrast:(lum(darkestPaper)+.05)/(lum(rgb(st.color))+.05),size:parseFloat(st.fontSize),heading:parseFloat(getComputedStyle(n.querySelector('h2')).fontSize),padding:parseFloat(st.paddingLeft)};})};
  },page);
  assert.ok(typography.unchanged,page+' source wording changed');
  for(const f of typography.fields){assert.ok(f.background.startsWith('linear-gradient')&&f.contrast>=10&&f.size>=(page==='luther_comparison_frame'?18:20)&&f.heading>=25&&f.padding>=12,page+' paper/type readability');}
  for(const m of typography.markers)assert.ok(m.size>=16&&m.size<typography.fields[0].size,page+' source label hierarchy');
  if(page==='luther_freedom_small')assert.deepEqual(typography.quotes,['italic','italic']);
  await p.screenshot({path:`artifacts/ch4-source-scroll/${page}-${width}-reading-start.png`});

  for(const zoom of [false,true]){if(zoom)await p.locator('[data-ch4-source="zoom"]').click();const rows=await p.locator('.ch4-source-text').evaluateAll(ns=>ns.map(n=>{n.scrollTop=n.scrollHeight;return {font:parseFloat(getComputedStyle(n).fontSize),scroll:n.scrollTop,max:n.scrollHeight-n.clientHeight,height:n.clientHeight,content:n.textContent,overflow:getComputedStyle(n).overflowY,position:getComputedStyle(n).position,width:n.clientWidth};}));assert.ok(rows.length);for(const r of rows){assert.ok(r.font>=18&&r.height>=44&&r.content.length,JSON.stringify({page,width,zoom,row:r}));if(r.position==='static'){assert.equal(r.max,0);assert.ok(r.width>=200);assert.equal(r.overflow,'visible');}else{assert.ok(Math.abs(r.scroll-r.max)<=1);assert.equal(r.overflow,'auto');}}
   await p.locator('.ch4-reader-scroll').evaluate(n=>n.scrollTop=n.scrollHeight);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:`artifacts/ch4-source-scroll/${page}-${width}-${zoom?'zoom':'normal'}.png`});count++;
  }await p.locator('.ch4-reader [data-action="close-overlay"]').first().click();
 }}assert.deepEqual(errors,[]);console.log('PASS '+count+' source/zoom views: complete text,18px+, inner scroll regions reach their end; iPad landscape/portrait and desktop viewports.');
}finally{await b.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
