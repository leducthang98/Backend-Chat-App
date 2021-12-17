import { Router } from 'express';

const path = '';
const router = Router();

router.get('/healthcheck', (req, res) => {
  res.send('ok');
});

export default { path, router };
