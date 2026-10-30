# CoA Logs + BisBeard historical reconstruction — evidence ledger

Maintainer: Uncle Bone (@downingwow). Started 2026-10-29.

## Scope and standard

Recover evidence about every CoA class/spec and every available content phase: item and glyph catalogs, stat weights, BiS candidates and historical recommendations; combat reports and boss/phase/difficulty aggregates; popularity, builds, talents, enchants, raid and Mythic+ metrics; rankings and tier lists. No unsupported claim that the complete original website databases or optimal BiS sets are recovered.

Evidence levels: **original capture**, **third-party preserved snapshot**, **reproducible derived metric**, **community opinion**, **unverified lead**. Every ranking needs phase, realm, time window, boss/zone, difficulty, role, metric, sample size and a source reference. Avoid mixing launch or test data with shutdown-era balance.

## Newly confirmed source leads

### BisBeard item archive: large phase/category export

- Catalog: https://github.com/hertigservices/ascension-data/tree/main/supplemental/bisbeard
- Source: contributor-attributed `ClassicGearPlannerDB_coa-260907-132512.dexie`, SHA-256 `7733de9bf573b62f451375ea09415f8de86b13c9c131cd6108a0e9a2e716d666` (filename is **not** a verified capture timestamp).
- Archive publisher reports **70,838 item records across 75 phase/category tables**, **37,557 planner variants**, **21,337 planner IDs beyond unsigned 32-bit range**. Comparison reports 32,039 matched names, 22 conflicts, 1,220 missing candidate IDs, and three missing variant bases. These are *publisher-reported verification counts*, not live realm verification.
- Original export, normalized JSONL, SQLite, comparison, manifest, importer and verification instructions are linked from their README and https://github.com/hertigservices/Ascension_preservation/blob/main/tools/cache-consolidator/docs/BISBEARD.md .
- Stat fields, set bonuses, sources and original planner IDs can support gear research; this is **not** a recovered author-approved per-spec per-phase BiS equipment-set database. Check licensing before redistribution.

### BisBeard stat weights: independent preserved profiles

- https://github.com/Nalhan/Bestow/blob/main/docs/STAT_WEIGHT_WORKFLOW.md
- https://github.com/Nalhan/Bestow/blob/main/Data/StatWeights.lua
- https://github.com/Nalhan/Bestow/blob/main/docs/bisbeard_stat_weights_source.json
- Publisher documents 70 class/spec profiles from BisBeard's `specRoles-<hash>.js` module, with class/spec role, anchors, weights and aliases (Bloodmage/Blood Mage, Tinker/Tinkerer, Venomancer Rotweaver/Rot). Its pinned module snapshot was retrieved 2026-07-31 (see metadata for exact time/hash). Capture stat-weight provenance, and do not treat linear stat weights as full simulations.

### Third-party CoA log/tier captures

- https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw
- Verified GitHub file listing on 2026-10-29: `ascensionlogs-data.json` (995,595 B), `ascensionlogs-data2.json` (**2 B, unusable until inspected**), `rankings-raw.json` (894,678 B), `boss-stats-raw.json` (343,642 B), `mythic-plus-raw.json` (2,415,508 B), `tank-focus-raw.json` (540 B), `bisbeard-meta.json` (33,873 B), `bisbeard-items-p1.json` (18,457,734 B), `bisbeard-items-p2.json` (8,069,215 B).
- Their README describes `/api/statistics` extraction and a **custom** class-tier formula; those tier letters are not a verified official Ascension ranking. Verify actual data content and date coverage before publication.

### CoA Logs API, reporting, and reuse constraints

- https://coa.ascensionlogs.gg/faq
- FAQ documents public developer API access via a user-generated free key in Profile Settings, aggregation endpoints, class/spec/boss/phase cohort rules, and that *public display must visibly attribute the site and bulk dataset redistribution is forbidden*. Do **not** mirror its entire dataset into this repository without explicit permission.
- Public site supports reports, statistics, builds, tier lists, Mythic+, and armory, but some views fail loading in non-browser contexts. For historical recovery, capture permitted structured aggregates and link individual reports; don't mistake visible UI routes for downloaded report records.
- Statistics should distinguish rankings damage vs all damage; all-star scoring vs spec/class parse; boss-only vs adds/trash; sample size and phase/version.

## Work queue

1. Inspect the preservation manifest, actual table names and phase labels, and compare the comprehensive Dexie catalog against isolated phase 1/2 exports.
2. Parse and validate 70 stat-weight profiles and map all CoA class/spec IDs, with aliases and dates.
3. Audit raw ranking/statistics capture shapes, phase coverage, sample sizes, timestamp fields, and missing/empty files; publish a coverage matrix (not unsupported rankings).
4. Recover explicit BisBeard saved loadouts/recommendations from archives/screenshots/community exports, distinct from reconstructed stat-weight candidates.
5. Build evidence tables for `phase × class × spec × role × encounter/difficulty × metric`, with separate `gear`, `talents`, `enchants`, `glyphs`, `tinkers`, and `builds` evidence.
6. Compare to final-shutdown era balance evidence, not modern Conquest Reborn by default.
7. Publish properly attributed *permitted* historical summaries and reproducible calculation code while respecting source licenses and CoA Logs data reuse limits.

## Essential caution

The published BisBeard bulk item catalog has **75 phase/category tables**, not proof that all 75 are non-empty or that 75 phases exist. The 70 stat-weight profiles do not alone imply 70 independently active current specializations. Source dates and balance versions need independent validation.
