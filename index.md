# Copy issue link bookmarklet

Drag this link to your bookmark bar to save the bookmarklet:

<a href='javascript:"use strict";var e=document.createElement("textarea"),t=document.querySelector("h1.gh-header-title"),n=document.querySelector("div[aria-label=Header] h1"),r=window.location.href,c="";t&&t.children[0]&&t.children[0].textContent?c=t.children[0].textContent.trim():n&&n.children[0]&&n.children[0].textContent&&(c=n.children[0].textContent.trim()),Boolean(c)&&navigator.clipboard.writeText("[".concat(c,"](").concat(r,")"));'>Copy issue link</a>

See [github.com/benbalter/copy-issue-link-bookmarklet](https://github.com/benbalter/copy-issue-link-bookmarklet) for more information.
