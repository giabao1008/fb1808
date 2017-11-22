import { Schema, model } from 'mongoose';
import { User } from './User';

const statusSchema = new Schema({
    content: { type: String, required: true, trim: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const StatusModel = model('Status', statusSchema);

export class Status extends StatusModel {
    content: string;
    author: User;
    likes: {}[];
    static async removeStatus(statusId, userId) {
        const status = await Status.findById(statusId) as Status;
        if (!status) throw new Error('Cannot find status');
        if(userId.toString() === status.author.toString()) return Status.findByIdAndRemove(statusId);
        throw new Error('Cannot remove other\'s status');
    }

    static likeAStatus(userId, statusId) {
        return Status.findByIdAndUpdate(statusId, { $push: { likes: userId } })
    }
}
