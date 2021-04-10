import { Router, Request, Response } from 'express';
import User from '../../models/user';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/', async (req: Request, res: Response) => {
    const users = await User.query();
    return res.json({ users: users });
  });

  route.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.query().findById(userId);
    return res.json({ user: user });
  });

  route.post('/:username', async (req: Request, res: Response) => {
    const newUser = await User.query().insert(
      { username: 'jqbaby' }
    );
    return res.json({ status: 'created new user!', user: newUser });
  });
}
