import type { FastifyRequest, FastifyReply } from 'fastify';
import { scrapeSynergyChampions } from '../services/scrapper';

interface urlString {
	url?: string;
}

export const getJungle = async (
	request: FastifyRequest<{ Querystring: urlString }>,
	reply: FastifyReply,
) => {
	try {
		const url = 'https://www.leagueofgraphs.com/champions/counters/aatrox';

		if (typeof url !== 'string' || !url.startsWith('http')) {
			reply.status(400).send({ error: 'URL inválida!' });
			return;
		}

		const result = await scrapeSynergyChampions(url);

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
