var car1 = document.getElementById("car1");
var car2 = document.getElementById("car2");
var car3 = document.getElementById("car3");
var car4 = document.getElementById("car4");
var popModal = document.getElementById("popModal");
var showPopModal = document.getElementById("popular");
var closePopModal = document.getElementById("closePopModal");
var ranModal = document.getElementById("ranModal");
var showRanModal = document.getElementById("random");
var closeRanModal = document.getElementById("closeRanModal");

// Event listener for showing the popular games modal
showPopModal.addEventListener("click", function () {
  popModal.classList.add("active");
  popularModal();
});

// Event listener for closing the popular games modal
closePopModal.addEventListener("click", function () {
  popModal.classList.remove("active");
});

// Event Listener for showing the random games modal
showRanModal.addEventListener("click", function () {
  ranModal.classList.add("active");
  randomModal();
});

// Event Listener for closing the random games modal
closeRanModal.addEventListener("click", function () {
  ranModal.classList.remove("active");
});

// Opens a modal and displays a random game in it
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

// Opens a modal and displays 2 popular board games and 2 popular video games
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

// Gets the games from the atlas and rawg api, then dispalys them in the carousel
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

// Handles showing/displaying the contents of each tab
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

// Adds event listeners to each tab button
document.querySelector("#nameTab").addEventListener("click", changeTab);
document.querySelector("#genreTab").addEventListener("click", changeTab);
document.querySelector("#ageTab").addEventListener("click", changeTab);

// first function that is run on page load, to begin loading the search results
carouselImg();
