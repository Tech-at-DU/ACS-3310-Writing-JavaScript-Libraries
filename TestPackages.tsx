import { formatDate, formatRelativeDate, statusToLabel, statusToColor } from 'postkit-date-status-display'
import { createExcerpt, normalizeWhitespace, truncateByWords } from 'postkit-excerpt'
import { filterByStatus, filterByTag, sortByDate, sortByTitle } from 'postkit-filter-sort'
import type { Post, PostStatus } from 'postkit-filter-sort'
import { formatTime, readingTime, wordCount } from 'postkit-reading-time'
import { buildSearchableText, matchesQuery, searchPosts } from 'postkit-search-library'
import { createSlugFromTitle, isSlugValid, makeUniqueSlug, batchCreateSlugs } from 'postkit-slug'
import { isValidTag, normalizeTag, parseTags, removeDuplicateTags } from 'postkit-tag'

type TestResult = { label: string; input: string; expected: string; actual: string | null }

function check(label: string, input: string, expected: string, actual: string | null): TestResult {
  return { label, input, expected, actual }
}

function tryCatch(fn: () => string | string[]): string {
  try {
    const result = fn()
    return Array.isArray(result) ? result.join(', ') : result
  } catch {
    return 'throws'
  }
}

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '4px 8px', borderBottom: '2px solid #ccc' }
const tdStyle: React.CSSProperties = { padding: '4px 8px' }

