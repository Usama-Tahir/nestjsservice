import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  Name: String,
  Versions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Version'}]
})