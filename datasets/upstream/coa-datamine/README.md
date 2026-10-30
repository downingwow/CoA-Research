# Imported CoA client-data indexes

Source: https://github.com/srhinos/coa-datamine at commit `5078f9ac22541c45c17a866c23aac6c12073de23` (master, retrieved 2026-10-30).

The three JSON files in this folder are copied byte-for-byte as UTF-8 text from upstream `data/classes/index.json`, `data/classes/specs.json`, and `data/spells/index.json`. These are **actual imported records**, not merely links. They provide the class roster, class IDs and powerType metadata, class/spec ID mapping, and spell bucket locations. The spell index is a **bucket manifest**, not the spell records themselves.

| Local file | Upstream path | Purpose |
|---|---|---|
| data-classes-index.json | data/classes/index.json | Class IDs, class aliases, power types and metadata |
| data-classes-specs.json | data/classes/specs.json | Class-to-specialization mappings |
| data-spells-index.json | data/spells/index.json | Spell ID bucket catalog |

**Crucial realm warning:** Upstream explicitly states that its selected `raw/tables/Spell` is an Area-52 Free-Pick overlay. For CoA, use the base-chain/CoA realm Spell table instead. Treat `powerType` as a client-data field, not proof that every specialization uses exactly one resource; corroborate with actual CoA spells and gameplay.

The larger upstream spell buckets, client tables, items, NPCs, quests, WDB and world databases have **not** been imported by this commit. Do not claim full mirroring. Large datasets should be fetched into versioned external storage and indexed, not dumped into Cloudflare's static-site bundle.

Other high-value sources to ingest and reconcile:
- https://github.com/Bharph/coa-preservation-data
- https://github.com/hertigservices/ascension-data
- https://github.com/Dandenas/coa-questie
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa
- https://github.com/IOUJared/ascension-armory
- https://github.com/Nighthawk42/ascension-db
- https://coa-development.org/

For each additional import, record source commit, realm, snapshot date, license, record counts, checksum, and validation status.
