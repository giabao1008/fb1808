import * as express from 'express';
import { userRoute } from './controllers/user/userRoute'; 
export const app = express();

app.get('/', (req, res) => res.send('abcd'));

app.use('/user', userRoute);
