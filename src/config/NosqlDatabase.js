import mongoose from 'mongoose';
import { logger } from '../util/Logger';

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', function (e) {
    logger.error('mongo_connect_error', e);
});
db.once('open', function () {
    logger.info('mongo_connect_success', process.env.MONGODB_URL);
});

export default db;