import { Request, Response, Router } from 'express';
import { dataSource } from '../../config/app-data-source';
import Olx from '../../entities/Olx';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getRepository(Olx).find()
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from the OLX table' });
  }
});

export default router;