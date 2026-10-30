#!/usr/bin/env python3
"""Create source-aware 9656-spell research index from four archived collections.

Priority only affects display fields; raw conflicting evidence remains separately stored.
No source is treated as verified for the current Conquest Reborn client.
"""
import collections,gzip,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
REL=ROOT/"datasets/relationships"

def load(path):
    with gzip.open(path,"rt",encoding="utf-8") as f:return json.load(f)

def clean(v):
    return v.strip() if isinstance(v,str) else ""

def main():
    graph=load(REL/"enriched-spells-by-id.json.gz")
    tooltips=load(REL/"historical-tooltip-fallbacks.json.gz")
    other=load(REL/"additional-spell-source-evidence.json.gz")
    records={}
    sources=collections.Counter()
    unresolved_names=[]
    conflicts=[]
    for sid,entry in graph.items():
        definition=entry.get("spellDefinition") or {}
        fields=definition.get("fields") or {}
        tooltip_records=tooltips.get(sid) or []
        more=other.get(sid) or []
        candidates=[]
        if clean(fields.get("name")):
            candidates.append(("archived-spell-dbc",clean(fields["name"])))
        for t in tooltip_records:
            if isinstance(t,dict) and clean(t.get("name")):
                candidates.append(("historical-tooltip",clean(t["name"])))
        for r in more:
            if clean(r.get("name")):
                candidates.append((r.get("source","additional-archive"),clean(r["name"])))
        evidence=entry.get("relationshipEvidence") or []
        for ev in evidence:
            if not isinstance(ev,dict):continue
            for key in ("spellName","abilityName","nodeName"):
                if clean(ev.get(key)):
                    candidates.append(("archived-relationship",clean(ev[key])))
                    break
        preferred=candidates[0] if candidates else ("unidentified","")
        unique_names=sorted({name.casefold() for _,name in candidates})
        if len(unique_names)>1:
            conflicts.append({"spellId":int(sid),"preferred":preferred[1],
                              "candidates":[{"source":s,"name":n} for s,n in candidates]})
        if not preferred[1]:unresolved_names.append(int(sid))
        available=[]
        if definition:available.append("archived-spell-dbc")
        if tooltip_records:available.append("historical-tooltip")
        for r in more:
            if r["source"] not in available:available.append(r["source"])
        if not available:available.append("relationship-only")
        for s in available:sources[s]+=1
        description=clean(fields.get("description"))
        if not description:
            for r in more:
                if clean(r.get("description")):
                    description=clean(r["description"]);break
        if not description:
            for t in tooltip_records:
                if isinstance(t,dict) and clean(t.get("tt")):
                    description=clean(t["tt"]);break
        records[sid]={
            "spellId":int(sid),"displayName":preferred[1],
            "displayNameSource":preferred[0],
            "classIds":entry.get("classIds") or [],
            "candidateSpecIds":entry.get("candidateSpecIds") or [],
            "description":description[:3000],
            "descriptionIsHistorical":bool(description),
            "archivedCooldownMs":fields.get("cooldownMs"),
            "sources":available,
            "hasArchivedDefinition":bool(definition),
            "hasHistoricalTooltip":bool(tooltip_records),
            "hasAdditionalArchive":bool(more),
            "hasNameConflict":len(unique_names)>1,
            "currentClientVerified":False,
        }
    with gzip.open(REL/"unified-spell-research-index.json.gz","wt",encoding="utf-8") as f:
        json.dump(records,f,ensure_ascii=False,separators=(",",":"))
    audit={
        "schemaVersion":1,"totalLinkedSpellIds":len(records),
        "withArchivedSpellDbcDefinition":sum(v["hasArchivedDefinition"] for v in records.values()),
        "withHistoricalTooltip":sum(v["hasHistoricalTooltip"] for v in records.values()),
        "withAdditionalArchiveEvidence":sum(v["hasAdditionalArchive"] for v in records.values()),
        "withoutAnySourceEvidence":sum(v["sources"]==["relationship-only"] for v in records.values()),
        "withoutAnyDisplayName":len(unresolved_names),"unnamedSpellIds":unresolved_names,
        "nameConflictsAcrossAllSources":len(conflicts),
        "sourceCoverage":dict(sorted(sources.items())),
        "warning":"Historical evidence does not prove live-client spell behavior or availability."
    }
    (REL/"unified-spell-research-audit.json").write_text(json.dumps(audit,indent=2)+"\n",encoding="utf-8")
    (REL/"unified-spell-name-conflicts.json").write_text(json.dumps(conflicts,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    assert len(records)==9656
    assert audit["withoutAnySourceEvidence"]==0
    print(json.dumps(audit,indent=2)[:3000])
if __name__=="__main__":main()
