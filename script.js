//global variables
const form = document.querySelector("#form") //selects the form from html 
const searchResults = document.querySelector("#search-results")
const sInput = document.querySelector("#search")

const button = document.querySelector("#button")
button.addEventListener("submit", showMore)

const apiUrlBase = "https://api.themoviedb.org/3/movie/now_playing?"
const apiSearchUrl = "https://api.themoviedb.org/3/search/movie?"
const apiKey = "97a9cff380bb22355a6c9894328a0b03"; 
const posterUrlBase = "http://image.tmdb.org/t/p/w185" 
var pageNum = 1

//default actions
playingNow();
form.addEventListener("submit", handleFormSubmit);
 
const clear = document.querySelector("#clear")

// Page will default to movies now playing 
async function playingNow() { //async tells you to wait before using func
    const apiUrl = `${apiUrlBase}&api_key=${apiKey}&page=${pageNum}`;
    console.log(apiUrl)
    const response = await fetch(apiUrl); //give fetch the Url 
    const responseData = await response.json(); //extract data from response
    const movie = responseData.results;
    displayResults(movie);
}

// Displays movie poster, title, and average rating
function displayResults(movieArray) {
    movieArray.forEach(element => {
        searchResults.innerHTML += `
        <div class="description">
            <img class="movie-poster" src="${posterUrlBase}${element.poster_path}" alt="${element.title}" title="${element.title}"/>
            <div class="title-and-stars">
                <p><img src="https://freepngimg.com/download/star/36741-4-3d-gold-star-transparent-background.png" alt="Star icon" width="15px" height="15px"> ${element.vote_average} </p>
                <p>${element.title}</p>
            </div> 
        </div>
        `
    });
}

// Function for searching a specific movie title 
async function movieSearch() { //async tells you to wait before using func
    // evt.preventDefault();
    const input = sInput.value;
    const apiUrl = `${apiSearchUrl}&api_key=${apiKey}&query=${input}`;
    console.log(apiUrl)
    const response = await fetch(apiUrl); //give fetch the Url 
    const responseData = await response.json(); //extract data from response
    displayResults(responseData.results)
}

// Function that will clear the searchbar and results from the page
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    searchResults.innerHTML = "" 
    movieSearch();
    sInput.value = ""
}
   
//function that shows more results on the page 
function showMore(evt) {
    evt.preventDefault();
    pageNum = pageNum+1;
    playingNow()
}


