(() => {
  const shelf = document.getElementById("bookshelf");
  if (!shelf) return;

  const search = shelf.querySelector("#bs-search");
  const filters = [...shelf.querySelectorAll("[data-filter]")];
  const books = [...shelf.querySelectorAll(".book-card")].map((element) => ({
    element,
    status: element.dataset.status,
    text: (element.querySelector(".book-title").textContent + " " + element.querySelector(".book-author").textContent)
      .normalize("NFKC")
      .toLocaleLowerCase(),
  }));
  let status = "all";

  function render() {
    const query = search.value.trim().normalize("NFKC").toLocaleLowerCase();
    let count = 0;
    books.forEach((book) => {
      const visible = (status === "all" || book.status === status) && book.text.includes(query);
      book.element.hidden = !visible;
      if (visible) count++;
    });
    filters.forEach((button) => {
      const selected = button.dataset.filter === status;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    shelf.querySelector("#bs-stats").textContent = count + " of " + books.length + " books";
    shelf.querySelector("#bs-empty").hidden = count !== 0;
  }

  search.addEventListener("input", render);
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      status = button.dataset.filter;
      render();
    });
  });
  shelf.querySelector("#bs-reset").addEventListener("click", () => {
    status = "all";
    search.value = "";
    render();
    search.focus();
  });
  shelf.querySelector(".bookshelf-filters").hidden = false;
  shelf.querySelector(".bookshelf-search-wrap").hidden = false;
  render();
})();
