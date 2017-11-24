import * as express from 'express';
import { userRoute } from './controllers/user/userRoute'; 
import { statusRoute } from './controllers/status/statusRoute'; 
import { statusLikeRoute } from './controllers/statusLike/statusLikeRoute'; 
import { commentRoute } from './controllers/comment/commentRoute'; 
import { friendRoute } from './controllers/friend/friendRoute'; 
export const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.get('/', (req, res) => res.send('abcd'));

app.use('/user', userRoute);
app.use('/status', statusRoute);
app.use('/statuslike', statusLikeRoute);
app.use('/comment', commentRoute);
app.use('/friend', friendRoute);

// Status model
// File userRoute
