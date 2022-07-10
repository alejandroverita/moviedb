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
}

function homePage() {
  console.log("Home!");
  getTrendingMoviesPreview();
  getCategoriesPreview();
}
function categoriesPage() {
  console.log("Category!");
}
function moviePage() {
  console.log("Movie!");
}
function searchPage() {
  console.log("Search!");
}
function trendPage() {
  console.log("Trend!");
}
