const textArea = document.createElement("textarea");
const titleDiv = document.querySelector("h1.gh-header-title");
const url = window.location.href;

if (titleDiv && titleDiv.children[0] && titleDiv.children[0].textContent) {
  const title = titleDiv.children[0].textContent.trim();
  textArea.value = `[${title}](${url})`;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}
