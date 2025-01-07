chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.runtime.sendMessage({type: "requestData", tab_id: tabs[0].id}, (response) => {
        document.getElementById('itemName').textContent = response;
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.runtime.sendMessage({type: "requestData", tab_id: tabs[0].id}, (response) => {
                document.getElementById('itemName').textContent = response;
            });
        });
    }
});