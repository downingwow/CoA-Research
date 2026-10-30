# CoA-Research — Comprehensive Preservation Cross-Reference (October 2026)

## Scope and verified outputs

This batch expands beyond the original `srhinos/coa-datamine` Spell.dbc snapshot and the `Bharph/coa-preservation-data` tooltip archive. It cross-references the **entire 364-spell unresolved queue**, preserves a complete contributor-supplied historical gear-planner export, and imports a separate talent-tree snapshot.

### Spell evidence (9,656 class-linked spell IDs)

| Historical evidence tier | Spell IDs |
| --- | ---: |
| Original archived Spell.dbc definitions | 8,776 |
| Historical tooltip fallback, for otherwise missing definitions | 516 |
| Additional exact-ID archive matches, for the remaining IDs | 364 |
| Without any archived reference evidence after cross-reference | **0** |

The 364 previously unresolved IDs were found in the **CoA-Databank MPQ-derived spell palette**; 345 also matched the independently preserved **Exiles CoA database mirror**. The CoABuildHub master index added no further matches among those 364. **73** of those IDs had differing names across the new sources. The unified 9,656-record index identifies **217** name discrepancies when archived relationship labels are also compared. Such differences are flagged, not silently resolved.

Files:
- `datasets/relationships/additional-spell-source-evidence.json.gz` — exact-ID source records, including names, descriptions, source metadata, and source-specific fields.
- `datasets/relationships/additional-spell-source-audit.json` — independent source match counts, missing IDs, and disagreement samples.
- `research/COA-ADDITIONAL-SPELL-RECOVERY.csv` — inspectable cross-reference table.
- `datasets/relationships/unified-spell-research-index.json.gz` — source-aware compact search and research index for all 9,656 IDs.
- `datasets/relationships/unified-spell-research-audit.json` — source coverage and unresolved-name counts.
- `datasets/relationships/unified-spell-name-conflicts.json` — competing historical names and provenance.
- `site/data/spell-search-index.json` — updated site data with recovered names, descriptions, and source flags.

**Important:** A historical spell record is not proof that a spell is available or behaves the same way on the current Conquest Reborn client. Source priority is used only to choose a *display label*, not to erase alternate names or resolve gameplay conflicts.

### BisBeard planner preservation

- 70,838 original planner rows preserved in compact form.
- 37,557 rows are planner item variants; IDs remain **strings**, preventing precision loss.
- Five phase labels: Phase 1 = 34,667; Phase 2 = 12,169; Phase 3 = 11,531; Phase 4 = 7,623; Phase 5 = 4,848.
- 57 source tables contain rows; source documentation declares 75 tables, including empty tables.
- 1,220 candidate missing IDs, 22 name conflicts, and three variant-base-missing cases are **research statuses**, not verified gameplay facts.
- Many class tags are original WoW class labels, not the 21 custom CoA classes.

Files: `datasets/gear/bisbeard-planner-items.jsonl.gz`, `datasets/gear/bisbeard-coverage.json`, `research/COA-BISBEARD-TABLE-COVERAGE.csv`.

**This is a phase-organized gear candidate dataset, NOT a confirmed phase-by-phase BiS ranking for all CoA classes and specs.** No DPS simulation, spec weights, drop probabilities, or source validation was inferred.

### Independent historical talent trees

The Exiles mirror contributes **155 talent-tree pages and 8,610 talent cells**, with 6,676 distinct spell IDs extracted. Exactly **64** tree keys match the existing class/spec registry by normalized historical name. These are **candidate name associations**, not verified specialization or client tab IDs.

Files: `datasets/relationships/exiles-talent-tree-snapshots.json.gz` and `datasets/relationships/exiles-talent-tree-audit.json`.

### Source provenance

- [AscensionDB preservation website](https://ascension-db.ascension-archive.workers.dev/) — public searchable interface.
- [Ascension preservation datasets](https://github.com/hertigservices/ascension-data) — archival collections and provenance.
- [Exiles CoA database mirror](https://github.com/hertigservices/ascension-data/tree/main/supplemental/exiles-db) — site-derived historical spell and talent records; backend not independently live-verified.
- [CoA-Databank](https://github.com/hertigservices/ascension-data/tree/main/supplemental/coa-databank) — community skill index and MPQ-derived spell palette.
- [BisBeard planner archive](https://github.com/hertigservices/ascension-data/tree/main/supplemental/bisbeard) — contributor-supplied planner export; no source license grant or live accuracy asserted.

## Remaining research limitations

1. **Current-client validation:** all 9,656 spell IDs now have archived reference evidence, but current Conquest Reborn mechanics and availability remain unverified for many records.
2. **Historical disagreements:** audit name and effect differences instead of replacing values automatically.
3. **BiS:** a planner item list alone cannot establish best-in-slot; requires spec-specific stat priorities, combat models, verified phase availability, and comparison methodology.
4. **Talent alignment:** 64 historical tree-key matches are candidate associations; the remaining trees and variant names require manual crosswalk, not forced assignment.
5. **Licensing:** retain attribution and source provenance. Check each source's rights before republishing original large archives or using the data in redistributable products.

This research batch changes **CoA-Research only**. It does not modify addon implementations or release versions.
