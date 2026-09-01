document.addEventListener("DOMContentLoaded", function () {
    const flagButtons = document.querySelectorAll(".flag-btn");
    const introVeil = document.getElementById("intro-veil");
    const flagSelection = document.getElementById("flag-selection");
    const videoElement = document.getElementById("wedding-video");
    const skipBtn = document.getElementById("skip-btn");
    const loaderScreen = document.getElementById("intro-loader");
    const messageContainer = document.getElementById("something-else-message");
    const countdownContainer = document.getElementById("countdown-timer");
    const choiceButtonsContainer = document.getElementById("choice-buttons-container");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const funnyMessageContainer = document.getElementById("funny-message");
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

    // First interruption messages[cite: 3]
    const messages = {
        "ES": "Queremos enseñarte algo más, ¿quieres verlo?",
        "EN": "There is more, do you want to see it?",
        "FR": "Il reste un peu plus, on y va ?"
    };

    // Funny messages for the NO button
    const funnyMessages = {
        "ES": "Claro que sí guapi",
        "EN": "Yeah sure",
        "FR": "La blague !"
    };

    // Final "coming soon" adventure messages[cite: 3]
    const finalMessages = {
        "ES": "Estamos preparando la aventura, vuelve pronto!",
        "EN": "We are preparing this adventure, come back soon!",
        "FR": "On se prépare pour l'aventure, reviens bientôt !"
    };

    let selectedLang = "EN"; // Default fallback[cite: 3]

    flagButtons.forEach(button => {
        button.addEventListener("click", function () {
            selectedLang = this.getAttribute("data-lang") || "EN";[cite: 3]

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

    function playVenuesVideo() {
        if (loaderScreen) loaderScreen.classList.remove("active");
        if (funnyMessageContainer) funnyMessageContainer.textContent = "";
        if (venuesContainer) {
            venuesContainer.classList.add("active");
        }
        if (venuesVideo) {
            venuesVideo.load();
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
            // Show YES and NO buttons instead of countdown
            if (choiceButtonsContainer) {
                choiceButtonsContainer.style.display = "flex";
            }
        }, 50);

        setTimeout(() => {
            videoElement.pause();
            if (videoContainer) videoContainer.style.display = "none";
        }, 1000); 
    }

    // YES Button Click Handler
    if (yesBtn) {
        yesBtn.addEventListener("click", function() {
            if (choiceButtonsContainer) choiceButtonsContainer.style.display = "none";
            if (messageContainer) messageContainer.classList.remove("show");
            playVenuesVideo();
        });
    }

    // NO Button Click Handler
    if (noBtn) {
        noBtn.addEventListener("click", function() {
            if (choiceButtonsContainer) choiceButtonsContainer.style.display = "none";
            if (funnyMessageContainer) {
                funnyMessageContainer.textContent = funnyMessages[selectedLang] || funnyMessages["EN"];
            }
            // Trigger venues video after a short humorous pause to let them read it
            setTimeout(() => {
                if (messageContainer) messageContainer.classList.remove("show");
                playVenuesVideo();
            }, 1500);
        });
    }

    // Function to transition to the final adventure screen[cite: 3]
    function showFinalAdventureScreen() {
        if (venuesSkipBtn) venuesSkipBtn.classList.remove("show");
        if (venuesContainer) {
            venuesContainer.classList.remove("active");
        }
        if (venuesVideo) {
            venuesVideo.pause();
        }

        // Setup final message text based on chosen language[cite: 3]
        if (messageContainer) {
            messageContainer.textContent = finalMessages[selectedLang] || finalMessages["EN"];
        }
        if (countdownContainer) {
            countdownContainer.textContent = ""; 
            countdownContainer.classList.remove("show");
        }
        if (choiceButtonsContainer) {
            choiceButtonsContainer.style.display = "none";
        }
        if (funnyMessageContainer) {
            funnyMessageContainer.textContent = "";
        }

        // Show loader screen with background image + spinner + final message[cite: 3]
        if (loaderScreen) {
            loaderScreen.classList.add("active");
        }
        setTimeout(() => {
            if (messageContainer) messageContainer.classList.add("show");
        }, 50);
    }

    // Skip Button Functionality (First Video)[cite: 3]
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            showLoaderScreen();
        });
    }

    // Venues Skip Button Functionality (Second Video)[cite: 3]
    if (venuesSkipBtn) {
        venuesSkipBtn.addEventListener("click", function() {
            showFinalAdventureScreen();
        });
    }

    // When first video ends naturally[cite: 3]
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

    // When venues video ends naturally[cite: 3]
    if (venuesVideo) {
        venuesVideo.addEventListener("ended", function() {
            showFinalAdventureScreen();
        });
    }

    // Scrolling Tab Title Function[cite: 3]
    var scrollTitle = function() {
        var titleText = " Que nos casamos! • On se marie ! • We are getting married! • "; 
        setInterval(function() {
            titleText = titleText.substring(1) + titleText.substring(0, 1);
            document.title = titleText;
        }, 120);
    };

    scrollTitle();
});
