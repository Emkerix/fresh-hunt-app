import { Request, Response, Router } from 'express';
import { dataSource } from '../../config/app-data-source';
import Olx from '../../entities/Olx';

const olxRouter = Router();

/* OLX */
/**
 * @swagger
 * tags:
 *   name: Olx
 *   description: API endpoints related to olx offers
 */

/**
 * @swagger
 * /api/olx-offers:
 *   get:
 *     summary: Get all olx offers
 *     tags: [Olx]
 *     description: Returns all olx offers
 *     responses:
 *       200:
 *         description: A list of olx offers
 *       500:
 *         description: Internal server error
 */
olxRouter.get('/', async (req: Request, res: Response) => {
  try {
    const data = await dataSource.getRepository(Olx).find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from the OLX table' });
  }
});

/**
 * @swagger
 * /api/olx-offers:
 *   post:
 *     tags: [Olx]
 *     summary: Create a new OLX offer
 *     description: Creates a new OLX offer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 uniqueItems: true
 *                 maxLength: 25
 *               title:
 *                 type: string
 *                 maxLength: 75
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               date:
 *                 type: string
 *                 format: date
 *               thumbnailUrl:
 *                 type: string
 *               disable:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: OLX offer created successfully
 *       409:
 *         description: Conflict - productId already exists
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: An error occurred while creating the OLX offer
 */
olxRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {
      productId,
      title,
      price,
      date,
      thumbnailUrl,
      disable
    }: {
      productId: string;
      title: string;
      price: number;
      date: Date;
      thumbnailUrl: string;
      disable: boolean;
    } = req.body;
    const data = dataSource.getRepository(Olx);

    if (
      [productId, title, date, thumbnailUrl].some((field) => !field || (typeof field === 'string' && !field.trim()))
    ) {
      return res.status(422).json({ error: 'Fields cannot be empty' });
    }

    const existingOffer = await data.findOne({ where: { productId } });
    if (existingOffer) {
      return res.status(409).json({ error: 'ProductId already exists' });
    }

    if (productId.length > 25) {
      return res.status(422).json({ error: 'ProductId length must be less than or equal to 25' });
    }

    if (title.length > 75) {
      return res.status(422).json({ error: 'Title length must be less than or equal to 75' });
    }

    if (isNaN(price) || price < 0.01) {
      return res.status(422).json({ error: 'Price must be greater than or equal to 0.01' });
    }

    if (disable !== undefined && typeof disable !== 'boolean') {
      return res.status(422).json({ error: 'Disable must be a boolean value' });
    }

    const newOlxOffer = data.create({ productId, title, price, date, thumbnailUrl, disable });

    await data.save(newOlxOffer);
    res.status(201).json({ message: 'OLX offer created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the OLX offer' });
  }
});

/**
 * @swagger
 * /api/olx-offers/{id}:
 *   put:
 *     tags: [Olx]
 *     summary: Update a OLX offer by ID
 *     description: Updates a OLX offer with the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the olx offer to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 uniqueItems: true
 *                 maxLength: 25
 *               title:
 *                 type: string
 *                 maxLength: 75
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               date:
 *                 type: string
 *                 format: date
 *               thumbnailUrl:
 *                 type: string
 *               disable:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Olx offer updated successfully
 *       404:
 *         description: Not found - olx offer not found
 *       409:
 *         description: Conflict - productId already exists
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: An error occurred while updating the OLX offer
 */
olxRouter.put('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  try {
    const data = dataSource.getRepository(Olx);
    const olxOffer = await data.findOne({ where: { id } });
    if (!olxOffer) {
      return res.status(404).json({ error: 'Not found - olx offer not found' });
    }
    const {
      productId,
      title,
      price,
      date,
      thumbnailUrl,
      disable
    }: {
      productId: string;
      title: string;
      price: number;
      date: Date;
      thumbnailUrl: string;
      disable: boolean;
    } = req.body;

    if (!productId || !title || !price || !date || !thumbnailUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (
      [productId, title, price, date, thumbnailUrl].some(
        (field) => !field || (typeof field === 'string' && !field.trim())
      )
    ) {
      return res.status(422).json({ error: 'Fields cannot be empty' });
    }

    const existingOffer = await data.findOne({ where: { productId } });
    if (existingOffer) {
      return res.status(409).json({ error: 'ProductId already exists' });
    }

    if (productId.length > 25) {
      return res.status(422).json({ error: 'ProductId length must be less than or equal to 25' });
    }

    if (title.length > 75) {
      return res.status(422).json({ error: 'Title length must be less than or equal to 75' });
    }

    if (isNaN(price) || price < 0.01) {
      return res.status(422).json({ error: 'Price must be greater than or equal to 0.01' });
    }

    if (disable !== undefined && typeof disable !== 'boolean') {
      return res.status(422).json({ error: 'Disable must be a boolean value' });
    }

    Object.assign(olxOffer, { productId, title, price, date, thumbnailUrl, disable });

    await data.save(olxOffer);
    res.status(200).json({ message: 'OLX offer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the OLX offer' });
  }
});

/**
 * @swagger
 * /api/olx-offers/{id}:
 *   delete:
 *     tags: [Olx]
 *     summary: Delete a olx offer by ID
 *     description: Deletes a olx offer with the specified ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the olx offer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Olx offer deleted successfully
 *       404:
 *         description: Not found - olx offer not found
 *       500:
 *         description: Internal server error
 */
olxRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const data = dataSource.getRepository(Olx);
    const olxOffer = await data.findOne({ where: { id } });
    if (!olxOffer) {
      return res.status(404).json({ error: 'Not found - olx offer not found' });
    }
    await data.remove(olxOffer);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the OLX offer' });
  }
});

export default olxRouter;
