import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
	const status: number = (error instanceof HttpException && error.status) || 500;
	const message: string = error.message || 'Something went wrong';
	const stack: any = (process.env.NODE_ENV === 'development') ? error.stack : '';
	console.error('[ERROR]', error);

	res.status(status).json({ status, message, stack });
}

export default errorMiddleware;