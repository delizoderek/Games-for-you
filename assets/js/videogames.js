let key = "bBS0ShoGPv";

function gameSearch(searchTerm){
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

// function genreSearch(){
//     // TODO: Search by genre and display results
//     let requestUrl = `https://api.rawg.io/api/games?genres=${buildGenreString()}&page_size=50&key=${rawgKey}`;
//     fetch(requestUrl)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         if(data.results.length > 0){
//             console.log(data.results);
//         }
//     });
// }

// function buildGenreString(){
//     let genreQuery = "";
//     let categoryList = [];
//     for(let i = 0; i < checkboxList.length; i++){
//         if(checkboxList[i].checked){
//             genreQuery += `${checkboxList[i].dataset.gid},`;
//             categoryList.push(checkboxList[i].value)
//         }
//     }
//     getParams({genreArray: erikTesting})
//     return genreQuery.substring(0,genreQuery.length-1);
// }

// function esrbSearch(event){
//     // TODO: Search for games by age
//     event.preventDefault();
//     getEsrbResults(Number(event.target.dataset.esrbid));
// }

function getEsrbResults(ratedE){
    let tagsUrl = `https://api.rawg.io/api/games?page_size=50&key=${rawgKey}`;
    fetch(tagsUrl)
    .then(function(response){
        return response.json();
    }).then(function(data){
        let results = filterByEsrb(data.results,ratedE);
        console.log(results);
    })
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

// Set Dropdown Click Listeners
document.querySelector("#everyone").addEventListener("click",esrbSearch);
document.querySelector("#everyone10").addEventListener("click",esrbSearch);
document.querySelector("#teen").addEventListener("click",esrbSearch);
document.querySelector("#mature").addEventListener("click",esrbSearch);