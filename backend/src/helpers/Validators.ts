import mongoose from 'mongoose';
import { 
  ClientSchemaObject, 
  UserSchemaObject, 
  EquipmentSchemaObject, 
  EquipmentTypeSchemaObject 
} from '../models';

const isValidObjectId = (id: string): boolean => mongoose.isValidObjectId(id);

export const isValidDate = (dateObject: Date) => dateObject instanceof Date && !isNaN(dateObject.valueOf());

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

const validateUser = (user: typeof UserSchemaObject, isEditing = false) => {
  if (!user.username || typeof user.username !== 'string') {
    throw { validationError: 'Nome de usuário válido deve ser informado' };
  }

  if (!isEditing && (!user.password || typeof user.password !== 'string')) {
    throw { validationError: 'Senha válida deve ser informada' };
  }
};

const validateEquipment = (equipment: typeof EquipmentSchemaObject) => {
  if (!equipment.serialNumber || typeof equipment.serialNumber !== 'string') {
    throw { validationError: 'Número de série válido deve ser informado' };
  }

  if (!equipment.manufacteredAt || isNaN(equipment.manufacteredAt as number)) {
    throw { validationError: 'Data de fabricação válida deve ser informada - formato de milisegundos' };
  }

  if (isNaN(equipment.status as number)) {
    throw { validationError: 'Status do equipamento deve ser informado' };
  }

  if (!equipment.equipmentTypeId || !isValidObjectId(equipment.equipmentTypeId as string)) {
    throw { validationError: 'Id do tipo do equipamento válido deve ser informado' };
  }
}

const validateEquipmentType = (equipmentType: typeof EquipmentTypeSchemaObject) => {
  if (!equipmentType.name || typeof equipmentType.name !== 'string') {
    throw { validationError: 'Nome válido deve ser informado' };
  }

  if (!equipmentType.description || typeof equipmentType.description !== 'string') {
    throw { validationError: 'Descrição válida deve ser informada' };
  }

  if (isNaN(equipmentType.price as number)) {
    throw { validationError: 'Preço válido deve ser informado' };
  }
}

export default {
  isValidObjectId,
  validateClient,
  validateUser,
  validateEquipment,
  validateEquipmentType,
};
