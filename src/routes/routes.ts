import type { FastifyInstance } from 'fastify';
import { getJungle } from '../controllers/controller';

export const routes = async (fastify: FastifyInstance) => {
	fastify.get('/toplaner/jungle', getJungle);
};
