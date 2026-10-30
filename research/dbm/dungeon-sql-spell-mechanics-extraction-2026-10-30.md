# CoA dungeon SQL spell-mechanics extraction — 2026-10-30

## Method
Inspected preserved upstream SQL and signal excerpts from `coa-dungeon-boss-source-sql-2026-10-30.json` and `classic-dungeons-scarlet-scholo-strath-uldaman-stockade-deadmines-brd-vaults-2026-10-30.json`. Only explicit spell IDs tied to named mechanics or script bindings are promoted below. No current-realm validation; SQL comments can describe intended or simulated behavior.

## Named boss mechanics
| Dungeon | Boss | Spell IDs | Source-supported behavior |
|---|---|---|---|
| Blackfathom Deeps | Ghamoo-ra | **2102687** | Torrent: spin during water cone; SQL binds `spell_coa_torrent_spin` |
| Ragefire Chasm | Taragaman the Hungerer | **2102516–2102519** | Massive Fire Nova tiers; Earth Pillars provide cover according to SQL comments. Pillar visual ID **663030** is not proof of a direct boss cast |
| Scholomance | Darkmaster Gandling | **2100398** | Rise! summons Risen Student NPC **80066** |
| The Stockade | Hamhock | **2102745**, **2102823**, **2102516** | Greater Fire Nova Totem NPC **192328**, detonation after ~5 seconds; latter two IDs are effect/tier references, not necessarily direct casts |

## Encounter mechanic without a confirmed caster mapping
- **Deadmines Bouncing Saw Blade, spell 2102559**: SQL binds `spell_coa_bouncing_saw_blade`; 1 target on Normal/Heroic, 3 on Mythic. **Do not attach to a particular boss NPC** until the `AscensionDeadminesBosses.cpp` implementation is examined. Buzzing Saw Blade NPC **180237** is a summoned hazard, not the boss.

## Custom Vaults spell-script registrations
The preserved `rev_20261028_60_vaults_of_the_inquisition.sql` registers `spell_coa_vaults_damage` for spells **256491, 256499, 256500, 256501, 256804, 256805, 256818, 256819, 256831, 256832, 256891, 256892, 256893, 256895**; `spell_coa_vaults_void_wrath` for **256844**, and `spell_coa_vaults_void_wrath_tick` for **256848**. These are **dungeon-level spell registrations**, not boss-specific casts; do not assign them to Merciless Echo, Darkandle, or Deceiver without script evidence.

## Database safety rules
1. Distinguish boss casts from triggered effects, summons and hazards.
2. Preserve source path, SQL line or statement, and difficulty condition.
3. Do not count generic boss classification/spawn/health SQL as mechanics.
4. Source comments and scripted implementations are not live Conquest Reborn evidence.
5. Only promote named boss mechanics to the canonical NPC index after verifying the NPC ID. Until then retain this as a separate evidence file.

## Next work
- Read `AscensionDeadminesBosses.cpp`, `CoADungeonBossSpells.cpp`, and custom Vaults boss scripts to resolve caster-to-spell mapping.
- Link Ghamoo-ra, Taragaman, Gandling and Hamhock to explicit credited NPC IDs.
- Reconcile difficulty behavior and timing with archived combat logs.
