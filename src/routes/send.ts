import { Router } from 'express';
import Route from '../interfaces/routes';

/**
 * @swagger
 *
 * /send:
 *   get:
 *     description: Fetches the current status of the server
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: If the server is fully operational.
 */
class SendRoute implements Route {

	public path = "/send";
	public router = Router();
	public versions = [1];

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', (req, res) => {
			res.json({ send: "success" });
		});
	}
}

export default SendRoute;