process.env.isTesting = 'true';

import '../src/startDatabase';
import { User } from '../src/models/User';

beforeEach('Remove all data', async () => {
    await User.remove({});
});
