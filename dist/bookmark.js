(function(){var a,b,c;a=document.createElement("textarea"),b=document.querySelector("h1.gh-header-title").children[0].textContent.trim(),c=window.location.href,a.value="["+b+"]("+c+")",document.body.appendChild(a),a.select(),document.execCommand("copy"),a.remove()}).call(this);