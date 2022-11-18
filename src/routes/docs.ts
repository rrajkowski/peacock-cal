import { Router } from 'express';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';

import Route from '../interfaces/routes';
import { stripIndent } from '../utils/strings';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options = {
	swaggerDefinition: {
		openapi: '3.0.1',
		consumes: ["application/json", "text/plain"],
		produces: ["application/json", "text/plain"],
		schemes: ["http", "https"],
		servers: [{url: `/v1`}],
		info: {
			title: 'Peacock Cal API',
			version: '1.0.0',
			description: stripIndent(`
				REST API documentation - All endpoints must be prefixed with an API version, e.g. '/v1/...'
			`),
		},
		components: {
			securitySchemes: {
			}
		},
		security: [{
			BearerAuth: []
		}],
		tags: [{
			name: 'default',
			description: 'Miscellaneous endpoints for testing & validation.'
		},{
			name: 'external',
			description: 'Generic proxy endpoints for external services & APIs.'
		}]
	},
	apis: ['./src/routes/*.ts']
};

const uiOptions: SwaggerUiOptions = {
	customCss: '.swagger-ui .topbar { display: none }'
};


class SwaggerRoute implements Route {

	public path = "/docs";
	public router = Router();

	constructor() {
		const specs = swaggerJSDoc(options);
		this.router.use('/', swaggerUI.serve, swaggerUI.setup(specs, uiOptions));
	}

}

export default SwaggerRoute;
