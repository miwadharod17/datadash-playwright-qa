const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  const seeds = [84,85,86,87,88,89,90,91,92,93];

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; // replace with real base URL
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseFloat(cell.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;

    console.log(`Seed ${seed} sum: ${pageSum}`);
  }

  console.log("================================");
  console.log("FINAL TOTAL:", totalSum);
  console.log("================================");

  await browser.close();
})();
