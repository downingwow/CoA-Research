# Shadowbone Depths — initial source and launch-status dossier (2026-10-30)

## Realm status — not yet released according to current public site
Conquest Reborn's public homepage labels **Shadowbone Depths** a **COMING DUNGEON** for Pale Reach, still in progress, with **target window 30 October–8 November**. The page says nothing is final until it ships. This is a target window, **not a verified launch date**.
Source: https://conquestreborn.com/

## Directly sourced quest and narrative
- **Quest 175126: Shadowbone Depths**. Objective: enter the dungeon and defeat **Morgwena** before her ritual completes. It follows **Grimoire of The Witch Mother (175125)** in the quest narrative.
- **Deirdre**, Scadeald Witch, **NPC 164355**, is the quest giver and turn-in NPC, confirmed by `rev_20261017_63_pale_reach_shadowbone_depths_sins_beyond_mercy_givers.sql`. **This does not mean Deirdre is a dungeon boss.**
- Morgwena is identified as the Coven's Grand Mother; her plan involves the **Rooted Shadow**, a dangerous spirit. Captives taken from Rockrend to the Shadowbone Depths are mentioned in Deirdre's dialogue. The caverns are described as **west of Deirdre** and protected by magical wards. The earlier quest **175125** involves recovering Morgwena's grimoire and overcoming magical protection.
- Deirdre's public NPC entry: https://db.ascension.gg/?npc=164355
- Quest records: https://db.ascension.gg/?quest=175126 and https://db.ascension.gg/?quest=175125
- Upstream SQL quest text: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261009_61_pale_reach_quests.sql
- Quest giver SQL: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261017_63_pale_reach_shadowbone_depths_sins_beyond_mercy_givers.sql
- Upstream creature template **164355 Deirdre**, SmartAI, and gameobject **2300695 Grimoire of Morgwena** in `rev_20261009_60_pale_reach_templates.sql`. These are quest assets, **not verified dungeon boss or loot assets**.

## Encounter data status
| Field | Status |
|---|---|
| Dungeon | Shadowbone Depths, Pale Reach |
| Availability | Coming, not confirmed live as of 2026-10-30 public homepage |
| Release target | 2026-10-30 to 2026-11-08, provisional |
| Quest | 175126 |
| Story antagonist / quest kill target | Morgwena |
| Confirmed boss creature ID | Unknown |
| Other bosses / encounter order | Unknown |
| Dungeon map ID / instance entrance coordinates | Unknown |
| Boss spells, cast timers, phase thresholds | Unknown |
| Normal/Heroic/Mythic mechanics | Unknown |
| Loot tables / achievements | Unknown |

**Critical distinction:** Morgwena is the explicit quest defeat target, but available evidence does not yet establish her dungeon creature ID, combat script, or whether other bosses precede her. Do not fabricate a complete boss roster or derive mechanics from narrative text.

## Research directions
1. Watch upstream CoA core for `Shadowbone`, `Morgwena`, `Rooted Shadow`, dungeon instance template, creature spawns and AI registration.
2. Cross-reference new SQL revisions against quest 175126 and Pale Reach zone IDs.
3. After release, collect NPC IDs, combat-log spell IDs, timings and difficulty from actual runs; then promote verified records to the canonical DBM dataset.
4. Keep this distinct from Frozen Reach, Karazhan Crypts, and Road to De Other Side.

No addon code changed. Source-only, launch and encounter status may change.
