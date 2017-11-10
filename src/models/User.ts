import { Schema, model } from 'mongoose';
import { createToken } from '../lib/jwt';
import { hash, compare } from 'bcrypt';
import { create } from 'domain';
import { SignUpResponse } from '../types/SignUpResponse';

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, minlength: 3, required: true, trim: true },
    name: { type: String, minlength: 3, required: true, trim: true }
});

const UserModel = model('User', UserSchema);

export class User extends UserModel {
    email: string;
    password: string;
    name: string;

    static async signUp(email: string, password: string, name: string): Promise<SignUpResponse> {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        const token = await createToken({ name, email });
        return {
            token,
            user: { email, name }
        }
    }

    static async signIn(email: string, password: string): Promise<SignUpResponse> {
        const user = await User.findOne({ email }) as User;
        if(!user) throw new Error('Email khong ton tai');
        const same = await compare(password, user.password);
        const { name } = user;
        if(!same) throw new Error('Sai password');
        const token = await createToken({ name, email });
        return { token, user: { email, name } };
    }
}
