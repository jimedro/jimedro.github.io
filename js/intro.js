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
            // Explicitly capture and update the selected language here
            selectedLang = this.getAttribute("data-lang") || "EN"; 

            let videoFileName = "";
            if (isMobile) {
                videoFileName = `WeddingWebOpening_Portrait30_${selectedLang}.mp4`;
            } else {
                videoFileName = `WeddingWebOpening_Landscape30_${selectedLang}.mp4`;
            }

            flagSelection.style.opacity = "0";
            flagSelection.style.pointerEvents = "none";

            videoElement.src = `images/${videoFileName}`;
            videoElement.load();
        });
    });

    videoElement.addEventListener("canplay", function handleCanPlay() {
        introVeil.classList.add("fade-out");

        if (skipBtn) skipBtn.classList.add("show");

        videoElement.play().catch(error => {
            console.log("Autoplay was prevented by the browser:", error);
        });
    }, { once: true });

    // Function to transition smoothly: video fades out while the loader fades in simultaneously
    function showLoaderScreen() {
        const videoContainer = document.getElementById("video-container");
        if (skipBtn) skipBtn.classList.remove("show");

        // Pulls the correct message based on the clicked flag language (defaults to EN if none clicked)
        if (messageContainer) {
            messageContainer.textContent = messages[selectedLang] || messages["EN"];
        }

        // Step 1: Fade out the video container and trigger the loader screen fade-in at the same time
        if (videoContainer) {
            videoContainer.classList.add("fade-out");
        }
        if (loaderScreen) {
            loaderScreen.classList.add("active"); 
        }

        // Step 2: Tiny delay to ensure the browser registers the loader display before fading in the text message
        setTimeout(() => {
            if (messageContainer) messageContainer.classList.add("show");
        }, 50);

        // Step 3: Wait for the full fade transition to finish (1000ms), then pause and hide the video completely
        setTimeout(() => {
            videoElement.pause();
            if (videoContainer) videoContainer.style.display = "none";
        }, 1000); 
    }

    // Skip Button Functionality
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            showLoaderScreen();
        });
    }

    // When video ends naturally
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

    scrollTitle();
});
