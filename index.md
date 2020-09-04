# Copy issue link bookmarklet

Drag this link to your bookmark bar to save the bookmarklet:

<a href='javascript:(function(){var a,b,c;a=document.createElement("textarea"),b=document.getElementsByTagName("h1")[2].children[0].textContent.trim(),c=window.location.href,a.value="["+b+"]("+c+")",document.body.appendChild(a),a.select(),document.execCommand("copy"),a.remove()}).call(this);'>Copy issue link</a>

See [github.com/benbalter/copy-issue-link-bookmarklet](https://github.com/benbalter/copy-issue-link-bookmarklet) for more information.
