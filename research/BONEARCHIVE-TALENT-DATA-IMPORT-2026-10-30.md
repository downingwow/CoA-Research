# BoneArchive talent calculator dataset — verified source (2026-10-30)

The current BoneArchive website talent calculators are **already backed by versioned JSON in this repository**. No scraping or historical substitution is required.

## Canonical data

- `site/data/classes.json` — 21 class entries, class IDs, class keys, displayed names, tabs and tab IDs; declared total **3,618** talent nodes.
- `site/data/<class key>.json` — one calculator payload per class key in `classes.json` (for example `site/data/Barbarian.json`). Each payload contains nodes, spell IDs, costs, prerequisites, rank descriptions, choices and layout metadata.
- `site/data/essence.json` — talent and ability essence curves.
- `site/talent-model.js` — builder validation rules, including ranks, prerequisite connections, choice groups, tier essence requirements and level gates.
- `site/portal.js` — website data loader; calls `fetch('./data/'+file)` for `classes.json`, `essence.json`, and `<class key>.json`.

## Import decision

**Treat these version-controlled website calculator JSON files as the canonical source of the current BoneArchive talent tree dataset.** The site already consumes them directly. Do not copy an older Exiles or BisBeard tree over these records. Existing archive material remains historical and separately labeled.

## Verification performed

Read the current repository's `site/index.html`, `site/portal.js`, `site/talent-model.js`, `site/specs.js`, `site/data/classes.json`, and `site/data/Barbarian.json` through GitHub. The index contains 21 classes and its nodeCount fields sum to 3,618. Barbarian's calculator JSON contains choice groups with actual spell IDs. The website loader points to these same JSON paths.

**Scope limitation:** The 3,618 total is the sum of class index metadata, not a fresh row-by-row revalidation of all 21 class payloads. This establishes the canonical source; it does not claim a new external CoA Development export or live-realm verification.

## Source precedence

1. Current `site/data/<class key>.json` and `site/data/classes.json` for BoneArchive calculator talent trees.
2. `site/data/essence.json` and `site/talent-model.js` for calculator rules.
3. Historical Exiles/BisBeard and third-party data only for provenance, conflicts and research, never as an automatic replacement.
