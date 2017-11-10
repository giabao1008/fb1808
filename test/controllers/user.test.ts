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

