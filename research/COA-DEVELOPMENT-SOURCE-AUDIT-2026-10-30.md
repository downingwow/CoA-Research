# CoA Development talent/database source audit — 2026-10-30

## Authority decision
User-designated current talent-tree authority: https://coa-development.org/talents . This overrides historical talent-tree layouts when conflicting, **for the CoA Development project**. Retain all historical alternatives and source IDs. Do not automatically infer Conquest Reborn's live-client behavior from the development test realm.

## Website access audit
- https://coa-development.org/talents : page confirms a calculator with a class specialization and class tree, but text retrieval returns a client-side `Loading…` shell, not serialized talent nodes.
- https://coa-development.org/database : page confirms item/spell search by name or numerical ID, but search results are dynamically loaded and not enumerated in text retrieval.
- https://coa-development.org/changelog and /roadmap : public, indexed class-specific changes that can be independently cross-referenced; may reflect newer development behavior.

**Extraction status:** Website talent nodes, spell details and database item records are **not yet exported** in this batch. No counts or IDs from these dynamically loaded records should be asserted.

## Discovered complementary structured source
https://github.com/srhinos/coa-datamine/blob/master/AGENT-GUIDE.md documents an extracted client-data repository:
- `data/talents/coa/index.json`, `_meta.json`, and `<Class>.json`: 21 CoA custom classes; source describes 3,618/3,618 spell resolutions and per-node row/column, spell IDs, prerequisites, connections, costs, choice groups, and tier gates.
- `data/classes/<Class>/index.json` and class shards: class advancement entries, including Talent/TalentAbility.
- `data/abilities/<classId>-<class-slug>.json`: identity and rank evidence.
- `data/talents/<ChrClass>.json`: **separate** legacy DBC talent system, not interchangeable with CoA geometry.
- The guide states the data are client-extracted and documents capture provenance. The snapshot may differ from the live website, so it is a comparison source, not a replacement for the designated website.

Additional reference: https://github.com/jealous-sound/azerothcore-wotlk-coa/blob/main/docs/coa/README.md describes `CharacterAdvancement.dbc`, `ChrClasses`, `ChrSpecs`, and generated `CoATalentNodeData.lua` consistency requirements, including the Primalist MountainKing/Mountain King alias.

## Required reconciliation fields
class ID, class display name, spec ID, spec name, talent/node ID, spell ID(s), rank, row/column, prerequisites, connection IDs, choice group, point/essence cost, source URL, capture date, content hash, and discrepancy status.

## Safe merge procedure
1. Obtain the site's actual JSON/API payloads or an equivalent website-backed export; record capture timestamp and hashes.
2. Match class/spec by IDs first; maintain separate alias mappings for UI names.
3. Diff the website payload against client-extracted CoA geometry and the 155 historical Exiles tree pages; retain conflicts with provenance.
4. Verify all spell references against the 9,656-record unified spell research index; never fabricate missing values.
5. Only then publish an authoritative talent-tree snapshot and update search indexes. Do not overwrite historical snapshots.

## Current limitations
The website's dynamic records were inaccessible to the text reader; direct HTTP from the local execution environment failed DNS resolution. This audit is source discovery and extraction planning, **not** a completed full website scrape or current-client validation.
