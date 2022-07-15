searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
  //   location.hash = "#home";
});

window.addEventListener("DOMContentLoaded", navigation, false);
window.addEventListener("hashchange", navigation, false);

function navigation() {
  console.log({ location });

  if (location.hash.startsWith("#trends")) {
    trendPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  console.log("Home!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");

  //form
  searchForm.classList.remove("inactive");

  //trends
  trendingPreviewSection.classList.remove("inactive");
  trendingBtn.classList.remove("inactive");

  //categories
  categoriesPreviewSection.classList.remove("inactive");

  //generic
  genericSection.classList.add("inactive");

  //movieDetail
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}
function categoriesPage() {
  console.log("Category!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  //form
  searchForm.classList.add("inactive");

  //trends
  trendingPreviewSection.classList.add("inactive");

  //categories
  categoriesPreviewSection.classList.add("inactive");

  //generic
  genericSection.classList.remove("inactive");

  //movieDetail
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);
}

function moviePage() {
  console.log("Movie!");

  headerSection.classList.add("header-container--long");
  //   headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");

  //form
  searchForm.classList.add("inactive");

  //trends
  trendingPreviewSection.classList.add("inactive");

  //categories
  categoriesPreviewSection.classList.add("inactive");

  //generic
  genericSection.classList.add("inactive");

  //movieDetail
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("=");

  getMovieById(movieId);
}

function searchPage() {
  console.log("Search!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");

  //form
  searchForm.classList.remove("inactive");

  //trends
  trendingPreviewSection.classList.add("inactive");

  //categories
  categoriesPreviewSection.classList.add("inactive");

  //generic
  genericSection.classList.remove("inactive");

  //movieDetail
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
}

function trendPage() {
  console.log("Trend!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  //form
  searchForm.classList.add("inactive");

  //trends
  trendingPreviewSection.classList.add("inactive");
  trendingBtn.classList.add("inactive");

  //categories
  categoriesPreviewSection.classList.add("inactive");

  //generic
  genericSection.classList.remove("inactive");

  //movieDetail
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();
}
