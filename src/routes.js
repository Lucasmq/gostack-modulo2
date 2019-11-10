import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Para que não coloque em cada rota individualmente
// routes.use(authMiddleware);

routes.put('/users', authMiddleware, UserController.update);

routes.get('/providers', authMiddleware, ProviderController.index);
routes.get(
  '/providers/:providerId/available',
  authMiddleware,
  AvailableController.index
);

routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

routes.get('/schedule', authMiddleware, ScheduleController.index);

routes.get('/notifications', authMiddleware, NotificationController.index);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
