import type { FastifyInstance } from 'fastify';
import { getTop } from '../controllers/controller';

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/jungle/top', getTop);
};
