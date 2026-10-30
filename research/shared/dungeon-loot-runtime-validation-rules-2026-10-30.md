# Shared dungeon loot runtime validation rules — 2026-10-30

Scope: reusable research checks for **all** Conquest Reborn dungeons and raids, with explicit map/difficulty eligibility required. Source: upstream AzerothCore-CoA implementation; live deployment not verified.

## Loader validation (`src/server/game/Loot/LootMgr.cpp`, `LoadDungeonLootVariants`)

The loader queries `WORLD_SEL_COA_DUNGEON_LOOT_VARIANT`. A base item is accepted only if its item template exists, its class is WEAPON or ARMOR, it does not start a quest, and it is not a quest-bonded item. Each Heroic/Mythic target is independently validated: item template exists, `Class`, `SubClass`, and `InventoryType` match the base, it does not start a quest, and it is not quest-bonded. Invalid targets are logged and skipped. A family is registered only if at least one valid target remains.

**Important:** This validates the item type and slot, not whether a particular CoA class/spec can equip it or whether it is best-in-slot.

## Loot creation (`src/server/game/Loot/LootMgr.cpp`)

`Loot::AddItem` substitutes via `DungeonLoot::Resolve` before item-template lookup. Only creature/gameobject world loot is eligible. Quest-required drops are not replaced. Missing variant mappings or zero targets fall back to the base item. The selected difficulty comes from the source map's spawn mode.

## Map allowlist (`src/server/game/Loot/DungeonLoot.h`)

At the inspected upstream revision, only map IDs **33, 34, 36, 43, 47, 48, 70, 90, 109, 129, 189, 209, 229, 230, 289, 329, 349, 389, 429, 936, 937** are explicitly eligible. The resolver returns zero difficulty outside the allowlist, including raids not listed here. **Do not assume the same substitution mechanism applies to every raid**; investigate raid-specific loot systems independently.

## Research checklist for every dungeon/raid

1. Confirm map ID and instance difficulty mapping.
2. Confirm the map is in the runtime allowlist or identify a different loot system.
3. Find actual creature/gameobject loot rows, including boss loot IDs and group rules.
4. Find base→Heroic/Mythic mappings.
5. Verify each item exists and weapon/armor class, subtype, and inventory slot agree.
6. Independently verify CoA class/spec eligibility and stats before using items in BiS.
7. Distinguish upstream source code and pending SQL from live deployment and combat/loot observations.

## Current Road/Vaults status

- Vaults (936): 27 base boss loot entries and 27 variant families present in examined pending SQL; runtime template existence/type matching **not yet checked against deployed DB**.
- Road (937): runtime allowlisted, but boss loot and variant rows remain unverified.
- Both: eligible in the inspected upstream runtime, **not proof of current live server behavior**.

Sources:
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/game/Loot/LootMgr.cpp
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/game/Loot/DungeonLoot.h
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261028_60_vaults_of_the_inquisition.sql
