import { Request, Response, NextFunction } from 'express';
import Case from '../models/case';

// GET cases
const get_cases = (req: Request, res: Response, next: NextFunction) => {
  Case.find()
    .exec((err, case_list) => {
      if (err) return next(err);

      // On success
      res.send(case_list);
    })
}

export default get_cases;
