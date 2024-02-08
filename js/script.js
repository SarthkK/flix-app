const api_read_access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGIwYjhkYTRhNmM2YWJiMDY2MDhhNTU2ZDJiYWI0MCIsInN1YiI6IjY1YmIzYTJlMmQxZTQwMDE4NDViY2M5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HcM-Ggk9xUmj4Ull6LgmNN2IM6LH0NXtkP8YckAVLhI';

const global = {
    currentPath: window.location.pathname,
    search : {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults: 0
    }
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
// Get movie details
async function displayMovieDetails(){
    const movie_id = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movie_id}`);
    displayBackgroundImage('movie', movie.backdrop_path);
    div = document.createElement('div');
    div.innerHTML = 
    `<div class="details-top">
    <div>
    ${
        movie.poster_path
        ?
        `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
        />`
        :
        `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
        />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommas(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommas(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map(com => `<span>${com.name}</span>`).join(', ')}</div>
  </div>`
  ;
    document.querySelector('#movie-details').appendChild(div);
}
// Get show details
async function Details(){
    const show_id = window.location.split('=')[1];
    const show = await fetchAPIData(`tv/${show_id}`);
    displayBackgroundImage('show', show.backdrop_path);
    div = document.createElement('div');
    div.innerHTML = 
    `<div class="details-top">
    <div>
    ${
        show.poster_path
        ?
        `<img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
        />`
        :
        `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
        />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes :</span> ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies.map(com => `<span>${com.name}</span>`).join(', ')}</div>
  </div>`
  ;
    document.querySelector('#show-details').appendChild(div);
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
// Make request to Search
async function searchAPIData(){
    const API_KEY = '72728d9c2f573fcd29a0dd99801efe27';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`);
    const data = await response.json();
    hideSpinner();
    return data;
}
// Search movies/shows
async function search(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
    if(global.search.term !== '' && global.search.term !== null){
        const { results, total_pages, page, total_results} = await searchAPIData();
        global.search.page = page;
        global.search.totalPages = total_pages;
        global.search.totalResults = total_results;
        if(results.length === 0){
            showAlert('no results found')
            return;
        }
        displaySearchResults(results);
        document.querySelector('#search-term').value = ''
    }
    else {
        showAlert('Please enter a search term', 'error')
    }
}
// Display search results
function displaySearchResults(results){
    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="${global.search.type}-details.html?id=${result.id}">
            ${
                result.poster_path
                ?
                `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
                />`
                :
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${global.search.type === 'movie' ? result.title : result.name}"
                />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
            <p class="card-text">
                <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
            </p>
            </div>`;
            document.querySelector('#search-results-heading').innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`
            document.querySelector('#search-results').appendChild(div);
    });
    displayPagination();
}
// Create and Display Pagination
function displayPagination(){
    const div = document.createElement('div');
}
// Display slider movies
async function displaySlider(){
    const { results } = await fetchAPIData('movie/now_playing');
    results.forEach(result => {
        const div = document.createElement('div');
        div.classList.add("swiper-slide");
        div.innerHTML = 
        `<a href="movie-details.html?id=${result.id }">
            <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title }" />
        </a>
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)} / 10
        </h4>`;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    })
}
function initSwiper(){
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            displayOnInteraction: false
        },
        breakpoints: {
            500: {
               slidesPerView: 2
            },
            700: {
               slidesPerView: 3
            },
            1200: {
               slidesPerView: 4
            }
        }
    });
}
// Loading spinner
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
// Show alert
function showAlert(message, className = 'error'){
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(() => alertEl.remove(),3000);
}
// adds commas to number
function addCommas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// Display Backdrop in movie and show details
function displayBackgroundImage(type, background_path){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.background = `url(https://image.tmdb.org/t/p/original/${background_path})` ;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat'
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity =  '0.1';
   
    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild (overlayDiv); 
    }
    else if(type === 'show'){
        document.querySelector('#show-details').appendChild (overlayDiv); 
    }
}

// Initialise app
function init(){
    switch (global.currentPath) {
        case '/' :
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            break;
        case '/shows' :
            (function loader(){console.log('loaded from js');})();
            displayPopularShows();
            break;
        case '/movie-details.html' :
            displayMovieDetails();
            break;
        case '/tv-details.html' :
            displayShowDetails();
            break;
        case '/search.html' :
            search();
            break;
    }

    HighlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);