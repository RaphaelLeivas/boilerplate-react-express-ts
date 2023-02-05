import mongoose, { Schema } from 'mongoose';

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const COLLECTION_NAME = 'clients';
const ClientModel = mongoose.model('Client', ClientSchema, COLLECTION_NAME);

export const ClientSchemaObject = ClientModel.schema.obj;
export default ClientModel;
