chrome.runtime.onInstalled.addListener(({reason}) => {
    console.log(reason);
    if (reason === 'install' || reason === 'update') {
        chrome.storage.local.set({
            brainrot_points: 0
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
const connected = (p) => {
    port = p;

    if (p.name === "content-script-port") {
        p.onMessage.addListener((m) => {
            contentScriptListener(m);
        })
    }

    else if (p.name === "shop-script-port") {
        p.onMessage.addListener((m) => {
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
    console.log(m.effect);
}