import {Router} from 'express';
import middlewareCommons from 'ms-commons/api/routes/middlewares';
import controler from '../controllers/contacts'


const router = Router();

router.get('/contacts/', middlewareCommons.validateAuth, controler.getContacts);

export default router;