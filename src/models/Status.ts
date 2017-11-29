import { Schema, model } from 'mongoose';
import { User } from './User';
import { Comment } from './Comment';
import { Notification } from './Notification';

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
        const { likes, author } = await Status.findById(statusId, { likes: 1, author: 1 }) as Status;
        const isExisted = likes.some(like => like.toString() === userId);
        if (isExisted) return;
        const { name } = await User.findById(userId) as User;
        const content = `${name} da binh luan ve status cua ban`;
        const notification = new Notification({ idStatus: statusId, content, sender: userId, receiver: author });
        await notification.save();
        await User.findByIdAndUpdate(author, { $push: { notifications: notification } });
        return Status.findByIdAndUpdate(statusId, { $push: { likes: userId } })
    }
}
