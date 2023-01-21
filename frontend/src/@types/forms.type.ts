export interface IFormData {
  name: string;
  email: string;
  cpf: string;
  address: string;
  phone: string;
}

export const INITIAL_FORM_DATA: IFormData = {
  name: '',
  email: '',
  cpf: '',
  address: '',
  phone: '',
};
