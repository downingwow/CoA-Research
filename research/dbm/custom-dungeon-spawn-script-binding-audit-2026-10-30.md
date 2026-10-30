# Custom dungeon spawn and script binding audit — 2026-10-30

## Scope
Parallel targeted investigation of custom Frozen Reach map 908, CoA Karazhan Crypts, and source-to-canonical record completeness. **No new encounter boss NPC/spell binding verified in this pass.**

## Frozen Reach (map 908)
The upstream `rev_20261025_00_coa_custom_map_teleports.sql` registers `(908, 0, '', 1)` in `instance_template`, i.e. map 908 with parent 0, empty instance script, and mounts permitted. This only describes the instance template, not individual creature AI. Earlier map 908 teleports include Alvaencounter, FrozenReach_908, KaukiVillage and FrozenSepulcher. The 2026-10-26 updated teleport file includes revised coordinates for three names, omitting FrozenReach_908. Searches for `map 908`, `Alva`, `FrozenSepulcher`, and `Alvaencounter` did not return a directly linked spawn + template + ScriptName chain. Do not convert place labels into boss entries.

## Karazhan Crypts
Base world teleport `game_tele.sql` has `(233,-11069.7,-1795.77,53.7318,3.09641,0,'KarazhanCrypts')`. This is a map 0 location, **not** an encounter instance map or roster. Standard Karazhan raid scripts and Season of Discovery Karazhan Crypts are not CoA-specific evidence.

## Canonical data safeguards
- Road to De Other Side map 937 has three directly audited upstream boss scripts: Muzah 162711, Drak'math 162715, Chimeric Embryo 162716 (latter roster ID independently unbound to creature template).
- Frozen Reach and Karazhan Crypts remain explicit unresolved records with empty boss arrays, rather than speculative imports.
- To promote a custom boss to verified status require at least one linked `creature` spawn on the target map, `creature_template` entry, script registration/AI, or other unambiguous direct source. A live combat log can validate deployment and spell variants.

## Follow-up extraction queries (for full database dump)
```sql
SELECT c.guid,c.id1,c.map,c.position_x,c.position_y,c.position_z,ct.name,ct.ScriptName
FROM creature c LEFT JOIN creature_template ct ON ct.entry=c.id1
WHERE c.map=908 ORDER BY c.id1,c.guid;
SELECT map,parent,script,allowMount FROM instance_template WHERE map=908;
```
Schema column names must be checked against the actual exported database before execution.

## Sources
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261025_00_coa_custom_map_teleports.sql
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261026_00_coa_ascension_zone_teleports.sql
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/base/db_world/game_tele.sql

Confidence: high for source rows, unknown for current Conquest Reborn deployment.
