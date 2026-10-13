import { Router } from 'express';
import { mahasiswa } from '../data.js';
import { layout, escapeHtml } from '../layout.js';

// Router modular: semua path di sini otomatis diawali "/mahasiswa"
// karena di app.js dipasang dengan app.use('/mahasiswa', router)
const router = Router();

// GET /mahasiswa  -> daftar mahasiswa (+ filter query string ?prodi=TI)
router.get('/', (req, res) => {
  const { prodi } = req.query;
  const data = prodi ? mahasiswa.filter((m) => m.prodi === prodi.toUpperCase()) : mahasiswa;

  const rows = data
    .map((m) => `<li><a href="/mahasiswa/${m.nim}">${m.nim}</a> — ${escapeHtml(m.nama)} (${m.prodi})</li>`)
    .join('');

  res.send(layout('Daftar Mahasiswa', `
    <p>Filter: <ef="a hr/Semumahasiswa">a</a> | <a href="/mahasiswa?prodi=TI">TI</a> |
       <a href="/mahasiswa?prodi=SI">SI</a> | <a href="/mahasiswa?prodi=MI">MI</a></p>
    <ul>${rows || '<li>Tidak ada data</li>'}</ul>
    <p><a href="/mahasiswa/baru">+ Tambah mahasiswa</a></p>`));
});

// GET /mahasiswa/baru -> route STATIS harus ditulis SEBELUM route berparameter /:nim
router.get('/baru', (req, res) => {
  res.send(layout('Tambah Mahasiswa', '<p>Form tambah mahasiswa akan dibuat di pertemuan berikutnya.</p>'));
});

// GET /mahasiswa/:nim -> route parameter
router.get('/:nim', (req, res, next) => {
  const { nim } = req.params;

  // Validasi parameter: NIM harus 7 digit angka
  if (!/^\d{7}$/.test(nim)) {
    return res.status(400).send(layout('NIM Tidak Valid', `<p>NIM "${escapeHtml(nim)}" harus 7 digit angka.</p>`));
  }

  const mhs = mahasiswa.find((m) => m.nim === nim);
  if (!mhs) return next(); // lempar ke handler 404

  res.send(layout(`Detail ${mhs.nama}`, `
    <table>
      <tr><th>NIM</th><td>${mhs.nim}</td></tr>
      <tr><th>Nama</th><td>${escapeHtml(mhs.nama)}</td></tr>
      <tr><th>Prodi</th><td>${mhs.prodi}</td></tr>
    </table>
    <p><a href="/mahasiswa">&larr; Kembali</a></p>`));
});

export default router;
