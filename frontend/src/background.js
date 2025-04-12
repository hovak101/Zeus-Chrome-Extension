
// status codes:
// 1: ready
// 2: loading
// 3: product not found in our databases
// 4: product not detected on this page

// if content script can't be injected, and it exists in our database, remove tab id. 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let tabIDKey = "tab_" + tabId;

    if (changeInfo.status === 'loading') {
        if (tabId) {
            chrome.storage.local.get(tabIDKey, (result) => {
                let record = result[tabIDKey];
    
                // if no record exists, create a new one
                if (!record) {
                    record = {
                        title: 'N/A',
                        products: [],
                        status_code: 2
                    };
                } else {
                    record.status_code = 2;
                }
    
                chrome.storage.local.set({ [tabIDKey]: record });
            });
        }
    }
    // add tab id to chrome.storage with "loading" preset
    if (changeInfo.status === 'complete') {
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
        let tabIDKey = "tab_" + sender.tab.id;
        chrome.storage.local.set({[tabIDKey]: {title: message.title, products: [], status_code: 2}});

        fetch("https://lav-production-9f70.up.railway.app/scrape", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: message.title, exclude: message.seller })
          })
            .then(res => res.json())
            .then(res => {
                if(res.productInfo.length === 0) {
                    chrome.storage.local.set({[tabIDKey]: {title: message.title, products: res.productInfo, status_code: 3}});
                }
                else {
                    chrome.storage.local.set({[tabIDKey]: {title: message.title, products: res.productInfo, status_code: 1}});
                }
            });
    }
    else if (message.type === 'productNotDetected') {
        let tabIDKey = "tab_" + sender.tab.id;
        chrome.storage.local.set({[tabIDKey]: {title: 'N/A', products: [], status_code: 4}})
    }
    else if (message.type === 'requestData') {
        let tabIDKey = "tab_" + message.tab_id;
        chrome.storage.local.get([tabIDKey], (result) => {
            if (result[tabIDKey]) {
                sendResponse(result[tabIDKey]);
            }
            else {
                // default behavior
                sendResponse({title: 'N/A', products: [], status_code: 4});
            }
        });

        return true;
    }
});

