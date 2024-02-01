const api_read_access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGIwYjhkYTRhNmM2YWJiMDY2MDhhNTU2ZDJiYWI0MCIsInN1YiI6IjY1YmIzYTJlMmQxZTQwMDE4NDViY2M5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HcM-Ggk9xUmj4Ull6LgmNN2IM6LH0NXtkP8YckAVLhI';

const global = {
    currentPath: window.location.pathname
};

// get popular movies
async function displayPopularMovies(){
    const { results } = await fetchAPIData('movie/popular');
    console.log(results);

    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="movie-details.html?id=${result.id}">
            ${
                result.poster_path
                ?
                `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${result.title}"
                />`
                :
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${result.title}"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${result.release_date}</small>
            </p>
            </div>`;
            document.querySelector('#popular-movies').appendChild(div);
    })
}
// get popular shows
async function displayPopularShows(){
    const { results } = await fetchAPIData('tv/popular');
    console.log(results);

    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="tv-details.html?id=${result.id}">
            ${
                result.poster_path
                ?
                `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${result.name}"
                />`
                :
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${result.name}"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${result.name }</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${result.first_air_date}</small>
            </p>
            </div>`;
            document.querySelector('#popular-shows ').appendChild(div);
    })
}
// Fetch data from tmdb api
async function fetchAPIData(endpoint){
    const API_KEY = '72728d9c2f573fcd29a0dd99801efe27';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    return data;
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function HighlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach( link => {
         if (link.getAttribute('href') === global.currentPath) {
            link.classList.add('active');
         }
    })
}

// Init app

function init(){
    switch (global.currentPath) {
        case '/' :
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html' :
            displayPopularShows();
            break;
        case '/movie-details.html' :
            console.log('movie details');
            break;
        case '/tv-details.html' :
            console.log('tv details');
            break;
        case '/search.html' :
            console.log('search');
            break;
    }

    HighlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);