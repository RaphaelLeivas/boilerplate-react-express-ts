import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { UserModel } from '../models';
import { ApiResponse } from '../helpers';
import { TokenInterface } from '../@types';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token'];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT secret is undefined!');
    }

    if (!token || typeof token !== 'string') {
      return ApiResponse.unauthorized(res, 'Token não encontrado!');
    }

    const { _id, username } = jwt.verify(token, jwtSecret) as TokenInterface;

    const user = await UserModel.findOne({ _id });
    if (!user) {
      return ApiResponse.unauthorized(res, 'Token inválido!');
    }

    req.user = {
      _id,
      username,
    };

    next();
  } catch (error) {
    if (error && error.name === 'TokenExpiredError') {
      return ApiResponse.unauthorized(res, 'Token de autorização expirado.', error);
    }

    return ApiResponse.internalError(
      res,
      'Falha no middleware de autorização (verifyToken): Exception catched',
      error
    );
  }
};

export default {
  verifyToken,
};
