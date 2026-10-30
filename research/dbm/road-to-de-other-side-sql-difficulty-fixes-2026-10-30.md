# Road to De Other Side — SQL difficulty, entrance and quest fixes (2026-10-30)

Upstream:
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261023_61_road_to_de_other_side_quests_entrance_health.sql
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261023_62_road_to_de_other_side_review.sql
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261029_85_coa_custom_dungeons_melee.sql

## New verified upstream bindings
- Road to De Other Side **map 937**.
- Entrance/exit location from `_61` SQL: **Sinister Lair - Road to De Other Side**, area trigger ID **8004**, destination map **937**, coordinates **(480.61,-232.172,173.47)**, orientation **4.15317**. These are *destination* coordinates; external entrance coordinates require independent inspection.
- Quest NPC **Adlazin 162933**, quest giver and ender for **1660083** and **1660084**.
- `_62` fixes 38 creature spawn records (**GUID 9370500–9370537**) to **spawnMask=7**; prior Normal-only spawns prevented the Chimeric Embryo from appearing in Heroic/Mythic.
- `_62` adds Heroic/Mythic spell script bindings, including Drak'math Death Beam **257048/257049**, Colossal Smash **257072/257073**, Embryo Runover **257078/257079/257081/257082**, spike hit **257162/257163**, and trash damage variants.
- `_62` removes `type_flags & 4` on three boss NPCs **162711,162715,162716** so Normal player-level scaling can apply; do not infer identical tuning on Heroic/Mythic.
- `_85` adds/adjusts boss and trash melee tuning per difficulty, based on source-described combat-log calibration; this is upstream implementation, not live confirmation.
- `_62` removes a Dungeon Finder disable entry for map 937; does not prove the dungeon is currently available on live Conquest Reborn.

## Loot status
The three examined Road SQL updates (`_61`, `_62`, `_85`) do **not** contain `creature_loot_template` inserts. No boss item list should be invented. Continue searching the initial dungeon SQL or archive by NPC IDs and map 937.

## Source provenance
All findings are verified in upstream SQL. Current Conquest Reborn deployment remains unverified. No addon modifications.
