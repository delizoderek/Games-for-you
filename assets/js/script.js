console.log("Hello World");
https://api.rawg.io/api/games?page_size=10&key=a64070dd102e45d4bbd286bc64075645
var rawgApi = "a64070dd102e45d4bbd286bc64075645"
var bgAtlasApi = "id6TuxDAFr"
var car1 = document.getElementById("car1")
var car2 = document.getElementById("car2")
var car3 = document.getElementById("car3")
var car4 = document.getElementById("car4")
function carouselImg(){
    fetch(`https://api.rawg.io/api/games?page_size=10&key=${rawgApi}`)
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        car1.setAttribute("src", `${data.results[Math.floor(Math.random() * 10)].background_image}`)
        car3.setAttribute("src", `${data.results[Math.floor(Math.random() * 10)].background_image}`)
    })
    fetch(`https://api.boardgameatlas.com/api/search?name=Catan&client_id=${bgAtlasApi}`)
    .then(function(data){
        return data.json()
    })
    .then(function(data){
        console.log(data)
    })
}

carouselImg()



