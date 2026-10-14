import { Router } from 'express';
import { dosen, inisial } from '../data.js';
import { layout, escapeHtml } from '../layout.js';

const router = Router();

// GET /dosen  -> daftar dosen
router.get('/', (req, res) => {
  // Setiap kartu dosen bisa diklik -> /dosen/:nidn (profil + kontak)
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

// GET /dosen/:nidn  -> NIDN 10 digit, selain itu 404
router.get('/:nidn', (req, res, next) => {
  const { nidn } = req.params;
  if (!/^\d{10}$/.test(nidn)) return next();

  const d = dosen.find((x) => x.nidn === nidn);
  if (!d) return next();

  const pesanWa = encodeURIComponent(`Assalamualaikum ${d.nama}, saya ingin bertanya...`);

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

          <p><a class="btn" href="https://wa.me/${d.wa}?text=${pesanWa}" target="_blank" rel="noopener">Chat via WhatsApp</a></p>
        </div>
      </div>
    </main>`));
});

export default router;
