const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

// URL APIS

TRENDING_URL_API = "trending/movie/day";

GENRE_URL_API = "genre/movie/list";

CATEGORY_URL_API = "discover/movie";

SEARCH_URL_API = "search/movie";

MOVIE_URL_API = "movie/";

//Utils

function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    // console.log(movie);
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    // console.log(movie);
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getTrendingMoviesPreview() {
  const { data } = await api(TRENDING_URL_API);
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  // categoriesPreviewList.innerHTML = "";

  const { data } = await api(GENRE_URL_API);
  // const data = await res.json();
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api(CATEGORY_URL_API, {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api(SEARCH_URL_API, {
    params: {
      query,
    },
  });

  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api(TRENDING_URL_API);
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const { data: movie } = await api(MOVIE_URL_API + id);

  const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  headerSection.style.background = `
  linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
  url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
}
