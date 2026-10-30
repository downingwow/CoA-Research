# CoA Development database — upstream GitHub source check (2026-10-30)

Public database: https://coa-development.org/database
Public talent calculator: https://coa-development.org/talents
Upstream server repository: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa

## Confirmed

- The CoA Development site advertises its database as an item/spell search of its test realm.
- The public `Conquest-of-AzerothCore/azerothcore-wotlk-coa` repository exists and its recent commit history includes DB, spells, items, NPCs and class-mechanics changes.
- This is a promising primary upstream source for server implementation and world database changes, not evidence of a direct mirror of every record served by the website.
- The public website renders database search content dynamically, and the web text reader did not expose its underlying full search data.

## Not yet confirmed

- Whether the site's search API reads directly from a GitHub-generated dump, the live test realm DB, or another index.
- Exact source repository, branch, revision and schema for the web site's database search.
- Full item/spell export or one-to-one parity with the current test realm.

## Integration policy

Use BoneArchive `site/data/<class key>.json` as the existing canonical talent calculator dataset. Use the CoA Development upstream GitHub repository as a separately versioned source for mechanics and DB changes. Do not overwrite class/spell identities based solely on approximate names; link by verified IDs and preserve provenance. Prefer importing concrete upstream data after verifying file paths, license and schema, and record source commit SHAs.
