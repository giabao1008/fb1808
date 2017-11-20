import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { verifyToken } from '../../lib/jwt';
import { User } from '../../models/User';
import { Status } from '../../models/Status';

const jsonParser = bodyParser.json();
export const statusRoute = express.Router();

statusRoute.post('/', jsonParser, async (req: Request, res: Response) => {
    const { content } = req.body;
    const { token } = req.headers;
    try {
        const { _id } = await verifyToken(token);
        const status = new Status({
            content,
            author: _id
        });
        await status.save();
        res.send(status);
    } catch (err) {
        res.status(404).send({ message: 'Invalid token' });
    }
});

statusRoute.get('/', async (req: Request, res: Response) => {
    const { token } = req.headers;
    const { _id } = await verifyToken(token);
    const arrayStatus = await Status.find({ author: _id });
    res.send(arrayStatus);
});
