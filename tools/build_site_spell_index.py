#!/usr/bin/env python3
"""Publish a compact browser-searchable spell index from the validated archive."""
import gzip,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=root/"datasets/relationships/enriched-spells-by-id.json.gz"
with gzip.open(source,"rt",encoding="utf-8") as f:records=json.load(f)
registry=json.loads((root/"datasets/normalized/coa-class-spec-id-registry.json").read_text(encoding="utf-8"))
class_names={str(r["classId"]):r["className"] for r in registry["records"]}
rows=[]
for sid,record in records.items():
    definition=record.get("spellDefinition",{}).get("fields",{})
    evid=record.get("relationshipEvidence",[])
    names=sorted({str(e.get("spellName") or e.get("abilityName") or e.get("nodeName")) for e in evid if e.get("spellName") or e.get("abilityName") or e.get("nodeName")})
    name=definition.get("name") or (names[0] if names else "Unknown spell")
    rows.append({"id":int(sid),"n":name,"c":record["classIds"],"s":record["candidateSpecIds"],
                 "d":definition.get("description") or "",
                 "cd":definition.get("cooldownMs"),"ct":definition.get("castTimeMs"),
                 "du":definition.get("durationMs"),"p":definition.get("powerType"),
                 "m":definition.get("manaCost"),"defined":bool(definition),
                 "e":len(evid)})
rows.sort(key=lambda r:r["id"])
dest=root/"site/data/spell-search-index.json"
dest.parent.mkdir(parents=True,exist_ok=True)
dest.write_text(json.dumps({"schemaVersion":1,"versionStatus":"archived, not current-client verified","classes":class_names,"records":rows},ensure_ascii=False,separators=(",",":"))+chr(10),encoding="utf-8")
print("Published",len(rows),"searchable spell records")
assert len(rows)>9000
