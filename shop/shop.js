const body = document.querySelector("body");
const pointsDiv = document.createElement("div");
pointsDiv.innerHTML = "pointsDiv"
body.appendChild(pointsDiv);

document.addEventListener("DOMContentLoaded", async () => {
    const pointsInfo = await chrome.storage.local.get("brainrot_points");
    pointsDiv.innerHTML = "current points: " + pointsInfo.brainrot_points;
});