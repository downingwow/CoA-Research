# Source audit — alseif0x/rustycore-extractors (2026-10-30)

## Provenance
- Upstream: https://github.com/alseif0x/rustycore-extractors
- Inspected default branch: `forever`; Git tree SHA `7aff29167d466f2aa7ed05b0b1eee16b235fae9c`; 1,671 tree entries, `truncated: false`.
- Repository description: offline client-data tools for RustyCore. Existing C++ suite targets **3.4.3.51943**; separate Rust development targets **WoW Forever 1.60.1** beta builds. Do not treat the two version tracks as interchangeable.
- Upstream README and `LICENSE`: GPL-3.0-or-later indicated; repository also contains third-party license notices and separate licenses. Retain terms/attribution when reusing code.

## Two explicitly separate extraction systems
1. **Preserved WotLK Classic C++20 tool suite**, 3.4.3, specific build **51943** (`3.4.3` branch). Standalone local client-data extraction, not a 3.3.5a extractor.
2. **Rust Forever pipeline** (`forever` branch), development targeting **WoW Forever 1.60.1 Beta x64**, including build-specific profiles **70374**, **70425**, **70450**. Linux prioritized, Windows delivery deferred. Not a completed comprehensive extractor or live CR client conversion.

## Capabilities shown by upstream's current-status documentation
- CASC client file acquisition with build-specific catalogs, explicit authorization/verification for encrypted sections, and content manifests.
- DB2 decoding/packaging: upstream reports a **real build-70450 esES v16** package with 1,055 readable declarations out of 1,161; 106 encrypted declarations lacked a usable key.
- GameTables and raw camera data: v19 reports 20 GameTables, ten camera files and selected CinematicCamera DB2.
- Terrain/MAPS: v20 reports 3,322 MAPS tiles and 71 tilelists, but notes important wire-format parity assumptions remain unproven.
- Collision/VMaps and navigation/MMaps: selected-map real scoped packages and tests reported, **not full-world or complete runtime acceptance**. In particular, upstream reports v23 scoped navigation and a RustyCore consumer integration.
- Contract-driven tools and tests: `contracts/` contains build-specific JSON manifests, extraction and verification contracts; `crates/forever-casc/` contains Rust CASC library code; `Cargo.toml`, `CMakeLists.txt` and CI workflows define both build lines.
- Upstream says **full client extraction, full world resources, full RustyCore runtime qualification and Windows delivery are unfinished**.

## Relevance to CoA-Research
- Valuable engineering reference for **client data discovery**, extraction manifests, offline verification, reliable version/build provenance, database schema cataloging and partial encrypted-section detection.
- Can inform improvements to our item, spell, NPC and map catalog pipeline **conceptually**, while preserving the distinction between 3.3.5a **MPQ/DBC** content and newer **CASC/DB2** formats.
- Compare with the previously cataloged **lineagedr/3.4.3_Source**, **redscarf26/redscarf_proxy**, and **neeme22/azerothcore-343** as modern-client research, but note that RustyCore tools target **3.4.3.51943**, not the proxy/gateway's **3.4.3.54261**, and Forever builds differ again.
- Direct use for Conquest Reborn 3.3.5a, its custom CoA classes/spells/items and current live mechanics is **not established**. Tools are not proof of a custom item drop source, gameplay bug, or a new compatible client.

## Verification boundary and security
- Inspected GitHub repository metadata, complete default-branch tree inventory and upstream README on 2026-10-30.
- **Did not clone, compile or run extractors, independently reproduce claimed extraction counts or import raw output datasets.**
- Prefer extracting from a user-owned, authorized local client installation; do not attempt to bypass protected encryption or distribute game assets without rights.
- Future task: test precise release/build compatibility against our own supplied client data before adapting any extractor; maintain reproducible source hashes and data licenses.
