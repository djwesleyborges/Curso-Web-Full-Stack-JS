import { Router } from "express";
import accountsController from "../controllers/accounts";
import { validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth, validateAuthorization } from "./middlewares";


const router = Router();

router.get('/accounts/', validateAuth, accountsController.getAccounts);

router.get('/accounts/:id', validateAuth, validateAuthorization, accountsController.getAccount);

router.patch('/accounts/:id', validateAuth, validateAuthorization, validateUpdateAccountSchema, accountsController.updateAccount);

router.post('/accounts/', validateAccountSchema, accountsController.addAccount);

router.post('/accounts/login', validateLoginSchema, accountsController.loginAccount)

router.post('/accounts/logout', validateAuth, accountsController.logoutAccount)

router.delete('/accounts/:id', validateAuth, validateAuthorization, accountsController.deleteAccount)


export default router;