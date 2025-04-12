import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

async function addProducts(name, exclude) {
  const promises = [];
  console.log(exclude);
  if (exclude !== "Walmart") {
    promises.push(getWalmartInfo(name));
  }
  if (exclude !== "Amazon") {
    promises.push(getAmazonInfo(name));
  }
  if (exclude !== "Ebay") {
    promises.push(getEbayInfo(name));
  }
  if (exclude !== "Target") {
    promises.push(getTargetInfo(name));
  }

  const results = await Promise.allSettled(promises);

  const products = [];
  results.forEach((result) => {
    if (result.status === "fulfilled" && result.value) {
      products.push(result.value);
    }
  });

  return products;
}

app.get('/scrape', async (req, res) => {
  try {
    const name = req.body.name;
    const exclude = req.body.exclude;

    products = await addProducts(name, exclude);
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