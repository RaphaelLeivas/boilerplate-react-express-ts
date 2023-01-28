import { ClientModel, ClientSchemaObject } from '../models';
import { Validators } from '../helpers';
import BaseController from './BaseController';

class ClientsController extends BaseController {
  constructor() {
    super();

    this.bodyFields = ClientSchemaObject;
    this.validatorFunction = Validators.validateClient;
    this.Model = ClientModel;
    this.modelName = 'cliente';
  }
}

export default new ClientsController();
