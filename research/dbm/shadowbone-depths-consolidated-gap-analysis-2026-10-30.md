# Shadowbone Depths — consolidated evidence and missing-data matrix (2026-10-30)

## Evidence grade
**Confirmed in upstream quest SQL** is not the same as **verified live on Conquest Reborn**. This report combines the two prior audits without inferring combat mechanics.

## Identity and status
- Shadowbone Depths, Pale Reach / Scadeald; quest **175126** says enter the dungeon and defeat **Morgwena** before her ritual finishes.
- Quest giver and ender **Deirdre NPC 164355**, as assigned in upstream `rev_20261017_63_pale_reach_shadowbone_depths_sins_beyond_mercy_givers.sql`.
- **Morgwena** is the narrative antagonist/quest target; **boss creature ID unknown**.
- Grimoire of Morgwena object **2300695**, associated with prior quest **175125**; not established as a dungeon drop.
- Public roadmap previously labeled **Pale Reach 19/19, in progress**, with provisional target **2026-10-30–2026-11-08**. Treat as time-sensitive, not a confirmed launch.
- Magical wards and caverns west of Deirdre are narrative location clues; **no map ID, portal coordinates or instance template confirmed**.

## Documented related quests
| ID | Name | Relation |
|---|---|---|
| 175118 | A Renegade Witch | Deirdre, Rockrend captives |
| 175119 | Morgwena's Hushed Ones | outdoor Hushed Ealdir, not dungeon trash evidence |
| 175120 | Great Stag Blessing | amulet/wards |
| 175121 | Death to the Rook | Serenya narrative |
| 175124 | The Assassination That Wasn't | ring returned to Deirdre |
| 175125 | Grimoire of The Witch Mother | grimoire retrieval; preceding quest |
| 175126 | Shadowbone Depths | enter dungeon, defeat Morgwena |

Other lore-associated NPCs **164043 Jagged Cave Ealdir**, **164004 Wild Ealdir** are **not verified dungeon spawns**. The Darkened, Hushed Ealdir, sacrificed spirits and Rooted Shadow are narrative references only, not a verified encounter roster.

## Missing-data matrix (priority)
| Priority | Field | Current evidence | Required verification |
|---|---|---|---|
| P0 | Instance map ID / difficulty IDs | Missing | instance_template, map metadata or live /run map ID |
| P0 | Entrance portal and coordinates | Missing | game_tele/areatrigger or in-game position |
| P0 | Boss roster and order | Only Morgwena named as quest target | creature spawn+template+encounter scripts |
| P0 | Morgwena NPC entry and ScriptName | Missing | creature_template + spawn/AI |
| P0 | Spell IDs / ability names | Missing | boss source or combat log |
| P0 | Timers and phase triggers | Missing | scheduler source or repeated live logs |
| P1 | Trash NPC IDs and abilities | Missing | map-filtered creature spawns + scripts |
| P1 | Difficulty-specific behavior | Missing | AI difficulty conditions and live verification |
| P1 | Boss loot and item IDs | Missing | creature_loot_template, item templates, live drops |
| P1 | Mechanics DBM alert priorities | Missing | confirmed spells, cast timings, target behavior |
| P2 | Achievements, quests and lockouts | Quest 175126 only | achievement/instance tables |
| P2 | Story encounter dialogue and RP timing | Quest narrative only | AI scripts and encounter observation |

## Sources
- Upstream quest SQL: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261009_61_pale_reach_quests.sql
- Quest giver/ender SQL: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261017_63_pale_reach_shadowbone_depths_sins_beyond_mercy_givers.sql
- Templates SQL: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261009_60_pale_reach_templates.sql
- Public roadmap: https://conquestreborn.com/roadmap.html
- Existing research: research/dbm/shadowbone-depths-source-dossier-2026-10-30.md and research/dbm/shadowbone-depths-quest-chain-evidence-audit-2026-10-30.md

## Next evidence collection
Search for new dungeon-specific SQL/C++ commits; once live, capture map ID, NPC entry IDs and combat logs for each difficulty. **No fabricated NPC IDs or timers, no addon modifications.**
