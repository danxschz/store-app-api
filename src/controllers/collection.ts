import { Request, Response, NextFunction } from 'express';
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
  Collection.find({ id: req.params.id })
    .exec((err, result) => {
      // Error in API usage
      if (err) return next(err);

      // No results
      if (result == null) {
        const err = new Error('Collection not found');
        return next(err);
      }

      // Success
      res.send(result);
    })
}

export default collection_list;
export { collection_detail };
