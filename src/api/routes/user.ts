import { Router, Request, Response } from 'express';
import User from '../../models/user';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', async (req: Request, res: Response) => {
    const user = await User.query();
    return res.json({ user: user });
  });
}
