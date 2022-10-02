import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '@/types/global';
import Case from '../models/case';

// GET cases
const case_list = (req: Request, res: Response, next: NextFunction) => {
  Case.find({}, '-_id -__v')
    .populate('collection_obj', '-_id -__v')
    .exec((err, results) => {
      // Error in API usage
      if (err) return next(err);

      // Success
      res.send(results);
    })
}

// GET case
const case_detail = (req: Request, res: Response, next: NextFunction) => {
  Case.findOne({ id: req.params.id }, '-_id -__v')
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

export default case_list;
export { case_detail };
