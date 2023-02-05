import mongoose, { Schema } from 'mongoose';

const EquipmentSchema = new Schema(
  {
    serialNumber: { type: String, required: true },
    manufacturedAt: { type: Date, required: true },
    equipmentTypeId: { type: Schema.Types.ObjectId, required: true },
    clientId: { type: Schema.Types.ObjectId, required: false },
    active: { type: Boolean, default: true },
    status: { type: Number, enum: [0, 1, 2], required: true, default: 1 },
  },
  { timestamps: true }
);

export enum EQUIPMENT_STATUS {
  INACTIVE = 0,
  ACTIVE = 1,
  OUT_OF_SERVICE = 2,
}

const COLLECTION_NAME = 'equipments';
const EquipmentModel = mongoose.model('Equipment', EquipmentSchema, COLLECTION_NAME);

export const EquipmentSchemaObject = EquipmentModel.schema.obj;
export default EquipmentModel;
