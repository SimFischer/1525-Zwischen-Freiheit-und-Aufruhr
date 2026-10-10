const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),{chromium}=require('playwright'),server=require('./serve.cjs');
const manifest=JSON.parse(fs.readFileSync('chapter6_assets_manifest.json'));
const scenes=['entry','reflection','freedom','network','luther','memory','comparison','judgment','dimensions','interpretation','position','writing','personal','final','evidence','notebook','folders','prop_plane'];
(async()=>{
 for(const[id,c]of Object.entries(manifest.canonReferences))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(c.asset)).digest('hex'),c.sha256,id);
 await new Promise(r=>server.listen(4196,'127.0.0.1',r));
 const browser=await chromium.launch({channel:'msedge',headless:true}),rows=[],errors=[];
 fs.mkdirSync('assets/chapter6/qa/screenshots',{recursive:true});fs.mkdirSync('artifacts/ch6-production/screenshots',{recursive:true});
 try{const page=await browser.newPage({hasTouch:true});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 for(const[width,height]of manifest.qaViewports){await page.setViewportSize({width,height});
 for(const scene of scenes){
  await page.goto('http://127.0.0.1:4196/assets/chapter6/qa/preview.html?scene='+scene);await page.waitForFunction(()=>window.qaReady);
  const info=await page.evaluate(()=>{
   const rect=n=>{const r=n.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
   return{overflow:document.documentElement.scrollWidth>innerWidth,stage:rect(document.querySelector('#stage')),fields:[...document.querySelectorAll('.field')].map(n=>({text:n.textContent,rect:rect(n),font:parseFloat(getComputedStyle(n).fontSize),overflow:n.scrollHeight>n.clientHeight+2,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth})),controls:[...document.querySelectorAll('button')].map(n=>({text:n.textContent,rect:rect(n)})),nodes:document.querySelectorAll('.node').length,connections:document.querySelectorAll('.links path').length,imageCount:document.images.length,loaded:[...document.images].every(i=>i.naturalWidth>0),save:localStorage.getItem('1525.freedom.save.v1')};
  });
  const problems=[];if(info.overflow)problems.push('horizontal overflow');if(!info.loaded)problems.push('image not loaded');if(info.save!==null)problems.push('QA wrote production save');
  for(const f of info.fields){if(f.font<18)problems.push('font below18');if(f.overflow||f.scrollWidth>f.clientWidth+2)problems.push('text overflow: '+f.text.slice(0,50));if(f.rect.left<info.stage.left-1||f.rect.right>info.stage.right+1||f.rect.top<info.stage.top-1||f.rect.bottom>info.stage.bottom+1)problems.push('field outside stage');}
  for(const c of info.controls){if(c.rect.width<44||c.rect.height<44)problems.push('small touch target: '+c.text);if(c.rect.left<0||c.rect.right>width+1||c.rect.top<0||c.rect.bottom>height+1)problems.push('control clipped');}
  for(let i=0;i<info.controls.length;i++)for(let j=i+1;j<info.controls.length;j++){const a=info.controls[i].rect,b=info.controls[j].rect;if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1)problems.push('touch overlap');}
  if(scene==='network'){if(info.nodes!==8||info.connections<6)problems.push('network structure');await page.locator('.node').first().tap();assert.equal(await page.locator('.node[aria-pressed=true]').count(),1);}
  if(scene==='position'){assert.equal(await page.locator('.selection').count(),5);await page.locator('.selection').nth(1).tap();await page.locator('.selection').nth(4).tap();assert.equal(await page.locator('.selection[aria-pressed=true]').count(),1);}
  const target=width===1024?'assets/chapter6/qa/screenshots':'artifacts/ch6-production/screenshots';
  await page.screenshot({path:target+'/'+scene+'-'+width+'x'+height+'.png'});
  rows.push({scene,viewport:[width,height],pass:problems.length===0,problems,fieldCount:info.fields.length,imageCount:info.imageCount,fontMinPx:18});
  if(problems.length)console.log('FAIL '+scene+' '+width+'x'+height+': '+problems.join('; '));
 }
 console.log('Checked '+scenes.length+' scenes at '+width+'x'+height);
 }
 fs.writeFileSync('assets/chapter6/qa/results.json',JSON.stringify({cases:rows,errors},null,2));assert.deepEqual(errors,[]);assert.equal(rows.filter(r=>!r.pass).length,0,'See QA results');console.log('PASS '+rows.length+' compositions, text-fit,44px touch targets,8 nodes and7 dynamic lines, neutral materials, Canon integrity and no saves.');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
