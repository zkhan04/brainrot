const body = document.querySelector("body");

body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`

const button = document.querySelector("button")
const hawkTuahAudio = new Audio(chrome.runtime.getURL('assets/hawktuahTrim.mp3'));

button.addEventListener("mouseover", () => {
    // Hawk tuah spit on that thing :3
    hawkTuahAudio.currentTime = 0;
    hawkTuahAudio.play();
    // debug
    console.log("Spit on that thing");
});