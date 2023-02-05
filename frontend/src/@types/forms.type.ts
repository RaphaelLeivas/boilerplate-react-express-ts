export interface IClientFormData {
  name: string;
  email: string;
  cpf: string;
  address: string;
  phone: string;
}

export interface IEquipmentFormData {
  serialNumber: string;
  equipmentTypeId: string;
  manufacturedAt: string;
}

export const INITIAL_CLIENT_FORM_DATA: IClientFormData = {
  name: '',
  email: '',
  cpf: '',
  address: '',
  phone: '',
};

export const INITIAL_EQUIPMENT_FORM_DATA: IEquipmentFormData = {
  serialNumber: '',
  manufacturedAt: '',
  equipmentTypeId: '',
};
