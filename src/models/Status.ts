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
}
