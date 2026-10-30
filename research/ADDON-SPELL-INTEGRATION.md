# CoA Spell Data — Addon Integration Contract (v1)

**Scope:** WoW 3.3.5a-based Conquest Reborn, 21 custom classes. Archived sources are not authoritative for the current live client.

## Current implementation

- CoA-Research: `datasets/relationships/enriched-spells-by-id.json.gz` contains 9,656 spell IDs and evidence-backed class/spec candidate associations; 8,776 have archived spell definitions.
- CoA-Research: `datasets/relationships/historical-tooltip-fallbacks.json.gz` has fallback records for 516 of the 880 missing definitions. These are historical evidence, not live mechanics.
- MRT-CoA: `MRT/CoASpellReference.lua` exposes `MRT_CoASpellReference.GetSpell(id)`, `Search(query, classKey, limit)`, and `GetLiveCooldown(id)`. This first bridge uses MRT's **existing** bundled cooldown dataset and is not yet an import of the entire 9,656-record research graph.
- MRT-CoA: CoA Spellbook settings now contain a clickable archived reference search.

## Proposed portable data contract

For each spell ID, preserve:

- `spellId` — numeric, never inferred from spell names
- `classIds` — explicit archived class attribution
- `candidateSpecIds` — derived historical associations; never claim verified current specialization
- `definition` — optional archived spell fields with units retained as in source
- `historicalTooltips` — optional, provenance-tagged fallback
- `source` and `versionStatus` — provenance and validation status
- `liveObserved` — optional runtime observations, stored separately from archived values

**Runtime rules:** Lua 5.1 syntax only, bounded memory and lazy/partitioned loading, no external HTTP from WoW Lua, no automatic chat channel joins, and no replacing live `GetSpellCooldown` results with archive estimates. Keep normal controls in the GUI; avoid routine slash commands. Preserve UI compatibility with default Blizzard UI, DragonUI, and ElvUI where applicable.

## Integration roadmap

1. MRT-CoA: bridge and clickable reference lookup (committed, **not in-game tested**).
2. Generate a partitioned Lua 5.1 export of the 9,656 records; validate size, loading, and client memory before bundling.
3. Details!-CoA: map combat log spell IDs to names/class attribution; never invent damage attribution from candidate spec IDs.
4. DBM-CoA: use verified mechanics for timers; archived cooldowns only as clearly labeled references, not automatic encounter triggers.
5. Other addons: consume the same versioned data contract without sharing unrelated addon chat protocols.

No release is claimed until actual in-game validation.
