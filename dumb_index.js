// define assets
// assets
const hawkTuahAudio = new Audio(chrome.runtime.getURL('assets/hawktuahTrim.mp3'));

// create port for communicating with background script(s)
const myPort = chrome.runtime.connect({name: "dumb-script-port"});

// useful HTML elements
const body = document.querySelector("body");
const buttons = document.querySelectorAll("button")

// link CSS stylesheet
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = chrome.runtime.getURL('style.css');
document.head.appendChild(cssLink);

// for getting brainrot points
buttons.forEach(button => {
    // mouse over button -> hawk tuah
    button.addEventListener("mouseover", () => {
        myPort.postMessage({brainrot_increment: 1});
    });
});



// applies all brainrot effects in storage
async function applyEffects() {
    const allEffects = await chrome.storage.local.get("effects");
    if (allEffects.effects) {
        allEffects.effects.forEach((effect) => {
            effectActivationFunctions[effect]();
        })
    }
}


// if a list is in storage, add to the list
async function appendToStorage(key, item) {
    const result = await chrome.storage.local.get(key);
    let currentList;
    if (result[key]) {
        currentList = result[key]
    } else {
        currentList = []
    }

    currentList.push(item);

    await chrome.storage.local.set({[key]: currentList});
}

// handles messages from the shop
function shopMessageListener(m) {
    const effect = m.effect;
    appendToStorage("effects", m.effect);

    effectActivationFunctions[effect]();
}

// --------------------------------------COOL FRONT END STUFF----------------------------------------
// dict for easily calling activation functions
const effectActivationFunctions = {
    "hawk tuah audio": activateHawkTuahAudio,
    "mango cursor": activateCursorListener
};

function playAudio(audio, message, timeout=null) {
    audio.currentTime = 0;
    audio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log(message);
    if (timeout) {
        setTimeout(() => {
            audio.pause();
        }, timeout);
    }
}

// activation functions
function activateHawkTuahAudio() {
    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            playAudio(hawkTuahAudio, "spit on that thang!");
        })
    })
}

function activateAliensAudio() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            playAudio(aliensAudio, "Zib zab zib zab", 5000);
        })
    })
}

function activateVineAudio() {
    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            playAudio(vineAudio, "How nostalgic", 4000);
        })
    })
}

function activateLostDawgAudio() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            playAudio(lostDawgAudio, "I just lost my dawggggg. No more Rod Wave", 5000);
        })
    })
}

function activateMustardAudio() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            playAudio(hawkTuahAudio, "spit on that thang!");
        })
    })
}

function activateDiddyAudio() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            playAudio(hawkTuahAudio, "spit on that thang!");
        })
    })
}

function activateMulchImage() {
    buttons.forEach(button => {
        button.addEventListener("mouseout", () => {
            displayImage(mulchImage, "mulch-image", 5000, playMulchAudio);
        })
    })
}

function activateKneeSurgeryImage() {
    buttons.forEach(button => {
        button.addEventListener("mouseout", () => {
            displayImage(kneeSurgeryImage, "knee-surgery", 5000, playKneeSurgery);
        })
    })
}

function activateBalkanRageImage() {
    buttons.forEach(button => {
        button.addEventListener("mouseout", () => {
            displayImage(balkanRageImage, "balkan-image", 5000, playMangoAudio);
        })
    })
}

function activateCostcoGuysImage() {
    buttons.forEach(button => {
        button.addEventListener("mouseout", () => {
            displayCostcoGuys();
        })
    })
}

function activateSubwaySurfersVideo() {
    buttons.forEach(button => {
        button.addEventListener("mouseout", () => {
            displaySubwaySurfers();
        })
    })
}

function activateCursorListener() {
    body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`
}
// -----------------------------------END OF FRONT END STUFF--------------------------------------------
myPort.onMessage.addListener((m) => shopMessageListener(m));
// apply effects that should already be there
applyEffects();