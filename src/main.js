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

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target.setAttribute);
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

function createMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    // console.log(movie);
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieImg.addEventListener("error", () => {
      movieImg.setAttribute(
        "src",
        "https://static.platzi.com/static/images/error/img404.png"
      );
    });

    movieImg.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movieBtn = document.createElement("button");
    movieBtn.classList.add("movie-btn");
    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      // agregar pelicula local storage
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
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

  createMovies(movies, trendingMoviesPreviewList, true);
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
  maxPage = data.total_pages;
  createMovies(movies, genericSection, { lazyLoad: true });
}

function getPaginatedMoviesByCategory(id) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollValidation = scrollTop + clientHeight >= scrollHeight - 20;

    const pageIsNotMax = page < maxPage;

    if (scrollValidation && pageIsNotMax) {
      page++;
      const { data } = await api(CATEGORY_URL_API, {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;

      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getMoviesBySearch(query) {
  const { data } = await api(SEARCH_URL_API, {
    params: {
      query,
    },
  });

  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollValidation = scrollTop + clientHeight >= scrollHeight - 20;

    const pageIsNotMax = page < maxPage;

    if (scrollValidation && pageIsNotMax) {
      page++;
      const { data } = await api(SEARCH_URL_API, {
        params: {
          query,
          page,
        },
      });
      const movies = data.results;

      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getTrendingMovies() {
  const { data } = await api(TRENDING_URL_API);
  const movies = data.results;

  maxPage = data.total_pages;
  createMovies(movies, genericSection, { lazyLoad: true, clean: true });
}

async function getPaginatedTrendingMovies() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollValidation = scrollTop + clientHeight >= scrollHeight - 20;

  const pageIsNotMax = page < maxPage;

  if (scrollValidation && pageIsNotMax) {
    page++;
    const { data } = await api(TRENDING_URL_API, {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
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

  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}
