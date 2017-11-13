import '../src/startDatabase';
import { User } from '../src/models/User';

process.env.isTesting = 'true';

beforeEach('Remove all data', async () => {
    await User.remove({});
});
