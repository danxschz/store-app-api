import { Request, Response, NextFunction } from 'express';
import { ErrorWithStatus } from '@/types/global';
import Collection from '../models/collection';
import Case from '../models/case';
import Accessory from '../models/accessory';

// GET collections
const collection_list = (req: Request, res: Response, next: NextFunction) => {
  Collection.find({}, '-_id -__v')
    .exec((err, results) => {
      // Error in API usage
      if (err) return next(err);

      // Success
      res.send(results);
    })
}

interface CollectionDetail {
  _id: string,
  id: string,
  name: string,
  slug: string,
  img: string,
  cases: {}[],
  accessories: {}[],
}

// GET collection
const collection_detail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await Collection.findOne({ id: req.params.id }, '-__v').exec();

    // No results
    if (collection == null) {
      const err = new Error('Collection not found') as ErrorWithStatus;
      err.status = 404;
      return next(err);
    }

    const cases = await Case.find({ collection_obj: collection._id }, '-_id -__v -collection_obj').exec();
    const accessories = await Accessory.find({ collection_obj: collection._id }, '-_id -__v -collection_obj').exec();
  
    // Convert to object to add property
    const resultObj: CollectionDetail = collection.toObject();
    resultObj.cases = cases;
    resultObj.accessories = accessories;

    // Remove _id property from object
    const { _id, ...result } = resultObj;

    // Success
    res.send(result);

  } catch (err) {
    // Error in API usage
    return next(err);
  }
}

export default collection_list;
export { collection_detail };
