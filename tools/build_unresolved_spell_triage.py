#!/usr/bin/env python3
"""Produce a reproducible research queue for class-linked CoA spell IDs lacking
both archived Spell.dbc definitions and preserved historical tooltips.
No live-client verification is implied.
"""
import collections
import csv
import gzip
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REL = ROOT / "datasets/relationships"
REG = ROOT / "datasets/normalized/coa-class-spec-id-registry.json"
OUT = ROOT / "research"

def read_gzip(path):
    with gzip.open(path, "rt", encoding="utf-8") as handle:
        return json.load(handle)

def main():
    graph = read_gzip(REL / "enriched-spells-by-id.json.gz")
    tooltip = read_gzip(REL / "historical-tooltip-fallbacks.json.gz")
    registry = json.loads(REG.read_text(encoding="utf-8"))
    classes = {int(r["classId"]): r["className"] for r in registry["records"]}
    specs = {int(r["specId"]): r["displaySpecName"] for r in registry["records"]}
    queue = []
    counts = collections.Counter()
    for sid, record in graph.items():
        if "spellDefinition" in record or sid in tooltip:
            continue
        class_ids = record.get("classIds") or []
        spec_ids = record.get("candidateSpecIds") or []
        evidence = record.get("relationshipEvidence") or []
        evidence_sources = sorted({str(e.get("source") or e.get("sourceFile") or "unspecified") for e in evidence if isinstance(e, dict)})
        row = {
            "spellId": int(sid),
            "classIds": ",".join(map(str, class_ids)),
            "classNames": ", ".join(classes.get(i, "Unknown class " + str(i)) for i in class_ids),
            "candidateSpecIds": ",".join(map(str, spec_ids)),
            "candidateSpecNames": ", ".join(specs.get(i, "Unknown spec " + str(i)) for i in spec_ids),
            "evidenceCount": len(evidence),
            "evidenceSources": "; ".join(evidence_sources),
            "status": "unresolved-archived-definition-and-tooltip",
            "currentClientVerified": "no",
        }
        queue.append(row)
        for cid in class_ids:
            counts[classes.get(cid, str(cid))] += 1
    queue.sort(key=lambda r: (-r["evidenceCount"], r["spellId"]))
    OUT.mkdir(parents=True, exist_ok=True)
    csv_path = OUT / "COA-UNRESOLVED-SPELL-TRIAGE.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(queue[0]) if queue else [
            "spellId", "classIds", "classNames", "candidateSpecIds",
            "candidateSpecNames", "evidenceCount", "evidenceSources",
            "status", "currentClientVerified"
        ])
        writer.writeheader()
        writer.writerows(queue)
    report = {
        "schemaVersion": 1,
        "linkedSpells": len(graph),
        "spellDbcDefinitions": sum("spellDefinition" in v for v in graph.values()),
        "tooltipFallbackOnly": sum("spellDefinition" not in v and k in tooltip for k, v in graph.items()),
        "unresolved": len(queue),
        "unresolvedByClass": dict(sorted(counts.items())),
        "highestEvidenceUnresolved": queue[:25],
        "sourceCaveat": "Archived data; unresolved means absent from these two collected sources, not absent from the game.",
        "followup": "Review source provenance, variant/client snapshots, class spellbooks, and verified current-client spellbook observations before filling records."
    }
    (REL / "unresolved-spell-triage.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    assert len(queue) == 364, "Expected 364 unresolved IDs; investigate archive drift"
    assert len(graph) == 9656
    print("Triage complete:", len(queue), "unresolved spell IDs")

if __name__ == "__main__":
    main()
