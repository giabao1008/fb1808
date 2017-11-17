import * as assert from 'assert';
import { User } from '../../src/models/User';

describe('Test user model', () => {
    it('Can add new user', async() => {
        const user = new User({
            email: 'pho@gmail.com',
            name: 'Pho',
            password: '123'
        });
        await user.save();
        const user2 = await User.findOne({}) as User;
        assert.equal('pho@gmail.com', user2.email);
    });
});
