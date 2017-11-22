import * as express from 'express';
import { Request, Response } from 'express';
import { userMiddleware } from '../status/userMiddleware';
import { Status } from '../../models/Status';

export const statusLikeRoute = express.Router();

statusLikeRoute.get('/:idStatus', userMiddleware, (req, res) => {
    const { idStatus } = req.params;
    Status.likeAStatus(req.body.user._id, idStatus)
    .then(like => res.send(like))
    .catch(err => res.send(err));
});
