import * as express from 'express';
import { Request, Response } from 'express';
import { userMiddleware } from '../status/userMiddleware';
import { Status } from '../../models/Status';

export const statusLikeRoute = express.Router();

statusLikeRoute.get('/:idUser/:idStatus', userMiddleware, (req, res) => {
    const { idStatus, idUser } = req.params;
    Status.likeAStatus(idUser, idStatus)
    .then(like => res.send(like))
    .catch(err => res.send(err));
});
