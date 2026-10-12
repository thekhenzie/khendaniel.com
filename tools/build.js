// Builds khendaniel.com: writes the static HTML pages, blog posts, feed and sitemap into the repo root.
// Usage (from the repo root):  node tools/build.js
// Blog posts live in tools/posts/*.html: a few "key: value" lines (title, date, slug, optional order/archive), then "---", then the post HTML.
// Projects are listed in the P object below. Works on Node 8+ with no dependencies.
var fs = require('fs');
var path = require('path');

var ROOT = process.argv[2] || path.join(__dirname, '..');
var SITE = 'https://khendaniel.com';
var EMAIL = 'thekhenzie@gmail.com';

// Node 8 has no recursive mkdir.
function mkdirp(dir) { if (fs.existsSync(dir)) return; mkdirp(path.dirname(dir)); fs.mkdirSync(dir); }
function write(rel, content) { var f = path.join(ROOT, rel); mkdirp(path.dirname(f)); fs.writeFileSync(f, content); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

var FONTS = 'https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700;800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap';

function page(o) {
  var title = o.title ? o.title + ' · Khen Daniel' : 'Khen Daniel · Software engineer';
  var nav = [['/', 'Home'], ['/projects/', 'Projects'], ['/about/', 'About'], ['/blog/', 'Blog']].map(function (n) {
    return '<a href="' + n[0] + '"' + (o.nav === n[1] ? ' aria-current="page"' : '') + '>' + n[1] + '</a>';
  }).join('');
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    (o.verify ? '<meta name="google-site-verification" content="_u7mBJTDwpy3Pv_1j1sCDz5ir-Qv0wSiJ7YPj0urcC0">\n' : '') +
    '<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(o.description) + '">\n' +
    '<meta name="theme-color" content="#2b6ff2">\n<link rel="canonical" href="' + SITE + o.path + '">\n<link rel="icon" href="/favicon.ico">\n' +
    '<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(o.description) + '">\n<meta property="og:image" content="' + SITE + '/assets/img/photo-sunset.jpg">\n' +
    '<link rel="alternate" type="application/rss+xml" title="Khen Daniel" href="/blog/feed.xml">\n' +
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '<link rel="stylesheet" href="' + FONTS + '">\n<link rel="stylesheet" href="/assets/site.css">\n</head>\n<body>\n<div class="wrap">\n' +
    '<header class="site-header">\n  <a class="brand" href="/"><span class="logo" aria-hidden="true"></span>Khen Daniel</a>\n  <nav class="nav" aria-label="Main">' + nav + '</nav>\n</header>\n' +
    '<main>\n' + o.body + '\n</main>\n' +
    '<footer class="site-footer">\n  <span>© ' + new Date().getFullYear() + ' Khen Daniel · <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></span>\n  <span>Photos are mine, taken around Manila. Plain HTML on GitHub Pages.</span>\n</footer>\n' +
    '</div>\n</body>\n</html>\n';
}

/* ---------- Projects ---------- */
// cover: shot (screenshot), photo, widget/valentine (drawn in CSS), or none (compact row)
var P = {
  pickems:   { year: '2026', kind: 'tool', title: 'Worlds 2026 Pick Board', note: 'My League of Legends Worlds 2026 Crystal Ball and Play-In picks, researched on gol.gg stats, with hit and miss tracking.', url: 'https://project.khendaniel.com/2026-pickems/', link: 'Open the board', cover: 'shot-pickems.jpg' },
  bedfit:    { year: '2026', kind: 'tool', title: 'Will the Bed Fit?', note: 'Type in your room and bed measurements, then drag furniture around in 3D to check walkways and door swings.', url: 'https://project.khendaniel.com/bed-fit/', link: 'Try it', cover: 'shot-bed-fit.jpg' },
  habit:     { year: '2026', kind: 'tool', title: 'Habit Chain', note: 'A daily habit tracker with streaks and a 16-week calendar. Everything stays in your browser.', url: 'https://project.khendaniel.com/habit-chain/', link: 'Start a chain', cover: 'shot-habit-chain.jpg' },
  widget:    { year: '2026', kind: 'tool', title: 'Claude Usage Widget', note: 'A Windows taskbar widget that shows my Claude session and weekly usage, with reset countdowns. C# and WPF.', cover: 'widget', private: true },
  guardhouse: { year: 'Current', kind: 'client', title: 'GuardHouse', note: 'Workforce management software for security companies. I work on the web platform as a software engineer.', url: 'https://www.guardhousehq.com/', link: 'Visit site', cover: 'shot-guardhouse.jpg' },
  greensun:  { year: '2025', kind: 'client', title: 'Greensun', note: 'Website and knowledge base for a co-working space: the one place its team and members look things up.', url: 'https://thekhenzie.github.io/greensun/', link: 'Visit site', cover: 'shot-greensun.jpg' },
  party:     { year: '2023', kind: 'client', title: 'Party Paradise', note: 'Website for an events and party business.', url: 'https://thekhenzie.github.io/chantal-party-paradise/' },
  resort:    { year: '2018', kind: 'client', title: 'Veneracion\'s Resort', note: 'An online reservation site for a resort, built in PHP.', url: 'https://github.com/thekhenzie/hotel-management-system' },
  envel:     { year: '', kind: 'client', title: 'Envel', note: 'A modern digital-only bank I worked on. Owned by Artler Capital Inc.', url: 'https://envelmoney.com/', link: 'Visit site', cover: 'shot-envel.jpg' },
  seating:   { year: '2026', kind: 'personal', title: 'Wedding Seating Plan', note: 'A drag-and-drop seating planner for our wedding. No install, no backend.', url: 'https://thekhenzie.github.io/seating-plan/', link: 'Open the planner', cover: 'shot-seating-plan.jpg' },
  valentine: { year: '2025', kind: 'personal', title: 'Will You Be My Valentine?', note: 'An interactive page for asking someone to be your Valentine. The “No” button is hard to catch.', url: 'https://thekhenzie.github.io/valentines/', link: 'Ask someone', cover: 'valentine' },
  photo:     { year: '2018', kind: 'personal', title: 'Photography', note: 'My photo portfolio: Manila skylines, sunsets and street scenes.', url: 'https://photography.khendaniel.com', link: 'See the photos', cover: 'photo-golden.jpg' },
  pokemon:   { year: '2023', kind: 'personal', title: 'Pokémon Suggest', note: 'Type in an opposing Pokémon and it suggests which ones from your list can beat it. Angular.', url: 'https://github.com/thekhenzie/pokemon-suggest' },
  reddit:    { year: '2019', kind: 'old', title: 'Reddit Hide Username', note: 'A Chrome extension that hides your Reddit username in one click.', url: 'https://github.com/thekhenzie/reddit-hide-username' },
  tesseract: { year: '2018', kind: 'old', title: 'Tesseract OCR on Xamarin', note: 'Tesseract OCR running inside a Xamarin.Android app.', url: 'https://github.com/thekhenzie/tesseract-ocr' },
  lotto:     { year: '2018', kind: 'old', title: 'PCSO Lotto', note: 'Machine learning experiments on PCSO lotto draws, in Python.', url: 'https://github.com/thekhenzie/pcso-lotto' },
  quora:     { year: '2017', kind: 'old', title: 'Quora Reader', note: 'A Chrome extension that strips Quora down to the reading.', url: 'https://github.com/thekhenzie/chrome-extensions/tree/master/quora-reader' }
};
var CHIP = { tool: 'Small tool', client: 'Client work', personal: 'Personal', old: 'Experiment' };

function cover(p) {
  if (p.cover === 'widget') {
    return '<div class="cover-widget" aria-hidden="true"><div class="taskbar">' +
      '<div class="row"><span>5h</span><span class="bar"><i style="width:42%"></i></span><span>42%</span></div>' +
      '<div class="row"><span>7d</span><span class="bar"><i class="b" style="width:18%"></i></span><span>18%</span></div>' +
      '<div class="clock"><span>resets in 2h 14m</span><span>9:41 PM</span></div></div></div>';
  }
  if (p.cover === 'valentine') {
    return '<div class="cover-valentine" aria-hidden="true"><span class="heart">♥</span><div class="yn"><span>Yes</span><span>No</span></div></div>';
  }
  return '<img src="/assets/img/' + p.cover + '" alt="Screenshot of ' + esc(p.title) + '" loading="lazy" width="960" height="600">';
}
function card(p) {
  var go = p.private ? '<span class="go private">Private repo</span>'
    : '<span class="go">' + p.link + ' ↗</span>';
  var title = p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener">' + esc(p.title) + '</a>' : esc(p.title);
  return '<li><article class="card">\n  <div class="thumb">' + cover(p) + '</div>\n  <div class="card-body">\n' +
    '    <div class="meta"><span class="chip ' + p.kind + '">' + CHIP[p.kind] + '</span><span class="year">' + p.year + '</span></div>\n' +
    '    <h3>' + title + '</h3>\n    <p>' + esc(p.note) + '</p>\n    ' + go + '\n  </div>\n</article></li>';
}
function row(p) {
  return '<li><a class="row-item" href="' + p.url + '" target="_blank" rel="noopener"><b>' + esc(p.title) + ' ↗</b>' +
    '<span class="year">' + (p.year || '') + '</span><small>' + esc(p.note) + '</small></a></li>';
}
function cards(keys) { return '<ul class="cards">\n' + keys.map(function (k) { return card(P[k]); }).join('\n') + '\n</ul>'; }
function rows(keys) { return '<ul class="rows">\n' + keys.map(function (k) { return row(P[k]); }).join('\n') + '\n</ul>'; }

/* ---------- Blog ---------- */
function plain(html) {
  return html.replace(/<\/?(em|strong|a|code|b|i)[^>]*>/g, '').replace(/<[^>]+>/g, ' ')
    .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}
var POST_DIR = path.join(__dirname, 'posts');
var POSTS = fs.readdirSync(POST_DIR).filter(function (f) { return /\.html$/.test(f); }).map(function (f) {
  var raw = fs.readFileSync(path.join(POST_DIR, f), 'utf8');
  var parts = raw.split(/\r?\n---\r?\n/);
  var meta = {};
  parts[0].split(/\r?\n/).forEach(function (l) { var i = l.indexOf(':'); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
  var body = parts.slice(1).join('\n---\n').trim();
  var text = plain(body);
  return { slug: meta.slug, date: meta.date, order: Number(meta.order || 0), title: esc(meta.title), body: body,
    archive: meta.archive === 'true', summary: text.slice(0, 145).replace(/\s\S*$/, '') + '…' };
}).sort(function (a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return b.order - a.order;
});
var CURRENT = POSTS.filter(function (p) { return !p.archive; });
var ARCHIVE = POSTS.filter(function (p) { return p.archive; });
function longDate(iso) {
  var M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var d = iso.split('-').map(Number); return d[2] + ' ' + M[d[1] - 1] + ' ' + d[0];
}
function shortDate(iso) { var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; var d = iso.split('-').map(Number); return M[d[1] - 1] + ' ' + d[2] + ', ' + d[0]; }
function postList(list, withSummary) {
  return '<ul class="posts">\n' + list.map(function (p) {
    return '  <li><a href="/blog/' + p.slug + '/"><span class="date">' + shortDate(p.date) + '</span><b>' + p.title + '</b><span class="arrow">→</span>' +
      (withSummary ? '<small>' + esc(p.summary) + '</small>' : '') + '</a></li>';
  }).join('\n') + '\n</ul>';
}

var CONTACT = '<section class="contact-band" aria-labelledby="hi">\n  <h2 id="hi">Got an idea? Let’s build it.</h2>\n' +
  '  <p>For freelance work, a small tool you need, or just to say hi, email me.</p>\n' +
  '  <a class="btn" href="mailto:' + EMAIL + '">' + EMAIL + '</a>\n</section>';

/* ---------- Home ---------- */
write('index.html', page({
  path: '/', verify: true,
  description: 'Khen Daniel is a software engineer from the Philippines. He builds workforce management software at GuardHouse, small tools on the side, and takes photos.',
  body:
'<section class="hero" aria-labelledby="name">\n  <div>\n    <span class="hello"><span class="dot" aria-hidden="true"></span>Software engineer from the Philippines</span>\n' +
'    <h1 id="name">Hi, I’m <span>Khen</span> Daniel.</h1>\n' +
'    <p class="lede">I build workforce management software for security companies at <strong>GuardHouse</strong>. On the side I make small, useful tools, and I take photos of the city.</p>\n' +
'    <div class="actions"><a class="btn primary" href="/projects/">See my projects</a><a class="btn ghost" href="mailto:' + EMAIL + '">Email me</a></div>\n  </div>\n' +
'  <div class="prints" aria-hidden="true">\n' +
'    <figure class="print a"><img src="/assets/img/photo-aerial.jpg" alt=""><figcaption>from above</figcaption></figure>\n' +
'    <figure class="print b"><img src="/assets/img/photo-sunset.jpg" alt=""><figcaption>sunset, Manila</figcaption></figure>\n' +
'    <figure class="print c"><img src="/assets/img/photo-sky.jpg" alt=""><figcaption>blue hour</figcaption></figure>\n' +
'    <span class="sticker">~10 yrs of shipping</span>\n  </div>\n</section>\n' +
'<section aria-labelledby="built">\n  <div class="section-head"><div><h2 id="built">Things I’ve built</h2><p>Small tools for everyday problems, plus some client work.</p></div><a class="more" href="/projects/">All projects</a></div>\n' +
cards(['guardhouse', 'pickems', 'bedfit', 'widget', 'greensun', 'seating']) + '\n</section>\n' +
'<section class="lens" aria-labelledby="lens">\n  <div class="section-head"><div><h2 id="lens">Through my lens</h2><p>Manila skylines, sunsets and street scenes, mostly shot on my phone.</p></div><a class="more" href="https://photography.khendaniel.com">Full portfolio</a></div>\n' +
'  <div class="photo-grid">\n' +
[['photo-golden.jpg', 'wide', 'Golden hour over the skyline'], ['photo-escalator.jpg', 'tall', 'Blue-lit escalator'], ['photo-street-bw.jpg', '', 'Black and white street at night'],
 ['photo-lights.jpg', 'tall', 'Glowing lantern globes'], ['photo-night.jpg', '', 'City lights at night'], ['photo-skyline-dusk.jpg', 'wide', 'Skyline at dusk'], ['photo-window.jpg', '', 'City through tall windows']]
  .map(function (x) { return '    <figure' + (x[1] ? ' class="' + x[1] + '"' : '') + '><img src="/assets/img/' + x[0] + '" alt="' + x[2] + '" loading="lazy"></figure>'; }).join('\n') +
'\n  </div>\n</section>\n' +
'<section aria-labelledby="writing">\n  <div class="section-head"><div><h2 id="writing">Latest writing</h2><p>New posts, plus an archive from when I first put this site up in 2018.</p></div><a class="more" href="/blog/">All posts</a></div>\n' +
postList(POSTS.slice(0, 3), true) + '\n</section>\n' + CONTACT
}));

/* ---------- Projects ---------- */
write('projects/index.html', page({
  path: '/projects/', title: 'Projects', nav: 'Projects',
  description: 'Small tools, client work and experiments by Khen Daniel.',
  body:
'<div class="page-hero"><h1>Projects<span>.</span></h1><p>Small tools I built for myself and the people around me, client sites, and older experiments. Most of the code is on <a href="https://github.com/thekhenzie" target="_blank" rel="noopener">GitHub</a>.</p></div>\n' +
'<section aria-labelledby="t"><div class="section-head"><div><h2 id="t">Small tools</h2><p>Single-page apps. No sign-up, and your data stays in your browser.</p></div></div>\n' + cards(['pickems', 'bedfit', 'habit', 'widget']) + '\n</section>\n' +
'<section aria-labelledby="c"><div class="section-head"><div><h2 id="c">Client work</h2></div></div>\n' + cards(['guardhouse', 'greensun', 'envel']) + '\n<div style="height:16px"></div>\n' + rows(['party', 'resort']) + '\n</section>\n' +
'<section aria-labelledby="p"><div class="section-head"><div><h2 id="p">Personal</h2></div></div>\n' + cards(['seating', 'valentine', 'photo']) + '\n<div style="height:16px"></div>\n' + rows(['pokemon']) + '\n</section>\n' +
'<section aria-labelledby="o"><div class="section-head"><div><h2 id="o">Older experiments</h2><p>Things I made while learning, from 2017 to 2019.</p></div></div>\n' + rows(['reddit', 'tesseract', 'lotto', 'quora']) + '\n</section>\n' + CONTACT
}));

/* ---------- About ---------- */
write('about/index.html', page({
  path: '/about/', title: 'About', nav: 'About',
  description: 'About Khen Daniel, a software engineer from the Philippines.',
  body:
'<div class="page-hero"><h1>About me<span>.</span></h1></div>\n<div class="about">\n<div class="prose">\n' +
'<p>I’m <strong>Khen Daniel</strong> (Harold Khen Daniel Baniqued on paper, but Khen is fine), a software engineer from the Philippines with about ten years of experience.</p>\n' +
'<p>I’m currently at <strong>GuardHouse</strong>, where I build workforce management software for security companies in Australia and the UK.</p>\n' +
'<p>Outside work I like building small, single-page tools for myself and the people around me: a 3D bed planner when we were rearranging furniture, a seating planner for our wedding, a pick board for League of Legends Worlds. They’re all on the <a href="/projects/">projects page</a>.</p>\n' +
'<p>I also take photos, mostly of Manila’s skyline, sunsets and streets. Some of them are on this site, and more are in my <a href="https://photography.khendaniel.com">photography portfolio</a>.</p>\n' +
'<h2>Get in touch</h2>\n<p>The best way to reach me is email: <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.</p>\n' +
'<h2>This site</h2>\n<p>Plain HTML and CSS with no framework, hosted on GitHub Pages. The source is on <a href="https://github.com/thekhenzie/khendaniel.com" target="_blank" rel="noopener">GitHub</a>. The code is <a href="https://thekhenzie.mit-license.org" target="_blank" rel="noopener">MIT licensed</a>, and the words and photos are mine.</p>\n</div>\n' +
'<aside class="side">\n  <figure class="print"><img src="/assets/img/photo-sunset.jpg" alt="Sunset behind a building under construction in Manila"><figcaption>Manila, 2018</figcaption></figure>\n' +
'  <dl class="facts"><div><dt>Based in</dt><dd>Philippines</dd></div><div><dt>Work</dt><dd>GuardHouse</dd></div><div><dt>Experience</dt><dd>~10 years</dd></div><div><dt>Email</dt><dd><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></dd></div></dl>\n</aside>\n</div>'
}));

/* ---------- Blog ---------- */
write('blog/index.html', page({
  path: '/blog/', title: 'Blog', nav: 'Blog', description: 'Posts by Khen Daniel about building things, League of Legends, and the occasional life update.',
  body: '<div class="page-hero"><h1>Blog<span>.</span></h1><p>Notes on things I build, League of Legends, and whatever else is on my mind.</p></div>\n' +
    '<section aria-labelledby="y2026" style="padding-top:24px"><div class="section-head"><div><h2 id="y2026">2026</h2></div></div>\n' + postList(CURRENT, true) + '\n</section>\n' +
    '<section aria-labelledby="arc"><div class="section-head"><div><h2 id="arc">Archive (2018)</h2><p>What I wrote when I first put this site up. Kept as it was, so some of it is out of date.</p></div></div>\n' + postList(ARCHIVE, true) + '\n</section>'
}));
POSTS.forEach(function (p, i) {
  var newer = POSTS[i - 1], older = POSTS[i + 1];
  write('blog/' + p.slug + '/index.html', page({
    path: '/blog/' + p.slug + '/', title: p.title.replace(/<[^>]+>/g, ''), nav: 'Blog', description: p.summary,
    body: '<article class="post">\n' + (p.archive ? '<p class="archive-note">From the 2018 archive</p>\n' : '') + '<h1>' + p.title + '</h1><time datetime="' + p.date + '">' + longDate(p.date) + '</time>\n' +
      '<div class="prose">\n' + p.body + '\n</div>\n<nav class="post-foot" aria-label="More posts">' +
      (older ? '<a href="/blog/' + older.slug + '/">← ' + older.title + '</a>' : '<span></span>') +
      (newer ? '<a href="/blog/' + newer.slug + '/">' + newer.title + ' →</a>' : '<a href="/blog/">All posts →</a>') + '</nav>\n</article>'
  }));
});

write('404.html', page({
  path: '/404.html', title: 'Page not found', description: 'Page not found.',
  body: '<div class="page-hero"><h1>Lost<span>?</span></h1><p>That page doesn’t exist anymore, or never did. Try the <a href="/">home page</a>, <a href="/projects/">projects</a> or the <a href="/blog/">blog archive</a>.</p></div>'
}));

/* ---------- Redirects, feed, sitemap ---------- */
function redirect(to) {
  return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=' + to + '">' +
    '<link rel="canonical" href="' + to + '"><title>Moved</title></head><body>This page has moved to <a href="' + to + '">' + to + '</a>.</body></html>\n';
}
write('ama/index.html', redirect('https://github.com/thekhenzie/ama/'));
write('blog/archives/index.html', redirect('/blog/'));
write('blog/feed.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n<title>Khen Daniel</title>\n<link>' + SITE + '/blog/</link>\n<description>Posts by Khen Daniel</description>\n' +
  POSTS.map(function (p) {
    return '<item><title>' + esc(p.title.replace(/<[^>]+>/g, '')) + '</title><link>' + SITE + '/blog/' + p.slug + '/</link><guid>' + SITE + '/blog/' + p.slug + '/</guid>' +
      '<pubDate>' + new Date(p.date + 'T00:00:00Z').toUTCString() + '</pubDate><description>' + esc(p.summary) + '</description></item>';
  }).join('\n') + '\n</channel>\n</rss>\n');
var urls = ['/', '/projects/', '/about/', '/blog/'].concat(POSTS.map(function (p) { return '/blog/' + p.slug + '/'; }));
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(function (u) { return '  <url><loc>' + SITE + u + '</loc></url>'; }).join('\n') + '\n</urlset>\n');
write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n');
write('CNAME', 'khendaniel.com\n');
console.log('Wrote site with ' + POSTS.length + ' posts');
