// backend/server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running on Railway!');
});

// Example scraping route (placeholder for now)
app.get('/scrape', async (req, res) => {
  res.json({ message: 'Scraping logic goes here' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});