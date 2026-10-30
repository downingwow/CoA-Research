# Final-days CoA evidence register (2026-10-29)

## Confirmed scope and cutoff
- Original Ascension realms closed **2026-09-04 at 19:00 Pacific**. Independent reports: https://www.privateserverhub.com/news/project-ascension-announces-permanent-shutdown-on-4-5-september-after-agreement- and https://www.mmo-champion.com/content/?page=34
- Target **last applied production state**, not merely the last announced change. Verify exact last restart and final hotfixes.
- Primary preserved evidence: https://github.com/Bharph/coa-preservation-data . Repository says public API changelog through **2026-08-31**, fetched **2026-09-02**; class spellbooks and tooltips captured in-game **2026-09-02**. Missing 2026-09-01 to shutdown patch history remains a priority.
- Exact primary file paths verified: `changelog/changelog-entries.ndjson`, `class-spellbooks/by-class.json`, `class-spellbooks/class-name-map.md`, `spell-tooltips/all-spell-tooltips-merged.ndjson`, `client-content/CharacterAdvancementData.json`. Client advancement JSON was frozen in February, **not** a final server snapshot.
- Separate historical performance capture: https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw with `ascensionlogs-data.json`, `boss-stats-raw.json`, `rankings-raw.json`, `mythic-plus-raw.json`. These are not automatically final-week or full population data.
- Conquest Reborn is an **independent TrinityCore realm**: https://www.privateserverhub.com/news/one-month-in-conquest-reborn-keeps-conquest-of-azeroths . Do not confuse it with AzerothCore continuation.
- Current Reborn class roster, for naming crosswalk: https://conquestreborn.com/ (21 classes).

## Immediate extraction requirements
1. Download and parse preserved changelog, filter all CoA entries from 2026-08-01 onward, extract class/spec/spell and numeric changes, date, realm, restart applicability, original row ID and verbatim evidence reference.
2. Overlay in-game September 2 tooltip records and rank chains; report exact final *client-visible* figures separately from unverified server-only modifiers.
3. Recover September 1–4 notes from mirrors, Discord archives, screenshots and last-live recordings. Do not presume no changes after August 31.
4. Produce class-by-class ledgers with stable spell IDs, last modification date, before/after numbers, PvP vs PvE, talent/rank dependency and evidence grade.
5. Compare to Reborn only with real observed values or server source, keeping its ongoing post-shutdown changes separate.

## Open gaps
- No authoritative all-spec final server coefficient table recovered.
- No confirmed last-restart timestamp.
- 2026-09-01 through 2026-09-04 patch completeness unknown.
- 2026-09-02 client spellbooks do not expose every server-side effect.
- Source-reported 21 classes / 69 specs should be verified against the final roster.

**Status:** verified archival source locations and historical cutoff, not a completed numeric restoration.
