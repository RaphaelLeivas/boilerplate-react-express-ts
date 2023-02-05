import BaseService from './BaseService';

class EquipmentsService extends BaseService {
  getRouteUrl = () => '/equipments';
}

export default new EquipmentsService();
