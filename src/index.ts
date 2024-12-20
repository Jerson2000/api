import { AppDataSource } from './config/db-config';
import express from 'express';
import rootRouter from './routes';
import { errorMiddleWare } from './middlewares/error-middleware';
import rateLimit from 'express-rate-limit';
import { APP_PORT } from './utils/env-utils';

const app = express();
AppDataSource.initialize()
    .then(() => {


        const limit = rateLimit({
            windowMs: 1 * 60 * 1000, // 1minute
            limit: 50, // 50 max limit per minute
            skipFailedRequests: true,
        })

        app.use(limit);


        app.use('/uploads/', express.static('uploads'));

        app.use(express.json())

        app.use('/api', rootRouter)
        app.use(errorMiddleWare)

        app.listen(APP_PORT, () => {
            console.log(`Now running on port ${APP_PORT}`);
        });




    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    }); 