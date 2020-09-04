# Copy issue link bookmarklet

Drag this link to your bookmark bar to save the bookmarklet:

<a href='javascript:"use strict";var e,t=document.createElement("textarea"),c=document.querySelector("h1.gh-header-title"),n=window.location.href;c&&c.children[0]&&c.children[0].textContent&&(e=c.children[0].textContent.trim(),t.value="[".concat(e,"](").concat(n,")"),document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove());'>Copy issue link</a>

See [github.com/benbalter/copy-issue-link-bookmarklet](https://github.com/benbalter/copy-issue-link-bookmarklet) for more information.
