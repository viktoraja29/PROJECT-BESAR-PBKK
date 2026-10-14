import { Router } from 'express';
import { dosen } from '../data.js';

// Route yang mengembalikan JSON (dipasang dengan prefix /api)
const router = Router();

// GET /api/dosen
router.get('/dosen', (req, res) => {
  res.json({ status: 'success', total: dosen.length, data: dosen });
});

export default router;
