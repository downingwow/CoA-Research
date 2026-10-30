#!/usr/bin/env python3
"""Preserve every BisBeard planner row as a compact, provenance-tagged gear catalog.

These are planner candidates, NOT independently verified best-in-slot rankings.
Planner IDs are strings to prevent precision loss for IDs beyond 32-bit ranges.
"""
import argparse,collections,csv,gzip,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"datasets/gear"
SOURCE_HASH="7733de9bf573b62f451375ea09415f8de86b13c9c131cd6108a0e9a2e716d666"

def main(path):
    OUT.mkdir(parents=True,exist_ok=True)
    tables=collections.Counter()
    phases=collections.Counter()
    slots=collections.Counter()
    classes=collections.Counter()
    statuses=collections.Counter()
    variants=0
    rows=0
    pathout=OUT/"bisbeard-planner-items.jsonl.gz"
    with gzip.open(path,"rt",encoding="utf-8") as inp,gzip.open(pathout,"wt",encoding="utf-8",compresslevel=7) as out:
        for line in inp:
            if not line.strip():continue
            obj=json.loads(line)
            rec=obj.get("record") or {}
            rows+=1
            table=str(obj.get("source_table") or "")
            phase=rec.get("phase")
            slot=str(rec.get("slot") or rec.get("equipLoc") or "")
            cls=rec.get("classes") or []
            status=str(obj.get("comparison_status") or "")
            is_variant=bool(obj.get("is_variant"))
            tables[table]+=1
            phases[str(phase)]+=1
            slots[slot]+=1
            statuses[status]+=1
            if is_variant:variants+=1
            if isinstance(cls,list):
                for name in cls:classes[str(name)]+=1
            slim={
                "plannerId":str(obj.get("planner_id") or ""),
                "baseItemId":str(obj.get("base_item_id") or ""),
                "candidateItemId":str(obj.get("candidate_item_id") or ""),
                "name":rec.get("name"),"phase":phase,"table":table,
                "classes":cls,"slot":slot,"equipLoc":rec.get("equipLoc"),
                "quality":rec.get("quality"),"itemLevel":rec.get("itemLevel"),
                "requiredLevel":rec.get("reqLevel"),"stats":rec.get("stats"),
                "source":rec.get("source"),"sourceCategory":rec.get("sourceCategory"),
                "icon":rec.get("icon"),"affixId":rec.get("affixId"),
                "variant":is_variant,"comparisonStatus":status,
                "sourceRow":obj.get("row_index")
            }
            out.write(json.dumps(slim,ensure_ascii=False,separators=(",",":"))+"\n")
    report={
      "schemaVersion":1,"sourceRepository":"hertigservices/ascension-data",
      "sourceCollection":"supplemental/bisbeard",
      "sourceHash":SOURCE_HASH,
      "sourceNature":"contributor-supplied historical BisBeard gear planner export",
      "notBestInSlotRankings":True,
      "notVerifiedCurrentClient":True,
      "rows":rows,"tablesWithRows":len(tables),"declaredTablesInSourceDocumentation":75,"variants":variants,
      "byTable":dict(sorted(tables.items())),"byPhase":dict(sorted(phases.items())),
      "bySlot":dict(sorted(slots.items())),"byClassTag":dict(sorted(classes.items())),
      "comparisonStatus":dict(sorted(statuses.items())),
      "warning":"A gear-planner record or source label is not evidence of a best-in-slot ranking, drop rate, live item availability, or phase progression on Conquest Reborn."
    }
    (OUT/"bisbeard-coverage.json").write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    with (ROOT/"research/COA-BISBEARD-TABLE-COVERAGE.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.writer(f);w.writerow(["sourceTable","plannerRows"])
        w.writerows(sorted(tables.items()))
    assert rows==70838,rows
    assert 1 <= len(tables) <= 75,len(tables)
    print("Preserved",rows,"gear planner records in",len(tables),"tables and",len(phases),"phase labels")
if __name__=="__main__":
    parser=argparse.ArgumentParser();parser.add_argument("input",type=Path)
    main(parser.parse_args().input)
