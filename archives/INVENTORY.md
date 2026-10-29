# Database and archive inventory

## User-provided archive — not copied to GitHub

| Item | Known details |
| --- | --- |
| Name | `ascension-data-main(2).zip` |
| Size | ~420,659,725 bytes (~401 MiB) |
| Entries | 22,678 observed archive entries |
| Provenance | User-shared ChatGPT Library archive |
| Library reference | `libfile_08cbcf4f4dbc819188437e1945f3200c` |
| Share URL | https://chatgpt.com/library/share/libfile_08cbcf4f4dbc819188437e1945f3200c?account_id=personal |
| Status | Link/index recorded **only**; original ZIP was **not uploaded or mirrored to this repository** |

An earlier archive name was `ascension-data-main(1).zip`; version-equivalence and complete content have not been verified. Preserve both labels when tracing changes.

### Why no direct ZIP commit?
GitHub regular Git blobs have a 100 MiB hard file limit, and repository writes here are designed for text. Uploading a >400 MB file requires Git LFS or external artifact storage with appropriate limits; a Library share link may require ChatGPT authentication or later expire.

## Public corpora currently indexed but not mirrored
- https://github.com/Bharph/coa-preservation-data — class spellbook and tooltip preservation; potential referenced external data packs.
- https://github.com/DealsBeam/ascension-db — SQL conversion with 464,048 rows.
- https://github.com/f3rr311/CoA-Databank — coabuildhub/client datamine source material.
- https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa — server and world data (large project).
- https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw — BisBeard captures.
- https://github.com/kevinvongmany/bisbeard-db — glyph capture.

## Recommended durable preservation
Keep this **index and derived manifests** in CoA-Research; preserve large third-party data as pinned upstream revisions or legally permitted mirrors, with source licenses. Keep user-private game files in private storage. For every large archive, record SHA-256, bytes, source timestamp, license, and extraction script version when available. Do not treat a URL as a verified copy.
