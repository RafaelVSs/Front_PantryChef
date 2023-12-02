document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById('main-carrousel');
    const firstSlide = document.getElementById('slide-0');

    // Set the first slide as checked by default
    firstSlide.checked = true;

    // Function to reset the carousel to the first slide
    function resetCarousel() {
      firstSlide.checked = true;
    }


    resetCarousel()

    const loadingHub = document.getElementById("container-home");
    const skipBtn = document.getElementById("skip-btn");
    const mainCarousel = document.getElementById("main-carrousel");

    if (loadingHub && mainCarousel && skipBtn) {
        loadingHub.style.display = "flex";
        skipBtn.style.display = "none";
        mainCarousel.style.display = "none";

        function toggleElements() {
            loadingHub.style.display = "none";
            skipBtn.style.display = "flex";
            mainCarousel.style.display = "block";
        }

        setTimeout(toggleElements, 3500);
    }
});

function paraInicio(){
    window.location.href="index.html";
}