import express from 'express';
import { fileURLToPath } from 'node:url';
import { layout, escapeHtml } from './layout.js';
import { mahasiswa } from './data.js';
import mahasiswaRouter from './routes/mahasiswa.js';
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

// ---------- 1. Route statis ----------
app.get('/', (req, res) => {
  res.send(layout('Beranda', '<p>Selamat datang di praktikum routing Express!</p>'));
});

app.get('/tentang', (req, res) => {
  res.send(layout('Tentang', '<p>Aplikasi demo Pertemuan 3 — Pemrograman Berbasis Kerangka Kerja.</p>'));
});

// ---------- 2. Redirect ----------
app.get('/about', (req, res) => res.redirect(301, '/tentang'));

// ---------- 3. Query string: /cari?q=budi ----------
app.get('/cari', (req, res) => {
  const q = (req.query.q ?? '').trim();

  // Cari berdasarkan nama atau NIM (tidak membedakan huruf besar/kecil)
  const hasil = q
    ? mahasiswa.filter((m) => m.nama.toLowerCase().includes(q.toLowerCase()) || m.nim.includes(q))
    : [];

  const daftar = hasil
    .map((m) => `<li><a href="/mahasiswa/${m.nim}">${m.nim}</a> — ${escapeHtml(m.nama)} (${m.prodi})</li>`)
    .join('');

  res.send(layout('Pencarian', `
    <form action="/cari" method="get">
      <input type="search" name="q" value="${escapeHtml(q)}" placeholder="Nama atau NIM" autofocus>
      <button type="submit">Cari</button>
    </form>
    ${q ? `<p>Kata kunci: <strong>${escapeHtml(q)}</strong> — ditemukan ${hasil.length} mahasiswa</p>
    <ul>${daftar || '<li>Tidak ada hasil</li>'}</ul>` : '<p>Ketik nama atau NIM lalu tekan Cari.</p>'}`));
});

// ---------- 4. Parameter opsional (sintaks Express 5): /produk atau /produk/laptop ----------
app.get('/produk{/:kategori}', (req, res) => {
  const kategori = req.params.kategori ?? 'semua';
  res.send(layout('Produk', `<p>Menampilkan produk kategori: <strong>${escapeHtml(kategori)}</strong></p>`));
});

// ---------- 5. Router modular dengan prefix ----------
app.use('/mahasiswa', mahasiswaRouter);
app.use('/api', apiRouter);

// ---------- 6. Method selain GET (diuji dengan Thunder Client / curl) ----------
app.post('/api/ping', (req, res) => res.status(201).json({ pesan: 'pong' }));

// ---------- 7. 404: middleware terakhir, dijalankan jika tidak ada route yang cocok ----------
app.use((req, res) => {
  res.status(404).send(layout('404 - Halaman Tidak Ditemukan', `<p>URL <code>${escapeHtml(req.originalUrl)}</code> tidak ada.</p><p><a href="/">Kembali ke beranda</a></p>`));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