function Table({ title, rows }: { title: string; rows: TestResult[] }) {
  const pass = rows.filter(r => String(r.actual) === r.expected).length
  return (
    <div style={{ marginBottom: 32 }}>
      <h2>{title} — {pass}/{rows.length} passing</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'monospace' }}>
        <thead>
          <tr>
            {['', 'Test', 'Input', 'Expected', 'Actual'].map(h => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: String(r.actual) === r.expected ? '#d4edda' : '#f8d7da' }}>
              <td style={tdStyle}>{String(r.actual) === r.expected ? '✓' : '✗'}</td>
              <td style={tdStyle}>{r.label}</td>
              <td style={tdStyle}><code>{r.input}</code></td>
              <td style={tdStyle}><code>{r.expected}</code></td>
              <td style={tdStyle}><code>{String(r.actual)}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TestPackages() {
  // --- formatDate ---
  const formatDateTests: TestResult[] = [
    check('valid ISO date', '"2026-04-02T19:52:00Z"', 'April 2, 2026', formatDate('2026-04-02T19:52:00Z')),
    check('Jan 1st', '"2026-01-01T00:00:00Z"', 'January 1, 2026', formatDate('2026-01-01T00:00:00Z')),
    check('invalid string', '"blah-blah-blah"', 'null', formatDate('blah-blah-blah')),
    check('empty string', '""', 'null', formatDate('')),
    check('null', 'null', 'null', formatDate(null as unknown as string)),
  ]

  // --- formatRelativeDate ---
  const now = new Date()
  const recentISO = new Date(now.getTime() - 30 * 1000).toISOString()
  const hoursAgoISO = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString()
  const yesterdayISO = new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString()
  const oldISO = '2020-01-01T00:00:00Z'

  const formatRelativeDateTests: TestResult[] = [
    check('just now (30s ago)', 'recent ISO', 'just now', formatRelativeDate(recentISO)),
    check('hours ago', '3h ago ISO', '3 hours ago', formatRelativeDate(hoursAgoISO)),
    check('yesterday', 'yesterday ISO', 'yesterday', formatRelativeDate(yesterdayISO)),
    check('old date fallback', '"2020-01-01T00:00:00Z"', 'January 1, 2020', formatRelativeDate(oldISO)),
    check('invalid string', '"not-a-date"', 'null', formatRelativeDate('not-a-date')),
    check('empty string', '""', 'null', formatRelativeDate('')),
  ]

  // --- statusToLabel ---
  const statusToLabelTests: TestResult[] = [
    check('draft', '"draft"', 'Draft', statusToLabel('draft')),
    check('review', '"review"', 'In Review', statusToLabel('review')),
    check('published', '"published"', 'Published', statusToLabel('published')),
    check('invalid status', '"hello"', 'null', statusToLabel('hello')),
  ]

  // --- statusToColor ---
  const statusToColorTests: TestResult[] = [
    check('draft', '"draft"', 'gray', statusToColor('draft' as PostStatus)),
    check('review', '"review"', 'yellow', statusToColor('review' as PostStatus)),
    check('published', '"published"', 'green', statusToColor('published' as PostStatus)),
    check('invalid status', '"acs-3310"', 'null', statusToColor('acs-3310' as PostStatus)),
  ]

  // --- createSlugFromTitle ---
  const createSlugTests: TestResult[] = [
    check('basic title', '"Hello World"', 'hello-world', tryCatch(() => createSlugFromTitle('Hello World'))),
    check('accented chars', '"Café Résumé"', 'cafe-resume', tryCatch(() => createSlugFromTitle('Café Résumé'))),
    check('special chars stripped', '"Hello World Foo! Bar!"', 'hello-world-foo-bar', tryCatch(() => createSlugFromTitle('Hello World Foo! Bar!'))),
    check('leading/trailing spaces', '"  I Got Better  "', 'i-got-better', tryCatch(() => createSlugFromTitle('  I Got Better  '))),
    check('empty string throws', '""', 'throws', tryCatch(() => createSlugFromTitle(''))),
    check('only special chars throws', '"!!!"', 'throws', tryCatch(() => createSlugFromTitle('!!!'))),
  ]

  // --- isSlugValid ---
  const isSlugValidTests: TestResult[] = [
    check('valid slug', '"hello-world"', 'true', isSlugValid('hello-world').toString()),
    check('uppercase invalid', '"Hello-World"', 'false', isSlugValid('Hello-World').toString()),
    check('double hyphens invalid', '"hello--world"', 'false', isSlugValid('hello--world').toString()),
    check('leading hyphen invalid', '"-hello"', 'false', isSlugValid('-hello').toString()),
    check('trailing hyphen invalid', '"hello-"', 'false', isSlugValid('hello-').toString()),
    check('empty string invalid', '""', 'false', isSlugValid('').toString()),
  ]

  // --- makeUniqueSlug ---
  const makeUniqueSlugTests: TestResult[] = [
    check('no conflict', '"hello", []', 'hello', tryCatch(() => makeUniqueSlug('hello', []))),
    check('one conflict', '"hello", ["hello"]', 'hello-1', tryCatch(() => makeUniqueSlug('hello', ['hello']))),
    check('two conflicts', '"hello", ["hello","hello-1"]', 'hello-2', tryCatch(() => makeUniqueSlug('hello', ['hello', 'hello-1']))),
    check('invalid slug throws', '"-bad-"', 'throws', tryCatch(() => makeUniqueSlug('-bad-', []))),
  ]

  // --- batchCreateSlugs ---
  const batchCreateSlugsTests: TestResult[] = [
    check('two unique titles', '"Run Away","I Got Better"', 'run-away, i-got-better', tryCatch(() => batchCreateSlugs(['Run Away', 'I Got Better']))),
    check('duplicate titles', '"Run Away","Run Away"', 'run-away, run-away-1', tryCatch(() => batchCreateSlugs(['Run Away', 'Run Away']))),
    check('with existing slugs', '"Run Away", existing:["run-away"]', 'run-away-1', tryCatch(() => batchCreateSlugs(['Run Away'], ['run-away']))),
    check('invalid title throws', '""', 'throws', tryCatch(() => batchCreateSlugs(['']))),
  ]

  // --- normalizeWhitespace ---
  const normalizeWhitespaceTests: TestResult[] = [
    check('collapses spaces', '"  Hello   world  "', 'Hello world', normalizeWhitespace('  Hello   world  ')),
    check('collapses newlines', '"Hello\\n\\nworld"', 'Hello world', normalizeWhitespace('Hello\n\nworld')),
    check('collapses tabs', '"Hello\\t\\tworld"', 'Hello world', normalizeWhitespace('Hello\t\tworld')),
    check('whitespace only', '"   "', '', normalizeWhitespace('   ')),
    check('already clean', '"Hello world"', 'Hello world', normalizeWhitespace('Hello world')),
  ]

  // --- truncateByWords ---
  const truncateByWordsTests: TestResult[] = [
    check('truncates to 5 words', 'long sentence, maxWords=5', 'The quick brown fox jumped…', truncateByWords('The quick brown fox jumped over the lazy dog', 5)),
    check('fits within maxWords', '"Hello world", maxWords=10', 'Hello world', truncateByWords('Hello world', 10)),
    check('maxWords=0 returns ""', '"Hello world", maxWords=0', '', truncateByWords('Hello world', 0)),
    check('whitespace only returns ""', '"   ", maxWords=5', '', truncateByWords('   ', 5)),
    check('exact word count', '"one two three", maxWords=3', 'one two three', truncateByWords('one two three', 3)),
  ]

  // --- createExcerpt ---
  const createExcerptTests: TestResult[] = [
    check('truncates at word boundary', 'long text, maxLength=30', 'This is a long post body that…', createExcerpt('This is a long post body that keeps going.', 30)),
    check('fits within maxLength', '"Hello world", maxLength=100', 'Hello world', createExcerpt('Hello world', 100)),
    check('maxLength=0 returns ""', '"Hello world", maxLength=0', '', createExcerpt('Hello world', 0)),
    check('normalizes whitespace', '"Hello   world  foo", maxLength=100', 'Hello world foo', createExcerpt('Hello   world  foo', 100)),
    check('whitespace only returns ""', '"   ", maxLength=20', '', createExcerpt('   ', 20)),
  ]

  // --- wordCount ---
  const wordCountTests: TestResult[] = [
    check('two words', '"Hello world"', '2', wordCount('Hello world').toString()),
    check('extra whitespace', '"  Hello   world  "', '2', wordCount('  Hello   world  ').toString()),
    check('single word', '"hello"', '1', wordCount('hello').toString()),
    check('empty string', '""', '0', wordCount('').toString()),
    check('five words', '"one two three four five"', '5', wordCount('one two three four five').toString()),
  ]

  // --- readingTime ---
  const words250 = Array(250).fill('word').join(' ')
  const words500 = Array(500).fill('word').join(' ')
  const words125 = Array(125).fill('word').join(' ')

  const readingTimeTests: TestResult[] = [
    check('250 words = 1 min', '250 words', '1', readingTime(words250).toString()),
    check('500 words = 2 min', '500 words', '2', readingTime(words500).toString()),
    check('125 words = 0.5 min', '125 words', '0.5', readingTime(words125).toString()),
    check('empty string = 0', '""', '0', readingTime('').toString()),
  ]

  // --- formatTime ---
  const formatTimeTests: TestResult[] = [
    check('< 1 min', '0.5', 'Less than a minute', formatTime(0.5)),
    check('1 min', '1.5', '1 minute', formatTime(1.5)),
    check('exact minutes', '5', '5 minutes', formatTime(5)),
    check('rounds to 5', '12', '10 minutes', formatTime(12)),
    check('rounds to 30', '30', '30 minutes', formatTime(30)),
    check('1 hour', '60', '1 hour', formatTime(60)),
    check('1.5 hours', '100', '1.5 hours', formatTime(100)),
    check('2 hours', '135', '2 hours', formatTime(135)),
    check('2.5 hours', '165', '2.5 hours', formatTime(165)),
    check('a few hours', '200', 'A few hours', formatTime(200)),
  ]

  // --- normalizeTag ---
  const normalizeTagTests: TestResult[] = [
    check('lowercases', '"JavaScript"', 'javascript', normalizeTag('JavaScript')),
    check('trims whitespace', '"  JavaScript  "', 'javascript', normalizeTag('  JavaScript  ')),
    check('removes special chars', '"can\'t"', 'cant', normalizeTag("can't")),
    check('collapses spaces', '"web  dev"', 'web dev', normalizeTag('web  dev')),
    check('multi-word tag', '"Web Dev"', 'web dev', normalizeTag('Web Dev')),
  ]

  // --- isValidTag ---
  const isValidTagTests: TestResult[] = [
    check('valid tag', '"javascript"', 'true', isValidTag('javascript').toString()),
    check('valid multi-word', '"web dev"', 'true', isValidTag('web dev').toString()),
    check('empty string', '""', 'false', isValidTag('').toString()),
    check('only special chars', '"***"', 'false', isValidTag('***').toString()),
    check('over 20 chars', '"abcdefghijklmnopqrstu"', 'false', isValidTag('abcdefghijklmnopqrstu').toString()),
  ]

  // --- parseTags ---
  const parseTagsTests: TestResult[] = [
    check('comma-separated', '"javascript, web dev, coding"', 'javascript, web dev, coding', parseTags('javascript, web dev, coding').join(', ')),
    check('filters invalid', '"javascript, ***, coding"', 'javascript, coding', parseTags('javascript, ***, coding').join(', ')),
    check('normalizes each tag', '"JavaScript, Web Dev"', 'javascript, web dev', parseTags('JavaScript, Web Dev').join(', ')),
    check('single tag', '"javascript"', 'javascript', parseTags('javascript').join(', ')),
  ]

  // --- removeDuplicateTags ---
  const removeDuplicateTagsTests: TestResult[] = [
    check('removes duplicate', '["javascript","coding","javascript"]', 'javascript, coding', removeDuplicateTags(['javascript', 'coding', 'javascript']).join(', ')),
    check('no duplicates unchanged', '["javascript","coding"]', 'javascript, coding', removeDuplicateTags(['javascript', 'coding']).join(', ')),
    check('normalizes before dedup', '["JavaScript","javascript"]', 'javascript', removeDuplicateTags(['JavaScript', 'javascript']).join(', ')),
    check('empty array', '[]', '', removeDuplicateTags([]).join(', ')),
  ]

  // --- postkit-filter-sort sample data ---
  const samplePosts: Post[] = [
    { id: '1', title: 'Alpha Post', body: '', author: 'Alice', tags: ['javascript', 'web'], category: 'tech', status: 'published', createdAt: '2026-01-01', updatedAt: '2026-01-01' },
    { id: '2', title: 'Beta Post',  body: '', author: 'Bob',   tags: ['coding', 'javascript'], category: 'tech', status: 'draft', createdAt: '2026-02-01', updatedAt: '2026-02-01' },
    { id: '3', title: 'Gamma Post', body: '', author: 'Carol', tags: ['web', 'design'], category: 'design', status: 'review', createdAt: '2026-03-01', updatedAt: '2026-03-01' },
    { id: '4', title: 'Delta Post', body: '', author: 'Dave',  tags: ['javascript'], category: 'tech', status: 'published', createdAt: '2025-12-01', updatedAt: '2025-12-01' },
  ]

  const titles = (posts: Post[]) => posts.map(p => p.title).join(', ')

  // --- filterByStatus ---
  const filterByStatusTests: TestResult[] = [
    check('published posts', 'status="published"', 'Alpha Post, Delta Post', titles(filterByStatus(samplePosts, 'published'))),
    check('draft posts', 'status="draft"', 'Beta Post', titles(filterByStatus(samplePosts, 'draft'))),
    check('review posts', 'status="review"', 'Gamma Post', titles(filterByStatus(samplePosts, 'review'))),
    check('no matches', 'empty status match', '', titles(filterByStatus([], 'published'))),
  ]

  // --- filterByTag ---
  const filterByTagTests: TestResult[] = [
    check('by tag "javascript"', 'tag="javascript"', 'Alpha Post, Beta Post, Delta Post', titles(filterByTag(samplePosts, 'javascript'))),
    check('case-insensitive', 'tag="JavaScript"', 'Alpha Post, Beta Post, Delta Post', titles(filterByTag(samplePosts, 'JavaScript'))),
    check('by tag "web"', 'tag="web"', 'Alpha Post, Gamma Post', titles(filterByTag(samplePosts, 'web'))),
    check('no matches', 'tag="unknown"', '', titles(filterByTag(samplePosts, 'unknown'))),
  ]

  // --- sortByDate ---
  const sortByDateTests: TestResult[] = [
    check('newest first (default)', 'direction="desc"', 'Gamma Post, Beta Post, Alpha Post, Delta Post', titles(sortByDate(samplePosts))),
    check('oldest first', 'direction="asc"', 'Delta Post, Alpha Post, Beta Post, Gamma Post', titles(sortByDate(samplePosts, 'asc'))),
  ]

  // --- sortByTitle ---
  const sortByTitleTests: TestResult[] = [
    check('A-Z (default)', 'direction="asc"', 'Alpha Post, Beta Post, Delta Post, Gamma Post', titles(sortByTitle(samplePosts))),
    check('Z-A', 'direction="desc"', 'Gamma Post, Delta Post, Beta Post, Alpha Post', titles(sortByTitle(samplePosts, 'desc'))),
  ]

  // --- buildSearchableText ---
  const alphaPost = samplePosts[0]
  const buildSearchableTextTests: TestResult[] = [
    check('combines all fields', 'Alpha Post', 'alpha post alice javascript web tech', buildSearchableText(alphaPost)),
    check('lowercases everything', 'Alpha Post', 'alpha post alice javascript web tech', buildSearchableText(alphaPost).toLowerCase()),
    check('tags joined', 'Alpha Post tags', 'javascript web', buildSearchableText(alphaPost).split(' ').filter(t => ['javascript', 'web'].includes(t)).join(' ')),
  ]

  // --- matchesQuery ---
  const matchesQueryTests: TestResult[] = [
    check('single word match', 'query="javascript"', 'true', matchesQuery(alphaPost, 'javascript').toString()),
    check('author match', 'query="alice"', 'true', matchesQuery(alphaPost, 'alice').toString()),
    check('multi-word all match', 'query="alice web"', 'true', matchesQuery(alphaPost, 'alice web').toString()),
    check('multi-word one missing', 'query="alice dogs"', 'false', matchesQuery(alphaPost, 'alice dogs').toString()),
    check('no match', 'query="dogs"', 'false', matchesQuery(alphaPost, 'dogs').toString()),
    check('empty query matches all', 'query=""', 'true', matchesQuery(alphaPost, '').toString()),
  ]

  // --- searchPosts ---
  const searchPostsTests: TestResult[] = [
    check('matches by tag', 'query="javascript"', 'Alpha Post, Beta Post, Delta Post', titles(searchPosts(samplePosts, 'javascript'))),
    check('matches by author', 'query="alice"', 'Alpha Post', titles(searchPosts(samplePosts, 'alice'))),
    check('empty query returns all', 'query=""', 'Alpha Post, Beta Post, Gamma Post, Delta Post', titles(searchPosts(samplePosts, ''))),
    check('no match returns empty', 'query="xyz"', '', titles(searchPosts(samplePosts, 'xyz'))),
    check('case-insensitive', 'query="ALICE"', 'Alpha Post', titles(searchPosts(samplePosts, 'ALICE'))),
  ]

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>postkit-date-status-display — test results</h1>
      <Table title="formatDate" rows={formatDateTests} />
      <Table title="formatRelativeDate" rows={formatRelativeDateTests} />
      <Table title="statusToLabel" rows={statusToLabelTests} />
      <Table title="statusToColor" rows={statusToColorTests} />

      <h1>postkit-reading-time — test results</h1>
      <Table title="wordCount" rows={wordCountTests} />
      <Table title="readingTime" rows={readingTimeTests} />
      <Table title="formatTime" rows={formatTimeTests} />

      <h1>postkit-excerpt — test results</h1>
      <Table title="normalizeWhitespace" rows={normalizeWhitespaceTests} />
      <Table title="truncateByWords" rows={truncateByWordsTests} />
      <Table title="createExcerpt" rows={createExcerptTests} />

      <h1>postkit-search-library — test results</h1>
      <Table title="buildSearchableText" rows={buildSearchableTextTests} />
      <Table title="matchesQuery" rows={matchesQueryTests} />
      <Table title="searchPosts" rows={searchPostsTests} />

      <h1>postkit-filter-sort — test results</h1>
      <Table title="filterByStatus" rows={filterByStatusTests} />
      <Table title="filterByTag" rows={filterByTagTests} />
      <Table title="sortByDate" rows={sortByDateTests} />
      <Table title="sortByTitle" rows={sortByTitleTests} />

      <h1>postkit-tag — test results</h1>
      <Table title="normalizeTag" rows={normalizeTagTests} />
      <Table title="isValidTag" rows={isValidTagTests} />
      <Table title="parseTags" rows={parseTagsTests} />
      <Table title="removeDuplicateTags" rows={removeDuplicateTagsTests} />

      <h1>postkit-slug — test results</h1>
      <Table title="createSlugFromTitle" rows={createSlugTests} />
      <Table title="isSlugValid" rows={isSlugValidTests} />
      <Table title="makeUniqueSlug" rows={makeUniqueSlugTests} />
      <Table title="batchCreateSlugs" rows={batchCreateSlugsTests} />
    </div>
  )
}

export default TestPackages
