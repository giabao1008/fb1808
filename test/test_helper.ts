process.env.isTesting = 'true';

import '../src/startDatabase';
import { User } from '../src/models/User';
import { Status } from '../src/models/Status';
import { StatusLike } from '../src/models/StatusLike';

beforeEach('Remove all data', async () => {
    await User.remove({});
    await Status.remove({});
    await StatusLike.remove({});
});
