const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 44 + i);
const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );
    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${sum}`);
    grandTotal += sum;
  }

  console.log(`Grand Total: ${grandTotal}`);
  await browser.close();
})();
