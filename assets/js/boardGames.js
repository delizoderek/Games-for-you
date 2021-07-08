var reqURL = 'https://api.boardgameatlas.com/api'
var reqCID = '&client_id=JLBr5npPhV'
var rawgURL = 'https://api.rawg.io/api'
// var rawgKey = '67a03305827341eaaf787bd38cb5cafa'
// var searchBtn = document.getElementById('name-btn')
// var searchBar = document.getElementById('name')
var categenre = [];
var newArr = [];


function getParams(reqParams) {
    if(reqParams.type) {
        if(reqParams.type === "name") {
            getData(reqURL, reqCID, `search?${reqParams.type}=`, reqParams.value, 'nameResults')
        }
    } else if(reqParams.doThis) {
        if(reqParams.doThis === "getCategories") {
            getData(reqURL, reqCID, "game","/categories?pretty=true", 'categoriesResults')
        }
    } else if(reqParams.rawg) {
        if(reqParams.rawg === "genres") {
            getData(rawgURL, rawgKey, "genres", '?key=', 'rawgGenres')
        }
    } else if(reqParams.genreArray) {
        console.log(reqParams.genreArray)
        for(var i = 0; i < reqParams.genreArray.length; i++) {
            console.log(newArr[i].name)
            if(newArr[i].name = reqParams.genreArray[i]) {
                getData(reqURL, reqCID, "search?", `categories=${newArr[i].id}`, 'genreResults')
            }  
        }
        
    }
    
}
async function getData(url, key, typeParam, typeValue, type) {
    console.log((`${url}/${typeParam}${typeValue}${key}`))
    fetch(`${url}/${typeParam}${typeValue}${key}`)
        .then(response => response.json())
        .then(data => {
            // genCards(data.games)
            console.log(data)
            useData({results: data, purpose: type})
        })
}

// checks data to see if needs to run fetch again with selected categories or generate cards
function useData(data) {
    if(data.purpose === 'nameResults') {
        //this code executes if the data object received is a list of games from searching
        console.log(data)
        generateCards(data.results.games)
    }
    else if(data.purpose === 'categoriesResults') {
        //this code executes if the data received from getData() is the list of categories from atlas api, gets ids for all of the genres that were selected
        for(var i = 0; i < categenre.length; i++) {
            for(var x = 0; x < data.results.categories.length; x++) {
                if(categenre[i] === data.results.categories[x].name) {
                    newArr.push({id: data.results.categories[x].id, name: categenre[i]})
                }
            }
        }
        getParams({catObject: newArr})
        
    } else if(data.purpose === 'rawgGenres') {
        //this code executes if data passed from getData() is the genres array from rawg api
        for(var i = 0; i < data.results.results.length; i++) {
            categenre.push(data.results.results[i].name)
        }
        console.log(categenre)
        getParams({doThis: "getCategories"})
    } else if(data.purpose === 'genreResults') {
        filteredGenreResults = filteredGenreResults.concat(data.results.games.slice(0, 10))  
        console.log(filteredGenreResults)
    }
}




function generateCards(games) {
    var list = document.getElementById('testRes');
    var columns = document.createElement('div');
    list.append(columns);
    columns.setAttribute('class', 'columns')
    var maxLength = 20
    if(games.length < 20) {
        maxLength = games.length
    }
    for(var i = 0; i < maxLength; i++) {
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
getParams({rawg: 'genres'})
// getParams({type: "categories",
//         value: "Adventure"})


// getParams({type: 'categories', value: ''})

searchBtn.addEventListener('click', function() {
    getParams({type: 'name', value: searchInput.value})
})









// function genCards(dataArr) {

//     var list = document.getElementById('testRes');
//     var columns = document.createElement('div');
//     columns.setAttribute('class', 'columns')

//     for(var i = 0; i < 20; i++) {
//         columns.append(generateCard(dataArr[i].name, dataArr[i].image_url, dataArr[i].price, dataArr[i].description))
//     }
// }

// function generateCard(cardTitle, cardSubtitle, cardImg, cardBody) {
//     console.log(cardBody)
//     var col = document.createElement('div');
//     col.setAttribute('class', 'column col-6')
//     var card = document.createElement('div');
//     var cardImg = document.createElement('div');
//     var img = document.createElement('img');
//     var cardHeader = document.createElement('div');
//     var cardTitle = document.createElement('div');
//     var cardSubtitle = document.createElement('div');
//     var cardBody = document.createElement('div');
//     card.setAttribute('class', 'card game');
//     cardImg.setAttribute('class', 'card-image');
//     img.setAttribute('class', 'img-responsive');
//     cardHeader.setAttribute('class', 'card-header');
//     cardTitle.setAttribute('class', 'card-title h5');
//     cardSubtitle.setAttribute('class', 'card-subtitle text-gray');
//     cardBody.setAttribute('class', 'card-body');
//     img.src = cardImg;
//     img.alt = cardImg;
        
//     cardTitle.textContent = cardTitle
//     cardSubtitle.textContent = cardSubtitle
//     // cardBody.innerHTML = cardBody.slice(0, 300)
//     cardImg.append(img)
//     cardHeader.append(cardTitle, cardSubtitle)
//     card.append(cardImg, cardHeader, cardBody)
//     col.append(card)
//     return col;
// }
