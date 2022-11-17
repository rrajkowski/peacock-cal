import 'dotenv/config';

import App from './app';
import HelloRoute from './routes/hello';
import SendRoute from './routes/send';

const app = new App([
	new HelloRoute(),
	new SendRoute()
]);

app.listen();