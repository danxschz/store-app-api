import express from 'express';
import { getLogger } from '@/utils/loggers';
const router = express.Router();
const logger = getLogger('INDEX_ROUTE');

// GET index
router.get('/', function (req, res, next) {
  logger.info('The Rage Lab API Index');
  res.send(
    'Welcome to The Rage Lab API. Current available resources are: \n/cases \n/collections \n/accesories' 
  );
});

export default router;
