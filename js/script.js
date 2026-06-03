"use stricts";

const elResult = document.querySelector(".search-result");
const elFilmSelectCategories = document.querySelector(
  ".film-select-categories",
);
const elFilmForm = document.querySelector(".film-form");
const elFilmsList = document.querySelector(".films-list");

const allFilm = films;

const generateGenres = function (filmsArr) {
  let uniqueGenres = [];

  filmsArr.forEach((film) => {
    film.genres.forEach((category) => {
      if (!uniqueGenres.includes(category)) uniqueGenres.push(category);
    });
  });

  return uniqueGenres.sort();
};
generateGenres(allFilm);

const renderCategories = function (categoryArr, htmlElement) {
  categoryArr.forEach((category) => {
    const newOption = document.createElement("option");

    newOption.textContent = category;
    newOption.setAttribute("value", `${category}`);

    htmlElement.appendChild(newOption);
  });
};

renderCategories(generateGenres(allFilm), elFilmSelectCategories);

elFilmForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elFilmsList.innerHTML = null;

  const categoryValue = elFilmSelectCategories.value;

  let filteredFilms = [];

  for (let film of films) {
    if (categoryValue === "All" || film.genres.includes(categoryValue))
      filteredFilms.push(film);
  }

  renderMovies(filteredFilms, elFilmsList);
});

const renderMovies = function (filmsArr, htmlElement) {
  elResult.textContent = filmsArr.length;

  filmsArr.forEach((film) => {
    const newFilmItem = document.createElement("li");
    const newFilmItemWrapper = document.createElement("div");
    const newFilmItemImg = document.createElement("img");
    const newFilmItemDescWrapper = document.createElement("div");
    const newFilmItemTitle = document.createElement("h3");
    const newFilmItemYear = document.createElement("p");
    const newFilmItemRating = document.createElement("p");
    const newFilmItemBtns = document.createElement("div");
    const newFilmItemWatch = document.createElement("button");
    const newFilmItemInfo = document.createElement("button");
    const newFilmItemBookmark = document.createElement("button");
    const newFilmItemGenres = document.createElement("p");

    newFilmItem.setAttribute("class", "col-4");
    newFilmItemWrapper.setAttribute("class", "card");
    newFilmItemImg.setAttribute("class", "card-img-top");
    newFilmItemImg.setAttribute("alt", `A picture of ${film.title} film`);
    newFilmItemImg.style.height = "260px";
    newFilmItemImg.style.width = "100%";
    newFilmItemImg.style.objectFit = "cover";
    newFilmItemImg.style.objectPosition = "top";
    newFilmItemImg.src = film.poster;
    newFilmItemDescWrapper.setAttribute("class", "card-body");
    newFilmItemTitle.textContent = film.title;
    newFilmItemTitle.setAttribute("class", "m-0 mb-2 fs-4");
    newFilmItemTitle.setAttribute("style", "height: 58px; overflow: hidden;");
    newFilmItemYear.textContent = "📅 2018";
    newFilmItemYear.setAttribute("class", "mb-2 fw-normal");
    newFilmItemYear.style.fontSize = "19px";
    newFilmItemRating.textContent = "⭐ 7.5";
    newFilmItemRating.setAttribute("class", "m-0 mb-3 fw-normal");
    newFilmItemRating.style.fontSize = "19px";
    newFilmItemBtns.setAttribute(
      "class",
      "d-flex gap-2 justify-content-between",
    );
    newFilmItemWatch.setAttribute("class", "btn btn-outline-primary");
    newFilmItemWatch.textContent = "Watch trailer";
    newFilmItemInfo.setAttribute("class", "btn btn-outline-secondary");
    newFilmItemInfo.textContent = "More info";
    newFilmItemBookmark.setAttribute("class", "btn btn-outline-success");
    newFilmItemBookmark.textContent = "Bookmark";
    newFilmItemGenres.textContent = film.genres.join(", ");
    newFilmItemGenres.setAttribute("class", "fs-5");

    htmlElement.appendChild(newFilmItem);
    newFilmItem.appendChild(newFilmItemWrapper);
    newFilmItemWrapper.appendChild(newFilmItemImg);
    newFilmItemWrapper.appendChild(newFilmItemDescWrapper);
    newFilmItemDescWrapper.appendChild(newFilmItemTitle);
    newFilmItemDescWrapper.appendChild(newFilmItemYear);
    newFilmItemDescWrapper.appendChild(newFilmItemRating);
    newFilmItemDescWrapper.appendChild(newFilmItemGenres);
    newFilmItemDescWrapper.appendChild(newFilmItemBtns);
    newFilmItemBtns.appendChild(newFilmItemWatch);
    newFilmItemBtns.appendChild(newFilmItemInfo);
    newFilmItemBtns.appendChild(newFilmItemBookmark);
  });
};
renderMovies(allFilm, elFilmsList);
