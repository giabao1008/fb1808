import { Schema, model } from 'mongoose';
import { User } from './User';

const statusLikeSchema = new Schema({
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const StatusLikeModel = model('Status', statusLikeSchema);

export class StatusLike extends StatusLikeModel {
    status: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;

    static likeAStatus(userId, statusId) {
        const statusLike = new StatusLike({ status: statusId, user: userId });
        return statusLike.save();
    }
}
