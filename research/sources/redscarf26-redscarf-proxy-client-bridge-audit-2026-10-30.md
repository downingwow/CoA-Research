# Source audit — redscarf26/redscarf_proxy (2026-10-30)

## Identity and purpose
- Source: https://github.com/redscarf26/redscarf_proxy
- Inspected default-branch tree SHA: `04b9c8f218f4034cfac0d18945c30e0b0c3478b5`, 324 entries, not truncated.
- Upstream describes **redscarf** as a **local 3.4.3.54261 Wrath Classic client to 3.3.5a realm protocol bridge**, intended for servers such as AzerothCore. It is **not** a WoW emulator or direct replacement for the 3.3.5a client.
- Language/build: Go module `redscarf`, `go 1.23.2`, dependencies `filippo.io/edwards25519` and `google.golang.org/protobuf`.
- Operational upstream prerequisites: user-supplied `WowClassic.exe` build **3.4.3.54261**, Arctium WoW Launcher, running 3.3.5a auth/world realm and locally running proxy. The upstream README reports a release workflow producing Windows packages. Neither runtime interoperability nor security was verified in this audit.

## Useful code architecture and observed paths
- `cmd/redscarf-proxy/main.go`: program entry point.
- `internal/bnet/`: newer Battle.net-related authentication/framing/messages.
- `internal/legacyauth/`: 3.3.5a account/auth/SRP logic.
- `internal/legacyworld/` and `internal/modernworld/`: separate world-protocol implementations, including compatibility mappings.
- `internal/modernworld/combat_log.go`, `combat.go`, `aura.go`: translations relating to combat-log events, auras and combat.
- `internal/modernworld/creature_query.go`, `encounter.go`, `group.go`, `chat.go`: creature, encounter, group and chat semantics.
- `internal/proxy/`: runtime mediation and translation, including `server.go`, `encounter.go`, `loot_roll.go`, `map_difficulty.go`, `guild.go`, `runtime_misc.go` and associated tests.
- `.github/workflows/package.yml`: release packaging workflow.
- `config.ini.example`: example local path and auth server endpoint configuration; **do not commit private connection settings**.

## Local network and safety context
- README says the launcher points a version check at `127.0.0.1:8080`, configures the client portal to `127.0.0.1:7000`, and forwards to the configured legacy auth server (example default port 3724). These are **documented default examples**, not verified packet traces.
- This tool intermediates client login and traffic. Treat it as security-sensitive: inspect credentials/auth-handling, remote update/release artifacts, transport trust, protocol parsing and account exposure before running. Do not suggest direct connection to live Conquest Reborn absent explicit authorization, compatibility and security testing.
- A user-supplied compatible modern client/launcher is still necessary. This reference **does not itself provide a 64-bit Conquest Reborn client**, increased memory capacity on existing 32-bit executables, or support for custom CoA assets.

## Potential CoA research uses
1. **Future client compatibility investigation:** evaluate whether newer clients can theoretically bridge to a 3.3.5a-based server; enumerate packet/opcode, auth, data schema, and custom content gaps. This is a research starting point, **not** a confirmed workable solution for Ascension Conquest Reborn.
2. **Combat event analysis:** inspect how modern versus legacy aura/combat-log records are translated before building log-capture tooling. Translation can lose, synthesize or relabel event detail; check actual source and tests per mechanic.
3. **Addon compatibility:** distinguish modern UI/Lua/API behavior from 3.3.5a; transport-level protocol translation does not guarantee Questie-X, DBM-CoA, AtlasLoot-CoA, LootCollector, etc. will run under the modern client.
4. **Loot and encounter reconciliation:** use code as a mapping reference for item/creature/encounter packet structures, never as proof of live CoA-specific drops, spells, boss timers or loot tables.
5. **Cross-reference with lineagedr/3.4.3_Source:** keep source-code engine research separate from client protocol proxy. Both are version-migration references, not authoritative Conquest Reborn content.

## Audit limits and classification
- Verified upstream README, example configuration, Go module and complete top-level Git tree inventory. **Not executed, compiled, security-audited, or verified on Conquest Reborn.**
- **Evidence class:** upstream self-described experimental client compatibility tool / protocol research; **not current CoA gameplay data**.
- Do not copy credentials, launcher binaries or third-party code into CoA-Research. Preserve upstream attribution and evaluate code licensing before reuse; no root license was confirmed during this inspection.
