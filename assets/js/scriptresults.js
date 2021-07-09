var popModal = document.getElementById("popModal");
var showPopModal = document.getElementById("popular");
var closePopModal = document.getElementById("closePopModal");
var ranModal = document.getElementById("ranModal");
var showRanModal = document.getElementById("random");
var closeRanModal = document.getElementById("closeRanModal");

var reqURL = "https://api.boardgameatlas.com/api";

function parseQuery() {
  var searchUnparsed = document.location.search;
  if (searchUnparsed.includes("&")) {
    searchParamsArr = searchUnparsed.split("&");
    let query = searchParamsArr[0].split("=");
    let type = searchParamsArr[1].split("=");
    if (type[1] === "name") {
      searchByName(query[1]);
    } else if (type[1] === "genre") {
      let queryArr = query[1].split("+");
      searchByGenre(queryArr[0], queryArr[1].split(","));
    } else if (type[1] === "esrb") {
      searchByEsrb(query[1]);
    } else {
      // Show no results availble
    }
  }
}

function getVideoGameUrl(searchObject) {
  if (searchObject.type) {
    if (searchObject.type === "name") {
      // type is search
      return `https://api.rawg.io/api/games?search=${searchObject.value}&search_precise=true&page_size=50&key=${rawgApi}`;
    } else if (searchObject.type === "genres") {
      // type is genres
      return `https://api.rawg.io/api/games?${searchObject.type}=${searchObject.value}&page_size=50&key=${rawgApi}`;
    } else if (searchObject.type === "esrb") {
      return `https://api.rawg.io/api/games?page_size=50&key=${rawgApi}`;
    }
  }
}

