# Research provenance and update policy

Maintainer: Uncle Bone (@downingwow)

## Evidence flags
- **Observed** — specific contents, size or repository path inspected.
- **Reported** — claimed in a README, archive description, or previous work but not independently extracted.
- **Candidate** — potential spell/class/summon mapping requiring live verification.
- **Verified in client** — tested directly in Conquest Reborn on a recorded client build.
- **Imported into addon** — explicitly identify commit, release and exact data subset imported.

GitHub project updates in October 2026 do **not** imply their underlying datasets reflect that date. Prefer snapshot/revision dates over repository pushed-at dates. Preserve disagreements and unknown fields.

## Future additions
1. Add the source to `sources/INDEX.md` with exact URL and why it matters.
2. Record evidence and limitations in the appropriate `research/` document.
3. For extracted content, store reproducible scripts, manifest, checksum and source license when allowed.
4. Mark client-tested IDs and compare with other sources.
5. When implementing in an addon, cite the commit/release and test evidence here.

No assumption that files and links indexed here are downloaded, mirrored, archived, currently reachable or authoritative. This is a shared reference catalog, not a dependency automatically loaded by individual addons.
