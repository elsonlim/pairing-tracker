import { Schema, Model, model } from "mongoose";
import { IPairMatrixDoc } from "../interfaces/IPairMatrix";

const pairSchema: Schema = new Schema({
  id: String,
  count: Number,
  members: [String],
});

const pairMatrixSchema: Schema = new Schema({
  members: { type: [String], required: true },
  pairs: {
    type: [pairSchema],
  },
});

export const PairMatrix: Model<IPairMatrixDoc> = model<IPairMatrixDoc>(
  "PairMatrix",
  pairMatrixSchema,
);
