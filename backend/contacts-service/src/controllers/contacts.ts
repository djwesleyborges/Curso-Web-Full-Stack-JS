import { Request, Response } from 'express';
import respository from '../models/contactRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

async function getContacts(req: Request, res: Response, next: any) {

    const token = controllerCommons.getToken(res) as Token;
    const contacts = await respository.findAll(token.accountId)

    res.json(contacts)

}

export default { getContacts }