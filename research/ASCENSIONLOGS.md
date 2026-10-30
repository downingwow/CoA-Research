# CoA AscensionLogs — source analysis
Research date: 2026-10-29. Maintainer: Uncle Bone.

## Verified public capabilities
Website: https://coa.ascensionlogs.gg/
FAQ: https://coa.ascensionlogs.gg/faq

- Reports, boss rankings, phase/difficulty statistics, tier lists, actual-player Builds (talents, gear, enchants), character armory, guild progression and Mythic+ rankings are advertised. This does **not** mean a complete historic dataset has been downloaded.
- Companion records otherwise missing WoW 3.3.5a combatant information (gear/talents), supplemented via raid inspect and character-specific Ascension APIs.
- The site explicitly describes combat attribution, boss-specific damage rules (whitelist, blacklist, target caps, excluded spells), snapshot parses and per-encounter specialization detection.
- Rankings rebuild about every 30 minutes; Mythic+ Ascension leaderboard polling about hourly. Observed runs and uploaded captures may differ in timing/completeness.
- Spec parses use the matching class+spec/boss/bracket/difficulty/phase cohort. Class parses aggregate by class. All Star per-boss score = 100*(best DPS / top DPS)^0.95, summed across bosses in a zone.
- Class identification uses unambiguous spell indicators; spec identification uses prioritized per-encounter spell event matching. The live indicator matrix sometimes fails to render to public browsers.
- Tank tagging requires a qualifying tank specialization and >=20% share of tank-targeted damage by the site's methodology.
- Absorbs must be inferred on 3.3.5a because explicit absorb events are absent; comparisons to Details! need caution.
- The FAQ states free API keys can be generated in Profile Settings; API supports aggregate statistics. Attribution to CoA Logs is required for public display; bulk dataset redistribution is forbidden. Prefer permitted API access rather than scraping.

## Third-party existing capture, with independent provenance
https://github.com/Ryansousa10/coa-tier-list
- README documents https://coa.ascensionlogs.gg/api/statistics plus class-specs and phases endpoints; phase/difficulty/role combinations, bossId, damageMode and rankings.
- Raw captures in tools/data/raw (verified GitHub directory listing on 2026-10-29): ascensionlogs-data.json (995,595 bytes), ascensionlogs-data2.json (2 bytes — **do not consider usable**), boss-stats-raw.json (343,642 bytes), bosses-meta.json (3,789 bytes), mythic-plus-raw.json (2,415,508 bytes), rankings-raw.json (894,678 bytes), tank-focus-raw.json (540 bytes). File existence/size does NOT imply validity or complete history.
- Capture scripts: tools/scrape/ascension-logs.mjs, rankings.mjs, mythic-plus.mjs, healer-tank-focus.mjs, sanity-check.mjs.
- The project's tiers are **their own formula**, not official logs ratings: median (or p95 in top mode), normalized to highest spec; S>=85%, A>=68%, B>=50%, C>=32%, D otherwise; fewer than 5 parses flagged. They use boss-only/trash modes when data exists.
- The README warns that healing HPS queries omit role=healer, and Cloudflare can block server-side HTTP access.

## Companion technical reference
https://github.com/FangYuanWoW/AscensionLogsCompanion
An accessible public README describes background inspection of raid equipment/talents, compression, chunking and embedding of custom snapshots in combat logs for the service to parse. Check license and exact deployed version before copying code. Do not reproduce another service's event protocol without consent.

## Validation gaps / next tasks
1. Obtain authorized developer API documentation and characterize endpoints, pagination, phase ID, and aggregation scope. Do not publish credentials.
2. Record timestamps, realm, phase, boss, difficulty, sample size, role, damage mode, and upstream revision for each statistic.
3. Independently compare extracts against the live site and known combat logs; reject 2-byte/empty results.
4. Identify old phases whose records remain accessible; do not assert complete historic logs without enumeration.
5. Respect attribution and prohibition on bulk redistribution; store methods, links, schemas and authorized small examples only.

## Historic CoA event-log discovery (2026-10-30)

The public CoA AzerothCore Molten Core restoration notes cite a separate real event-level corpus: 54 live CoA combat logs, about 10 million event rows, and no unparsed records. The write-up says parsed rows cover per-pull fights, casts, auras and damage. It reports Ragnaros at 33 pulls (mostly wipes), Majordomo Sacrificial Chains in 48/49 pulls, and only three Mythic/Ascended Sulfuron disciple pulls. It also explicitly states the log files and detailed coverage summary reside in a gitignored local folder; the public repository is evidence about the corpus, not a public download of the raw logs.

Known limits: difficulty is inferred because difficulty offsets do not survive in GUIDs; there are no coordinates; cast counts for some adds are unreliable. The public summary describes the corpus as Aug–Sep 2026 but does not publish the complete file list/date range. Four individual MC files cited in a public code comment are dated Aug 25, 2026.

Related public log-backed evidence: July 27 2026 CoA guide says its rankings covered 39,481 logged fights; Aug 2 Reddit post transcribes community-submitted Mythic dungeon record counts; Aug 12 third-party snapshot provides derived tier rows; public spec pages through Aug 29 cite individual report dates to Aug 22. These are snapshots/examples, not a full report archive or weekly series. Full status and page integration are documented in [LOGS-ARCHIVE-STATUS.md](LOGS-ARCHIVE-STATUS.md).

GitHub search of FangYuanWoW's public account found the Companion and Uploader projects. They describe embedding player gear/talents in logs and uploading the player's local `WoWCombatLog.txt`; neither repository contains a public archive of submitted CoA reports. CoA Build Hub's July 17 Reddit post describes its then-live meta list as community voting across 37 builds, not log-derived rankings. A separately preserved mirror later captured 128 identity-stripped CoA Build Hub builds on July 31; those guides belong in the build library and are not combat performance evidence.

BoneArchive also imports the August 12 third-party tables: 50 boss-only DPS, 50 boss-plus-adds DPS, 49 Mythic+ DPS, 8 HPS, and 12 tank-role DPS rows, with parse counts. The snapshot states median-based quantile tiers and a weak-sample threshold under 10 parses; its Mythic+ section uses a different top-10 leaderboard aggregation. A separate July 25 Reddit post's 62 DPS values and an unverified commenter-produced 90th-percentile tier grouping are displayed as low-confidence community evidence. See [LOGS-ARCHIVE-STATUS.md](LOGS-ARCHIVE-STATUS.md) for the source inventory and caveats.

## Potential addon use
Details! — guardian owner and absorb edge cases; DBM-CoA/MRT — encounter classification; BoneBiS — observed player builds as corroborating evidence, not proof of theoretical optimality; BoneBuilds — talent popularity, with encounter/sample filters.
