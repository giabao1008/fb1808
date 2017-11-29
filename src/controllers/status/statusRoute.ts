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
    Status.createStatus(_id, content)
    .then(s => res.send(s))
    .catch(err => res.status(500).send(err));
});

statusRoute.get('/', userMiddleware, async (req: Request, res: Response) => {
    const arrayStatus = await Status.find({ author: req.body.user._id }).populate({ path: 'comments', populate: { path: 'user', select: 'name' }});
    res.send(arrayStatus);
});

statusRoute.get('/newfeed', userMiddleware, async (req: Request, res: Response) => {
    // const arrayStatus = await Status.find({ author: req.body.user._id }).populate({ path: 'comments', populate: { path: 'user', select: 'name' }});
    const { friends } = await User.findById(req.body.user._id, { friends: 1 }) as User;
    const myStatus = await Status.find({ author: req.body.user._id }).populate({ path: 'comments', populate: { path: 'user', select: 'name' }}).populate('author', 'name');
    const friendStatus = await Status.find({ author: { $in: friends } }).populate({ path: 'comments', populate: { path: 'user', select: 'name' }}).populate('author', 'name');
    res.send(myStatus.concat(friendStatus));
});

statusRoute.delete('/:id', userMiddleware, async (req: Request, res: Response) => {
    const { _id } = req.body.user;
    const statusId = req.params.id;
    Status.removeStatus(statusId, _id)
    .then(status => res.send(status))
    .catch(error => res.status(404).send(error))
});


statusRoute.get('/notification', userMiddleware, async (req: any, res) => {
    const { notifications } = await User.findById(req.body.user._id, { notifications: 1 }).populate('notifications') as User;
    res.send(notifications);
});
