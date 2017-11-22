import * as express from 'express';
import { Request, Response } from 'express';
import { userMiddleware } from '../status/userMiddleware';
import { Comment } from '../../models/Comment';
import { json } from 'body-parser';

const jsonParser = json();

export const commentRoute = express.Router();

commentRoute.post('/', jsonParser, userMiddleware, (req, res) => {
    const { statusId, content } = req.body;
    Comment.createComment(statusId, req.body.user._id, content)
    .then(comment => res.send(comment))
    .catch(error => res.status(404).send(error))
});
