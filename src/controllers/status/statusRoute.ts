import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { verifyToken } from '../../lib/jwt';
import { User } from '../../models/User';
import { Status } from '../../models/Status';
import { userMiddleware } from './userMiddleware';

const jsonParser = bodyParser.json();
export const statusRoute = express.Router();

statusRoute.post('/', jsonParser, userMiddleware, (req: Request, res: Response) => {
    const { _id } = req.body.user;
    const { content } = req.body;
    const status = new Status({
        content,
        author: _id
    });
    status.save()
    .then(s => res.send(s))
    .catch(err => res.status(500).send(err));
});

statusRoute.get('/', userMiddleware, async (req: Request, res: Response) => {
    const arrayStatus = await Status.find({ author: req.body.user._id });
    res.send(arrayStatus);
});
