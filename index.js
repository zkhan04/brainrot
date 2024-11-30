const body = document.querySelector("body");

body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`

const hawkTuahAudio = new Audio(chrome.runtime.getURL('assets/hawktuahTrim.mp3'));
const mangoAudio = new Audio(chrome.runtime.getURL('assets/mangos.mp3'));
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
});



