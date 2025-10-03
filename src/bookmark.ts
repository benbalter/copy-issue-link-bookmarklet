(() => {
  const pick = (s: string) => document.querySelector(s)?.textContent?.trim()
  // PRs have h1, Issues have h2
  const title = pick("h1.gh-header-title bdi") || pick("div[aria-label=Header] h2 bdi")
  if (!title) return
  const u = new URL(location.href)
  u.search = ''
  let suffix = "";
  const [, kind] = u.hash.match(/^#([a-zA-Z]+)[-_]/) || [];
  if (kind) suffix = ` (${kind})`;
  navigator.clipboard.writeText(`[${title}${suffix}](${u.toString()})`)
})()
