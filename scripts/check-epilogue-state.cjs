const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const {sanitizeEpilogue,epilogueBeats,epilogueSources,epilogueDuration}=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync('data/epilogue.js')).toString('base64'));
assert.equal(epilogueDuration,109);assert.equal(epilogueBeats.at(-1).duration,7);
assert.deepEqual(sanitizeEpilogue(null),{index:0,elapsed:0,paused:false,finished:false});
assert.deepEqual(sanitizeEpilogue({index:1,elapsed:999,finished:true}),{index:1,elapsed:4,paused:false,finished:false});
assert.equal(sanitizeEpilogue({index:NaN,elapsed:Infinity}).elapsed,0);
assert.equal(sanitizeEpilogue({index:999,elapsed:-8}).index,epilogueBeats.length-1);
assert.equal(epilogueSources.filter(s=>s.image).length,4);
for(const source of epilogueSources){assert.ok(source.url.startsWith('https:'));assert.ok(source.rights&&source.signature&&source.institution);assert.equal(source.type,'Zeitgenössische Quelle');if(source.image)assert.ok(fs.existsSync(source.image));}
console.log('PASS epilogue duration, bounded reload state, contemporary sources and four documented local originals');})().catch(e=>{console.error(e);process.exitCode=1;});
