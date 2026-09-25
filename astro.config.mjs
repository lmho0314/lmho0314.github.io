// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages 주소에 맞춰 두 값만 바꾼다 (DEPLOY.md 참고).
//  - 저장소 이름이 <아이디>.github.io  → site: 'https://<아이디>.github.io', base: '/'
//  - 저장소 이름이 다른 이름(예: dart-study) → site: 'https://<아이디>.github.io', base: '/dart-study'
export default defineConfig({
  site: 'https://lmho0314.github.io',
  base: '/',
  trailingSlash: 'ignore',
  // 회차 노트의 줄 맞춤 표를 밝은 회색 블록으로 보이게 (코드 색칠 끔)
  markdown: { syntaxHighlight: false },
});
