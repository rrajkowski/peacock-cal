import 'dotenv/config';

import App from './app';
import ICSRoute from './routes/ics';
import SendRoute from './routes/send';
import SwaggerRoute from './routes/docs';

const app = new App([
	new ICSRoute(),
	new SendRoute(),
	new SwaggerRoute(),
]);

app.listen();