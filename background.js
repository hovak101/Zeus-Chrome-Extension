
// status codes:
// 1: ready
// 2: loading
// 3: product not found in our databases
// 4: product not detected on this page

// if content script can't be injected, and it exists in our database, remove tab id. 
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // add tab id to chrome.storage with "loading" preset
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
                    // TODO: instead of removing it, add the tab id to the chrome.storage
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
        chrome.storage.local.set({[tabIDKey]: {title: message.title, data: null, status_code: 2}});

        fetch("https://processproduct-udl2fj7poq-uc.a.run.app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: message.title })
          })
            .then(res => res.json())
            .then(data => {
                chrome.storage.local.set({[tabIDKey]: {title: message.title, data: data.data, status_code: 1}});
            });

        // simulation: 
        // console.log("simualting expensive operation");
        // setTimeout(() => {
        //     console.log("finished simulation");
        //     chrome.storage.local.set({[tabIDKey]: {title: message.title, status_code: 1}});
        // }, 3000);

    }
    else if (message.type === 'productNotDetected') {
        let tabIDKey = "tab_" + sender.tab.id;
        chrome.storage.local.set({[tabIDKey]: {title: 'N/A', data: null, status_code: 4}})
    }
    else if (message.type === 'requestData') {
        let tabIDKey = "tab_" + message.tab_id;
        chrome.storage.local.get([tabIDKey], (result) => {
            if (result[tabIDKey]) {
                sendResponse(result[tabIDKey]);
            }
            else {
                // default behavior
                sendResponse({title: 'N/A', status_code: 4});
            }
        });

        return true;
    }
});

// TODO: Change all instances of chrome.storage.local to chrome.storage.session when done testing

