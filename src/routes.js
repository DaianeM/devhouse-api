import { Router } from 'express';
import multer from 'multer';
import configUpload from './config/upload';

import HouseController from './controllers/HouseController';
import SessionController from './controllers/SessionController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(configUpload);

routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put(
  '/houses/:house_id',
  upload.single('thumbnail'),
  HouseController.update
);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);

export default routes;
