import mongoose from 'mongoose';
import { EquipmentModel, EquipmentSchemaObject } from '../models';
import { Validators } from '../helpers';
import BaseController from './BaseController';
const ObjectId = mongoose.Types.ObjectId;

class EquipmentsController extends BaseController {
  constructor() {
    super();

    this.bodyFields = EquipmentSchemaObject;
    this.validatorFunction = Validators.validateEquipment;
    this.Model = EquipmentModel;
    this.modelName = 'equipamento';
  }

  getListQuery = async () => {
    const models = await this.getModel().aggregate([
      {
        $lookup: {
          from: 'equipmentTypes',
          localField: 'equipmentTypeId',
          foreignField: '_id',
          as: 'equipmentType',
        }
      },
      {
        $unwind: {
          path: '$equipmentType',
          preserveNullAndEmptyArrays: true // retorna aqueles que nao possuem um equipmentType associado
        }
      }
    ])

    return models;
  }

  getQuery = async (_id: string) => {
    const models = await this.getModel().aggregate([
      {
        $match: {
          _id: new ObjectId(_id)
        }
      },
      {
        $lookup: {
          from: 'equipmentTypes',
          localField: 'equipmentTypeId',
          foreignField: '_id',
          as: 'equipmentType',
        }
      },
      {
        $unwind: {
          path: '$equipmentType',
          preserveNullAndEmptyArrays: true // retorna aqueles que nao possuem um equipmentType associado
        }
      }
    ])

    return models;
  }
}

export default new EquipmentsController();
