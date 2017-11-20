import { Schema, model } from 'mongoose';
import { createToken, verifyToken } from '../lib/jwt';
import { hash, compare } from 'bcrypt';
import { create } from 'domain';
import { SignUpResponse } from '../types/SignUpResponse';
import randomString = require('random-string');
import { sendVerifyEmail } from '../lib/mailing';

const userSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, minlength: 3, required: true, trim: true },
    name: { type: String, minlength: 3, required: true, trim: true },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String },
    restorePasswordCode: { type: String, default: '' },
    statuses: [{ type: Schema.Types.ObjectId, ref: 'Status' }]
});

const UserModel = model('User', userSchema);

export class User extends UserModel {
    email: string;
    password: string;
    name: string;
    verifyCode: string;
    isVerified: boolean;
    restorePasswordCode: string;

    static async signUp(email: string, password: string, name: string): Promise<SignUpResponse> {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name, verifyCode: randomString() });
        await user.save();
        if (process.env.isTesting !== 'true') {
            // Nho dien thong tin vao day
            // await sendVerifyEmail('1', '2', '4');
        }
        const token = await createToken({ name, email, _id: user._id });
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
        const token = await createToken({ name, email, _id: user._id });
        return { token, user: { email, name } };
    }

    static async verifyUser(idUser, verifyCode) {
        const user = await User.findById(idUser) as User;
        if (!user) throw new Error('User khong ton tai');
        if (verifyCode !== user.verifyCode) throw new Error('CODE sai');
        return User.findByIdAndUpdate(idUser, { isVerified: true });
    }

    static async changeInfo(email: string, name: string): Promise<User> {
        return await User.findOneAndUpdate({ email }, { name }) as User;
    }

    static async changePassword(email, newPassword, password): Promise<User>  {
        const user = await User.findOne({ email }) as User;
        if(!user) throw new Error('Email khong ton tai');
        const same = await compare(password, user.password);
        if(!same) throw new Error('Sai password');
        const encrypted = await hash(newPassword, 8);
        return await User.findOneAndUpdate({ email }, { password: encrypted }) as User;
    }

    static async checkToken(token) {
        const obj = await verifyToken(token);
        return obj;
    }

    static async requestChangePassword(email) {
        const restorePasswordCode = randomString();
        if (!process.env.isTesting) {
            // send restore password email
            // TODO here
        }
        return User.findOneAndUpdate({ email }, { restorePasswordCode });
    }

    static async checkRestorePassworCode(idUser, code) {
        const user = await User.findById(idUser) as User;
        if (!user) throw new Error('User khong ton tai!');
        if (user.restorePasswordCode !== code) throw new Error('Invalid code');
        return code;
    }

    static async changePasswordWhenForget(email, code, newPassword) {
        const user = await User.findOne(email) as User;
        if (!user) throw new Error('User khong ton tai!');
        if (user.restorePasswordCode !== code) throw new Error('Invalid code');
        const encrypted = await hash(newPassword, 8);
        return await User.findOneAndUpdate({ email }, { password: encrypted }) as User;
    }
}

// sendRequest quen mat khau
// 
