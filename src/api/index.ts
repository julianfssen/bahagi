import { Router } from "express";
import user from "./routes/user";
import upload from "./routes/upload";
import receipts from "./routes/receipt";

export default () => {
  const app = Router();
  user(app);
  upload(app);
  receipts(app);

  return app;
};
