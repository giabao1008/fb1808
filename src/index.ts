import { app } from './app';
import { startCreateMockDatabase } from './lib/createMockDatabase';
import './startDatabase';

if(!process.env.PORT) startCreateMockDatabase();

app.listen(3000, () => console.log('Server started'));
