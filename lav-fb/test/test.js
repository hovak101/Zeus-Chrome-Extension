import fetch from "node-fetch";

const url = "http://127.0.0.1:5001/lav-fb/us-central1/processProduct";

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