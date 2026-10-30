# Final dungeon research consistency audit — 2026-10-30

## Audit verdict
**Source inventory and historical encounter foundations are usable, but full per-boss mechanics coverage is NOT verified or complete.** This is a research data-quality audit, not an addon implementation audit. No live Conquest Reborn tests were performed.

## Confirmed cross-file checks

| Check | Finding | Disposition |
|---|---|---|
| Two boss-kit timer datasets | `coa-dungeon-boss-kit-timers-2026-10-30.json` and `dungeon-boss-kit-timers-structured-2026-10-30.json` each contain 64 records. **All 64 records match exactly** after normalizing NPC, spell, event, difficulty, initial min/max and repeat min/max fields. | One underlying source, NOT 128 observations; retain both as alternative representations. |
| Boss-kit coverage | 64 unique records across **22 unique NPC IDs** (also 22 named bosses). | These are a subset of the dungeon encounter roster, not complete dungeon coverage. |
| Event types | 61 timer, 2 health-threshold, 1 pull-triggered. | Do not present all 64 as repeatable cooldown timers. |
| Difficulty flags | All 64 rows have difficultyFlags=0. | No explicitly flagged heroic-only/mythic-only boss-kit record in this extraction; **does not prove identical behavior across difficulties**. |
| Provenance | Both 64-record sets derive from `data/sql/updates/pending_db_world/rev_20261001_10_boss_kits_scripted.sql`. | Upstream SQL, live deployment unverified. Individual comments mention log, Exiles, manual; those are annotations within one source, not independent verification. |
| Base dungeon difficulty | Preserved `docs/coa/vanilla-dungeon-difficulties.md` lists 19 original maps with Normal(0), Heroic(1), Mythic(2). | This is the upstream design baseline, not proof of live CR availability; Mythic+ excluded from that document. |
| Encounter migration | `coa-dungeon-encounter-mappings-and-damage-2026-10-30.json` preserves the source SQL for heroic/mythic encounter mappings, wing final bosses and spell-tier conditions. | Upstream migrations are source evidence, not deployed-realm confirmation. |
| Out-of-scope script extraction | Some `dungeon-boss-mechanics-mass-extraction-*` and `scripted-dungeon-boss-mechanics-batch*` files contain unrelated Northrend dungeons. | Filter by intended CoA dungeon roster before counting coverage. |

## Canonical research pointers
1. **Encounter roster and difficulty design:** `research/dbm/comprehensive-dungeon-encounter-roster-difficulty-loot-sources-2026-10-30.json`
2. **Difficulty-specific wings, rares, templates:** `research/dbm/comprehensive-dungeon-mythic-wings-rares-and-difficulty-templates-2026-10-30.json`
3. **Encounter and difficulty SQL:** `research/dbm/coa-dungeon-encounter-mappings-and-damage-2026-10-30.json`
4. **Canonical 64-record boss kit:** `research/dbm/coa-dungeon-boss-kit-timers-2026-10-30.json`
5. **Equivalent representation (not new observations):** `research/dbm/dungeon-boss-kit-timers-structured-2026-10-30.json`
6. **Dungeon runtime mechanics:** `research/dbm/dungeon-boss-runtime-signal-extraction-2026-10-30.md`
7. **Scope and gaps:** `research/dbm/dungeon-research-consolidation-2026-10-30.md`
8. **Manastorm:** `research/dungeons/manastorm-dungeon-cache-mappings-all-modes-2026-10-30.json`

## Outstanding verification gaps
- Karazhan Crypts (map 1807): authoritative boss roster and mechanic evidence unresolved.
- Vaults of the Inquisition (936), Road to De Other Side (937), Frozen Reach (908): encounter mappings exist but complete CoA-specific spell rotations, phase triggers and cooldown ranges not established.
- Many original-dungeon bosses: roster entry exists without a CoA-specific verified spell kit.
- Spell IDs in legacy AzerothCore scripts may differ from CoA overrides; do not merge on name alone.
- Difficulty-specific spell behavior and Mythic+ mechanics remain unverified on current CR.
- No systematic current-realm multi-pull variance measurements are in this audit.

## Recommended status labels
- **Encounter mapped (upstream)**: boss NPC / encounter / map / wing sourced.
- **Mechanics candidate (upstream)**: proposed scripted spell or timer sourced.
- **Historical log referenced**: source says a past log observed the mechanic, but raw event evidence may still need independent inspection.
- **Current CR verified**: only after directly checking current-realm evidence; **none newly established here**.
- **Unknown**: no credible source.

## Final conclusion
The **research inventory and duplication audit are complete for the specific cross-file checks above**. Do not label the entire dungeon mechanics database 'fully audited' or 'complete': that would require a per-boss, per-difficulty reconciliation across all preserved files and live evidence. Preserve unresolved entries explicitly. Loot remains outside this audit; AtlasLoot-CoA v8.1.6 is the accepted loot baseline.

No DBM-CoA addon files were modified.
