"""
sync_site.py — DART 폴더의 노트·결정 기록·산출물을 사이트(site/)로 옮긴다.

실행 (DART 폴더에서):
    python3 site/scripts/sync_site.py

하는 일
  notes/0N_*.md          → site/src/posts/sessions/*.md   (제목·날짜·대상을 frontmatter로)
  log/YYYY-MM-DD_*.md    → site/src/posts/logs/*.md
  output/*.csv           → site/public/files/data/*.csv  + site/src/data/datasets.json  ('한투' 열은 빼고)
  output/학습노트_Vol1_리디자인/학습노트_Vol1_01-05회차_리서치판.pdf·html → site/public/files/vol1/

원본은 건드리지 않는다. 비공개 파일(.env, .kis_token.json, data/, scripts/)은 복사하지 않는다.
"""
import csv
import json
import re
import shutil
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
ROOT = SITE.parent                       # DART 폴더
if len(sys.argv) > 1:                    # 다른 위치의 DART 폴더를 쓸 때: python3 sync_site.py <DART경로>
    ROOT = Path(sys.argv[1]).resolve()

SESS_DIR = SITE / "src/posts/sessions"
LOG_DIR = SITE / "src/posts/logs"
DATA_DIR = SITE / "public/files/data"
VOL1_DIR = SITE / "public/files/vol1"

DESC = {  # 산출물 설명 (파일명 → 한 줄)
    "01_KB금융_공시달력_2026.csv": "KB금융 2026.01.01~09.12 제출 공시 147건과 유형 태그",
    "02_계정대조표_2026반기.csv": "KB금융·삼성전자 2026 반기 연결 계정 대조표",
    "04_KB금융_부문별세전이익.csv": "KB금융 2026 상반기 부문별 세전이익과 비중",
    "04_국민은행_NIM.csv": "KB국민은행 대출·예금 평균이자율, 예대금리차, NIM 추이",
    "05_금융지주_피어스냅샷.csv": "금융지주 7개사 현재가·시가총액·지배주주자본·반기순이익·ROE·PBR (2026.09.15)",
}

# 공개본에서 빼는 열: 한국투자증권 Open API가 제공한 원자료(약관 제5조③ — 시세정보 제3자 제공 금지)
# 원본 output/*.csv 는 그대로 두고, 사이트에 올리는 사본에서만 뺀다.
PRIVATE_COL = re.compile(r"한투|KIS", re.I)


def q(s):
    return json.dumps(s, ensure_ascii=False)


def fence_pseudo_tables(lines):
    """공백으로 줄 맞춘 표(두 칸 이상 공백이 반복되는 줄)를 코드 블록으로 감싼다."""
    out, buf = [], []

    def flush():
        if buf:
            out.append("```text")
            out.extend(buf)
            out.append("```")
            buf.clear()

    for ln in lines:
        is_tab = (not ln.lstrip().startswith(("-", "#", ">", "*"))) and len(re.findall(r"\S\s{2,}\S", ln)) >= 2
        if is_tab:
            buf.append(ln)
        else:
            flush()
            out.append(ln)
    flush()
    return out


def sync_sessions():
    SESS_DIR.mkdir(parents=True, exist_ok=True)
    outputs = sorted(p.name for p in (ROOT / "output").glob("*.csv"))
    n = 0
    for p in sorted((ROOT / "notes").glob("0*.md")):
        lines = p.read_text(encoding="utf-8").splitlines()
        title = lines[0].lstrip("# ").strip() if lines and lines[0].startswith("#") else p.stem
        meta_line = next((l for l in lines[1:4] if l.startswith(("날짜:", "작성:"))), "")
        m = re.search(r"\d{4}-\d{2}-\d{2}", meta_line)
        date = m.group(0) if m else ""
        target = meta_line.split("/", 1)[1].strip() if "/" in meta_line else ""
        body = [l for l in lines[1:] if l != meta_line]
        num = int(p.name[:2])
        if num == 0:
            slug, kind, session, page = "review-01-05", "review", 0, 1
        else:
            slug, kind, session, page = f"session-{num:02d}", "session", num, (num + 1 if num <= 5 else 0)
        outs = [o for o in outputs if num and o.startswith(f"{num:02d}_")]
        fm = ["---", f"title: {q(title)}", f"date: {q(date)}", f"target: {q(target)}", f"kind: {kind}",
              f"session: {session}", f"vol1Page: {page}", f"outputs: {q(outs)}", f"source: {q('notes/' + p.name)}", "---", ""]
        (SESS_DIR / f"{slug}.md").write_text("\n".join(fm + fence_pseudo_tables(body)) + "\n", encoding="utf-8")
        n += 1
    return n


def sync_logs():
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    n = 0
    for p in sorted((ROOT / "log").glob("20*.md")):
        text = p.read_text(encoding="utf-8")
        m = re.match(r"---\n(.*?)\n---\n(.*)", text, re.S)
        head, body = (m.group(1), m.group(2)) if m else ("", text)
        lines = body.strip("\n").splitlines()
        title = p.stem
        if lines and lines[0].startswith("# "):
            title = lines[0][2:].strip()
            lines = lines[1:]
        slug = re.sub(r"[^0-9A-Za-z가-힣-]+", "-", p.stem).strip("-")
        fm = ["---", head.strip(), f"title: {q(title)}", f"source: {q('log/' + p.name)}", "---", ""]
        (LOG_DIR / f"{slug}.md").write_text("\n".join(fm + lines) + "\n", encoding="utf-8")
        n += 1
    return n


def sync_data():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    items = []
    for p in sorted((ROOT / "output").glob("*.csv")):
        with p.open(encoding="utf-8-sig", newline="") as f:
            rows = list(csv.reader(f))
        keep = [i for i, c in enumerate(rows[0]) if not PRIVATE_COL.search(c)] if rows else []
        rows = [[r[i] for i in keep if i < len(r)] for r in rows]
        dst = DATA_DIR / p.name
        with dst.open("w", encoding="utf-8-sig", newline="") as f:
            csv.writer(f, lineterminator="\n").writerows(rows)
        items.append({
            "file": p.name,
            "session": int(p.name[:2]) if p.name[:2].isdigit() else None,
            "desc": DESC.get(p.name, ""),
            "columns": rows[0] if rows else [],
            "rows": max(len(rows) - 1, 0),
            "bytes": dst.stat().st_size,
        })
    out = SITE / "src/data/datasets.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    return len(items)


def sync_vol1():
    VOL1_DIR.mkdir(parents=True, exist_ok=True)
    src = ROOT / "output/학습노트_Vol1_리디자인"
    copied = 0
    for name in ["학습노트_Vol1_01-05회차_리서치판.pdf", "학습노트_Vol1_01-05회차_리서치판.html"]:
        if (src / name).exists():
            ext = name.rsplit(".", 1)[1]
            shutil.copy2(src / name, VOL1_DIR / f"vol1.{ext}")
            copied += 1
    return copied


if __name__ == "__main__":
    if not (ROOT / "notes").exists():
        sys.exit(f"DART 폴더를 찾지 못했습니다: {ROOT}")
    print("회차 노트", sync_sessions(), "· 결정 기록", sync_logs(), "· 데이터", sync_data(), "· Vol.1 파일", sync_vol1())
