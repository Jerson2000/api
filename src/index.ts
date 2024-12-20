import { AppDataSource } from './config/db-config';
import express from 'express';
import rootRouter from './routes';
import { errorMiddleWare } from './middlewares/error-middleware';

const app = express();
AppDataSource.initialize()
    .then(() => {


        app.use('/uploads/', express.static('uploads'));

        app.use(express.json())

        app.use('/api', rootRouter)
        app.use(errorMiddleWare)

        app.listen(2828, () => {
            console.log('Now running on port 2828');
        });




    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    }); 