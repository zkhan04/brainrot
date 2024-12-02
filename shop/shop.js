// state variable
let currentPoints;

// port for communicating with background script
const myPort = chrome.runtime.connect({name: "shop-script-port"});

const body = document.querySelector("body");

// shows the user amount of points they have
const pointsDiv = document.createElement("div");

pointsDiv.classList.add("points");

body.appendChild(pointsDiv);

// adds a brainrot effect to the shop
function createShopItem(effect_name, points) {
    const itemDiv = document.createElement("div");
    const buyButton = document.createElement("button");

    buyButton.classList.add("buy-effect-button");
    itemDiv.classList.add("shop-item");

    itemDiv.innerHTML = effect_name;
    buyButton.innerHTML = points;

    // if the user clicks the buy button and they have enough points:
    buyButton.addEventListener("click", () => {
        if (currentPoints >= points) {
            // tell the background script that an effect was applied, and to reduce number of brainrot points
            myPort.postMessage({"effect": effect_name, "brainrot_increment": -1 * points});
            
            // display new amount of points
            updatePointsDiv(points);

            // remove effect from shop
            itemDiv.remove();
        }
    })

    itemDiv.appendChild(buyButton);

    return itemDiv;
}

// current list of effects!
const effects = {
    "mango cursor": 100,
    "aliens audio": 150,
    "subway surfers": 200,
    "vine audio": 250,
    "replace words": 300,
}

// holds all the shop effects
const shopDiv = document.createElement("div");
shopDiv.classList.add("shop");

// checks whatever effects are already active, only adds the effects that aren't 
// active to the shop
chrome.storage.local.get("effects").then((result) => {
    const effectsInStorage = result.effects || [];
    Object.entries(effects).forEach(([effect_name, points]) => {
        if (!effectsInStorage.includes(effect_name)) {
            const itemDiv = createShopItem(effect_name, points);
            shopDiv.appendChild(itemDiv);
        }
    });
});

body.appendChild(shopDiv);

// loads the amount of points from storage (done when we open the shop)
async function loadPointsDiv() {
    const pointsInfo = await chrome.storage.local.get("brainrot_points");
    currentPoints = pointsInfo.brainrot_points;
    pointsDiv.innerHTML = "current points: " + currentPoints;
}

// updates the display of our # of points (done when we buy something)
function updatePointsDiv(points) {
    currentPoints -= points;
    pointsDiv.innerHTML = "current points: " + currentPoints;
}

// when shop is opened
document.addEventListener("DOMContentLoaded", async () => {
    await loadPointsDiv();
});

