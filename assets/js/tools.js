var rawgApi = "4ff9656ea1344d38abef9231d5a4547f";
var bgAtlasApi = "id6TuxDAFr";

// Variables for referencing the search fields
let searchBtn = document.querySelector("#name-btn");
let searchInput = document.querySelector("#name");
let genreBtn = document.querySelector("#genre-search");
let checkboxList = document.querySelectorAll("input[type='checkbox']");

let selectedBoxes = 0;

// Sets event listeners on the checkboxes to update the selectedBoxes boolean if any boxes are selected
for (var i = 0; i < checkboxList.length; i++) {
  checkboxList[i].addEventListener("click", function (event) {
    if(event.target.checked){
      selectedBoxes++;
    } else {
      selectedBoxes--;
    }
  });
}

// Creates a tooltip on the selected element and sets the tooltip text
function createTooltip(selector, message) {
  var btn = document.getElementById(`${selector}`);
  btn.classList.add("tooltip");
  btn.setAttribute("data-tooltip", `${message}`);
}

// Removes the tooltip on the selected element
function removeTooltip(selector) {
  var btn = document.getElementById(`${selector}`);
  btn.classList.remove("tooltip");
  btn.removeAttribute("data-tooltip");
}

// Sets an event listener for the search button, then the function will format the input
// and sets the location to searchresults.html
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let searchTerm = searchInput.value.trim();
  if (searchTerm !== "" && searchTerm !== null) {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.includes(" ")) {
      searchTerm = searchTerm.replaceAll(" ", "+");
    }
    searchInput.textContent = "";
    location.assign(`./searchresults.html?q=${searchTerm}&type=name`);
  }
});

// Name search can be triggered by pressing enter, instead of the search button
searchInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
});

// Adds a click listener to the genre button and sets the new location to the search results page
genreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let genreString = buildGenreString();
  if (genreString.genreQuery.length > 0) {
    location.assign(
      `./searchresults.html?q=${genreString.genreQuery}+${genreString.categoryQuery}&type=genre`
    );
  }
});

// Loads the search results page for age search
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

// Looks for which checkboxes have been selected, then compiles a query string
function buildGenreString() {
  let genreString = "";
  let categoryList = "";
  for (let i = 0; i < checkboxList.length; i++) {
    if (checkboxList[i].checked) {
      genreString += `${checkboxList[i].dataset.rawgId},`;
      categoryList += `${checkboxList[i].dataset.atlasId},`;
    }
  }
  return {
    genreQuery: genreString.substring(0, genreString.length - 1),
    categoryQuery: categoryList.substring(0, categoryList.length - 1),
  };
}

// Creates tooltip when mouse hovers over the search button
searchBtn.addEventListener("mouseover", function () {
  if (!searchInput.value) {
    createTooltip("name-btn", "Please enter a name");
  }
});

// Removes tooltip when mouse stops hovering over search button
searchBtn.addEventListener("mouseout", function () {
  removeTooltip("name-btn");
});

// Creates tooltip when mouse hovers over the genre button
genreBtn.addEventListener("mouseover", function () {
  if (selectedBoxes < 1) {
    createTooltip("genre-search", "Please select a genre");
  }
});

// Removes tooltip when mouse stops hovering over genre button
genreBtn.addEventListener("mouseout", function () {
  removeTooltip("genre-search");
});
