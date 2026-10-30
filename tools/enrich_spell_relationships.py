#!/usr/bin/env python3
"""Enrich archived CoA spell relationships with source spell definitions.

Explicit one-time invocation: python tools/enrich_spell_relationships.py
Never assumes archived values represent the current Conquest Reborn build.
"""
import collections
import gzip
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "datasets"
REL = BASE / "relationships"
SHARDS = BASE / "bulk" / "srhinos__coa-datamine" / "data" / "spells" / "by-id"

def load_gz(path):
    with gzip.open(path, "rt", encoding="utf-8") as f:
        return json.load(f)

def main():
    graph = load_gz(REL / "spells-by-id.json.gz")
    wanted = set(graph)
    definitions = {}
    duplicates = collections.Counter()
    bad_lines = 0
    scanned = 0
    files = 0
    fields = ("id", "name", "description", "subtext", "rank", "icon", "iconId",
              "castTime", "castTimeMs", "cooldown", "cooldownMs", "recoveryTime",
              "categoryRecoveryTime", "duration", "durationMs", "range", "rangeMin",
              "rangeMax", "powerType", "manaCost", "powerCost", "attributes",
              "effects", "effect", "aura", "school", "schoolMask", "procFlags",
              "charges", "maxCharges", "stackAmount", "spellLevel", "baseLevel",
              "requiredLevel")
    for path in sorted(SHARDS.glob("*.jsonl.gz")):
        files += 1
        with gzip.open(path, "rt", encoding="utf-8") as f:
            for line in f:
                try:
                    record = json.loads(line)
                except (ValueError, TypeError):
                    bad_lines += 1
                    continue
                scanned += 1
                if not isinstance(record, dict):
                    continue
                sid = record.get("id")
                if type(sid) is not int or str(sid) not in wanted:
                    continue
                key = str(sid)
                if key in definitions:
                    duplicates[key] += 1
                    continue
                definitions[key] = {"source": "srhinos/coa-datamine", "sourceFile": path.name.removesuffix(".gz"),
                                    "versionStatus": "archived base Spell.dbc; not confirmed for current Conquest Reborn",
                                    "fields": {k: record[k] for k in fields if k in record},
                                    "otherAvailableFields": sorted(k for k in record if k not in fields)}
    enriched = {}
    field_counts = collections.Counter()
    for key, relationship in graph.items():
        item = {"spellId": relationship["spellId"], "classIds": relationship["classIds"],
                "candidateSpecIds": relationship["candidateSpecIds"],
                "relationshipEvidence": relationship["evidence"]}
        if key in definitions:
            item["spellDefinition"] = definitions[key]
            field_counts.update(definitions[key]["fields"].keys())
        enriched[key] = item
    output = REL / "enriched-spells-by-id.json.gz"
    with gzip.open(output, "wt", encoding="utf-8", compresslevel=6) as f:
        json.dump(enriched, f, ensure_ascii=False, separators=(",", ":"))
    report = {"schemaVersion": 1, "scope": "archived CoA class-linked spells",
              "sourceCaveat": "Spell definitions derive from the archived BASE Spell.dbc; values are not confirmed against current Conquest Reborn.",
              "sourceFilesScanned": files, "spellDefinitionRowsScanned": scanned,
              "relationshipSpellIds": len(graph), "definitionsMatched": len(definitions),
              "definitionsMissing": len(graph)-len(definitions), "invalidJsonLines": bad_lines,
              "duplicateDefinitionIds": len(duplicates), "fieldCoverage": dict(field_counts.most_common()),
              "excluded": "Unlinked original-WoW and unassigned spell records remain in raw archive, not this CoA-specific graph.",
              "caution": "A field being present does not establish its units or current-client semantics. No guessed cooldown or duration conversion is performed."}
    (REL / "enrichment-report.json").write_text(json.dumps(report, indent=2)+"\n", encoding="utf-8")
    print(json.dumps({k: report[k] for k in ("sourceFilesScanned","spellDefinitionRowsScanned","relationshipSpellIds","definitionsMatched","definitionsMissing")},indent=2))
    assert files > 0, "No collected spell shards found"
    assert len(enriched) == len(graph)
    assert len(definitions) > 0, "No spell definitions matched"

if __name__ == "__main__":
    main()
