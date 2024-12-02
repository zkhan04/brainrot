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

const updateStage = async (brainrot_increment) => {
    const current_stage = await chrome.storage.local.get("brainrot_points");
    chrome.storage.local.set({brainrot_points: current_stage.brainrot_points + brainrot_increment});
    
    // for debugging
    console.log(current_stage.brainrot_points + brainrot_increment);
}

let content_script_port;
let shop_script_port;
const connected = (p) => {
    port = p;

    if (p.name === "dumb-script-port") {
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

function contentScriptListener(m) {
    updateStage(m.brainrot_increment);
}

function shopScriptListener(m) {
    // add it to list of effects
    content_script_port.postMessage({"effect": m.effect});
    console.log(m.effect);
}