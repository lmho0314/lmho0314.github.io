// 사이트 전역 데이터 — 새 리포트·회차를 추가할 때 이 파일과 src/posts/ 만 고치면 된다.
import datasets from '../data/datasets.json';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** base 경로를 붙인 내부 링크 */
export const u = (p: string) => BASE + (p.startsWith('/') ? p : '/' + p);

export const SITE = {
  name: 'DART Study Research',
  tagline: '공시에서 숫자를 꺼내 직접 계산하고, 그 과정을 기록한다.',
  author: '경제학과 학부생',
  disclaimer: '본 자료는 개인 학습 목적으로 작성되었으며 투자 권유가 아닙니다.',
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/data', label: 'Data' },
  { href: '/log', label: 'Log' },
  { href: '/design-system', label: 'Design System' },
];

/** 커버리지 — 표 5 피어 스냅샷 (2026.09.15) */
export const COMPANIES = [
  { name: 'KB금융', short: 'KB', code: '105560', price: '176,600', cap: '62.6', pbr: 1.03, roe: 13.0, per: 11.68 },
  { name: 'JB금융지주', short: 'JB', code: '175330', price: '32,400', cap: '6.0', pbr: 1.0, roe: 12.9, per: 8.79 },
  { name: '신한지주', short: '신한', code: '055550', price: '112,700', cap: '52.9', pbr: 0.88, roe: 15.0, per: 11.18 },
  { name: '하나금융지주', short: '하나', code: '086790', price: '138,300', cap: '37.5', pbr: 0.8, roe: 10.5, per: 9.8 },
  { name: '우리금융지주', short: '우리', code: '316140', price: '36,450', cap: '26.9', pbr: 0.69, roe: 8.9, per: 8.64 },
  { name: 'iM금융지주', short: 'iM', code: '139130', price: '18,330', cap: '2.9', pbr: 0.46, roe: 9.4, per: 6.8 },
  { name: 'BNK금융지주', short: 'BNK', code: '138930', price: '16,130', cap: '4.9', pbr: 0.45, roe: 7.6, per: 6.28 },
];
export const ALL_CO = COMPANIES.map((c) => c.name);

/** 10회차 커리큘럼 */
export const CURRICULUM = [
  { n: 1, title: '공시와 DART', out: 'KB금융 공시 달력 147건', status: 'done', date: '2026-09-12' },
  { n: 2, title: '은행 재무제표 구조', out: '은행·제조업 계정 대조표', status: 'done', date: '2026-09-12' },
  { n: 3, title: 'ROE', out: 'ROE 조정 3단계', status: 'done', date: '2026-09-12' },
  { n: 4, title: 'NIM과 지주 구조', out: '부문별 세전이익', status: 'done', date: '2026-09-12' },
  { n: 5, title: 'PER·PBR', out: '산출물 ① 피어 스냅샷', status: 'done', date: '2026-09-15' },
  { n: 6, title: 'PBR–ROE 회귀', out: '7개 점에 회귀선, 잔차로 iM금융지주 검증 (R)', status: 'next', date: '' },
  { n: 7, title: '주주환원', out: '배당·자사주', status: 'plan', date: '' },
  { n: 8, title: 'RIM', out: '목표주가', status: 'plan', date: '' },
  { n: 9, title: '자동화', out: '공시 모니터링', status: 'plan', date: '' },
  { n: 10, title: '리포트', out: '최종 산출물', status: 'plan', date: '' },
];

