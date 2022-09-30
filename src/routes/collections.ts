import express from 'express';
import collections from '../models/collections';

const router = express.Router();

// GET collections
router.get('/', function (req, res, next) {
  res.send(collections);
});

// GET collection
router.get('/:id', function (req, res, next) {
  res.send(collections[req.params.id as keyof object]);
});

export default router;
