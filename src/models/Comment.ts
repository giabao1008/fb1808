import { Schema, model } from 'mongoose';
import { User } from './User';
import { Status } from './Status';

const commentSchema = new Schema({
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, require: true, trim: true }
    // user: { type: String }
});

const CommentModel = model('Comment', commentSchema);

export class Comment extends CommentModel {
    static async createComment(statusId, userId, content) {
        const comment = new Comment({ status: statusId, user: userId, content });
        await comment.save();
        await Status.findByIdAndUpdate(statusId, { $push: { comments: comment } });
        return comment;
    }
}
