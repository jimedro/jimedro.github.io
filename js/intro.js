document.addEventListener("DOMContentLoaded", function () {
    const flagButtons = document.querySelectorAll(".flag-btn");
    const introVeil = document.getElementById("intro-veil");
    const flagSelection = document.getElementById("flag-selection");
    const videoElement = document.getElementById("wedding-video");
    const skipBtn = document.getElementById("skip-btn");
    const loaderScreen = document.getElementById("intro-loader");
    const messageContainer = document.getElementById("coming-soon-message");

    if (!videoElement || !introVeil) return; 

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        introVeil.style.backgroundImage = "url('images/blurry_portrait.jpg')";
    } else {
        introVeil.style.backgroundImage = "url('images/blurry_landscape.jpg')";
    }

    // Dictionary for the custom messages
    const messages = {
        "ES": "Aún nos queda un poquito, volved pronto!",
        "EN": "We are not ready yet, come back soon!",
        "FR": "En travaux, revenez bientôt !"
    };

    let selectedLang = "EN"; // Default fallback

    flagButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedLang = this.getAttribute("data-lang") || "EN"; 

            let videoFileName = "";
            if (isMobile) {
                videoFileName = `WeddingWebOpening_Portrait30_${selectedLang}.mp4`;
            } else {
                videoFileName = `WeddingWebOpening_Landscape30_${selectedLang}.mp4`;
            }

            videoElement.src = `images/${videoFileName}`;
            videoElement.load();

            introVeil.classList.add("fade-out");
            flagSelection.classList.add("fade-out");

            if (skipBtn) skipBtn.classList.add("show");

            videoElement.play().catch(error => {
                console.log("Autoplay was prevented by the browser:", error);
            });
        });
    });

    // Function to transition smoothly into the infinite loading screen
    function showLoaderScreen() {
        const videoContainer = document.getElementById("video-container");
        if (skipBtn) skipBtn.classList.remove("show");

        if (videoContainer) {
            videoContainer.classList.add("fade-out");
        }

        setTimeout(() => {
            videoElement.pause();
            if (videoContainer) videoContainer.style.display = "none";

            if (messageContainer) {
                messageContainer.textContent = messages[selectedLang] || messages["EN"];
            }

            if (loaderScreen) {
                loaderScreen.classList.add("active");
            }

            setTimeout(() => {
                if (messageContainer) messageContainer.classList.add("show");
            }, 300);

        }, 500);
    }

    // Skip Button Functionality
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            showLoaderScreen();
        });
    }

    // When video ends naturally (using ended event without internal delay, plus early buffer)
    let hasEndedTriggered = false;
    videoElement.addEventListener("timeupdate", function handleTimeUpdate() {
        if (hasEndedTriggered) return;
        
        // Trigger 0.8 seconds before the end to bypass the frozen frame lag completely
        if (videoElement.duration && (videoElement.duration - videoElement.currentTime <= 0.8)) {
            hasEndedTriggered = true;
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
            showLoaderScreen();
        }
    });

    // Reset the trigger flag if the video is ever reloaded/replayed
    videoElement.addEventListener("play", function() {
        hasEndedTriggered = false;
    });

    // Scrolling Tab Title Function
    var scrollTitle = function() {
        var titleText = " Que nos casamos! • On se marie ! • We are getting married! • "; 
        setInterval(function() {
            titleText = titleText.substring(1) + titleText.substring(0, 1);
            document.title = titleText;
        }, 120);
    };

    // Run the scrolling title function on load
    scrollTitle();
});

