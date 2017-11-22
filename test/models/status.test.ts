import * as assert from 'assert';
import { User } from '../../src/models/User';
import { Status } from '../../src/models/Status';
import * as request from 'supertest';
import { app } from '../../src/app';

let userId, statusId;

describe('MODEL Can remove status', () => {
    beforeEach('Create a user and 2 status', async () => {
        const signUpResponse = await User.signUp('pho1@gmail.com', '123', 'abcd');
        let token = signUpResponse.token;
        await request(app).post('/status')
        .set('token', token)
        .send({ content: 'For get test' });
        await request(app).post('/status')
        .set('token', token)
        .send({ content: '2. For get test' });
        userId = (await User.findOne({}))._id;
        statusId = (await Status.findOne({ content: '2. For get test' }))._id;
    });
    
    it('Can remove status', async() => {
        await Status.removeStatus(statusId, userId);
        const statuses = await Status.find({}) as Status[];
        assert.equal(statuses.length, 1);
        assert.equal(statuses[0].content, 'For get test');
    });
});
