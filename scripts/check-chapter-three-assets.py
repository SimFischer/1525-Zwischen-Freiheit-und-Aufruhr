"""Verify the chapter-3 production package; requires Pillow, no network."""
from pathlib import Path
from PIL import Image
from collections import Counter
import json
import hashlib
import zipfile

REPO = Path(__file__).resolve().parents[1]
ROOT = REPO / 'exports/chapter3_assets_final'
manifest = json.loads((ROOT / 'manifest.json').read_text(encoding='utf-8'))
new = [a for a in manifest['assets'] if a['new_or_reused'] == 'new']
assert len(new) == manifest['new_asset_count'] == 41
assert len({a['relative_path'] for a in new}) == 41
assert Counter(a['type'] for a in new) == Counter(background=4, character=8, portrait=8, prop=6, document=4, minigame=8, map=1, map_marker=2)
required = {'filename','relative_path','type','scene','purpose','new_or_reused','expected_dimensions','transparency','safe_area_notes','implementation_notes'}
for a in manifest['assets']:
    assert required <= a.keys(), a['filename']
    p = (ROOT if a['new_or_reused']=='new' else REPO) / a['relative_path']
    assert p.is_file(), p
    assert hashlib.sha256(p.read_bytes()).hexdigest() == a['sha256'], p
    with Image.open(p) as im:
        assert f'{im.width}x{im.height}' == a['expected_dimensions'], p
        im.load()
        if a['new_or_reused'] != 'new': continue
        if a['type']=='background':
            assert im.size==(1024,768) and not a['transparency']
        else:
            assert im.mode=='RGBA' and a['transparency'], p
            alpha = im.getchannel('A')
            assert alpha.getextrema()[0]==0 and alpha.getextrema()[1]>=250, p
            bbox = alpha.getbbox()
            assert list(bbox)==a['alpha_bbox'], p
            assert bbox[0]>=4 and bbox[1]>=4 and im.width-bbox[2]>=4 and im.height-bbox[3]>=4, ('edge clipping',p,bbox)
            if a['type']=='character': assert im.size==(512,896)
            elif a['type']=='portrait': assert im.size==(512,512)
            elif a['type']=='map': assert im.size==(1024,768)
            else:
                assert max(im.size)<=768, p
                assert (bbox[2]-bbox[0])/im.width>.7 and (bbox[3]-bbox[1])/im.height>.7, ('loose bounding box',p)
assert all((ROOT / 'chapter3' / d).is_dir() for d in ['backgrounds','characters','portraits','props','documents','minigames','maps'])
# Git does not retain empty directories; the deliverable ZIP does.
if (ROOT/'chapter3/overlays').exists(): assert not list((ROOT/'chapter3/overlays').iterdir())
reuse = {a['name']:a for a in manifest['reuse']}
assert {'Peter','Anna','Jakob','Konrad','Matthes','Dorf-Hub','Hotspot base assets','Dialogue UI','Portrait frame','Notebook','Primary/secondary button system','Global parchment/leather UI frames'} <= reuse.keys()
assert reuse['Matthes']['status']=='missing_in_supplied_canon_and_repository'
for a in manifest['reuse']:
    for p in a['repository_paths']: assert (REPO/p).is_file(), p
assert (ROOT/'README_ASSET_NOTES.txt').is_file()
archive = REPO/'exports/1525_kapitel3_assets_final.zip'
if archive.exists():
    with zipfile.ZipFile(archive) as z:
        assert z.testzip() is None
        assert 'chapter3_assets_final/chapter3/overlays/' in z.namelist()
        for p in ROOT.rglob('*'):
            if p.is_file(): assert z.read('chapter3_assets_final/'+p.relative_to(ROOT).as_posix())==p.read_bytes(), p
        files=[n for n in z.namelist() if not n.endswith('/')]
        assert len(files)==43
print('PASS: 41 PNGs, sizes, alpha, safe margins, compact object bounds, hashes, reuse paths, manifest and ZIP integrity. Matthes is explicitly missing; no replacement created.')
