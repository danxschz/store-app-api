import express from 'express';
const router = express.Router();

import collection_list, { collection_detail } from '../controllers/collection';

// GET collections
router.get('/', collection_list);

// GET collection
router.get('/:id', collection_detail);

export default router;
