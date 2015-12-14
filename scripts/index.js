$(function() {
  //Set up the blog with the raw data
  //blog.sortArticles();
  // blog.importArticles();
  //
  // // Load the articles into the blogging system
  // blog.articles.forEach(blog.appendArticle);
  //
  // // After lead-in paragraph, reveal only on button click
  // blog.setTeasers();
  //
  // // Add behaviors
  // blog.populateFilters();
  // blog.handleAuthorFilter();
  // blog.handleCategoryFilter();

  //blog.handleMainNav();

  ///
  blog.loadArticles();
  // blog.setTeasers();
  //
  // // Add behaviors
  // blog.populateFilters();
  blog.handleAuthorFilter();
  blog.handleCategoryFilter();

  blog.handleMainNav();
});
