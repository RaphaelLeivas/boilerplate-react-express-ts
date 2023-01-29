import { Response, Request } from 'express';
import { ApiResponse, Validators } from '../helpers';
import { Model, SchemaType } from 'mongoose';
import { capitalizeFirstLetter } from '../utils';

abstract class BaseController {
  protected bodyFields: { [key: string]: any };
  protected validatorFunction: (
    modelToCreate: { [key: string]: SchemaType<any> },
    isEditing?: boolean
  ) => void;
  protected Model: Model<any> | null;

  protected modelName: string // usado para a resposta da API

  constructor() {
    this.bodyFields = {};
    this.validatorFunction = () => undefined;
    this.Model = null;

    this.modelName = ''
  }

  getUpperCaseSingular = (): string => capitalizeFirstLetter(this.modelName)
  getLowerCaseSingular = (): string => this.modelName
  getUpperCasePlural = (): string => capitalizeFirstLetter(this.modelName) + 's'
  getLowerCasePlural = (): string => this.modelName + 's'

  getModel = () => {
    if (this.Model === null) {
      throw new Error('this.Model is null. Must be overriden in derived classes.')
    }
    
    return this.Model
  }

  doBeforeSave = async (data: { [key: string]: SchemaType<any> }) => {

  }

  doBeforeEdit = async (data: { [key: string]: SchemaType<any> }) => {

  }

  getListQuery = async () => {
    const filter = { active: true };
    const fields = {};
    const models = await this.getModel().find(filter, fields);

    return models;
  }

  getQuery = async (_id: string) => {
    const filter = { _id };
    const fields = {};
    const model = await this.getModel().findOne(filter, fields);

    return model;
  }

  doAfterGet = async (data: { [key: string]: SchemaType<any> }) => { }
  doAfterGetList = async (data: any[]) => { }

  getUpdateKeysToSkip = (): string[] => [];

  doCustomGetQuery = (): Object => ({ })
  doCustomListQuery = (): any[] => []

  create = async (req: Request, res: Response) => {
    try {
      const modelToCreate: { [key: string]: any } = {};
      for (const key in req.body) {
        if (key in this.bodyFields) {
          modelToCreate[key] = req.body[key];
        }
      }
      this.validatorFunction(modelToCreate);

      await this.doBeforeSave(modelToCreate);

      const model = new (this.getModel())(modelToCreate);
      await model.save();

      return ApiResponse.success(res, `${this.getUpperCaseSingular()} adicionado com sucesso`, model);
    } catch (err) {
      console.error(err);
      if (err.validationError) {
        return ApiResponse.validationError(res, err.validationError, req.body);
      }
      return ApiResponse.internalError(res, `Falha ao criar ${this.getLowerCaseSingular()}: Exception catched`, err);
    }
  };


  list = async (req: Request, res: Response) => {
    try {
      const models = await this.getListQuery();

      if (!models.length) {
        return ApiResponse.notFound(res, `Nenhum ${this.getLowerCaseSingular()} encontrado`);
      }

      await this.doAfterGetList(models);

      return ApiResponse.success(res, `Lista de ${this.getLowerCasePlural()} retornada com sucesso`, models);
    } catch (err) {
      console.error(err);
      return ApiResponse.internalError(
        res,
        `Falha ao buscar lista de ${this.getLowerCasePlural()}: Exception catched`,
        err
      );
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      if (!Validators.isValidObjectId(_id)) {
        return ApiResponse.validationError(res, 'Id informado na query não é válido', { _id });
      }

      const model = await this.getQuery(_id);

      if (!model) {
        return ApiResponse.notFound(res, `${this.getUpperCaseSingular()} não encontrado pelo id`, { _id });
      }

      await this.doAfterGet(model);

      return ApiResponse.success(res, `${this.getUpperCaseSingular()} retornado com sucesso`, model);
    } catch (err) {
      console.error(err);
      return ApiResponse.internalError(res, `Falha ao buscar ${this.getLowerCaseSingular()}: Exception catched`, err);
    }
  };

  updateById = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      if (!Validators.isValidObjectId(_id)) {
        return ApiResponse.validationError(res, 'Id informado na query não é válido', { _id });
      }

      const modelToUpdate: { [key: string]: any } = {};
      for (const key in req.body) {
        if (key in this.bodyFields) {
          modelToUpdate[key] = req.body[key];
        }
      }
      this.validatorFunction(modelToUpdate, true);

      await this.doBeforeEdit(modelToUpdate);

      const filter = { _id };
      const fields = {};

      const model = await this.getModel().findOne(filter, fields);

      if (!model) {
        return ApiResponse.notFound(res, `${this.getUpperCaseSingular()} não encontrado pelo id`, { _id });
      }

      const keysToSkip = this.getUpdateKeysToSkip();

      for (const key in modelToUpdate) {
        if (key in this.bodyFields && !keysToSkip.includes(key)) {
          model[key] = modelToUpdate[key];
        }
      }

      await model.save();

      return ApiResponse.success(res, `${this.getUpperCaseSingular()} editado com sucesso`, model);
    } catch (err) {
      console.error(err);
      if (err.validationError) {
        return ApiResponse.validationError(res, err.validationError, req.body);
      }
      return ApiResponse.internalError(res, `Falha ao editar ${this.getLowerCaseSingular()}: Exception catched`, err);
    }
  };

  deleteById = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      if (!Validators.isValidObjectId(_id)) {
        return ApiResponse.validationError(res, 'Id informado na query não é válido', { _id });
      }

      const filter = { _id };
      const fields = {};

      const model = await this.getModel().findOne(filter, fields);

      if (!model) {
        return ApiResponse.notFound(res, `${this.getUpperCaseSingular()} não encontrado pelo id`, { _id });
      }

      model.active = false;

      await model.save();

      return ApiResponse.success(res, `${this.getUpperCaseSingular()} excluido com sucesso`, model);
    } catch (err) {
      console.error(err);
      return ApiResponse.internalError(res, `Falha ao excluir ${this.getLowerCaseSingular()}: Exception catched`, err);
    }
  };
}

export default BaseController;
