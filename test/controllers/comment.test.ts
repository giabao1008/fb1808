import * as assert from 'assert';
import { User } from '../../src/models/User';
import { Status } from '../../src/models/Status';
import { app } from '../../src/app';

import * as request from 'supertest';

describe.only('CONTROLLER create new comment', () => {
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

    it('Can create new comment', async () => {
        const body = { statusId, content: 'Hello Viet Name' };
        await request(app).post('/comment').send(body).set('token', token);
        const status = await Status.findById(statusId).populate({ path: 'comments', populate: { path: 'user', select: 'name' }}) as any;
        console.log(status.toObject().comments[0]);
        assert.equal(status.comments[0].content, 'Hello Viet Name');
    });
});
