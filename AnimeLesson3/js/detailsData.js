const detailsData = () => {
  const preloader = document.querySelector(".preloder");

  const renderCategoriesList = (genres) => {
    const categoriesBlock = document.querySelector(".header__menu .dropdown");

    genres.forEach((genre) => {
      categoriesBlock.insertAdjacentHTML(
        "beforeend",
        `
            <li><a href="?genre=${genre}">${genre}</a></li>
        `
      );
    });
  };

  const renderAnimeDetails = (array, itemId) => {
    const animeObj = array.find((item) => item.id == itemId);
    const imageBlock = document.querySelector(".anime__details__pic");
    const titleBlock = document.querySelector(".anime__details__title h3");
    const subTitleBlock = document.querySelector(".anime__details__title span");
    const descriptionBlock = document.querySelector(".anime__details__text p");
    const detailWidget = document.querySelector(".anime__details__widget ul");
    const breadcrumb = document.querySelector(".breadcrumb__links span");

    if (animeObj) {
      imageBlock.dataset.setbg = animeObj.image;
      imageBlock.insertAdjacentHTML(
        "afterbegin",
        `
            <div class="view"><i class="fa fa-eye"></i> ${animeObj.views}</div> 
        `
      );
      titleBlock.textContent = animeObj.title;
      subTitleBlock.textContent = animeObj["original-title"];
      descriptionBlock.textContent = animeObj.description;

      detailWidget.insertAdjacentHTML(
        "beforeend",
        `
            <li><span>Date aired:</span> ${animeObj.date}</li>
        `
      );
      detailWidget.insertAdjacentHTML(
        "beforeend",
        `
            <li><span>Rating:</span> ${animeObj.rating}</li>
        `
      );
      detailWidget.insertAdjacentHTML(
        "beforeend",
        `
            <li><span>Genre:</span> ${animeObj.tags.join(", ")}</li>
        `
      );
      breadcrumb.textContent = animeObj.ganre;

      document.querySelectorAll(".set-bg").forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
      });

      setTimeout(() => {
        preloader.classList.remove("active");
      }, 500);
    } else {
      console.log("Not found");
    }
  };

  fetch("https://glo-academy-9510f-default-rtdb.firebaseio.com/anime.json")
    .then((response) => response.json())
    .then((data) => {
      const genres = new Set();
      const paramGenre = new URLSearchParams(window.location.search).get(
        "itemId"
      );

      data.forEach((elem) => {
        genres.add(elem.ganre);
      });

      if (paramGenre) {
        renderAnimeDetails(data, paramGenre);
      } else {
        setTimeout(() => {
          preloader.classList.remove("active");
        }, 500);

        console.log("Not found");
      }
      renderCategoriesList(genres);
    });
};

detailsData();
