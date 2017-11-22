import * as assert from 'assert';
import { User } from '../../src/models/User';
import { StatusLike } from '../../src/models/StatusLike';
import { Status } from '../../src/models/Status';
import { app } from '../../src/app';

import * as request from 'supertest';

describe.only('CONTROLLER Can like a status', () => {
    let userId, statusId, token;
    beforeEach('Create a user and 2 status', async () => {
        const signUpResponse = await User.signUp('pho1@gmail.com', '123', 'abcd');
        token = signUpResponse.token;
        await request(app).post('/status')
        .set('token', token)
        .send({ content: 'For get test' });
        await request(app).post('/status')
        .set('token', token)
        .send({ content: '2. For get test' });
        const status = await Status.findOne({ content: '2. For get test' }) as Status;
        statusId = status._id.toString();
        userId = status.author.toString();
    });

    it('Can like a status by GET', async () => {
        await request(app).get(`/statuslike/${userId}/${statusId}`).set('token', token);
        const statusLike = await StatusLike.findOne({}) as StatusLike;
        assert.equal(statusLike.user.toString(), userId);
        assert.equal(statusLike.status.toString(), statusId);
    });
});