import { Router } from 'express';
import { Message } from '../../model/Message';

const path = '';
const router = Router();

router.get('/health-check', async (req, res) => {
  res.send('ok');
});

export default { path, router };
