var reqURL = 'https://api.boardgameatlas.com/api'
var reqCID = '&client_id=JLBr5npPhV'
var rawgURL = 'https://api.rawg.io/api'
var rawgKey = '67a03305827341eaaf787bd38cb5cafa'
var searchBtn = document.getElementById('name-btn')
var searchBar = document.getElementById('name')
var categenre = [];
var newArr = [];
console.log(reqURL)
https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=JLBr5npPhV


function getParams(reqParams) {
    console.log(reqParams)
    if(reqParams.type) {
        if(reqParams.type === "name") {
            return getData(reqURL, reqCID, `search?${reqParams.type}=`, reqParams.value)
        }
    } else if(reqParams.doThis) {
        if(reqParams.doThis === "getCategories") {
            getData(reqURL, reqCID, "game","/categories?pretty=true")
        }
    } else if(reqParams.rawg) {
        if(reqParams.rawg === "genres") {
            getData(rawgURL, rawgKey, "genres", '?key=')
        }
    } else if(reqParams.catObject) {
        var qString = ''
        console.log(reqParams.catObject)
        for(var i = 0; i < reqParams.catObject.length; i++) {
            qString += `categories=${reqParams.catObject[i].id}`
            if(i < reqParams.catObject.length - 1) {
                qString += `&`;
            }
            
        }
        console.log(qString)
        getData(reqURL, reqCID, "search?", qString)
    }
    
}
async function getData(url, key, typeParam, typeValue) {
    fetch(`${url}/${typeParam}${typeValue}${key}`)
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
    else if(data.categories) {
        console.log(data.categories.length)
        for(var i = 0; i < categenre.length; i++) {
            console.log(i)
            for(var x = 0; x < data.categories.length; x++) {
                if(categenre[i] === data.categories[x].name) {
                    newArr.push({id: data.categories[x].id, name: categenre[i]})
                }
            }
        }
        getParams({catObject: newArr})
        console.log(newArr)
        
    } else if(data.results.length = 19) {
        for(var i = 0; i < data.results.length; i++) {
            categenre.push(data.results[i].name)
        }
        console.log(categenre)
        getParams({doThis: "getCategories"})
        console.log('correct data')
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
getParams({rawg: 'genres'})
// getParams({type: "categories",
//         value: "Adventure"})


// getParams({type: 'categories', value: ''})

searchBtn.addEventListener('click', function() {
    getParams({type: 'name', value: searchBar.value})
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
