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

    // Function to transition into the infinite loading screen
    function showLoaderScreen() {
        // Hide video and skip button
        const videoContainer = document.getElementById("video-container");
        if (videoContainer) videoContainer.style.display = "none";
        if (skipBtn) skipBtn.classList.remove("show");

        // Set the appropriate language message
        if (messageContainer) {
            messageContainer.textContent = messages[selectedLang] || messages["EN"];
        }

        // Trigger the loader display and fade it in
        if (loaderScreen) {
            loaderScreen.classList.remove("fade-out");
            loaderScreen.style.visibility = "visible";
            loaderScreen.style.opacity = "1";
        }

        // Fade in the text slightly after the white screen appears
        setTimeout(() => {
            if (messageContainer) messageContainer.classList.add("show");
        }, 500);
    }

    // Skip Button Functionality -> Takes you straight to the loader screen
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            videoElement.pause();
            showLoaderScreen();
        });
    }

    // When video ends naturally -> Wait 1 second, then fade into the loader screen
    videoElement.addEventListener("ended", function() {
        setTimeout(function() {
            showLoaderScreen();
        }, 1000); // 1 second delay
    });
});
