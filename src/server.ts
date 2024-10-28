import fastify, { type FastifyInstance } from 'fastify';
import { routes } from './routes/routes';

const app: FastifyInstance = fastify({ logger: true });

app.register(routes);

app.listen({ port: 8080 }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server is running on ${address}`);
});
