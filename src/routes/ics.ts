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
 *     description: Creates and returns .ics file in browser.
 *     parameters:
 *       - name: title
 *         in: query
 *         required: true
 *       - name: start
 *         in: query
 *         required: true
 *       - name: end
 *         in: query
 *         required: true
 *       - name: url
 *         in: query
 *         required: true
 *       - name: alarm
 *         in: query
 *         required: false
 *       - name: location
 *         in: query
 *         required: false
 *       - name: attendees
 *         in: query
 *         required: false
 *     responses:
 *       200:
 *         description: "Creates and returns .ics file"
 *         schema:
 *           type: "JSON"
 *     externalDocs:
 *       url: https://www.npmjs.com/package/ics
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
		try{
			// set event for ics
			let event: any = {
				title: '',
				description: 'Reminder',
				busyStatus: 'FREE',
				start: [2022, 11, 17, 18, 0],
				end: [2022, 11, 17, 20, 30],
				location: '',
				url: '',
				attendees: [],
				alarms: [],
			}

			const now = moment().utc();
			const title = req.query.title || 'Reminder to watch PeacockTV';
			const location = req.query.location || 'PeacockTV';
			const url = req.query.url || 'https://peacocktv.com';
			const start = req.query.start || now.toISOString();
			const end = req.query.end || now.add(2, 'hours').toISOString();
			//force array, if only 1
			const attendees = !req.query.attendees ? [] : req.query.attendees.length===1 ? [req.query.attendees] : req.query.attendees.split(',');
			const alarm =  req.query.alarm || true;

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
			// set 15m alarm if true
			if(alarm){
				event.alarms.push({
					action: 'audio',
					description: 'Reminder',
					trigger: {hours:0,minutes:15,before:true},
					repeat: 1,
					attachType:'VALUE=URI',
					attach: 'Glass'
				});
			}

			let icsFile: any;
			let icsBinary: any;
			ics.createEvent(event, (err, value) => {
				if (err) {
					throw new HttpException(404, JSON.stringify(err), err.stack);
				}
				if(value){
					icsBinary = value;
					icsFile =	writeFileSync(`${__dirname}/../../files/event.ics`, value);
				}
			});


	    // return base64 .ics file
	    return await icsBinary.toString('base64');

		}catch(err){
			console.error(err);
 			return await err;
		}
  }

	/* All Routes */
  private initializeRoutes = async() => {
    await this.router.get('/', async(req, res) => {
			const result = await this.createICSFile(req);
			// error
			if(result instanceof Error || result.message){
				res.status(500).json({message: 'Error creating .ics file:'+ result.message, stack :result.stack});
			// success
			}else{
				res.set('content-type', 'text/calendar; charset=utf-8');
				res.set('content-disposition', 'inline; filename=peacocktv.ics');
				res.type('ics');
	      res.status(200).send(await result);
			}
    });
  }
}

export default ICSRoute;