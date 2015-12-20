var articlesController = {};

articlesController.index = function() {
  Article.loadAll(articleView.index);
};

articlesController.Byid = function(id) {
  Article.find(id,articleView.Byid);
};

articlesController.category = function (ctx,next) {
  var categoryData = function(data) {
    console.log(data);
    ctx.articles = data;
    next();
  };
  console.log(ctx);
  console.log(ctx.params.category);
  console.log('url done');
  Article.findByCategory(ctx.params.category,categoryData);

};

articlesController.author = function (ctx,next) {
  var authorData = function(data) {
    console.log('author data');
    ctx.articles = data;
    next();
  };
  console.log(ctx.params.author);
  Article.findByAuthor(ctx.params.author,authorData);

};

articlesController.show = function (ctx,next) {
  console.log('in show action');
  console.log(ctx.articles);
  articleView.show(ctx.articles);
};
