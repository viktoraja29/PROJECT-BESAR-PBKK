// Helper sederhana untuk membungkus konten dengan layout HTML.

export function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function layout(title, content, { hero = false } = {}) {
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Informatika</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="topbar">
    <div class="wrap topbar-in">
      <a class="brand" href="/"><span class="brand-mark">&lt;/&gt;</span> Informatika</a>
      <nav>
        <a href="/">Beranda</a>
        <a href="/profil">Profil</a>
        <a href="/dosen">Dosen</a>
        <a href="/berita">Berita</a>
        <a href="/admin/dashboard">Admin</a>
      </nav>
    </div>
  </header>
  ${hero ? '' : `<section class="page-head"><div class="wrap"><h1>${escapeHtml(title)}</h1></div></section>`}
  ${content}
  <footer>
    <div class="wrap">&copy; ${new Date().getFullYear()} Program Studi Informatika</div>
  </footer>
</body>
</html>`;
}

// Halaman 404 kustom (dipakai oleh handler 404 terakhir di app.js)
export function halaman404(url) {
  return layout('Halaman tidak ditemukan', `
    <main class="wrap">
      <p class="muted">URL <code>${escapeHtml(url)}</code> tidak ada.</p>
      <p><a class="btn" href="/">Kembali ke beranda</a></p>
    </main>`);
}   