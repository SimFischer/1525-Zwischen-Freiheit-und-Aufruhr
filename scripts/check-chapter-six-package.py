from pathlib import Path
from PIL import Image
import json,hashlib,zipfile
root=Path('\\\\?\\'+str(Path.cwd()))
m=json.loads((root/'chapter6_assets_manifest.json').read_text(encoding='utf-8'))
assert len(m['assets'])==24
assert {k:sum(a['type']==k for a in m['assets'])for k in ['backgrounds','props','ui']}=={'backgrounds':4,'props':6,'ui':14}
assert len(list((root/'assets/chapter6').glob('*/*.png')))==14 #12 assets +2 contact sheets
new=set()
for a in m['assets']:
 p=root/a['path'];im=Image.open(p)
 assert hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256'],a['filename']
 assert im.size==(a['dimensions']['width'],a['dimensions']['height'])
 if not a['aliasOf']and not a['reusedFrom']:
  new.add(a['path']);assert im.size==(1024,768),a['filename']
 if a['transparent']:
  assert im.mode=='RGBA'and im.getchannel('A').getextrema()==(0,255),a['filename']
 for region in a['textSafeArea']:
  assert region['fontSizePx']>=18 and not region['scrollAllowed']
  assert region['x']>=0 and region['y']>=0 and region['x']+region['width']<=100 and region['y']+region['height']<=100
assert len(new)==12
frame=Image.open(root/'assets/chapter6/ui/ch6_ui_memory_frame.png')
assert frame.getchannel('A').getpixel((512,384))==0
for c in m['canonReferences'].values():assert hashlib.sha256((root/c['asset']).read_bytes()).hexdigest()==c['sha256']
for c in m['additionalCanonReferences']:assert hashlib.sha256((root/c['path']).read_bytes()).hexdigest()==c['sha256']
for c in m['reusedAssets']:assert hashlib.sha256((root/c['path']).read_bytes()).hexdigest()==c['sha256']
qa=json.loads((root/'assets/chapter6/qa/results.json').read_text(encoding='utf-8'))
assert len(qa['cases'])==54 and all(c['pass']for c in qa['cases'])and not qa['errors']
archive=root/'exports/1525_kapitel6_assets_final.zip'
with zipfile.ZipFile(archive)as z:
 assert z.testzip()is None
 index=json.loads(z.read('chapter6_assets_final/package-files.json'))
 assert set(z.namelist())==set(index)|{'chapter6_assets_final/package-files.json'}
 for name,entry in index.items():
  data=z.read(name);assert hashlib.sha256(data).hexdigest()==entry['sha256'],name
  source=root/entry['source'];assert source.read_bytes()==data,name
 for a in m['assets']:assert 'chapter6_assets_final/'+a['path']in z.namelist(),a['filename']
print('PASS24 asset roles,12 unique new PNGs, real RGBA alpha, frame hole,18 Canon references,54 responsive cases and byte-identical ZIP.')
