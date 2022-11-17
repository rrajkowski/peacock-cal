import { Router } from 'express';
import Route from '../interfaces/routes';

/**
 * @swagger
 *
 * /ics:
 *   get:
 *     description: Creates and returns .ics file
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Creates and returns .ics file.
 */
class ICSRoute implements Route {

	public path = "/ics";
	public router = Router();
	public versions = [1];

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/', (req, res) => {
			res.json({ ics: "success" });
		});
	}
}

export default ICSRoute;