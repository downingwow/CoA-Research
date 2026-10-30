#!/usr/bin/env python3
"""Manually build evidence-backed CoA spell/talent/class relationships from archived shards.

Run: python tools/build_spell_talent_graph.py
Requires collected datasets/bulk shards; does not fetch, schedule or infer current-game truth.
"""
import collections
import gzip
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BULK = ROOT / "datasets/bulk"
DEST = ROOT / "datasets/relationships"
REPO = "srhinos__coa-datamine"

def load(path):
    return json.loads(path.read_text(encoding="utf-8"))

def shard(path):
    with gzip.open(BULK / REPO / (path + ".gz"), "rt", encoding="utf-8") as f:
        return json.load(f)

def positive(v):
    return type(v) is int and v > 0

def main():
    registry = load(ROOT / "datasets/normalized/coa-class-spec-id-registry.json")["records"]
    by_class = collections.defaultdict(list)
    for spec in registry:
        by_class[spec["classId"]].append(spec)
    manifest = load(BULK / "manifest.json")
    entries = [x for src in manifest["sources"] if src["repository"] == "srhinos/coa-datamine"
               and src["category"] in ("talents", "abilities") for x in src["files"]]
    graph = {}
    nodes = []
    unresolved = []
    skipped_other_classes = []
    counts = collections.Counter()
    for entry in entries:
        path = entry["path"]
        try:
            doc = shard(path)
        except (OSError, ValueError, json.JSONDecodeError) as exc:
            unresolved.append({"path": path, "reason": "unreadable-shard", "detail": str(exc)})
            continue
        class_id = doc.get("classId")
        if not positive(class_id) and "/abilities/_" in path:
            skipped_other_classes.append({"path": path, "reason": "unattributed-residual-or-metadata"})
            continue
        if not positive(class_id):
            unresolved.append({"path": path, "reason": "missing-class-id"})
            continue
        class_specs = by_class.get(class_id, [])
        if not class_specs:
            skipped_other_classes.append({"path": path, "classId": class_id})
            continue
        if "/talents/" in path:
            tab_names = {t["tabId"]: t["tabName"] for t in doc.get("tabs", []) if positive(t.get("tabId"))}
            for node in doc.get("nodes", []):
                node_id = node.get("id")
                tab_id = node.get("tabId")
                if not positive(node_id):
                    continue
                name = tab_names.get(tab_id)
                matched = [s for s in class_specs if name and (name == s.get("archivedTalentTab") or name == s.get("archivedCadTab"))]
                spec_ids = sorted({s["specId"] for s in matched})
                relation = {"classId": class_id, "nodeId": node_id, "nodeName": node.get("name"),
                            "tabId": tab_id, "archivedTabName": name, "candidateSpecIds": spec_ids,
                            "mappingConfidence": "archived-tab-name" if len(spec_ids) == 1 else "unresolved",
                            "requiredNodeIds": [v for v in node.get("requiredIds", []) if positive(v)],
                            "connectedNodeIds": [v for v in node.get("connectedNodeIds", []) if positive(v)],
                            "maxPoints": node.get("maxPoints"), "entryType": node.get("entryType"),
                            "spellIds": sorted({v for v in ([node.get("spellId")] + node.get("spellIds", []) +
                                [r.get("spellId") for r in node.get("rankDescriptions", []) if isinstance(r, dict)]) if positive(v)}),
                            "source": path}
                nodes.append(relation)
                counts["talentNodes"] += 1
                if not spec_ids and name != "Class":
                    counts["unmappedTalentNodes"] += 1
                for sid in relation["spellIds"]:
                    record = graph.setdefault(sid, {"spellId": sid, "evidence": []})
                    record["evidence"].append({"type": "talent-node", "classId": class_id, "nodeId": node_id,
                        "archivedTab": name, "candidateSpecIds": spec_ids, "source": path})
                    counts["talentSpellEdges"] += 1
        elif "/abilities/" in path:
            for ability in doc.get("abilities", []):
                for member in ability.get("members", []):
                    sid = member.get("id")
                    if not positive(sid):
                        continue
                    record = graph.setdefault(sid, {"spellId": sid, "evidence": []})
                    evidence = {"type": "ability-member", "classId": class_id, "abilityName": ability.get("name"),
                                "spellName": member.get("name"), "rank": member.get("rank"),
                                "generation": member.get("generation"), "source": path}
                    tabs = sorted({e.get("tab") for e in member.get("evidence", {}).get("cad", [])
                                   if isinstance(e, dict) and isinstance(e.get("tab"), str)})
                    if tabs:
                        evidence["cadTabs"] = tabs
                        evidence["candidateSpecIds"] = sorted({s["specId"] for s in class_specs
                            if s.get("archivedCadTab") in tabs or s.get("archivedTalentTab") in tabs})
                    record["evidence"].append(evidence)
                    counts["abilitySpellEdges"] += 1
    for record in graph.values():
        record["classIds"] = sorted({e["classId"] for e in record["evidence"]})
        record["candidateSpecIds"] = sorted({sid for e in record["evidence"] for sid in e.get("candidateSpecIds", [])})
        record["evidence"].sort(key=lambda e: (e["classId"], e["type"], e.get("nodeId", 0), e.get("abilityName") or ""))
    node_ids = {(n["classId"], n["nodeId"]) for n in nodes}
    missing_links = [{"classId": n["classId"], "nodeId": n["nodeId"], "missingRequiredNodeId": dep}
                     for n in nodes for dep in n["requiredNodeIds"] if (n["classId"], dep) not in node_ids]
    DEST.mkdir(parents=True, exist_ok=True)
    with gzip.open(DEST / "spells-by-id.json.gz", "wt", encoding="utf-8") as f:
        json.dump({str(k): graph[k] for k in sorted(graph)}, f, separators=(",", ":"), ensure_ascii=False)
    with gzip.open(DEST / "talent-nodes.json.gz", "wt", encoding="utf-8") as f:
        json.dump(nodes, f, separators=(",", ":"), ensure_ascii=False)
    report = {"schemaVersion": 1, "sourceManifestGeneratedAt": manifest.get("generatedAt"),
              "source": "srhinos/coa-datamine archived abilities and talent trees",
              "versionStatus": "not verified for current Conquest Reborn",
              "note": "Candidate specialization relationships are derived from matching archived tab names; never claim confirmed current spec ownership. Class-wide talent tabs may have no spec assignment.",
              "counts": dict(counts), "uniqueLinkedSpellIds": len(graph),
              "missingPrerequisiteCount": len(missing_links), "missingPrerequisiteExamples": missing_links[:100],
              "unresolvedFiles": unresolved, "skippedNonCoAClassFiles": skipped_other_classes}
    (DEST / "quality-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"uniqueLinkedSpellIds": len(graph), **dict(counts), "unresolvedFiles": len(unresolved)}, indent=2))

if __name__ == "__main__":
    main()
