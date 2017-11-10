import { connect } from 'mongoose';
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;
connect('mongodb://localhost/fb1808', { useMongoClient: true });
