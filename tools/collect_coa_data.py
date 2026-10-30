#!/usr/bin/env python3
"""Collect CoA numeric IDs from public GitHub datasets. Standard library only."""
import argparse
import datetime
import gzip
import hashlib
import json
import os
import pathlib
import re
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "datasets" / "bulk"
SOURCES = [
    ("srhinos/coa-datamine", "master", [
        ("spells", "data/spells/by-id/", ".jsonl"),
        ("npcs", "data/creatures/", ".jsonl"),
        ("items", "data/items/statsByItem/", ".jsonl"),
        ("quests", "data/quests/", ".jsonl"),
        ("abilities", "data/abilities/", ".json"),
        ("talents", "data/talents/coa/", ".json"),
    ]),
    ("Bharph/coa-preservation-data", "main", [
        ("tooltips", "spell-tooltips/", ".ndjson"),
        ("spellbooks", "class-spellbooks/", ".json"),
        ("changelog", "changelog/", ".ndjson"),
    ]),
    ("johnayoung/coa-arena", "main", [("arena-abilities", "output/", ".json")]),
]
USER_AGENT = "CoA-Research-public-archive/1.0"
TOKEN = os.environ.get("GITHUB_TOKEN", "")

def get(url, max_bytes=25_000_000):
    headers = {"User-Agent": USER_AGENT, "Accept": "application/vnd.github+json"}
    if TOKEN and "api.github.com" in url:
        headers["Authorization"] = "Bearer " + TOKEN
    req = urllib.request.Request(url, headers=headers)
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                data = response.read(max_bytes + 1)
            if len(data) > max_bytes:
                raise ValueError("download exceeds maximum bytes: " + url)
            return data
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)

def tree(repo, ref):
    obj = json.loads(get("https://api.github.com/repos/" + repo + "/git/trees/" + ref + "?recursive=1", 8_000_000))
    if obj.get("truncated"):
        raise RuntimeError("GitHub tree truncated: " + repo)
    return obj["tree"]

def parse_records(raw, filename):
    if filename.endswith((".jsonl", ".ndjson")):
        for line in raw.splitlines():
            if line.strip():
                try:
                    yield json.loads(line)
                except json.JSONDecodeError:
                    continue
    else:
        try:
            yield json.loads(raw)
        except json.JSONDecodeError:
            return

def ids_from(value, category):
    # Only explicit entity identity fields; never assume arbitrary numeric values are entity IDs.
    if isinstance(value, list):
        for child in value:
            yield from ids_from(child, category)
    elif isinstance(value, dict):
        field = "itemId" if category == "items" else "id"
        candidate = value.get(field)
        if isinstance(candidate, int) and candidate > 0:
            yield candidate, value.get("name")
        for key in ("records", "spells", "abilities", "nodes", "talents", "items", "entries"):
            child = value.get(key)
            if isinstance(child, (list, dict)):
                yield from ids_from(child, category)

def run(max_files):
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {"generatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(), "sources": [], "errors": [], "schema": 1}
    processed = 0
    per_category_cap = max_files
    for repo, ref, rules in SOURCES:
        try:
            entries = tree(repo, ref)
        except Exception as exc:
            manifest["errors"].append({"source": repo, "error": str(exc)})
            continue
        for category, prefix, suffix in rules:
            selected = sorted((e for e in entries if e["type"] == "blob" and e["path"].startswith(prefix) and e["path"].endswith(suffix)), key=lambda e:e["path"])
            category_ids = {}
            record_count = 0
            paths = []
            new_in_category = 0
            for entry in selected:
                if processed >= max_files or new_in_category >= per_category_cap:
                    break
                if entry.get("size", 0) > 24_000_000:
                    manifest["errors"].append({"source": repo, "path": entry["path"], "error": "file exceeds 24MB safety limit"})
                    continue
                url = "https://raw.githubusercontent.com/" + repo + "/" + ref + "/" + entry["path"]
                try:
                    shard = OUT / repo.replace("/", "__") / entry["path"]
                    saved = pathlib.Path(str(shard) + ".gz")
                    if saved.exists():
                        with gzip.open(saved, "rb") as f:
                            raw = f.read()
                    else:
                        raw = get(url)
                        shard.parent.mkdir(parents=True, exist_ok=True)
                        with gzip.open(saved, "wb", compresslevel=6) as f:
                            f.write(raw)
                        new_in_category += 1
                        processed += 1
                    paths.append({"path": entry["path"], "bytes": len(raw), "sha256": hashlib.sha256(raw).hexdigest()})
                    for record in parse_records(raw, entry["path"]):
                        record_count += 1
                        for ident, name in ids_from(record, category):
                            if ident not in category_ids:
                                category_ids[ident] = name
                except Exception as exc:
                    manifest["errors"].append({"source": repo, "path": entry["path"], "error": str(exc)})
            index_dir = OUT / "indexes"
            index_dir.mkdir(exist_ok=True)
            index_path = index_dir / (repo.replace("/", "__") + "__" + category + ".json.gz")
            with gzip.open(index_path, "wt", encoding="utf-8", compresslevel=6) as f:
                json.dump({"source": repo, "category": category, "count": len(category_ids), "ids": [[k, category_ids[k]] for k in sorted(category_ids)]}, f, ensure_ascii=False, separators=(",", ":"))
            manifest["sources"].append({"repository": repo, "ref": ref, "category": category, "files": paths, "parsedRecords": record_count, "distinctIds": len(category_ids), "index": str(index_path.relative_to(ROOT))})
            print(repo, category, "files", len(paths), "records", record_count, "IDs", len(category_ids), flush=True)
            if processed >= max_files:
                break
        if processed >= max_files:
            break
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print("Processed", processed, "files; errors", len(manifest["errors"]))

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--max-files", type=int, default=500, help="Bound each run to avoid oversized Git commits")
    args = p.parse_args()
    run(args.max_files)
