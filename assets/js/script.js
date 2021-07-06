let key = "c8b7f2f435b2c64e0004efde1aeeeefdc372de08";
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

let searchBtn = document.querySelector("#searching-game");
let gameList = [];

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
    // gameSearch(searchTerm);
    genreSearch();
});

// function apiSearch(event,searchType){

// }

function createCheckboxes(){
    let checkContainer = document.querySelector("#checkboxes");
    for(let check in genreChoices){
        let checkLabel = document.createElement("label");
        let cBox = document.createElement("input");
        let btnText = document.createElement("i");
        checkLabel.setAttribute("class","form-checkbox");
        cBox.setAttribute("type","checkbox");
        cBox.setAttribute("data-rawg-id",genreChoices[check]);
        btnText.setAttribute("class","form-icon");
        genreCheckboxes.push(cBox);
        checkLabel.append(cBox);
        checkLabel.append(btnText);
        checkLabel.append(check);
        checkContainer.append(checkLabel);
    }

}

function gameSearch(searchTerm){
    let requestUrl = `https://api.rawg.io/api/games?search=${searchTerm}&search_precise=true&page_size=50&key=${rawgKey}`;
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
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

function tagsSearch(){
    // TODO: Search by and display results
    let tagsUrl = `https://api.rawg.io/api/genres?page_size=50&key=${rawgKey}`;
    fetch(tagsUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let strOut = "";
        for(let genre of data.results){
            strOut += `${genre.name.toLowerCase()}: ${genre.id},\n`;
        }
        console.log(strOut);
    });
}

function ageSearch(){
    // TODO: Search for games by age
}

createCheckboxes();


