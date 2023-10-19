import { Request, Response } from "express";
import { IAccount } from "../models/account";
import AccountRepository, {AccountModel} from '../models/accountModel'


const accounts: IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any) {
    const accounts = await AccountRepository.findAll<AccountModel>();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));
}

function getAccount(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if (!id) throw new Error("ID is invalid format")
        const index = accounts.findIndex(item => item.id === id);
        if (index === -1) {
            return res.status(404).end();
        }
        else {
            res.json(accounts[index]);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

function addAccount(req: Request, res: Response, next: any) {
    try {
        console.log(req.body);
        const newAccount = req.body as IAccount;
        accounts.push(newAccount);
        res.status(201).json(newAccount)
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

function updateAccount(req: Request, res: Response, next: any) {
    try {
        const accountId = parseInt(req.params.id);
        if (!accountId) throw new Error('ID is invalid format.');

        const accountParams = req.body as IAccount;
        const index = accounts.findIndex(item => item.id === accountId);
        if (index === -1) return res.status(404).end();

        const originalAccount = accounts[index];
        if (accountParams.name) originalAccount.name = accountParams.name;
        if (accountParams.password) originalAccount.password = accountParams.password;

        accounts[index] = originalAccount;
        res.status(200).json(originalAccount);
    }
    catch (error) {
        console.log(error);
        res.status(400).end();
    }
}

function loginAccount(req: Request, res: Response, next: any) {
    try {
        const loginParams = req.body as IAccount
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
    res.json({auth: false, token: null})
}

export default { getAccounts, getAccount, addAccount, updateAccount, loginAccount, logoutAccount }