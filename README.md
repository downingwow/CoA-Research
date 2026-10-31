# CoA Research — Conquest Reborn Addon & Data Hub

**Maintainer:** Uncle Bone · [@downingwow](https://github.com/downingwow)

A searchable collection of research, reference data, and engineering notes supporting addons for Ascension's **Conquest of Azeroth / Conquest Reborn**. It brings together the sources and compatibility findings used to build, update, and maintain the CoA addon lineup, alongside preservation work for useful community data and older projects.

This repository is the research and reference hub. Installable addon builds are published in their individual repositories under [downingwow](https://github.com/downingwow?tab=repositories); use each addon's README or Releases page for its current download. Research files here are not packaged addon releases, and external data is not assumed to be complete or validated against the live client.

## Start here

| Guide | Contents |
| --- | --- |
| [Source index](sources/INDEX.md) | Websites, GitHub datasets, archives, tools, and related addon projects |
| [Spell and class data](research/SPELLS-AND-CLASSES.md) | Spellbook, talents, specialization mapping, and known data gaps |
| [Combat and addon engineering](research/COMBAT-AND-ADDONS.md) | Details!, MRT, DBM, pet and summon attribution, history retention, and client compatibility |
| [BisBeard preservation](research/BISBEARD.md) | Recovered sources, equipment, and glyph data |
| [Archive inventory](archives/INVENTORY.md) | Local and user-provided archives, provenance, and storage constraints |
| [Research rules](research/PROVENANCE.md) | Source conflicts, validation status, and update workflow |

## What we collect

- **CoA addon development references:** client compatibility, available APIs, spell and class behavior, combat logging, UI frameworks, and known integration considerations.
- **Public reference datasets:** core data, spells, talents, creatures, items, and other game information from CoA and Ascension sources.
- **Community addon and preservation material:** useful upstream projects, recovered sources, historical data, and archives that inform CoA-specific maintenance.
- **Provenance and validation notes:** source URLs, branches or revisions, licensing considerations, gaps, and confidence so findings can be checked and updated.

**Starting sources:** [CoA AzerothCore](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa) · [DealsBeam Ascension DB](https://github.com/DealsBeam/ascension-db) · [CoA preservation data](https://github.com/Bharph/coa-preservation-data) · [CoA Databank](https://github.com/f3rr311/CoA-Databank) · [CoA talents](https://coa-development.org/talents) · [Ascension DB site](https://ascension-db.ascension-archive.workers.dev/).

## Scope and reuse

- Vanilla, TBC, and Wrath references are in scope, alongside Ascension custom spells, creatures, systems, and class mechanics.
- Target addons to Conquest Reborn's **3.3.5a-based** client; consider the default Blizzard UI, DragonUI, and ElvUI where relevant. Independent complete UI replacements are not expected to coexist with other full UI replacements.
- Treat server SQL, community calculators, and archived pages as reference until spell IDs, effect ownership, and API behavior are corroborated with live-client data or logs.
- Keep research separate from distributable addon payloads to avoid unnecessary memory and installation overhead.
- Check upstream branches, revisions, and licensing before redistributing third-party data or code.
- Do not commit credentials, local account details, character data, or private logs.

This is an openly maintained knowledge index. To preserve source content for long-term access, see the [archive inventory](archives/INVENTORY.md); external links can disappear.
