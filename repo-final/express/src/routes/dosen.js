import { Router } from 'express';
import { dosen, daftarKeahlian, inisial } from '../data.js'; // DIUBAH: + daftarKeahlian
import { layout, escapeHtml } from '../layout.js';

const router = Router();

// Panjang NIDN yang dianggap valid: 10 digit
const PANJANG_NIDN = 10;
const POLA_NIDN = new RegExp(`^\\d{${PANJANG_NIDN}}$`);

// Nilai kosong atau "-" ditampilkan sebagai tanda "-"
const tampil = (v) => (!v || String(v).trim() === '-' ? '-' : escapeHtml(v));

// GET /dosen  atau  /dosen?keahlian=Web  -> daftar dosen + filter
router.get('/', (req, res) => {
  // DITAMBAHKAN: baca query string ?keahlian=... lalu saring datanya
  const keahlian = (req.query.keahlian ?? '').trim();
  const data = keahlian
    ? dosen.filter((d) => d.keahlian.toLowerCase() === keahlian.toLowerCase())
    : dosen;

  // DITAMBAHKAN: pilihan dropdown, yang sedang dipilih diberi "selected"
  const opsi = daftarKeahlian
    .map((k) => `<option value="${escapeHtml(k)}"${k === keahlian ? ' selected' : ''}>${escapeHtml(k)}</option>`)
    .join('');

  // Setiap kartu dosen bisa diklik -> /dosen/:nidn (profil + informasi)
  const kartu = data // DIUBAH: dosen -> data (hasil filter)
    .map((d) => `
      <a class="card dosen-card" href="/dosen/${d.nidn}">
        <span class="avatar">${inisial(d.nama)}</span>
        <span class="dosen-nama">${escapeHtml(d.nama)}</span>
        <span class="tag">${escapeHtml(d.keahlian)}</span>
        <span class="muted">NIDN ${d.nidn}</span>
        <span class="lihat">Lihat profil &rarr;</span>
      </a>`)
    .join('');

  res.send(layout('Dosen', `
    <main class="wrap">
      <form class="filter" action="/dosen" method="get">
        <select name="keahlian">
          <option value="">Semua keahlian</option>
          ${opsi}
        </select>
        <button class="btn" type="submit">Filter</button>
      </form>
      <p class="muted">Menampilkan ${data.length} dosen${keahlian ? ` dengan keahlian <strong>${escapeHtml(keahlian)}</strong>` : ''}.</p>
      <div class="grid">${kartu || '<p class="muted">Tidak ada data.</p>'}</div>
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
          <span class="tag">${escapeHtml(d.keahlian)}</span>
          <p class="muted">NIDN ${d.nidn}</p>
        </div>

        <div class="profil-main card">
          <h3>Informasi</h3>
          <ul class="kontak">${baris('Keahlian', tampil(d.keahlian))}${baris('Email', tampil(d.email))}${baris('WhatsApp', tampil(d.wa))}${baris('Instagram', tampil(d.instagram))}${baris('LinkedIn', tampil(d.linkedin))}${baris('Alamat', tampil(d.alamat))}
          </ul>
        </div>
      </div>
    </main>`));
});

export default router;
