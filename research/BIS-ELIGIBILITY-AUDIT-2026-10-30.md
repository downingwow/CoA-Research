# BiS candidate eligibility audit — October 30, 2026

## Scope and method

Audited all 140 preserved Phase 1 and Phase 2 specialization files: 70 specialization profiles in each phase. Files come from `Ryansousa10/coa-tier-list/public/data/bis/`, pinned by the source index to commit `92616fe829e79335e8bdc6139c7ceb7619b4d63a`. Candidate armor and weapons were compared with BoneArchive's preserved `site/data/equipment-rules.json`, including class armor and weapon permissions, spec-specific ranged weapon restrictions, one- and two-hand restrictions, shield eligibility, and dual-wield rules. Rules whose metadata names a required talent are reported as conditional rather than generally eligible.

The audit also compared every file's embedded weight map against its matching profile in `site/weights.js`. The local source index and class/spec roster map the 140 files to all 70 specializations.

## Results

- All 140 files were fetched and parsed; no source files failed.
- All 140 embedded weight maps match the corresponding local specialization profile exactly. This verifies data consistency with the historical BisBeard profiles, not that those weights are optimal for every build or encounter.
- 65 candidate rows conflict with the preserved class/spec eligibility rules; the gear page now filters them from selectable candidates.
- One additional shield candidate is talent-gated and remains visible with its required node ID.

| Finding | Rows | Scope |
| --- | ---: | --- |
| Wand candidates in Bow/Crossbow-only ranged slots | 24 | Witch Doctor — Shadowhunting and Starcaller — Sentinel; all six candidates in each phase for both specs |
| Shield candidates disallowed by the class equipment record | 14 | Barbarian — Brutality; Bloodmage — Fleshweaver; Chronomancer — Artificer; Felsworn — Tyrant; Pyromancer — Flameweaving; Reaper — Domination; Templar — Oathkeeper; Venomancer — Fortitude; Witch Hunter — Black Knight |
| One-handed maces barred by class rules | 18 | Bloodmage — Accursed/Eternal; Felsworn — Slayer/Tyrant; Reaper — Soul/Harvest/Domination; Witch Hunter — Black Knight/Inquisition |
| Off-hand weapons conflicting with specialization dual-wield rules | 9 | Barbarian — Brutality (three swords; dagger exceptions remain allowed); Bloodmage — Accursed (two); Witch Hunter — Black Knight (four) |
| Shield requiring a specific talent | 1 conditional | Barbarian — Ancestry; talent node `31219` |

For the two ranged specs, the saved six-item candidates for each phase are all wands. No eligible bow or crossbow replacement appears in those spec files, so the page reports the slot as having no preserved eligible candidate instead of substituting a guess.

## Limitations and interpretation

`equipment-rules.json` is extracted from the same preserved BisBeard metadata (`site/data/remote.json` points to the corresponding source commit). It is a strong internal consistency check, but it is not an independently validated live-client proficiency database. Historical weights are weighted-score inputs, not combat simulations or proof of best-in-slot. The upstream snapshots contain up to six candidates per slot, so removing an invalid row may leave fewer than six valid alternatives. A full replacement ranking needs the complete phase item pool and should retain the same eligibility filters.

The original item candidate data remains unchanged upstream. BoneArchive applies the eligibility checks when rendering the list and documents this audit in its research catalog.
