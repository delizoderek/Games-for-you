var layout = document.getElementById("layout");

function renderNav() {
    var navbar = document.getElementById("main-nav");
    var navWrapper = document.createElement("section");
    var navLogo = document.createElement("a");
    navWrapper.setAttribute("class", "navbar-section");
    navLogo.setAttribute("class", "brand-logo");
    navLogo.textContent = "Logo";
    navWrapper.append(navLogo);
    navbar.append(navWrapper);
}
function renderForm() {
    var parent = document.getElementById("searchCol")
    var form = document.createElement("div");
    var formHeader = document.createElement("h4");
    var formLabel = document.createElement("label");

    formLabel.setAttribute("for", "autocomplete-input");
    formLabel.textContent = "Search"
    formHeader.textContent = "Search Form"
    form.setAttribute("class", "search-form");
    var searchInput = document.createElement("input")
    searchInput.setAttribute("class", "autocomplete");
    searchInput.type = "text"
    searchInput.id = "autocomplete-input"
    form.append(formHeader, formLabel, searchInput)
    parent.append(form)
}

function renderLayout() {
    var container = document.createElement("div");
    var searchForm = document.createElement("div")
    var row = document.createElement("div");
    var searchCol = document.createElement("div");
    var resultsCol = document.createElement("div")
    container.setAttribute("class", "container");
    row.setAttribute("class", "columns");
    searchCol.id = "searchCol";
    resultsCol.id = "resultsCol"
    searchCol.setAttribute("class", "col-12 col-md-3")
    resultsCol.setAttribute("class", "col-12 col-md-9")
    row.append(searchCol)
    row.append(resultsCol)

    
    container.append(row)
    layout.append(container)
    renderForm()
}













// renderNav()
// renderLayout()