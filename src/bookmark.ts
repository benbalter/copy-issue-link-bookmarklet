const textArea = document.createElement("textarea");
const titleDiv = document.querySelector("h1.gh-header-title");
const titleHeader = document.querySelector("div[aria-label=Header] h1");
const url = window.location.href;
let title = "";

if (titleDiv && titleDiv.children[0] && titleDiv.children[0].textContent) {
  title = titleDiv.children[0].textContent.trim();
} else if (titleHeader && titleHeader.children[0] && titleHeader.children[0].textContent) {
  title = titleHeader.children[0].textContent.trim();
}

if (Boolean(title)) {
  textArea.value = `[${title}](${url})`;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}
