import { Router } from 'express';
import router from './olx';

const routers = Router();
routers.use('/olx-offers', router);

export default routers;
