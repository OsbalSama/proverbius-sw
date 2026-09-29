(function () {
  const carousel = document.querySelector(".cert-carousel");

  if (!carousel) {
    return;
  }

  const track = carousel.querySelector(".cert-carousel__track");
  const items = carousel.querySelectorAll(".Cert");

  const prevButton = carousel.querySelector(".cert-carousel__btn--prev");
  const nextButton = carousel.querySelector(".cert-carousel__btn--next");

  const dotsContainer = document.querySelector(".cert-carousel__dots");

  let currentIndex = 0;
  let itemsPerView = 3;
  let autoPlay;

  function updateItemsPerView() {
    if (window.innerWidth <= 600) {
      itemsPerView = 1;
    } else if (window.innerWidth <= 900) {
      itemsPerView = 2;
    } else {
      itemsPerView = 3;
    }
  }

  function getMaxIndex() {
    return Math.max(0, items.length - itemsPerView);
  }

  function updateCarousel() {
    const maxIndex = getMaxIndex();

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    const percentage = (currentIndex * 100) / itemsPerView;

    track.style.transform = `translateX(-${percentage}%)`;

    updateDots();
  }

  function createDots() {
    dotsContainer.innerHTML = "";

    const maxIndex = getMaxIndex();

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.classList.add("cert-carousel__dot");

      dot.setAttribute("aria-label", `Ir al grupo ${i + 1}`);

      dot.addEventListener("click", function () {
        currentIndex = i;

        updateCarousel();
        restartAutoPlay();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".cert-carousel__dot");

    dots.forEach(function (dot, index) {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function next() {
    const maxIndex = getMaxIndex();

    currentIndex++;

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    updateCarousel();
  }

  function previous() {
    const maxIndex = getMaxIndex();

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    updateCarousel();
  }

  function startAutoPlay() {
    autoPlay = setInterval(function () {
      next();
    }, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlay);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  nextButton.addEventListener("click", function () {
    next();
    restartAutoPlay();
  });

  prevButton.addEventListener("click", function () {
    previous();
    restartAutoPlay();
  });

  window.addEventListener("resize", function () {
    updateItemsPerView();

    createDots();
    updateCarousel();
  });

  updateItemsPerView();
  createDots();
  updateCarousel();
  startAutoPlay();

  carousel.addEventListener("mouseenter", stopAutoPlay);

  carousel.addEventListener("mouseleave", startAutoPlay);
})();
