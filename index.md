# Copy issue link bookmarklet

Drag this link to your bookmark bar to save the bookmarklet:

<a href='javascript:(()=>{var t=e=>document.querySelector(e)?.textContent?.trim(),t=t("h1.gh-header-title bdi")||t("div[aria-label=Header] h1 bdi");if(t){var a=new URL(location.href);let e=a.search="";var[,r]=a.hash.match(/^#([a-zA-Z]+)[-_]/)||[];r&&(e=` (${r})`),navigator.clipboard.writeText(`[${t}${e}](${a.toString()})`)}})();'>Copy issue link</a>

See [github.com/benbalter/copy-issue-link-bookmarklet](https://github.com/benbalter/copy-issue-link-bookmarklet) for more information.
