# Source audit — lineagedr/3.4.3_Source (2026-10-30)

## Identity and provenance
- Upstream: https://github.com/lineagedr/3.4.3_Source
- Observed default branch: `main`; observed tree SHA: `b864f5d8c4fde3765a6c3a9e0a02372fff97f593`.
- Upstream README calls this **World of Warcraft 3.4.3 source code**, formerly the author's **Wrathion** project (2025); author says development ceased and estimates about **70% playable**. This is a self-reported estimate, not a verification.
- Repo metadata indicates **GPL-2.0**; root `LICENSE` contains GNU GPL v2. Retain all copyright/license notices when incorporating code. `CMakeLists.txt` identifies the project as **TrinityCore**.
- GitHub recursive tree at inspection contained **3,058 entries** (not 3,058 necessarily source files), complete according to GitHub's `truncated: false`.
- This is **3.4.3 (Wrath Classic-era) infrastructure**, not the Conquest Reborn **3.3.5a** runtime or an Ascension custom-content database.

## High-value source paths observed
- `src/server/game/Spells/Spell.cpp`: spell-cast lifecycle; investigate cast rules, GCD, cooldowns and triggers.
- `src/server/game/Spells/SpellInfo.cpp` and `SpellMgr.cpp`: spell attributes, initialization, overrides, proc and classification machinery.
- `src/server/game/Spells/Auras/SpellAuras.cpp`: aura handling and haste-related effect infrastructure.
- `src/server/game/Loot/LootMgr.cpp`: loot template and generation implementation.
- `src/server/game/Entities/Item/ItemTemplate.cpp`: item-template logic and validity checks.
- `src/server/game/DataStores/DB2Stores.cpp`: DB2 data loading and field/model reference.
- `src/server/shared/DataStores/DB2DatabaseLoader.cpp`: DB2 database loader.
- `src/server/game/Maps/`: map and instance infrastructure.
- `src/server/game/Battlegrounds/`: PvP infrastructure.
- `src/server/scripts/`: 713 files under this path in the inspected tree, including scripts potentially useful as an *upstream design reference*, not evidence of Conquest Reborn's encounters.
- `dep/CascLib/`: CASC storage-related tooling appropriate for newer client asset formats (different from 3.3.5a MPQ-based workflows).
- `CMakeLists.txt` and `cmake/`: build configuration.

## Appropriate uses within CoA-Research
1. **Comparative server mechanics:** use 3.4.3 implementations to formulate tests of spell haste versus melee haste, GCD categories, triggered spells, item restrictions, combat events, and aura evaluation; compare against TrinityCore/AzerothCore 3.3.5a and actual CoA spell/DBC exports.
2. **DBM-CoA research:** reference encounter-script control flow, state machines, cooldown and spell cast semantics as engineering guidance, not as proof of live CR boss timing.
3. **AtlasLoot-CoA and item research:** learn loot-system schemas and item eligibility principles; **do not infer any CoA-specific drop location from generic source code**. For Boots of the Rotting Throne or other custom loot, require a matching loot table/item ID in CoA data, AtlasLoot actual tables, SQL, or live evidence.
4. **CoA client tooling:** distinguish CASC and DB2 structures in 3.4.3 from the 3.3.5a MPQ/DBC layouts; do not swap field offsets, numeric flags, classes, spell IDs or protocol formats without explicit mapping.
5. **Website documentation:** expose this as a **comparative code reference** with version, origin, confidence and licensing, never as an authoritative 3.3.5a/Conquest Reborn gameplay dataset.

## Verification and limitations
- Verified upstream repository metadata, README, root license, root CMake project declaration and full Git tree path inventory on 2026-10-30.
- Did **not** compile or run upstream; did **not** systematically review all 713 script files or import executable code into CoA-Research.
- No claim of CoA-specific classes, Ascension custom spell records, actual current server configuration, NPC drops, or player combat logs is implied by this source.
- **Research status:** cataloged and scoped; detailed cross-version comparisons and extractable mechanic findings remain to be derived individually and cited to precise upstream files/commit versions.
