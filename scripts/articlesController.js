var articlesController = {};

articlesController.index = function() {
  Article.loadAll(articleView.index);
};

articlesController.Byid = function(id) {
  Article.find(id,articleView.Byid);
};
