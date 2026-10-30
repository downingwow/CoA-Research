# Conquest of Azeroth combat-log archive status

Last checked: 2026-10-30.

## What is preserved in BoneArchive now

- `site/performance.js` contains 6,015 class/spec aggregate rows captured 2026-08-09T23:22:38.696Z. They contain aggregate metrics and parse counts, not the underlying event streams or player reports.
- The public capture project `Ryansousa10/coa-tier-list` has API-derived aggregate and per-boss snapshots through 2026-08-10, plus a Mythic+ capture. These are not a week-by-week report archive. Ascension Logs' FAQ requires attribution for public display and prohibits bulk redistribution of its dataset, so BoneArchive links out and records provenance instead of copying more bulk API output.

## Newly found public evidence of actual combat logs

The public Molten Core restoration write-up in [Conquest-of-AzerothCore](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/docs/coa/molten-core.md#evidence-live-combat-logs) documents a separate corpus of **54 CoA combat logs, roughly 10 million event records, and zero unparsed records**. Its author says the source files and detailed `coverage.md` / `mc-summary.md` live in a gitignored local folder, so those raw files are not included in the public repository and were not copied into BoneArchive.

The published coverage summary says:

| Encounter evidence | Reported coverage |
| --- | --- |
| Ragnaros | 33 pulls, mostly wipes |
| Son of Flame chain | `40N+72A / 16N+28A` (the public note does not define the two slash-separated groups further) |
| Majordomo Sacrificial Chains | Seen in 48 of 49 pulls |
| Sulfuron's disciples | 3 Mythic/Ascended pulls only |
| Normal/Heroic Sulfuron and Majordomo | No pulls in this corpus |

The public note describes per-pull fights, casts, auras, and damage joined by creature entry. It also cautions that difficulty is inferred because difficulty offsets are missing from recorded GUIDs; coordinates are unavailable; and cast counts for some adds are not reliable. Four cited raw logs are dated August 25, 2026. The published summary identifies the corpus as August–September 2026 but does not expose a complete date inventory.

These records are strong evidence that a real event-level dataset exists, but the linked public repository currently exposes only the analysis derived from it. Treat the full 54-log corpus as **located but not publicly downloadable from that repository**.

## FangYuanWoW / AscensionLogs search

The GitHub account linked by the user has six public repositories. The CoA-related ones are the Ascension Logs Companion (captures gear/talent snapshots into a player's combat-log file) and the Ascension Logs Uploader (streams or uploads a player's own `WoWCombatLog.txt` to the service). The repositories document collection and upload tooling, not a backup of submitted CoA reports. The original `coa.ascensionlogs.gg` homepage and FAQ now return 410 Gone. This search did not locate a public raw-log export in those repositories.

## CoA Build Hub search

The July 17 Reddit announcement says its tier list ranked the builds then on the site by community upvotes/downvotes, filtered by PvE, PvP, leveling, or class; it reported 37 builds. Comments in the same thread explicitly describe the ranking as popularity votes, and the maker said log-based ranking was only a future possibility. The live site currently returns 503.

A separately preserved CoA Build Hub scrape, collected July 31, is available in `hertigservices/ascension-data`: 128 identity-stripped community builds, all 21 classes' talent/skill data, and eight guides. Its publisher says Byte, the original dataset author, permitted republication. Author identities and comments were removed in the mirror. This is useful for the BoneArchive build library, but it is not combat-log or performance-ranking data. The raw scrape's upstream source is `f3rr311/CoA-Databank`.

## Other dated log-backed snapshots located

| Date | What survives | Limitation |
| --- | --- | --- |
| 2026-07-27 | A CoA guide says its dungeon/world-boss tier analysis used 39,481 logged fights. | Aggregate sample-size claim; no underlying report export. |
| 2026-08-02 | A Reddit post transcribes player-submitted Mythic dungeon record counts by class/spec from CoA Logs. | A community snapshot, not raw combat logs or population census. |
| 2026-08-12 | A Reddit post transcribes Week 1 Molten Core Normal Lucifron parse counts for all 21 classes and their specs. | It is one encounter/week, and the posted total (2,457) differs from the sum of listed class totals (2,563) by 106; preserved with a discrepancy flag. Counts are not DPS rankings. |
| 2026-08-09 | 6,015 rows in BoneArchive's existing aggregate snapshot. | Aggregate DPS/HPS/tank metrics; no event timelines. |
| 2026-08-12 | Third-party CoA log-tier snapshot with parse counts and DPS/HPS/tank/M+ summaries. | Derived snapshot, not reports; source remains third-party. |
| 2026-08-22 to 2026-08-29 | Public spec-ranking pages cite late-August individual report dates and show a ranking update on August 29. | Examples only; no complete report collection or weekly rollups. |
| 2026-07-17 and 2026-07-31 | CoA Build Hub reported 37 community builds at launch; a later mirror preserves 128 identity-stripped builds and guides. | Community-submitted build guides and popularity votes, not combat-log parses. Kept separate from performance tiers. |

## Retrieval boundary

The CoA report endpoint checked on 2026-10-30 returned 410 Gone. Searches in public GitHub and Reddit found source-backed summaries and examples, but no public July–September dump of all CoA reports or their full timelines. FangYuanWoW's repos contain the uploader/companion tooling, not archived submissions. The 54-log Molten Core corpus is the best new lead; obtaining the raw files would require access to the parser checkout's excluded local log folder or a contributor-provided export.

BoneArchive now displays two community-derived record-count snapshots in the Combat Logs tab: the Aug 2 Mythic dungeon class/spec table and the Week 1 Lucifron Normal table. These count reported records/parses; they are not DPS/HPS ranks. The Week 1 table visibly flags the source's own total mismatch rather than altering the post's data. There is not enough dated performance data to build reliable weekly tier lists yet.

Do not mark the week-by-week archive as available: none of the located captures is a weekly rollup. Individual report dates can be shown when a report itself is recovered.

## Sources

- [CoA AzerothCore Molten Core log evidence](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/docs/coa/molten-core.md#evidence-live-combat-logs)
- [FangYuanWoW Ascension Logs Uploader](https://github.com/FangYuanWoW/ascension-logs-uploader) and [Companion](https://github.com/FangYuanWoW/AscensionLogsCompanion)
- [CoA Build Hub July 17 announcement](https://www.reddit.com/r/ProjectAscension/comments/1uz0jox/coa_build_hub_update_meta_tier_list_is_live_37/)
- [Permitted CoA Build Hub snapshot and build archive](https://github.com/hertigservices/ascension-data/tree/main/supplemental/coa-databank/166001399306e4fb022116fe1e3cfbbd7bd4bf37/coabuildhub/builds)
- [CoA tier-list aggregate captures](https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw)
- [Third-party snapshot: tier list from logs, dated 2026-08-12](https://coa.zalidan.com/tier-list-logs/)
- [July 27 CoA guide reporting 39,481 logged fights](https://kami-labs.fr/en/ascension/guides-ascension/tier-list-ascension-pve-meilleurs-builds-coa/)
- [August 2 Mythic dungeon record-count post](https://www.reddit.com/r/ProjectAscension/comments/1vdlzds/class_statistics/)
- [Week 1 Molten Core Normal Lucifron class/spec parse counts](https://www.reddit.com/r/ProjectAscension/comments/1vm1c7o/week_1_molten_core_normal_class_statistics/)
- [Ascension Logs FAQ](https://coa.ascensionlogs.gg/faq)
