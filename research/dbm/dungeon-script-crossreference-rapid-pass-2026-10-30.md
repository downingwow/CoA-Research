# Dungeon script cross-reference — rapid repository-wide pass (2026-10-30)

## What was checked
Enumerated the repository's `research/dbm` directory (49 Markdown/JSON artifacts) and inspected the saved boss-script batches, the boss-kit SQL, dungeon encounter migration, dungeon SQL sources and custom Vaults restoration SQL. This is a **rapid source-inventory pass**, not a complete row-by-row reconciliation of every dataset or current realm.

## Boss-script evidence beyond the 64-row SQL kit
| Encounter | NPC credit | Script | Extracted abilities | Status |
|---|---:|---|---|---|
| Kormok (Scholomance) | 16118 | `boss_kormok.cpp` | Shadowbolt Volley 20741; Bone Shield 27688; Bone Mages 27695; Bone Minions 27687 | Script source, not verified live; not in 64-row kit |
| Isalien / Isalien Trigger (Dire Maul) | 16097 trigger credit | `boss_isalien.cpp` | Call Empyrean 27639; Multi-Shot 14443; Net 12024; Starshards 27636; Regrowth 27637 | Ambiguous trigger-vs-boss identity; not in 64-row kit |
| Mr. Smite (Deadmines) | 646 | `boss_mr_smite.cpp` | Smite Stomp 2102575; Fierce Blow 975011; Stunning Strike 2102553; Smite Rush 2102576; Retaliation 2102577; Rupture 2102580 | Also in kit; scheduling source conflict to resolve |
| Darkmaster Gandling (Scholomance) | 1853 | `boss_darkmaster_gandling.cpp` | Arcane Missiles 15790; Curse 18702; Shield 12040; Shadow Portal 17950; room portals 17863/17939/17943/17944/17946/17948 | Also in kit; old script vs CoA spell set conflict |
| Apothecary Hummel (Shadowfang Keep) | not matched in 254-row credit migration | `boss_apothecary_hummel.cpp` | Alluring Perfume 68589; Perfume Spray 68607; Chain Reaction 68821 | Seasonal event script; not proof of ordinary dungeon boss roster |

These extracted script batches also contain many Northrend/Outland boss scripts. **Do not count them as coverage of the 188 scoped classic Heroic/Mythic credited NPCs.**

## Important newly identified custom-dungeon naming conflict
The preserved `rev_20261028_60_vaults_of_the_inquisition.sql` source defines:
- **162700 Merciless Echo**; Heroic template **262700**, Mythic **362700**, ScriptName `boss_coa_vaults_echo`.
- **162703 His Majesty Darkandle**; Heroic **262703**, Mythic **362703**, ScriptName `boss_coa_vaults_darkandle`.
- **162704 The Deceiver's Presence**; Heroic **262704**, Mythic **362704**, ScriptName `boss_coa_vaults_deceiver`.

Earlier overview notes called NPC 162703 **His Majesty Darkveil**. **Darkandle** is the explicit name in the inspected SQL, so treat Darkveil as a conflicting alias or error until another independent source proves otherwise. This is a material correction for future research exports.

## Wider SQL evidence not yet integrated into boss-kit counts
- `coa-dungeon-boss-source-sql-2026-10-30.json`: Deadmines, Blackfathom Deeps, Ragefire Chasm and Uldaman/Stratholme source SQL.
- `classic-dungeons-scarlet-scholo-strath-uldaman-stockade-deadmines-brd-vaults-2026-10-30.json`: encounter fixes, Mythic spawns, Vaults source.
- `coa-dungeon-rare-bosses-ring-of-law-and-vaults-2026-10-30.json`: rare spawns, Ring of Law, 97k-character Vaults SQL.
- `coa-mythic-plus-champions-and-dungeon-boss-spells-2026-10-30.json`: difficulty and Mythic+ source, not necessarily boss spell rotations.

## Result and honest coverage boundary
The earlier **169 NPCs without an exact kit-ID match** are a *kit-specific gap*, not a count of bosses with no mechanics. We have now found separate script evidence for Kormok and a probable Isalien encounter, plus script-vs-kit conflicts for two already matched bosses. **No comprehensive all-source coverage percentage can be claimed yet**; other SQL, datamine, and archived combat logs remain to be reconciled per boss.

## Immediate ordered follow-up
1. Normalize all preserved source files into a single per-NPC evidence index, preserving source file and spell ID.
2. Resolve Isalien trigger identity and Vaults Darkandle/Darkveil naming with independent evidence.
3. Extract and join the remaining classic dungeon SQL mechanics (BFD, RFC, Deadmines, Scarlet/Scholomance, Stratholme, Uldaman).
4. Reconcile source-script and SQL conflicts for Smite and Gandling.
5. Investigate custom dungeon boss scripts and live historical log spell sets.
6. Verify difficulty-specific mechanics and publish a confidence-scored research freeze.

All findings are **upstream historical/source evidence** only; no DBM addon changes or current Conquest Reborn verification.
