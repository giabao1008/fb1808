import * as express from 'express';
import { Request, Response } from 'express';
import { userMiddleware } from '../status/userMiddleware';
import { StatusLike } from '../../models/StatusLike';

const statusLikeRoute = express.Router();

statusLikeRoute.get('/:idUser/:idStatus', userMiddleware, (req, res) => {
    const { idStatus, idUser } = req.params;
    StatusLike.likeAStatus(idUser, idStatus)
    .then(like => res.send(like))
    .catch(err => res.send(err));
});
