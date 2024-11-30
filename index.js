const body = document.querySelector("body");

body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`

const mulchImage = chrome.runtime.getURL('assets/mulch2.jpeg');
const hawkTuahAudio = new Audio(chrome.runtime.getURL('assets/hawktuahTrim.mp3'));
const mangoAudio = new Audio(chrome.runtime.getURL('assets/mangos.mp3'));
const mulchAudio = new Audio(chrome.runtime.getURL('assets/mulch.mp3'));
const buttons = document.querySelectorAll("button")

buttons.forEach(button => {
    
    button.addEventListener("mouseover", () => {
        // Hawk tuah spit on that thing :3
        hawkTuahAudio.currentTime = 0;
        hawkTuahAudio.play().catch((err) => {
            console.error("Error with audio: ", err);
        });
        // debug
        console.log("Spit on that thing");
    });
    
    button.addEventListener('click', () => {
        mangoAudio.currentTime = 6;
        mangoAudio.play().catch((err) => {
            console.error("Error with audio: ", err);
        });
        console.log("Mangooooo");
    });

    button.addEventListener('mouseout', () => {
        mulchImageRandom();
    })
});

function mulchImageRandom() {
    const image = document.createElement('img');
    image.src = mulchImage;

    mulchAudio.currentTime = 0;
    mulchAudio.play().catch((err) => {
        console.error("Error with audio: ", err);
    });
    console.log("Mulch gang for life!!!");
    console.log("Mulch image URL: ", mulchImage);

    image.style.position = 'fixed';
    image.style.top = '100px';
    image.style.left = '100px';
    image.style.zIndex = '9999';

    document.body.appendChild(image);

    setTimeout(()=> {
        image.remove();
    }, 5000);
};


