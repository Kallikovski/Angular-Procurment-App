import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/userModel";
import config from "../config"

/** Interface for modifying request and jwt variables*/
declare global {
    namespace Express {
        interface Request {
            token: string;
            user: IUser;
        }
    }
    interface JwtPayload {
        _id: string | jwt.JwtPayload;
    }
}
/** Middle ware handeling authentication tokens for access control */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.header('Authorization')
        console.log(header)
        if (!header) {
            throw new Error()
        }
        const token = header.replace('Bearer ', '');
        const decoded = jwt.verify(token, config.server.jwt_secret) as JwtPayload
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        })
        if (!user) {
            throw new Error()
        }
        req.token = token;
        req.user = user;
        next()
    } catch (error) {
        res.status(401).send({
            error: 'Please authenticate.'
        })
    }
}
