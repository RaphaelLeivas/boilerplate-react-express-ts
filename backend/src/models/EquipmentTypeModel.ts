import mongoose, { Schema } from 'mongoose';

const EquipmentTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false },
  },
  { timestamps: true }
);


const COLLECTION_NAME = 'equipmentTypes';
const EquipmentTypeModel = mongoose.model('EquipmentType', EquipmentTypeSchema, COLLECTION_NAME);

export const EquipmentTypeSchemaObject = EquipmentTypeModel.schema.obj;
export default EquipmentTypeModel;
