import express, { Router } from 'express';
import helmet from 'helmet';

export default (router: Router) => {
    const app = express();
    //app.use(logger('dev'));
    app.use(helmet());

    // const corsOptions = {
    //     origin: getCorsOrigin(),
    //     optionsSuccessStatus: 200
    // }
    //app.use(cors(corsOptions));
    app.use(express.json());
    app.use(router);

    app.get('/health', (req, res) => {
        res.json({ message: `${process.env.MS_NAME} is up and running!` });
    })

    return app;
}
