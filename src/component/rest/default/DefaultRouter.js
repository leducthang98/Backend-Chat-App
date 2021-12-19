import { Router } from 'express';

const path = '';
const router = Router();

router.get('/health-check', async (req, res) => {
  res.send('ok');
});

export default { path, router };
