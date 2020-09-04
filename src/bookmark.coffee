textArea = document.createElement('textarea')
title = document.querySelector("h1.gh-header-title").children[0].textContent.trim()
url = window.location.href
textArea.value = "[#{title}](#{url})"
document.body.appendChild textArea
textArea.select()
document.execCommand 'copy'
textArea.remove()
