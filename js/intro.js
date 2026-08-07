document.addEventListener("DOMContentLoaded", function () {
    const flagButtons = document.querySelectorAll(".flag-btn");
    const introVeil = document.getElementById("intro-veil");
    const flagSelection = document.getElementById("flag-selection");
    const videoElement = document.getElementById("wedding-video");
    const skipBtn = document.getElementById("skip-btn");
    const loaderScreen = document.querySelector(".fh5co-loader");
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
        "FR": "Il nous en reste encore un petit peu, revenez vite !"
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

        // Fade out the video container smoothly using CSS transition
        if (videoContainer) {
            videoContainer.classList.add("fade-out");
        }

        // Wait for the 1-second fade transition to finish, then pause video and show loader
        setTimeout(() => {
            videoElement.pause();
            if (videoContainer) videoContainer.style.display = "none";

            if (messageContainer) {
                messageContainer.textContent = messages[selectedLang] || messages["EN"];
            }

            if (loaderScreen) {
                loaderScreen.classList.remove("fade-out");
                loaderScreen.style.visibility = "visible";
                loaderScreen.style.opacity = "1";
            }

            setTimeout(() => {
                if (messageContainer) messageContainer.classList.add("show");
            }, 300);

        }, 1000); // Matches the 1s CSS transition time
    }

    // Skip Button Functionality
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            showLoaderScreen();
        });
    }

    // When video ends naturally
    videoElement.addEventListener("ended", function() {
        setTimeout(function() {
            showLoaderScreen();
        }, 1000);
    });
});
