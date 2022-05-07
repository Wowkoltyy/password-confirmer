let previous = 0

chrome.storage.sync.get(["enabled"], (e) =>{
    if(!e.enabled)updateToggle(false)
})  

chrome.tabs.onActivated.addListener(tab => {
    chrome.storage.sync.get('enblead', (e) =>{
        if(e){
            chrome.scripting.executeScript({
                target:{
                    tabId: tab.tabId
                }, 
                files: ["confirmer.js"]
            })
            chrome.scripting.executeScript({
                target:{
                    tabId: previous
                }, 
                files: ["disable_confirmer.js"]
            })
        }
    })
})

chrome.tabs.onUpdated.addListener(tabId => {
    chrome.storage.sync.get('enblead', (e) =>{
        if(e){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if(tabs[0].id === tabId){
                    chrome.scripting.executeScript({
                        target:{
                            tabId: tabId
                        }, 
                        files: ["confirmer.js"]
                    })
                    previous = tabId
                }
           
             })
        }
    })
})


function start(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target:{
                tabId: tabs[0].id
            }, 
            files: ["confirmer.js"]
        })
    })
}

function stop(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target:{
                tabId: tabs[0].id
            }, 
            files: ["disable_confirmer.js"]
        })
    })
}


function updateToggle(enabled = false){
    chrome.storage.sync.set({enabled: enabled})
    if(enabled)return start()
    stop()
}


function onMessage(message, sender, sendResponse){
    switch(message.action){
        case 'updateToggle':
            updateToggle(message.args)
            break
        case 'getToggle':
            chrome.storage.sync.get(["enabled"], (e) =>{
                sendResponse(e.enabled)
            })
            
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    onMessage(message, sender, sendResponse)

    return true
})

