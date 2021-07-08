var rawgApi = "4ff9656ea1344d38abef9231d5a4547f";
var bgAtlasApi = "id6TuxDAFr";

var car1 = document.getElementById("car1");
var car2 = document.getElementById("car2");
var car3 = document.getElementById("car3");
var car4 = document.getElementById("car4");
var favModal = document.getElementById("favModal")
var showFavModal = document.getElementById("favorites")
var closeFavModal = document.getElementById("closeFavModal")
var popModal = document.getElementById("popModal")
var showPopModal = document.getElementById("popular")
var closePopModal = document.getElementById("closePopModal")

let searchBtn = document.querySelector("#name-btn");
let searchInput = document.querySelector("#name");
let genreBtn = document.querySelector("#genre-search");
let checkboxList = document.querySelectorAll("input[type='checkbox']");

showFavModal.addEventListener("click", function(){
  favModal.classList.add("active")
})
closeFavModal.addEventListener("click", function(){
  favModal.classList.remove("active")
})

showPopModal.addEventListener("click", function(){
  popModal.classList.add("active")
  popularModal()
})
closePopModal.addEventListener("click", function(){
  popModal.classList.remove("active")
})

function popularModal(){
  fetch(`https://api.rawg.io/api/games?page_size=4&key=${rawgApi}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i <= 3; i++) {
        document.getElementById(`vg${i+1}Name`).textContent = data.results[i].name
        document.getElementById(`vg${i+1}Img`).setAttribute("src", `${data.results[i].background_image}`)
        document.getElementById(`vg${i+1}Img`).style.width = `70%`
        document.getElementById(`vg${i+1}Img`).style.height = `70%`
        document.getElementById(`vg${i+1}Link`).setAttribute("href", `https://rawg.io/games/${data.results[i].id}`)
        document.getElementById(`vg${i+1}Link`).textContent = `https://rawg.io/games/${data.results[i].id}`
        
      }
    });
    fetch(`https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=${bgAtlasApi}`)
    .then(function(response){
      return response.json()
    })
    .then(function(response){
      for (let i = 0; i <= 3; i++) {
        
        document.getElementById(`bg${i+1}Name`).textContent = response.games[i].name
        document.getElementById(`bg${i+1}Img`).setAttribute("src", `${response.games[i].image_url}`)
        document.getElementById(`bg${i+1}Img`).style.width = `70%`
        document.getElementById(`bg${i+1}Img`).style.height = `70%`
        document.getElementById(`bg${i+1}Link`).setAttribute("href", `${response.games[i].url}`)
        document.getElementById(`bg${i+1}Link`).textContent  = `${response.games[i].url}`
      }
    })
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
    location.assign(`./searchresults.html?q=${searchTerm}`);
    // searchByName(searchTerm);
});

/*
* 
*/
async function searchByName(query) {
    let tagsUrl = getVideoGameUrl(query);
    let bgUrl = getBoardGameUrl({type: 'name', value: query});
    const rawgResp = await fetch(tagsUrl);
    const rawgResults = await rawgResp.json();
    const atlasResponse = await fetch(bgUrl);
    const atlasResults = await atlasResponse.json();

    // populate list
    let tempList = [];
    for(let result of rawgResults.results){
        tempList.push({name: result.name, image: result.background_image, link: `https://rawg.io/games/${result.id}`});
    }
    for(let bGame of atlasResults.games){
        tempList.push({name: bGame.name, image: bGame.image_url, link: bGame.url});
    }
    // // Sort results by name
    tempList.sort(sortGames);
    console.log(tempList);
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
      console.log(data)
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
