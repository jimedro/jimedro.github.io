document.addEventListener("DOMContentLoaded", function () {
    const flagButtons = document.querySelectorAll(".flag-btn");
    const introVeil = document.getElementById("intro-veil");
    const flagSelection = document.getElementById("flag-selection");
    const videoElement = document.getElementById("wedding-video");
    const skipBtn = document.getElementById("skip-btn");
    const loaderScreen = document.getElementById("intro-loader");
    const messageContainer = document.getElementById("something-else-message");
    const choiceContainer = document.getElementById("choice-container");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const jokeMessage = document.getElementById("joke-message");
    const venuesContainer = document.getElementById("venues-video-container");
    const venuesVideo = document.getElementById("venues-video");
    const venuesSkipBtn = document.getElementById("skip-venues-btn");

    if (!videoElement || !introVeil) return; 

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        introVeil.style.backgroundImage = "url('images/blurry_portrait.jpg')";
    } else {
        introVeil.style.backgroundImage = "url('images/blurry_landscape.jpg')";
    }

    // First interruption messages (after first video)
    const secondTransitionMessages = {
        "ES": "Queremos enseñarte algo más, ¿quieres verlo?",
        "EN": "There is more, do you want to see it?",
        "FR": "Il y en a encore, on y va ?"
    };

    // Joke messages when clicking "NO"
    const jokeMessages = {
        "ES": "Claro que sí guapi",
        "EN": "Yeah sure",
        "FR": "La blague !"
    };

    // Final "coming soon" adventure messages
    const finalMessages = {
        "ES": "Preparando la aventura... vuelve pronto!",
        "EN": "We are preparing this adventure, come back soon!",
        "FR": "On se prépare pour l'aventure, reviens bientôt !"
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

    // Function to trigger the second video playback
    function playVenuesVideo() {
        if (messageContainer) messageContainer.classList.remove("show");
        if (choiceContainer) choiceContainer.classList.remove("show");
        if (jokeMessage) jokeMessage.classList.remove("show");
        if (loaderScreen) loaderScreen.classList.remove("active");

        if (venuesContainer) {
            venuesContainer.classList.add("active");
        }
        if (venuesVideo) {
            venuesVideo.play().catch(error => {
                console.log("Venues video autoplay was prevented:", error);
            });
            if (venuesSkipBtn) {
                venuesSkipBtn.classList.add("show");
            }
        }
    }

    function showLoaderScreen() {
        const videoContainer = document.getElementById("video-container");
        if (skipBtn) skipBtn.classList.remove("show");

        if (messageContainer) {
            messageContainer.textContent = secondTransitionMessages[selectedLang] || secondTransitionMessages["EN"];
        }

        if (videoContainer) {
            videoContainer.classList.add("fade-out");
        }
        if (loaderScreen) {
            loaderScreen.classList.add("active"); 
        }

        setTimeout(() => {
            if (messageContainer) messageContainer.classList.add("show");
            if (choiceContainer) choiceContainer.classList.add("show");
        }, 50);

        setTimeout(() => {
            videoElement.pause();
            if (videoContainer) videoContainer.style.display = "none";
        }, 1000); 
    }

    // YES Button Handler
    if (yesBtn) {
        yesBtn.addEventListener("click", function() {
            playVenuesVideo();
        });
    }

    // NO Button Handler
    if (noBtn) {
        noBtn.addEventListener("click", function() {
            // Hide choice buttons immediately
            if (choiceContainer) choiceContainer.classList.remove("show");

            // Show joke message depending on language
            if (jokeMessage) {
                jokeMessage.textContent = jokeMessages[selectedLang] || jokeMessages["EN"];
                jokeMessage.classList.add("show");
            }

            // After a short wait (e.g., 1.5 seconds), continue to the video anyway
            setTimeout(() => {
                playVenuesVideo();
            }, 1500);
        });
    }

    // Function to transition to the final adventure screen
    function showFinalAdventureScreen() {
        if (venuesSkipBtn) venuesSkipBtn.classList.remove("show");
        if (venuesContainer) {
            venuesContainer.classList.remove("active");
        }
        if (venuesVideo) {
            venuesVideo.pause();
        }

        // Setup final message text based on chosen language
        if (messageContainer) {
            messageContainer.textContent = finalMessages[selectedLang] || finalMessages["EN"];
        }
        if (choiceContainer) choiceContainer.classList.remove("show");
        if (jokeMessage) jokeMessage.classList.remove("show");

        // Show loader screen with background image + spinner + final message
        if (loaderScreen) {
            loaderScreen.classList.add("active");
        }
        setTimeout(() => {
            if (messageContainer) messageContainer.classList.add("show");
        }, 50);
    }

    // Skip Button Functionality (First Video)
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            showLoaderScreen();
        });
    }

    // Venues Skip Button Functionality (Second Video)
    if (venuesSkipBtn) {
        venuesSkipBtn.addEventListener("click", function() {
            showFinalAdventureScreen();
        });
    }

    // When first video ends naturally
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

    // When venues video ends naturally
    if (venuesVideo) {
        venuesVideo.addEventListener("ended", function() {
            showFinalAdventureScreen();
        });
    }

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
