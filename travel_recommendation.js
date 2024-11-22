
let searchBarInputElement = document.getElementsByClassName("navbar-searchbar-input")[0] ; 

const searchButton = document.getElementsByClassName("navbar-searchbar-search-button")[0] ; 
searchButton.addEventListener("click", submitSearch) ; 

const clearButton = document.getElementsByClassName("navbar-searchbar-clear-button")[0] ;
clearButton.addEventListener("click", clearSearch) ; 


// Task 6
async function getRecommendationResults() {

    const recommendationResults = 
    await fetch("https://blessingogunyinka.github.io/travelRecommendation/travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        return data ;  
    })
    .catch(error => {
        console.log(error) ; 
    }) ; 

    console.log(recommendationResults) ; 

    return recommendationResults ; 

}


// Task 6 
await getRecommendationResults() ; 


function searchResultComponent(imageUrl, name, description) {
    return `
    <div class="travel-recommendation-search-result-component">
        <img class="travel-recommendation-search-result-image" src="${imageUrl}" />
        <div class="travel-recommendation-search-result-info">
            <div class="travel-recommendation-search-result-name"><b>${name}</b></div>
            <div class="travel-recommendation-search-result-description">${description}</div>
            <div class="travel-recommendation-search-result-visit-button">Visit</div>
        </div>
    </div>
    `
}


async function submitSearch() {

    const searchResultsContainer = document.getElementsByClassName("travel-recommendation-search-results-container")[0]

    searchResultsContainer.innerHTML = "" ; 

    if (!searchBarInputElement) {
        searchBarInputElement = document.getElementsByClassName("navbar-searchbar-input")[0] ; 
    }

    const input = searchBarInputElement.value.toLowerCase() ; 

    const travelData = await getRecommendationResults() ; 
    
    if (input.includes("beach")) {
        travelData.beaches.map(beach => {
            searchResultsContainer.innerHTML += searchResultComponent(beach.imageUrl, beach.name, beach.description) ; 
        })
    } else if (input.includes("temple")) {
        travelData.temples.map(temple => {
            searchResultsContainer.innerHTML += searchResultComponent(temple.imageUrl, temple.name, temple.description) ; 
        })
    } else if (input.includes("country") || input.includes("countries")) {
        travelData.countries.map(country => {
            country.cities.map(city => {
                searchResultsContainer.innerHTML += searchResultComponent(city.imageUrl, city.name, city.description) ; 
            }) ; 
        }) ; 
    } else {
        searchResultsContainer.innerHTML = `<h1>No results</h1>`
    }

    searchResultsContainer.innerHTML += `<br /><br /><br />`
}


function clearSearch() {
    const searchBarForm = document.getElementsByClassName("navbar-searchbar-form")[0] ; 
    searchBarForm.reset() ; 
}





                                  
