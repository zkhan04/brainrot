// when we install or update the extension, set points to 0 and effects to empty list
chrome.runtime.onInstalled.addListener(({reason}) => {
    console.log(reason);
    if (reason === 'install' || reason === 'update') {
        chrome.storage.local.set({
            brainrot_points: 0
        });
        chrome.storage.local.set({
            effects: []
        });
    }
});

// changes the amount of points in storage
const updatePointsInStorage = async (brainrot_increment) => {
    const current_stage = await chrome.storage.local.get("brainrot_points");
    chrome.storage.local.set({brainrot_points: current_stage.brainrot_points + brainrot_increment});
    
    // for debugging
    console.log(current_stage.brainrot_points + brainrot_increment);
}

// ports that connect to the content script and shopping script
let content_script_port;
let shop_script_port;

// when a port connects, see which port it is and attach the appropriate listener for incoming messages
const connected = (p) => {
    port = p;

    if (p.name === "content-script-port") {
        content_script_port = p;
        content_script_port.onMessage.addListener((m) => {
            contentScriptListener(m);
        })
    }

    else if (p.name === "shop-script-port") {
        shop_script_port = p;
        shop_script_port.onMessage.addListener((m) => {
            shopScriptListener(m);
        })
    }

    console.log(p.name);
    console.log("connected!")
}

chrome.runtime.onConnect.addListener(connected);

// when the content script sends a message, it'll be for changing the # of brainrot points
function contentScriptListener(m) {
    updatePointsInStorage(m.brainrot_increment);
}

// when shop script sends a message, it'll add an effect
function shopScriptListener(m) {
    if (m.effect) {
        content_script_port.postMessage({"effect": m.effect});
        console.log(m.effect);
    }

    if (m.brainrot_increment) {
        updatePointsInStorage(m.brainrot_increment);
    }
}