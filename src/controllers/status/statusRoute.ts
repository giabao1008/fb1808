import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

const jsonParser = bodyParser.json();
const statusRoute = express.Router();

statusRoute.post('/', jsonParser, (req: Request, res: Response) => {
    const { token, content } = req.body;
    
});
