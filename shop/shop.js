let currentPoints;

const myPort = chrome.runtime.connect({name: "shop-script-port"});

const body = document.querySelector("body");

const pointsDiv = document.createElement("div");
pointsDiv.classList.add("points");
body.appendChild(pointsDiv);

function createShopItem(effect_name, points) {
    const itemDiv = document.createElement("div");
    const buyButton = document.createElement("button");

    buyButton.classList.add("buy-effect-button");
    itemDiv.classList.add("shop-item");

    itemDiv.innerHTML = effect_name;
    buyButton.innerHTML = points;

    buyButton.addEventListener("click", () => {
        if (currentPoints >= points) {
            myPort.postMessage({"effect": effect_name});
        }
    })

    itemDiv.appendChild(buyButton);

    return itemDiv;
}

const effects = {
    "mango cursor": 100,
    "text replacement": 200,
    "hawk tuah audio": 300,
}

const shopDiv = document.createElement("div");
shopDiv.classList.add("shop");

Object.entries(effects).forEach(([effect_name, points]) => {
    const itemDiv = createShopItem(effect_name, points);
    shopDiv.appendChild(itemDiv);
});

body.appendChild(shopDiv);

document.addEventListener("DOMContentLoaded", async () => {
    const pointsInfo = await chrome.storage.local.get("brainrot_points");
    currentPoints = pointsInfo.brainrot_points;
    pointsDiv.innerHTML = "current points: " + currentPoints;
});

