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
        // mulchImageRandom();
        DisplayLunchly();
        // DisplayCostcoGuys();
    })
});
// plays aliens audio
function playAliensAudio() {
    aliensAudio.currentTime = 0;
    aliensAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("Zib zab zib zab");
}
// plays hawk tuah audio
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
function PlayMulchAudio() {
    mulchAudio.currentTime = 0;
    mulchAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("Mulch gang for life!!!");
}

// function that pops out with the mulch image
function mulchImageRandom() {
    const image = document.createElement('img');
    image.src = mulchImage;
    image.className = 'mulch-image';

    PlayMulchAudio();

    console.log("Mulch image URL: ", mulchImage);

    document.body.appendChild(image);
    // image is gone after 5 seconds
    setTimeout(()=> {
        image.remove();
    }, 5000);
};



function costcoAudio() {
    costcoBoomAudio.currentTime = 0;
    costcoBoomAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("WE BRING THE BOOMMM");
    setTimeout(()=> {
        costcoAudio.pause();
    }, 6000);
}

function PlayMangoAudio() {
    mangoAudio.currentTime = 0;
    mangoAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("balkan rage german stare mexican wave jamaican smile");
    setTimeout(()=> {
        mangoAudio.pause();
    }, 5000);
}

// displays costco guys and rizzler images 
function DisplayCostcoGuys() {
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
function DisplayBalkanRage() {
    const Balkanimage = document.createElement('img');
    Balkanimage.src = balkanRageImage;
    Balkanimage.className = 'balkan-image';

    
    console.log("Balkan rage: ", balkanRageImage);

    document.body.appendChild(Balkanimage);
    // image and audio are gone after 5 seconds
    setTimeout(()=> {
        Balkanimage.remove();
    }, 5000);
}
// vine boom audio
function PlayVineBoom() {
    vineAudio.currentTime = 0;
    vineAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("How nostalgic");
    setTimeout(()=> {
        vineAudio.pause();
    }, 4000);
}
// i just lost my dawg audio 
function PlayLostDogAudio() {
    lostDawgAudio.currentTime = 0;
    lostDawgAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    // debug
    console.log("I just lost my dawggggg. No more Rod Wave");
    setTimeout(()=> {
        lostDawgAudio.pause();
    }, 5000);
    myPort.postMessage({brainrot_increment: 1});
}
// thick of it audio 
function PlayThickOfIt() {
    thickofItAudio.currentTime = 0;
    thickofItAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("I'm in the thick of it");
    setTimeout(() => {
        thickofItAudio.pause();
    }, 6000);
}
// lunchly image

function DisplayLunchly() {
    const lunchlyImg = document.createElement('img');
    lunchlyImg.src = lunchlyImage;
    lunchlyImg.className = 'lunchly-image';

    PlayThickOfIt();

    console.log("Ewww mold, thank you Mr.Beast");
    console.log("Lunchly image: ", lunchlyImage);

    document.body.appendChild(lunchlyImg);
    setTimeout(()=> {
        lunchlyImg.remove();
    }, 6000);
}

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


