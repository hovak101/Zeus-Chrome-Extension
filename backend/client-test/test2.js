import fetch from 'node-fetch';

async function runFetch() {
  try {
    const res = await fetch("http://localhost:3000/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "ps5", exclude: "Target" })
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("the error:", err);
  }
}

runFetch();