function updateVisual() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.runtime.sendMessage({type: "requestData", tab_id: tabs[0].id}, (response) => {
            document.getElementById('itemName').textContent = response.title;
            if (response.status_code === 2) {
                document.getElementById('itemInfo').textContent = "loading";
            }
            else if (response.status_code === 1) {
                document.getElementById('itemInfo').textContent = response.data;
            }
            else {
                document.getElementById('itemInfo').textContent = "";
            }
        });
    });
}

// extension first clicked on
updateVisual();

// any updates to product information in the table
chrome.storage.onChanged.addListener((tabId, changeInfo, tab) => {
    updateVisual();
});