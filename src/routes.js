import { Router } from 'express';
import CowController from './controllers/CowController';
import WeighingController from './controllers/WeighingController';

const routes = new Router();
routes.get('/cow/', CowController.index);
routes.get('/cow/:id', CowController.show);
routes.post('/cow/', CowController.create);
routes.delete('/cow/:id', CowController.destroy);

routes.get('/weighing/', WeighingController.index);
routes.get('/weighing/widget', WeighingController.showWidget);
routes.get('/weighing/media', CowController.showMedia);
routes.post('/weighing/', WeighingController.create);
routes.put('/weighing/:id', WeighingController.update);
routes.delete('/weighing/:id', WeighingController.destroy);

export default routes;