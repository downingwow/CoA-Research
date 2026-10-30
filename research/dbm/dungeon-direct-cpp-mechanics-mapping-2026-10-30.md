# CoA dungeon boss implementation mapping — direct C++ verification (2026-10-30)

## Sources inspected
- [AscensionDeadminesBosses.cpp](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/AscensionDeadminesBosses.cpp)
- [CoADungeonBossSpells.cpp](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoADungeonBossSpells.cpp)
- Preserved SQL: `research/dbm/coa-dungeon-boss-source-sql-2026-10-30.json`

**These are upstream source implementations, not proof of deployment on current Conquest Reborn.**

## Resolved / clarified
### Deadmines: Bouncing Saw Blade and buzzing saws
- `CoADungeonBossSpells.cpp` class `spell_coa_bouncing_saw_blade` limits **spell 2102559** (binding from SQL) to **one target below DUNGEON_DIFFICULTY_EPIC** or **three targets at/above DUNGEON_DIFFICULTY_EPIC**. This is difficulty-based target selection, not a cast timer.
- `AscensionDeadminesBosses.cpp` declares `NPC_SNEEDS_SHREDDER = 642`, `NPC_SNEED = 643`, and `SawBosses = {642,643}`. The **buzzing saw hazard AI** attaches to an in-combat nearby Shredder or Sneed (80-yard search); it does **not prove which NPC casts Bouncing Saw Blade 2102559**.
- Hazard spell `SPELL_BUZZING_SAW_BLADE = 2102564`. Orbit AI uses 250 ms movement ticks, a 6–10 second dip delay, and 4 second dip duration; **these are hazard motion timings, not boss cooldowns**.
- `NPC_CAPTAIN_GREENSKIN = 647` is declared alongside `SPELL_BUSTER_CALL_CIRCLE = 2102591`, `SPELL_BUSTER_CALL_CANNONBALL = 2102592`, and `SPELL_ASCENSION_POISONED_HARPOON = 2102585`; presence in the same enum does not alone prove a cast attribution.

### Blackfathom Deeps: Ghamoo-ra
- SQL registers **2102687** to `spell_coa_torrent_spin`; the C++ contains an `AuraScript` that starts, periodically turns and stops the caster during the effect. **Ghamoo-ra attribution is from SQL comment**, not NPC-ID lookup in this C++ spell handler.

### Ragefire Chasm: Taragaman
- SQL binds **2102516–2102519** to `spell_coa_massive_fire_nova`.
- The C++ handler uses `EarthPillar = 663030` to filter protected targets by pillar geometry. **663030 is an environmental pillar creature, not a direct boss spell**.
- Taragaman attribution is from SQL comment; C++ spell handler is generic and does not hard-code his NPC ID.

### Wailing Caverns: Skum
- `spell_coa_skum_overrun` handles charge movement and repeated trample events, with 12 delayed hit checks spaced 150 ms apart. **These are impact sampling intervals, not an ability recast timer**. Spell ID binding and NPC-ID join require separate verification.

## Remaining blockers
1. Identify actual boss spell-casting AI for **2102559**, not just the saw hazard's associated boss list.
2. Confirm boss NPC IDs and spell bindings for Ghamoo-ra, Taragaman, Skum.
3. Read Vaults boss AI file(s) after locating their actual repository paths (guessed `src/server/scripts/Custom/coa_vaults_of_the_inquisition.cpp` does not exist).
4. Verify the source's intended difficulty enums and deployed behavior before making timer recommendations.
5. Continue extracting NPC-to-spell joins from additional CoA boss scripts.

No addon code changed.
