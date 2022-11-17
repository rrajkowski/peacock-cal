import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import Routes from './interfaces/routes';
import errorMiddleware from './middleware/error';

class App {
	public app: express.Application;
	public port: (string | number);
	public env: boolean;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = process.env.PORT || 3002;
		this.env = process.env.NODE_ENV === 'production' ? true : false;

		this.initMiddleware();
		this.initRoutes(routes);

		// error handling
		this.app.use(errorMiddleware);
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening on http://localhost:${this.port}`);
		});
	}

	public getServer() {
		return this.app;
	}

	private initMiddleware() {
		// Handle Promise Rejections
		process.on('unhandledRejection', (reason) => {
			if(reason){
				console.error('unhandledRejection: ',reason);
			}
		});
		if (this.env) {
			// @ts-ignore
			this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(cors({
        origin: true, // https://www.npmjs.com/package/cors#configuration-options
        credentials: true
      }));
		} else {
      this.app.use(logger('dev'));
      this.app.use(cors({
        origin: true, // https://www.npmjs.com/package/cors#configuration-options
        credentials: true
      }));
    }

		this.app.use(express.text());
	}

	private initRoutes(routes: Routes[]) {
		routes.forEach((route) => {
			const path = route.path || '/';

			if (route.versions) {
				// API versioning; create an endpoint at `/v#/...` for
				//   every version the route supports
				route.versions.forEach((version) => {
					this.app.use(`/v${version}${path}`, route.router);
				});
			} else {
				this.app.use(path, route.router);
			}
		});
	}
}

export default App;