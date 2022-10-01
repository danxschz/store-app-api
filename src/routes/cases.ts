import express from 'express';
const router = express.Router();

import case_list, { case_detail } from '../controllers/case';

// GET cases
router.get('/', case_list);

// GET case
router.get('/:id', case_detail);

export default router;
