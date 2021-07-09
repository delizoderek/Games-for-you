let searchBtn = document.querySelector("#name-btn");
let searchInput = document.querySelector("#name");
let genreBtn = document.querySelector("#genre-search");
let checkboxList = document.querySelectorAll("input[type='checkbox']");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let searchTerm = searchInput.value.trim();
  if (searchTerm !== "" || searchTerm !== null) {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.includes(" ")) {
      searchTerm = searchTerm.replaceAll(" ", "+");
    }
    location.assign(`./searchresults.html?q=${searchTerm}&type=name`);
  }
});

genreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let genreString = buildGenreString();
  location.assign(
    `./searchresults.html?q=${genreString.genreQuery}+${genreString.categoryQuery}&type=genre`
  );
});

function esrbSearch(event) {
  event.preventDefault();
  location.assign(
    `./searchresults.html?q=${event.target.dataset.esrbid}&type=esrb`
  );
}

// Set Dropdown Click Listeners
document.querySelector("#everyone").addEventListener("click", esrbSearch);
document.querySelector("#everyone10").addEventListener("click", esrbSearch);
document.querySelector("#teen").addEventListener("click", esrbSearch);
document.querySelector("#mature").addEventListener("click", esrbSearch);