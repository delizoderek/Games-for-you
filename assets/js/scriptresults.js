const rawgApi = "4ff9656ea1344d38abef9231d5a4547f";
const bgAtlasApi = "id6TuxDAFr";

var reqURL = 'https://api.boardgameatlas.com/api'

function parseQuery(){
    var searchUnparsed = document.location.search;
    if(searchUnparsed.includes("&")){
        searchParamsArr = searchUnparsed.split('&');
    } else {
        searchQuery = searchUnparsed.split("=");
        searchQuery.shift();
        searchByName(searchQuery[0]);
    }
}

function getVideoGameUrl(searchTerm){
    return `https://api.rawg.io/api/games?search=${searchTerm}&search_precise=true&page_size=50&key=${rawgApi}`;
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
    } else if(reqParams.doThis) {
        if(reqParams.doThis === "getCategories") {
            getData("game","/categories?pretty=true")
        }
    }
}

/*
* Container Object
* name: Name of Game - type String
* image: Link to thumbnail image - type String
* link: Link to 'store' page - type String
*/
async function searchByName(query) {
    let tagsUrl = getVideoGameUrl(query);
    let bgUrl = getBoardGameUrl({type: 'name', value: query});
    const rawgResp = await fetch(tagsUrl);
    const rawgResults = await rawgResp.json();
    const atlasResponse = await fetch(bgUrl);
    const atlasResults = await atlasResponse.json();

    // populate list
    let resultList = [];
    for(let result of rawgResults.results){
        resultList.push({name: result.name, image: result.background_image, link: `https://rawg.io/games/${result.id}`});
    }
    for(let bGame of atlasResults.games){
        resultList.push({name: bGame.name, image: bGame.image_url, link: bGame.url});
    }
    // // Sort results by name
    resultList.sort(sortGames);
    console.log(resultList);
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

function getData(){
    fetch("https://api.boardgameatlas.com/api/search?name=Monopoly&client_id=JLBr5npPhV")
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        useData(data)
    })
}
getData()

function useData(gameData){
    console.log(gameData.games[0].image_url)

    var cardImage = document.getElementById('image')
    var cardTitle = document.getElementById('title')
    var cardDescription = document.getElementById('description')
    var cardLink = document.getElementById('link')
    console.log(cardTitle.innerText)
    cardTitle.textContent = gameData.games[0].name
    // cardDescription.textContent = gameData.games[0].description
    cardImage.setAttribute("src", gameData.games[0].image_url)

    for(var i=0;i<20;i++){
        var cardList = document.getElementById('card-list')
        var card = document.createElement("div")
        var imageContainer = document.createElement("div")
        var cardImage = document.createElement("img")
        var cardHeader = document.createElement("div")
        var cardTitle = document.createElement("div")
        var cardButton = document.createElement("a")
        cardImage.setAttribute("class", "img-responsive")
        
        cardImage.setAttribute("src", gameData.games[i].image_url)
        card.setAttribute("class", "card game-card")
        console.log(cardImage)
        imageContainer.append(cardImage)
        cardHeader.setAttribute("class", "card-header")
        cardTitle.setAttribute("class", "card-title h5 cardTitle")
        cardButton.setAttribute("class", "btn btn-primary")
        cardButton.setAttribute("href", gameData.games[i].url)
        cardButton.setAttribute("target", "_blank")
        cardButton.textContent = "view"
        cardTitle.textContent = gameData.games[i].name
        cardHeader.append(cardTitle,cardButton)



        imageContainer.setAttribute("class", "card-image")
        card.append(imageContainer,cardHeader)

        
        cardList.append(card)
        console.log(cardList)
    }

}
useData()
parseQuery();
