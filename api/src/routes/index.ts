import { Request, Response, Router } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { Meta, Schema, checkSchema, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();
const schema: Schema = {
  email: {
    notEmpty: {
      errorMessage: 'Email can not be empty',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Must be a valid e-mail address',
      bail: true,
    },
    custom: {
      options: async (value, meta: Meta) => {
        const userId = meta.req.params?.id;
        const user = await prisma.user.findUnique({ where: { email: value } });
        if (user) {
          if (userId === undefined || (userId && user.id !== parseInt(userId, 10))) {
            throw new Error('E-mail already in use');
          }
        }
      },
    },
  },
  username: {
    notEmpty: {
      errorMessage: 'Username can not be empty',
    },
  },
  phone: {
    notEmpty: {
      errorMessage: 'Phone can not be empty',
    },
  },
  gender: {
    notEmpty: {
      errorMessage: 'Gender can not be empty',
    },
  },
  address: {
    notEmpty: {
      errorMessage: 'Address can not be empty',
    },
  },
};

router.post('/user', checkSchema(schema, ['body']), async (req: Request, res: Response) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }
  const reqUser: User = req.body;
  const user = await prisma.user.create({ data: reqUser });
  return res.send(user);
});

router.put('/user/:id', checkSchema(schema, ['body']), async (req: Request, res: Response) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }
  const id = parseInt(req.params.id || '', 10);
  const reqUser = req.body;
  const user = await prisma.user.update({ where: { id }, data: reqUser });
  return res.send(user);
});

router.get('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '', 10);
  const user = await prisma.user.findUnique({ where: { id } });
  return res.send(user);
});
export default router;
