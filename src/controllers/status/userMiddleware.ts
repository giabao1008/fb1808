import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../lib/jwt';

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    verifyToken(token)
    .then(obj => {
        if (req.body) {
            req.body.user = { _id: obj._id };
        } else {
            req.body = { user: { _id: obj._id } ;}
        }
        // req.body = { ...req.body, _id: obj._id };
        next();
    })
    .catch(err => res.status(404).send({ message: 'Invalid token' }));
};
