import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { verifyToken } from '../../lib/jwt';
import { User } from '../../models/User';
import { Status } from '../../models/Status';

const jsonParser = bodyParser.json();
export const statusRoute = express.Router();

statusRoute.post('/', jsonParser, async (req: Request, res: Response) => {
    const { token, content } = req.body;
    const { email } = await verifyToken(token);
    const user = await User.findOne({ email });
    const status = new Status({
        content,
        author: user._id
    });
    await status.save();
    res.send(status);
});
