import { Router, Request, Response } from "express";
import accountsController from "../controllers/accounts";
import { accountSchema } from "../model/account";

function validateAccount(req: Request, res: Response, next: any){
    const {error} = accountSchema.validate(req.body);
    if(error == null) return next();

    const {details} = error;
    const message = details.map(item => item.message).join(',');

    console.log(message);
    res.status(422).end();
}

const router = Router();

router.get('/accounts/', accountsController.getAccounts);

router.get('/accounts/:id', accountsController.getAccount);

router.post('/accounts/', validateAccount, accountsController.addAccount);

export default router;