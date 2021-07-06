var reqURL = 'https://api.boardgameatlas.com/api'
console.log(reqURL)
https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=JLBr5npPhV
var jsonResponse = ''
function getParams(reqParams) {
    console.log(reqParams)
    if(reqParams.type) {
        if(reqParams.type === "name") {
            return getData(`search?${reqParams.type}=`, reqParams.value)
        } else if(reqParams.type === "categories") {
            console.log(reqParams)
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
function getData(typeParam, typeValue) {
    fetch(`${reqURL}/${typeParam}${typeValue}&client_id=JLBr5npPhV`)
        .then(response => {
            if(!response.ok) {
                console.log(console.error())
            } else {
                console.log(response.json())
                jsonResponse = response.json()
                // console.log(response.json())
                return response.json()
            }
        })
}
// getParams({type: "categories",
//         value: "Adventure"})
getParams({doThis: "getCategories"})