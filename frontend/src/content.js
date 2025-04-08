

if (isAmazonProduct(document.URL)) {
    chrome.runtime.sendMessage({type: "tabInfo", title: getAmazonProductTitle(), seller: "Amazon"});
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


// TODO: wait for ONLY ELEMENTS NEEDED to load before sending