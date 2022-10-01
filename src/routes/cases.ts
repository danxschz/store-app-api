import express from 'express';
const router = express.Router();

import get_cases from '../controllers/case';

// GET cases
router.get('/', get_cases);

// GET case
router.get('/:id', function (req, res, next) {
  res.send('WIP');
});

export default router;
