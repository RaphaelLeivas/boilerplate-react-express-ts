import express from 'express';
import { ClientsController, UsersController, AuthController } from './controllers';
import { AuthMiddleware } from './middlewares';

const routes = express.Router();

// login routes
routes.post('/login', AuthController.login);
routes.get('/profile', AuthMiddleware.verifyToken, AuthController.profile);

// user routes
routes.get('/users', AuthMiddleware.verifyToken, UsersController.list);
routes.get('/users/:_id', AuthMiddleware.verifyToken, UsersController.getById);
routes.post('/users', AuthMiddleware.verifyToken, UsersController.create);
routes.put('/users/:_id', AuthMiddleware.verifyToken, UsersController.updateById);
routes.delete('/users/:_id', AuthMiddleware.verifyToken, UsersController.deleteById);

// client routes
routes.get('/clients', AuthMiddleware.verifyToken, ClientsController.list);
routes.get('/clients/:_id', AuthMiddleware.verifyToken, ClientsController.getById);
routes.post('/clients', AuthMiddleware.verifyToken, ClientsController.create);
routes.put('/clients/:_id', AuthMiddleware.verifyToken, ClientsController.updateById);
routes.delete('/clients/:_id', AuthMiddleware.verifyToken, ClientsController.deleteById);


export default routes;
