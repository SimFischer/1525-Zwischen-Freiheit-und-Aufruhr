"""Validate the chapter-four delivery; requires Pillow, no gameplay changes."""
import hashlib, json, sys, zipfile
from collections import Counter
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parent.parent
if sys.platform=='win32':root=Path('\\\\?\\'+str(root))
package=root/'exports/chapter4_assets_final'
m=json.loads((package/'manifest.json').read_text(encoding='utf-8'))
assert len(m['assets'])==57
assert Counter(a['relative_path'].split('/')[0] for a in m['assets'])==dict(backgrounds=7,overlays=15,characters=6,portraits=6,props=9,documents=11,ui=3)
seen=set()
required={'filename','relative_path','type','scene','purpose','new_or_reused','expected_dimensions','transparency','safe_area_notes','implementation_notes'}
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for a in m['assets']:
    assert required<=a.keys()
    rel=a['relative_path'];assert rel not in seen;seen.add(rel)
    p=package/rel;assert p.exists() and digest(p)==a['sha256'],rel
    with Image.open(p) as im:
        assert list(im.size)==a['expected_dimensions'],rel
        cat=rel.split('/')[0]
        if cat=='backgrounds':assert im.size==(1024,768) and im.mode=='RGB'
        else:
            assert im.mode=='RGBA' and a['transparency'] is True,rel
            alpha=im.getchannel('A');box=alpha.getbbox();assert list(box)==a['alpha_bbox'],rel
            l,t,r,b=box;assert min(l,t,im.width-r,im.height-b)>=4,rel
            assert alpha.getextrema()[0]==0,rel
            if cat=='overlays':
                assert im.size==(1024,768)
                assert alpha.crop((0,568,1024,768)).getbbox() is None,rel
                if any(n in rel for n in ['public_meeting','religious_polarization']):assert alpha.crop((355,0,670,768)).getbbox() is None,rel
            if cat=='characters':assert im.size==(512,896) and a['facing'] in ['left','right']
            if cat=='portraits':assert im.size==(512,512)
        for field in ['html_text_regions_percent','html_summary_regions_percent']:
            for l,t,r,b in a.get(field,[]):assert 0<l<r<100 and 0<t<b<100
assert {p.relative_to(package).as_posix() for p in package.rglob('*.png')}==seen
for a in m['reused_assets']:
    assert required<=a.keys()
    raw=(root/a['relative_path']).read_bytes()
    if a.get('hash_mode')=='normalized_lf':raw=raw.replace(b'\r\n',b'\n')
    assert hashlib.sha256(raw).hexdigest()==a['sha256'],a['relative_path']
assert {'peter','anna','jakob','Konrad','Matthes','Verwalter','Dorf_Hub','globale_Hotspots','Dialograhmen','Notizbuch','Zwoelf_Artikel'}<={a['scene'] for a in m['reused_assets']}
assert set(m['publicTone'])=={'nuanced','simplified','religious','confrontational'}
assert set(m['end_states'])=={'negotiation_open','mobilized_community','joining_peasant_band','religious_polarization','events_moved_without_you'}
for paths in m['end_states'].values():
    for rel in paths:assert (root/rel if rel.startswith('assets/') else package/rel).exists()
archive=root/'exports/1525_kapitel4_assets_final.zip'
if archive.exists():
    files={p.relative_to(package).as_posix():p for p in package.rglob('*') if p.is_file()}
    with zipfile.ZipFile(archive) as z:
        assert not z.testzip()
        assert set(z.namelist())=={'chapter4_assets_final/'+name for name in files}
        for name,p in files.items():assert z.read('chapter4_assets_final/'+name)==p.read_bytes(),name
print('PASS: 57 PNGs, dimensions, alpha margins, dialogue-safe overlays, paired-cluster center, manifest, canonical references'+(', ZIP byte equality.' if archive.exists() else '.'))
