import express from 'express';
import * as flagsControllers from '../controllers/flags-api-controllers';

const router = express.Router();

router.get('/flags', flagsControllers.getAllFlags);
router.get('/flags/:id', flagsControllers.getFlagById);
router.post('/flags', flagsControllers.createFlag);
router.delete('/flags/:id', flagsControllers.deleteFlag);
router.put('/flags/:id', flagsControllers.updateFlag);


// SSE API related routes
router.get('/ff-updates-stream', flagsControllers.sseNotifications);

module.exports = router;