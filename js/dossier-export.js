import {state} from './state.js';
import {buildTheologicalDossier} from './dossier-model.js';
import {generateTheologicalDossierPdf} from './dossier-pdf.js';
let url=null,activeToken=0;
export function openDossierExport(format,onClose){
 const token=++activeToken,dialog=document.querySelector('#overlay');if(url){URL.revokeObjectURL(url);url=null;}
 dialog.onclose=()=>{activeToken++;if(url){URL.revokeObjectURL(url);url=null;}onClose();};
 dialog.innerHTML=`<article class="ep-reader dossier-export"><h1 id="overlay-title">${format==='summary'?'Fachliche Zusammenfassung':'Theologisches Dossier'}</h1><p>Das PDF wird ausschließlich auf diesem Gerät erstellt. Diese optionalen Angaben werden nicht im Spielstand gespeichert.</p><form><label>Name (optional)<input name="name" autocomplete="off" maxlength="120"></label><label>Kurs (optional)<input name="course" autocomplete="off" maxlength="120"></label><p role="status" aria-live="polite"></p><div class="dossier-actions"><button type="submit">PDF erstellen und herunterladen</button><button type="button" data-close-export>Zurück zur Schlussseite</button></div></form></article>`;
 dialog.showModal();dialog.querySelector('input').focus();
 dialog.querySelector('[data-close-export]').onclick=()=>dialog.close();
 const form=dialog.querySelector('form');form.onsubmit=async event=>{event.preventDefault();const submit=form.querySelector('[type=submit]'),status=form.querySelector('[role=status]');submit.disabled=true;status.textContent='Dossier wird erstellt …';form.querySelector('a')?.remove();
 try{const report=buildTheologicalDossier(state,{name:form.elements.name.value,course:form.elements.course.value}),blob=await generateTheologicalDossierPdf(report,format);if(!dialog.open||token!==activeToken)return;if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=format==='summary'?'Luther_Bauernkrieg_Fachliche_Zusammenfassung.pdf':'Luther_Bauernkrieg_Theologisches_Dossier.pdf';link.textContent='PDF herunterladen';link.className='dossier-download';form.querySelector('.dossier-actions').prepend(link);status.textContent='Das PDF ist bereit. Du kannst es erneut herunterladen.';link.click();}
 catch(error){status.textContent='Das PDF konnte nicht erstellt werden. Deine Ergebnisse sind weiterhin gespeichert.';submit.textContent='Erneut versuchen';}finally{submit.disabled=false;}
 };
}
