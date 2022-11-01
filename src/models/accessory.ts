import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccessorySchema = new Schema({
  id: { type: String, required: true, maxLength: 10 },
  name: { type: String, required: true, maxLength: 50 },
  price: { type: Number, required: true },
  img: { type: String, required: true, maxLength: 100 },
  collection_obj: { type: Schema.Types.ObjectId, ref: 'Collection' }
});

const model = mongoose.model('Accessory', AccessorySchema);

export default model;
