import { Schema, model } from 'mongoose';

const statusSchema = new Schema({
    content: { type: String, required: true, trim: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const StatusModel = model('Status', statusSchema);

class Status extends StatusModel {}
