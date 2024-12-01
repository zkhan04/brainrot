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
const aliensAudio = new Audio(chrome.runtime.getURL('assets/aliens.mp3'));
const mulchAudio = new Audio(chrome.runtime.getURL('assets/mulch.mp3'));
const theRizlerGif = chrome.runtime.getURL('assets/therizzler.gif');
const costcoGuysImg = chrome.runtime.getURL('assets/Costco.jpeg');
const costcoBoomAudio = new Audio(chrome.runtime.getURL('assets/costcoGuys.mp3'));
const balkanRageImage = chrome.runtime.getURL('assets/balkanRage.jpeg');
const mangoAudio = new Audio(chrome.runtime.getURL('assets/mangos.mp3'));
const vineAudio = new Audio(chrome.runtime.getURL('assets/vine.mp3'));
const lostDawgAudio = new Audio(chrome.runtime.getURL('assets/justlostmydawg.mp3'));
const thickofItAudio = new Audio(chrome.runtime.getURL('assets/thickofit.mp3'));
const lunchlyImage = chrome.runtime.getURL('assets/lunchly.jpeg');

// turns the cursor into mango trollface
body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`

// confirm audio can be played
document.addEventListener('click', () => {
    console.log("Clicked paged, audio is allowed!");
});

// silly stuff that happens when interacting with buttons
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    // mouse over button -> hawk tuah
    button.addEventListener("mouseover", () => {
        playHawkTuahAudio();
    });
    // click button -> zib zab zib zab
    button.addEventListener('click', () => {
        playAliensAudio();
    });
    // mouse leaves button -> mulch gang for life
    button.addEventListener('mouseout', () => {
        // displayMulchImageRandom();
        displayLunchly();
        // DisplayCostcoGuys();
    })
});

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

// plays aliens audio
function playAliensAudio() {
    playAudio(aliensAudio, "Zib zab zib zab");
}
// plays hawk tuah audio
function playHawkTuahAudio() {
    playAudio(hawkTuahAudio, "Spit on that thing");
    myPort.postMessage({brainrot_increment: 1});
}

function playMulchAudio() {
    playAudio(mulchAudio, "Mulch gang for life!!!");
}

function playCostcoAudio() {
    playAudio(costcoBoomAudio, "WE BRING THE BOOMMM", 6000);
}

function playMangoAudio() {
    playAudio(mangoAudio, "balkan rage german stare mexican wave jamaican smile", 5000);
}

function playThickOfIt() {
    playAudio(thickofItAudio, "I'm in the thick of it", 6000);
}

// vine boom audio
function playVineBoom() {
    playAudio(vineAudio, "How nostalgic", 4000);
}

// i just lost my dawg audio 
function playLostDogAudio() {
    playAudio(lostDawgAudio, "I just lost my dawggggg. No more Rod Wave", 5000);
    myPort.postMessage({brainrot_increment: 1});
}

function displayImage(imagePath, className, timeout, audioCallback=null) {
    const image = document.createElement('img');
    image.src = imagePath;
    image.className = className;

    if (audioCallback) {
        audioCallback();
    }

    document.body.appendChild(image);
    // image and audio are gone after 5 seconds
    setTimeout(()=> {
        image.remove();
    }, timeout);
}

// displays costco guys and rizzler images 
// this is a unique one, not gonna bother trying to abstract it lol
function displayCostcoGuys() {
    const costGuysImage = document.createElement('img');
    const rizzlerImage = document.createElement('img');

    costGuysImage.src = costcoGuysImg;
    rizzlerImage.src = theRizlerGif;

    costGuysImage.className = 'costco-image';
    rizzlerImage.className = 'rizzler-gif';

    costcoAudio();

    console.log("Boom!: ", costcoGuysImg);
    console.log("Chat is this rizz!: ", theRizlerGif);

    document.body.appendChild(rizzlerImage);

    setTimeout(()=> {
        rizzlerImage.remove();
        document.body.appendChild(costGuysImage);
        setTimeout(() => {
            costGuysImage.remove();
            costcoAudio.pause();
        }, 9000);
    }, 3000);
}
// balkan rage image 
function displayBalkanRage() {
    displayImage(balkanRageImage, "balkan-image", 5000);
}

// lunchly image
function displayLunchly() {
    displayImage(lunchlyImage, "lunchly-image", 6000, playThickOfIt);
}

function displayMulchImageRandom() {
    displayImage(mulchImage, "mulch-image", 5000, playMulchAudio);
};

/*
function RedOverlay(lunchlyImage) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-div';

    const lunchlyImg = document.createElement('img');
    lunchlyImg.src = lunchlyImage;
    lunchlyImg.className = 'lunchly-image';

    overlay.appendChild(lunchlyImg);
    document.body.appendChild(overlay);

    PlayThickOfIt();

    console.log("Ewww mold, thank you Mr.Beast");
    console.log("Lunchly image: ", lunchlyImage);

    setTimeout(() => {
        overlay.remove()
    }, 9000);

}
*/


