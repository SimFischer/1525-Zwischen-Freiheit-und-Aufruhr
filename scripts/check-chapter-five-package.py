from pathlib import Path
from PIL import Image
import hashlib,json,zipfile
root=Path('\\\\?\\'+str(Path.cwd()))
m=json.loads((root/'chapter5_assets_manifest.json').read_text(encoding='utf-8'))
expected={'backgrounds':10,'overlays':16,'props':13,'ui':4}
for kind,count in expected.items():
 assets=[a for a in m['assets'] if a['type']==kind]
 assert len(assets)==count,(kind,len(assets))
 for a in assets:
  p=root/a['path'];im=Image.open(p)
  assert im.size==((768,768)if kind=='props'else(1024,768)),a['filename']
  assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256'],a['filename']
  if kind in ['props','overlays']:
   assert im.mode=='RGBA' and im.getchannel('A').getextrema()[0]==0,a['filename']
   if kind=='overlays':
    visible=im.getchannel('A').point(lambda v:255 if v>16 else 0).getbbox()
    assert visible[3]<=568,(a['filename'],'important object in dialogue-safe area')
    assert a['preferredStaging']['required'],a['filename']
  else:assert im.mode=='RGB',a['filename']
for id,c in m['canonReferences'].items():assert hashlib.sha256((root/c['asset']).read_bytes()).hexdigest()==c['sha256'],id
assert len(m['scenes'])==10
qa=json.loads((root/'assets/chapter5/qa/results.json').read_text(encoding='utf-8'))
assert len(qa)==160 and all(r['pass']for r in qa)
package=root/'exports/chapter5_assets_final'
files=[p for p in package.rglob('*')if p.is_file()]
with zipfile.ZipFile(root/'exports/1525_kapitel5_assets_final.zip')as z:
 assert set(z.namelist())=={'chapter5_assets_final/'+p.relative_to(package).as_posix()for p in files}
 for p in files:assert p.read_bytes()==z.read('chapter5_assets_final/'+p.relative_to(package).as_posix()),p.name
for a in m['assets']:assert(root/a['path']).read_bytes()==(package/a['path']).read_bytes(),a['filename']
print('PASS:43 required PNGs, dimensions, hashes, genuine alpha, important-object safe areas, unchanged Canon,160 QA cases and ZIP equality.')
additions=json.loads((root/'chapter5_assets_additions.json').read_text(encoding='utf-8'))
for a in additions['assets']:
 p=root/a['path'];im=Image.open(p)
 assert im.size==(1024,768) and im.mode=='RGBA'
 assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256']
 alpha=im.getchannel('A');assert alpha.getextrema()==(0,255)
 assert list(alpha.point(lambda v:255 if v>16 else 0).getbbox())==a['preferredStaging']['visibleAlphaBounds']
 assert alpha.crop((0,568,1024,768)).getbbox() is None,'dialogue zone must be completely transparent'
 assert a['preferredStaging']['scale']==1 and a['preferredStaging']['left']==0 and a['preferredStaging']['top']==0
print('PASS supplementary wounded group: original hash, alpha, identity registration and dialogue-safe area.')
