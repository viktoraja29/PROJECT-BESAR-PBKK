import { Router } from 'express';
import { dosen } from '../data.js';

// Route yang mengembalikan JSON (dipasang dengan prefix /api)
const router = Router();

// GET /api/dosen  atau  /api/dosen?keahlian=Web
router.get('/dosen', (req, res) => {
  const keahlian = (req.query.keahlian ?? '').trim();
  const data = keahlian
    ? dosen.filter((d) => d.keahlian.toLowerCase() === keahlian.toLowerCase())
    : dosen;

  res.json({ status: 'success', total: data.length, data });
});

export default router;