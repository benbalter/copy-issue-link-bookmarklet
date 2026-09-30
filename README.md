# Copy issue link bookmarklet

Copies a Markdown link to the GitHub issue, pull request, or discussion you're viewing, in the form `[title](URL)`.

## Usage

1. Visit [ben.balter.com/copy-issue-link-bookmarklet/](https://ben.balter.com/copy-issue-link-bookmarklet/)
2. Drag the link to your bookmark bar
3. Click the bookmarklet on a github.com issue, pull request, or discussion to put the link on your clipboard

A small toast in the top-right corner confirms what was copied (`Copied: [title](URL)`) and disappears after two seconds. If the bookmarklet can't copy, the toast explains why instead: the page isn't an issue, pull request, or discussion, the title couldn't be found, or the browser blocked clipboard access.

The query string is dropped from the URL. If the URL points at a comment or other anchor (for example `#issuecomment-123`), the anchor is kept and its kind is appended to the title, as in `[title (issuecomment)](URL)`.

### How the title is found

The bookmarklet reads the title from the page header first. If GitHub's markup changes and the header selectors stop matching, it falls back to the page's `<title>`, which GitHub formats as `<title> · Issue #1 · owner/repo · GitHub`, `<title> by <user> · Pull Request #1 · owner/repo · GitHub`, or `<title> · owner/repo · Discussion #1 · GitHub`. For pull requests, the ` by <user>` part is stripped.

## Developing locally

I'd love your help making the script better. The source lives in `src` and the built files live in `dist`. To build locally:

1. Clone down the repo and `cd` into the directory
2. `npm install`
3. Make your changes
4. `npm test` to type-check, lint, and run the tests in [`test/`](test/). They load fixture pages from [`test/fixtures/`](test/fixtures/) in [jsdom](https://github.com/jsdom/jsdom) with a mocked clipboard.
5. `script/build` to rebuild `dist/bookmark.js` and `index.md`. Commit both: CI fails if either is out of date.

## Development status

It works for me. It may not work in your browser of choice. If GitHub changes both its header markup and its page title format, it will stop finding titles.
