import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// Handling Errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 500,
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
