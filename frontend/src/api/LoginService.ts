import { api } from './api';
import BaseService from './BaseService';
import { AuthService } from '../services';

class LoginService extends BaseService {
  getRouteUrl = (): string => {
    // login é exceção, pois nao possui os 5 endpoints de CRUD
    throw Error('getRouteUrl is not implemented in LoginService class.');
  };

  login = async (data: Object) => {
    const response = await api.post('login', { ...data });

    if (!response || !response.data || !response.data.data) {
      this.handleBadlyFormattedResponse();
    }

    const { username, token } = response.data.data;
    return { username, token };
  };

  profile = async () => {
    try {
      const token = AuthService.getToken();
      const response = await api.get('profile', { headers: { 'x-access-token': token } });

      if (!response || !response.data) {
        this.handleBadlyFormattedResponse();
      }

      const profile = response.data.data;
      return profile;
    } catch (error) {
      this.handleRequestError(error);
    }
  };
}

export default new LoginService();
