import { connect } from 'mongoose';
import mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const getDbUri = () => {
    if (process.env.isTesting === 'true') return 'mongodb://localhost/fb1808_test'
    if (process.env.PORT) return 'mongodb://____';
    return 'mongodb://localhost/fb1808';
}

connect(getDbUri(), { useMongoClient: true });