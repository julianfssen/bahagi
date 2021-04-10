import { Router, Request, Response } from 'express';
import User from '../../models/user';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', (req: Request, res: Response) => {
    return res.json({ user: 'test user' });
  });
}
