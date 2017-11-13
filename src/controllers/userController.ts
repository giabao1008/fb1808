import * as express from 'express';
import { json } from 'body-parser';
import { User } from '../models/User';
import { Response } from '_debugger';
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

userRoute.get('/verify/:idUser/:verifyCode', (req, res) => {
    const { idUser, verifyCode } = req.params;
    User.verifyUser(idUser, verifyCode)
    .then(() => res.send({ message: 'verified' }))
    .catch(err => res.status(404).send({ message: err.message }))
});

const checkTokenMiddleware = async (req, res, next) => {
    const { token } = req.body;
    try {
        await User.checkToken(token);  
        next(); 
    } catch(err) {
        res.status(404).send({ message: 'token is invalid' });
    }
}

userRoute.post('/changeinfo', jsonParser, checkTokenMiddleware, (req, res) => {
    const { name, email } = req.body;
    User.changeInfo(email, name)
    .then(user => res.send({ user }))
    .catch(error => res.status(404).send({ message: error.message }));
});

userRoute.post('/changepassword', jsonParser, checkTokenMiddleware, (req, res) => {
    const { password, newPassword, email } = req.body;
    User.changePassword(email, newPassword, password)
    .then(user => res.send({ user }))
    .catch(error => res.status(404).send({ message: error.message }));
});
