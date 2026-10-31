# johnayoung/coa-arena — spell and ability research source

**Source:** https://github.com/johnayoung/coa-arena (README and source inspected 2026-10-30)  
**Upstream snapshot examined:** main tree `97c8aac3578e037de093defd4d9ca9241358a2e7`  
**Provenance:** Independent community extraction of a July 2026-era Project Ascension client, **not verified live Conquest Reborn server behavior**. Preserve upstream attribution. No explicit license was advertised in the GitHub repository metadata at inspection; do not assume code or creative tier-list content is freely relicensable.

## Existing material already in CoA-Research
- `datasets/bulk/johnayoung__coa-arena/output/classified_tags.json.gz`
- `datasets/bulk/johnayoung__coa-arena/output/classified_tags_cerebras.json.gz`
- `datasets/bulk/johnayoung__coa-arena/output/threeway_review_queue.json.gz`
- `datasets/bulk/indexes/johnayoung__coa-arena__arena-abilities.json.gz`

These were present before this documentation update. This entry documents upstream coverage without duplicating multi-megabyte files or misrepresenting a complete new import.

## Source inventory
- `README.md`: data sources, caveats, workflow, field descriptions.
- `extract.py`: extraction from `Data/Content/CharacterAdvancementData.json`, `SpellRankData.json`, `patch-T.MPQ/DBFilesClient/Spell.dbc`, `patch-S.MPQ` cast/duration/range/radius DBCs, and `patch-M.MPQ` skill lines, skill-line abilities, talent DBC.
- `recover_hidden_skills.py`: audit of class-core abilities missing from advancement catalog, deduced by skill-line overlap.
- `build_viewer.py`: builds `viewer/data.js` with class/spec name normalization and role labels.
- `build_summary.py`: arena-oriented per-class capabilities and drilldown.
- `classify_llm.py`: heuristic/LLM-derived ability labels; **not authoritative spell mechanics**.
- `output/classified_tags.json`, `classified_tags_cerebras.json`, `threeway_review_queue.json`: classification results and review queue.
- `viewer/data.js`: bundled ability records (upstream source tree reports 3,759,886 bytes).
- `viewer/summary_data.js`: class summaries (1,605,891 bytes).
- `viewer/dps_data.js`, `viewer/tierlist_data.js`: historical, author-curated arena tiers, **not current performance evidence**.
- `viewer/index.html`, `summary.html`, `healing.html`, `tierlist.html`, `dps.html`, plus `CoA-Healer-Tier-List.html`: presentation layers, not independent primary evidence.
- `coa-classes.png`: author's visual class-name corroboration.

Upstream live viewer: https://johnayoung.github.io/coa-arena/viewer/

## Important technical details
The extractor declares the following `Spell.dbc` field indexes for its WotLK-format records: ID=0, CATEGORY=1, CAST_TIME_INDEX=28, RECOVERY=29, CATEGORY_RECOVERY=30, DURATION_INDEX=40, RANGE_INDEX=46, EFFECT=71, EFFECT_BASE_POINTS=80, EFFECT_TRIGGER=116, NAME_ENUS=136, DESC_ENUS=170, GCD_CATEGORY=205, GCD=206, DMG_CLASS=213, SCHOOL_MASK=225. **Validate offsets against the actual client build before generalizing.**

The extractor's published `spell_row()` emits formatted `gcd`, spellId, baseSpellId, cooldown, castTime, tooltip, range, duration, cost, school, etc., but **does not include GCD category in emitted rows**, despite declaring its offset. A raw-client extraction is needed to expose category flags and any server-side exceptions. Recovery and category cooldown are not interchangeable with global cooldown.

It resolves rank chains through `SpellRankData.json`, chooses highest rank for catalog entries, and recovers hidden ClassSkill/ClassSkillPassive using `SkillLine.dbc` and `SkillLineAbility.dbc` (~37,863 assignments per upstream README). Talent recovery uses `Talent.dbc` and tooltip references, with unassignable generic talents separated.

## Name normalizations
Internal class names: `Monk` → **Templar**; `DemonHunter` → **Felsworn**; `SonOfArugal` → **Bloodmage**. Raw class JSON retains internal names, viewer applies display names. Legacy talent tabs can disagree with the actual skill-line specialization; original tab should be preserved alongside normalized spec and `lineSpec`. Verify all mappings against Conquest Reborn before applying to production BiS/addon logic.

## Data caveats
- `realmsMask` and internal `flags` may identify disabled/stale catalog entries, but the relevant realm bits must first be proven.
- Ability text and client DBC records do not establish real server-side balancing or GCD overrides.
- Tooltip formula variables may remain partially unresolved.
- Classification/role labels are heuristic or AI-produced, subject to errors.
- Historical July 13–14, 2026 healer/DPS arena tiers must be labeled historical author analysis and not substituted for current logs/tier lists.
- Use normalized names and recorded source snapshots rather than silently overwriting newer verified Conquest Reborn data.

## Suggested follow-through for CoA-Research and BoneArchive
1. Cross-reference the existing compressed ability index and tags with current canonical class/spec IDs and verified realm masks.
2. Surface historical ability tooltips and provenance as a distinct searchable source.
3. Compare GCD values for Witch Hunter/Inquisition spells such as Dawn Blade, Dusk Blade, Smite Evil, Purifier's Edge and Surging Tonic, extracting the raw GCD category where available.
4. Track source age, client version, realm, confidence, and live validation independently.
5. Keep upstream extraction tools as referenced source code unless reuse rights are clarified; this document is an independent integration audit, not a copied source file.

Maintainer: Uncle Bone — https://github.com/downingwow
