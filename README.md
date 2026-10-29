# CoA Research — Ascension / Conquest Reborn

**Maintainer:** Uncle Bone · [@downingwow](https://github.com/downingwow)  
**Updated:** 2026-10-29

A durable, searchable index of publicly available and user-supplied research useful for Ascension **Conquest of Azeroth / Conquest Reborn**, particularly WoW **3.3.5a-based** addons. This repository is a research hub, **not** a claim that all external datasets have been mirrored or validated against the live client.

## Start here

| Guide | Contents |
| --- | --- |
| [Source index](sources/INDEX.md) | Main websites, GitHub datasets, archive links, tools, and addon projects |
| [Spell and class data](research/SPELLS-AND-CLASSES.md) | Spellbook, talents, spec mapping and data gaps |
| [Combat and addon engineering](research/COMBAT-AND-ADDONS.md) | Details!, MRT, DBM, pet/summon attribution, history retention and client compatibility |
| [BisBeard preservation](research/BISBEARD.md) | Recovered BisBeard sources, equipment and glyph data |
| [Archive inventory](archives/INVENTORY.md) | Local/user-provided archives, provenance and storage constraints |
| [Research rules](research/PROVENANCE.md) | Source conflicts, validation status, update workflow |

**Canonical public sources:** [CoA AzerothCore](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa) · [DealsBeam Ascension DB](https://github.com/DealsBeam/ascension-db) · [CoA preservation data](https://github.com/Bharph/coa-preservation-data) · [CoA Databank](https://github.com/f3rr311/CoA-Databank) · [CoA talents](https://coa-development.org/talents) · [Ascension DB site](https://ascension-db.ascension-archive.workers.dev/).

## Scope and reuse

- Vanilla, TBC and Wrath references are in scope, alongside Ascension custom spells, creatures, systems and class mechanics.
- Optimize addons for Conquest Reborn's **3.3.5a-based** client; support default Blizzard UI, DragonUI and ElvUI where relevant. Independent complete UI replacements need not coexist with other full UI replacements.
- Treat server core SQL, public community calculators and archived pages as **reference** until spell IDs, effect ownership and API behavior are corroborated by live-client data/logs.
- Keep research separate from distributable addon payloads to avoid huge memory/installation overhead.
- Recheck external repository branches, commits and licensing before redistributing third-party data/code.
- Do **not** commit user credentials, local account details, character data or private logs.

This is an openly maintained knowledge index. To preserve source content long-term, see [archive inventory](archives/INVENTORY.md); external links can disappear.
