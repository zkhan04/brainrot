const UPGRADE_STAGE_ALARM_NAME = "upgrade";

chrome.runtime.onInstalled.addListener(({reason}) => {
    console.log(reason);
    if (reason === 'install' || reason === 'update') {
        chrome.storage.local.set({
            stage: 0
        });
        createAlarm();
    }
});

// create an alarm i guess
async function createAlarm() {
    const alarm = await chrome.alarms.get(UPGRADE_STAGE_ALARM_NAME);
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(UPGRADE_STAGE_ALARM_NAME, {
            delayInMinutes: 0,
            periodInMinutes: 1
        })
    }
}

const updateStage = async () => {
    const current_stage = await chrome.storage.local.get("stage");
    console.log(current_stage);
    chrome.storage.local.set({stage: current_stage.stage + 1});
}

chrome.alarms.onAlarm.addListener(updateStage);
