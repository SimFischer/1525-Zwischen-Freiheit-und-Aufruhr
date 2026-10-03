# Veraltete Kapitel-4-Kompositionen

Verbindliche aktive Zuordnung: `CH4_STAGING_GUIDE.md` und
`exports/chapter4_assets_final/manifest.json` → `scene_staging`.

Die fünf neuen Dorfdateien bleiben die Referenz. Die folgenden alten Dateien
werden ausschließlich archiviert und dürfen nicht in aktive Szenen eingeblendet
werden:

- `backgrounds/ch4_bg_manor_negotiation.png`
- `backgrounds/ch4_bg_jakob_study_table.png`
- `backgrounds/ch4_bg_village_assembly_large.png`
- `backgrounds/ch4_bg_village_edge_group.png`
- `backgrounds/ch4_bg_village_escalation.png`
- `overlays/ch4_overlay_delegation.png`
- `overlays/ch4_overlay_withheld_dues.png`
- `overlays/ch4_overlay_public_meeting.png`
- `overlays/ch4_overlay_resistance_group.png`
- `overlays/ch4_overlay_smoke_distance.png`
- `overlays/ch4_overlay_refugees_cart.png`
- `overlays/ch4_overlay_armed_group.png`
- `overlays/ch4_overlay_religious_polarization.png`
- `overlays/ch4_overlay_events_moved_without_you.png`
- `props/ch4_prop_warning_notice.png`
- `props/ch4_prop_bible_open.png`
- `props/ch4_prop_letters_other_villages.png`

Auch die frühere Vier-Gruppen-Dorfkomposition ist veraltet:

- `overlays/ch4_overlay_village_nuanced.png`
- `overlays/ch4_overlay_village_simplified.png`
- `overlays/ch4_overlay_village_religious.png`
- `overlays/ch4_overlay_village_confrontational.png`

Ihre Exportkopien liegen getrennt unter `exports/chapter4_retired_village/`.
Die Originaldateien bleiben zur Nachvollziehbarkeit erhalten. Der Runtime-Test
prüft, dass keine der im Manifest als legacy gelisteten Dateien geladen wird.
