"use stricts";

const elResult = document.querySelector(".search-result");
const elFilmSelectCategories = document.querySelector(
  ".film-select-categories",
);
const elFilmForm = document.querySelector(".film-form");
const elFilmsList = document.querySelector(".films-list");
const elItemBtnsWrapper = document.querySelector(".item-btns-wrapper");
const elBookmarkedList = document.querySelector(".bookmarked-list");
const elFilmInfoTitle = document.querySelector(".film-info-title");
const elFilmInfoDesc = document.querySelector(".film-info-desc");

const allFilm = films;
const localData = JSON.parse(window.localStorage.getItem("bookmarkedItems"));
const bookmarkedFilms = localData || [];

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
  const categoryValue = elFilmSelectCategories.value;
  let filteredFilms = [];

  for (let film of films) {
    if (categoryValue === "All" || film.genres.includes(categoryValue))
      filteredFilms.push(film);
  }

  elFilmsList.innerHTML = null;
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
      "item-btns-wrapper d-flex gap-2 justify-content-between",
    );
    newFilmItemWatch.setAttribute(
      "class",
      "item-watch-btn btn btn-outline-primary",
    );
    newFilmItemWatch.textContent = "Watch trailer";
    newFilmItemWatch.dataset.itemWatchId = film.id;
    newFilmItemInfo.setAttribute(
      "class",
      "item-info-btn btn btn-outline-secondary",
    );
    newFilmItemInfo.textContent = "More info";
    newFilmItemInfo.dataset.itemInfoBtnId = film.id;
    newFilmItemInfo.setAttribute("data-bs-toggle", "modal");
    newFilmItemInfo.setAttribute("data-bs-target", "#exampleModal");
    newFilmItemBookmark.setAttribute(
      "class",
      "item-bookmark-btn btn btn-outline-success",
    );
    newFilmItemBookmark.textContent = "Bookmark";
    newFilmItemBookmark.dataset.itemBookmarkBtnId = film.id;
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

elFilmsList.addEventListener("click", (evt) => {
  if (evt.target.matches(".item-watch-btn")) {
    const filmWatchBtnId = evt.target.dataset.newFilmItemWatch;
    const selectedWatch = allFilm.find((film) => film.id === filmWatchBtnId);

    window.location.href =
      "https://www.youtube.com/live/Ez0yd24SDiA?si=W3EyeWdA9hEznH8K";
  }

  if (evt.target.matches(".item-info-btn")) {
    const filmInfoBtnId = evt.target.dataset.itemInfoBtnId;
    const selectedInfo = allFilm.find((film) => film.id === filmInfoBtnId);

    elFilmInfoTitle.textContent = selectedInfo.title;
    elFilmInfoDesc.textContent = selectedInfo.overview;
  }

  if (evt.target.matches(".item-bookmark-btn")) {
    const filmBookmarkBtnId = evt.target.dataset.itemBookmarkBtnId;
    const selectedFilm = allFilm.find((film) => film.id === filmBookmarkBtnId);

    if (!bookmarkedFilms.includes(selectedFilm)) {
      bookmarkedFilms.push(selectedFilm);
    }
    elBookmarkedList.innerHTML = null;

    window.localStorage.setItem(
      "bookmarkedItems",
      JSON.stringify(bookmarkedFilms),
    );
  }

  renderBookmarked(bookmarkedFilms, elBookmarkedList);
});

const renderBookmarked = function (bookmarkedArr, htmlElement) {
  if (bookmarkedArr.length > 0) {
    bookmarkedArr.forEach((bookmarked) => {
      const newItem = document.createElement("li");
      const newItemTitle = document.createElement("h4");
      const newItemBtnsWrapper = document.createElement("div");
      const newItemInfoDiv = document.createElement("div");
      const newItemInfoBtn = document.createElement("button");
      const newItemDeleteDiv = document.createElement("div");
      const newItemDeleteBtn = document.createElement("button");

      newItem.setAttribute("class", "bookmarked-items p-3");
      newItemTitle.textContent = bookmarked.title;
      newItemTitle.setAttribute("class", "m-0 mb-2 fs-5");
      newItemBtnsWrapper.setAttribute("class", "btns-wrapper row gx-2");
      newItemInfoDiv.setAttribute("class", "col");
      newItemInfoBtn.setAttribute(
        "class",
        "bookmarked-info-btn w-100 btn btn-outline-secondary",
      );
      newItemInfoBtn.dataset.bookmarkedDeletBtnId = bookmarked.id;
      newItemInfoBtn.textContent = "More info";
      newItemInfoBtn.setAttribute("data-bs-toggle", "modal");
      newItemInfoBtn.setAttribute("data-bs-target", "#exampleModal");
      newItemDeleteDiv.setAttribute("class", "col");
      newItemDeleteBtn.setAttribute(
        "class",
        "item-delete-btn w-100 btn btn-danger",
      );
      newItemDeleteBtn.textContent = "Delete";
      newItemDeleteBtn.dataset.deleteBtnId = bookmarked.id;

      htmlElement.appendChild(newItem);
      newItem.appendChild(newItemTitle);
      newItem.appendChild(newItemBtnsWrapper);
      newItemBtnsWrapper.appendChild(newItemInfoDiv);
      newItemInfoDiv.appendChild(newItemInfoBtn);
      newItemBtnsWrapper.appendChild(newItemDeleteDiv);
      newItemDeleteDiv.appendChild(newItemDeleteBtn);
    });
  } else {
    const newItem = document.createElement("li");
    const newItemTitle = document.createElement("h4");

    newItem.setAttribute("class", "bookmarked-items p-3");
    newItemTitle.setAttribute("class", "m-0 fs-5 text-danger");
    newItemTitle.textContent = "Nothing here yet!";

    htmlElement.appendChild(newItem);
    newItem.appendChild(newItemTitle);
  }
};
renderBookmarked(bookmarkedFilms, elBookmarkedList);

elBookmarkedList.addEventListener("click", (evt) => {
  if (evt.target.matches(".item-delete-btn")) {
    const bookmarkedDelete = evt.target.dataset.deleteBtnId;
    const foundedFilmDelete = bookmarkedFilms.find(
      (film) => film.id === bookmarkedDelete,
    );
    bookmarkedFilms.splice(foundedFilmDelete, 1);

    elBookmarkedList.innerHTML = null;
    window.localStorage.setItem(
      "bookmarkedItems",
      JSON.stringify(bookmarkedFilms),
    );

    if (bookmarkedFilms.length === 0) {
      window.localStorage.removeItem("bookmarkedItems");
    }

    renderBookmarked(bookmarkedFilms, elBookmarkedList);
  }

  if (evt.target.matches(".bookmarked-info-btn")) {
    const bookmarkedInfo = evt.target.dataset.bookmarkedDeletBtnId;
    const foundedFilmInfo = bookmarkedFilms.find(
      (film) => film.id === bookmarkedInfo,
    );

    elFilmInfoTitle.textContent = foundedFilmInfo.title;
    elFilmInfoDesc.textContent = foundedFilmInfo.overview;
  }
});
