# DBM-CoA dungeon coverage extraction

Scope is full encounter coverage: dungeons, raids, all difficulty variants, unreleased content represented in installed data, and holiday bosses. This pass extracts what is locally present; it does not establish current live availability.

## Local extraction results (dungeon-only)
- Vanilla dungeon map rosters: 19 map IDs, 190 NPC IDs listed (`Classic19Research.lua`). These are roster candidates; source explicitly says not live verified.
- Dungeon timer candidates: 80 rows extracted from `Classic19SourceTimers.lua`, retaining map/NPC/spell and first/repeat min/max milliseconds. These are source-derived candidates and not live-verified.
- Local schedule source includes four Zul’Gurub raid bosses and 35 spell schedules; these stay in raid data and are excluded from dungeon counts.
- Candidate source code is in `DBM-CoA-Learner`; installed upstream modules are present for Vanilla, TBC, Wrath, and holidays, but their presence does not prove CR support or mechanics.

## Vanilla matrix
See `classic19-dungeon-coverage.json`. Every entry includes its map ID, roster NPC IDs, difficulty/release status unknown, and explicit not-live-verified status. Detailed timer links are in `classic19-dungeon-timing-candidates.json`; NPC roster in `classic19-dungeon-npcs.json`.

## Full scope matrix caveat
TBC, Wrath, custom, unreleased, difficulty-specific, and holiday entries are not yet normalized from all module files. `DBM-WorldEvents` is installed; Headless Horseman and any other seasonal encounters must be audited from its module source. This extraction is a major first coverage pass, not completion of all DBM scope.

## Integrity and activation
The Lua export is passive research data and makes no DBM registrations. Existing AutoLearner, archive synchronization and BBLC25C code are unchanged. Do not activate candidate timers until matching live combat-log observations or authoritative current CR scripts verify the mapping. Preserve existing verified modules when merging.

## Counts
Dungeon maps: 19; roster NPC ID entries: 190; timer candidate rows: 80. Spell links are represented by those timing rows; unique spell IDs should be computed after deduplication keyed by map+NPC+spell. Timing sample counts, exact distributions, and current difficulty association are not available in this source. Raid schedules: 4 bosses/35 spell schedules from earlier extracted source, reported separately.
