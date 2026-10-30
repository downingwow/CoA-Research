# BisBeard CoA — recovered dataset provenance
Research date: 2026-10-29. Maintainer: Uncle Bone.

Original CoA endpoint: https://coa.bisbeard.com/
Other endpoint described by a third-party project: https://gear-planner-api.bisbeard.workers.dev/api/data/manifest?reader=2
Availability of either endpoint is unverified today. Historical snapshots exist in third-party GitHub; do not claim full all-phase BiS completion.

## Verified public GitHub file listing
Source: https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw
- bisbeard-meta.json — 33,873 bytes; repository README describes CoA classes/specs, defaultWeights, roles and equippable armor/weapon constraints.
- bisbeard-items-p1.json — 18,457,734 bytes; README describes Phase 1 items.
- bisbeard-items-p2.json — 8,069,215 bytes; existence verified, coverage and semantics NOT yet checked.
These are upstream snapshots rather than validated current-client authoritative datasets. Keep original authorship and license restrictions.

Extraction source: https://github.com/Ryansousa10/coa-tier-list/blob/main/tools/scrape/bisbeard.mjs
Build algorithm: https://github.com/Ryansousa10/coa-tier-list/blob/main/tools/build-data.mjs
Upstream README: https://github.com/Ryansousa10/coa-tier-list/blob/main/README.md

The third-party optimizer ranks items with sum(item_stat * spec_weight) plus parsed weapon DPS, applying equipment eligibility, excluding PvP/Bloodforged candidates and grouping item variants. This is a stat-weighted approximation, **not** a verified global optimum. Effects, set bonuses, hit/haste caps, procs, rotational effects and real encounter lengths can reverse an item order.

Other preservation leads: https://github.com/kevinvongmany/bisbeard-db (glyphs_ascension.ts), https://github.com/Leemo94/BisBuddy. See research/BISBEARD.md for more.

## Recommended structured research rows
Each BiS candidate: realm/client build, phase, class, specialization, role, slot, item ID, item variant, source/drop, stat weights version, formula, restrictions, publication timestamp, validation status, and upstream URL. Never conflate highest parse wearing an item with causation.

## Coverage assessment
- Phase 1: third-party item snapshot confirmed present.
- Phase 2: separate snapshot confirmed present, **not validated for completeness**.
- Phase 3 onward: not found in inspected raw directory.
- All classes/specs across all phases: **not verified**.
- No copies of large third-party datasets committed here: licensing, attribution and permissible redistribution require review first.
