import { Router } from 'express';
import addressRouter from './auth/router/address';
import authRouter from './auth/router/auth';
export default (): Router => {
  const app = Router();

app.use('/auth',authRouter);
app.use('/address',addressRouter);
  //TODO: add routes here...

  return app;
};
