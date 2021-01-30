const API_KEY = "ce153341a8faae98ab0def899c8728a9";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://images.tmdb.org/t/p/w500";
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch?v=";

const requests = {
  Trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  "Netflix Originals": `/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=1&with_networks=213&include_null_first_air_dates=false`,
  "Top Rated": `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  "Action Movies": `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  "Comedy Movies": `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  "Horror Movies": `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  "Romance Movies": `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  Documentries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};
const getByID = `?api_key=${API_KEY}&language=en-US&append_to_response=images,videos&include_image_language=en`;

// Basic fetch to return json
const fetchData = (url) => {
  try {
    let data = fetch(url).then((data) => data.json());
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Truncating larger string to smaller ones.
const truncate = (str, n) =>
  str?.length > n ? str.substr(0, n - 1) + "..." : str;

// Creating star based rating from vote average
const rating = (vote) => {
  let foo = Math.round(vote / 2);
  let star = "";
  for (let i = 0; i < foo; i++) {
    star = star + "★";
  }
  for (let i = 0; i < 5 - foo; i++) {
    star = star + "☆";
  }
  return star;
};

// Create Top Banner
const createJumbotron = async () => {
  try {
    let data = await fetchData(BASE_URL + requests.Trending);
    let jumbotron = document.querySelector(".jumbotron");
    let selectedMovie =
      data.results[Math.floor(Math.random() * data.results.length)]; // Selecting random movie from list of movies

    if (selectedMovie.first_air_date) {
      // Checking whether the selectedMovie is tv show or movie
      data = await fetchData(`${BASE_URL}/tv/${selectedMovie.id}${getByID}`);
    } else {
      data = await fetchData(`${BASE_URL}/movie/${selectedMovie.id}${getByID}`);
    }

    let url = `https://images.tmdb.org/t/p/original${selectedMovie.backdrop_path}`;
    jumbotron.style.backgroundImage = `url(${url})`;

    let jumbotronContent = `<div class="jumbotron-content"><h1 class="display-4 title">${
      selectedMovie.name || selectedMovie.original_name || selectedMovie.title
    }</h1>
  <p class="lead">
  ${truncate(selectedMovie.overview, 150)}
  </p>
  <a class="btn btn-danger btn-md jumbotron-play" href="#" role="button" target="_blank"
  >Play</a
  ></div>`;

    jumbotron.innerHTML = jumbotronContent;
    // If the selectedMovie has video attached to it display it in new tab
    if (data.videos.results.length !== 0) {
      let youtubeKey = data.videos.results[0].key;
      document.querySelector(".jumbotron-play").href =
        YOUTUBE_BASE_URL + youtubeKey;
    }
  } catch (err) {
    console.log(err);
  }
};

// Creating Rows
const createRow = async () => {
  let rowSection = document.querySelector(".row-section");
  let completeRow = "";
  for (let url in requests) {
    try {
      let data = await fetchData(BASE_URL + requests[url]);
      let rowItems = "";
      for (let item of data.results) {
        rowItems += `<img class="posters" src="${
          IMG_URL + item.poster_path
        }" alt="${
          item.id + " " + (item.first_air_date ? "tv" : "movie")
        }" onclick="handlePosterClick(this)" data-bs-toggle="modal" data-bs-target="#movieDetailModal" />`;
      }
      let singleRow = `<div class="row-container"><h3 class="title">${url}</h3><div class="row-posters">${rowItems}</div></div>`;
      completeRow += singleRow;
    } catch (err) {
      console.log(err);
    }
    rowSection.innerHTML = completeRow;
  }
};

// Handling movie/show onclick
const handlePosterClick = async (movie) => {
  const [id, type] = movie.alt.split(" "); // ES6 destructuring to get the id and type of movie/tv show
  let data;

  if (type === "movie") {
    data = await fetchData(`${BASE_URL}/movie/${id}${getByID}`);
  } else {
    data = await fetchData(`${BASE_URL}/tv/${id}${getByID}`);
  }

  let movieBackdrop = document.querySelector(".movie-backdrop");
  let movieTitle = document.querySelector(".movie-title");
  let movieOverview = document.querySelector(".movie-overview");
  let movieRating = document.querySelector(".movie-rating");

  movieBackdrop.src = `https://images.tmdb.org/t/p/original${data.backdrop_path}`; // Add backdrop image
  movieTitle.innerText = data.title || data.name || data.original_name; // Add title
  movieRating.innerText = rating(data.vote_average) + " " + data.vote_count; // Add rating
  movieOverview.innerText = data.overview; //Add overview

  if (data.videos.results.length !== 0) {
    let youtubeKey = data.videos.results[0].key;
    document.querySelector(".movie-play").href = YOUTUBE_BASE_URL + youtubeKey;
  }
};

// Constructor like JS function
(async () => {
  createJumbotron();
  createRow();
})();
