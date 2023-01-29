import { AuthService } from '../services';
import { api } from './api'

abstract class BaseService {
  getRouteUrl = (): string => {
    throw Error('getRouteUrl is not implemented in base class. Must be overriden in derived classes.');
  };

  handleRequestError = (error: any) => {
    if (error?.response?.data?.data?.name === 'TokenExpiredError') {
      alert('Login expirado!');
      AuthService.logout();
      window.location.href = '/';
    } else {
      // se não é erro de token expirado, joga o erro para a prox camada
      console.log(error);
      throw error
    }
  }

  handleBadlyFormattedResponse = () => {
    throw new Error('Reposta da API mal formatada!');
  }

  create = async (data: Object) => {
    try {
      const token = AuthService.getToken();
      await api.post(this.getRouteUrl(), { ...data }, { headers: { 'x-access-token': token } });
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  list = async () => {
    try {
      const token = AuthService.getToken();
      const response = await api.get(this.getRouteUrl(), { headers: { 'x-access-token': token } });

      if (!response || !response.data || !Array.isArray(response.data.data)) {
        this.handleBadlyFormattedResponse();
      }

      return response.data.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  getById = async (_id: string) => {
    try {
      const token = AuthService.getToken();
      const response = await api.get(`${this.getRouteUrl()}/${_id}`, { headers: { 'x-access-token': token } });

      if (!response || !response.data || !response.data.data) {
        this.handleBadlyFormattedResponse();
      }

      return response.data.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  updateById = async (_id: string, data: Object) => {
    try {
      const token = AuthService.getToken();
      const response = await api.put(`${this.getRouteUrl()}/${_id}`, { ...data }, { headers: { 'x-access-token': token } });

      if (!response || !response.data || !response.data.data) {
        this.handleBadlyFormattedResponse();
      }

      return response.data.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  deleteById = async (_id: string) => {
    try {
      const token = AuthService.getToken();
      await api.delete(`${this.getRouteUrl()}/${_id}`, { headers: { 'x-access-token': token } });
    } catch (error) {
      this.handleRequestError(error);
    }
  }
}

export default BaseService;
