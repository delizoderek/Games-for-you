var rawgApi = "a64070dd102e45d4bbd286bc64075645";
var bgAtlasApi = "id6TuxDAFr";

let key = "bBS0ShoGPv";
let rawgKey = "4ff9656ea1344d38abef9231d5a4547f";
let baseUrl = "https://www.giantbomb.com/api";

let genreCheckboxes = [];

let genreChoices = {
    action: 4,
    indie: 51,
    adventure: 3,
    rpg: 5,
    strategy: 10,
    shooter: 2,
    casual: 40,
    simulation: 14,
    puzzle: 7,
    arcade: 11,
    platformer: 83,
    racing: 1,
    massMultiplayer: 59,
    sports: 15,
    fighting: 6,
    family: 19,
    boardGames: 28,
    educational: 34,
    card: 17,
};

let game = {
    name: "",
    esrbRating:"",
    genres: [],
    stores: [],
}

let searchBtn = document.querySelector("#name-search");
let ageSearch = document.querySelector("#everyone");

let gameList = [];

var car1 = document.getElementById("car1");
var car2 = document.getElementById("car2");
var car3 = document.getElementById("car3");
var car4 = document.getElementById("car4");

// Set Dropdown Click Listeners
document.querySelector("#everyone").addEventListener("click",esrbSearch);
document.querySelector("#everyone10").addEventListener("click",esrbSearch);
document.querySelector("#teen").addEventListener("click",esrbSearch);
document.querySelector("#mature").addEventListener("click",esrbSearch);

// genreSearch();

searchBtn.addEventListener("click",function(event){
    event.preventDefault();
    let searchInput = document.querySelector("#searchBox");
    let searchTerm = searchInput.value.trim();
    if(searchTerm !== "" || searchTerm !== null){
        searchTerm = searchTerm.toLowerCase();
        if(searchTerm.includes(" ")){
            searchTerm = searchTerm.replaceAll(" ","+");
        }
    }
    gameSearch(searchTerm);
});

function gameSearch(searchTerm){
    let requestUrl = `https://api.rawg.io/api/games?search=${searchTerm}&search_precise=true&page_size=50&key=${rawgKey}`;
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.results.length > 0){
            for(let result of data.results){
                console.log(result);
            }
        }
    });
}

function buildGenreString(){
    let genreQuery = "";
    for(let i = 0; i < genreCheckboxes.length; i++){
        if(genreCheckboxes[i].checked){
            genreQuery += `${genreCheckboxes[i].dataset.rawgId},`;
        }
    }
    return genreQuery.substring(0,genreQuery.length-1);
}

function genreSearch(){
    // TODO: Search by genre and display results
    let requestUrl = `https://api.rawg.io/api/games?genres=${buildGenreString()}&page_size=50&key=${rawgKey}`;
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.results > 0){
            console.log(data);
        }
    });
}

function getEsrbResults(ratedE){
    let tagsUrl = "https://api.rawg.io/api/games?page_size=50&key=4ff9656ea1344d38abef9231d5a4547f";
    fetch(tagsUrl)
    .then(function(response){
        return response.json();
    }).then(function(data){
        let results = filterByEsrb(data.results,ratedE);
        console.log(results);
    })
}

function esrbSearch(event){
    // TODO: Search for games by age
    event.preventDefault();
    console.log(event.target);
    // getEsrbResults(esrb);
}

function filterByEsrb(gameList,ageRating){
    let filteredResults = []
    for(let result of gameList){
        if(result.esrb_rating != null){
            if(result.esrb_rating.id <= ageRating){
                filteredResults.push(result);
            }
        }
    }
    return filteredResults;
}

function carouselImg() {
    fetch(`https://api.rawg.io/api/games?page_size=4&key=${rawgApi}`)
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        let index = Math.floor(Math.random() * 4);
        let index2 = Math.floor(Math.random() * 4);
        while (index === index2) {
          index2 = Math.floor(Math.random() * 20);
        }
        car1.setAttribute("src", `${data.results[index].background_image}`);
        document.getElementById("carName1").textContent =
          data.results[index].name;
        car3.setAttribute("src", `${data.results[index2].background_image}`);
        document.getElementById("carName3").textContent =
          data.results[index2].name;
      });
    fetch(
      `https://api.boardgameatlas.com/api/search?random=true&client_id=${bgAtlasApi}`
    )
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        car2.setAttribute("src", `${data.games[0].image_url}`);
        document.getElementById("carName2").textContent = data.games[0].name;
      });
    fetch(
      `https://api.boardgameatlas.com/api/search?random=true&client_id=${bgAtlasApi}`
    )
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        document.getElementById("carName4").textContent = data.games[0].name;
        car4.setAttribute("src", `${data.games[0].image_url}`);
      });
}

var changeTab = function (event) {
  document.getElementById("nameTab").classList.remove("active");
  document.getElementById("ageTab").classList.remove("active");
  document.getElementById("genreTab").classList.remove("active");

  event.target.classList.add("active");

  document.getElementById("nameSearch").classList.add("hidden");
  document.getElementById("ageSearch").classList.add("hidden");
  document.getElementById("genreSearch").classList.add("hidden");
  var name = event.target.dataset.name;

  if (name === "Name") {
    document.getElementById("nameSearch").classList.remove("hidden");
  } else if (name === "Genre") {
    document.getElementById("genreSearch").classList.remove("hidden");
  } else if (name === "Age") {
    document.getElementById("ageSearch").classList.remove("hidden");
  }
};

document.querySelector("#nameTab").addEventListener("click", changeTab);
document.querySelector("#genreTab").addEventListener("click", changeTab);
document.querySelector("#ageTab").addEventListener("click", changeTab);
carouselImg();
