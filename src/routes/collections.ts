import express from 'express';
import collections from '../models/collections';

const router = express.Router();

// GET collections
router.get('/', function (_req, res, _next) {
  res.send(collections);
});

// GET collection
router.get('/:id', function (_req, res, _next) {
  res.send(collections[_req.params.id as keyof object]);
});

export default router;
