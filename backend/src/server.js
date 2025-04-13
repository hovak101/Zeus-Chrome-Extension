import express from 'express';
import { Parser } from './Parser.js';
import { Scraper } from './Scraper.js';
import { getQuery } from './Queryer.js';
import { withTimeout } from './utils/withTimeout.js'; 

const app = express();
const PORT = process.env.PORT || 3000;
const parser = new Parser();
const scraper = new Scraper();
await scraper.init();

const PROD_TIMEOUT = 10000;

app.use(express.json());

async function addProducts(query, exclude) {
  const promises = [];

  if (exclude !== "Walmart") {
    try {
      promises.push(withTimeout(scraper.getWalmartProducts(query), PROD_TIMEOUT));
    } catch(err) {
      console.log("getWalmartProducts: ", err);
    }
  }
  if (exclude !== "Amazon") {
    try {
      promises.push(withTimeout(scraper.getAmazonProducts(query), PROD_TIMEOUT));
    } catch (err) {
      console.log("getAmazonProducts: ", err);
    }
  }
  if (exclude !== "Ebay") {
    try {
      promises.push(withTimeout(scraper.getEbayProducts(query), PROD_TIMEOUT));
    } catch (err) {
      console.log("getEbayProducts: ", err);
    }
  }
  if (exclude !== "Target") {
    try {
      promises.push(withTimeout(scraper.getTargetProducts(query), PROD_TIMEOUT));
    }
    catch (err) {
      console.log("getTargetProducts: ", err);
    }
  }

  const results = await Promise.allSettled(promises);

  const products = [];
  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      const product = parser.parseProduct(result.value);
      products.push(product);
    }
  });

  return products;
}

// timeout after 20 seconds
app.post('/scrape', async (req, res) => {
  try {
    const name = req.body.name;
    const exclude = req.body.exclude;
    const query = await getQuery({ name: name });
    const products = await withTimeout(addProducts(query, exclude), 20000);
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