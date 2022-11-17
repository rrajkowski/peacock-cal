import 'dotenv/config';

import App from './app';
import ICSRoute from './routes/ics';
import SendRoute from './routes/send';

const app = new App([
	new ICSRoute(),
	new SendRoute()
]);

app.listen();