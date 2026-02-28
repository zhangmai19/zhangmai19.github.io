document.addEventListener("DOMContentLoaded", function () {

  const texts = ["Create Explore Expand Conquer"];

  const typewriterElement = document.getElementById("typewriter");
  const introPage = document.getElementById("intro-page");
  const mainContent = document.getElementById("main-content");

  let textIndex = 0;
  let charIndex = 0;

  function typeEffect() {
    if (charIndex < texts[textIndex].length) {
      typewriterElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 90);
    } else {
      setTimeout(resetTypeEffect, 800);
    }
  }

  function resetTypeEffect() {
    typewriterElement.textContent = "";
    charIndex = 0;
    textIndex = (textIndex + 1) % texts.length;
    typeEffect();
  }

  introPage.addEventListener("click", function () {

    introPage.style.opacity = "0";

    setTimeout(function () {
      introPage.style.display = "none";

      mainContent.style.display = "block";

      setTimeout(function () {
        mainContent.style.opacity = "1";
      }, 50);

    }, 500);
  });

  typeEffect();
});