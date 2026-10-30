# Dungeon difficulty source discovery

Source: Conquest-of-AzerothCore/azerothcore-wotlk-coa (upstream; live deployment unverified).

- docs/coa/vanilla-dungeon-difficulties.md
- src/server/coa/CoADungeonBossKit.cpp
- src/server/coa/CoADungeonBossSpells.cpp
- src/server/coa/CoADungeonSpellDamage.cpp
- src/server/coa/CoADungeonTuning.cpp
- src/server/coa/CoADungeonNormal.cpp
- src/server/game/Entities/Creature/DungeonHealth.h
- modules/mod-coa-mythic-plus/src/MythicPlus.cpp
- modules/mod-coa-mythic-plus/src/MythicPlusData.cpp
- data/sql/updates/pending_db_world/rev_20261009_65_dungeon_boss_difficulty_templates.sql
- data/sql/updates/pending_db_world/rev_20261016_10_dungeon_normal_spell_damage.sql
- data/sql/updates/pending_db_world/rev_20261028_60_vaults_of_the_inquisition.sql

Next: extract spell IDs, event timings, boss encounter mappings, health/damage difficulty overrides, and loot.
