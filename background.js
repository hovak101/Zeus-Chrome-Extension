
// status codes:
// 1: ready
// 2: loading
// 3: product not found in our databases
// 4: product not detected on this page

// if content script can't be injected, and it exists in our database, remove tab id. 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        let tabIDKey = "tab_" + tabId;
        chrome.scripting.executeScript(
            {
                target: { tabId: tabId },
                files: ['content.js'],
            },
            () => {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError);
                    chrome.storage.local.get(tabIDKey, (result) => {
                        if (result[tabIDKey]) {
                            chrome.storage.local.remove(tabIDKey);
                        }
                    });
                }
            }
        );
    }
});

// if tab is closed, remove from table
chrome.tabs.onRemoved.addListener((tabId) => {
    let tabIDKey = "tab_" + tabId;
    chrome.storage.local.remove(tabIDKey); 
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'tabInfo') {
        // Store the data by tab ID
        let tabIDKey = "tab_" + sender.tab.id;
        chrome.storage.local.set({[tabIDKey]: {title: message.title, status_code: 1}});
    }
    else if (message.type === 'productNotDetected') {
        let tabIDKey = "tab_" + sender.tab.id;
        chrome.storage.local.set({[tabIDKey]: {title: 'N/A', status_code: 4}})
    }
    else if (message.type === 'requestData') {
        // Get the data by tab ID
        let tabIDKey = "tab_" + message.tab_id;
        chrome.storage.local.get([tabIDKey], (result) => {
            sendResponse(result[tabIDKey].title);
        });

        return true;
    }
});

// TODO: Change all instances of chrome.storage.local to chrome.storage.session when done testing

