
import { Router } from 'express';

interface Route {
	path?: string;
	router: Router;
	versions?: number[];
}

export default Route;