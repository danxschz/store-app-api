import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  id: { type: String, required: true, maxLength: 10 },
  name: { type: String, required: true, maxLength: 50 },
  slug: { type: String, required: true, maxLength: 50 },
  img: { type: String, required: true, maxLength: 100 },
});

const model = mongoose.model('Collection', CollectionSchema);

export default model;
