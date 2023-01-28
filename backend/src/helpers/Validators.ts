import mongoose from 'mongoose';
import { ClientSchemaObject, UserSchemaObject } from '../models';

const isValidObjectId = (id: string): boolean => mongoose.isValidObjectId(id);

const validateClient = (client: typeof ClientSchemaObject) => {
  if (!client.name || typeof client.name !== 'string') {
    throw { validationError: 'Nome válido deve ser informado' };
  }

  if (!client.email || typeof client.email !== 'string') {
    throw { validationError: 'Email válido deve ser informado' };
  }

  if (!client.cpf || typeof client.cpf !== 'string') {
    throw { validationError: 'CPF válido deve ser informado' };
  }

  if (!client.phone || typeof client.phone !== 'string') {
    throw { validationError: 'Telefone válido deve ser informado' };
  }

  if (!client.address || typeof client.address !== 'string') {
    throw { validationError: 'Endereço válido deve ser informado' };
  }
};

const validateUser = (user: typeof UserSchemaObject) => {
  if (!user.username || typeof user.username !== 'string') {
    throw { validationError: 'Nome de usuário válido deve ser informado' };
  }

  if (!user.password || typeof user.password !== 'string') {
    throw { validationError: 'Senha válida deve ser informada' };
  }
};

export default {
  isValidObjectId,
  validateClient,
  validateUser,
};
