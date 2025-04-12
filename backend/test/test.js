import fetch from "node-fetch";

const url = "https://lav-production-9f70.up.railway.app/scrape";

(async () => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "ps5", exclude: "Target" })
    });

    const data = await res.json();
    console.log("Function response:", data.productInfo);
  } catch (err) {
    console.error("Error calling function:", err);
  }
})();