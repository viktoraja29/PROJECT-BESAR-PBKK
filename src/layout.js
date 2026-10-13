// Helper sederhana untuk membungkus konten dengan layout HTML.
// (Template engine seperti EJS/Handlebars dibahas di pertemuan berikutnya.)

export function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function layout(title, content) {
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Express Routing Demo</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav>
    <a href="/">Beranda</a>
    <a href="/tentang">Tentang</a>
    <a href="/mahasiswa">Mahasiswa</a>
    <a href="/cari">Cari</a>
    <a href="/api/mahasiswa">API</a>
  </nav>
  <main>
    <h1>${escapeHtml(title)}</h1>
    ${content}
  </main>
</body>
</html>`;
}
