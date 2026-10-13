import { Router } from 'express';
import { mahasiswa } from '../data.js';

// Route yang mengembalikan JSON (dipasang dengan prefix /api)
const router = Router();

router.get('/mahasiswa', (req, res) => {
  res.json({ status: 'success', total: mahasiswa.length, data: mahasiswa });
});

router.get('/mahasiswa/:nim', (req, res) => {
  const mhs = mahasiswa.find((m) => m.nim === req.params.nim);
  if (!mhs) return res.status(404).json({ status: 'error', message: 'Mahasiswa tidak ditemukan' });
  res.json({ status: 'success', data: mhs });
});

export default router;
