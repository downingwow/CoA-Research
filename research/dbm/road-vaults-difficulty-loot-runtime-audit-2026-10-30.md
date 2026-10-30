# Road / Vaults difficulty loot runtime audit — 2026-10-30

## Source-backed finding

The upstream server explicitly enables dungeon loot difficulty substitution for **map 936 (Vaults of the Inquisition)** and **map 937 (Road to De Other Side)** in `src/server/game/Loot/DungeonLoot.h`. The logic applies only to creature/gameobject world loot on difficulty 1 (Heroic) or 2 (Mythic), and returns difficulty 0 for Normal or other maps. Quest-required items are never substituted. If a base item has no variant mapping, or the target item ID is zero, the base item is retained.

In `src/server/game/Loot/LootMgr.cpp`, `Loot::AddItem` calls `DungeonLoot::Resolve` **before** looking up the item template. An unresolved/nonexistent target item template leads to that item being skipped. The difficulty is selected from the source map and spawn mode only when the loot store is a creature or gameobject store.

### Implications

- Vaults has 27 base boss loot items and 27 Normal→Heroic/Mythic mappings in `rev_20261028_60_vaults_of_the_inquisition.sql`, so the server has a route to generate difficulty-specific boss loot.
- **Do not treat mapped IDs as proof items exist in the live item template store.** Their item names, types, class restrictions, and actual drop behavior still need validation.
- Road is explicitly eligible for the same substitution logic, but this **does not prove** that Road's creature loot rows or variant mappings exist. The Road loot source remains unresolved.
- `Chance=0` in the Vaults grouped loot SQL is not a zero-drop conclusion; evaluate group processing separately.
- This is upstream source behavior, not proof of deployment to live Conquest Reborn.

## References

- [DungeonLoot.h](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/game/Loot/DungeonLoot.h)
- [LootMgr.cpp](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/game/Loot/LootMgr.cpp)
- [Vaults SQL](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261028_60_vaults_of_the_inquisition.sql)
- [Loot harness](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/apps/coa-tests/dungeon_loot/harness.cpp)
