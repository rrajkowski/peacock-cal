import { Router } from 'express';
import Route from '../interfaces/routes';
import { writeFileSync } from 'fs';
import * as moment from 'moment';
import * as ics from 'ics';
import HttpException from '../exceptions/HttpException';
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

  /* Create .ics file and return, use correct type/mime */
  private createICSFile = async (req: any) => {

		// set event for ics
		let event: any = {
			title: 'Reminder to watch PeacockTV',
			description: 'Reminder',
			busyStatus: 'FREE',
			start: [2022, 11, 17, 18, 0],
			end: [2022, 11, 17, 20, 30],
			location: 'PeacockTV',
			url: 'https://peacocktv.com',
			attendees: [],
		}

		const now = moment().utc();
		const title = req.query.title || '';
		const location = req.query.location || '';
		const url = req.query.url || '';
		const start = req.query.start || now.toISOString();
		const end = req.query.end || now.add(2, 'hours').toISOString();
		//force array, if only 1
		const attendees = req.query.attendees.length===1 ? [req.query.attendees] : req.query.attendees.split(',');

		// set event params
		event.title = title;
		event.start = moment(start).format('YYYY-M-D-H-m').split("-").map(Number);
		event.end = moment(end).format("YYYY-M-D-H-m").split("-").map(Number);
		event.url = url.toString().trim();
		event.location = location.toString().trim();
		// loop through attendees
		attendees.forEach((email: string) => {
			event.attendees.push({ name: email.split('@')[0], email: email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' });
		});
		let icsFile: any;
		let icsBinary: any;
		ics.createEvent(event, (err, value) => {
			if (err) {
				throw new HttpException(404, 'ICS createEvent failed: '+ JSON.stringify(err));
			}
			if(value){
				icsBinary = value;
				icsFile =	writeFileSync(`${__dirname}/../../files/event.ics`, value);
			}
		});


    // return base64 .ics file
    return await icsBinary.toString('base64');
  }

	/* All Routes */
  private initializeRoutes = async() => {
    await this.router.get('/', async(req, res) => {
			res.set('content-type', 'text/calendar; charset=utf-8');
			res.set('content-disposition', 'inline; filename=calendar.ics');
			res.type('ics');
      res.status(200).send(await this.createICSFile(req));
    });
  }
}

export default ICSRoute;