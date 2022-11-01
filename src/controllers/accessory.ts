import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '@/types/global';
import Accessory from '../models/accessory';

// GET accessories
const accessory_list = (req: Request, res: Response, next: NextFunction) => {
  Accessory.find({}, '-_id -__v')
    .populate('collection_obj', '-_id -__v')
    .exec((err, results) => {
      // Error in API usage
      if (err) return next(err);

      // Success
      res.send(results);
    })
}

// GET accessory
const accessory_detail = (req: Request, res: Response, next: NextFunction) => {
  Accessory.findOne({ id: req.params.id }, '-_id -__v')
    .populate('collection_obj', '-_id -__v')
    .exec((err, result) => {
      // Error in API usage
      if (err) return next(err);

      // No results
      if (result == null) {
        const err = new Error('Case not found') as ErrorWithStatus;
        err.status = 404;
        return next(err);
      }

      // Success
      res.send(result);
    })
}

export default accessory_list;
export { accessory_detail };
