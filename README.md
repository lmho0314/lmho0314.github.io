# DART Study Research — 사이트

공시(DART)와 한국투자증권 Open API로 직접 계산한 리포트·회차 노트·산출 데이터·결정 기록을 모아 두는 개인 리서치 아카이브.

## 구조
```
src/pages/        페이지 (Home · About · Research · Curriculum · Data · Log · Design System)
src/lib/site.ts   메뉴 · 커버리지 기업 · 커리큘럼 · Vol.1 쪽 목록 (새 리포트는 여기와 페이지 하나 추가)
src/posts/        회차 노트·결정 기록 md  ← scripts/sync_site.py가 채움 (직접 고치지 않음)
src/data/datasets.json   산출 CSV 목록 ← sync_site.py가 채움
public/files/     PDF · HTML · CSV · report.css (내려받기용)
public/img/vol1/  Vol.1 쪽 이미지
```

## 평소 작업 (터미널 한 줄 + 앱 버튼 두 번)
1. DART 폴더에서 `python3 site/scripts/sync_site.py` — 노트·기록·CSV·PDF를 사이트로 복사
2. GitHub Desktop에서 Commit → Push — 1~2분 뒤 사이트 반영

처음 설정은 DEPLOY.md 참고.
