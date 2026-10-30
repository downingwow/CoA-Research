# Frozen Reach and Karazhan Crypts — source identity audit (2026-10-30)

Status: **partial; no boss mechanics verified**. This note prevents unrelated source records being mistaken for CoA custom encounters.

## Frozen Reach
- Upstream `data/sql/updates/pending_db_world/rev_20261025_00_coa_custom_map_teleports.sql` contains `FrozenReach_908` on map **908** at (2116.67, 2150.00, 82.49), plus `Alvaencounter`, `KaukiVillage`, and `FrozenSepulcher` entries on the same map. These are teleport labels, **not verified boss NPCs or scripts**.
- Upstream base `game_tele.sql` separately contains `FrozenReach` on map **571** at (3180.09, 3923.03, 31.1576): a Northrend geographical teleport. **Do not conflate map 571 with custom map 908**.
- `modules/mod-manastorm-endless/src/ManastormClientUIFixes.cpp` references a Manastorm UI objective highlight. This is not evidence of Frozen Reach boss mechanics.
- Next evidence needed: map 908 instance template, creature spawn/creature_template associations, ScriptName bindings, encounter scripts, spell casts and difficulty conditions.

## Karazhan Crypts
- Targeted upstream repository searches returned standard Burning Crusade Karazhan scripts (`src/server/scripts/EasternKingdoms/Karazhan/`) but no independently identified custom Karazhan Crypts encounter script.
- Other projects contain a **Season of Discovery** Karazhan Crypts instance (map 2875), including BigWigs/LittleWigs references. This is **not evidence of CoA/Conquest Reborn content**, and its roster must not be imported automatically.
- Next evidence needed: CoA-specific map/instance identification, spawn and boss roster, AI registration, spell scripts, phase and difficulty schedules.

## Provenance
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261025_00_coa_custom_map_teleports.sql
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/base/db_world/game_tele.sql
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/modules/mod-manastorm-endless/src/ManastormClientUIFixes.cpp
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/tree/main/src/server/scripts/EasternKingdoms/Karazhan

Confidence: high for directly located source strings, **unknown** for live realm deployment and encounter mappings. No DBM addon code changed.
