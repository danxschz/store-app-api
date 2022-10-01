import { Request, Response, NextFunction } from 'express';
import Case from '../models/case';

// GET cases
const case_list = (req: Request, res: Response, next: NextFunction) => {
  Case.find()
    .exec((err, results) => {
      // Error in API usage
      if (err) return next(err);

      // Success
      res.send(results);
    })
}

// GET case
const case_detail = (req: Request, res: Response, next: NextFunction) => {
  Case.find({ id: req.params.id })
    .exec((err, result) => {
      // Error in API usage
      if (err) return next(err);

      // No results
      if (result == null) {
        const err = new Error('Case not found');
        return next(err);
      }

      // Success
      res.send(result);
    })
}

export default case_list;
export { case_detail };
