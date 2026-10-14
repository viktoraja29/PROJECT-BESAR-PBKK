import express from 'express';
import { fileURLToPath } from 'node:url';
import { layout, escapeHtml, halaman404 } from './layout.js';
import { kategoriBerita } from './data.js';
import dosenRouter from './routes/dosen.js';
import adminRouter from './routes/admin.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: file statis (CSS, gambar) dari folder public/
app.use(express.static(fileURLToPath(new URL('../public', import.meta.url))));

// Middleware: log sederhana setiap request
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString('id-ID')}  ${req.method} ${req.originalUrl}`);
  next();
});

// ---------- 1. Route statis: "/" dan "/profil" ----------
app.get('/', (req, res) => {
  res.send(layout('Beranda', `
    <section class="hero">
      <div class="wrap">
        <p class="eyebrow">Program Studi</p>
        <h1>Informatika</h1>
        <p class="lead">Membangun lulusan yang mampu merancang, mengembangkan, dan mengelola solusi teknologi informasi.</p>
        <p>
          <a class="btn btn-light" href="/profil">Visi dan misi</a>
          <a class="btn btn-outline" href="/dosen">Kenali dosen</a>
        </p>
      </div>
    </section>
    <main class="wrap">
      <div class="grid">
        <div class="card"><h3>Pembelajaran</h3><p class="muted">Kurikulum berbasis proyek dan industri.</p></div>
        <div class="card"><h3>Penelitian</h3><p class="muted">Jaringan, basis data, dan pengembangan web.</p></div>
        <div class="card"><h3>Kolaborasi</h3><p class="muted">Terhubung dengan dosen dan mitra industri.</p></div>
      </div>
    </main>`, { hero: true }));
});

app.get('/profil', (req, res) => {
  res.send(layout('Profil', `
    <main class="wrap">
      <div class="card">
        <h2>Visi</h2>
        <p>Menjadi program studi unggul di bidang teknologi informasi.</p>
      </div>
      <div class="card">
        <h2>Misi</h2>
        <ul>
          <li>Menyelenggarakan pendidikan yang berkualitas.</li>
          <li>Melaksanakan penelitian dan pengabdian kepada masyarakat.</li>
        </ul>
      </div>
    </main>`));
});

// ---------- 2. Parameter opsional (sintaks Express 5): /berita atau /berita/akademik ----------
// Jika kategori kosong, nilai default-nya "terbaru"
app.get('/berita{/:kategori}', (req, res) => {
  const kategori = req.params.kategori ?? 'terbaru';
  const tab = kategoriBerita
    .map((k) => `<a class="chip${k === kategori ? ' chip-on' : ''}" href="/berita${k === 'terbaru' ? '' : `/${k}`}">${k}</a>`)
    .join('');

  res.send(layout('Berita', `
    <main class="wrap">
      <div class="chips">${tab}</div>
      <p class="muted">Kategori: <strong>${escapeHtml(kategori)}</strong></p>
    </main>`));
});

// ---------- 3. Router modular dengan prefix ----------
app.use('/dosen', dosenRouter);   // /dosen dan /dosen/:nidn
app.use('/admin', adminRouter);   // grup prefix admin: /admin/dashboard, /admin/pengaturan
app.use('/api', apiRouter);       // response JSON: /api/dosen

// ---------- 4. 404: middleware terakhir, dijalankan jika tidak ada route yang cocok ----------
app.use((req, res) => {
  res.status(404).send(halaman404(req.originalUrl));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
