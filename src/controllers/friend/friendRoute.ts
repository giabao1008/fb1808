import * as express from 'express';
import { Request, Response } from 'express';
import { User } from '../../models/User';
import { userMiddleware } from '../status/userMiddleware';

export const friendRoute = express.Router();

friendRoute.get('/request/:idReceiver', userMiddleware, (req, res) => {
    User.sendAddFriendRequest(req.body.user._id, req.params.idReceiver)
    .then(() => res.send({ message: 'OK' }))
    .catch(error => res.send({ error }));
});

friendRoute.get('/accept/:idSender', userMiddleware, (req, res) => {
    User.acceptRequest(req.body.user._id, req.params.idSender)
    .then(() => res.send({ message: 'OK' }))
    .catch(error => res.send({ error }));
});


friendRoute.get('/', userMiddleware, async (req, res) => {
    const users = await User.find({}, { name: 1 });
    const me = await User.findById(req.body.user._id, { friends: 1, sentRequested: 1, incomingRequests: 1 })
    .populate('sentRequested', 'name')
    .populate('incomingRequests', 'name')
    .populate('friends', 'name');
    res.send(me);
});

// BeforeEach -> Create 2 user
// Send Request
// Assert user
// Accept
// Assert Friends
