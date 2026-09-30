import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'
import { JSDOM } from 'jsdom'

const source = ts.transpileModule(
  readFileSync(new URL('../src/bookmark.ts', import.meta.url), 'utf8'),
  { compilerOptions: { target: ts.ScriptTarget.ES2022 } },
).outputText

const fixture = (name) => readFileSync(new URL(`fixtures/${name}.html`, import.meta.url), 'utf8')

// Runs the bookmarklet against the given page and returns what it copied
// and what the toast said once the clipboard promise settles.
async function run({ html = '<!DOCTYPE html><title>x</title>', url, title, clipboard = 'ok' }) {
  const dom = new JSDOM(html, { url, runScripts: 'outside-only' })
  const { window } = dom
  if (title !== undefined) window.document.title = title
  const copied = []
  const clip = clipboard === 'missing' ? undefined : {
    writeText: (text) => {
      copied.push(text)
      return clipboard === 'reject' ? Promise.reject(new Error('denied')) : Promise.resolve()
    },
  }
  Object.defineProperty(window.navigator, 'clipboard', { value: clip, configurable: true })
  window.eval(source)
  await new Promise((resolve) => setTimeout(resolve, 10))
  const toasts = [...window.document.querySelectorAll('div')].filter((d) => d.style.zIndex === '2147483647')
  return { copied, toast: toasts.map((t) => t.textContent).join('\n'), window }
}

test('issue page: copies title and URL without query string', async () => {
  const { copied, toast } = await run({ html: fixture('issue'), url: 'https://github.com/octo/repo/issues/12?q=x' })
  assert.deepEqual(copied, ['[Fix the widget](https://github.com/octo/repo/issues/12)'])
  assert.equal(toast, 'Copied: [Fix the widget](https://github.com/octo/repo/issues/12)')
})

test('pull request page: uses header selector and keeps the (kind) hash suffix', async () => {
  const { copied } = await run({ html: fixture('pull'), url: 'https://github.com/octo/repo/pull/34#discussion_r99' })
  assert.deepEqual(copied, ['[Add a feature (discussion)](https://github.com/octo/repo/pull/34#discussion_r99)'])
})

test('selectors fail: falls back to document.title and strips " by <user>"', async () => {
  const { copied } = await run({ html: fixture('title-only'), url: 'https://github.com/octo/repo/pull/56' })
  assert.deepEqual(copied, ['[Speed up builds](https://github.com/octo/repo/pull/56)'])
})

test('document.title fallback: issue title containing the separator', async () => {
  const { copied } = await run({
    url: 'https://github.com/octo/repo/issues/7',
    title: 'Docs · typo in README · Issue #7 · octo/repo · GitHub',
  })
  assert.deepEqual(copied, ['[Docs · typo in README](https://github.com/octo/repo/issues/7)'])
})

test('document.title fallback: repo and org discussions', async () => {
  const repo = await run({
    url: 'https://github.com/octo/repo/discussions/3',
    title: 'How do I X? · octo/repo · Discussion #3 · GitHub',
  })
  assert.deepEqual(repo.copied, ['[How do I X?](https://github.com/octo/repo/discussions/3)'])
  const org = await run({
    url: 'https://github.com/orgs/community/discussions/1',
    title: 'Welcome · community · Discussion #1 · GitHub',
  })
  assert.deepEqual(org.copied, ['[Welcome](https://github.com/orgs/community/discussions/1)'])
})

test('no title anywhere: shows an error and copies nothing', async () => {
  const { copied, toast } = await run({ url: 'https://github.com/octo/repo/issues/1', title: 'GitHub' })
  assert.deepEqual(copied, [])
  assert.equal(toast, 'Could not find the title on this page')
})

test('non-issue URLs: shows an error and copies nothing', async () => {
  for (const url of ['https://example.com/octo/repo/issues/1', 'https://github.com/octo/repo', 'https://github.com/octo/repo/pulls']) {
    const { copied, toast } = await run({ html: fixture('issue'), url })
    assert.deepEqual(copied, [], url)
    assert.equal(toast, 'Not a GitHub issue, pull request, or discussion', url)
  }
})

test('clipboard rejects or is unavailable: shows an error', async () => {
  for (const clipboard of ['reject', 'missing']) {
    const { toast } = await run({ html: fixture('issue'), url: 'https://github.com/octo/repo/issues/12', clipboard })
    assert.equal(toast, 'Could not copy to the clipboard', clipboard)
  }
})

test('toast removes itself after about two seconds', async () => {
  const { window } = await run({ html: fixture('issue'), url: 'https://github.com/octo/repo/issues/12' })
  assert.equal(window.document.body.children.length, 2)
  await new Promise((resolve) => setTimeout(resolve, 2100))
  assert.equal(window.document.body.children.length, 1)
})
