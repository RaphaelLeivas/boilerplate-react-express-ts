import express from 'express';
import { ClientsController, UsersController, AuthController, BaseController } from './controllers';
import { AuthMiddleware } from './middlewares';

const routes = express.Router();

const createCRUDRoutes = (routeName: string, Controller: BaseController) => {
  routes.get(`/${routeName}`, AuthMiddleware.verifyToken, Controller.list);
  routes.get(`/${routeName}/:_id`, AuthMiddleware.verifyToken, Controller.getById);
  routes.post(`/${routeName}`, AuthMiddleware.verifyToken, Controller.create);
  routes.put(`/${routeName}/:_id`, AuthMiddleware.verifyToken, Controller.updateById);
  routes.delete(`/${routeName}/:_id`, AuthMiddleware.verifyToken, Controller.deleteById);
}

// login routes
routes.post('/login', AuthController.login);
routes.get('/profile', AuthMiddleware.verifyToken, AuthController.profile);

createCRUDRoutes('users', UsersController);
createCRUDRoutes('clients', ClientsController);

export default routes;
