# Engineering plan — historical gear and logs intelligence
Updated 2026-10-29.

Goal: use BisBeard stat-weighted candidates and CoA AscensionLogs performance/build evidence without confusing the two.

1. Inventory raw snapshots and upstream licenses. Record SHA-256, retrieval time and Git commit; inspect Phase 2 schema separately from Phase 1.
2. Map phase identifiers, realm aliases, class/spec spelling, item variants and IDs against https://ascension-db.ascension-archive.workers.dev/ and https://coa-development.org/talents.
3. Normalize rows in a separate *research* dataset (never preload megabytes into a 3.3.5a addon). Require clear phase/class/spec/slot keys and provenance.
4. Calculate stat-weight candidate score and document unsupported effects (procs, sets, breakpoints, custom mechanics).
5. Query supported, authorized aggregate AscensionLogs data for observed equipment/talent patterns, retaining boss, phase, difficulty, percentile and sample-size metadata.
6. Publish only permitted curated/derived content with proper attribution, never bulk copy the logs API dataset. A Windows companion or external build step can perform authorized sync; WoW 3.3.5a Lua cannot directly fetch arbitrary HTTPS APIs.
7. Validate with actual Conquest Reborn behavior, tooltips and combat records. Mark statuses: verified-live, corroborated, historical, inferred, incomplete.
8. Deliver lightweight per-phase Lua tables or links to externally maintained guides; guard memory and SavedVariables growth.

Research links:
- https://github.com/Ryansousa10/coa-tier-list
- https://coa.ascensionlogs.gg/faq
- https://github.com/FangYuanWoW/AscensionLogsCompanion
- https://github.com/downingwow/CoA-Research
