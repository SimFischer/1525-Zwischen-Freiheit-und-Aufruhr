"""Run after check-dossier.cjs; inspect A4 text geometry and render grayscale QA pages."""
import json,re
from pathlib import Path
from pypdf import PdfReader
import pdfplumber,pypdfium2 as pdf
from PIL import Image,ImageOps,ImageDraw
root=Path('artifacts/dossier')
normal=lambda s:re.sub(r'\s+',' ',s).strip()
counts={}
for path in root.glob('*.pdf'):
 reader=PdfReader(path);counts[path.name]=len(reader.pages)
 extracted='\n'.join(re.sub(r'Luther\s*, Freiheit und Bauernkrieg 1525\s+\d+ / \d+','',p.extract_text()) for p in reader.pages)
 assert '\ufffd' not in extracted,path
 assert not reader.metadata.get('/Author'),path
 with pdfplumber.open(path) as doc:
  for i,page in enumerate(doc.pages):
   assert abs(page.width-595.28)<1 and abs(page.height-841.89)<1
   chars=[c for c in page.chars if c.get('text','').strip() and c['top']<789]
   assert chars,(path,i,'empty body page')
   for c in chars:
    assert c['x0']>=53 and c['x1']<=542.3 and c['top']>=46 and c['bottom']<=791,(path,i,c)
   # No heading is left alone at the foot of a page.
   bottom=max(c['bottom'] for c in chars);last=[c for c in chars if abs(c['bottom']-bottom)<1]
   assert not all('Bold' in c['fontname'] for c in last),(path,i,'orphan heading')
 if path.name.startswith('route-'):
  index=int(path.name.split('-')[1]);r=json.loads((root/('report-'+str(index)+'.json')).read_text(encoding='utf-8'))
  assert len(reader.pages)<=(9 if 'full' in path.name else 3),path
  texts=[r['freedomDefinition']['text'],r['judgment']['counterArgument']]
  if 'full' in path.name:texts +=[r['judgment']['text'],r['lutherComparison']['reasoning'],r['lutherComparison']['counterArgument']]+[e['text'] for e in r['theologicalNetwork']['explanations']]+[d['reasoning'] for d in r['judgment']['dimensions']]
  for value in texts:
   if value: assert normal(value) in normal(extracted),(path,value)
 if path.name=='long-full.pdf':assert 'Äußere Ordnung' in normal(extracted) and '„Gewissen“' in normal(extracted) and normal(extracted).count('Die Güte einer Forderung')==9
 if path.name in ['route-0-full.pdf','route-2-full.pdf','route-2-summary.pdf','long-full.pdf','partial-full.pdf','all-concepts-full.pdf']:
  thumbnails=[]
  for i,page in enumerate(pdf.PdfDocument(path)):
   image=ImageOps.grayscale(page.render(scale=1.3).to_pil()).convert('RGB');image.save(path.with_name(path.stem+'-'+str(i+1)+'.png'));image.thumbnail((298,421));thumbnails.append(image)
  sheet=Image.new('RGB',(894,451*((len(thumbnails)+2)//3)),'#ccc');draw=ImageDraw.Draw(sheet)
  for i,image in enumerate(thumbnails):sheet.paste(image,((i%3)*298,(i//3)*451));draw.text(((i%3)*298+5,(i//3)*451+422),str(i+1),fill='black')
  sheet.save(path.with_name(path.stem+'-contact.png'))
(root/'pdf-qa.json').write_text(json.dumps(counts,indent=2),encoding='utf-8')
print('PASS A4, margins, no blank pages/orphan headings, exact personal texts, metadata, Unicode and grayscale renders:',counts)
