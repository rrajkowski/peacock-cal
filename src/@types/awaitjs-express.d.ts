import { RequestHandler } from 'express';

declare module '@awaitjs/express' {
	function wrap(handler: RequestHandler) : RequestHandler
}