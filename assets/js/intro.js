(() => {
  const intro = document.getElementById("intro-page");
  if (!intro || typeof intro.showModal !== "function" || window.location.hash) return;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lines = [...intro.querySelectorAll(".intro-line")].map((line) => ({
    target: line.querySelector(".intro-typed"),
    text: line.querySelector(".intro-measure").textContent,
  }));
  let typingTimer;
  let closingTimer;
  let leaving = false;

  function finishTyping() {
    clearTimeout(typingTimer);
    lines.forEach(({ target, text }) => {
      target.textContent = text;
      target.classList.remove("is-typing");
    });
  }

  function typeLine(lineIndex, characterIndex = 0) {
    if (!intro.open || leaving) return;
    const line = lines[lineIndex];
    line.target.classList.add("is-typing");
    line.target.textContent = line.text.slice(0, characterIndex);
    if (characterIndex < line.text.length) {
      const lastCharacter = line.text[characterIndex - 1];
      const pause = /[;,]/.test(lastCharacter || "") ? 220 : 48;
      typingTimer = setTimeout(() => typeLine(lineIndex, characterIndex + 1), pause);
    } else {
      line.target.classList.remove("is-typing");
      if (lineIndex + 1 < lines.length) {
        typingTimer = setTimeout(() => typeLine(lineIndex + 1), 500);
      }
    }
  }

  function enter() {
    if (!intro.open || leaving) return;
    leaving = true;
    clearTimeout(typingTimer);
    lines.forEach(({ target }) => target.classList.remove("is-typing"));
    if (motion.matches) {
      intro.close();
    } else {
      intro.classList.add("intro-leaving");
      closingTimer = setTimeout(() => intro.close(), 360);
    }
  }

  function handleMotionChange() {
    if (motion.matches) {
      finishTyping();
      if (leaving && intro.open) intro.close();
    }
  }

  intro.addEventListener("click", enter);
  intro.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      enter();
    }
  });
  intro.addEventListener("cancel", (event) => {
    event.preventDefault();
    enter();
  });
  intro.addEventListener("close", () => {
    clearTimeout(typingTimer);
    clearTimeout(closingTimer);
    motion.removeEventListener("change", handleMotionChange);
    document.body.classList.remove("intro-active");
    document.getElementById("main-content")?.focus({ preventScroll: true });
  });
  motion.addEventListener("change", handleMotionChange);

  // A closed native dialog leaves the page accessible if scripting is unavailable.
  intro.showModal();
  document.body.classList.add("intro-active");
  if (motion.matches) finishTyping();
  else typingTimer = setTimeout(() => typeLine(0), 350);
})();
