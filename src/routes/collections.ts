import express from 'express';

const router = express.Router();

// GET collections
router.get('/', function (req, res, next) {
  res.send('WIP');
});

// GET collection
router.get('/:id', function (req, res, next) {
  res.send('WIP ID');
});

export default router;
