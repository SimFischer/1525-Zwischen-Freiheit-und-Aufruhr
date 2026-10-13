const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{isUtf8}=require('node:buffer');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const f of ['index.html',...['js','data','api','css','scripts'].flatMap(walk)].filter(f=>/\.(html|js|cjs|json|css)$/.test(f))){const b=fs.readFileSync(f);assert.ok(isUtf8(b),f+' UTF-8');assert.ok(!b.toString('utf8').includes(String.fromCharCode(0xfffd)),f+' replacement character');}
assert.match(fs.readFileSync('index.html','utf8'),/charset=["']utf-8["']/i);
// Inspect the real OpenType character map, rather than assuming a loaded font
// contains every character (browser font fallback can conceal missing glyphs).
function glyphFor(buffer,cp){const u16=o=>buffer.readUInt16BE(o),u32=o=>buffer.readUInt32BE(o);let cmap;
 for(let i=0;i<u16(4);i++){const o=12+i*16;if(buffer.toString('ascii',o,o+4)==='cmap')cmap=u32(o+8);}
 assert.ok(cmap);for(let i=0;i<u16(cmap+2);i++){const o=cmap+4+i*8,platform=u16(o);if(platform!==0&&platform!==3)continue;const t=cmap+u32(o+4),format=u16(t);
  if(format===12){for(let j=0;j<u32(t+12);j++){const g=t+16+j*12,start=u32(g),end=u32(g+4);if(cp>=start&&cp<=end)return u32(g+8)+cp-start;}}
  if(format===4&&cp<=0xffff){const n=u16(t+6)/2,ends=t+14,starts=ends+n*2+2,deltas=starts+n*2,ranges=deltas+n*2;for(let j=0;j<n;j++){if(cp<u16(starts+j*2)||cp>u16(ends+j*2))continue;const delta=u16(deltas+j*2),range=u16(ranges+j*2);if(!range)return(cp+delta)&0xffff;const glyph=u16(ranges+j*2+range+2*(cp-u16(starts+j*2)));if(glyph)return(glyph+delta)&0xffff;}}
 }return 0;
}
for(const face of ['Regular','Bold']){const font=fs.readFileSync('assets/vendor/source-serif/SourceSerif4-'+face+'.ttf');for(const c of 'äöüÄÖÜß„“‚‘–—…’')assert.ok(glyphFor(font,c.codePointAt(0)),face+' missing '+c);}
console.log('PASS UTF-8 application files, HTML charset, German glyphs and punctuation in both local OFL print fonts');
