import { Router } from 'express';
import olxRouter from './olx';

const routers = Router();
routers.use('/olx-offers', olxRouter);

export default routers;
