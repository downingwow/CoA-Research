# BoneArchive website integration

The public website is deployed from `site/` to https://coa-research.unclebone.workers.dev/.

## Integrated data
- 21 class trees / 70 specialization trees / 3,618 talent nodes from srhinos/coa-datamine `data/talents/coa`, archived CoA builder capture dated 2026-08-12. Descriptions are rendered as plain text; source IDs, ranks, geometry, prerequisite fields, choices and per-node costs are retained.
- Separate ability/talent essence curves from the same repository's `data/classes/essence.json`.
- 70 role and weight profiles from Ryansousa10/coa-tier-list `tools/data/raw/bisbeard-meta.json`. These replace the earlier incomplete role classifications.
- 140 Phase 1/2 gear candidate datasets read on demand from the pinned upstream commit 92616fe829e79335e8bdc6139c7ceb7619b4d63a. They are upstream stat-weight candidates, not verified global BiS optima. The source is credited on the page. Large raw item and log archives are not mirrored.
- Existing historical performance aggregates and local combat-log analyzer retained.
- 20 research/source documents included as readable, searchable site content.
- 70 original BoneArchive specialization introductions and familiar-class comparisons in `site/data/guides.json`; comparisons are editorial descriptions, not simulations or copied third-party guide text.

## Planner behavior
One specialization plus the class tree, level 10–60; separate AE and TE budgets; maximum ranks; mutually exclusive choice groups; connected-node requirements; OR alternatives in explicit required IDs; per-tree investment gates; free granted passives identified separately from zero-cost selectable nodes; cascading dependency removal. Imported builds are rebuilt through the same allocation validator. Device-local save, share links, JSON export/import and touch removal mode are included. No claim of in-game import compatibility is made.

The archived capture is deliberately separate from current CoA-development state. Each class links to its development calculator for comparison. Runtime source selection does not silently overwrite historical values.

## Verification
The standalone model check exercises every specialization, budgets, max ranks, choices, dependent removal, full build restoration and malformed import rejection. JavaScript syntax checks run before deployment; browser checks verify the published site. No new paid infrastructure or purchases are required.

## Independent visual identity

The archive desk design uses bone-white reading surfaces, ink-green navigation and rust accents, a numbered collection index, and an on-demand class directory. The approved Uncle Bone dragon-skull logo is stored in `site/assets/uncle-bone-logo.webp`. The portal and research explorer share `site/archive.css`. This original presentation replaces the companion-style homepage and fixed class sidebar; source attribution and existing data tools remain available.
