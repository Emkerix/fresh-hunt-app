import { Router } from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import olxRouter from './olx';
import specs from '../config/swagger';

const routers = Router();
routers.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
routers.use('/olx-offers', olxRouter);

export default routers;
