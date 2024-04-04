import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
router.post('/user', async (req, res) => {
  const reqUser = req.body;
  const user = await prisma.user.create({ data: reqUser });
  res.send(user);
});

router.put('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const reqUser = req.body;
  const user = await prisma.user.update({ where: { id }, data: reqUser });
  res.send(user);
});

router.get('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = await prisma.user.findUnique({ where: { id } });
  res.send(user);
});
export default router;
