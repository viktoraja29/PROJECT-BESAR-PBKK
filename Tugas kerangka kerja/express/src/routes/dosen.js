import { Router } from 'express';
import { dosen, inisial } from '../data.js';
import { layout, escapeHtml } from '../layout.js';

const router = Router();

// Panjang NIDN yang dianggap valid. Sesuaikan dengan data di data.js
// (data kamu 10 digit; jika soal mewajibkan 10 digit, ubah jadi 10 dan isi data 10 digit)
const PANJANG_NIDN = 10;
const POLA_NIDN = new RegExp(`^\\d{${PANJANG_NIDN}}$`);

// Nilai kosong atau "-" ditampilkan sebagai tanda "-"
const tampil = (v) => (!v || String(v).trim() === '-' ? '-' : escapeHtml(v));

// GET /dosen  -> daftar dosen
router.get('/', (req, res) => {
  // Setiap kartu dosen bisa diklik -> /dosen/:nidn (profil + informasi)
  const kartu = dosen
    .map((d) => `
      <a class="card dosen-card" href="/dosen/${d.nidn}">
        <span class="avatar">${inisial(d.nama)}</span>
        <span class="dosen-nama">${escapeHtml(d.nama)}</span>
        <span class="muted">NIDN ${d.nidn}</span>
        <span class="lihat">Lihat profil &rarr;</span>
      </a>`)
    .join('');

  res.send(layout('Dosen', `
    <main class="wrap">
      <p class="muted">Menampilkan ${dosen.length} dosen.</p>
      <div class="grid">${kartu}</div>
    </main>`));
});

// GET /dosen/:nidn  -> NIDN sesuai PANJANG_NIDN digit, selain itu 404
router.get('/:nidn', (req, res, next) => {
  const { nidn } = req.params;
  if (!POLA_NIDN.test(nidn)) return next();

  const d = dosen.find((x) => x.nidn === nidn);
  if (!d) return next();

  // Semua informasi ditampilkan sebagai teks biasa (tanpa link)
  const baris = (label, isi) => `
            <li>
              <span class="k-label">${label}</span>
              <span>${isi}</span>
            </li>`;

  res.send(layout(d.nama, `
    <main class="wrap">
      <a class="back" href="/dosen">&larr; Semua dosen</a>

      <div class="profil">
        <div class="profil-side card">
          <span class="avatar avatar-lg">${inisial(d.nama)}</span>
          <h2>${escapeHtml(d.nama)}</h2>
          <p class="muted">NIDN ${d.nidn}</p>
        </div>

        <div class="profil-main card">
          <h3>Informasi</h3>
          <ul class="kontak">${baris('Email', tampil(d.email))}${baris('WhatsApp', tampil(d.wa))}${baris('Instagram', tampil(d.instagram))}${baris('LinkedIn', tampil(d.linkedin))}${baris('Alamat', tampil(d.alamat))}
          </ul>
        </div>
      </div>
    </main>`));
});

export default router;
