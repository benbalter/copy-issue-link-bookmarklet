(() => {
  const toast = (text: string, ok: boolean) => {
    const el = document.createElement('div')
    el.textContent = text
    el.style.cssText = 'all:initial;position:fixed;top:16px;right:16px;z-index:2147483647;'
      + 'max-width:360px;padding:8px 12px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.3);'
      + 'font:14px/1.4 -apple-system,BlinkMacSystemFont,sans-serif;word-break:break-word;color:#fff;'
      + `background:${ok ? '#1f883d' : '#cf222e'}`
    ;(document.body || document.documentElement).appendChild(el)
    setTimeout(() => el.remove(), 2000)
  }

  const u = new URL(location.href)
  if (u.hostname !== 'github.com' || !/^\/(orgs\/[^/]+|[^/]+\/[^/]+)\/(issues|pull|discussions)\/\d+/.test(u.pathname)) {
    toast('Not a GitHub issue, pull request, or discussion', false)
    return
  }

  const pick = (s: string) => document.querySelector(s)?.textContent?.trim()

  // Fall back to document.title, which GitHub formats as:
  //   <title> · Issue #1 · owner/repo · GitHub
  //   <title> by <user> · Pull Request #1 · owner/repo · GitHub
  //   <title> · owner/repo · Discussion #1 · GitHub
  const fromDocTitle = () => {
    const parts = document.title.split(' · ')
    const i = parts.findIndex((p) => /^(Issue|Pull Request|Discussion) #\d+$/.test(p))
    if (i < 1) return
    const kind = parts[i].split(' ')[0]
    const title = parts.slice(0, kind === 'Discussion' ? i - 1 : i).join(' · ')
    return (kind === 'Pull' ? title.replace(/ by \S+$/, '') : title).trim()
  }

  // PRs and Issues have different header structure
  const title = pick('h1.gh-header-title bdi') || pick('div[aria-label=Header] h1 bdi') || fromDocTitle()
  if (!title) {
    toast('Could not find the title on this page', false)
    return
  }

  u.search = ''
  let suffix = ''
  const [, kind] = u.hash.match(/^#([a-zA-Z]+)[-_]/) || []
  if (kind) suffix = ` (${kind})`
  const link = `[${title}${suffix}](${u.toString()})`

  // navigator.clipboard is missing outside secure contexts, so call it inside
  // the promise chain to turn that into a rejection too
  Promise.resolve().then(() => navigator.clipboard.writeText(link)).then(
    () => toast(`Copied: ${link}`, true),
    () => toast('Could not copy to the clipboard', false),
  )
})()
