import * as express from 'express';
import { json } from 'body-parser';
import { User } from '../models/User';
export const userRoute = express.Router();


const jsonParser = json();

interface SignUpInfo {
    email: string;
    name: string;
    password: string;
}

interface SignInInfo {
    email: string;
    password: string;
}

// userRoute.get('/', (req, res) => res.send('user signin'));
// userRoute.post('/signin', (req, res) => res.send('user abcd'));
userRoute.post('/signup', jsonParser, (req, res) => {
    const { email, password, name } = req.body as SignUpInfo;
    User.signUp(email, password, name)
    .then(response => res.send(response))
    .catch(error => res.status(400).send({ message: error.message }))
});

userRoute.post('/signin', jsonParser, (req, res) => {
    const { email, password } = req.body as SignInInfo;
    User.signIn(email, password)
    .then(response => res.send(response))
    .catch(error => res.status(400).send({ message: error.message }))
});
