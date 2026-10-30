#!/usr/bin/env python3
"""Cross-reference unresolved CoA spell IDs against three independent preservation catalogs.

Only exact spell-ID matches are accepted. Sources are historical and may conflict.
"""
import argparse
import collections
import csv
import gzip
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
REL=ROOT/"datasets/relationships"
RESEARCH=ROOT/"research"
SOURCE_META={
 "exiles":{"origin":"hertigservices/ascension-data supplemental/exiles-db","kind":"archived CoA database mirror"},
 "databank":{"origin":"hertigservices/ascension-data supplemental/coa-databank","kind":"archived client/MPQ-derived spell palette"},
 "buildhub":{"origin":"hertigservices/ascension-data supplemental/coa-databank/coabuildhub","kind":"archived community talent/skill site"},
}
def get_id(obj):
    if not isinstance(obj,dict):return None
    value=obj.get("id")
    if type(value) is int:return value if value>0 else None
    if isinstance(value,str) and value.isdecimal():return int(value)
    return None

def rows_from(path):
    with gzip.open(path,"rt",encoding="utf-8") as stream:
        if path.name.endswith(".jsonl.gz"):
            for line in stream:
                if line.strip():
                    try: yield json.loads(line)
                    except json.JSONDecodeError:continue
        else:
            value=json.load(stream)
            if isinstance(value,list):
                yield from value
            elif isinstance(value,dict):
                for item in value.values():
                    if isinstance(item,dict):yield item

def main():
    ap=argparse.ArgumentParser()
    for key in SOURCE_META:ap.add_argument("--"+key,required=True,type=Path)
    args=ap.parse_args()
    graph=json.load(gzip.open(REL/"enriched-spells-by-id.json.gz","rt",encoding="utf-8"))
    tooltip=json.load(gzip.open(REL/"historical-tooltip-fallbacks.json.gz","rt",encoding="utf-8"))
    unresolved={int(k) for k,v in graph.items() if "spellDefinition" not in v and k not in tooltip}
    assert len(unresolved)==364,len(unresolved)
    hits={str(k):[] for k in sorted(unresolved)}
    metrics={}
    for source in SOURCE_META:
        count=0
        matched=set()
        placeholders=0
        for obj in rows_from(getattr(args,source)):
            count+=1
            sid=get_id(obj)
            if sid not in unresolved:continue
            name=obj.get("name") or obj.get("page_title") or ""
            desc=obj.get("description") or obj.get("aura_description") or ""
            if source=="exiles" and ("not been loaded into the database" in str(desc).lower() or "not yet loaded" in str(name).lower()):
                placeholders+=1
                continue
            entry={
                "source":source,"sourceDescription":SOURCE_META[source]["kind"],
                "spellId":sid,"name":str(name)[:350],
                "description":str(desc)[:3000],
            }
            if source=="exiles":
                entry["url"]=obj.get("url")
                entry["icon"]=obj.get("icon")
                entry["info"]=obj.get("info")
                entry["school"]=obj.get("school_class")
                entry["sourceSha256"]=obj.get("source_sha256")
            elif source=="databank":
                entry["combat"]=obj.get("combat")
                entry["assignment"]=obj.get("assignment")
                entry["snapshot"]=obj.get("source")
                entry["subtext"]=obj.get("subtext")
            else:
                entry["classes"]=obj.get("classes")
                entry["sources"]=obj.get("sources")
                entry["type"]=obj.get("type")
                entry["icon"]=obj.get("icon")
            hits[str(sid)].append(entry)
            matched.add(sid)
        metrics[source]={"rowsScanned":count,"unresolvedIdsMatched":len(matched),"placeholdersExcluded":placeholders}
    resolved={k:v for k,v in hits.items() if v}
    remaining=[k for k,v in hits.items() if not v]
    disagreements=[]
    for k,records in resolved.items():
        names=sorted({r["name"].strip().casefold() for r in records if r["name"].strip()})
        if len(names)>1:
            disagreements.append({"spellId":int(k),"names":[r["name"] for r in records if r["name"].strip()],"sources":[r["source"] for r in records]})
    result={
      "schemaVersion":1,"status":"historical evidence only; not verified for live Conquest Reborn",
      "unresolvedAtStart":len(unresolved),"recoveredFromAdditionalArchives":len(resolved),
      "stillUnresolved":len(remaining),"sourceMetrics":metrics,
      "nameConflicts":len(disagreements),"nameConflictExamples":disagreements[:50],
      "remainingIds":list(map(int,remaining)),
      "caution":"An exact archived spell ID is evidence of historical usage, not proof of current behavior, class assignment, or live validity.",
    }
    REL.mkdir(parents=True,exist_ok=True)
    with gzip.open(REL/"additional-spell-source-evidence.json.gz","wt",encoding="utf-8") as f:
        json.dump(resolved,f,ensure_ascii=False,separators=(",",":"))
    (REL/"additional-spell-source-audit.json").write_text(json.dumps(result,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    RESEARCH.mkdir(parents=True,exist_ok=True)
    with (RESEARCH/"COA-ADDITIONAL-SPELL-RECOVERY.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.writer(f)
        w.writerow(["spellId","source","name","description","sourceUrl","historicalOnly"])
        for sid,records in sorted(resolved.items(),key=lambda x:int(x[0])):
            for r in records:w.writerow([sid,r["source"],r["name"],r["description"],r.get("url") or "",True])
    print(json.dumps(result,indent=2)[:5000])
    assert all(x["rowsScanned"]>0 for x in metrics.values())
if __name__=="__main__":main()
