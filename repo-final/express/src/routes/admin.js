import { Router } from 'express';
import { layout } from '../layout.js';

// Grup route dengan prefix /admin
// (di app.js dipasang dengan app.use('/admin', router))
const router = Router();

router.get('/dashboard', (req, res) => {
  res.send(layout('Dashboard Admin', `
    <main class="wrap">
      <p class="muted">Ringkasan data program studi.</p>
      <p><a class="btn" href="/admin/pengaturan">Ke pengaturan &rarr;</a></p>
    </main>`));
});

router.get('/pengaturan', (req, res) => {
  res.send(layout('Pengaturan Admin', `
    <main class="wrap">
      <p class="muted">Halaman pengaturan situs.</p>
      <p><a class="btn btn-ghost" href="/admin/dashboard">&larr; Ke dashboard</a></p>
    </main>`));
});

export default router;