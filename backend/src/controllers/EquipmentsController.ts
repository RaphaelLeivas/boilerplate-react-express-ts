import mongoose from 'mongoose';
import { EquipmentModel, EquipmentSchemaObject, EQUIPMENT_STATUS } from '../models';
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
        $match: {
          active: true,
        },
      },
      {
        $lookup: {
          from: 'equipmentTypes',
          localField: 'equipmentTypeId',
          foreignField: '_id',
          as: 'equipmentType',
        },
      },
      {
        $unwind: {
          path: '$equipmentType',
          preserveNullAndEmptyArrays: true, // retorna aqueles que nao possuem um equipmentType associado
        },
      },
      {
        $addFields: {
          manufacturedAt: {
            $dateToString: { format: '%d/%m/%Y', date: '$manufacturedAt', timezone: '-03:00' },
          },
          equipmentTypeName: '$equipmentType.name',
          equipmentTypePrice: '$equipmentType.price',
          status: {
            $switch: {
              branches: [
                {
                  case: { $eq: ['$status', EQUIPMENT_STATUS.INACTIVE] },
                  then: 'Desativado',
                },
                {
                  case: { $eq: ['$status', EQUIPMENT_STATUS.ACTIVE] },
                  then: 'Ativado',
                },
                {
                  case: { $eq: ['$status', EQUIPMENT_STATUS.OUT_OF_SERVICE] },
                  then: 'Fora de Serviço',
                },
              ],
              default: 'Desativado',
            },
          },
        },
      },
    ]);

    return models;
  };

  getQuery = async (_id: string) => {
    const models = await this.getModel().aggregate([
      {
        $match: {
          _id: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: 'equipmentTypes',
          localField: 'equipmentTypeId',
          foreignField: '_id',
          as: 'equipmentType',
        },
      },
      {
        $unwind: {
          path: '$equipmentType',
          preserveNullAndEmptyArrays: true, // retorna aqueles que nao possuem um equipmentType associado
        },
      },
      {
        $addFields: {
          manufacturedAt: {
            $dateToString: { format: '%d/%m/%Y', date: '$manufacturedAt', timezone: '-03:00' },
          },
        },
      },
      { $limit: 1 },
    ]);

    return models[0];
  };
}

export default new EquipmentsController();
