import { Router } from 'express';
import user from './routes/user';
import upload from './routes/upload';

export default () => {
  const app = Router();
  user(app)
  upload(app)

  return app;
}
