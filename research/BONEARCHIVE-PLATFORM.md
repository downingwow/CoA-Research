# BoneArchive platform scope and provenance

The public GitHub Pages site is static. It cannot receive, authenticate, store, index or publicly share user-uploaded logs. The first log explorer reads a selected text log locally in the browser, summarizes event types and candidate ability casts, and exports JSON. It is **not** an upload backend, historical report browser, full parser, or boss encounter analyzer. Public uploads require a separate secure service with authentication, explicit consent, moderation, retention policy, abuse controls, storage and processing costs.

## Planned research-backed sections

1. Original Bisbeard-like gear planner: item source/license audit, phase/class/spec catalog, eligibility, sockets, sets, stats, enchants, caps, source-attributed reconstructed sets and explicit original BiS when recovered.
2. Ascension Logs-like report explorer: links to legitimately accessible historical reports, locally analyzed logs, normalized encounter timelines, comparisons and a separately deployed upload service when ready.
3. Meta and tier browser: only rankings tied to metric, difficulty, phase, sample size, snapshot and methodology. No fake S/A/B rankings.
4. Talents and builds: versioned tree references and observed build evidence; avoid presenting theorycrafted recommendations as historical fact.
5. DBM research: combat event schema, source GUID/NPC identification, ability IDs, cast intervals, phases and confidence per encounter; corroborate multiple pulls.

## Third-party rules

CoA Logs FAQ https://coa.ascensionlogs.gg/faq permits public API use with attribution but forbids bulk redistribution. Use its API with permission and do not republish entire historical datasets. Public code and datasets have their own licenses; no blanket copying of Bisbeard or Ascension Sidekick assets or designs. Sidekick is an inspiration for *feature categories*, not source code or visual design.

## Log parser caveats

WoW 3.3.5 combat logs vary in prefixes, quoted fields and expansion-specific events. The initial browser analyzer is deliberately a rough local event summary; it does not correctly attribute all combat mechanics, infer absorb amounts, group encounters, identify pets, or calculate DPS/HPS. Validate any DBM timer against multiple complete pulls and client logs before using it.
