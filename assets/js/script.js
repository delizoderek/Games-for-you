var reqURL = "https://api.boardgameatlas.com/api"

https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=JLBr5npPhV

function getData(type, filter) {
    fetch(`https://api.boardgameatlas.com/api/${type}?name=${filter}&client_id=YLKK3qmQkg`)
        .then(response => {
            if(!response.ok) {
                console.log(console.error())
            } else {
                return response.json()
            }
        })
}
getData("search", "Star Trek")