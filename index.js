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
const kneeSurgeryImage = chrome.runtime.getURL('assets/knee_surgery.jpeg');
const kneeSurgeryAudio = new Audio(chrome.runtime.getURL('assets/knee_surgery.mp3'));
const diddyAudio = new Audio(chrome.runtime.getURL('assets/diddy_audio.mp3'));
const mustardAudio = new Audio(chrome.runtime.getURL('assets/mustard.mp3'));


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
        playAudio(hawkTuahAudio, "Spit on that thing");
        myPort.postMessage({brainrot_increment: 1});
    });
    // click button -> zib zab zib zab
    button.addEventListener('click', () => {
        playAudio(aliensAudio, "Zib zab zib zab");
    });
    // mouse leaves button -> mulch gang for life
    button.addEventListener('mouseout', () => {
        // displayImage(mulchImage, "mulch-image", 5000, playMulchAudio);
        // displayImage(lunchlyImage, "lunchly-image", 6000, playThickOfIt);
        displaySubwaySurfers();
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

function playDiddyAudio() {
    playAudio(diddyAudio, "Why they recommending me Diddy");
}

function playMustardAudio() {
    playAudio(mustardAudio, "MUSTARDDDDD");
}

function playKneeSurgery() {
    playAudio(kneeSurgeryAudio, "That feeling when :3");
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

function displaySubwaySurfers() {

    const subwaySurfersVideo = document.createElement("video");
    const videoPath = chrome.runtime.getURL("assets/subway_surfers.mp4");
    subwaySurfersVideo.setAttribute("src", videoPath);
    subwaySurfersVideo.setAttribute("autoplay", "true");
    subwaySurfersVideo.setAttribute("muted", "true");
   
    subwaySurfersVideo.className = 'subway_surfers-video';

    subwaySurfersVideo.onerror = () => {
        console.error("Video failed to load. Check the URL and file format.");
    };

    console.log(chrome.runtime.getURL("assets/subways_surfers.mp4"));


    document.body.appendChild(subwaySurfersVideo);

    setTimeout(() => {
        subwaySurfersVideo.remove()
    }, 9000);
}

function displayKneeSurgery() {
    displayImage(kneeSurgeryImage, "knee-surgery", 5000);
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
// list of common brainrot words
const brainrotWords = [
    "rizz", "skibidi", "gyatt", "fanum tax", "sigma", "huzz", "rizzler", "aura", "ohio",
    "english or spanish", "aura", "hawk tuah", "talk tuah", "alpha", "put the fries in the bag"
]
// random brainrot word
function getRandomBrainrotWord() {
    const randomIndex = Math.floor(Math.random() * brainrotWords.length);
    return brainrotWords[randomIndex]
}
// replaces text on page
function replaceTextOnPage(from, to){
    getAllTextNodes().forEach(function(node){
      node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);
    });
  
    function getAllTextNodes(){
      var result = [];

      // to not mess up with other elements on page

      const excludedTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "IGRAME", "TEXTAREA", "INPUT", "BUTTON"]);
  
      (function scanSubTree(node){
        if(node.nodeType == Node.TEXT_NODE) {
            if(!excludedTags.has(node.parentNode.tagName)) {
                result.push(node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && !excludedTags.has(node.tagName)) {
            for(var i = 0; i < node.childNodes.length; i++) 
                scanSubTree(node.childNodes[i]);
        }
        /*
        if(node.childNodes.length) 
          for(var i = 0; i < node.childNodes.length; i++) 
            scanSubTree(node.childNodes[i]);
        else if(node.nodeType == Node.TEXT_NODE) 
          result.push(node);
        */
      })(document.body);
  
      return result;
    }
    function quote(str){
      return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
  }
// common words getting replaced with brainrot 
replaceTextOnPage('and', getRandomBrainrotWord());
replaceTextOnPage('or', 'aura');
replaceTextOnPage('the', getRandomBrainrotWord());
replaceTextOnPage('an', getRandomBrainrotWord());
replaceTextOnPage('he', 'rizzler');
replaceTextOnPage('she', 'huzz');
replaceTextOnPage('they', 'ohio');


