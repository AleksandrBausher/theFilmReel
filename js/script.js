const tmdbAPIKEY = "e1a8dfba37492178ccf516d46b59d29d";
let tmdbAPI = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPIKEY}`;
const tmdbPopularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPIKEY}&language=en-US&page=1`;

const giphyAPIKEY = "GX7LT5JHIOGBE4pfKzEHoaOYlVEw4aYN";
const searchedMovie = "";
const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKEY}&q=${searchedMovie}&limit=9&offset=0&rating=g&lang=en`;

const popularMovies = document.getElementById("popularMovies");

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

const searchInputTop = document.getElementById("searchInputTop");

const firstPage = document.getElementById("firstPage");
const dataPage = document.getElementById("dataPage");
const secondPage = document.getElementById("secondPage");
const thirdPage = document.getElementById("thirdPage");
const lastPage = document.getElementById("lastPage");

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

function searchMovie() {
  console.log(searchInput.value);
  searchInputTop.value = searchInput.value;
  tmdbAPI += `&query=${searchInput.value}&page=1`;
  fetch(tmdbAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  firstPage.className = "hidden flex-col items-center";
  dataPage.className = "flex flex-col";
  secondPage.className = "container flex flex-row mt-[10px]";
}

searchButton.addEventListener("click", searchMovie);
