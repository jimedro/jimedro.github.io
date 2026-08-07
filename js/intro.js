document.addEventListener("DOMContentLoaded", function () {
    const flagButtons = document.querySelectorAll(".flag-btn");
    const introVeil = document.getElementById("intro-veil");
    const flagSelection = document.getElementById("flag-selection");
    const videoElement = document.getElementById("wedding-video");
    const skipBtn = document.getElementById("skip-btn");

    if (!videoElement || !introVeil) return; 

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        introVeil.style.backgroundImage = "url('images/blurry_portrait.jpg')";
    } else {
        introVeil.style.backgroundImage = "url('images/blurry_landscape.jpg')";
    }

    flagButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang"); 

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
            
            // Reveal the skip button once a flag is clicked and the video starts
            if (skipBtn) skipBtn.classList.add("show");

            videoElement.play().catch(error => {
                console.log("Autoplay was prevented by the browser:", error);
            });
        });
    });

    // Skip Button Functionality
    if (skipBtn) {
        skipBtn.addEventListener("click", function() {
            videoElement.pause();
            videoElement.currentTime = videoElement.duration;
            skipBtn.classList.remove("show");
        });
    }

    // Hide skip button automatically when the video finishes naturally
    videoElement.addEventListener("ended", function() {
        if (skipBtn) skipBtn.classList.remove("show");
    });
});
