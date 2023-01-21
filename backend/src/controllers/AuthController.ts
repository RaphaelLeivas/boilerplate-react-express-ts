import { Response, Request } from 'express';
import { UserModel } from '../models';
import { ApiResponse, Validators, AuthHelper } from '../helpers';

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    Validators.validateUser({ username, password });

    const filter = { username, active: true };
    const fields = {};
    const user = await UserModel.findOne(filter, fields);

    if (!user) {
      return ApiResponse.notFound(res, 'Usuário não encontrado', { username, password });
    }

    // verifica a senha
    if (!AuthHelper.comparePassword(password, user.password)) {
      return ApiResponse.unauthorized(res, 'Senha incorreta', { username, password });
    }

    // se chegou aqui, gera o token e retorna os dados do usuario
    const authenticatedUserData = {
      username: user.username,
      token: AuthHelper.generateToken(user._id.toString(), user.username),
    };

    return ApiResponse.success(res, 'Usuário logado com sucesso', authenticatedUserData);
  } catch (err) {
    if (err.validationError) {
      return ApiResponse.validationError(res, err.validationError, req.body);
    }
    return ApiResponse.internalError(res, 'Falha ao logar usuário: Exception catched', err);
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;

    const filter = { _id };
    const fields = {};
    const user = await UserModel.findOne(filter, fields);

    if (!user) {
      return ApiResponse.notFound(res, 'Perfil não encontrado', { _id });
    }

    return ApiResponse.success(res, 'Perfil retornado com sucesso', user);
  } catch (err) {
    if (err.validationError) {
      return ApiResponse.validationError(res, err.validationError, req.body);
    }
    return ApiResponse.internalError(res, 'Falha ao buscr dados do perfil: Exception catched', err);
  }
};

export default {
  login,
  profile,
};
