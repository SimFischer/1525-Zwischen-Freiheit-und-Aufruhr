// Presentation only: the visible local world is derived from saved decisions and never stored.
export const endWorldLayers={violent_defeat:'after_defeat',negotiation_collapsed:'after_negotiation_collapse',civilians_protected:'after_protection',community_fragmented:'after_fragmentation',fragile_deescalation:'after_deescalation'};
const endVisuals={violent_defeat:'defeat',negotiation_collapsed:'negotiation_collapsed',civilians_protected:'protected',community_fragmented:'fragmented',fragile_deescalation:'fragile_deescalation'};
const pathVisuals={peasant_band:'mobilized',negotiation:'negotiation',theological_council:'council',religious_conflict:'polarized'};
// Visible escalation needs an explicit chapter-4 mobilization; earlier strategy and tone decide whether it hardened.
export function chapterFiveEscalated(g){const c3=g.chapter3||{},c4=g.chapter4||{},world=c4.endWorldState||c4.handoff?.endWorldState;
 if(world==='joining_peasant_band')return true;
 return world==='mobilized_community'&&(c3.resistanceStrategy==='open_resistance_possible'||c3.publicTone==='confrontational'||c4.escalationResponse==='join'||c4.weingartenResponse==='reject_retreat');
}
export function chapterFiveVisualState(g){const c=g.chapter5||{};
 if(c.endWorldState)return endVisuals[c.endWorldState];
 if(c.stage==='intro'||!c.openingPath)return chapterFiveEscalated(g)?'escalation':'calm';
 return pathVisuals[c.openingPath]||'calm';
}
