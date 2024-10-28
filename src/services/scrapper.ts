import puppeteer, { type Browser } from 'puppeteer';

export const scrapeSynergyChampions = async (
	url: string,
): Promise<string | null> => {
	let browser: Browser | null = null;

	try {
		// Iniciar o navegador
		browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();

		// Navegar para a URL
		await page.goto(url, { waitUntil: 'networkidle2' });

		// Avaliar a página para capturar os dados da terceira tabela
		const data = await page.evaluate(() => {
			// Selecionar todas as tabelas com a classe 'data_table' e pegar a terceira (índice 2)
			const tables = document.querySelectorAll('table.data_table');
			const thirdTable = tables[2]; // Acessa a terceira tabela

			// Selecionar todas as linhas da tabela (exceto o cabeçalho)
			const rows = Array.from(thirdTable.querySelectorAll('tbody tr'));

			// Mapear os dados para um array de objetos
			return rows.map((row) => {
				// Capturar o nome do campeão
				const championName = row.querySelector('td .name')?.textContent?.trim();

				// Capturar a role do campeão (Mid, Jungler, etc.)
				const championRole = row
					.querySelector('td .txt i')
					?.textContent?.trim();

				// Capturar o winrate do campeão
				// const winRate = row
				// 	.querySelector('progressbar .progressBarTxt')
				// 	?.textContent?.trim();

				return {
					championName,
					championRole,
					// winRate,
				};
			});
		});

		return JSON.stringify(data, null, 2); // Retorna os dados em formato JSON
	} catch (error) {
		console.error('Erro no serviço de scraping:', error);
		return null;
	} finally {
		if (browser) {
			await browser.close();
		}
	}
};
