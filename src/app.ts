import * as express from 'express';
import { userRoute } from './controllers/user/userRoute'; 
import { statusRoute } from './controllers/status/statusRoute'; 
import { statusLikeRoute } from './controllers/statusLike/statusLikeRoute'; 
import { commentRoute } from './controllers/comment/commentRoute'; 
export const app = express();

app.get('/', (req, res) => res.send('abcd'));

app.use('/user', userRoute);
app.use('/status', statusRoute);
app.use('/statuslike', statusLikeRoute);
app.use('/comment', commentRoute);

// Status model
// File userRoute
