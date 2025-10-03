(() => {
  const pick = s => document.querySelector(s)?.children[0]?.textContent?.trim()
  const title = pick("h1.gh-header-title") || pick("div[aria-label=Header] h2")
  const u = new URL(location.href)
  u.hash = ''
  u.search = ''
  if (Boolean(title)) {
    navigator.clipboard.writeText(`[${title}](${u.toString()})`)
  }
})()
