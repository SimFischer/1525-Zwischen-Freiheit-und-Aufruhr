const fs=require('node:fs'),assert=require('node:assert/strict');
function validateRuntimeAssets(requests){
 const m=JSON.parse(fs.readFileSync('exports/chapter4_assets_final/manifest.json','utf8'));
 const intentionallyRetired=['withheld_dues','public_meeting','resistance_group','smoke_distance','refugees_cart','armed_group','religious_polarization','events_moved_without_you'].map(n=>`overlays/ch4_overlay_${n}.png`).concat(['props/ch4_prop_warning_notice.png','props/ch4_prop_dues_cart.png']);
 assert.deepEqual([...(m.retired_runtime_assets||[])].sort(),intentionallyRetired.sort(),'Only explicitly retired village compositions may be excluded');
 const retired=new Set(m.retired_runtime_assets);
 const missing=m.assets.filter(a=>!retired.has(a.relative_path)&&!requests.has(a.relative_path)).map(a=>a.relative_path);
 assert.deepEqual(missing,[],'unused active assets');
 for(const rel of Object.values(m.publicTone))assert.ok(requests.has(rel),'new world state unused: '+rel);
 assert.ok(requests.has('backgrounds/ch4_bg_village_consequence_hub.png'),'new master unused');
 console.log('PASS: every active runtime asset and all five village replacements requested; exactly ten retired compositions excluded.');
}
module.exports=validateRuntimeAssets;
if(require.main===module)validateRuntimeAssets(new Set(JSON.parse(fs.readFileSync('artifacts/chapter4/runtime-assets.json','utf8'))));
