import { Response, Request } from 'express';
import { UserModel } from '../models';
import { ApiResponse, Validators, AuthHelper } from '../helpers';

const create = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userToCreate = { username, password: AuthHelper.hashPassword(password) };
    Validators.validateUser(userToCreate as any); // gambiarra

    const user = new UserModel(userToCreate);
    await user.save();

    return ApiResponse.success(res, 'Usuário adicionado com sucesso', user);
  } catch (err) {
    if (err.validationError) {
      return ApiResponse.validationError(res, err.validationError, req.body);
    }
    return ApiResponse.internalError(res, 'Falha ao criar usuário: Exception catched', err);
  }
};

const list = async (req: Request, res: Response) => {
  try {
    const filter = { active: true };
    const fields = {};
    const users = await UserModel.find(filter, fields);

    if (!users.length) {
      return ApiResponse.notFound(res, 'Nenhum usuário encontrado');
    }

    return ApiResponse.success(res, 'Lista de usuários retornada com sucesso', users);
  } catch (err) {
    return ApiResponse.internalError(
      res,
      'Falha ao buscar lista de usuários: Exception catched',
      err
    );
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!Validators.isValidObjectId(_id)) {
      return ApiResponse.validationError(res, 'Id informado na query não é válido', { _id });
    }

    const filter = { _id };
    const fields = {};
    const user = await UserModel.findOne(filter, fields);

    if (!user) {
      return ApiResponse.notFound(res, 'Usuário não encontrado pelo id', { _id });
    }

    return ApiResponse.success(res, 'Usuário retornado com sucesso', user);
  } catch (err) {
    return ApiResponse.internalError(res, 'Falha ao buscar usuário: Exception catched', err);
  }
};

const updateById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!Validators.isValidObjectId(_id)) {
      return ApiResponse.validationError(res, 'Id informado na query não é válido', { _id });
    }

    const { username, password } = req.body;
    const newUserData = { username, password: AuthHelper.hashPassword(password) };
    Validators.validateUser(newUserData as any); // gambiarra

    const filter = { _id };
    const fields = {};

    const user = await UserModel.findOne(filter, fields);

    if (!user) {
      return ApiResponse.notFound(res, 'Usuário não encontrado pelo id', { _id });
    }

    user.username = newUserData.username;
    user.password = newUserData.password;

    await user.save();

    return ApiResponse.success(res, 'Usuário editado com sucesso', user);
  } catch (err) {
    if (err.validationError) {
      return ApiResponse.validationError(res, err.validationError, req.body);
    }
    return ApiResponse.internalError(res, 'Falha ao editar usuário: Exception catched', err);
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    if (!Validators.isValidObjectId(_id)) {
      return ApiResponse.validationError(res, 'Id informado na query não é válido', { _id });
    }

    const filter = { _id };
    const fields = {};

    const user = await UserModel.findOne(filter, fields);

    if (!user) {
      return ApiResponse.notFound(res, 'Usuário não encontrado pelo id', { _id });
    }

    user.active = false;

    await user.save();

    return ApiResponse.success(res, 'Usuário excluido com sucesso', user);
  } catch (err) {
    return ApiResponse.internalError(res, 'Falha ao excluir usuário: Exception catched', err);
  }
};

export default {
  create,
  list,
  getById,
  updateById,
  deleteById,
};
