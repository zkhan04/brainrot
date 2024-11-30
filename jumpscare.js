export const Jumpscare = {
    // State variables
    scarePending: false,
    scareReady: false,

    // Configurations
    SCARE_TIMER_MS: 1000,
    SCARE_DELAY_MS: 200,

    // Paths for resources
    scareImgPath: "homer.jpeg",
    scareAudioPath: "homer.mp3",

    // DOM elements
    scareImg: null,
    scareAudio: null,

    // Initialize the jumpscare (setup DOM and listeners)
    initialize() {
        // Create and configure the jumpscare image
        this.scareImg = document.createElement("img");
        this.scareImg.src = chrome.runtime.getURL(this.scareImgPath);
        this.scareImg.style.display = "none";

        // Create the jumpscare audio
        this.scareAudio = new Audio(chrome.runtime.getURL(this.scareAudioPath));

        // Append image to DOM
        const body = document.querySelector("body");
        body.appendChild(this.scareImg);

        // Attach event listeners
        body.addEventListener("keydown", (e) => this.interactCallback(e));
        body.addEventListener("click", (e) => this.interactCallback(e));

        this.scareImg.addEventListener("fullscreenchange", (e) => this.fullscreenChangeCallback(e));

        console.log("Jumpscare initialized");
    },

    // Event listener for user interaction
    interactCallback(e) {
        if ((this.scarePending && !this.scareReady) || (!this.scarePending && this.scareReady)) {
            console.log("Scare already scheduled");
            return;
        }

        // Trigger the scare if ready
        if (this.scarePending && this.scareReady) {
            setTimeout(() => {
                this.scareImg.requestFullscreen();
                this.scareImg.style.display = "block";
                this.scarePending = false;
            }, this.SCARE_DELAY_MS);
            return;
        }

        // Schedule a new scare
        console.log(`Scare scheduled in ${this.SCARE_TIMER_MS / 1000.0} seconds`);
        this.scarePending = true;
        setTimeout(() => {
            console.log("Ready to scare");
            this.scareReady = true;
        }, this.SCARE_TIMER_MS);
    },

    // Event listener for fullscreen changes
    fullscreenChangeCallback(e) {
        if (!document.fullscreenElement) {
            // User exited fullscreen
            this.scareAudio.pause();
            this.scareImg.style.display = "none";
            this.scarePending = false;
            this.scareReady = false;
        } else {
            // Scare is active
            this.scareAudio.currentTime = 0;
            this.scareAudio.play();
        }
    }
};
