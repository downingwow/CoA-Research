# Dungeon research consolidation — 2026-10-30

## Status
Historical **encounter rosters and difficulty identities** have been researched for the scoped dungeons. A separate upstream scripted-boss kit extraction has **64 candidate spell/timer records across 22 named bosses** (mostly BRD, Blackrock Spire, and a few other instances). This is a **source consolidation, not a claim that every dungeon boss has verified mechanics**. No current Conquest Reborn combat-log verification is implied.

## Scope: researched encounter maps
| Instance | Map | Notes |
|---|---:|---|
| Blackfathom Deeps | 48 | Normal/Heroic/Mythic source configurations |
| Blackrock Depths | 230 | Prison, Upper City, Manufactory wings |
| Blackrock Caverns | 645 | Level 60 and 70 variants; repeated encounter configurations |
| Lower / Upper Blackrock Spire | 229 | Both wings; additional source difficulty variant |
| Deadmines | 36 | Miner Johnson appears in Mythic source roster |
| Dire Maul East/West/North | 429 | Three wings |
| Gnomeregan | 90 | Source configurations and Mythic extras |
| Karazhan Crypts | 1807 | Map and difficulty footprints only; boss roster unresolved |
| Maraudon | 349 | Three sections |
| Ragefire Chasm | 389 | Three difficulty source configs |
| Razorfen Downs | 129 | Three difficulty source configs |
| Razorfen Kraul | 47 | Three difficulty source configs |
| Scarlet Monastery | 189 | Graveyard, Library, Armory, Cathedral |
| Scholomance | 289 | Lower and Upper |
| Shadowfang Keep | 33 | Multiple configs and optional bosses |
| Stockade | 34 | Mythic-only Bruegal in source roster |
| Stratholme | 329 | Main Gate / Service Entrance |
| Sunken Temple | 109 | Three source configs |
| Uldaman | 70 | Multiple source configs |
| Wailing Caverns | 43 | Multiple source configs |
| Zul'Farrak | 209 | Mythic-only additional encounters |
| Vaults of the Inquisition | 936 | Three bosses in datamine |
| Road to De Other Side | 937 | Three bosses in datamine |
| Frozen Reach (Manastorm) | 908 | Alva 97700; encounter IDs 2168/2169/2170 |

Shared Dungeon Loot / All Dungeon Items are loot categories rather than encounter maps. AtlasLoot-CoA v8.1.6 is the accepted loot research baseline and is outside DBM mechanics research.

## Difficulty interpretation
The upstream dungeon design document identifies original dungeon map codes 0/1/2 as Normal/Heroic/Mythic, with Mythic+ outside that initial baseline. This does not independently establish live CR availability or key-level reward scaling. Some dungeon maps include additional source configurations or wings.

## Extracted spell and timing evidence: selected examples
The following are **upstream scripted kit records** with source labels such as log/Exiles/manual. Even a record labeled log is not independently validated against the current CR realm.

| Boss | NPC | Spell | Candidate first cast | Candidate repeat |
|---|---:|---|---|---|
| Emperor Thaurissan | 9019 | Dark Iron Hammer 92603 | 10–12s | 10–12s |
| Emperor Thaurissan | 9019 | Fiery Charge 92606 | 15–17s | 15–17s |
| General Drakkisath | 10363 | Thunder Clap 2102619 | 14.6–16.6s | 15–17s |
| General Drakkisath | 10363 | Heatwave 2102203 | 22–24s | 25–27s |
| Quartermaster Zigris | 9736 | Throw Net 2100255 | 2.6–4.6s | 10–12s |
| Quartermaster Zigris | 9736 | Throw Proximity Mine 2102851 | 5–7s | 10–12s |
| The Beast | 10430 | Overrun 2102159 | 29–31s | 35–37s |
| Mr. Smite | 646 | Stunning Strike 2102553 | 15–17s | 15–17s |
| Darkmaster Gandling | 1853 | Immolate 2100393 | 10–12s | 10–12s |
| Baroness Anastari | 10436 | Curse of the Baroness 816867 | 10–12s | 10–12s |

## Existing source artifacts (preserved; no duplication)
- `research/dbm/comprehensive-dungeon-encounter-roster-difficulty-loot-sources-2026-10-30.json`: full source document for 19 original maps and difficulty design.
- `research/dbm/comprehensive-dungeon-mythic-wings-rares-and-difficulty-templates-2026-10-30.json`: wings, rare encounters, difficulty templates.
- `research/dbm/coa-dungeon-boss-kit-timers-2026-10-30.json`: 64 structured candidate spell/timer records for 22 named bosses, with spell ID, first/repeat range, event type, flags and provenance labels.
- `research/dbm/dungeon-boss-kit-timers-structured-2026-10-30.json`: additional structured records.
- `research/dbm/dungeon-boss-runtime-signal-extraction-2026-10-30.md`: runtime boss/difficulty signals.
- `research/dbm/dungeon-boss-mechanics-mass-extraction-15-encounters-2026-10-30.json` and `...18-encounters...`: **includes unrelated Northrend dungeons**, so filter to the user's dungeon scope before reuse.
- `research/dbm/scripted-dungeon-boss-mechanics-batch*.json`: upstream scripts, not live realm verification.
- `research/dungeons/manastorm-dungeon-cache-mappings-all-modes-2026-10-30.json`: Frozen Reach cache mappings.
- Datamine: https://github.com/srhinos/coa-datamine ; source code: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa

## Remaining gaps — do not mark as solved
1. **Karazhan Crypts** boss identities and combat mechanics not recovered from dungeon index.
2. **Vaults of the Inquisition, Road to De Other Side, Frozen Reach**: full ability kits and repeatable timings unverified.
3. Many classic dungeon bosses have encounter IDs but **no independently verified CoA-specific spell schedule** in this consolidated index.
4. Source-script mechanics, log-labeled observations, Exiles-only spells and manual approximations must stay distinct.
5. Difficulty-specific behavior and Mythic+ affixes/key scaling need separate verification; retail assumptions are not evidence.

**Research workflow:** historical source gathering only. DBM addon coding, testing and release work belongs in the separate DBM-CoA conversation.
