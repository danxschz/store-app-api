import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '@/types/global';
import Collection from '../models/collection';

// GET collections
const collection_list = (req: Request, res: Response, next: NextFunction) => {
  Collection.find()
    .exec((err, results) => {
      // Error in API usage
      if (err) return next(err);

      // Success
      res.send(results);
    })
}

// GET collection
const collection_detail = (req: Request, res: Response, next: NextFunction) => {
  Collection.findOne({ id: req.params.id })
    .exec((err, result) => {
      console.log(typeof result)
      // Error in API usage
      if (err) return next(err);

      // No results
      if (result == null) {
        const err = new Error('Collection not found') as ErrorWithStatus;
        err.status = 404;
        return next(err);
      }

      // Success
      res.send(result);
    })
}

export default collection_list;
export { collection_detail };
