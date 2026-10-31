# Source audit — neeme22/azerothcore-343 (2026-10-30)

## Source identity and verified provenance
- Repository: https://github.com/neeme22/azerothcore-343
- **Default branch is `wotlk-3.4.3`, NOT `main`.**
- Inspected Git tree SHA `224bf11bebb265ab932fd851df14ab798e31cae2`, with **16,411 entries**, `truncated: false`. Tree-entry count includes directories and files, not 16,411 code files.
- GitHub repository description and README describe **AzerothCore (Playerbot branch) for WotLK Classic 3.4.3.54261 client**, keeping the world server on **3.3.5a** and bridging to the newer client.
- Repository metadata/root licensing: GPL-2.0, with separate licenses for constituent modules and TrinityCore gateway code; preserve original copyright and source licenses.
- README states work is **not finished** and asks for bug reports. Compilation, execution, gameplay reliability, CR compatibility, and trust/security have **not** been verified in this audit.

## Architecture explained by upstream
```text
3.4.3 client → bnetserver (1119, REST 8081) → 3.4.3 realm auth (8086)
3.4.3 client → worldgate (8086/8087) → 3.3.5 protocol → AzerothCore worldserver (8085)
```
- `bnetserver`: TrinityCore 3.4.3-derived Battle.net login alongside legacy AzerothCore accounts.
- `worldgate`: live protocol translation to 3.3.5 plus client hotfixes for items, spells and texts.
- 3.3.5a world-server data uses **DBC, maps, vmaps, mmaps**, while the gateway uses client **3.4.3 DB2** data. Never interchange table schemas or expect it to resolve Ascension-specific custom assets.
- Modern client required: exactly **3.4.3.54261**, launched via Arctium according to README; **no Blizzard client files shipped by project**.

## Examined repository inventory
- `src/server/game/Spells/`: 16 blob files counted in tree, useful for 3.3.5a spell/GCD/haste and cast-path comparative study.
- `src/server/scripts/`: 696 files, useful for encounter AI and boss mechanics reference—not evidence of live Conquest Reborn boss timings.
- `src/server/game/Handlers/`: 36 files.
- `src/server/game/Entities/`: 83 files.
- `modules/`: 1,856 blob files, including playerbot/Eluna/progression/spell-regulator modules described in README.
- `data/sql/`: 7,593 files, including 3.3.5a DBC-derived and world DB SQL, rather than CR-specific server content.
- `src/server/game/Server/`: 53 files.
- `gateway/`: worldgate code, its TrinityCore 3.4.3 integration, data extraction/hotfix generation.
- `contrib/aio/`: AIO 1.75 compatibility across server/client.
- `contrib/addons/Compat335/`: a compatibility helper for 3.3.5a addons on modern 3.4.3 clients.
- `.github/workflows/core-build-playerbots.yml` and other CI workflows show included build/test automation; no builds independently run here.

## Notable verified technical addon compatibility details
From `contrib/addons/Compat335/README.md`:
- Wrath addon TOC version `30403` with `## Dependencies: Compat335`; keep original 3.3.5a TOC separately.
- Frame backdrop / `BackdropTemplate` and `SetResizeBounds` change.
- Bag API moved to `C_Container`; addon messaging to `C_ChatInfo`.
- Model lighting `SetLight` arguments changed; `TryOn` item syntax and model load event changed.
- `PlaySound` must use modern `SOUNDKIT` constants.
- Addon chat sender names may include `-Realm`; use `Ambiguate(sender,"none")` where appropriate.
- Compat335 does **not** magically port arbitrary addons; some modifications must be made directly in each addon.
- This is **future-facing research** for Questie-X, LootCollector, DBM-CoA, AtlasLoot-CoA, Details-CoA, WeakAuras-CoA and others; current builds target 3.3.5a unless expressly changed.

## Item / spell compatibility and research leads
README names `gateway/trinitycore-343/src/server/worldgate/` scripts:
- `gen_hotfix_objetos_ac.py`: item hotfix records from `item_template` (ItemSparse/Item/ItemEffect).
- `gen_hotfix_extendedcost_ac.py`: currencies and item costs on vendors.
- `valida_hotfix_ac.py`: hotfix SQL checks.
- `gen_monturas.py` / `gen_auras_puntos.py`: mount and aura-related hotfix tables.
- Notes 3.4.3 `QualityModifier` and `Flags2` effects on item presentation.
- These could inform our CoA item catalog and future client-side data translation, but **are not evidence of a specific CoA item drop** (e.g., Boots of the Rotting Throne).

## Relationship to other recorded source projects
- https://github.com/lineagedr/3.4.3_Source — a separate TrinityCore-style 3.4.3 code reference, not CR server code.
- https://github.com/redscarf26/redscarf_proxy — standalone local Go-based 3.4.3-to-3.3.5a proxy.
- neeme22 combines AzerothCore 3.3.5 server, bnet auth, gateway, hotfix generation and addon compatibility tooling in one integrated development tree. Comparing these projects is useful for a **modern client feasibility study**, not proof that any is safe/working on Conquest Reborn.

## Explicit caveats and next research targets
1. **No validated connection to Ascension CR.** Private realm configuration, custom classes/races/spells, assets, encryption/auth, hotfixes and server-specific protocols may need substantial additional work; never present this as a drop-in modern CR client.
2. No claim of 64-bit CR compatibility or real performance improvement; newer client architecture is not in itself a working upgrade for CR.
3. Do not claim the repository's original AzerothCore SQL includes custom CoA content unless exact tables and provenance prove it.
4. Future comparison: GCD/haste logic in 3.3.5a versus 3.4.3, combat-log fidelity, packet handling, addon API shims, 3.3.5a-to-3.4.3 item hotfix mappings and custom character data.
5. Security: do not blindly run third-party launchers, credential gateways, binaries, or connect to live realms without permission and review.

**Audit status:** GitHub README, addon compatibility README, repository metadata, default branch and complete Git path tree inspected on 2026-10-30; implementation details beyond those cited remain to be validated.
