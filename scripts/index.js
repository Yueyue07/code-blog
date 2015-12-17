$(function() {
  // Initialize web DB
  webDB.init();

  console.log('initiate database');

  // Set up the blog with the raw data and render
  blog.loadArticles();
  console.log('load articles successfully');

  // Add behaviors
  blog.handleAuthorFilter();
  blog.handleCategoryFilter();

  blog.handleMainNav();
});
