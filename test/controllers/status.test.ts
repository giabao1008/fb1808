import * as assert from 'assert';
import { User } from '../../src/models/User';
import { Status } from '../../src/models/Status';
import { app } from '../../src/app';

import * as request from 'supertest';

let token;

describe.only('Can create new status for user', async () => {
    beforeEach('Create a user and get token', async () => {
        const signUpResponse = await User.signUp('pho1@gmail.com', '123', 'abcd');
        token = signUpResponse.token;
        await request(app).post('/status')
        .send({
            token,
            content: 'For get test'
        });
    });
    
    it('Can create new status by POST', async () => {
        await request(app).post('/status')
        .send({
            token,
            content: 'JS ABCD EFGH'
        });
        const status = await Status.findOne({ content: 'JS ABCD EFGH' }).populate('author') as Status;
        assert.equal(status.content, 'JS ABCD EFGH');
        assert.equal(status.author.email, 'pho1@gmail.com');
    });

    it('Can get all statuses by get', async () => {
        const res = await request(app).get('/status').set('token', token);
        assert.equal(res.body.length, 1);
    });
});
