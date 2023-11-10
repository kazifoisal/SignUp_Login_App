import  helmet from 'helmet';
import  morgan from 'morgan';
import  bodyParser from 'body-parser';
import { Express } from 'express';

// Routers
import todoRouter from '../routers/routers';

export default function startUpRoutes(app: Express){
    // CORS error resolver
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use(helmet());
    app.use(bodyParser.json());

    if (app.get('env') === 'development') {
        app.use(morgan('combined'));
    }

    app.use('/api/student', todoRouter);
}
