// Each checkpoint describes an existing scene and its immediate playable entry.
// New chapters can register prerequisites/reset handlers in admin-state.js.
const target=(id,label,scene,entry={})=>({id,label,scene,...entry});
export const adminChapterTargets = {
  1:[
    target('ch1_s1_intro','Einstieg / Taverne','ch1_s1_intro'),
    target('ch1_s2_document','Erstes Luther-Flugblatt','ch1_s2_document'),
    target('ch1_s3_interpretation','Erste Deutungsentscheidung','ch1_s3_interpretation',{choice:'initialFreedomInterpretation'}),
    target('ch1_s4_second_thesis','Zweiter Leitsatz','ch1_s4_second_thesis',{phase:'document'}),
    ...['peter','anna','jakob'].map(id=>target('ch1_'+id,id[0].toUpperCase()+id.slice(1),'ch1_s5_conversations',{conversation:id})),
    target('ch1_s5_conversations','Drei Perspektiven / Erkundung','ch1_s5_conversations'),
    target('ch1_s6_freedom_sorting','Sortieraufgabe','ch1_s6_freedom_sorting',{phase:'game'}),
    target('ch1_s6b_service','Dienst am Nächsten','ch1_s6b_service'),
    target('ch1_s6b_obedience','Gehorsam','ch1_s6b_obedience'),
    target('ch1_s6c_compare','Abschlussprüfung – Vergleich','ch1_s6c_compare'),
    target('ch1_s6c_inner','Abschlussprüfung – innere Freiheit','ch1_s6c_inner'),
    target('ch1_s6c_political','Abschlussprüfung – politische Freiheit','ch1_s6c_political'),
    target('ch1_s7_notebook','Notizbuch','ch1_s7_notebook'),
    target('ch1_s8_conclusion','Abschlussgespräch','ch1_s8_conclusion'),
    target('ch1_end','Kapitelende','ch1_end')
  ],
  2:[
    target('ch2_intro','Kapitelstart','ch2_intro'),
    target('ch2_hub','Dorf-Hub','ch2_hub'),
    target('ch2_forest','Wald – Exploration','ch2_forest'),
    target('ch2_forest_conflict','Wald – Konflikt','ch2_forest',{checkpoint:'forestEncounter',dialogue:'forestEncounter',after:'forestArgument'}),
    target('ch2_forest_argument','Wald – Argumentation','ch2_forest',{checkpoint:'forestArgument',choice:'forestArgument'}),
    target('ch2_forest_end','Wald – Abschluss','ch2_forest',{checkpoint:'forestReflect',stage:'reflect'}),
    target('ch2_corvee','Frondienst – Tagesplanung','ch2_corvee',{stage:'plan'}),
    target('ch2_corvee_interruption','Frondienst – Unterbrechung','ch2_corvee',{checkpoint:'corveeInterrupt',dialogue:'corveeInterrupt',after:'corveeSacrifice'}),
    target('ch2_corvee_decision','Frondienst – Entscheidung','ch2_corvee',{checkpoint:'corveeResponse',choice:'corveeResponse'}),
    target('ch2_corvee_securing','Frondienst – Sicherung','ch2_corvee',{checkpoint:'corveeDefinition',choice:'corveeDefinition'}),
    target('ch2_corvee_reflect','Frondienst – Reflexion','ch2_corvee',{checkpoint:'corveeReflect',stage:'reflect'}),
    target('ch2_dues','Abgaben – Ausgangsplanung','ch2_dues',{stage:'allocation'}),
    target('ch2_dues_first','Abgaben – erste Forderung','ch2_dues',{checkpoint:'duesFirst',dialogue:'duesFirst',after:'sacrifice'}),
    target('ch2_dues_extra','Abgaben – zusätzliche Forderung','ch2_dues',{checkpoint:'duesExtra',dialogue:'duesExtra',after:'extra'}),
    target('ch2_dues_reflect','Abgaben – Reflexion','ch2_dues',{checkpoint:'duesReflect',stage:'reflect'}),
    target('ch2_assembly','Dorfversammlung','ch2_assembly',{checkpoint:'assemblyIntro',dialogue:'assemblyIntro',after:'assemblyConnection'}),
    target('ch2_complaints','Beschwerdetisch','ch2_assembly',{checkpoint:'links',stage:'links'}),
    target('ch2_demands','Beschwerde → Forderung','ch2_assembly',{checkpoint:'forestDemand',choice:'forestDemand'}),
    target('ch2_luther','Luther-Rückgriff','ch2_assembly',{checkpoint:'lutherRecall',dialogue:'lutherRecall',after:'source'}),
    target('ch2_demand','Eigene Forderung','ch2_assembly',{checkpoint:'compose',stage:'compose'}),
    target('ch2_konrad','Konrad-Szene','ch2_assembly',{checkpoint:'assemblyPressure',dialogue:'assemblyPressure',after:'news'}),
    target('ch2_memmingen','Memmingen-Übergang','ch2_assembly',{checkpoint:'memmingenNews',dialogue:'memmingenNews',after:'end'}),
    target('ch2_end','Kapitelende','ch2_end',{checkpoint:'end'})
  ]
};

// Curated dramatic entry points for the regular admin overlay. Detailed targets
// above remain the canonical fixtures; later chapters add 3-5 nodes here.
export const adminMainTargets = {
  3:[{id:'ch3_hub',label:'Memmingen / Beschwerden'},{id:'ch3_articles',label:'Zwölf Artikel / Auslegung'},{id:'ch3_printshop',label:'Druckerei / Kapitelende'}],
  1: [
    {id:'ch1_s1_intro',label:'Kapitelstart / Taverne'},
    {id:'ch1_s6_freedom_sorting',label:'Luther-Freiheit / zentrale Aufgaben'},
    {id:'ch1_end',label:'Kapitelabschluss'}
  ],
  2: [
    {id:'ch2_hub',label:'Dorf-Hub'},
    {id:'ch2_corvee',label:'Alltag / Pflichtstationen'},
    {id:'ch2_assembly',label:'Dorfversammlung / Kapitelabschluss'}
  ]
};
