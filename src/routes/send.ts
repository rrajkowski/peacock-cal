import { Router } from 'express';
import Route from '../interfaces/routes';

/**
 * @swagger
 *
 * /send:
 *   get:
 *     description: Gmail + Nodemailer to send email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Gmail + Nodemailer to send email.
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
			res.json({ mocksend: "success" });
		});
	}
}

export default SendRoute;