# Live-content dungeon research priorities — 2026-10-30

Research focus now shifts to already playable Vanilla, TBC, and Wrath dungeon content; Road to De Other Side (937) and Vaults of the Inquisition (936) remain archived as a separate custom-dungeon workstream. Do not assume an upstream pending migration is already deployed.

## Vanilla 19-map baseline

The upstream [Vanilla dungeon difficulties](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/docs/coa/vanilla-dungeon-difficulties.md) document identifies 19 dungeon maps, 57 Normal/Heroic/Mythic combinations, 1,278 difficulty templates in 645 families, 999 loot variant families, and 1,756 creature health records. These are source-reported development counts, not independently observed live counts.

New machine-readable map roster: `research/dungeons/vanilla-19-map-coverage-and-source-baseline-2026-10-30.json`.

New corrective loot source index: `research/loot/vanilla-heroic-mythic-boss-loot-second-pass-2026-10-30.json`. It contains 1,902 parsed boss loot rows across 117 template entries, extracted from `rev_20261016_30_dungeon_boss_loot_and_marks.sql`. **Second-pass only:** do not mistake it for all boss loot in all 19 maps.

## Next evidence targets

1. Cross-reference the corrective boss loot entries against actual map and boss NPC associations; a creature template ID alone is insufficient to assign a map.
2. Recover original and later dungeon loot migrations, including difficulty variant families and shared reference pools, before claiming complete loot.
3. Build per-dungeon NPC/boss/encounter/spell registries; extract authored warning candidates and separate them from tested timings.
4. Validate item subclass/inventory slot and Ascension class/spec usability before proposing BiS.
5. Expand to TBC/Wrath maps and raid content with separate source and deployment status; do not apply Vanilla-specific difficulty assumptions to them.
6. Track live observations, combat logs, and item scans as stronger deployment evidence.

## Source provenance

- [Vanilla dungeon difficulty documentation](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/docs/coa/vanilla-dungeon-difficulties.md)
- [Corrective boss loot SQL](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261016_30_dungeon_boss_loot_and_marks.sql)
- [Loot runtime](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/game/Loot/LootMgr.cpp)
