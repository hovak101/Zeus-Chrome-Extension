import express from 'express';
import { TestParser } from './TestParser.js';
import { TestScraper } from './TestScraper.js';
const app = express();
const PORT = process.env.PORT || 3000;
const parser = new TestParser();
const scraper = new TestScraper();

app.use(express.json());

async function addProducts(name, exclude) {
  console.log("in addProducts function");
  const promises = [];

  if (exclude !== "Walmart") {
    promises.push(scraper.getWalmartProducts(name));
  }
  if (exclude !== "Amazon") {
    promises.push(scraper.getAmazonProducts(name));
  }
  if (exclude !== "Ebay") {
    promises.push(scraper.getEbayProducts(name));
  }
  if (exclude !== "Target") {
    promises.push(scraper.getTargetProducts(name));
  }

  const results = await Promise.allSettled(promises);

  const products = [];
  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      const product = parser.parseProduct(result.value);
      products.push(product);
    }
  });

  console.log(products);
  return products;
}

// timeout after 20 seconds
app.post('/scrape', async (req, res) => {
  console.log("in post function");
  try {
    const name = req.body.name;
    const exclude = req.body.exclude;

    console.log("in post function 2");
    const products = await addProducts(name, exclude);
    res.json({
      productInfo: products
    });
  } catch (err) {
    console.error("Failed to load config:", err);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});