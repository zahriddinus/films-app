"use stricts";

const elResult = document.querySelector(".search-result");
const elFilmsList = document.querySelector(".films-list");

elResult.textContent = films.length;

const renderMovies = function (filmsArr, htmlElement) {
  // htmlElement.innerHTML = ""; // Clear the list before rendering

  filmsArr.forEach((film) => {
    const newFilmItem = document.createElement("li");

    newFilmItem.textContent = "LLLL";
    newFilmItem.setAttribute("class", "col-4");

    htmlElement.appendChild(newFilmItem);
  });
};

renderMovies(films, elFilmsList);
