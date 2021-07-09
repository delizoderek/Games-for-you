var selectedBoxes = false;
let checkboxList = document.querySelectorAll("input[type='checkbox']");

for(var i = 0; i < checkboxList.length; i++) {
  checkboxList[i].addEventListener('click', function() {
      selectedBoxes = !selectedBoxes
  })
  console.log(checkboxList[i].checked);
}

function createTooltip(selector, message) {
    var btn = document.getElementById(`${selector}`)
    btn.classList.add('tooltip');
    btn.setAttribute('data-tooltip', `${message}`)
  }
  function removeTooltip(selector) {
    var btn = document.getElementById(`${selector}`)
    btn.classList.remove('tooltip')
    btn.removeAttribute('data-tooltip');
  }
  
  searchBtn.addEventListener('mouseover', function() {

    if(!searchInput.value) {
      createTooltip('name-btn', 'Please enter the name of the game you would like to search')
    }
  })
  searchBtn.addEventListener('mouseout', function() {
    removeTooltip('name-btn')
  })
  
  
  genreBtn.addEventListener('mouseover', function() {
    if(!selectedBoxes) {
      createTooltip('genre-search', 'Please select the genres you would like to search for')
    }
  })
  genreBtn.addEventListener('mouseout', function() {
    removeTooltip('genre-search')
  })