import { Router } from 'express';
import Route from '../interfaces/routes';

/**
 * @swagger
 *
 * /hello:
 *   get:
 *     description: Fetches the current status of the server
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: If the server is fully operational.
 */
class HelloRoute implements Route {

	public path = "/hello";
	public router = Router();
	public versions = [1];

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', (req, res) => {
			res.json({ hello: "world" });
		});
	}
}

export default HelloRoute;