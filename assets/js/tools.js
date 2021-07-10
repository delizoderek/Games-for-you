var rawgApi = "4ff9656ea1344d38abef9231d5a4547f";
var bgAtlasApi = "id6TuxDAFr";

let searchBtn = document.querySelector("#name-btn");
let searchInput = document.querySelector("#name");
let genreBtn = document.querySelector("#genre-search");
let checkboxList = document.querySelectorAll("input[type='checkbox']");

var selectedBoxes = false;

for(var i = 0; i < checkboxList.length; i++) {
  checkboxList[i].addEventListener('click', function() {
      selectedBoxes = !selectedBoxes;
  })
}

function createTooltip(selector, message) {
    var btn = document.getElementById(`${selector}`);
    btn.classList.add('tooltip');
    btn.setAttribute('data-tooltip', `${message}`);
  }
  function removeTooltip(selector) {
    var btn = document.getElementById(`${selector}`);
    btn.classList.remove('tooltip');
    btn.removeAttribute('data-tooltip');
  }


var selectedBoxes = false;

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let searchTerm = searchInput.value.trim();
  if (searchTerm !== "" && searchTerm !== null) {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.includes(" ")) {
      searchTerm = searchTerm.replaceAll(" ", "+");
    }
    searchInput.textContent = '';
    location.assign(`./searchresults.html?q=${searchTerm}&type=name`);
  }
});

searchInput.addEventListener("keypress", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    searchBtn.click();
  }
});

genreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let genreString = buildGenreString();
  if(genreString.genreQuery.length > 0){
    location.assign(
      `./searchresults.html?q=${genreString.genreQuery}+${genreString.categoryQuery}&type=genre`
    );
  }
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

function buildGenreString() {
    let genreString = "";
    let categoryList = "";
    for(let i = 0; i < checkboxList.length; i++){
        if(checkboxList[i].checked){
            genreString += `${checkboxList[i].dataset.rawgId},`;
            categoryList += `${checkboxList[i].dataset.atlasId},`;
        }
    }
  return {  genreQuery: genreString.substring(0, genreString.length - 1),
            categoryQuery: categoryList.substring(0, categoryList.length - 1)};
}

function createTooltip(selector, message) {
  var btn = document.getElementById(`${selector}`);
  btn.classList.add("tooltip");
  btn.setAttribute("data-tooltip", `${message}`);
}
function removeTooltip(selector) {
  var btn = document.getElementById(`${selector}`);
  btn.classList.remove("tooltip");
  btn.removeAttribute("data-tooltip");
}

searchBtn.addEventListener("mouseover", function () {
  if (!searchInput.value) {
    createTooltip(
      "name-btn",
      "Please enter a name"
    );
  }
});
searchBtn.addEventListener("mouseout", function () {
  removeTooltip("name-btn");
});

genreBtn.addEventListener("mouseover", function () {
  if (!selectedBoxes) {
    createTooltip(
      "genre-search",
      "Please select a genre"
    );
  }
});
genreBtn.addEventListener("mouseout", function () {
  removeTooltip("genre-search");
});
