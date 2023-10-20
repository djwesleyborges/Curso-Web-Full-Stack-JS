import { Request, Response, response } from "express";
import { IAccount } from "../models/account";
import repository from '../models/accountModel'
import auth from "../auth";

const accounts: IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any) {
    const accounts = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));
}

async function getAccount(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if (!id) throw new Error("ID is invalid format")

        const account = await repository.findById(id);
        if (account === null) {
            return res.status(404).end();
        }
        else {
            account.password = '';
            res.json(account);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function addAccount(req: Request, res: Response, next: any) {
    try {
        const newAccount = req.body as IAccount;
        newAccount.password = auth.hashPassword(newAccount.password);
        const result = await repository.addAccount(newAccount);
        newAccount.password = '';
        newAccount.id = result.id;
        accounts.push(newAccount);
        res.status(201).json(newAccount)
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function updateAccount(req: Request, res: Response, next: any) {
    try {
        const accountId = parseInt(req.params.id);
        if (!accountId) throw new Error('ID is invalid format.');

        const accountParams = req.body as IAccount;
        accountParams.password = auth.hashPassword(accountParams.password);
        const updatedAccount = await repository.updateAccount(accountId, accountParams);
        updatedAccount.password = '';        
        res.status(200).json(updatedAccount);
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

async function loginAccount(req: Request, res: Response, next: any) {
    try {
        const loginParams = req.body as IAccount
        const account = await repository.findByEmail(loginParams.email);
        if (account !== null){
            const isValid = auth.comparePassword(loginParams.password, account.password);
            if(isValid){
                const token = await auth.sign(account.id!);
                return res.json({ auth: true, token });
            }
        }
        else{
            return res.status(401).end();
        }

        const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password)
        if (index === -1) return res.status(401).end();

        res.json({ auth: true, token: {} });
    }
    catch (error) {
        console.log(error)
        res.status(400).end();
    }

}

function logoutAccount(req: Request, res: Response, next: any){
    res.json({auth: false, token: null});
}

export default { getAccounts, getAccount, addAccount, updateAccount, loginAccount, logoutAccount }