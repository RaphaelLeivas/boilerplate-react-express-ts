import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const COLLECTION_NAME = 'users';
const UserModel = mongoose.model('User', UserSchema, COLLECTION_NAME);

export const UserSchemaObject = UserModel.schema.obj;
export default UserModel;
