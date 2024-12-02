const body = document.querySelector("body");

// create port for communicating with background script(s)
const myPort = chrome.runtime.connect({name: "dumb-script-port"});

// link CSS stylesheet
const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = chrome.runtime.getURL('style.css');
document.head.appendChild(cssLink);

const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
    // mouse over button -> hawk tuah
    button.addEventListener("mouseover", () => {
        myPort.postMessage({brainrot_increment: 1});
    });
});

function activateCursorListener(m) {
    console.log("received message!")
    body.style.cursor = `url(${chrome.runtime.getURL('assets/mango.png')}),auto`
}

myPort.onMessage.addListener((m) => activateCursorListener(m))