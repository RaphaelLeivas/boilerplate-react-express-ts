import BaseService from './BaseService';

class ClientsService extends BaseService {
  getRouteUrl = () => '/clients';
}

export default new ClientsService();
