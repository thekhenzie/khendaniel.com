# khendaniel.com

My personal site: **https://khendaniel.com**. It's plain HTML and CSS, served by GitHub Pages from the `master` branch.

## Layout

| Path | What it is |
|---|---|
| `index.html`, `projects/`, `about/`, `blog/` | The generated pages. These are what GitHub Pages serves. |
| `assets/site.css` | All the styles |
| `assets/img/` | Project screenshots and my photos |
| `tools/build.js` | Builds every page from the data and posts below |
| `tools/posts/` | Blog post sources, one `.html` file per post |

## Writing a new post

1. Add a file to `tools/posts/`, for example `2026-11-15-worlds-recap.html`:

   ```
   title: Worlds 2026 recap
   date: 2026-11-15
   slug: 2026/11/worlds-recap
   ---
   <p>The post itself, as HTML.</p>
   ```

   - The post is published at `/blog/<slug>/`.
   - Add `archive: true` only for old posts that belong in the 2018 archive.
   - If two posts share a date, add `order: 2` to the one that should come first.

2. Build and push:

   ```
   node tools/build.js
   git add -A
   git commit -m "Add post: Worlds 2026 recap"
   git push
   ```

## Changing projects or pages

The projects list is the `P` object at the top of `tools/build.js`, and the home, projects and about page text is further down in the same file. Edit it there, then run `node tools/build.js`. Don't edit the generated `index.html` files directly, because the next build overwrites them.

`tools/build.js` has no dependencies and runs on Node 8 or newer.

## History

The 2018 version of the site was built with Metalsmith. Its source is in this repo's git history, and the last build it produced is still on the `gh-pages` branch.
