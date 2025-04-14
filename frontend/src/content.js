

if (isAmazonProduct(document.URL)) {
    chrome.runtime.sendMessage({type: "tabInfo", title: getAmazonProductTitle(), seller: "Amazon"});
    addFloatingDiv();
}
else {
    chrome.runtime.sendMessage({type: "productNotDetected"})
}

function getAmazonProductTitle() {
    return document.getElementById("productTitle").textContent;
}

function isAmazonProduct(URL) {
    const regex = /.*www.amazon.com\/.*\/dp\/.*/
    return regex.test(URL)
}


function addFloatingDiv() {
    const floatDiv = document.createElement("div");
    floatDiv.id = "my-floating-div";

    // Create image (bolt.svg)
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("Bolt.svg"); // Comes from public/
    img.alt = "bolt";
    img.style.width = "24px";
    img.style.height = "24px";
    img.style.marginRight = "8px";

    // Create text element
    const text = document.createElement("span");
    text.textContent = "Zeus detected a product!";
    text.style.fontFamily = "'Lora', serif";
    text.style.fontSize = "20px";
    text.style.color = "#f3f4f6"

    // Add font-face dynamically from public/fonts
    const style = document.createElement("style");
    style.textContent = `
        @font-face {
            font-family: 'Lora';
            src: url(${chrome.runtime.getURL("Lora-VariableFont_wght.ttf")}) format('truetype');
            font-weight: 100 900;
            font-style: normal;
        }
    `;
    document.head.appendChild(style);

    // Style the floating notification
    Object.assign(floatDiv.style, {
        position: "fixed",
        top: "115px",
        right: "20px",
        backgroundColor: "#111827",
        color: "white",
        padding: "12px 16px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        fontFamily: "'Lora', serif"
    });

    floatDiv.appendChild(img);
    floatDiv.appendChild(text);
    document.body.appendChild(floatDiv);

    // Auto-remove after a few seconds
    setTimeout(() => {
        floatDiv.style.opacity = "0";
        setTimeout(() => floatDiv.remove(), 500);
    }, 5000);
}