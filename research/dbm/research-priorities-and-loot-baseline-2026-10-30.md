# CoA research checkpoint — 2026-10-30

## Scope and priorities
1. **Zul'Gurub**: only raid currently under active Conquest Reborn testing. Prioritize actionable DBM-CoA signals: NPC/encounter IDs, boss spell casts and auras, cooldown observations, phase transitions, summons, interrupts, dispels, and difficulty variants. Do not infer exact timers from historical spell names alone.
2. **Dungeons**: continue DBM encounter research after ZG, preserving wing and difficulty mappings.
3. Other raids: defer active mechanics investigation until requested.

## Loot source policy
- The user supplied **AtlasLoot-CoA v8.1.6** as the accepted authoritative research baseline for boss and shared loot, across all difficulties represented in that addon. Source project: https://github.com/downingwow/AtlasLoot-CoA
- Avoid duplicating loot-hunting work within DBM research. Loot is **not a DBM mechanic**.
- Preserve AtlasLoot's exact boss/item/difficulty associations. Where no table exists, record an absence rather than inventing drops. This is a research-source policy, not an independent historical verification of every drop.
- **Mythic+**: provisionally investigate keys **+2 through +20**. Item-level progression and end-of-run versus weekly reward differences are **not yet verified**. Do not assign retail item-level values without CoA evidence.

## Historical encounter mapping provenance
- Datamine source: https://github.com/srhinos/coa-datamine/tree/master/data/dungeons
- Zul'Gurub: map 309, 10 encounter groups across difficulty codes 0/1/2/3. NPC references: Jeklik 14517; Venoxis 14507; Mar'li 14510; Arlokk 14515; Thekal 14509; Hakkar 14834; Mandokir 11382; Jin'do 11380; Gahz'ranka 15114; Edge of Madness 15081.
- Historical dungeon mappings recovered in earlier research: Vaults of the Inquisition (map 936), Road to De Other Side (937), Blackrock Caverns (645), Blackrock Depths (230), Blackrock Spire (229), Scholomance (289), Stratholme (329), Dire Maul (429), Deadmines (36), Shadowfang Keep (33), Scarlet Monastery (189), Razorfen Kraul (47), Razorfen Downs (129), Wailing Caverns (43), Blackfathom Deeps (48), Gnomeregan (90), Uldaman (70), Maraudon (349), Sunken Temple (109), Ragefire Chasm (389), Stockade (34), Zul'Farrak (209), and Frozen Reach (908). Karazhan Crypts has a map/difficulty footprint but its boss mapping remains unresolved.
- Difficulty codes 0/1/2/3 must be retained as source codes until their mode labels are confirmed for the corresponding instance.
- NPC/encounter mapping does **not** independently establish boss spells, cast timing, or tuning.

## Existing research in this repository
Before creating duplicate mechanics files, consult the substantial existing material under `research/dbm/`, especially `coa-zulgurub-*`, `dungeon-boss-*`, `scripted-dungeon-boss-*`, `comprehensive-dungeon-*`, and `research/transfers/ZulGurub-*`. Reconcile any new observations with those records and label historical source versus Conquest Reborn live-test evidence.

## Next action
Review existing ZG boss-script research against live AutoLearner logs, then compile a per-boss evidence matrix with verified spell IDs, cast triggers, observed cooldown samples, confidence, and missing data. Only after ZG, resume dungeons.
