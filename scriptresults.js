
const rawgApiKey = "af49dfc3bcde4d6396d5bccbf1076f17";

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

    // var cardImage = document.getElementById('image')
    // var cardTitle = document.getElementById('title')
    // var cardDescription = document.getElementById('description')
    // var cardLink = document.getElementById('link')
    // console.log(cardTitle.innerText)
    // cardTitle.textContent = gameData.games[0].name
    // // cardDescription.textContent = gameData.games[0].description
    // cardImage.setAttribute("src", gameData.games[0].image_url)

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

