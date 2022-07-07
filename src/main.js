URL_API = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY;

GENRE_URL_API =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY;

async function getTrendingMoviesPreview() {
  const trendingPreviewMoviesContainer = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );

  const res = await fetch(URL_API);
  const data = await res.json();
  const movies = data.results;
  movies.forEach((movie) => {
    // console.log(movie);
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
}

async function getCategoriesPreview() {
  const previewCategoriesContainer = document.querySelector(
    "#categoriesPreview .categoriesPreview-list"
  );

  const res = await fetch(GENRE_URL_API);
  const data = await res.json();
  const categories = data.genres;

  categories.forEach((category) => {
    // console.log(movie);
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    previewCategoriesContainer.appendChild(categoryContainer);
  });
}

getTrendingMoviesPreview();
getCategoriesPreview();
