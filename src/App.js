import { corsMiddleware } from './middleware/Cors';
import { ExpressApp } from './singleton/Express';
import { HttpApp } from './singleton/Http';
import bodyParser from 'body-parser';
import routers from './component/rest/RestRouter';
import express from 'express';
import path from 'path';
import { logger } from './util/Logger';
import { errorHandler } from './middleware/ErrorHandler';

// import code
require('./util/NosqlDatabase')
require('./util/Redis')
require('./component/socket/SocketRouter')

ExpressApp.getInstance().use(corsMiddleware)
ExpressApp.getInstance().use(bodyParser.json({ limit: '50mb' }));
ExpressApp.getInstance().use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));
ExpressApp.getInstance().use('/static', express.static(path.join(__dirname, '../uploads')));

for (const router of routers) {
    ExpressApp.getInstance().use(router.path, router.router);
}

ExpressApp.getInstance().use(errorHandler);

HttpApp.getInstance().listen(process.env.PORT, () => {
    logger.info(`server is running at http://localhost:${process.env.PORT}`);
});
