const body = document.querySelector("body");

// create port for communicating with background script(s)
const myPort = chrome.runtime.connect({name: "content-script-port"});

// link CSS stylesheet
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = chrome.runtime.getURL('style.css');
document.head.appendChild(cssLink);

// assets
const mulchImage = chrome.runtime.getURL('assets/mulch2.jpeg');
const hawkTuahAudio = new Audio(chrome.runtime.getURL('assets/hawktuahTrim.mp3'));
const mangoAudio = new Audio(chrome.runtime.getURL('assets/mangos.mp3'));
const mulchAudio = new Audio(chrome.runtime.getURL('assets/mulch.mp3'));

// turns the cursor into mango trollface
body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`

// silly stuff that happens when interacting with buttons
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    // mouse over button -> hawk tuah
    button.addEventListener("mouseover", () => {
        playHawkTuahAudio();
    });
    // click button -> mango
    button.addEventListener('click', () => {
        playMangoAudio();
    });
    // mouse leaves button -> mulch gang for life
    button.addEventListener('mouseout', () => {
        mulchImageRandom();
    })
});

function playMangoAudio() {
    mangoAudio.currentTime = 6;
    mangoAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("Mangooooo");
    // song pauses after 4 seconds (or 9 if you start from beginning)
    setTimeout(() => {
        mangoAudio.pause();
    }, 9000);
}

function playHawkTuahAudio() {
    // Hawk tuah spit on that thing :3
    hawkTuahAudio.currentTime = 0;
    hawkTuahAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    // debug
    console.log("Spit on that thing");
    myPort.postMessage({brainrot_increment: 1});
}

// function that pops out with the mulch image
function mulchImageRandom() {
    const image = document.createElement('img');
    image.src = mulchImage;
    image.className = 'mulch-image';

    mulchAudio.currentTime = 0;
    mulchAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("Mulch gang for life!!!");
    console.log("Mulch image URL: ", mulchImage);

    document.body.appendChild(image);
    // image is gone after 5 seconds
    setTimeout(()=> {
        image.remove();
    }, 5000);
};


