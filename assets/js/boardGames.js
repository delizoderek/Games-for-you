var reqURL = 'https://api.boardgameatlas.com/api'
var searchBar = document.getElementById('name');

var jsonResponse = ''
function getParams(reqParams) {
    console.log(reqParams)
    if(reqParams.type) {
        if(reqParams.type === "name") {
            return getData(`search?${reqParams.type}=`, reqParams.value)
        } else if(reqParams.type === "categories") {
            return getData(`search?${reqParams.type}=`, reqParams.value)
        } else {
            alert("could not find any games that match the description")
        }
    } else if(reqParams.doThis) {
        if(reqParams.doThis === "getCategories") {
            getData("game","/categories?pretty=true")
        }
    }
    
}

async function getData(typeParam, typeValue) {
    fetch(`${reqURL}/${typeParam}${typeValue}&client_id=JLBr5npPhV`)
        .then(response => response.json())
        .then(data => {
            // genCards(data.games)
            console.log(data)
            useData(data)
        })
}

// checks data to see if needs to run fetch again with selected categories or generate cards
function useData(data) {
    if(data.games) {
        generateCards(data.games)
    }
    if(data.category) {
        console.log("do this");
        
    }
}

function generateCards(games) {
    var list = document.getElementById('testRes');
    var columns = document.createElement('div');
    list.append(columns);
    columns.setAttribute('class', 'columns')
    for(var i = 0; i < 20; i++) {
        var col = document.createElement('div'); 
        col.setAttribute('class', 'column col-sm-6 col-md-4 col-lg-3 col-xl-3')

        var card = document.createElement('div');
        var cardImg = document.createElement('div');
        var img = document.createElement('img');
        var cardHeader = document.createElement('div');
        var cardTitle = document.createElement('div');
        var cardSubtitle = document.createElement('div');
        var cardBody = document.createElement('div');
        var link = document.createElement('a');
        link.setAttribute('class', 'cardURL');
        link.href = games[i].url;
        link.target = '_blank'
        card.setAttribute('class', 'card game');
        cardImg.setAttribute('class', 'card-image');
        img.setAttribute('class', 'img-responsive');
        cardHeader.setAttribute('class', 'card-header');
        cardTitle.setAttribute('class', 'card-title h5');
        cardSubtitle.setAttribute('class', 'card-subtitle text-gray');
        cardBody.setAttribute('class', 'card-body');
        
        img.src = games[i].image_url;
        img.alt = games[i].image_url;
        
        cardTitle.textContent = games[i].name
        cardSubtitle.textContent = games[i].price
        cardBody.innerHTML = games[i].description.slice(0, 300)

        
        cardImg.append(img)
        cardHeader.append(cardTitle, cardSubtitle)
        card.append(cardImg, cardHeader, cardBody)
        link.append(card)
        col.append(link)
        columns.append(col)
        

    }
}

// getParams({type: "categories",
//         value: "Adventure"})
getParams({doThis: "getCategories"})


// searchBtn.addEventListener('click', function() {
//     getParams({type: 'name', value: searchBar.value})
// })









function genCards(dataArr) {

    var list = document.getElementById('testRes');
    var columns = document.createElement('div');
    columns.setAttribute('class', 'columns')

    for(var i = 0; i < 20; i++) {
        columns.append(generateCard(dataArr[i].name, dataArr[i].image_url, dataArr[i].price, dataArr[i].description))
    }
}

function generateCard(cardTitle, cardSubtitle, cardImg, cardBody) {
    console.log(cardBody)
    var col = document.createElement('div');
    col.setAttribute('class', 'column col-6')
    var card = document.createElement('div');
    var cardImg = document.createElement('div');
    var img = document.createElement('img');
    var cardHeader = document.createElement('div');
    var cardTitle = document.createElement('div');
    // var cardSubtitle = document.createElement('div');
    var cardBody = document.createElement('div');
    card.setAttribute('class', 'card game');
    cardImg.setAttribute('class', 'card-image');
    img.setAttribute('class', 'img-responsive');
    cardHeader.setAttribute('class', 'card-header');
    cardTitle.setAttribute('class', 'card-title h5');
    // cardSubtitle.setAttribute('class', 'card-subtitle text-gray');
    cardBody.setAttribute('class', 'card-body');
    img.src = cardImg;
    img.alt = cardImg;
        
    cardTitle.textContent = cardTitle
    cardSubtitle.textContent = cardSubtitle
    // cardBody.innerHTML = cardBody.slice(0, 300)
    cardImg.append(img)
    // cardHeader.append(cardTitle, cardSubtitle)
    card.append(cardImg, cardHeader, cardBody)
    col.append(card)
    return col;
}
