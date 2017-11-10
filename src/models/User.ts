import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, minlength: 3, required: true, trim: true },
    name: { type: String, minlength: 3, required: true, trim: true }
});

const UserModel = model('User', UserSchema);

export class User extends UserModel {
    email: string;
    password: string;
    name: string;
}
