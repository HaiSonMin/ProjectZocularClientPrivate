import mongoose from 'mongoose';

const isValidObjectId = (value: string) =>
  mongoose.Types.ObjectId.isValid(value);

export default isValidObjectId;
