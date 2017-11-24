import * as assert from 'assert';
import { User } from '../../src/models/User';
import { app } from '../../src/app';
import * as request from 'supertest';


describe.only('CONTROLLER friend', () => {
    let userId1, userId2, token1, token2;

    beforeEach('Create 2 user', async () => {
        const signUpResponse1 = await User.signUp('pho1@gmail.com', '123', 'abcd 1');
        token1 = signUpResponse1.token;
        const signUpResponse2 = await User.signUp('pho2@gmail.com', '123', 'abcd 2');
        token2 = signUpResponse2.token;
        const signUpResponse3= await User.signUp('pho3@gmail.com', '123', 'abcd 3');
        userId1 = (await User.findOne({ email: 'pho1@gmail.com' }))._id
        userId2 = (await User.findOne({ email: 'pho2@gmail.com' }))._id
    });

    it('Can send add friend request and accept by GET', async () => {
        await request(app).get('/friend/request/' + userId2).set('token', token1);
        const user1 = await User.findById(userId1).populate('sentRequested', 'name') as User;
        const user2 = await User.findById(userId2).populate('incomingRequests', 'name') as User;
        assert.equal(user1.sentRequested[0].name, 'abcd 2');
        assert.equal(user2.incomingRequests[0].name, 'abcd 1');
        await request(app).get('/friend/accept/' + userId1).set('token', token2);
        const user3 = await User.findById(userId2).populate('friends', 'name') as User;
        assert.equal(user3.friends[0].name, 'abcd 1');
    });
});

