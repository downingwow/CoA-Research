# Ascension CoA final-balance restoration — research baseline

Maintainer: Uncle Bone (@downingwow). Initiated 2026-10-29.

## Mission and target
Reconstruct the balance state of the original Ascension Conquest of Azeroth (CoA) realms immediately before the reported early-September 2026 shutdown, for implementation and validation in Conquest Reborn. **Do not confuse a community emulator's current data, an old frozen client snapshot, a tier list, or a historical patch announcement with the final server-side live values.**

Official marketing advertised 21 classes / 69 specializations in June 2025, but an August 2026 community roster describes about 70 builds and fourth specializations. The exact final roster is **not yet verified**. Build an authoritative per-class/spec manifest before claiming complete coverage.

## Most promising surviving contemporaneous evidence
1. [Bharph/coa-preservation-data](https://github.com/Bharph/coa-preservation-data): repository describes **70,437 Ascension API changelog entries from 2016-07-23 through 2026-08-31**, fetched 2026-09-02; **~180,282 spell tooltip records** captured in-game; 21 class spellbooks captured **2026-09-02**; client `CharacterAdvancementData.json` containing 23,709 nodes but **frozen 2026-02-08**; and spell ranks. **These are source-reported corpus sizes, not independently audited totals in this project.** Many class spellbooks only show starter spells; the fourth-spec graphs may have remained server-side.
2. [AscensionLogs CoA](https://coa.ascensionlogs.gg/): historic report/performance evidence where available, not an exported snapshot of all tuning. See [ASCENSIONLOGS.md](ASCENSIONLOGS.md); follow usage terms and avoid bulk reproduction.
3. [Ry an Sousa tier-list capture](https://github.com/Ryansousa10/coa-tier-list) (remove space in project slug: `Ryansousa10`): source-reported statistics and ranking snapshots, with non-official tier calculations; preserve phase, boss, date, parse counts and provenance.
4. [Kami Labs CoA patch-note catalog](https://kami-labs.fr/en/patch-notes-ascension/): accessible secondary recap of substantial Aug 2026 tuning waves on Aug 1, 8, 15, 20, 23, 26. Always verify specific figures against the raw archived Ascension changelog.
5. [DealsBeam/ascension-db](https://github.com/DealsBeam/ascension-db), [CoA Databank](https://github.com/f3rr311/CoA-Databank), [CoA AzerothCore](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa), and [CoA talent reference](https://coa-development.org/talents): cross-check spell IDs, talent graphs, implementation clues; never assume they reproduce original live coefficients.
6. [CoA arena extractor](https://github.com/johnayoung/coa-arena): client-extracted ability references / healer and DPS heuristics; check snapshot date and algorithm before use.

## Specific late-stage changes that must not be omitted
- July 31–Aug 1: 21-class balance pass and Fierce Blows absorb/block interaction change (secondary recap: https://kami-labs.fr/en/ascension/patch-zul-gurub-ascension-coa-21-classes-remaniees/).
- Aug 6–8: Templar oath-chain rework, PvE monster-damage bonuses for individual specializations (secondary recap: https://kami-labs.fr/en/ascension/patch-ascension-coa-refonte-templier-molten-core/).
- Aug 9–15: Runemaster Weapon Engraving rework, multi-class buffs (https://kami-labs.fr/en/ascension/patch-ascension-coa-refonte-maitre-des-runes/).
- Aug 15–20: Sun Cleric Blessings / Starcaller Moon Priest healer revisions; reported +20% base health for CoA classes and resilience changes (https://kami-labs.fr/en/ascension/patch-ascension-coa-refonte-soigneurs-jcj/).
- Aug 20–22: Stormbringer/Felsworn offensive revisions and PvP adjustments; secondary article distinguishes changes active at publication from **restart-pending** changes (https://kami-labs.fr/en/ascension/patch-ascension-coa-porte-tempete-gangrelie/).
- Aug 26: Witch Hunter rework listed at https://kami-labs.fr/en/patch-notes-ascension/ . Verify all changes through Aug 31 directly.

## Evidence grades for reconstruction
- **A — Confirmed final:** original late-live server data or two independently corroborating late-live measurements fixing the exact effective value, with timestamp and rules.
- **B — Contemporaneous direct:** original Aug/Sep 2026 changelog, client tooltip, in-game snapshot or authentic log; implementation state and server-side overrides may still be uncertain.
- **C — Indirect:** third-party summary, client-derived conversion, archived rankings or emulator source with unverified final parity.
- **D — Hypothesis:** extrapolated/inferred value, needing testing. No guesses labeled original.
- **Unknown:** blank rather than imputed zero.

Each restoration record needs: class, specialization, stable spell/talent ID, name, rank, mechanic, exact value/formula, source URL/path and row or message ID, source capture date, patch effective date, realm, PvE/PvP mode, applicability, whether restart-pending, confidence grade, and a Conquest Reborn test case.

## First implementation deliverable for Conquest
A reproducible **final-value ledger**, not a generic tier list. Extract, filter and order the original changelog by effective date; link each affected spell ID to tooltip/rank/talent evidence; identify per-spec server overrides; compare with Conquest Reborn implementation; publish exact mismatch and fix recommendation only where sufficiently supported. Maintain separate PvE and PvP baselines and report sample sizes for log-derived performance.

**Current status:** archival leads and substantial August 2026 changes identified. Final numeric values for all specializations are **not yet verified or fully extracted**; no claim of parity is warranted.

## Rights / privacy
Link to original public sources and preserve citation metadata; respect data provider redistribution restrictions. Never commit credentials, character-specific private data, or nonredistributable bulk combat-log content.
