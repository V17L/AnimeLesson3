const modal = () => {
  const modal = document.querySelector(".search-model");
  const modalOpen = document.querySelector(".search-switch");
  const modalClose = modal.querySelector(".search-close-switch");

  modalOpen.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function logSearchValue(e) {
    console.log(e.target.value);
  }

  const processChange = debounce((e) => logSearchValue(e), 1000);

  const searchInput = modal.querySelector("#search-input");
  searchInput.addEventListener("input", (e) => {
    processChange(e);
  });
};

modal();