function getBoardGameUrl(reqParams) {
  if (reqParams.type) {
    if (reqParams.type === "name") {
      return `${reqURL}/search?${reqParams.type}=${reqParams.value}&client_id=JLBr5npPhV`;
    } else if (reqParams.type === "categories") {
      return `${reqURL}/search?${reqParams.type}=${reqParams.value}&limit=${reqParams.limit}&client_id=JLBr5npPhV`;
    } else if (reqParams.type === "min_age") {
      if (reqParams.value === "1") {
        return `${reqURL}/search?${reqParams.type}=1&client_id=JLBr5npPhV`;
      } else if (reqParams.value === "2") {
        return `${reqURL}/search?${reqParams.type}=10&client_id=JLBr5npPhV`;
      } else if (reqParams.value === "3") {
        return `${reqURL}/search?${reqParams.type}=13&client_id=JLBr5npPhV`;
      } else if (reqParams.value === "4") {
        return `${reqURL}/search?${reqParams.type}=17&client_id=JLBr5npPhV`;
      }
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
  let vgUrl = getVideoGameUrl({ type: "name", value: query });
  let bgUrl = getBoardGameUrl({ type: "name", value: query });
  const rawgResp = await fetch(vgUrl);
  const rawgResults = await rawgResp.json();
  const atlasResponse = await fetch(bgUrl);
  const atlasResults = await atlasResponse.json();

  // populate list
  let resultList = [];
  for (let result of rawgResults.results) {
    resultList.push({
      name: result.name,
      image: result.background_image,
      link: `https://rawg.io/games/${result.id}`,
    });
  }
  for (let bGame of atlasResults.games) {
    resultList.push({
      name: bGame.name,
      image: bGame.image_url,
      link: bGame.url,
    });
  }
  // // Sort results by name
  resultList.sort(sortGames);
  useData(resultList);
}

/*
 *
 */
async function searchByGenre(genQuery, catQuery) {
  let vgUrl = getVideoGameUrl({ type: "genres", value: genQuery });
  let pageLimit = 2;
  let totalResults = [];
  let resultList = [];
  const rawgResp = await fetch(vgUrl);
  const rawgResults = await rawgResp.json();

  if (catQuery.length > 0) {
    let limitRatio = Math.floor(16 / catQuery.length);
    if (limitRatio >= 8) {
      pageLimit = 20;
    } else if (limitRatio >= 4) {
      pageLimit = 10;
    } else if (limitRatio >= 2) {
      pageLimit = 5;
    }

    for (let i = 0; i < catQuery.length; i++) {
      const bgUrl = getBoardGameUrl({
        type: "categories",
        value: catQuery[i],
        limit: pageLimit,
      });
      const atlasResponse = await fetch(bgUrl);
      const atlasResults = await atlasResponse.json();
      totalResults = totalResults.concat(atlasResults.games);
      delay(10);
    }
  }
  // populate list
  for (let vGame of rawgResults.results) {
    resultList.push({
      name: vGame.name,
      image: vGame.background_image,
      link: `https://rawg.io/games/${vGame.id}`,
    });
  }
  for (let bGame of totalResults) {
    resultList.push({
      name: bGame.name,
      image: bGame.image_url,
      link: bGame.url,
    });
  }

  resultList.sort(sortGames);
  useData(resultList);
}

async function searchByEsrb(esrbRating) {
  let vgUrl = getVideoGameUrl({ type: "esrb", value: esrbRating });
  console.log(vgUrl);
  let bgUrl = getBoardGameUrl({ type: "min_age", value: esrbRating });
  let resultList = [];
  let rawgFiltered = [];
  const atlasResponse = await fetch(bgUrl);
  const atlasResults = await atlasResponse.json();

  for (let bGame of atlasResults.games) {
    resultList.push({
      name: bGame.name,
      image: bGame.image_url,
      link: bGame.url,
    });
  }

  let iter = 5;

  while(iter > -1 && rawgFiltered.length < 30){
    const rawgResp = await fetch(vgUrl);
    const rawgResults = await rawgResp.json();
    rawgFiltered = rawgFiltered.concat(filterByEsrb(rawgResults.results,Number(esrbRating)));
    vgUrl = rawgResults.next;
    delay(10);
    iter--;
  }

  // populate list
  for (let result of rawgFiltered) {
    resultList.push({
      name: result.name,
      image: result.background_image,
      link: `https://rawg.io/games/${result.id}`,
    });
  }

  resultList.sort(sortGames);
  useData(resultList);
}

function delay(msDelay) {
  return new Promise(function (resolve) {
    setInterval(resolve, msDelay);
  });
}

function sortGames(item1, item2) {
  if (item1.name < item2.name) {
    return -1;
  }

  if (item1.name > item2.name) {
    return 1;
  }

  return 0;
}

function filterByEsrb(gameList,ageRating){
  let filteredResults = [];
  for(let result of gameList){
      if(result.esrb_rating != null){
          if(result.esrb_rating.id <= ageRating){
              filteredResults.push(result);
          }
      }
  }
  return filteredResults;
}

function useData(gameData) {
  var cardList = document.getElementById("card-list");
  if(gameData.length > 0){
    cardList.textContent = "";
    for (var i = 0; i < gameData.length; i++) {
      var card = document.createElement("div");
      var imageContainer = document.createElement("div");
      var cardImage = document.createElement("img");
      var cardHeader = document.createElement("div");
      var cardTitle = document.createElement("div");
      var cardButton = document.createElement("a");
      cardImage.setAttribute("class", "customImg");
      if( gameData[i].image == null){
        cardImage.setAttribute("src", "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box.jpg");
      } else {
        cardImage.setAttribute("src", gameData[i].image);
      }
      card.setAttribute("class", "card game-card");
      imageContainer.append(cardImage);
      cardHeader.setAttribute("class", "card-header");
      cardTitle.setAttribute("class", "card-title h6 cardTitle");
      cardButton.setAttribute("class", "btn btn-primary customButtons viewBtn");
      cardButton.setAttribute("href", gameData[i].link);
      cardButton.setAttribute("target", "_blank");
      cardButton.textContent = "view";
      cardTitle.textContent = gameData[i].name;
      cardHeader.append(cardTitle, cardButton);
  
      imageContainer.setAttribute("class", "card-image");
      card.append(imageContainer, cardHeader);
  
      cardList.append(card);
    }
  } else {
    let dispMesg = document.createElement("h2");
    dispMesg.setAttribute("style","color: var(--text);");
    dispMesg.textContent = "Whoops! We didn't find any results for that...";
    cardList.append(dispMesg);
  }
}

showPopModal.addEventListener("click", function () {
  popModal.classList.add("active");
  popularModal();
});
closePopModal.addEventListener("click", function () {
  popModal.classList.remove("active");
});
showRanModal.addEventListener("click", function () {
  ranModal.classList.add("active");
  randomModal();
});
closeRanModal.addEventListener("click", function () {
  ranModal.classList.remove("active");
});

function randomModal() {
  fetch(
    `https://api.boardgameatlas.com/api/search?random=true&client_id=${bgAtlasApi}`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      document.getElementById("ranName").textContent = data.games[0].name;
      document
        .getElementById("ranImg")
        .setAttribute("src", `${data.games[0].image_url}`);
      document.getElementById(`ranImg`).style.width = `70%`;
      document.getElementById(`ranImg`).style.height = `70%`;
      document
        .getElementById(`ranLink`)
        .setAttribute("href", `${data.games[0].url}`);
      document.getElementById(`ranLink`).textContent = `${data.games[0].url}`;
    });
}
function popularModal() {
  fetch(`https://api.rawg.io/api/games?page_size=4&key=${rawgApi}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i <= 3; i++) {
        document.getElementById(`vg${i + 1}Name`).textContent =
          data.results[i].name;
        document
          .getElementById(`vg${i + 1}Img`)
          .setAttribute("src", `${data.results[i].background_image}`);
        document.getElementById(`vg${i + 1}Img`).style.width = `75%`;
        document.getElementById(`vg${i + 1}Img`).style.height = `75%`;
        document
          .getElementById(`vg${i + 1}Link`)
          .setAttribute("href", `https://rawg.io/games/${data.results[i].id}`);
        document.getElementById(
          `vg${i + 1}Link`
        ).textContent = `https://rawg.io/games/${data.results[i].id}`;
      }
    });
  fetch(
    `https://api.boardgameatlas.com/api/search?order_by=popularity&client_id=${bgAtlasApi}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      for (let i = 0; i <= 3; i++) {
        document.getElementById(`bg${i + 1}Name`).textContent =
          response.games[i].name;
        document
          .getElementById(`bg${i + 1}Img`)
          .setAttribute("src", `${response.games[i].image_url}`);
        document.getElementById(`bg${i + 1}Img`).style.width = `75%`;
        document.getElementById(`bg${i + 1}Img`).style.height = `75%`;
        document
          .getElementById(`bg${i + 1}Link`)
          .setAttribute("href", `${response.games[i].url}`);
        document.getElementById(
          `bg${i + 1}Link`
        ).textContent = `${response.games[i].url}`;
      }
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

parseQuery();
