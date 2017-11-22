import { Schema, model } from 'mongoose';
import { User } from './User';
import { Status } from './Status';

const statusLikeSchema = new Schema({
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
    // user: { type: String }
});

const StatusLikeModel = model('StatusLike', statusLikeSchema);

export class StatusLike extends StatusLikeModel {
    status: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
}
