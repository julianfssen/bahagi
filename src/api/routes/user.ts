import { Router, Request, Response } from 'express';
import User from '../../models/user';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    return res.json({ users: users });
  });

  route.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await UserService.getUser(userId);
    return res.json({ user: user });
  });

  route.post('/', async (req: Request, res: Response) => {
    const username = req.query.username;
    const password = req.query.password;
    const newUser = await UserService.signup({ username, password });

    return res.json({ status: 'Created new user!', user: newUser });
  });
}
