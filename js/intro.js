document.addEventListener("DOMContentLoaded", function () {
    const flagButtons = document.querySelectorAll(".flag-btn");
    const introVeil = document.getElementById("intro-veil");
    const flagSelection = document.getElementById("flag-selection");
    const videoElement = document.getElementById("wedding-video");
    const skipBtn = document.getElementById("skip-btn");
    const loaderScreen = document.getElementById("intro-loader");
    const messageContainer = document.getElementById("something-else-message");
    const venuesContainer = document.getElementById("venues-video-container");
    const venuesVideo = document.getElementById("venues-video");

    if (!videoElement || !introVeil) return; 

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        introVeil.style.backgroundImage = "url('images/blurry_portrait.jpg')";
    } else {
        introVeil.style.backgroundImage = "url('images/blurry_landscape.jpg')";
    }

    // Dictionary for the custom messages
    const messages = {
        "ES": "Queremos enseñarte algo más!",
        "EN": "Wait a second, there is something else!",
        "FR": "Attends, on veut te montrer autre chose !"
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

        if (messageContainer) {
            messageContainer.textContent = messages[selectedLang] || messages["EN"];
        }

        if (videoContainer) {
            videoContainer.classList.add("fade-out");
        }
        if (loaderScreen) {
            loaderScreen.classList.add("active"); 
        }

        setTimeout(() => {
            if (messageContainer) messageContainer.classList.add("show");
        }, 50);

        setTimeout(() => {
            videoElement.pause();
            if (videoContainer) videoContainer.style.display = "none";
        }, 1000); 

        // Wait 5 seconds after showing the message, then fade out the loader and fade into videovenues.mp4
        setTimeout(() => {
            if (messageContainer) messageContainer.classList.remove("show");
            if (loaderScreen) loaderScreen.classList.remove("active");

            if (venuesContainer) {
                venuesContainer.classList.add("active");
            }
            if (venuesVideo) {
                venuesVideo.play().catch(error => {
                    console.log("Venues video autoplay was prevented:", error);
                });
            }
        }, 5500); // 500ms for initial message fade + 5000ms wait = 5500ms total
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
