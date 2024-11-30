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
    content_script_port = p;
    
    content_script_port.onMessage.addListener((m) => {
        updateStage(m.brainrot_increment);
    });

    console.log("connected!")
}

chrome.runtime.onConnect.addListener(connected);