import { Schema, model } from 'mongoose';
import { User } from './User';
import { Comment } from './Comment';

const statusSchema = new Schema({
    content: { type: String, required: true, trim: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const StatusModel = model('Status', statusSchema);

export class Status extends StatusModel {
    content: string;
    author: User;
    likes: {}[];
    comments: Comment;
    static async removeStatus(statusId, userId) {
        const status = await Status.findById(statusId) as Status;
        if (!status) throw new Error('Cannot find status');
        if(userId.toString() === status.author.toString()) return Status.findByIdAndRemove(statusId);
        throw new Error('Cannot remove other\'s status');
    }

    static createStatus(idAuthor, content) {
        const status = new Status({
            content,
            author: idAuthor
        });
        return status.save();
    }

    static async likeAStatus(userId, statusId) {
        const { likes } = await Status.findById(statusId, { likes: 1 }) as Status;
        const isExisted = likes.some(like => like.toString() === userId);
        if (isExisted) return;
        return Status.findByIdAndUpdate(statusId, { $push: { likes: userId } })
    }
}
