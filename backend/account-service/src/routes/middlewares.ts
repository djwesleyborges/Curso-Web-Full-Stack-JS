import { Request, Response } from "express";
import { accountSchema, loginSchema, updateAccountSchema } from "../models/accountSchemas";
import commonsMiddleware from 'ms-commons/api/routes/middlewares'
import controllerCommons from 'ms-commons/api/controllers/controller';
import { Token } from "ms-commons/api/auth";


function validateAccountSchema(req: Request, res: Response, next: any) {
    return commonsMiddleware.validateSchema(accountSchema, req, res, next)
}

function validateLoginSchema(req: Request, res: Response, next: any) {
    return commonsMiddleware.validateSchema(loginSchema, req, res, next)
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any) {
    return commonsMiddleware.validateSchema(updateAccountSchema, req, res, next)
}

async function validateAuth(req: Request, res: Response, next: any) {
    return commonsMiddleware.validateAuth(req, res, next)
}

async function validateAuthorization(req: Request, res: Response, next: any) {
    const accountId = parseInt(req.params.id);
    if (!accountId) return res.status(400).end();

    const token = controllerCommons.getToken(res) as Token;
    if (accountId !== token.accountId) return res.status(403).end();

    next();
}

export { validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth, validateAuthorization }