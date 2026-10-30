#!/usr/bin/env python3
"""Preserve 155 historical CoA talent-tree snapshots with exact spell references."""
import argparse,collections,gzip,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"datasets/relationships"
REG=ROOT/"datasets/normalized/coa-class-spec-id-registry.json"

def norm(s):return re.sub(r"[^a-z0-9]+","",str(s).lower())
def main(path):
    registry=json.loads(REG.read_text(encoding="utf-8"))["records"]
    lookup={}
    for r in registry:
        key=norm(r["className"]+"-"+r["displaySpecName"])
        lookup.setdefault(key,[]).append({"classId":r["classId"],"specId":r["specId"],"className":r["className"],"specName":r["displaySpecName"]})
    rows=[]
    matches=[]
    spellids=set()
    total_cells=0
    with gzip.open(path,"rt",encoding="utf-8") as f:
        for line in f:
            if not line.strip():continue
            x=json.loads(line)
            tree=x.get("key") or ""
            candidate=lookup.get(norm(tree)) or lookup.get(norm(x.get("name") or "")) or []
            talents=x.get("talents") or []
            if isinstance(talents,list):total_cells+=len(talents)
            for t in talents:
                if not isinstance(t,dict):continue
                for key in ("spell_id","spellId","spellID","id"):
                    val=t.get(key)
                    if type(val) is int and val>0:spellids.add(val);break
                    if isinstance(val,str) and val.isdecimal():spellids.add(int(val));break
            row={"key":tree,"name":x.get("name"),"layout":x.get("layout"),
                 "columns":x.get("columns"),"rows":x.get("rows"),
                 "declaredTalents":x.get("declared_talents"),
                 "talents":talents,"sourceUrl":x.get("url"),
                 "sourceSha256":x.get("source_sha256"),
                 "registryCandidateMatches":candidate,
                 "registryMatchStatus":"name-only historical candidate" if candidate else "unmapped"}
            rows.append(row)
            if candidate:matches.append(tree)
    OUT.mkdir(parents=True,exist_ok=True)
    with gzip.open(OUT/"exiles-talent-tree-snapshots.json.gz","wt",encoding="utf-8") as f:
        json.dump(rows,f,ensure_ascii=False,separators=(",",":"))
    report={"source":"hertigservices/ascension-data supplemental/exiles-db",
            "sourceNature":"2026-08-29 historical CoA database mirror; not live client verified",
            "treeCount":len(rows),"talentCells":total_cells,
            "distinctSpellIdsExtracted":len(spellids),
            "registryCandidateTreeMatches":len(matches),
            "registryCandidateTreeKeys":matches,
            "warning":"Name-matched specialization IDs are candidate links only; tree IDs, spec IDs and live class identifiers are not interchangeable."}
    (OUT/"exiles-talent-tree-audit.json").write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print(json.dumps({k:v for k,v in report.items() if k!="registryCandidateTreeKeys"},indent=2))
    assert len(rows)==155
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("input",type=Path);main(p.parse_args().input)
