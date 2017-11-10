import { connect } from 'mongoose';
import mongoose = require('mongoose');
import { User } from './models/User';

User.ensureIndexes();

mongoose.Promise = global.Promise;
connect('mongodb://localhost/fb1808', { useMongoClient: true });
