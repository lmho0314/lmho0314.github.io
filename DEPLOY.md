# 처음 한 번: GitHub Pages로 공개하기 (약 20분)

이 `site` 폴더만 공개 저장소가 된다. DART 폴더의 나머지(.env, 토큰, data/, scripts/)는 올라가지 않는다.

1. **GitHub 가입** — https://github.com (아이디가 곧 주소가 된다)
2. **GitHub Desktop 설치** — https://desktop.github.com → 로그인
3. **주소 정하기** — `astro.config.mjs`의 `site`를 `https://<아이디>.github.io`로 바꾼다. (lmho0314 적용 완료 — 저장소 lmho0314/lmho0314.github.io)
   - 저장소 이름을 `<아이디>.github.io`로 하면 주소가 `https://<아이디>.github.io` (추천, `base: '/'` 그대로)
   - 다른 이름(예: `dart-study`)으로 하면 주소가 `https://<아이디>.github.io/dart-study` → `base: '/dart-study'`로 바꾼다
4. **저장소 만들기** — GitHub Desktop: File → Add Local Repository → `DART/site` 선택 →
   "create a repository here" 클릭 → Name은 **site 그대로** 두고(바꾸면 새 폴더가 생김), README·Git ignore·License는 **None** → Create
   → **Publish repository** 창에서 Name을 `lmho0314.github.io`로 바꾸고, Keep this code private **체크 해제** → Publish
   (Desktop에서 따로 만든 빈 저장소가 있으면 먼저 Repository → Remove로 목록에서 뺀다)
5. **Pages 켜기** — github.com의 저장소 → Settings → Pages → Build and deployment → Source: **GitHub Actions**
6. **첫 배포** — GitHub Desktop에서 아무 변경이나 Commit → Push (또는 저장소 Actions 탭 → Deploy to GitHub Pages → Run workflow)
   → Actions 탭에서 초록 체크가 뜨면 주소로 접속

## 확인할 것
- 로컬 미리보기는 선택 사항: Node.js 설치 후 `npm install` → `npm run dev` → http://localhost:4321
- 한국투자증권 시세 데이터(05_금융지주_피어스냅샷.csv 등)는 공개 전 Open API 약관의 재배포 범위를 한 번 확인한다.
- `[연락처 입력 예정]`(About)은 공개해도 되는 연락처로 바꾸거나 지운다.
