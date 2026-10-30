#!/usr/bin/env python3
"""Build searchable cross-source CoA ID catalog and provenance/quality reports.

No inferred client compatibility: source generations are kept separate.
Only explicit numeric IDs from collector-generated source indexes are used.
"""
import collections
import datetime
import gzip
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
BULK = ROOT / "datasets" / "bulk"
OUTPUT = ROOT / "datasets" / "catalog"
CATEGORY_ENTITY = {
    "spells": "spell", "abilities": "spell", "arena-abilities": "spell",
    "tooltips": "spell", "npcs": "npc", "items": "item",
    "quests": "quest", "talents": "talent",
}
# These datasets reflect different historical/live snapshots. A shared ID is
# evidence of a matching number, not proof of identical gameplay semantics.
SOURCE_LABELS = {
    "srhinos/coa-datamine": "mixed datamine; client version unverified",
    "Bharph/coa-preservation-data": "historical preservation; client version unverified",
    "johnayoung/coa-arena": "arena dataset; client version unverified",
}

def read_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def write_gzip(path, data):
    with gzip.open(path, "wt", encoding="utf-8", compresslevel=6) as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = read_json(BULK / "manifest.json")
    catalog = collections.defaultdict(dict)
    report = {"generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
              "sourceManifestGeneratedAt": manifest.get("generatedAt"),
              "sourceFiles": {}, "categories": {}, "warnings": [], "errors": list(manifest.get("errors", [])),
              "schema": 1}
    for src in manifest.get("sources", []):
        category = src["category"]
        repo = src["repository"]
        files = src.get("files", [])
        report["sourceFiles"][repo + "/" + category] = len(files)
        if not files:
            report["warnings"].append({"source": repo, "category": category, "issue": "no files collected"})
        if category not in CATEGORY_ENTITY:
            continue
        path = ROOT / src["index"]
        if not path.exists():
            report["errors"].append({"source": repo, "category": category, "issue": "missing ID index"})
            continue
        with gzip.open(path, "rt", encoding="utf-8") as f:
            index = json.load(f)
        entity = CATEGORY_ENTITY[category]
        valid = 0
        for pair in index.get("ids", []):
            if not isinstance(pair, list) or not pair or type(pair[0]) is not int or pair[0] <= 0:
                continue
            ident, name = pair[0], pair[1] if len(pair) > 1 else None
            key = str(ident)
            record = catalog[entity].setdefault(key, {"id": ident, "sources": []})
            record["sources"].append({"repository": repo, "category": category,
                                      "name": name if isinstance(name, str) and name.strip() else None,
                                      "versionStatus": SOURCE_LABELS.get(repo, "unverified")})
            valid += 1
        report["categories"][repo + "/" + category] = {"indexedIds": valid, "parsedRecords": src.get("parsedRecords", 0)}
    total = 0
    for entity, records in sorted(catalog.items()):
        for rec in records.values():
            rec["sources"].sort(key=lambda x: (x["repository"], x["category"]))
        write_gzip(OUTPUT / (entity + "-by-id.json.gz"), dict(sorted(records.items(), key=lambda x: int(x[0]))))
        multisource = sum(len({s["repository"] for s in r["sources"]}) > 1 for r in records.values())
        conflicting_names = sum(len({s["name"].strip().casefold() for s in r["sources"] if s["name"]}) > 1 for r in records.values())
        report["categories"][entity] = {"uniqueIds": len(records), "multipleRepositories": multisource,
                                         "differentSourceNames": conflicting_names}
        total += len(records)
    report["totalUniqueTypedIds"] = total
    (OUTPUT / "quality-report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print("Catalog complete:", total, "typed IDs,", len(report["errors"]), "source errors")
    for key, value in sorted(report["categories"].items()):
        if "uniqueIds" in value:
            print(key, value)

if __name__ == "__main__":
    main()
