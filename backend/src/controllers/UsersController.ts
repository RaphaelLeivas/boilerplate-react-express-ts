import { UserModel, UserSchemaObject } from '../models';
import { Validators, AuthHelper } from '../helpers';
import BaseController from './BaseController';

class UsersController extends BaseController {
  constructor() {
    super();

    this.bodyFields = UserSchemaObject;
    this.validatorFunction = Validators.validateUser;
    this.Model = UserModel;
    this.modelName = 'usuário';
  }

  doBeforeSave = async (data: typeof UserSchemaObject) => {
    data.password = AuthHelper.hashPassword(data.password as string);
  };

  getUpdateKeysToSkip = (): string[] => ['password'];
}

export default new UsersController();
