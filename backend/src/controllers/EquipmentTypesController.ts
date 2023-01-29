import { EquipmentTypeModel, EquipmentTypeSchemaObject } from '../models';
import { Validators } from '../helpers';
import BaseController from './BaseController';

class EquipmentTypesController extends BaseController {
  constructor() {
    super();

    this.bodyFields = EquipmentTypeSchemaObject;
    this.validatorFunction = Validators.validateEquipmentType;
    this.Model = EquipmentTypeModel;
    this.modelName = 'tipo de equipamento';
  }
}

export default new EquipmentTypesController();
