# CoA Spell and Talent Relationship Graph

## Purpose

The manual builder `tools/build_spell_talent_graph.py` joins the already archived CoA talent nodes and ability members to the 21-class/70-spec registry without inventing current-client behavior.

## Rebuild

From the repository root after the bulk collector has downloaded its source shards:

```bash
python tools/build_spell_talent_graph.py
```

This is an **explicit manual command**, not a scheduled job. The script does not download or change upstream source data. Generated files belong under `datasets/relationships/`:

- `spells-by-id.json.gz`: numeric spell IDs, class IDs, candidate spec IDs, and per-edge evidence.
- `talent-nodes.json.gz`: talent node IDs, rank-linked spells, prerequisite/connected node IDs, tab IDs, and source path.
- `quality-report.json`: source coverage, counts, missing prerequisites, and unresolved source files.

## Evidence levels

- **Class attribution:** explicitly recorded `classId` on the archived class talent or ability document.
- **Talent spell:** explicitly recorded `spellId`, `spellIds`, or rank-description spell ID on a talent node.
- **Ability spell:** explicitly recorded member `id` in an archived class ability document.
- **Candidate specialization:** historical tab-name match to the specialization registry. It is **not** a confirmed current-client spec attribution.
- **Class-wide nodes:** may have no candidate specialization; this is expected, not automatically an error.

## Known limitations

This first graph does not decode every spell effect, cooldown, tooltip, rank semantics, or current Conquest Reborn mechanic. Its prerequisite links are preserved as raw source IDs, not proof of runtime unlock rules. Ability records can include trainer, historical, and non-live entries. Missing relationships are not evidence that an ability is unavailable in-game. The graph must be built and its outputs checked before claiming record totals or addon integration.

The underlying archived client/version may differ from Conquest Reborn. Do not merge incompatible spell IDs or overwrite raw evidence. Future work should cross-reference spell definitions, historical tooltips, and in-game validation.
