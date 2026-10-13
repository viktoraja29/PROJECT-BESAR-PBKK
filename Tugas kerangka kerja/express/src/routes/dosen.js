import { Router } from 'express';
import { dosen, daftarKeahlian, inisial } from '../data.js';
import { layout, escapeHtml } from '../layout.js';

// Router modular: semua path di sini otomatis diawali "/dosen"
// karena di app.js dipasang dengan app.use('/dosen', router)
const router = Router();

// GET /dosen  atau  /dosen?keahlian=Web  -> daftar dosen + filter query string
router.get('/', (req, res) => {
  const keahlian = (req.query.keahlian ?? '').trim();
  const data = keahlian
    ? dosen.filter((d) => d.keahlian.toLowerCase() === keahlian.toLowerCase())
    : dosen;

  const opsi = daftarKeahlian
    .map((k) => `<option value="${escapeHtml(k)}"${k === keahlian ? ' selected' : ''}>${escapeHtml(k)}</option>`)
    .join('');

  // Setiap kartu dosen bisa diklik -> /dosen/:nidn (profil + kontak)
  const kartu = data
    .map((d) => `
      <a class="card dosen-card" href="/dosen/${d.nidn}">
        <span class="avatar">${inisial(d.nama)}</span>
        <span class="dosen-nama">${escapeHtml(d.nama)}</span>
        <span class="tag">${escapeHtml(d.keahlian)}</span>
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

// GET /dosen/:nidn -> route parameter
router.get('/:nidn', (req, res, next) => {
  const { nidn } = req.params;

  // Validasi parameter: NIDN harus 10 digit angka, selain itu lempar ke handler 404
  if (!/^\d{10}$/.test(nidn)) return next();

  const d = dosen.find((x) => x.nidn === nidn);
  if (!d) return next(); // 10 digit tapi tidak ada datanya -> 404 juga

  const pesanWa = encodeURIComponent(`Assalamualaikum ${d.nama}, saya ingin bertanya...`);
  const peta = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.alamat)}`;

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
          <h3>Kontak</h3>
          <ul class="kontak">
            <li>
              <span class="k-label">WhatsApp</span>
              <a href="https://wa.me/${d.wa}?text=${pesanWa}" target="_blank" rel="noopener">+${d.wa}</a>
            </li>
            <li>
              <span class="k-label">Email</span>
              <a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>
            </li>
          </ul>

          <h3>Media sosial</h3>
          <ul class="kontak">
            <li>
              <span class="k-label">Instagram</span>
              <a href="https://instagram.com/${encodeURIComponent(d.instagram)}" target="_blank" rel="noopener">@${escapeHtml(d.instagram)}</a>
            </li>
            <li>
              <span class="k-label">LinkedIn</span>
              <a href="https://www.linkedin.com/in/${encodeURIComponent(d.linkedin)}" target="_blank" rel="noopener">${escapeHtml(d.linkedin)}</a>
            </li>
          </ul>

          <h3>Alamat</h3>
          <p>${escapeHtml(d.alamat)}</p>
          <p><a class="btn btn-ghost" href="${peta}" target="_blank" rel="noopener">Buka di peta</a></p>

          <p><a class="btn" href="https://wa.me/${d.wa}?text=${pesanWa}" target="_blank" rel="noopener">Chat via WhatsApp</a></p>
        </div>
      </div>
    </main>`));
});

export default router;