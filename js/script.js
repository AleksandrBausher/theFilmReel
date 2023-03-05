const tmdbAPIKEY = "e1a8dfba37492178ccf516d46b59d29d";
let tmdbAPI = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPIKEY}`;
let tmdbAPIImage = `https://image.tmdb.org/t/p/original`;
const tmdbPopularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPIKEY}&language=en-US&page=1`;

const giphyAPIKEY = "GX7LT5JHIOGBE4pfKzEHoaOYlVEw4aYN";
let giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKEY}`;

const popularMovies = document.getElementById("popularMovies");

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const searchButtonTop = document.getElementById("searchButtonTop");
const searchInputTop = document.getElementById("searchInputTop");

const firstPage = document.getElementById("firstPage");

const secondPage = document.getElementById("secondPage");

const dataPage = document.getElementById("dataPage");
const thirdPage = document.getElementById("thirdPage");
const lastPage = document.getElementById("lastPage");

const moviePoster = document.getElementById("moviePoster");
const movieTitle = document.getElementById("movieTitle");
const movieReleaseDate = document.getElementById("movieReleaseDate");
const movieDescription = document.getElementById("movieDescription");

const getGIFsButton = document.getElementById("getGIFsButton");
const gifContainer = document.getElementById("gifContainer");

const movieTitleThird = document.getElementById("movieTitleThird");

let gifTileStyle =
  "p-[2px] rounded-[5px] hover:shadow-2xl m-[10px] cursor-pointer h-[fit]";

fetch(tmdbPopularAPI)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.results.forEach((element) => {
      let popularMoviesTile = document.createElement("div");
      popularMoviesTile.className =
        "popularMoviesTile cursor-pointer m-[10px] w-fit px-[5px] py-[10px] border-[1px] border-solid border-black hover:shadow-[0px_0px_9px_0px_rgba(0,0,0,0.20)] hover:bg-white";
      popularMoviesTile.textContent = element.title;
      popularMovies.appendChild(popularMoviesTile);
    });
  });

let titleOfMovie = "";

function searchMovie() {
  searchInputTop.value = searchInput.value;
  tmdbAPI += `&query=${searchInput.value}&page=1`;
  fetch(tmdbAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results[0]);
      moviePoster.setAttribute(
        "src",
        `${tmdbAPIImage}${data.results[0].poster_path}`
      );
      movieTitle.textContent = data.results[0].title;
      titleOfMovie = data.results[0].title;
      movieReleaseDate.textContent = data.results[0].release_date;
      movieDescription.textContent = data.results[0].overview;
    });
  firstPage.className = "hidden flex-col items-center";
  dataPage.className = "flex flex-col";
  secondPage.className = "container flex flex-row mt-[10px]";
}

function searchMovieTop() {
  tmdbAPI += `&query=${searchInputTop.value}&page=1`;
  fetch(tmdbAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      moviePoster.setAttribute(
        "src",
        `${tmdbAPIImage}${data.results[0].poster_path}`
      );
      movieTitle.textContent = data.results[0].title;
      movieReleaseDate.textContent = data.results[0].release_date;
      movieDescription.textContent = data.results[0].overview;
    });
}

function getGIFs() {
  giphyAPI += `&q=${searchInputTop.value}&limit=9&offset=0&rating=g&lang=en`;
  fetch(giphyAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.data.forEach((element) => {
        console.log(element.images.downsized.url);
        movieTitleThird.textContent = titleOfMovie;
        let gifTile = document.createElement("div");
        gifTile.className = gifTileStyle;
        let gif = document.createElement("img");
        gif.setAttribute("src", element.images.downsized.url);

        gifTile.appendChild(gif);

        gifContainer.appendChild(gifTile);
      });
    });

  secondPage.className = "container hidden flex-row mt-[10px]";
  thirdPage.className = "container flex flex-col items-center";
}

searchButton.addEventListener("click", searchMovie);
searchButtonTop.addEventListener("click", searchMovieTop);
getGIFsButton.addEventListener("click", getGIFs);
