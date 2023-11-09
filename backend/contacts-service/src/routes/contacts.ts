<<<<<<< HEAD
import {Router} from 'express';
import middlewareCommons from 'ms-commons/api/routes/middlewares';
import controler from '../controllers/contacts'


const router = Router();

router.get('/contacts/', middlewareCommons.validateAuth, controler.getContacts);
=======
import {Router} from 'express'
const router = Router();

>>>>>>> 34124b036803ebad884fa32a45029ea7148b33f4

export default router;