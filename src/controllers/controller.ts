import type { FastifyRequest, FastifyReply } from 'fastify';
import { findJunglers } from '../services/service';

interface ChampionQuery {
	championName?: string;
}

export const getTop = async (
	request: FastifyRequest<{ Querystring: ChampionQuery }>,
	reply: FastifyReply,
) => {
	try {
		const { championName } = request.query;

		if (!championName || typeof championName !== 'string') {
			reply
				.status(400)
				.send({ error: 'Nome do campeão é inválido ou não fornecido!' });
			return;
		}

		const url = `https://www.leagueofgraphs.com/champions/counters/${championName}`;

		const result = await findJunglers(url);

		if (!result) {
			reply.status(500).send({ error: 'Falha no scraping.' });
			return;
		}

		reply.send({ data: JSON.parse(result) });
	} catch (error) {
		console.error('Erro no controller:', error);
		reply.status(500).send({ error: 'Erro interno no servidor.' });
	}
};