export const VOL1 = {
  slug: 'vol1',
  title: '공시에서 PBR까지',
  eyebrow: 'Industry Study · 금융지주',
  sub: 'DART 공시와 한국투자증권 Open API로 따라간 1~5회차 복습 리포트',
  date: '2026-09-24',
  version: 'v2 전체판',
  pages: [
    { label: '표지', title: '공시에서 PBR까지', el: 'Summary · 한 장 지도 · Contents · 주요 지표' },
    { label: 'Session 01', title: '회사의 올해 관심사는 공시 목록에 그대로 드러난다', el: '그림 1 공시 유형별 건수 · 표 1 정기공시' },
    { label: 'Session 02', title: '은행의 자산은 대출이고, 부채는 예금이다', el: '그림 2 부채·자본 비중 · 표 2 손익 3층 구조' },
    { label: 'Session 03', title: 'ROA 0.95%를 레버리지로 불려 ROE 13%를 만든다', el: '그림 3 ROE 조정 3단계 · 그림 4 · 표 3' },
    { label: 'Session 04', title: '금리는 내렸지만 마진은 지켰다', el: '표 4 수익성 지표 · 그림 5 부문별 세전이익' },
    { label: 'Session 05', title: 'ROE가 높을수록 PBR도 높다 — 예외는 iM금융', el: '그림 6 ROE와 PBR · 표 5 피어 스냅샷' },
    { label: 'Appendix', title: '다시 만날 함정 4가지와 자가점검', el: '표 6 데이터 함정 · 자가점검 · 표 7 정정 기록' },
  ],
};

export type Dataset = { file: string; session: number | null; desc: string; columns: string[]; rows: number; bytes: number };
export const DATASETS = datasets as Dataset[];

export const fmtDate = (d: unknown) => {
  if (!d) return '';
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d).slice(0, 10);
};

// ---- md 콘텐츠 (sync_site.py가 채운다) ----
type Mod = { frontmatter: Record<string, any>; Content: any };
const sessMods = import.meta.glob<Mod>('../posts/sessions/*.md', { eager: true });
const logMods = import.meta.glob<Mod>('../posts/logs/*.md', { eager: true });
const slugOf = (p: string) => p.split('/').pop()!.replace(/\.md$/, '');

export const SESSIONS = Object.entries(sessMods)
  .map(([p, m]) => ({ slug: slugOf(p), ...m.frontmatter, Content: m.Content }) as any)
  .sort((a, b) => a.session - b.session);

export const LOGS = Object.entries(logMods)
  .map(([p, m]) => ({ slug: slugOf(p), ...m.frontmatter, date: fmtDate(m.frontmatter.date), Content: m.Content }) as any)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.slug.localeCompare(a.slug)));

/** 아카이브 목록 한 줄 */
export type Item = { type: 'report' | 'session' | 'data' | 'log'; date: string; title: string; eyebrow: string; sub: string; target: string; cos: string[]; href: string; format: string };
export const TYPE_LABEL: Record<Item['type'], string> = { report: '업종 리포트', session: '회차 노트', data: '데이터', log: '결정 기록' };

export function allItems(): Item[] {
  const items: Item[] = [];
  items.push({ type: 'report', date: VOL1.date, title: VOL1.title, eyebrow: VOL1.eyebrow, sub: '금융지주 학습노트 Vol.1 · 1~5회차 · ' + VOL1.sub.split('로 따라간')[0], target: '금융지주 7개사', cos: ALL_CO, href: '/research/vol1', format: 'PDF · 7쪽' });
  for (const s of SESSIONS) {
    const cos = s.session === 5 || s.session === 0 ? ALL_CO : ['KB금융'];
    items.push({ type: 'session', date: s.date, title: s.title, eyebrow: s.session ? `Session Note · ${String(s.session).padStart(2, '0')}` : 'Review · 01–05', sub: s.target, target: s.session === 5 || s.session === 0 ? '금융지주 7개사' : 'KB금융', cos, href: `/research/${s.slug}`, format: s.outputs?.length ? `노트 · CSV ${s.outputs.length}` : '노트' });
  }
  for (const d of DATASETS) {
    const cos = d.file.startsWith('05_') ? ALL_CO : ['KB금융'];
    items.push({ type: 'data', date: d.session === 5 || d.session === 4 ? '2026-09-15' : '2026-09-12', title: d.file, eyebrow: `Data · Session ${String(d.session ?? '').padStart(2, '0')}`, sub: d.desc, target: cos.length > 1 ? '금융지주 7개사' : 'KB금융', cos, href: '/data#' + encodeURIComponent(d.file), format: `CSV · ${d.rows}행` });
  }
  for (const l of LOGS) {
    items.push({ type: 'log', date: l.date, title: l.title, eyebrow: 'Log · ' + (l.status ?? ''), sub: l.series ?? '', target: '—', cos: [], href: `/log/${l.slug}`, format: '결정 기록' });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
