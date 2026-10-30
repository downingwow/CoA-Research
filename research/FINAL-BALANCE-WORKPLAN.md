# Ordered final-balance recovery workflow

1. **Freeze the snapshot:** target original CoA's last live state around early September 2026; establish exact shutdown and last applied restart timestamps from primary records before specifying an authoritative cutoff.
2. **Enumerate 21 classes and all final specs:** resolve names/aliases and fourth-spec additions using 2026-09-02 spellbook map, 2026 talent metadata and late patch notes. Do not assume 69 remains the final count.
3. **Parse original patch history:** obtain the preserved changelog with permitted access; filter CoA realm-specific rows, especially 2026-07-31 through 2026-08-31; order events chronologically; identify IDs and final changes. Distinguish announces from applied-at-restart.
4. **Cross-reference raw mechanics:** connect each spell/talent to rank chains, contemporaneous tooltips, client data, SQL and emulator files; mark missing server multipliers, procs, target caps, threat and periodic/summon attribution. Differentiate PvP and PvE tuning.
5. **Triangulate last-live observed performance:** obtain authorized summaries from CoA AscensionLogs and preserved captures; record boss, phase, difficulty, role, gear and sample selection. Never infer coefficient directly from one DPS ranking.
6. **Test Reborn:** capture in-game client build/date, spell tooltip, talent choices, naked and geared damage/heal samples, base health/armor/resilience, PvP damage and monster multipliers, snapshot/proc/absorb behavior.
7. **Deliver implementation packet:** per-class/spec ledger, confirmed mismatch, supporting primary citations, suggested SQL/C++/script change point, reproducible test with expected output, and uncertainty register.

## High-priority investigations
- Final August changes not yet applied at last shutdown restart
- Missing post-February 2026 fourth-spec nodes from frozen client JSON
- Monster-only bonuses vs PvP damage multipliers
- Broad health/resilience changes vs class-specific survivability
- Final boss difficulty and gearing assumptions in the logs
- Class aliases: Bloodmage/SonOfArugal, Templar/Monk, Venomancer/Prophet, Fleshwarden/Knight of Xoroth, Wildwalker/Primalist, Spiritmage/Runemaster
- Missing Tinker conversion patch noted in existing spell research

See [FINAL-BALANCE-RESTORATION.md](FINAL-BALANCE-RESTORATION.md). Do not label any missing final coefficient as confirmed.
