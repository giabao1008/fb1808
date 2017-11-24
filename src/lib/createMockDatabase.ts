import * as faker from 'faker';
import { User } from '../models/User';
import { Status } from '../models/Status';
import { Comment } from '../models/Comment';

export async function startCreateMockDatabase() {
    const userCount = await User.count({});
    if (userCount > 10) return;
    await create20User();
    await create40Status();
    await addFriend();
}

async function create20User() {
    for(let i = 0; i < 20; i++) {
        const email = faker.internet.email();
        const name = faker.internet.userName();
        await User.signUp(email, '123', name);
    }
}

async function create40Status() {
    const users = await User.find({});
    const userIds = users.map(user => user._id);
    for(let i = 0; i < userIds.length; i++) {
        await Status.createStatus(userIds[i], faker.lorem.paragraph());
        await Status.createStatus(userIds[i], faker.lorem.paragraph());
    }
}

async function addFriend() {
    const users = await User.find({});
    const userIds = users.map(user => user._id);
    for(let i = 0; i < 10; i++) {
       await User.sendAddFriendRequest(userIds[i], userIds[i + 10]);
       await User.acceptRequest(userIds[i + 10], userIds[i]);
    }
}
