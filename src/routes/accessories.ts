import express from 'express';
const router = express.Router();

import accessory_list, { accessory_detail } from '../controllers/accessory';

// GET accessories
router.get('/', accessory_list);

// GET accessory
router.get('/:id', accessory_detail);

export default router;
