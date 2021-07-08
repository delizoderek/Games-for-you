var rawgApi = "4ff9656ea1344d38abef9231d5a4547f";
var bgAtlasApi = "id6TuxDAFr";

var car1 = document.getElementById("car1");
var car2 = document.getElementById("car2");
var car3 = document.getElementById("car3");
var car4 = document.getElementById("car4");

let searchBtn = document.querySelector("#name-btn");
let searchInput = document.querySelector("#name");
let genreBtn = document.querySelector("#genre-search");
let checkboxList = document.querySelectorAll("input[type='checkbox']");

let resultList = [];

searchBtn.addEventListener("click",function(event){
    event.preventDefault();
    let searchTerm = searchInput.value.trim();
    if(searchTerm !== "" || searchTerm !== null){
        searchTerm = searchTerm.toLowerCase();
        if(searchTerm.includes(" ")){
            searchTerm = searchTerm.replaceAll(" ","+");
        }
    }
    location.assign(`./searchresults.html?q=${searchTerm}&type=name`);
});

genreBtn.addEventListener("click",function(event){
    event.preventDefault();
    let genreString = buildGenreString();
    location.assign(`./searchresults.html?q=${genreString}&type=genre`);
    // searchByGenre(genreString);
});

// Set Dropdown Click Listeners
document.querySelector("#everyone").addEventListener("click",esrbSearch);
document.querySelector("#everyone10").addEventListener("click",esrbSearch);
document.querySelector("#teen").addEventListener("click",esrbSearch);
document.querySelector("#mature").addEventListener("click",esrbSearch);

function buildGenreString(){
    let genreQuery = "";
    for(let i = 0; i < checkboxList.length; i++){
        if(checkboxList[i].checked){
            genreQuery += `${checkboxList[i].dataset.rawgId},`;
        }
    }
    return genreQuery.substring(0,genreQuery.length-1);
}

function getVideoGameUrl(searchObject){
    if(searchObject.type){
        if(searchObject.type === 'search'){
            // type is search
            return `https://api.rawg.io/api/games?${searchObject.type}=${searchObject.value}&search_precise=true&page_size=50&key=${rawgApi}`;
        } else if(searchObject.type === 'genres'){
            // type is genres
            return `https://api.rawg.io/api/games?${searchObject.type}=${searchObject.value}&page_size=50&key=${rawgApi}`
        }
    }
}

function getBoardGameUrl(reqParams){
    if(reqParams.type) {
        if(reqParams.type === "name") {
            return `${reqURL}/search?${reqParams.type}=${reqParams.value}&client_id=JLBr5npPhV`;
        } else if(reqParams.type === "categories") {
            return `${reqURL}/search?${reqParams.type}=${reqParams.value}&client_id=JLBr5npPhV`;
        } else {
            alert("could not find any games that match the description")
        }
    }
}


/*
* 
*/
async function searchByGenre(query) {
    let vgUrl = getVideoGameUrl({type: 'genres', value: query});
    // let bgUrl = getBoardGameUrl({type: 'name', value: query});
    const rawgResp = await fetch(vgUrl);
    const rawgResults = await rawgResp.json();
    // const atlasResponse = await fetch(bgUrl);
    // const atlasResults = await atlasResponse.json();

    // populate list
    let resultList = [];
    for(let result of rawgResults.results){
        resultList.push({name: result.name, image: result.background_image, link: `https://rawg.io/games/${result.id}`});
    }
    resultList.sort(sortGames);
}

function sortGames(item1,item2){
    if(item1.name < item2.name){
        return 1;
    }

    if(item1.name > item2.name){
        return -1;
    }

    return 0;
}

function carouselImg() {
  fetch(`https://api.rawg.io/api/games?page_size=4&key=${rawgApi}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let index = Math.floor(Math.random() * 4);
      let index2 = Math.floor(Math.random() * 4);
      while (index === index2) {
        index2 = Math.floor(Math.random() * 4);
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
