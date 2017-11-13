import * as assert from 'assert';
import { User } from '../../src/models/User';
import { app } from '../../src/app';

import * as request from 'supertest';

describe('Test user sign up controller', () => {
    it('Can sign up', async() => {
        const body = { email: 'pho@gmail.com', password: '123', name: 'pho' };
        await request(app).post('/user/signup').send(body);
        const user = await User.findOne({}) as User;
        assert.equal('pho', user.name);
        assert.equal(false, user.isVerified);
    });
});

describe('Test user sign in controller', () => {
    beforeEach('Sign up a user for test', async () => {
        await User.signUp('pho2@gmail.com', '123', 'Pho');
    });

    it('Can sign in', async() => {
        const body = { email: 'pho2@gmail.com', password: '123' };
        const response = await request(app).post('/user/signin').send(body);
        assert.equal('Pho', response.body.user.name);
    });

    it('Cannot sign in with wrong email', async() => {
        const body = { email: 'pho3@gmail.com', password: '123' };
        const response = await request(app).post('/user/signin').send(body);
        assert.equal(400, response.status);
    });

    it('Cannot sign in with wrong password', async() => {
        const body = { email: 'pho2@gmail.com', password: '1234' };
        const response = await request(app).post('/user/signin').send(body);
        assert.equal(400, response.status);
    });
});

describe('Test user verify controller', () => {
    let idUser, verifyCode;

    beforeEach('Signup for test', async () => {
        await User.signUp('pho1@gmail.com', '123', 'Pho Nguyen');
        const user = await User.findOne() as User;
        idUser = user._id;
        verifyCode = user.verifyCode;
        assert.equal('pho1@gmail.com', user.email);
    });

    it('Can verify a user', async () => {
        await request(app).get(`/user/verify/${idUser}/${verifyCode}`);
        const user = await User.findOne() as User;
        assert.equal(true, user.isVerified);
    });

    it('Cannot verify invalid code', async () => {
        const response = await request(app).get(`/user/verify/${idUser}/${verifyCode + 1}`);
        const user = await User.findOne() as User;
        assert.equal(false, user.isVerified);
        assert.equal(404, response.status);
    });
});
