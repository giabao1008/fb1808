import { Schema, model } from 'mongoose';
import { User } from './User';
import { Status } from './Status';

const notificationSchema = new Schema({
    idStatus: { type: Schema.Types.ObjectId, ref: 'Status' },
    content: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' }
});

const NotificationModel = model('Notification', notificationSchema);

export class Notification extends NotificationModel {}
